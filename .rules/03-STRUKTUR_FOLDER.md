# 03 — STRUKTUR FOLDER & BATASAN TEKNOLOGI

---

## 1. Struktur Folder Wajib

Setiap fase = satu folder mandiri. Folder fase **tidak boleh** saling bergantung — Fase 1 harus tetap bisa dibuka meski folder Fase 2 dihapus.

```
Bahan-Ajar-Fase-1/
├── index.html                  ← halaman daftar modul (pintu masuk fase ini)
├── modul-1-1.html              ← Modul 1.1 — Dasar Jaringan
├── modul-1-2.html              ← Modul 1.2 — Routing & Switching
├── modul-1-3.html
├── modul-1-4.html
├── modul-1-5.html
├── README.md                   ← cara pakai + daftar isi fase ini (untuk mentor)
└── assets/
    ├── css/
    │   └── style.css           ← SATU file CSS untuk seluruh fase
    ├── js/
    │   ├── core.js             ← mesin quest, progress bar, toggle panel mentor
    │   ├── anim-engine.js      ← helper animasi yang dipakai semua modul
    │   ├── modul-1-1.js        ← animasi & data quest khusus modul 1.1
    │   ├── modul-1-2.js
    │   └── ...
    └── img/
        ├── devices/            ← foto/ilustrasi perangkat nyata
        │   ├── switch.svg
        │   ├── router.svg
        │   ├── laptop.svg
        │   └── ...
        └── icons/              ← ikon UI
```

### Aturan penamaan
- Folder fase: `Bahan-Ajar-Fase-{n}` (gunakan tanda hubung, bukan spasi — supaya aman dibuka di semua OS)
- Halaman modul: `modul-{fase}-{urutan}.html` → `modul-1-1.html`
- File JS modul: `modul-{fase}-{urutan}.js` → sama persis dengan nama HTML-nya
- Nama file gambar: huruf kecil semua, tanda hubung, tanpa spasi

---

## 2. Batasan Teknologi (SANGAT PENTING)

Bahan ajar ini harus bisa dibuka dengan **klik dua kali pada file HTML**, artinya berjalan di protokol `file://`. Ini membawa batasan teknis yang tidak boleh dilanggar:

### ✅ WAJIB / BOLEH
- HTML5 + CSS3 + JavaScript **vanilla** (tanpa framework)
- SVG inline untuk semua diagram & animasi
- CSS animation / transition
- `requestAnimationFrame` untuk animasi berbasis JS
- Web Animations API (`element.animate()`)
- `<script src="assets/js/xxx.js"></script>` biasa dengan variabel global
- `localStorage` untuk menyimpan progres peserta (opsional, bungkus dengan try/catch)

### ❌ DILARANG KERAS
| Dilarang | Alasan |
|---|---|
| `fetch()` untuk membaca file lokal (JSON, dsb) | Diblokir CORS di protokol `file://` — halaman akan blank |
| `<script type="module">` / `import`/`export` | Sama, diblokir di `file://` |
| React, Vue, Svelte, atau framework apa pun | Butuh build step, melanggar "klik langsung jalan" |
| `npm install` / bundler (Vite, Webpack) | Melanggar "tanpa build" |
| CDN eksternal sebagai dependensi wajib | Materi harus tetap jalan offline |
| Google Fonts via link | Sama — gunakan font sistem |

**Konsekuensi praktis:** semua data (soal quest, konfigurasi animasi) ditulis sebagai **objek JavaScript biasa di dalam file `.js`**, bukan file `.json` yang di-fetch.

Contoh benar:
```javascript
// assets/js/modul-1-1.js
window.MODUL_1_1 = {
  quests: [ /* ... */ ],
  animasi: { /* ... */ }
};
```

---

## 3. Font

Gunakan font stack sistem supaya tidak butuh internet:

```css
--font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-mono: "SF Mono", "Cascadia Code", Consolas, "Courier New", monospace;
```

Font mono **wajib** dipakai untuk semua yang berupa alamat IP, perintah CLI, dan hasil perhitungan biner — supaya digitnya sejajar dan mudah dibaca.

---

## 4. Ukuran & Performa

- Satu halaman modul sebaiknya tidak melebihi **±2.500 baris HTML**. Kalau modul terlalu besar, pecah menjadi beberapa halaman (`modul-1-1-bagian-1.html`, dst) dan hubungkan dengan navigasi.
- Total ukuran folder satu fase sebaiknya di bawah **20 MB** supaya mudah dikirim lewat WhatsApp/Drive.
- Semua gambar perangkat sebaiknya **SVG** (ringan, tajam di semua ukuran layar). Kalau harus PNG/JPG, kompres di bawah 200 KB per file.

---

## 5. Responsif

Bahan ajar harus terbaca di:
- Laptop (utama — untuk sesi mentoring)
- Tablet & HP (untuk peserta mengulang belajar sendiri)

Aturan:
- Gunakan CSS Grid/Flexbox dengan `minmax()` dan `auto-fit`
- Semua SVG animasi wajib punya `viewBox` + `preserveAspectRatio` supaya ikut mengecil, **jangan** pakai lebar piksel tetap
- Di layar < 768px: panel dua kolom berubah jadi satu kolom
- Tombol minimal 44×44 px supaya nyaman ditekan di layar sentuh

---

## 6. File README.md di Dalam Folder Fase

Setiap folder fase wajib punya `README.md` singkat untuk mentor, isinya:
- Daftar modul beserta estimasi durasi
- Cara membuka (klik `index.html`)
- Daftar quest dan kunci jawabannya (supaya mentor tidak perlu buka-tutup web saat mengoreksi)
- Catatan urutan pengajaran yang disarankan
