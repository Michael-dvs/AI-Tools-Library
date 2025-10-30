# AI Tools Library (Proyek Demo)

Selamat datang di AI Tools Library! Ini adalah sebuah aplikasi web **demo** yang dirancang untuk menjelajahi, membandingkan, dan menyimpan berbagai macam alat kecerdasan buatan (AI). Aplikasi ini dibangun menggunakan React, Vite, dan Supabase sebagai backend.

[![Tampilan AI Tools Library](https://placehold.co/600x400?text=Tampilan+Proyek+Anda)](https://placehold.co)
*(Ganti gambar di atas dengan screenshot proyek Anda)*

---

## ⚠️ Status Proyek: Demo

Harap perhatikan beberapa poin penting mengenai status proyek ini:

1.  **Masih dalam Tahap Demo:** Aplikasi ini adalah sebuah purwarupa (prototype) dan belum merupakan produk final.

2.  **Tidak Ada Integrasi API Model AI:** Model-model AI yang terdaftar (seperti GPT-4, Midjourney, dll.) hanyalah data sampel. **Tidak ada koneksi API (Application Programming Interface) nyata** ke model-model tersebut. Fitur untuk "mencoba" atau "membandingkan" prompt bersifat simulasi dan tidak akan memberikan hasil dari AI yang sebenarnya.

3.  **Database Sampel:** Proyek ini menggunakan database sampel yang disediakan oleh **Bolt** melalui Supabase. Semua data yang ditampilkan, seperti daftar alat AI, deskripsi, dan rating, adalah data statis yang sudah diisi sebelumnya untuk keperluan demonstrasi.

## ✨ Fitur Utama (Simulasi)

- **Jelajahi Alat AI:** Lihat daftar berbagai alat AI yang dikategorikan (misalnya, Chatbot, Image Generator).
- **Detail Alat:** Klik pada sebuah alat untuk melihat deskripsi yang lebih mendalam.
- **Favorit (Simulasi):** Pengguna dapat membuat akun dan menyimpan alat favorit mereka.
- **Perbandingan (Simulasi):** Membandingkan beberapa alat AI secara berdampingan berdasarkan data sampel.

## 🛠️ Teknologi yang Digunakan

- **Frontend:** React, Vite
- **Backend & Database:** Supabase
- **Bahasa:** TypeScript

## 🚀 Cara Menjalankan Proyek Secara Lokal

Untuk dapat menjalankan proyek ini di komputer Anda, ikuti langkah-langkah berikut.

### Prasyarat

Pastikan Anda sudah menginstal **[Node.js](https://nodejs.org/)** (disarankan versi LTS terbaru). Dengan menginstal Node.js, Anda juga akan mendapatkan `npm` (Node Package Manager).

### Langkah-langkah Instalasi

1.  **Clone Repositori**
    Buka terminal Anda dan jalankan perintah berikut untuk mengunduh proyek:
    ```bash
    git clone https://github.com/NAMA_USER_ANDA/NAMA_REPOSITORI_ANDA.git
    ```
    *(Ganti dengan URL repositori GitHub Anda)*

2.  **Masuk ke Direktori Proyek**
    ```bash
    cd nama-direktori-proyek
    ```

3.  **Install Ketergantungan (Dependencies)**
    Jalankan perintah berikut untuk menginstal semua paket yang dibutuhkan oleh proyek:
    ```bash
    npm install
    ```

4.  **Konfigurasi Environment Variables**
    Proyek ini membutuhkan koneksi ke Supabase. Salin file `.env.example` (jika ada) menjadi `.env` dan isi dengan kredensial Supabase Anda.

    Buat file baru bernama `.env` di root proyek dan tambahkan baris berikut:
    ```
    VITE_SUPABASE_URL="URL_PROYEK_SUPABASE_ANDA"
    VITE_SUPABASE_ANON_KEY="KUNCI_ANON_SUPABASE_ANDA"
    ```
    Anda bisa mendapatkan nilai-nilai ini dari dashboard proyek Supabase Anda di bagian *Project Settings > API*.

5.  **Jalankan Server Pengembangan**
    Setelah semua terinstal, jalankan server lokal dengan perintah:
    ```bash
    npm run dev
    ```

6.  **Buka di Browser**
    Buka browser Anda dan kunjungi http://localhost:5173 untuk melihat aplikasi berjalan.

---

## 🤝 Kontribusi

Karena ini adalah proyek demo, kontribusi mungkin terbatas. Namun, jika Anda menemukan bug atau memiliki saran, jangan ragu untuk membuka *Issue* di repositori GitHub.