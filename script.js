document.addEventListener('DOMContentLoaded', () => {
    const addItemBtn = document.getElementById('addItemBtn');
    const itemsContainer = document.getElementById('itemsContainer');
    const generateInvoiceBtn = document.getElementById('generateInvoiceBtn');
    const invoiceContent = document.getElementById('invoiceContent');
    const printInvoiceBtn = document.getElementById('printInvoiceBtn');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');

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
            // Setelah menghapus item, perbarui pratinjau invoice jika sudah ada
            if (invoiceContent.innerHTML.trim() !== '') {
                generateInvoiceBtn.click(); // Trigger ulang pembuatan invoice
            }
        });
    }

    // Tambahkan event listener untuk tombol 'Tambah Item'
    addItemBtn.addEventListener('click', addNewItemRow);

    // Fungsi untuk memformat angka menjadi format mata uang Rupiah
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0 // Tidak ada desimal untuk Rupiah
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
        const taxRate = parseFloat(document.getElementById('taxRate').value) || 0; // dalam persen

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
                    <td style="border: 1px solid #eee; padding: 8px; text-align: left;">${index + 1}</td>
                    <td style="border: 1px solid #eee; padding: 8px; text-align: left;">${description}</td>
                    <td style="border: 1px solid #eee; padding: 8px; text-align: right;">${quantity}</td>
                    <td style="border: 1px solid #eee; padding: 8px; text-align: right;">${formatRupiah(price)}</td>
                    <td style="border: 1px solid #eee; padding: 8px; text-align: right;">${formatRupiah(amount)}</td>
                </tr>
            `;
        });

        const taxAmount = subtotal * (taxRate / 100);
        const totalAmount = subtotal - discount + taxAmount;

        // Konten HTML untuk invoice yang akan dicetak/diunduh
        // Penting: Pastikan gaya inline yang cukup agar konsisten di PDF
        const invoiceHtmlContent = `
            <div style="padding: 15px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #2c3e50; margin-bottom: 5px;">FAKTUR / INVOICE</h2>
                    <p style="margin: 2px 0;"><strong>Nomor Invoice:</strong> ${invoiceNumber}</p>
                    <p style="margin: 2px 0;"><strong>Tanggal Invoice:</strong> ${invoiceDate}</p>
                    <p style="margin: 2px 0;"><strong>Jatuh Tempo:</strong> ${dueDate}</p>
                </div>

                <div style="display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                    <div style="width: 48%;">
                        <h3 style="color: #555; margin-bottom: 5px;">DARI:</h3>
                        <p style="margin: 2px 0;"><strong>${sellerName}</strong></p>
                        <p style="margin: 2px 0;">${sellerAddress}</p>
                        <p style="margin: 2px 0;">Telp: ${sellerPhone}</p>
                        <p style="margin: 2px 0;">Email: ${sellerEmail}</p>
                    </div>
                    <div style="width: 48%;">
                        <h3 style="color: #555; margin-bottom: 5px;">KEPADA:</h3>
                        <p style="margin: 2px 0;"><strong>${buyerName}</strong></p>
                        <p style="margin: 2px 0;">${buyerAddress}</p>
                    </div>
                </div>

                <h3 style="margin-top: 20px; margin-bottom: 10px;">RINCIAN BARANG/JASA</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #eee; padding: 8px; text-align: left; background-color: #f2f2f2;">No.</th>
                            <th style="border: 1px solid #eee; padding: 8px; text-align: left; background-color: #f2f2f2;">Deskripsi</th>
                            <th style="border: 1px solid #eee; padding: 8px; text-align: right; background-color: #f2f2f2;">Qty</th>
                            <th style="border: 1px solid #eee; padding: 8px; text-align: right; background-color: #f2f2f2;">Harga Satuan</th>
                            <th style="border: 1px solid #eee; padding: 8px; text-align: right; background-color: #f2f2f2;">Jumlah</th>
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
                    <h3 style="margin-bottom: 5px;">METODE PEMBAYARAN</h3>
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

    // Event listener untuk tombol unduh PDF
    downloadPdfBtn.addEventListener('click', () => {
        const element = document.getElementById('invoicePreview');

        // Sembunyikan tombol cetak dan unduh saat akan dikonversi ke PDF
        printInvoiceBtn.style.display = 'none';
        downloadPdfBtn.style.display = 'none';

        // Pastikan konten invoice sudah dibuat sebelum mengunduh
        if (invoiceContent.innerHTML.trim() === '') {
            alert('Harap buat invoice terlebih dahulu dengan menekan tombol "Buat Invoice".');
            printInvoiceBtn.style.display = 'block';
            downloadPdfBtn.style.display = 'block';
            return; // Hentikan fungsi jika konten kosong
        }

        const options = {
            margin: 10,
            filename: `invoice-${document.getElementById('invoiceNumber').value}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 3, // Coba tingkatkan scale lebih tinggi lagi
                logging: true,
                dpi: 300, // Coba tingkatkan DPI
                letterRendering: true,
                useCORS: true,
                allowTaint: true, // Coba izinkan taint (jika ada masalah CORS yang persisten)
                scrollY: -window.scrollY, // Pastikan dimulai dari atas halaman
                backgroundColor: '#ffffff' // Pastikan background putih, bukan transparan
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        };

        // Menggunakan setTimeout dengan penundaan sedikit lebih lama
        setTimeout(() => {
            html2pdf().from(element).set(options).save().then(() => {
                // Tampilkan kembali tombol setelah PDF selesai diunduh
                printInvoiceBtn.style.display = 'block';
                downloadPdfBtn.style.display = 'block';
            }).catch(error => {
                console.error("Error generating PDF:", error);
                alert("Terjadi kesalahan saat membuat PDF. Silakan coba lagi. Cek konsol browser (F12) untuk detail error.");
                printInvoiceBtn.style.display = 'block';
                downloadPdfBtn.style.display = 'block';
            });
        }, 300); // Penundaan 300ms untuk memastikan semua elemen termuat

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