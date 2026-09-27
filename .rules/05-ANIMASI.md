# 05 — SPESIFIKASI ANIMASI

> Ini file paling penting dalam sistem ini. Animasi bukan hiasan — animasi **adalah cara materi disampaikan**.

---

## 1. Prinsip Animasi Pendidikan

1. **Animasi harus menjawab pertanyaan, bukan sekadar bergerak.** Sebelum membuat animasi, tulis dulu: "animasi ini menjawab pertanyaan apa?" Kalau tidak ada jawabannya, animasi itu tidak perlu dibuat.
2. **Satu animasi = satu konsep.** Jangan menumpuk tiga konsep dalam satu simulasi. Pecah.
3. **Selalu ada narasi yang berubah mengikuti tahap animasi.** Peserta harus tahu "sekarang sedang terjadi apa".
4. **Selalu bisa diulang dan dijeda.** Peserta pemula butuh melihat berkali-kali.
5. **Kecepatan harus manusiawi.** Perjalanan paket data yang realistis (mikrodetik) tidak bisa dipahami manusia — perlambat jadi 1–3 detik per hop.
6. **Kegagalan harus terlihat sejelas keberhasilan.** Kalau paket dibuang, harus terlihat jelas *di mana* dibuang dan *kenapa*.

---

## 2. Anatomi Komponen Simulasi

Setiap animasi dibungkus dalam komponen dengan struktur tetap:

```html
<div class="sim" id="sim-pengiriman-data">
  <div class="sim__stage">
    <!-- SVG animasi di sini, wajib pakai viewBox -->
    <svg viewBox="0 0 900 400" preserveAspectRatio="xMidYMid meet">...</svg>
  </div>

  <div class="sim__narration">
    <span class="sim__step-badge">Langkah 1 dari 5</span>
    <p class="sim__text">HP menyiapkan pesan yang akan dikirim ke Laptop...</p>
  </div>

  <div class="sim__controls">
    <button data-action="play">▶ Putar</button>
    <button data-action="prev">⟨ Sebelumnya</button>
    <button data-action="next">Berikutnya ⟩</button>
    <button data-action="reset">⟲ Ulang</button>
    <input type="range" data-action="speed" min="0.5" max="2" step="0.25" value="1">
  </div>
</div>
```

**Wajib:** panel narasi dan panel kontrol. Animasi tanpa keduanya dianggap tidak memenuhi standar.

---

## 3. Model Animasi Berbasis Langkah (Step-Based)

Semua animasi dibuat sebagai **urutan langkah bernomor**, bukan satu gerakan panjang. Alasannya: mentor perlu bisa berhenti di langkah tertentu untuk menjelaskan.

Pola data:

```javascript
window.SIM_PENGIRIMAN_DATA = {
  id: "sim-pengiriman-data",
  judul: "Bagaimana pesan berjalan dari HP ke Laptop",
  pertanyaanYangDijawab: "Lewat mana saja data berjalan sebelum sampai tujuan?",
  langkah: [
    {
      narasi: "HP ingin mengirim pesan ke Laptop. Pesan dibungkus jadi paket data berisi alamat tujuan.",
      aksi: (ctx) => ctx.spawnPacket("hp"),
      durasi: 1200
    },
    {
      narasi: "Paket dikirim ke Switch. Switch membaca MAC Address tujuan untuk tahu port mana yang harus dilewati.",
      aksi: (ctx) => ctx.movePacket("hp", "switch"),
      durasi: 1500
    },
    {
      narasi: "Karena tujuan berada di jaringan yang sama, Switch meneruskan langsung ke Laptop. Router tidak perlu terlibat.",
      aksi: (ctx) => ctx.movePacket("switch", "laptop"),
      durasi: 1500
    },
    {
      narasi: "Paket sampai. Laptop membuka isi paket dan membaca pesannya.",
      aksi: (ctx) => ctx.arrive("laptop"),
      durasi: 1000
    }
  ]
};
```

Mesin animasi (`anim-engine.js`) yang menjalankan daftar langkah ini, mengatur tombol, dan memperbarui narasi.

---

## 4. Kontrak Fungsi `anim-engine.js`

File `assets/js/anim-engine.js` wajib menyediakan API berikut supaya semua modul konsisten:

```javascript
window.AnimEngine = {
  // Mendaftarkan dan menyiapkan simulasi
  register(config),

  // Kontrol
  play(id), pause(id), reset(id), goToStep(id, n), setSpeed(id, multiplier),

  // Helper gerak (dipakai di dalam `aksi`)
  movePacket(id, fromNode, toNode, opts),   // menggerakkan paket antar node
  spawnPacket(id, atNode, opts),            // memunculkan paket
  dropPacket(id, atNode, alasan),           // paket dibuang — wajib merah + ikon silang + teks alasan
  arrive(id, atNode),                       // paket sampai — wajib hijau + efek denyut
  highlight(id, elemen, warna),             // menyorot elemen
  showLabel(id, atNode, teks),              // label mengambang
  drawPath(id, dariNode, keNode)            // menggambar garis koneksi bertahap
};
```

Semua gerakan dibuat dengan **Web Animations API** (`element.animate()`) atau `requestAnimationFrame` — tanpa library eksternal.

---

## 5. Katalog Animasi Wajib

Berikut animasi minimum yang harus ada. Kalau materi memuat topik ini, animasinya **wajib** dibuat.

### Fase 1 — Jaringan

| Sub-topik | Animasi wajib | Yang harus terlihat |
|---|---|---|
| Apa itu jaringan | **Alur pengiriman pesan HP → Switch → Laptop** | Paket bergerak antar-perangkat, singgah di switch, sampai ke tujuan, node tujuan berdenyut hijau |
| Apa itu jaringan (kasus gagal) | **Perangkat tidak terhubung** | Perangkat di luar jaringan tampak abu-abu tanpa garis koneksi; paket bergerak lalu **jatuh & memudar merah** dengan label "Tidak ada jalur — paket dibuang" |
| Model OSI | **Enkapsulasi turun 7 lapis, dekapsulasi naik 7 lapis** | Data dibungkus header tiap turun satu lapis (kotak membesar), dan dibuka lagi tiap naik di sisi penerima |
| TCP/IP | **Pemetaan lapisan OSI → TCP/IP** | Blok OSI bergerak dan menyatu ke blok TCP/IP yang sesuai |
| IP Address | **Pembongkaran 32 bit** | IP desimal berubah jadi biner per oktet, garis pembatas network/host bergeser saat prefix diubah |
| Subnet mask | **Slider prefix /24 → /25 → /26** | Saat slider digeser: garis pembatas bergeser, jumlah host berubah real-time, blok jaringan terbelah secara visual |
| Subnetting | **Pembelahan blok alamat** | Satu balok panjang 256 alamat **terbelah** jadi 2, lalu 4, lalu 8 — dengan label rentang tiap potongan |
| VLSM | **Pembagian tidak rata sesuai kebutuhan** | Balok alamat dipotong dengan ukuran berbeda-beda (128, 64, 32, 4) sesuai jumlah host tiap divisi, sisa alamat ditampilkan |
| MAC vs IP | **Perjalanan lintas router** | IP tujuan tetap dari ujung ke ujung, sementara MAC berubah setiap melewati router — wajib terlihat label MAC berganti tiap hop |
| Hub vs Switch | **Perbandingan berdampingan** | Hub: paket disalin ke SEMUA port (banyak paket bergerak). Switch: hanya 1 paket ke port yang benar |
| Router | **Dua jaringan berbeda** | Paket berhenti di router, router membaca tabel routing, lalu meneruskan ke jaringan lain |
| VLAN | **Pemisahan logis dalam satu switch** | Dua warna VLAN dalam satu switch fisik; paket VLAN A tidak bisa menyeberang ke VLAN B (dibuang di batas) |
| Ping / ICMP | **Request & Reply** | Paket pergi (biru), lalu paket balik (hijau), dengan penghitung waktu ms berjalan |

### Fase 2 — Linux & Server
| Sub-topik | Animasi wajib |
|---|---|
| Permission | Tiga kelompok (owner/group/other) menyala saat bit rwx diubah |
| DNS | Perjalanan query: klien → resolver → root → TLD → authoritative → jawaban kembali |
| Docker | Perbandingan VM vs container: tumpukan lapisan yang berbeda tingginya |

### Fase 3 — IoT
| Sub-topik | Animasi wajib |
|---|---|
| MQTT | Publisher → Broker → Subscriber, dengan topik yang cocok/tidak cocok (yang tidak cocok dibuang di broker) |
| Sensor → Cloud | Nilai sensor naik-turun, data terkirim berkala, grafik terisi |

### Fase 4 — Web
| Sub-topik | Animasi wajib |
|---|---|
| Request-Response | Browser kirim request, server proses, response kembali, halaman ter-render |
| REST API | Perbandingan method GET/POST/PUT/DELETE terhadap data di server |

### Fase 5 — AI
| Sub-topik | Animasi wajib |
|---|---|
| Object detection | Kotak deteksi muncul bertahap pada gambar, dengan skor kepercayaan |
| Alur training | Dataset → label → training (loss menurun) → model → inference |

---

## 6. Animasi Jawaban Quest

Setiap quest **wajib** punya animasi jawaban yang muncul setelah tombol "Tampilkan Jawaban" ditekan.

Aturan khusus:
- Animasi jawaban harus **menjelaskan sebabnya**, bukan cuma menunjukkan hasil.
- Kalau jawabannya "tidak bisa terhubung", animasi harus menunjukkan **di titik mana** komunikasi gagal dan **kenapa**.
- Setelah animasi selesai, tampilkan ringkasan teks 2–3 kalimat.

Contoh (dari kebutuhan mentor):

> **Quest:** Ada 1 perangkat yang tidak terhubung ke WiFi. Apakah dia termasuk dalam jaringan itu? Apakah bisa berkomunikasi?
>
> **Animasi jawaban:**
> 1. Tampilkan jaringan: router WiFi + 2 perangkat terhubung (garis koneksi menyala) + 1 HP di pinggir tanpa garis koneksi (abu-abu)
> 2. HP abu-abu mencoba mengirim paket → paket bergerak sedikit ke arah router → **berhenti, berubah merah, jatuh, memudar**
> 3. Muncul label merah: *"Tidak ada jalur fisik/logis — paket dibuang"*
> 4. Sorot perangkat yang terhubung, tunjukkan mereka tetap bisa saling kirim (hijau)
> 5. Teks ringkasan: *"Tidak. Perangkat itu belum menjadi bagian dari jaringan karena belum ada koneksi (media + alamat IP). Tanpa jalur, paket tidak punya cara sampai, jadi dibuang. Perangkat lain yang sudah terhubung tetap bisa berkomunikasi."*

---

## 7. Durasi & Easing Standar

| Jenis gerakan | Durasi | Easing |
|---|---|---|
| Paket berpindah 1 hop | 1200–1800 ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Elemen muncul (fade in) | 400 ms | `ease-out` |
| Paket dibuang | 800 ms | `ease-in` (mengecil + memudar + jatuh) |
| Denyut saat sampai | 600 ms × 2 kali | `ease-in-out` |
| Highlight/sorot | 300 ms | `ease` |
| Slide-down panel jawaban | 500 ms | `ease-out` |

Pengali kecepatan dari slider peserta dikalikan ke semua durasi.

---

## 8. Aksesibilitas Animasi

```css
@media (prefers-reduced-motion: reduce) {
  /* Animasi jadi transisi instan, tapi narasi langkah tetap muncul */
}
```

Dan setiap simulasi wajib punya **mode teks**: daftar langkah dalam bentuk teks yang bisa dibaca tanpa menjalankan animasi (berguna saat mentor menjelaskan di papan tulis, atau saat animasi tidak berjalan).

---

## 9. Kesalahan Umum yang Harus Dihindari

| ❌ Salah | ✅ Benar |
|---|---|
| Paket bergerak lurus tanpa singgah di perangkat | Paket berhenti sejenak di setiap node, ada jeda + narasi |
| Animasi jalan sekali lalu selesai tanpa bisa diulang | Selalu ada tombol Ulang & Langkah |
| Semua gerakan langsung otomatis tanpa kontrol | Mentor harus bisa berhenti kapan saja |
| Kegagalan hanya ditandai teks "gagal" | Harus terlihat: paket berubah merah, jatuh, ada label alasan |
| SVG berukuran piksel tetap | Wajib `viewBox`, responsif |
| Narasi ditulis sekali di bawah animasi | Narasi harus **berubah** per langkah |
