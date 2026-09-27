# 02 — KETENTUAN PEMBUATAN

> Apa saja yang **WAJIB ADA** di setiap web bahan ajar. Ini adalah kontrak minimum. Boleh lebih, tidak boleh kurang.

---

## 1. Hierarki Bahan Ajar

```
FASE  →  MODUL  →  SUB-TOPIK  →  BLOK PEMBELAJARAN
```

- **Fase** = 1 folder web (contoh: Fase 1 — Jaringan & Infrastruktur)
- **Modul** = 1 halaman HTML (contoh: Modul 1.1 — Dasar Jaringan)
- **Sub-topik** = 1 section dalam halaman (contoh: Subnetting)
- **Blok pembelajaran** = struktur 7 bagian wajib di dalam setiap sub-topik (lihat bagian 3)

---

## 2. Isi Wajib Setiap Halaman Modul

Urutan dari atas ke bawah:

| No | Bagian | Keterangan |
|---|---|---|
| 1 | **Header modul** | Judul modul, nomor fase, estimasi durasi, tombol kembali ke daftar modul |
| 2 | **Progress bar sticky** | Menunjukkan posisi baca peserta (% scroll) + daftar sub-topik yang bisa diklik |
| 3 | **Tujuan pembelajaran** | Poin-poin "setelah modul ini kamu bisa…" diambil dari KURIKULUM.md |
| 4 | **Peta modul** | Visual daftar sub-topik yang akan dibahas, supaya peserta tahu perjalanannya |
| 5 | **Sub-topik 1..N** | Masing-masing mengikuti struktur 7 blok di bagian 3 |
| 6 | **Rangkuman modul** | Ringkasan semua istilah kunci dalam bentuk kartu |
| 7 | **Quest Akhir Modul** | 5–8 soal campuran dari semua sub-topik |
| 8 | **Tugas & Mini-Proyek** | Diambil persis dari KURIKULUM.md, ditulis sebagai checklist yang bisa dicentang |
| 9 | **Panel Catatan Mentor** | Bisa di-toggle buka/tutup. Isinya: naskah mengajar, miskonsepsi umum, pertanyaan pemantik, alokasi waktu |
| 10 | **Navigasi** | Tombol ke modul sebelumnya & berikutnya |

---

## 3. Struktur 7 Blok Wajib di Setiap Sub-Topik

**Ini adalah inti dari seluruh sistem.** Setiap sub-topik — tanpa kecuali — harus memiliki 7 blok berurutan berikut:

### Blok 1 — HOOK / MASALAH (Kenapa ini ada?)
Mulai dari masalah nyata, bukan dari definisi.
> Contoh untuk subnetting: *"Kantor kamu punya 1 jaringan dengan 254 alamat. Tapi bagian Keuangan tidak boleh bisa mengakses komputer bagian Produksi. Kalau semuanya dalam satu jaringan yang sama, semua orang bisa saling ping. Bagaimana cara memisahkannya?"*

Wajib berisi: pertanyaan pemantik yang membuat peserta penasaran.

### Blok 2 — KONSEP (Apa ini?)
Definisi + analogi dunia nyata yang dekat dengan kehidupan anak SMK.
Wajib berisi: minimal 1 analogi konkret (perumahan, jalan raya, kantor pos, gedung sekolah, dsb).

### Blok 3 — VISUAL BERGERAK (Bagaimana wujudnya?)
Animasi interaktif yang mensimulasikan konsep tersebut. **WAJIB ADA** untuk setiap sub-topik.
Wajib berisi: tombol kontrol (Putar / Ulang / Langkah berikutnya), narasi teks yang berubah mengikuti tahap animasi.
Detail teknis: lihat `05-ANIMASI.md`.

### Blok 4 — DETAIL TEKNIS (Bagaimana cara kerjanya?)
Penjelasan mendalam: aturan, rumus, tabel, format, langkah perhitungan.
Wajib berisi:
- Untuk topik berhitung: **langkah demi langkah bernomor**, setiap langkah dijelaskan *kenapa* langkah itu dilakukan, bukan cuma *apa* yang dilakukan.
- Hubungan antar-angka harus eksplisit. Contoh: "Kenapa 2⁷ − 2? Karena tersisa 7 bit host, dan 2 alamat dipesan khusus: 1 untuk Network ID, 1 untuk Broadcast ID."
- Untuk topik non-hitung: tabel perbandingan atau diagram beranotasi.

### Blok 5 — STUDI KASUS (Contoh nyata + solusinya)
Satu kasus lengkap bergaya dunia kerja, **beserta solusi yang dikerjakan langkah demi langkah sampai selesai**.
Wajib berisi:
- Latar kasus yang masuk akal (sekolah, kantor kecil, warnet, pabrik)
- Data/kebutuhan yang diketahui
- Penyelesaian bertahap, ditampilkan dalam kartu langkah-langkah
- Hasil akhir dalam bentuk tabel/diagram

### Blok 6 — QUEST (Alat ukur pemahaman)
**WAJIB ADA minimal 1 quest per sub-topik.** Peserta menjawab dulu, baru menekan "Tampilkan Jawaban".
Detail format: lihat `06-QUEST.md`.

### Blok 7 — JAWABAN BERANIMASI
Muncul hanya setelah tombol ditekan. Berisi: jawaban benar + **animasi yang menjelaskan kenapa** jawabannya begitu + penjelasan teks singkat.

---

## 4. Aturan Kedalaman Materi

Materi **tidak boleh** berhenti di permukaan. Untuk menilai "cukup dalam atau belum", gunakan tes berikut — jika ada satu saja yang tidak terjawab oleh bahan ajar, materi dianggap belum layak:

- [ ] Apakah dijelaskan **kenapa** konsep ini ada / masalah apa yang diselesaikan?
- [ ] Apakah dijelaskan **kapan** konsep ini dipakai di dunia nyata?
- [ ] Apakah ada **contoh angka konkret**, bukan cuma teori?
- [ ] Apakah **hubungan antar-elemen** dijelaskan (bukan cuma daftar fakta terpisah)?
- [ ] Apakah ada **variasi/turunan** dari konsep itu yang juga dijelaskan? (contoh: subnetting → VLSM, CIDR)
- [ ] Apakah ada **kesalahan umum** yang diperingatkan?
- [ ] Apakah peserta bisa **mengerjakan sendiri** setelah membacanya?

---

## 5. Aturan Panel Catatan Mentor

Setiap sub-topik wajib punya panel tersembunyi (default tertutup) berisi:

```
⏱  Estimasi waktu    : 15 menit
🎯  Poin kunci        : 3 hal yang wajib peserta kuasai dari sub-topik ini
🗣  Naskah pembuka    : kalimat pembuka yang bisa langsung diucapkan mentor
⚠️  Miskonsepsi umum  : kesalahan berpikir yang sering terjadi + cara meluruskannya
❓  Pertanyaan pemantik: 2-3 pertanyaan untuk memancing diskusi
🔁  Jika peserta bingung: cara menjelaskan ulang dengan pendekatan berbeda
```

Panel ini yang membuat bahan ajar **mempermudah mentor**, bukan cuma mempermudah peserta.

---

## 6. Aturan Bahasa

- Bahasa Indonesia santai-tapi-teknis. Sapa peserta dengan "kamu".
- Istilah teknis asing tetap dipakai dalam bahasa Inggris (subnet mask, broadcast, routing), tapi **selalu** diberi penjelasan Indonesia saat pertama kali muncul.
- Hindari kalimat panjang berbelit. Satu kalimat = satu ide.
- Jangan pakai bahasa yang merendahkan ("gampang kok", "ini mah gampang") — kalau peserta belum paham, kalimat itu membuat dia merasa bodoh.

---

## 7. Hal yang DILARANG

| Dilarang | Alasan |
|---|---|
| Sub-topik tanpa animasi | Melanggar filosofi utama |
| Sub-topik tanpa quest | Tidak ada alat ukur pemahaman |
| Jawaban quest langsung terlihat | Menghilangkan proses berpikir peserta |
| Materi hanya berupa daftar bullet | Bukan bahan ajar, itu cuma catatan |
| Menyebut perangkat tanpa menampilkan wujudnya | Peserta tidak bisa membayangkan |
| Rumus tanpa penjelasan asal-usulnya | Menghafal tanpa paham = gagal |
| Studi kasus tanpa solusi lengkap | Peserta tidak punya contoh cara menyelesaikan |
| Memakai library yang butuh internet/build | Melanggar batasan teknis |
