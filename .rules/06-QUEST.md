# 06 — SPESIFIKASI QUEST

> Quest adalah alat ukur pemahaman. **Setiap sub-topik wajib punya minimal 1 quest.** Tanpa quest, mentor tidak punya cara tahu peserta benar-benar paham atau cuma mengangguk.

---

## 1. Aturan Dasar

1. Quest muncul **setelah** materi sub-topik selesai, bukan di akhir modul saja.
2. Peserta **harus mencoba menjawab dulu**. Jawaban tidak boleh terlihat sebelum tombol ditekan.
3. Tombol bertuliskan **"Tampilkan Jawaban"**.
4. Setelah ditekan: muncul **animasi pembahasan** + penjelasan teks + (kalau relevan) langkah perhitungan.
5. Quest tidak boleh menghukum. Tidak ada skor merah menyala, tidak ada "SALAH!" besar. Fokusnya belajar, bukan menilai.

---

## 2. Tipe Quest

### Tipe A — Pilihan Ganda (Konsep)
Untuk menguji pemahaman konsep dan membongkar miskonsepsi.
- 4 opsi
- **Pengecoh harus masuk akal** — ambil dari miskonsepsi nyata, bukan opsi asal-asalan
- Setelah dijawab: jelaskan kenapa opsi benar itu benar, **dan kenapa opsi lain salah**

### Tipe B — Isian Perhitungan
Untuk topik berhitung (subnetting, VLSM, jumlah host).
- Peserta mengetik jawaban ke kolom input
- Pengecekan otomatis (normalisasi spasi, tidak peduli huruf besar/kecil)
- Setelah ditekan "Tampilkan Jawaban": muncul **langkah perhitungan lengkap**, bukan cuma angka akhir

### Tipe C — Studi Kasus Terbuka
Untuk melatih penalaran, seperti contoh: *"Perangkat tidak terhubung WiFi, apakah termasuk satu jaringan?"*
- Peserta menulis jawaban bebas di textarea (tidak dinilai otomatis)
- Setelah tombol ditekan: muncul **jawaban ideal + animasi penjelasan**
- Sertakan **rubrik singkat**: "Jawabanmu sudah bagus kalau menyebut: (a) …, (b) …, (c) …"

### Tipe D — Interaktif / Drag & Klik
Untuk topik yang lebih kuat dipahami lewat tindakan.
- Contoh: seret label lapisan OSI ke urutan yang benar; klik perangkat mana yang perlu router untuk saling terhubung
- Umpan balik langsung saat elemen dilepas di tempat benar/salah

### Tipe E — Debugging / Cari Kesalahan
Diberikan sebuah konfigurasi/topologi yang salah, peserta harus menemukan letak kesalahannya.
- Ini tipe paling mendekati pekerjaan nyata, wajib ada minimal 1 per modul mulai Modul 1.2

---

## 3. Format Data Quest

```javascript
window.QUEST_MODUL_1_1 = [
  {
    id: "q-jaringan-01",
    subTopik: "apa-itu-jaringan",
    tipe: "kasus",                    // pilihan | isian | kasus | interaktif | debug
    tingkat: "dasar",                 // dasar | menengah | lanjut
    pertanyaan: "Ada satu HP di ruangan yang sama, tapi tidak terhubung ke WiFi. Apakah HP itu termasuk bagian dari jaringan? Bisakah dia berkomunikasi dengan laptop di jaringan tersebut?",
    petunjuk: "Pikirkan dua hal: apakah ada jalur fisik/nirkabel, dan apakah dia punya alamat di jaringan itu.",
    jawabanIdeal: "Tidak termasuk. Berada di ruangan yang sama tidak membuat sebuah perangkat menjadi bagian dari jaringan...",
    rubrik: [
      "Menyebut bahwa kedekatan fisik tidak sama dengan terhubung",
      "Menyebut perlunya koneksi (media) — kabel atau WiFi",
      "Menyebut perlunya alamat IP di jaringan yang sama",
      "Menyimpulkan komunikasi gagal / paket tidak sampai"
    ],
    animasiJawaban: "sim-perangkat-tidak-terhubung",
    penjelasan: "Sebuah perangkat baru menjadi bagian dari jaringan kalau dua syarat terpenuhi...",
    miskonsepsi: "Banyak yang mengira 'satu ruangan = satu jaringan'. Padahal yang menentukan adalah koneksi dan pengalamatan, bukan jarak fisik."
  },

  {
    id: "q-subnet-03",
    subTopik: "subnetting",
    tipe: "isian",
    tingkat: "menengah",
    pertanyaan: "Jaringan 192.168.10.0/24 dibagi menjadi 4 subnet sama besar. Berapa Network ID subnet ke-3 dan berapa jumlah host yang bisa dipakai per subnet?",
    kolom: [
      { label: "Network ID subnet ke-3", jawaban: ["192.168.10.128"] },
      { label: "Jumlah host per subnet",  jawaban: ["62"] }
    ],
    langkahPembahasan: [
      { judul: "Tentukan berapa bit yang dipinjam", kenapa: "Untuk membuat 4 subnet, kita butuh 2 bit (2² = 4).", hitung: "2ⁿ ≥ 4 → n = 2", hasil: "/24 + 2 = /26" },
      { judul: "Hitung jumlah host per subnet", kenapa: "Sisa bit host = 32 − 26 = 6 bit. Dikurangi 2 karena Network ID dan Broadcast tidak boleh dipakai perangkat.", hitung: "2⁶ − 2 = 64 − 2", hasil: "62 host" },
      { judul: "Hitung blok (jarak antar subnet)", kenapa: "Ukuran tiap blok = 256 − nilai oktet subnet mask terakhir.", hitung: "256 − 192 = 64", hasil: "Blok = 64" },
      { judul: "Daftar Network ID tiap subnet", kenapa: "Mulai dari 0, lalu naik sebesar ukuran blok.", hitung: "0, 64, 128, 192", hasil: "Subnet ke-3 = 192.168.10.128" }
    ],
    animasiJawaban: "sim-bagi-4-subnet"
  }
];
```

---

## 4. Tampilan Quest (Wajib)

```
┌─ 🎯 QUEST ──────────────────────────────── [Tingkat: Menengah] ─┐
│                                                                 │
│  Pertanyaan ...                                                 │
│                                                                 │
│  [ kolom jawaban / pilihan / textarea ]                         │
│                                                                 │
│  💡 Petunjuk (klik untuk buka)                                  │
│                                                                 │
│              [ Tampilkan Jawaban ]                              │
└─────────────────────────────────────────────────────────────────┘

        ↓ setelah tombol ditekan (slide-down 500ms)

┌─ ✅ PEMBAHASAN ─────────────────────────────────────────────────┐
│                                                                 │
│  [ ANIMASI JAWABAN berjalan otomatis di sini ]                  │
│                                                                 │
│  Jawaban: ...                                                   │
│  Kenapa: ...                                                    │
│                                                                 │
│  [ Langkah perhitungan — kalau tipe isian ]                     │
│                                                                 │
│  ⚠️ Sering keliru: ...                                          │
│                                                                 │
│  [ Coba Lagi ]   [ Quest Berikutnya ]                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Aturan Jumlah & Tingkat Kesulitan

| Cakupan | Jumlah quest | Komposisi tingkat |
|---|---|---|
| Per sub-topik | 1–3 | minimal 1 dasar |
| Per modul (total) | 8–15 | 40% dasar, 40% menengah, 20% lanjut |
| Quest Akhir Modul | 5–8 | campuran semua sub-topik, minimal 1 tipe debug |

**Tingkat kesulitan harus naik bertahap**, tidak boleh melompat. Kalau quest pertama subnetting sudah minta VLSM 5 divisi, peserta akan menyerah.

---

## 6. Penyimpanan Progres (Opsional tapi Disarankan)

```javascript
// Wajib dibungkus try/catch — localStorage bisa diblokir di file://
try {
  localStorage.setItem('quest-selesai-1-1', JSON.stringify(daftarId));
} catch (e) { /* abaikan, fitur ini bonus saja */ }
```

Kalau berhasil, tampilkan tanda centang pada quest yang sudah dibuka pembahasannya, dan progress "6 dari 12 quest selesai" di header modul.

---

## 7. Aturan Penulisan Soal

**Bagus:**
> "Sebuah warnet punya 30 komputer. Pemiliknya ingin memisahkan 10 komputer untuk gaming dan 20 untuk kantor, dengan jaringan 192.168.5.0/24. Rancang pembagian subnetnya."

**Buruk:**
> "Hitung subnet dari 192.168.5.0/24 dengan 2 subnet."

Bedanya: yang bagus punya **konteks nyata**, peserta harus menerjemahkan kebutuhan jadi angka sendiri — itu keterampilan yang dipakai di dunia kerja.

**Aturan:**
- Selalu bungkus soal dalam skenario nyata (sekolah, warnet, kantor, pabrik, rumah)
- Hindari soal yang jawabannya bisa ditebak tanpa paham
- Untuk soal hitung, gunakan angka yang berbeda dari contoh di materi (jangan sama persis)
