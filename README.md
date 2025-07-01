Tentu, ini dia file `README.md` untuk invoice generator Anda, dengan fokus pada fungsi cetak sebagai metode utama untuk mendapatkan PDF.

---

# Invoice Generator Sederhana untuk UMKM

---

Invoice Generator ini adalah aplikasi web sederhana berbasis HTML, CSS, dan JavaScript yang dirancang untuk membantu UMKM dan pelaku usaha membuat faktur (invoice) secara cepat dan mudah. Anda dapat memasukkan detail penjualan, melihat pratinjau invoice, dan kemudian **mencetaknya ke format PDF** menggunakan fitur cetak bawaan browser Anda.

## Fitur Utama

* **Input Data Mudah:** Formulir interaktif untuk memasukkan informasi penjual, pembeli, dan rincian barang/jasa.
* **Penambahan Item Dinamis:** Tambahkan atau hapus baris item sesuai kebutuhan.
* **Perhitungan Otomatis:** Subtotal, diskon, pajak, dan total akhir dihitung secara otomatis.
* **Pratinjau Real-time:** Lihat pratinjau invoice sebelum mencetak.
* **Cetak ke PDF:** Fungsi utama untuk menghasilkan dokumen PDF melalui dialog cetak browser.

---

## Cara Penggunaan

1.  **Unduh atau Klon Repositori:**
    * Jika Anda menerima file ZIP, ekstrak isinya ke folder baru di komputer Anda.
    * Pastikan Anda memiliki tiga file utama: `index.html`, `style.css`, dan `script.js`.
    * (Opsional, jika Anda mengunduh `html2pdf.js` secara lokal): Pastikan juga file `html2pdf.bundle.min.js` ada di folder yang sama.

2.  **Buka di Browser:**
    * Klik dua kali file `index.html` di folder Anda. Ini akan membuka aplikasi di browser web default Anda (Chrome, Firefox, Edge, dll.).

3.  **Isi Data Invoice:**
    * Lengkapi semua kolom informasi penjual, pembeli, dan rincian barang/jasa di formulir yang tersedia.
    * Gunakan tombol **"Tambah Item"** untuk menambahkan baris baru jika Anda memiliki lebih dari satu item.
    * Masukkan nilai diskon (dalam Rupiah) dan persentase pajak jika berlaku.

4.  **Buat Pratinjau Invoice:**
    * Setelah mengisi semua data, klik tombol **"Buat Invoice"**. Pratinjau invoice Anda akan muncul di bagian kanan halaman.

5.  **Cetak ke PDF:**
    * Setelah pratinjau muncul, klik tombol **"Cetak Invoice"**.
    * Dialog cetak browser Anda akan muncul.
    * Pada dialog cetak, pastikan Anda memilih opsi **"Simpan sebagai PDF"** (atau "Save as PDF", "Microsoft Print to PDF", "Cetak ke PDF Google" dll., tergantung sistem operasi dan browser Anda) sebagai tujuan cetak.
    * **Sesuaikan Ukuran Kertas:** Anda mungkin perlu menyesuaikan pengaturan *layout* atau *paper size* (misalnya, ke A4 atau Letter) di dialog cetak browser agar invoice pas dan terlihat rapi di PDF. Pastikan **"Background graphics"** (atau "Gambar latar belakang") diaktifkan agar warna dan border tabel tercetak.
    * Klik **"Simpan"** atau **"Cetak"** untuk mengunduh invoice Anda dalam format PDF.

---

## Struktur File

* `index.html`: Struktur dasar halaman web dan formulir invoice.
* `style.css`: Pengaturan gaya dan tampilan aplikasi.
* `script.js`: Logika JavaScript untuk interaksi formulir, perhitungan, dan fungsi cetak.

---

## Teknologi yang Digunakan

* **HTML5:** Untuk struktur konten.
* **CSS3:** Untuk styling.
* **JavaScript:** Untuk fungsionalitas interaktif.
* **`html2pdf.js` (melalui CDN):** Pustaka JavaScript pihak ketiga yang memungkinkan konversi HTML menjadi PDF (digunakan secara internal oleh fungsi cetak).

---

## Kontribusi

Proyek ini adalah alat sederhana untuk penggunaan pribadi. Jika Anda memiliki saran atau ingin berkontribusi, silakan hubungi pengembang.

---