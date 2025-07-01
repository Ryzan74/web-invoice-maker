document.addEventListener('DOMContentLoaded', () => {
    const addItemBtn = document.getElementById('addItemBtn');
    const itemsContainer = document.getElementById('itemsContainer');
    const generateInvoiceBtn = document.getElementById('generateInvoiceBtn');
    const invoiceContent = document.getElementById('invoiceContent');
    const printInvoiceBtn = document.getElementById('printInvoiceBtn');

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
        });
    }

    // Tambahkan event listener untuk tombol 'Tambah Item'
    addItemBtn.addEventListener('click', addNewItemRow);

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
                    <td>${index + 1}</td>
                    <td>${description}</td>
                    <td class="text-right">${quantity}</td>
                    <td class="text-right">${formatRupiah(price)}</td>
                    <td class="text-right">${formatRupiah(amount)}</td>
                </tr>
            `;
        });

        const taxAmount = subtotal * (taxRate / 100);
        const totalAmount = subtotal - discount + taxAmount;

        invoiceContent.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: #2c3e50;">FAKTUR / INVOICE</h2>
                <p><strong>Nomor Invoice:</strong> ${invoiceNumber}</p>
                <p><strong>Tanggal Invoice:</strong> ${invoiceDate}</p>
                <p><strong>Jatuh Tempo:</strong> ${dueDate}</p>
            </div>

            <div style="display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <div style="width: 48%;">
                    <h3 style="color: #555;">DARI:</h3>
                    <p><strong>${sellerName}</strong></p>
                    <p>${sellerAddress}</p>
                    <p>Telp: ${sellerPhone}</p>
                    <p>Email: ${sellerEmail}</p>
                </div>
                <div style="width: 48%;">
                    <h3 style="color: #555;">KEPADA:</h3>
                    <p><strong>${buyerName}</strong></p>
                    <p>${buyerAddress}</p>
                </div>
            </div>

            <h3>RINCIAN BARANG/JASA</h3>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Deskripsi</th>
                        <th class="text-right">Qty</th>
                        <th class="text-right">Harga Satuan</th>
                        <th class="text-right">Jumlah</th>
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
    });

    // Event listener untuk tombol cetak
    printInvoiceBtn.addEventListener('click', () => {
        window.print();
    });

    // Panggil sekali untuk memastikan ada baris item awal saat halaman dimuat
    addNewItemRow();

    // Set tanggal saat ini sebagai default
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
    const dd = String(today.getDate()).padStart(2, '0');
    document.getElementById('invoiceDate').value = `${yyyy}-${mm}-${dd}`;

    // Set tanggal jatuh tempo 14 hari dari sekarang
    const dueDateObj = new Date();
    dueDateObj.setDate(today.getDate() + 14);
    const dueYyyy = dueDateObj.getFullYear();
    const dueMm = String(dueDateObj.getMonth() + 1).padStart(2, '0');
    const dueDd = String(dueDateObj.getDate()).padStart(2, '0');
    document.getElementById('dueDate').value = `${dueYyyy}-${dueMm}-${dueDd}`;
});