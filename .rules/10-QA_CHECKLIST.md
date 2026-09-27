# 10 — QA CHECKLIST

> Jalankan checklist ini sebelum menyatakan pekerjaan selesai. **Satu item gagal = belum selesai.**

---

## A. Kelengkapan Struktur

- [ ] Setiap modul di fase ini punya halaman HTML sendiri
- [ ] `index.html` memuat daftar semua modul dengan estimasi durasi
- [ ] Setiap halaman modul punya 10 bagian wajib (lihat `02-KETENTUAN_PEMBUATAN.md` bagian 2)
- [ ] Setiap sub-topik punya 7 blok lengkap — tidak ada yang kosong
- [ ] `README.md` fase berisi daftar modul + kunci jawaban semua quest
- [ ] Navigasi antar modul (sebelumnya/berikutnya) berfungsi

## B. Kedalaman Materi

- [ ] Setiap sub-topik menjawab **kenapa konsep ini ada**
- [ ] Setiap sub-topik menjelaskan **kapan dipakai di dunia nyata**
- [ ] Setiap rumus dijelaskan **asal-usulnya**, bukan cuma ditulis
- [ ] Setiap topik berhitung punya **langkah baku bernomor** dengan bagian "Kenapa" terisi
- [ ] Setiap topik punya minimal 1 **analogi konkret**
- [ ] Setiap sub-topik punya kotak **"⚠️ Sering Keliru"**
- [ ] Ada **hubungan eksplisit** dengan sub-topik sebelumnya (bukan potongan terpisah)
- [ ] Topik yang punya turunan sudah dibahas turunannya (contoh: subnetting → VLSM, CIDR)

## C. Studi Kasus

- [ ] Setiap sub-topik punya minimal 1 studi kasus
- [ ] Studi kasus punya **konteks nyata** (sekolah/kantor/warnet/pabrik), bukan soal abstrak
- [ ] Studi kasus punya **solusi lengkap bertahap**, sampai hasil akhir
- [ ] Ada bagian "pelajaran yang diambil" di akhir kasus

## D. Animasi

- [ ] Setiap sub-topik punya minimal 1 animasi
- [ ] Setiap animasi punya **panel narasi yang berubah per langkah**
- [ ] Setiap animasi punya tombol: Putar, Langkah maju/mundur, Ulang
- [ ] Animasi kegagalan menunjukkan **di mana** dan **kenapa** gagal (paket merah, jatuh, ada label alasan)
- [ ] Semua SVG pakai `viewBox` (bukan lebar piksel tetap)
- [ ] Kecepatan animasi bisa dipahami manusia (1200–1800ms per hop)
- [ ] Ada mode teks / daftar langkah untuk animasi yang tidak dijalankan
- [ ] Tidak ada animasi dekoratif yang tidak menjelaskan apa pun

## E. Quest

- [ ] Setiap sub-topik punya minimal 1 quest
- [ ] Jawaban **tidak terlihat** sebelum tombol "Tampilkan Jawaban" ditekan
- [ ] Setiap quest punya **animasi jawaban**
- [ ] Setiap pembahasan menjelaskan **kenapa jawaban lain salah** (untuk pilihan ganda)
- [ ] Untuk soal hitung: ada langkah perhitungan lengkap di pembahasan
- [ ] Tingkat kesulitan naik bertahap, tidak melompat
- [ ] Ada minimal 1 quest tipe debug per modul (mulai modul kedua)
- [ ] Angka di quest **berbeda** dari contoh di materi

## F. Aset Visual

- [ ] Semua perangkat yang disebut punya ilustrasi
- [ ] Ilustrasi konsisten antara bagian penjelasan dan animasi
- [ ] Perangkat punya 3 state: normal / aktif / nonaktif — terlihat jelas bedanya
- [ ] Tidak ada gambar yang menunjuk ke internet tanpa fallback lokal
- [ ] Semua SVG punya `<title>`
- [ ] Ada komponen terminal untuk modul yang menyinggung CLI

## G. Teknis

- [ ] Halaman terbuka normal dengan **klik dua kali** (protokol `file://`)
- [ ] **Tidak ada** `fetch()` ke file lokal
- [ ] **Tidak ada** `<script type="module">` atau `import`/`export`
- [ ] **Tidak ada** dependensi CDN wajib
- [ ] Console browser bersih — tidak ada error merah
- [ ] `localStorage` dibungkus `try/catch`
- [ ] Font memakai font stack sistem
- [ ] Alamat IP / perintah CLI memakai font monospace

## H. Tampilan

- [ ] Rapi di lebar 1440px (laptop)
- [ ] Rapi di lebar 768px (tablet)
- [ ] Rapi di lebar 375px (HP) — tidak ada elemen yang terpotong atau meluber
- [ ] Tidak ada teks yang keluar dari kotaknya
- [ ] Kontras teks cukup di semua kartu
- [ ] Lebar baca teks maksimal ~68 karakter
- [ ] Warna semantik konsisten (hijau=berhasil, merah=gagal, kuning=hati-hati)
- [ ] Tombol minimal 44×44px

## I. Untuk Mentor

- [ ] Setiap sub-topik punya panel Catatan Mentor
- [ ] Panel berisi: estimasi waktu, poin kunci, naskah pembuka, miskonsepsi, pertanyaan pemantik, cara menjelaskan ulang
- [ ] Panel default tertutup (tidak mengganggu peserta)
- [ ] `README.md` fase memuat kunci jawaban semua quest dalam satu tempat
- [ ] Tugas & mini-proyek dari `KURIKULUM.md` sudah dimasukkan sebagai checklist

---

## Uji Akhir: Tes Tiga Pertanyaan

Bayangkan peserta baru membaca satu modul selesai. Jawab jujur:

1. **Apakah dia bisa menjelaskan ulang konsepnya dengan kata-katanya sendiri?**
   Kalau tidak → materi kurang analogi dan kurang animasi.

2. **Apakah dia bisa mengerjakan soal yang angkanya berbeda dari contoh?**
   Kalau tidak → langkah perhitungan kurang jelas, atau quest kurang bervariasi.

3. **Apakah mentor bisa mengajar dari bahan ini tanpa menyiapkan apa-apa lagi?**
   Kalau tidak → catatan mentor kurang lengkap.

Kalau ada satu saja jawaban "tidak", bahan ajar belum siap dipakai.
