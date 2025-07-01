Tentu, ini `README.md` baru untuk versi Premium dari Invoice Generator Anda, yang menyoroti fitur-fitur baru dan cara penggunaannya:

---

# Invoice Generator Premium untuk UMKM

---

Invoice Generator Premium adalah aplikasi web canggih berbasis HTML, CSS, dan JavaScript yang dirancang khusus untuk UMKM dan pelaku usaha yang menginginkan faktur (invoice) yang profesional dan dapat disesuaikan. Dengan fitur premium, Anda kini bisa membuat invoice yang tidak hanya fungsional tetapi juga mencerminkan identitas merek Anda. Anda dapat melihat pratinjau invoice, dan kemudian **mencetaknya ke format PDF** menggunakan fitur cetak bawaan browser Anda.

## Fitur Utama Premium

* **Pilihan Tema Invoice (Baru!):** Pilih dari beberapa tema desain yang elegan (Klasik, Modern, Elegan) untuk memberikan tampilan profesional pada invoice Anda.
* **Unggah Logo Usaha (Baru!):** Tambahkan logo perusahaan Anda langsung ke invoice, memperkuat *branding* bisnis Anda.
* **Input Data Mudah:** Formulir interaktif untuk memasukkan informasi penjual, pembeli, dan rincian barang/jasa.
* **Penambahan Item Dinamis:** Tambahkan atau hapus baris item secara fleksibel sesuai kebutuhan transaksi.
* **Perhitungan Otomatis:** Subtotal, diskon, pajak, dan total akhir dihitung secara otomatis dan akurat.
* **Pratinjau Real-time:** Lihat pratinjau invoice Anda secara langsung setelah setiap perubahan.
* **Cetak ke PDF:** Fungsi utama untuk menghasilkan dokumen PDF berkualitas tinggi melalui dialog cetak browser Anda.

---

## Cara Penggunaan

1.  **Unduh atau Klon Repositori:**
    * Jika Anda menerima file ZIP, ekstrak isinya ke folder baru di komputer Anda.
    * Pastikan Anda memiliki tiga file utama: `index.html`, `style.css`, dan `script.js`.
    * Pastikan juga file `html2pdf.bundle.min.js` tersedia (biasanya dimuat melalui CDN, cek `index.html` Anda).

2.  **Buka di Browser:**
    * Klik dua kali file `index.html` di folder Anda. Ini akan membuka aplikasi di browser web default Anda (Chrome, Firefox, Edge, dll.).

3.  **Isi Data Invoice:**
    * Lengkapi semua kolom informasi penjual, pembeli, dan rincian barang/jasa di formulir.
    * Gunakan tombol **"Tambah Item"** untuk menambahkan baris baru jika diperlukan.
    * Masukkan nilai diskon (dalam Rupiah) dan persentase pajak jika berlaku.

4.  **Personalisasi Invoice Anda (Fitur Premium):**
    * **Unggah Logo:** Di bagian "Informasi Penjual", klik "Unggah Logo" untuk memilih file gambar logo Anda. Logo akan langsung muncul di pratinjau invoice.
    * **Pilih Tema:** Di bagian "Pengaturan Tampilan Premium", pilih tema yang Anda inginkan dari dropdown (**"Tema Default (Klasik)"**, **"Tema Modern (Minimalis)"**, atau **"Tema Elegan (Formal)"**). Pratinjau invoice akan langsung menyesuaikan tampilannya.

5.  **Buat Pratinjau Invoice:**
    * Setelah mengisi semua data dan melakukan personalisasi, klik tombol **"Buat Invoice"**. Pratinjau invoice Anda akan muncul di bagian kanan halaman dengan semua penyesuaian yang telah Anda buat.

6.  **Cetak ke PDF:**
    * Setelah pratinjau muncul sempurna, klik tombol **"Cetak Invoice"**.
    * Dialog cetak browser Anda akan muncul.
    * Pada dialog cetak, pastikan Anda memilih opsi **"Simpan sebagai PDF"** (atau "Save as PDF", "Microsoft Print to PDF", "Cetak ke PDF Google", dll., tergantung sistem operasi dan browser Anda) sebagai tujuan cetak.
    * **Penting: Sesuaikan Ukuran Kertas:** Anda mungkin perlu menyesuaikan pengaturan *layout*, *margins*, atau *paper size* (misalnya, ke A4 atau Letter) di dialog cetak browser agar invoice pas dan terlihat rapi di PDF. Pastikan opsi **"Background graphics"** (atau "Gambar latar belakang") diaktifkan agar warna latar belakang dan border tabel tercetak dengan benar.
    * Klik **"Simpan"** atau **"Cetak"** untuk mengunduh invoice Anda dalam format PDF yang telah disesuaikan.

---

## Struktur File

* `index.html`: Struktur dasar halaman web, formulir input, dan area pratinjau invoice.
* `style.css`: Pengaturan gaya untuk tata letak umum, formulir, pratinjau, dan definisi untuk **berbagai tema premium**.
* `script.js`: Logika JavaScript untuk interaksi formulir, perhitungan, fungsi unggah logo, penggantian tema, dan fungsi cetak/unduh PDF.

---

## Teknologi yang Digunakan

* **HTML5:** Untuk struktur konten aplikasi.
* **CSS3:** Untuk styling dan tema visual yang berbeda.
* **JavaScript (Vanilla JS):** Untuk fungsionalitas interaktif, perhitungan, dan manipulasi DOM.
* **Google Fonts:** Untuk menyediakan pilihan *font* premium pada tema.
* **`html2pdf.js` (melalui CDN):** Pustaka JavaScript pihak ketiga yang memungkinkan konversi konten HTML menjadi PDF (digunakan secara internal oleh fungsi cetak).

---

## Kontribusi

Proyek ini dirancang untuk memberikan alat yang kuat dan mudah digunakan. Jika Anda memiliki saran atau menemukan *bug*, silakan beritahu pengembang.

---

Dengan README ini, pengguna baru akan lebih mudah memahami fitur premium yang Anda tawarkan dan cara menggunakannya.