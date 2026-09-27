# 07 — ASET VISUAL (GAMBAR & IKON)

> Aturan: **kalau materi menyebut sebuah perangkat, peserta harus bisa melihat wujudnya.** Anak SMK yang baru belajar sering tidak tahu switch itu bentuknya seperti apa, bedanya dengan router bagaimana.

---

## 1. Kenapa Ini Penting

Peserta bisa hafal "switch bekerja di Layer 2" tapi saat masuk ke ruang server, dia tidak tahu yang mana switch. Gambar wujud nyata menutup jarak antara teori dan lapangan.

Karena itu: **setiap perangkat yang disebut wajib punya representasi visual**, dan setiap simulasi wajib memakai representasi yang sama (konsisten) supaya peserta terbiasa mengenalinya.

---

## 2. Strategi Aset (Offline-First)

Bahan ajar harus jalan offline, jadi urutan prioritasnya:

| Prioritas | Jenis | Kapan dipakai |
|---|---|---|
| 1 | **SVG buatan sendiri** (digambar dengan kode) | Default untuk semua perangkat & diagram. Ringan, tajam, bisa dianimasikan, bisa diberi warna sesuai state |
| 2 | **Foto nyata** (PNG/JPG di folder `assets/img/devices/`) | Untuk perangkat yang wujud fisiknya penting dikenali (switch rack, router MikroTik, Raspberry Pi, ESP32, konektor RJ45, kabel UTP) |
| 3 | Link eksternal | **Dilarang sebagai satu-satunya sumber.** Kalau dipakai, wajib ada fallback lokal |

**Penting untuk AI:** kalau tidak punya akses internet saat membuat bahan ajar, **jangan** menulis `<img src="https://...">` yang akan gagal dimuat. Buat SVG sendiri, dan tinggalkan catatan di README fase: *"Foto nyata untuk perangkat X bisa ditambahkan ke assets/img/devices/x.jpg"* — lalu sediakan placeholder SVG yang tetap informatif.

---

## 3. Standar Ilustrasi Perangkat (SVG)

Setiap perangkat digambar dengan gaya konsisten:

| Perangkat | Ciri visual wajib |
|---|---|
| **Laptop** | Layar + keyboard, tampak depan-miring |
| **HP** | Persegi panjang vertikal, ada notch/kamera |
| **Switch** | Kotak pipih horizontal dengan **deretan port** (minimal 8 port terlihat) + LED kecil |
| **Router** | Kotak dengan **antena** (untuk wireless) atau ikon persimpangan/panah bercabang (untuk router jaringan) |
| **Hub** | Mirip switch tapi lebih sederhana, diberi label "HUB" — dan di animasi selalu menyalin paket ke semua port |
| **Server** | Kotak tinggi vertikal dengan garis-garis rak |
| **Access Point** | Bulat/pipih dengan gelombang sinyal |
| **Raspberry Pi / ESP32** | Papan hijau/biru dengan pin header terlihat |
| **Internet/Cloud** | Bentuk awan |
| **Kabel UTP / RJ45** | Konektor bening dengan 8 kabel warna — penting untuk materi kabel straight/cross |

### Standar teknis SVG
- `viewBox` wajib, ukuran dasar `0 0 120 120` per ikon perangkat
- Warna diambil dari CSS variable supaya bisa berubah sesuai state:
  ```svg
  <rect fill="var(--bg-soft)" stroke="var(--border)" />
  ```
- Setiap perangkat punya **3 state visual**:
  - `normal` — warna standar
  - `aktif` — sedang mengirim/menerima, border `--info` + denyut halus
  - `nonaktif` — tidak terhubung, opacity 0.4 + grayscale
- Setiap perangkat wajib punya `<title>` untuk aksesibilitas: `<title>Switch 8 port</title>`

---

## 4. Simpan Sebagai Komponen, Bukan Salin-Tempel

Gambar SVG perangkat **jangan** ditulis berulang di setiap halaman. Simpan sebagai fungsi di `assets/js/anim-engine.js`:

```javascript
window.Devices = {
  switch: (opts = {}) => `<g class="device device--switch" data-state="${opts.state || 'normal'}">...</g>`,
  router: (opts = {}) => `...`,
  laptop: (opts = {}) => `...`,
  hp:     (opts = {}) => `...`,
  cloud:  (opts = {}) => `...`
};
```

Dengan begitu, mengubah tampilan switch cukup di satu tempat dan berlaku di seluruh fase.

---

## 5. Label Perangkat di Simulasi

Setiap perangkat dalam simulasi wajib menampilkan:

```
      [ gambar perangkat ]
          Switch-01
        192.168.1.1
     ↑ nama    ↑ alamat (kalau relevan dengan materi)
```

Untuk materi MAC vs IP, tampilkan keduanya — dan MAC-nya harus **berubah** saat melewati router (itu inti pelajarannya).

---

## 6. Gambar Pendukung Non-Perangkat

Selain perangkat, materi juga butuh:

| Kebutuhan | Bentuk |
|---|---|
| Diagram topologi | SVG dengan garis koneksi yang bisa dianimasikan |
| Tabel biner | Grid kotak 0/1 dengan warna berbeda untuk bagian network & host |
| Balok alamat IP | Batang horizontal yang bisa dibelah — untuk materi subnetting/VLSM |
| Tumpukan lapisan OSI | 7 balok bertumpuk yang bisa disorot satu per satu |
| Screenshot antarmuka | Untuk Packet Tracer/terminal Linux — **boleh** berupa tiruan yang digambar dengan HTML/CSS agar tetap ringan dan tajam |

---

## 7. Ilustrasi Terminal & CLI

Untuk menampilkan perintah, jangan pakai screenshot — buat komponen terminal palsu dengan HTML:

```html
<div class="terminal">
  <div class="terminal__bar"><span></span><span></span><span></span> bash</div>
  <pre class="terminal__body"><span class="prompt">user@server:~$</span> ping 192.168.1.10
64 bytes from 192.168.1.10: icmp_seq=1 ttl=64 time=0.42 ms</pre>
</div>
```

Kelebihannya: bisa dianimasikan (teks muncul bertahap seperti sedang diketik), bisa dicopy peserta, dan ukurannya nol KB.

**Wajib:** untuk perintah penting, animasikan output-nya muncul baris demi baris — jauh lebih terasa nyata daripada teks yang langsung muncul semua.

---

## 8. Checklist Aset Per Modul

Sebelum modul dinyatakan selesai:

- [ ] Semua perangkat yang disebut punya ilustrasi
- [ ] Ilustrasi konsisten antara bagian penjelasan dan bagian simulasi
- [ ] Tidak ada `<img>` yang menunjuk ke internet tanpa fallback
- [ ] Semua SVG punya `viewBox` dan `<title>`
- [ ] Perangkat punya state normal/aktif/nonaktif yang jelas terlihat bedanya
- [ ] Ada minimal 1 komponen terminal untuk modul yang menyinggung CLI
