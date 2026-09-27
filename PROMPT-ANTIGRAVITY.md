# PROMPT UNTUK ANTIGRAVITY — Urutan Pemakaian

> Salin-tempel prompt di bawah secara berurutan. Jangan lompat, terutama Prompt 0 dan 1.

---

## PERSIAPAN (lakukan di luar Antigravity)

Buat folder project, lalu masukkan folder aturan ke dalamnya:

```
bahan-ajar-adik/
└── .rules/
    ├── 00-README.md
    ├── 02-KETENTUAN_PEMBUATAN.md
    ├── 03-STRUKTUR_FOLDER.md
    ├── 04-DESIGN.md
    ├── 05-ANIMASI.md
    ├── 06-QUEST.md
    ├── 07-ASET_VISUAL.md
    ├── 08-PEDAGOGI.md
    ├── 09-WORKFLOW_AI.md
    ├── 10-QA_CHECKLIST.md
    └── KURIKULUM.md
```

Buka folder `bahan-ajar-adik/` di Antigravity, baru mulai Prompt 0.

---

## PROMPT 0 — Kalibrasi Awal (WAJIB, sekali saja di awal project)

```
Halo. Di project ini ada folder .rules/ yang berisi aturan lengkap untuk membuat bahan ajar berbasis web.

Tugas pertamamu HANYA membaca dan memahami, JANGAN membuat file apa pun dulu.

Lakukan ini:
1. Baca SEMUA file di folder .rules/ secara berurutan sesuai daftar di 00-README.md bagian 3.
2. Setelah selesai membaca, laporkan kembali padaku dalam format singkat:
   - Siapa mentor dan siapa pesertanya
   - 5 filosofi non-negotiable yang kamu tangkap
   - Struktur 7 blok wajib di setiap sub-topik
   - Batasan teknis yang tidak boleh dilanggar (dan kenapa)
   - Daftar fase yang ada di KURIKULUM.md beserta jumlah modulnya
3. Terakhir, sebutkan 3 hal yang menurutmu paling mudah keliru saat mengeksekusi aturan ini.

Jangan menulis kode. Jangan membuat folder. Hanya laporan pemahaman.
```

**Kenapa perlu:** kalau AI langsung disuruh bikin, dia cenderung skim aturannya. Prompt ini memaksa dia benar-benar membaca dan kamu bisa langsung tahu kalau pemahamannya melenceng — sebelum ribuan baris kode terlanjur dibuat.

**Cek jawabannya.** Kalau ada yang salah tangkap, koreksi dulu:
```
Poin nomor X yang kamu sebutkan kurang tepat. Yang benar adalah [...]. Baca ulang file [nama file] bagian [nomor], lalu perbaiki pemahamanmu.
```

---

## PROMPT 1 — Rencana Fase 1 (belum membuat kode)

```
Sekarang buatkan RENCANA bahan ajar untuk Fase 1 (Jaringan & Infrastruktur).

Ikuti format rencana di 09-WORKFLOW_AI.md bagian 3. Untuk setiap modul, sebutkan:
- Daftar sub-topik
- Nama animasi yang akan dibuat per sub-topik + apa yang akan terlihat bergerak di animasi itu
- Jumlah dan tipe quest per sub-topik
- Judul studi kasus per sub-topik

Khusus Modul 1.1, tulis rencananya sedetail contoh emas di 08-PEDAGOGI.md.

Jangan membuat file dulu. Tampilkan rencananya, aku akan review.
```

Review rencananya. Kalau kurang dalam, balas:
```
Sub-topik [nama] rencananya masih dangkal. Bandingkan dengan contoh emas subnetting di 08-PEDAGOGI.md bagian C — di situ ada kenapa-konsep-ini-ada, kapan dipakai, asal-usul rumus, VLSM, studi kasus bertabel, dan 4 quest bertingkat. Perdalam sub-topik tadi sampai setara itu.
```

---

## PROMPT 2 — Bangun Fondasi (CSS + mesin animasi + mesin quest)

```
Rencana disetujui. Sekarang bangun FONDASI-nya dulu, belum modul.

Buat file berikut sesuai 03-STRUKTUR_FOLDER.md dan 09-WORKFLOW_AI.md bagian 4:
1. Bahan-Ajar-Fase-1/assets/css/style.css — implementasi lengkap design system di 04-DESIGN.md (variabel warna, tipografi, komponen 7 blok, kartu langkah, terminal, panel mentor, responsif)
2. Bahan-Ajar-Fase-1/assets/js/anim-engine.js — mesin animasi sesuai kontrak API di 05-ANIMASI.md bagian 4, plus window.Devices berisi SVG perangkat sesuai 07-ASET_VISUAL.md bagian 3
3. Bahan-Ajar-Fase-1/assets/js/core.js — mesin quest (semua tipe di 06-QUEST.md), progress bar, toggle panel mentor, penyimpanan progres

Ingat batasan: vanilla JS, tanpa module, tanpa fetch, tanpa CDN. Harus jalan di protokol file://.

Setelah selesai, buatkan satu file uji Bahan-Ajar-Fase-1/_test.html yang menampilkan semua komponen dan 1 animasi contoh, supaya aku bisa cek tampilannya dulu sebelum lanjut.
```

Buka `_test.html`. Kalau tampilannya sudah oke, lanjut. Kalau belum:
```
Di _test.html, [sebutkan masalahnya: warna terlalu gelap / animasi terlalu cepat / kartu terlalu sempit]. Perbaiki di style.css dan anim-engine.js, jangan tambal per halaman.
```

---

## PROMPT 3 — Bangun Modul 1.1 (satu modul saja, sampai benar-benar tuntas)

```
Fondasi sudah oke. Sekarang bangun Modul 1.1 — Dasar Jaringan secara LENGKAP.

Aturan:
- Kerjakan sub-topik satu per satu sampai tuntas 7 blok, jangan paralel setengah-setengah
- Sub-topik "Apa itu Jaringan Komputer" dan "Subnetting" HARUS mengikuti contoh emas di 08-PEDAGOGI.md bagian B dan C — sedalam itu, jangan lebih ringkas
- Subnetting wajib mencakup VLSM lengkap dengan aturan urut dari kebutuhan terbesar
- Setiap animasi wajib punya narasi per langkah + tombol Putar/Langkah/Ulang
- Setiap quest jawabannya tersembunyi sampai tombol "Tampilkan Jawaban" ditekan, dan pembahasannya wajib disertai animasi

Setelah selesai, jalankan 10-QA_CHECKLIST.md pada modul ini dan laporkan hasilnya item per item. Kalau ada yang gagal, perbaiki dulu sebelum lapor selesai.
```

---

## PROMPT 4 — Review & Perbaikan Modul 1.1

Buka `modul-1-1.html`, lalu pakai prompt sesuai temuanmu:

**Kalau materinya kurang dalam:**
```
Sub-topik [nama] masih terasa dangkal. Yang kurang: [sebutkan]. Perdalam dengan menambahkan: kenapa konsep ini ada, kapan dipakai di dunia nyata, asal-usul rumusnya, dan minimal 1 kotak "Sering Keliru".
```

**Kalau animasinya kurang hidup:**
```
Animasi [nama] belum memenuhi 05-ANIMASI.md. Masalahnya: [paket bergerak terlalu cepat / tidak singgah di node / kegagalan tidak terlihat jelas]. Perbaiki: tambahkan jeda di tiap node, perlambat ke 1500ms per hop, dan pastikan paket yang dibuang berubah merah, mengecil, jatuh, disertai label alasan.
```

**Kalau quest kurang:**
```
Tambahkan quest di sub-topik [nama]: 1 soal tipe debug dengan skenario nyata, lengkap dengan animasi jawaban yang menunjukkan di titik mana kesalahannya terjadi dan bagaimana versi yang benar.
```

---

## PROMPT 5 — Lanjut Modul Berikutnya

```
Modul 1.1 sudah oke. Lanjutkan ke Modul 1.2 — Routing & Switching dengan standar kedalaman yang sama persis seperti Modul 1.1.

Gunakan kembali style.css, anim-engine.js, dan core.js yang sudah ada — jangan bikin sistem baru.

Animasi wajib untuk modul ini minimal: perjalanan paket lintas router (MAC berubah tiap hop, IP tetap), VLAN yang memisahkan lalu lintas, dan perbandingan static vs dynamic routing.

Jalankan QA checklist di akhir.
```

Ulangi pola ini untuk modul 1.3, 1.4, 1.5.

---

## PROMPT 6 — Penutup Fase

```
Semua modul Fase 1 sudah selesai. Sekarang lengkapi fase ini:

1. Buat Bahan-Ajar-Fase-1/index.html — daftar semua modul dengan estimasi durasi, progres peserta, dan deskripsi singkat tiap modul
2. Buat Bahan-Ajar-Fase-1/README.md — untuk mentor, berisi daftar modul, cara membuka, KUNCI JAWABAN semua quest dalam satu tempat, dan urutan mengajar yang disarankan
3. Jalankan 10-QA_CHECKLIST.md untuk SELURUH fase, laporkan item per item
4. Cek tampilan di lebar 375px, 768px, dan 1440px — perbaiki kalau ada yang meluber
5. Pastikan console browser bersih di semua halaman
```

---

## PROMPT 7 — Fase Berikutnya (setelah Fase 1 selesai dipakai mengajar)

```
buatkan bahan ajar fase 2
```

Sesingkat itu — karena aturannya sudah kamu setel di awal. Tapi kalau sesi Antigravity-nya baru (context sudah hilang), selalu awali dengan Prompt 0 lagi.

---

## PROMPT TAMBAHAN — Dipakai Kapan Saja

**Menambah satu animasi:**
```
Tambahkan animasi baru di modul [x.y] sub-topik [nama] yang menjelaskan [konsep]. Ikuti format step-based di 05-ANIMASI.md bagian 3, lengkap dengan narasi per langkah.
```

**Menambah quest:**
```
Tambahkan 2 quest di modul [x.y]: satu tingkat menengah tipe isian, satu tingkat lanjut tipe kasus. Pakai skenario nyata (bukan soal abstrak), dan angkanya harus berbeda dari contoh di materi.
```

**Memperbaiki aturan itu sendiri:**
```
Aku menemukan kekurangan: [jelaskan]. Perbaiki di file aturan yang relevan di .rules/, jangan tambal di hasil web-nya — supaya fase berikutnya ikut membaik. Sebutkan file mana yang kamu ubah dan apa perubahannya.
```

**Kalau AI mulai melenceng dari aturan:**
```
Berhenti. Kamu melanggar [aturan] di [file].md. Baca ulang file itu, lalu perbaiki pekerjaanmu agar sesuai. Jangan lanjut ke bagian lain sebelum ini beres.
```

---

## Tips Memakai Antigravity untuk Project Ini

1. **Satu modul = satu sesi.** Jangan minta 5 modul sekaligus — hasilnya pasti dangkal karena context terbagi.
2. **Selalu buka hasilnya di browser** sebelum lanjut ke modul berikutnya. Jangan percaya laporan "sudah selesai" tanpa cek sendiri.
3. **Kalau context penuh dan AI mulai lupa aturan**, mulai sesi baru dan jalankan Prompt 0 lagi.
4. **Simpan feedback yang berulang ke file aturan.** Kalau kamu sudah dua kali mengoreksi hal yang sama, itu tandanya aturannya yang kurang jelas — perbaiki di `.rules/`.
5. **Commit ke git tiap selesai satu modul**, supaya kalau AI merusak sesuatu kamu bisa kembali.
