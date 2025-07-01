document.addEventListener('DOMContentLoaded', () => {
    const addItemBtn = document.getElementById('addItemBtn');
    const itemsContainer = document.getElementById('itemsContainer');
    const generateInvoiceBtn = document.getElementById('generateInvoiceBtn');
    const invoiceContent = document.getElementById('invoiceContent');
    const printInvoiceBtn = document.getElementById('printInvoiceBtn');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const sellerLogoInput = document.getElementById('sellerLogo'); // Input Logo
    const logoPreview = document.getElementById('logoPreview'); // Pratinjau Logo
    const invoiceThemeSelect = document.getElementById('invoiceTheme'); // Pilihan Tema

    let uploadedLogoBase64 = ''; // Variabel untuk menyimpan logo dalam format Base64

    // Fungsi untuk menambahkan baris item baru
    function addNewItemRow() {
        const itemRow = document.createElement('div');
        itemRow.classList.add('item-row');
        itemRow.innerHTML = `
            <input type="text" class="item-description" placeholder="Deskripsi Barang/Jasa">
            <input type="number" class="item-quantity" placeholder="Qty" value="1" min="1">
            <input type="number" class="item-price" placeholder="Harga Satuan" value="0" min="0">
            <button class="remove-item-btn">X</button>
        `;
        itemsContainer.appendChild(itemRow);

        // Tambahkan event listener untuk tombol hapus pada baris baru
        itemRow.querySelector('.remove-item-btn').addEventListener('click', () => {
            itemRow.remove();
            if (invoiceContent.innerHTML.trim() !== '') {
                generateInvoiceBtn.click();
            }
        });
    }

    // Event listener untuk unggah logo
    sellerLogoInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedLogoBase64 = e.target.result;
                logoPreview.src = uploadedLogoBase64;
                logoPreview.style.display = 'block';
                if (invoiceContent.innerHTML.trim() !== '') {
                    generateInvoiceBtn.click(); // Perbarui invoice setelah logo diunggah
                }
            };
            reader.readAsDataURL(file);
        } else {
            uploadedLogoBase64 = '';
            logoPreview.src = '';
            logoPreview.style.display = 'none';
            if (invoiceContent.innerHTML.trim() !== '') {
                generateInvoiceBtn.click(); // Perbarui invoice jika logo dihapus
            }
        }
    });

    // Event listener untuk perubahan tema
    invoiceThemeSelect.addEventListener('change', () => {
        const selectedTheme = invoiceThemeSelect.value;
        // Hapus semua kelas tema yang ada
        invoiceContent.classList.remove('invoice-theme-default', 'invoice-theme-modern', 'invoice-theme-elegant');
        // Tambahkan kelas tema yang dipilih
        invoiceContent.classList.add(`invoice-theme-${selectedTheme}`);
        if (invoiceContent.innerHTML.trim() !== '') {
            generateInvoiceBtn.click(); // Perbarui invoice setelah tema berubah
        }
    });


    // Fungsi untuk memformat angka menjadi format mata uang Rupiah
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    }

    // Fungsi untuk membuat dan menampilkan pratinjau invoice
    generateInvoiceBtn.addEventListener('click', () => {
        const invoiceNumber = document.getElementById('invoiceNumber').value;
        const invoiceDate = document.getElementById('invoiceDate').value;
        const dueDate = document.getElementById('dueDate').value;

        const sellerName = document.getElementById('sellerName').value;
        const sellerAddress = document.getElementById('sellerAddress').value;
        const sellerPhone = document.getElementById('sellerPhone').value;
        const sellerEmail = document.getElementById('sellerEmail').value;

        const buyerName = document.getElementById('buyerName').value;
        const buyerAddress = document.getElementById('buyerAddress').value;

        const discount = parseFloat(document.getElementById('discount').value) || 0;
        const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;

        let itemsHtml = '';
        let subtotal = 0;

        document.querySelectorAll('.item-row').forEach((row, index) => {
            const description = row.querySelector('.item-description').value;
            const quantity = parseInt(row.querySelector('.item-quantity').value) || 0;
            const price = parseFloat(row.querySelector('.item-price').value) || 0;
            const amount = quantity * price;

            subtotal += amount;

            itemsHtml += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${description}</td>
                    <td style="text-align: right;">${quantity}</td>
                    <td style="text-align: right;">${formatRupiah(price)}</td>
                    <td style="text-align: right;">${formatRupiah(amount)}</td>
                </tr>
            `;
        });

        const taxAmount = subtotal * (taxRate / 100);
        const totalAmount = subtotal - discount + taxAmount;

        // Tambahkan logo ke HTML invoice jika ada
        const logoHtml = uploadedLogoBase64 ? `<img src="${uploadedLogoBase64}" alt="Logo Perusahaan" style="max-width: 150px; height: auto; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto;">` : '';

        const invoiceHtmlContent = `
            <div style="padding: 15px;">
                ${logoHtml} <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="margin-bottom: 5px;">FAKTUR / INVOICE</h2>
                    <p style="margin: 2px 0;"><strong>Nomor Invoice:</strong> ${invoiceNumber}</p>
                    <p style="margin: 2px 0;"><strong>Tanggal Invoice:</strong> ${invoiceDate}</p>
                    <p style="margin: 2px 0;"><strong>Jatuh Tempo:</strong> ${dueDate}</p>
                </div>

                <div style="display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                    <div style="width: 48%;">
                        <h3>DARI:</h3>
                        <p style="margin: 2px 0;"><strong>${sellerName}</strong></p>
                        <p style="margin: 2px 0;">${sellerAddress}</p>
                        <p style="margin: 2px 0;">Telp: ${sellerPhone}</p>
                        <p style="margin: 2px 0;">Email: ${sellerEmail}</p>
                    </div>
                    <div style="width: 48%;">
                        <h3>KEPADA:</h3>
                        <p style="margin: 2px 0;"><strong>${buyerName}</strong></p>
                        <p style="margin: 2px 0;">${buyerAddress}</p>
                    </div>
                </div>

                <h3>RINCIAN BARANG/JASA</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Deskripsi</th>
                            <th style="text-align: right;">Qty</th>
                            <th style="text-align: right;">Harga Satuan</th>
                            <th style="text-align: right;">Jumlah</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>

                <div style="text-align: right; margin-top: 20px;">
                    <p style="margin: 2px 0;">Subtotal: <span style="text-align: right; display: inline-block; width: 120px;">${formatRupiah(subtotal)}</span></p>
                    <p style="margin: 2px 0;">Diskon: <span style="text-align: right; display: inline-block; width: 120px;">(${formatRupiah(discount)})</span></p>
                    <p style="margin: 2px 0;">Pajak (${taxRate}%): <span style="text-align: right; display: inline-block; width: 120px;">${formatRupiah(taxAmount)}</span></p>
                    <h3 style="margin-top: 10px; margin-bottom: 5px;">TOTAL AKHIR: <span style="text-align: right; display: inline-block; width: 120px;">${formatRupiah(totalAmount)}</span></h3>
                </div>

                <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
                    <h3>METODE PEMBAYARAN</h3>
                    <p style="margin: 2px 0;">Transfer Bank ke:</p>
                    <p style="margin: 2px 0;">Bank: [Nama Bank Anda]</p>
                    <p style="margin: 2px 0;">Nomor Rekening: [Nomor Rekening Anda]</p>
                    <p style="margin: 2px 0;">Atas Nama: [Nama Pemilik Rekening]</p>
                </div>

                <div style="margin-top: 20px; font-style: italic; color: #777;">
                    <p>Catatan: Mohon lakukan pembayaran sebelum tanggal jatuh tempo. Terima kasih atas kepercayaan Anda.</p>
                </div>
            </div>
        `;
        invoiceContent.innerHTML = invoiceHtmlContent;
    });

    // Event listener untuk tombol cetak
    printInvoiceBtn.addEventListener('click', () => {
        window.print();
    });

    // Event listener untuk tombol unduh PDF (via html2pdf.js)
    downloadPdfBtn.addEventListener('click', () => {
        const element = document.getElementById('invoicePreview');

        printInvoiceBtn.style.display = 'none';
        downloadPdfBtn.style.display = 'none';

        generateInvoiceBtn.click(); // Perbarui invoice sebelum unduh

        if (invoiceContent.innerHTML.trim() === '') {
            alert('Harap buat invoice terlebih dahulu dengan menekan tombol "Buat Invoice".');
            printInvoiceBtn.style.display = 'block';
            downloadPdfBtn.style.display = 'block';
            return;
        }

        const options = {
            margin: 10,
            filename: `invoice-${document.getElementById('invoiceNumber').value}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 3,
                logging: true,
                dpi: 300,
                letterRendering: true,
                useCORS: true,
                allowTaint: true,
                scrollY: -window.scrollY,
                backgroundColor: '#ffffff'
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        };

        setTimeout(() => {
            html2pdf().from(element).set(options).save().then(() => {
                printInvoiceBtn.style.display = 'block';
                downloadPdfBtn.style.display = 'block';
            }).catch(error => {
                console.error("Error generating PDF:", error);
                alert("Terjadi kesalahan saat membuat PDF. Silakan coba lagi. Cek konsol browser (F12) untuk detail error.");
                printInvoiceBtn.style.display = 'block';
                downloadPdfBtn.style.display = 'block';
            });
        }, 500); // Penundaan untuk memastikan DOM diperbarui
    });


    // Panggil sekali untuk memastikan ada baris item awal saat halaman dimuat
    addNewItemRow();

    // Set tanggal saat ini sebagai default
    const today = new Date();
    const invoiceDateInput = document.getElementById('invoiceDate');
    const dueDateInput = document.getElementById('dueDate');

    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    invoiceDateInput.value = formatDate(today);

    // Set tanggal jatuh tempo 14 hari dari sekarang
    const dueDateObj = new Date();
    dueDateObj.setDate(today.getDate() + 14);
    dueDateInput.value = formatDate(dueDateObj);
});