# 00 — README: Sistem Pembuatan Bahan Ajar Berbasis Web

> **File ini adalah pintu masuk.** Setiap AI agent (Claude Code, Codex, Antigravity, dsb.) yang diminta membuat bahan ajar WAJIB membaca file ini lebih dulu, lalu membaca file lain sesuai urutan di bawah.

---

## 1. Apa Ini?

Ini adalah **kumpulan aturan (rule files)** untuk memproduksi bahan ajar berbentuk **web statis interaktif** dari kurikulum mentoring yang sudah ada.

Tujuan akhir: pemilik repo (Ervan, sebagai mentor) cukup mengetik satu prompt —

```
buatkan bahan ajar fase 1
```

— dan AI akan menghasilkan satu folder web lengkap, siap dibuka dengan klik dua kali pada file HTML, berisi materi Fase 1 dengan animasi, gambar, studi kasus, dan quest interaktif.

---

## 2. Siapa Penggunanya

| Peran | Siapa | Kebutuhan |
|---|---|---|
| **Mentor** | Ervan — mahasiswa Teknik Telekomunikasi semester 7, background jaringan/AI/IoT/web | Butuh bahan yang memudahkan *mengajar*: alur penjelasan jelas, catatan mentor, pertanyaan pemantik, contoh kasus siap pakai |
| **Peserta** | Adik Ervan — siswa SMK jurusan TKJ, kelas 11 awal. Sudah pernah pakai Cisco Packet Tracer & install Linux dari tugas sekolah, tapi belum mendalam | Butuh bahan yang memudahkan *memahami*: visual bergerak, analogi konkret, latihan bertahap, umpan balik langsung |

**Prinsip utama yang lahir dari kebutuhan ini:**
> Otak manusia jauh lebih cepat memahami sesuatu lewat **gambar dan gerakan** daripada lewat teks. Karena itu setiap konsep yang rumit **WAJIB** punya visual bergerak, bukan sekadar diagram diam.

---

## 3. Daftar File Aturan & Urutan Baca

AI **harus** membaca dalam urutan ini sebelum menulis satu baris kode pun:

| # | File | Isi | Wajib? |
|---|---|---|---|
| 00 | `00-README.md` | File ini — gambaran umum & alur kerja | ✅ |
| 01 | `KURIKULUM.md` | Sumber materi: fase, modul, topik, tugas, proyek | ✅ |
| 02 | `02-KETENTUAN_PEMBUATAN.md` | Apa saja yang WAJIB ada di setiap web bahan ajar | ✅ |
| 03 | `03-STRUKTUR_FOLDER.md` | Struktur folder, penamaan file, batasan teknologi | ✅ |
| 04 | `04-DESIGN.md` | Sistem desain: warna, tipografi, komponen, layout | ✅ |
| 05 | `05-ANIMASI.md` | Spesifikasi animasi + pola kode yang dipakai | ✅ |
| 06 | `06-QUEST.md` | Format quest, tombol "Tampilkan Jawaban", animasi jawaban | ✅ |
| 07 | `07-ASET_VISUAL.md` | Aturan gambar perangkat, ikon, ilustrasi SVG | ✅ |
| 08 | `08-PEDAGOGI.md` | Alur wajib tiap sub-topik + contoh emas (gold standard) | ✅ |
| 09 | `09-WORKFLOW_AI.md` | Langkah eksekusi AI dari prompt sampai selesai | ✅ |
| 10 | `10-QA_CHECKLIST.md` | Checklist verifikasi sebelum menyatakan selesai | ✅ |

---

## 4. Perintah yang Dikenali

| Prompt Mentor | Yang Harus Dilakukan AI |
|---|---|
| `buatkan bahan ajar fase 0` | Bangun folder `Bahan-Ajar-Fase-0/` lengkap untuk semua modul di Fase 0 |
| `buatkan bahan ajar fase 1` | Bangun folder `Bahan-Ajar-Fase-1/` lengkap untuk semua modul di Fase 1 |
| `buatkan bahan ajar fase 1 modul 1.2` | Bangun/atau tambahkan hanya modul 1.2 ke dalam folder Fase 1 yang sudah ada |
| `perbaiki animasi di modul 1.1 bagian subnetting` | Edit file animasi terkait saja, jangan bangun ulang seluruh fase |
| `tambahkan quest di modul 1.1` | Tambahkan quest baru sesuai format `06-QUEST.md` |

**Aturan penting:** jangan pernah menimpa folder fase yang sudah ada tanpa konfirmasi. Kalau folder sudah ada, tanyakan dulu: tambah, perbarui, atau ganti?

---

## 5. Filosofi Bahan Ajar Ini (Non-Negotiable)

Lima hal ini adalah alasan sistem ini dibuat. Kalau salah satunya dilanggar, hasilnya dianggap gagal:

1. **Setiap konsep dijawab "kenapa" sebelum "bagaimana".** Jangan pernah langsung mengajarkan cara menghitung subnetting tanpa menjelaskan kenapa subnetting perlu ada dan masalah apa yang dia selesaikan.
2. **Setiap konsep rumit punya animasi bergerak**, bukan gambar diam. Data harus terlihat *bergerak* dari perangkat A ke perangkat B, paket harus terlihat *dibuang* kalau memang gagal.
3. **Setiap sub-topik diakhiri studi kasus + quest.** Tidak ada sub-topik yang lewat tanpa alat ukur pemahaman.
4. **Setiap jawaban quest dijelaskan dengan animasi**, muncul setelah peserta menekan tombol "Tampilkan Jawaban" — bukan langsung terlihat.
5. **Setiap perangkat nyata ditampilkan gambarnya.** Kalau bicara switch, tampilkan wujud switch. Kalau bicara Jetson/Raspberry Pi, tampilkan wujud fisiknya.

---

## 6. Batasan Teknis Global

- Web harus **berjalan dengan cara klik dua kali file HTML** (protokol `file://`), tanpa server, tanpa `npm install`, tanpa proses build.
- **Tidak boleh ada dependensi internet wajib.** Materi harus tetap berfungsi penuh saat offline.
- Detail lengkap ada di `03-STRUKTUR_FOLDER.md`. Baca sebelum memilih teknologi apa pun.

---

## 7. Cara Mentor Menambah/Mengubah Aturan

File-file ini adalah "otak" sistem. Kalau di kemudian hari hasilnya masih kurang sesuai:

- Kurang dalam materinya → ubah `08-PEDAGOGI.md`
- Animasinya kurang hidup → ubah `05-ANIMASI.md`
- Tampilan kurang enak dilihat → ubah `04-DESIGN.md`
- Quest-nya kurang menantang → ubah `06-QUEST.md`

Perbaiki di file aturan, **bukan di hasil web-nya** — supaya semua fase berikutnya ikut membaik otomatis.
