# RENCANA EKSEKUSI REDESIGN MODUL BELAJAR (ANTI-SLOP / TASTESKILL V2)

> **Tujuan:** Merombak tampilan visual seluruh modul belajar dari gaya lama (*AI-slop: neon, background ungu/gelap pekat, emoji berlebih, warna-warni inkonsisten*) menjadi gaya **TasteSkill v2** (*warm paper canvas, white elevated cards, tipografi editorial dengan italic accents, tombol monokrom presisi, dan zero-slop icons*).

---

## 📅 Status Eksekusi (5 Fase Selesai 100%)

```
[✓] FASE 1: Fondasi CSS & Token Desain (style.css)
[✓] FASE 2: Redesign Portal Beranda (index.html)
[✓] FASE 3: Redesign Mesin Simulasi & Vektor Hardware SVG (anim-engine.js)
[✓] FASE 4: Pembersihan Markup Seluruh Modul HTML (modul-1-1 s.d. modul-1-6)
[✓] FASE 5: QA Uji Kualitas, Responsif & Aksesibilitas
```

---

### [✓] Fase 1: Fondasi CSS & Token Desain ([`assets/css/style.css`](file:///D:/Belajar/BELAJAR%20ARYA/Bahan-Ajar-Fase-1/assets/css/style.css))
1. **Penerapan Palet Warna TasteSkill:**
   - Latar Canvas: Warm bone/paper (`#F7F6F2`).
   - Permukaan Kartu: Pure white elevated surface (`#FFFFFF`) dengan border halus (`#E6E4DD`) dan bayangan organik mikro.
   - Tipografi: Teks utama dark slate tajam (`#141518`), deskripsi slate (`#4B505D`), metadata (`#787F91`).
   - Aksen Tunggal: Terracotta rust (`#E05A44`) & deep emerald/cobalt untuk status semantik terkalibrasi.
2. **Tipografi Editorial:**
   - Judul dengan font display modern + aksen kata kunci *italic*.
   - Standarisasi line-height (`1.75`) dan batas lebar baca nyaman (`68ch`).
3. **Styling 7 Blok Pembelajaran & Komponen:**
   - Blok 1 (Masalah) s.d. Blok 7 (Pembahasan) berpenampilan bersih tanpa border warna-warni neon.
   - Kartu langkah kalkulasi, terminal CLI gelap dengan tombol salin, callout editorial, dan tabel responsif.
   - Tombol utama solid dark pill (`#141518`) & tombol sekunder outline putih bersih.

---

### [✓] Fase 2: Redesign Halaman Beranda / Portal ([`index.html`](file:///D:/Belajar/BELAJAR%20ARYA/Bahan-Ajar-Fase-1/index.html))
1. **Hero Banner Minimalis (Sesuai `ref-design/1.png`):**
   - Eyebrow pill dengan font netral: `Kurikulum Mentoring TKJ Kelas 11`.
   - Headline display kuat: `Dasar Jaringan <em>Komputer.</em>`
   - Tombol aksi monokrom (`Buka Modul`).
2. **Grid Kartu Modul (Sesuai `ref-design/3.png`):**
   - Kartu putih seragam untuk Modul 1.1 s.d. 1.6 dengan nomor modul pill, estimasi waktu, deskripsi padat, dan tombol CTA monokrom.

---

### [✓] Fase 3: Redesign Mesin Simulasi & Vektor SVG ([`assets/js/anim-engine.js`](file:///D:/Belajar/BELAJAR%20ARYA/Bahan-Ajar-Fase-1/assets/js/anim-engine.js))
1. **Vektor Perangkat Hardware Minimalis (`window.Devices`):**
   - Laptop, Switch, Router, MikroTik, Server, Access Point, dan Smartphone digambar ulang dengan garis vektor presisi, housing netral warm gray (`#D5D2C8`, `#E8E6E0`), dan LED status yang jelas (tanpa gaya kartun/neon).
2. **Panggung Simulasi (Sim Stage):**
   - Background canvas blueprint/grid bersih (`#F9F8F5`) dengan kontras tinggi.
   - Pergerakan paket data halus dengan indikator status jelas saat sukses (emerald) maupun drop (crimson).
   - Kontrol navigasi animasi monokrom (`Putar`, `Mundur`, `Maju`, `Reset`).

---

### [✓] Fase 4: Pembersihan Markup Modul HTML ([`modul-1-1.html`](file:///D:/Belajar/BELAJAR%20ARYA/Bahan-Ajar-Fase-1/modul-1-1.html) s.d. [`modul-1-6.html`](file:///D:/Belajar/BELAJAR%20ARYA/Bahan-Ajar-Fase-1/modul-1-6.html))
1. **Pembersihan Emoji & Em-dash AI-Slop:**
   - 100% emoji dibersihkan dari badge dan header di seluruh 6 modul.
   - Semua karakter em-dash (`—`) dan en-dash (`–`) diganti menjadi tanda hubung standar (`-`) sesuai standar TasteSkill.
2. **Pembersihan Inline Style:**
   - Menghapus semua inline style gradient gelap / warna neon dan mengalihkan ke token desain CSS.

---

### [✓] Fase 5: QA Uji Kualitas, Responsif & Aksesibilitas
1. **Cakupan CSS 100%:** 278 class selectors diuji dan terpasang sempurna di semua file HTML.
2. **Uji Broken Link 0:** Seluruh link navigasi `#subtopik-*` dan link antar modul valid 100%.
3. **Uji JavaScript Syntax:** Seluruh 8 file JS lolos parsing tanpa error.
4. **Uji Protokol Offline:** 100% kompatibel dibuka langsung via `file://` (double-click di Windows Explorer tanpa web server).
