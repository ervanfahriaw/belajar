# 04 — DESIGN SYSTEM (ANTI-SLOP EDITORIAL DESIGN - TASTESKILL V2)

> **Prinsip Utama:** Desain bersih, tenang, berfokus pada kejelasan pedagogis, kanvas bernyawa (*living warm bone canvas*), dan bebas dari klise AI (*zero AI-slop: no rainbow colors, no neon glows, no random emojis, no raw arrow symbols*).

---

## 1. Palet Warna (Warm Editorial & High Contrast)

```css
:root {
  /* Canvas & Permukaan */
  --bg-canvas:       #F7F6F2;   /* Latar utama: warm bone/paper yang nyaman di mata */
  --bg-surface:      #FFFFFF;   /* Kartu utama: elevated pure white */
  --bg-subtle:       #EFECE6;   /* Kartu sekunder / panel hook */
  --bg-inset:        #F3F1EC;   /* Kotak definisi, miskonsepsi, analogi */
  --bg-dark:         #141518;   /* Terminal & tombol primer */
  
  /* Border */
  --border-subtle:   #E6E4DD;   /* Border halus kartu */
  --border-strong:   #D5D2C8;   /* Border tombol & divider */

  /* Tipografi */
  --text-primary:    #141518;   /* Teks utama (tajam, kontras tinggi) */
  --text-secondary:  #4B505D;   /* Teks isi & penjelasan */
  --text-muted:      #787F91;   /* Caption & metadata */
  --text-inverse:    #FFFFFF;   /* Teks di atas warna gelap */

  /* Aksen Tunggal & Status Semantik */
  --accent-rust:     #E05A44;   /* Terracotta dot & aksen utama */
  --accent-rust-soft:#FDF2EF;
  
  --semantic-success:#15803D;   /* Berhasil / Paket sampai / Benar */
  --semantic-danger: #B91C1C;   /* Gagal / Dibuang / Salah */
  --semantic-warning:#B45309;   /* Peringatan / Sering keliru */
  --semantic-info:   #1D4ED8;   /* Jalur data aktif / Tautan */
}
```

---

## 2. Kanvas Latar Bernyawa (Living Background Canvas)

Latar belakang halaman tidak dibiarkan polos mati, melainkan diberi tekstur halus organik:
```css
body {
  background-color: #F7F6F2;
  background-image:
    radial-gradient(ellipse 70% 360px at 50% 0%, rgba(255, 255, 255, 0.95) 0%, transparent 100%),
    radial-gradient(circle 800px at 100% 0%, rgba(224, 90, 68, 0.02) 0%, transparent 70%),
    radial-gradient(circle at 1px 1px, rgba(20, 21, 24, 0.045) 1px, transparent 0);
  background-size: 100% 100%, 100% 100%, 24px 24px;
  background-attachment: fixed;
}
```

---

## 3. Tipografi & Hierarki

| Elemen | Ukuran | Berat | Gaya |
|---|---|---|---|
| **Judul Modul (H1)** | `clamp(2.2rem, 4vw, 3rem)` | `750` | Sans display + highlight kata kunci berhuruf *italic* |
| **Judul Sub-Topik (H2)** | `clamp(1.5rem, 2.5vw, 2rem)` | `750` | Bersih tanpa emoji |
| **Judul Blok (H3)** | `1.25rem` | `700` | Huruf kapital minimalis tanpa emoji berlebih |
| **Body Teks** | `0.96rem (15.5px)` | `400` | `line-height: 1.75`, `max-width: 68ch` |
| **Kode / Monospace** | `0.88rem` | `500` | Font SF Mono / Cascadia / Geist Mono |

---

## 4. Komponen 7 Blok Pembelajaran (Versi Redesign)

1. **Blok 1 Masalah (Hook):** Kartu putih murni + kotak pemantik inset netral (`#F3F1EC`) tanpa garis sisi kiri tebal.
2. **Blok 2 Konsep & Analogi:** Kotak definisi formal inset netral + analogi terstruktur tanpa emoji.
3. **Blok 3 Simulasi Interaktif:** Panggung visual bersih berlatar blueprint halus, perangkat vektor rapi, dan tombol navigasi monokrom (`Putar`, `Mundur`, `Maju`, `Reset`).
4. **Blok 4 Detail Teknis:** Kartu langkah bernomor, tabel data rapi, dan kotak kalkulasi biner/IP.
5. **Blok 5 Studi Kasus:** Skenario dunia kerja dengan resolusi langkah bertahap + ringkasan pelajaran penting.
6. **Blok 6 Quest Uji Pemahaman:** Soal bertingkat dengan pilihan ganda berdesain kartu pilihan bersih.
7. **Blok 7 Pembahasan Jawaban:** Panel slide-down beranimasi dengan status hijau emerald matang dan penjelasan mendalam.

---

## 5. Tombol & Animasi Interaktif
- **Tombol Utama (Primary):** Solid dark pill (`#141518` dengan teks putih tanpa simbol panah mentah).
- **Tombol Sekunder (Outline):** Pill putih bersih dengan border netral (`#D5D2C8`).
- **Tombol Kembali (Back):** Pill putih bersih bertuliskan `Daftar Modul` tanpa simbol `<-` atau `←`.
- **Fisik Taktil (Tactile Push):** `scale(0.97)` saat ditekan (`:active`) dan `translateY(-1px)` saat di-hover.
- **Transisi Halaman:** `fadeInUp 350ms cubic-bezier(0.16, 1, 0.3, 1)` saat halaman atau modul dibuka.
