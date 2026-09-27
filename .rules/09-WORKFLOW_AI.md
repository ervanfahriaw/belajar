# 09 — WORKFLOW EKSEKUSI AI

> Langkah baku yang **wajib** diikuti AI agent dari saat menerima prompt sampai menyatakan pekerjaan selesai.

---

## 1. Pemicu

Prompt yang mengaktifkan workflow ini:
- `buatkan bahan ajar fase {n}`
- `buatkan bahan ajar fase {n} modul {x.y}`
- `lanjutkan bahan ajar fase {n}`

---

## 2. Tahap 0 — Baca Aturan (WAJIB, jangan dilewati)

Sebelum menulis kode apa pun, baca berurutan:

```
1. 00-README.md              → pahami konteks & filosofi
2. KURIKULUM.md              → ambil isi materi fase yang diminta
3. 02-KETENTUAN_PEMBUATAN.md → struktur wajib
4. 08-PEDAGOGI.md            → kedalaman & contoh emas
5. 03-STRUKTUR_FOLDER.md     → batasan teknis
6. 04-DESIGN.md              → sistem desain
7. 05-ANIMASI.md             → spesifikasi animasi
8. 06-QUEST.md               → format quest
9. 07-ASET_VISUAL.md         → aturan gambar
10. 10-QA_CHECKLIST.md       → tahu standar kelulusan sejak awal
```

**Larangan:** jangan mulai membuat file HTML sebelum kesepuluh file di atas dibaca. Melewati tahap ini adalah penyebab nomor satu hasil yang mengecewakan.

---

## 3. Tahap 1 — Rencana Materi (Tampilkan ke Mentor Sebelum Membangun)

Buat dan **tampilkan** rencana ini dulu, minta konfirmasi singkat:

```
FASE {n} — {judul fase}
Estimasi total: {x} halaman modul

Modul {n}.1 — {judul}
  Sub-topik:
    1. {judul} → animasi: {nama}, quest: {jumlah}
    2. {judul} → animasi: {nama}, quest: {jumlah}
  Studi kasus: {judul kasus}
  Proyek modul: {dari kurikulum}

Modul {n}.2 — {judul}
  ...
```

Kalau mentor menjawab "lanjut" atau tidak merevisi, baru bangun.

---

## 4. Tahap 2 — Bangun Fondasi

Urutan pembuatan file (jangan diacak):

```
1. Bahan-Ajar-Fase-{n}/assets/css/style.css     ← seluruh design system
2. Bahan-Ajar-Fase-{n}/assets/js/anim-engine.js ← mesin animasi + Devices SVG
3. Bahan-Ajar-Fase-{n}/assets/js/core.js        ← mesin quest, progress, toggle mentor
4. Bahan-Ajar-Fase-{n}/index.html               ← daftar modul
5. Bahan-Ajar-Fase-{n}/modul-{n}-1.html + js    ← modul pertama
6. ... modul berikutnya satu per satu
7. Bahan-Ajar-Fase-{n}/README.md                ← ringkasan + kunci jawaban
```

**Penting:** selesaikan **satu modul sampai benar-benar lengkap** (7 blok × semua sub-topik) sebelum pindah ke modul berikutnya. Jangan membuat 5 modul setengah jadi.

---

## 5. Tahap 3 — Bangun Per Sub-Topik

Untuk setiap sub-topik, kerjakan berurutan dan jangan lompat:

```
[ ] Blok 1 — Tulis masalah/hook (mulai dari situasi nyata)
[ ] Blok 2 — Tulis konsep + minimal 1 analogi
[ ] Blok 3 — Bangun animasi (SVG + langkah + narasi + kontrol)
[ ] Blok 4 — Tulis detail teknis (asal-usul rumus WAJIB ada)
[ ] Blok 5 — Tulis studi kasus + solusi lengkap bertahap
[ ] Blok 6 — Tulis quest (minimal 1, ikut aturan tingkat)
[ ] Blok 7 — Bangun animasi jawaban + pembahasan
[ ] Tambahkan kotak "⚠️ Sering Keliru"
[ ] Tambahkan panel Catatan Mentor
```

Kalau salah satu tidak terisi, sub-topik itu belum selesai.

---

## 6. Tahap 4 — Verifikasi Mandiri

Jalankan `10-QA_CHECKLIST.md` **sebelum** melapor selesai. Kalau ada item gagal, perbaiki dulu.

Minimal verifikasi teknis:
- Buka setiap HTML, pastikan tidak ada error di console
- Pastikan semua animasi bisa diputar, dijeda, diulang
- Pastikan semua tombol "Tampilkan Jawaban" berfungsi
- Pastikan tidak ada `fetch()` lokal / `type="module"` (akan gagal di `file://`)
- Pastikan halaman tetap rapi di lebar 375px (HP)

---

## 7. Tahap 5 — Laporan Selesai

Format laporan ke mentor:

```
✅ Bahan Ajar Fase {n} selesai

Lokasi : Bahan-Ajar-Fase-{n}/
Buka   : klik dua kali index.html

Isi:
- {x} modul
- {y} sub-topik
- {z} animasi interaktif
- {q} quest ({a} dasar / {b} menengah / {c} lanjut)
- {s} studi kasus lengkap

Catatan:
- {hal yang perlu perhatian mentor, misal: foto perangkat nyata belum ada, bisa ditambahkan ke assets/img/devices/}
```

---

## 8. Aturan Saat Folder Sudah Ada

Kalau folder fase yang diminta sudah ada:

1. **Jangan langsung timpa.**
2. Tanyakan: *"Folder Fase {n} sudah ada. Mau (a) tambah modul baru, (b) perbarui modul tertentu, atau (c) bangun ulang dari awal?"*
3. Untuk pilihan (a) dan (b), pertahankan file yang sudah ada dan hanya sentuh yang perlu.

---

## 9. Aturan Konsistensi Antar-Fase

- Sistem desain, mesin animasi, dan mesin quest **harus identik** di semua fase. Salin `style.css`, `anim-engine.js`, dan `core.js` dari fase sebelumnya kalau sudah ada, lalu tambahkan yang baru — jangan tulis ulang dari nol dengan gaya berbeda.
- Kalau ada perbaikan pada mesin (misalnya animasi lebih halus), sebutkan ke mentor bahwa fase sebelumnya bisa ikut diperbarui.

---

## 10. Yang Harus Ditanyakan ke Mentor (Boleh Bertanya)

AI **boleh dan sebaiknya** bertanya kalau:
- Kurikulum menyebut topik yang terlalu luas untuk 1 modul → tanya mau dipecah atau dipadatkan
- Ada pilihan pendekatan yang berbeda hasilnya (misal: pakai contoh kasus sekolah atau kantor)
- Peserta mungkin belum punya prasyarat tertentu

AI **tidak perlu** bertanya soal:
- Warna, font, layout → sudah diatur di `04-DESIGN.md`
- Struktur folder → sudah diatur di `03-STRUKTUR_FOLDER.md`
- Jumlah quest → sudah diatur di `06-QUEST.md`

Bertanya hal yang sudah diatur hanya memperlambat mentor.
