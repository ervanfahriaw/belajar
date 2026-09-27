# 08 — PEDAGOGI & CONTOH EMAS (GOLD STANDARD)

> File ini menunjukkan **seberapa dalam** materi harus ditulis. Dua contoh di bawah adalah standar minimum. Kalau hasil AI lebih dangkal dari contoh ini, hasilnya ditolak.

---

## BAGIAN A — PRINSIP PEDAGOGI

### A.1 Urutan Berpikir yang Dipakai

Setiap sub-topik mengikuti alur berpikir alami manusia:

```
Masalah nyata  →  "oh, ternyata ada masalahnya"
     ↓
Konsep         →  "oh, ini namanya X"
     ↓
Lihat bergerak →  "oh, jadi begini jalannya"
     ↓
Detail teknis  →  "oh, rumusnya dari sini asalnya"
     ↓
Studi kasus    →  "oh, dipakainya begini di dunia nyata"
     ↓
Quest          →  "hmm, aku bisa sendiri nggak ya?"
     ↓
Pembahasan     →  "oh iya, ternyata begitu"
```

Urutan ini **tidak boleh dibalik**. Menaruh rumus sebelum masalah = peserta menghafal tanpa paham.

### A.2 Aturan "Kenapa Sebelum Bagaimana"

Setiap rumus, angka, dan langkah **wajib** dijelaskan asal-usulnya.

| ❌ Dangkal | ✅ Dalam |
|---|---|
| "Jumlah host = 2ⁿ − 2" | "Sisa bit host ada 6, jadi ada 2⁶ = 64 kombinasi alamat. Tapi 2 alamat tidak boleh dipakai perangkat: alamat pertama dipakai sebagai Network ID (nama jaringannya), alamat terakhir dipakai sebagai Broadcast (untuk mengirim ke semua perangkat sekaligus). Sisanya 64 − 2 = 62 alamat yang bisa dipasang ke perangkat." |
| "Subnet mask /26 berarti 255.255.255.192" | "/26 artinya 26 bit pertama adalah bagian network. Kalau ditulis biner: 11111111.11111111.11111111.11000000. Oktet terakhir 11000000 kalau dihitung desimal = 128 + 64 = 192. Karena itu /26 = 255.255.255.192." |

### A.3 Aturan Koneksi Antar-Konsep

Materi tidak boleh terasa seperti potongan-potongan terpisah. Setiap sub-topik baru **wajib** dihubungkan dengan yang sebelumnya:

> "Ingat di bagian IP Address tadi, kita bilang 32 bit dibagi jadi bagian Network dan Host? Nah, subnetting adalah cara **menggeser garis pembatas** itu. Itu saja. Semua rumus di bawah hanyalah akibat dari pergeseran garis tersebut."

### A.4 Aturan Miskonsepsi

Setiap sub-topik wajib memuat minimal 1 kotak **"⚠️ Sering Keliru"** yang mengangkat kesalahan berpikir umum. Contoh:

> **⚠️ Sering Keliru**
> Banyak yang mengira subnet mask menentukan "berapa banyak perangkat yang boleh terhubung". Bukan. Subnet mask menentukan **sampai bit mana sebuah alamat dianggap satu jaringan**. Jumlah perangkat hanyalah akibat dari situ.

### A.5 Aturan Pengulangan Spiral

Konsep penting diulang di tingkat kedalaman berbeda:
- IP Address muncul di Modul 1.1 (dasar) → dipakai lagi di 1.2 (routing) → dipakai lagi di Fase 3 (MQTT) → dipakai lagi di Fase 4 (server deployment)
- Setiap kemunculan ulang wajib diberi penanda: *"Ini konsep yang sama dengan di Modul 1.1, sekarang kita pakai untuk…"*

---

## BAGIAN B — CONTOH EMAS 1: "APA ITU JARINGAN KOMPUTER"

Berikut bagaimana satu sub-topik sederhana harus ditulis lengkap.

### Blok 1 — MASALAH
> Kamu punya file tugas di laptop. Temanmu duduk 2 meter di sebelahmu dengan laptopnya sendiri. Dua laptop, satu ruangan, jaraknya dekat sekali.
>
> **Pertanyaan: apakah file itu otomatis bisa dibuka temanmu?**
>
> Tidak. Kedekatan fisik tidak ada hubungannya. Dua perangkat baru bisa bertukar data kalau ada **jalur** dan **aturan alamat** di antara mereka. Itulah yang kita sebut jaringan.

### Blok 2 — KONSEP
Definisi + analogi:
> Jaringan komputer = kumpulan perangkat yang terhubung sehingga bisa bertukar data.
>
> **Analogi perumahan:** Bayangkan satu komplek perumahan.
> - **Jalan** = media (kabel UTP atau sinyal WiFi)
> - **Alamat rumah** = IP Address
> - **Nomor KTP penghuni** = MAC Address (menempel ke orangnya, bukan ke rumahnya)
> - **Satpam di gerbang komplek** = Router (mengatur keluar-masuk ke komplek lain)
> - **Tukang pos dalam komplek** = Switch (mengantar surat antar rumah di dalam komplek)
>
> Rumah yang belum dibangun jalannya, atau belum punya alamat, tidak akan bisa menerima surat — meskipun letaknya persis di tengah komplek.

### Blok 3 — SIMULASI (animasi wajib)
`sim-pengiriman-data` — HP mengirim pesan ke Laptop:
1. HP membungkus pesan jadi paket (paket muncul, ada label alamat tujuan)
2. Paket bergerak lewat kabel/WiFi ke Switch
3. Switch membaca alamat tujuan, memilih port yang benar (port yang dipilih menyala)
4. Paket bergerak ke Laptop
5. Laptop membuka paket (denyut hijau)

Narasi berubah tiap langkah. Ada tombol Ulang & Langkah.

### Blok 4 — DETAIL TEKNIS
- Jenis jaringan berdasarkan luas: **PAN → LAN → MAN → WAN** (dengan contoh nyata masing-masing: bluetooth headset, jaringan sekolah, jaringan satu kota, internet)
- Komponen wajib sebuah jaringan: (1) minimal 2 perangkat, (2) media penghubung, (3) protokol/aturan, (4) alamat unik
- Topologi dasar: star, bus, ring, mesh — dengan diagram + kelebihan/kekurangan masing-masing
- Istilah yang akan sering muncul: host, node, client, server, bandwidth, latency

### Blok 5 — STUDI KASUS
> **Kasus: Lab komputer SMK**
> Sebuah lab punya 20 PC, 1 printer, dan 1 server penyimpanan tugas. Semua terhubung ke 1 switch 24 port, dan switch terhubung ke router sekolah untuk akses internet.
>
> **Pertanyaan analisis:**
> - Ada berapa host di jaringan ini? → 22 (20 PC + printer + server); router dihitung sebagai gateway
> - Kalau internet sekolah mati, apakah PC masih bisa mengirim tugas ke server? → **Masih bisa**, karena komunikasi ke server hanya melewati switch (jaringan lokal), tidak melewati router
> - Kalau switch mati, apa yang terjadi? → Semua komunikasi antar-perangkat terputus, karena switch adalah satu-satunya titik penghubung (kelemahan topologi star)
>
> **Pelajaran yang diambil:** komunikasi lokal dan komunikasi internet adalah dua jalur berbeda. Ini akan jadi dasar saat kita belajar routing nanti.

### Blok 6 — QUEST
> **Quest 1 (tipe kasus):**
> Ada satu HP di ruangan yang sama, tapi tidak terhubung ke WiFi. Apakah HP itu termasuk bagian dari jaringan tersebut? Bisakah dia berkomunikasi dengan laptop yang ada di jaringan itu?
>
> *Petunjuk: pikirkan dua syarat — apakah ada jalur, dan apakah dia punya alamat di jaringan yang sama.*

### Blok 7 — PEMBAHASAN + ANIMASI
Animasi `sim-perangkat-tidak-terhubung`:
1. Tampil jaringan: router WiFi + laptop + PC (garis koneksi menyala biru)
2. Satu HP di pinggir, abu-abu, **tanpa garis koneksi**
3. HP mencoba mengirim paket → paket bergerak sedikit → **berhenti di udara, berubah merah, mengecil, jatuh, memudar**
4. Label merah muncul: *"Tidak ada jalur — paket dibuang"*
5. Lalu sorot laptop ↔ PC yang tetap bisa saling kirim (hijau) untuk menunjukkan jaringan itu sendiri baik-baik saja

Teks pembahasan:
> **Tidak termasuk, dan tidak bisa berkomunikasi.**
>
> Sebuah perangkat baru menjadi bagian dari jaringan kalau dua syarat terpenuhi:
> 1. **Ada jalur** — terhubung secara fisik (kabel) atau nirkabel (WiFi terasosiasi ke access point)
> 2. **Punya alamat** — mendapat IP address yang berada di jaringan yang sama
>
> HP tadi tidak memenuhi keduanya. Berada di ruangan yang sama tidak membuat perangkat terhubung, sama seperti berdiri di depan rumah orang tidak membuatmu jadi penghuninya.
>
> **⚠️ Sering keliru:** "satu ruangan = satu jaringan". Yang menentukan adalah koneksi dan pengalamatan, bukan jarak.
>
> **Pengecualian yang menarik:** kalau HP itu menyalakan Bluetooth atau WiFi Direct dan laptop ikut terhubung ke situ, mereka membentuk **jaringan baru** (PAN) — terpisah dari jaringan WiFi tadi. Jadi bukan soal "bisa/tidak bisa selamanya", tapi soal "ada jaringan yang menghubungkan atau tidak".

---

## BAGIAN C — CONTOH EMAS 2: "SUBNETTING" (LENGKAP)

Ini contoh untuk topik berhitung. Perhatikan kedalamannya.

### Blok 1 — MASALAH
> Sebuah kantor punya jaringan `192.168.1.0/24` — tersedia 254 alamat, semua perangkat ada di dalamnya.
>
> Muncul tiga masalah nyata:
> 1. **Keamanan** — komputer bagian Keuangan bisa diakses dari komputer bagian Produksi, karena semua satu jaringan. Tidak ada pemisah.
> 2. **Keramaian (broadcast)** — setiap kali ada perangkat mengirim broadcast, SEMUA 254 perangkat harus mendengarkan. Makin banyak perangkat, makin sesak jaringannya.
> 3. **Pemborosan** — kalau kantor cuma punya 20 perangkat, 234 alamat lainnya terbuang percuma.
>
> **Pertanyaan: bagaimana cara membelah satu jaringan besar jadi beberapa jaringan kecil, tanpa harus menyewa blok IP baru?**
>
> Jawabannya: **subnetting**.

### Blok 2 — KONSEP
> Subnetting = **menggeser garis pembatas antara bagian Network dan bagian Host** pada sebuah alamat IP, sehingga satu blok besar terbelah menjadi beberapa blok kecil yang saling terpisah.
>
> **Analogi gedung:** Bayangkan satu lantai kantor yang luas tanpa sekat — semua orang bisa dengar semua pembicaraan, semua orang bisa jalan ke mana saja. Subnetting adalah **memasang sekat** jadi beberapa ruangan. Tiap ruangan punya pintu sendiri (gateway), dan untuk pindah ruangan harus lewat pintu — pintunya itu router.
>
> **Kapan dipakai di dunia nyata:**
> - Memisahkan divisi (Keuangan / Produksi / Tamu) agar tidak bisa saling akses bebas
> - Memisahkan jaringan WiFi tamu dari jaringan kantor
> - Memisahkan jaringan CCTV/IoT dari jaringan komputer kerja
> - Mengurangi broadcast di jaringan besar agar tidak lambat
> - Menghemat alamat IP publik (di sisi ISP)

### Blok 3 — SIMULASI (wajib, 2 animasi)
1. **`sim-slider-prefix`** — slider interaktif /24 → /25 → /26 → /27. Saat digeser:
   - Garis pembatas network/host bergeser di tampilan biner
   - Balok alamat terbelah secara visual jadi 2, 4, 8 bagian
   - Angka "jumlah subnet" dan "host per subnet" berubah real-time
   - Peserta bisa *merasakan* hubungan terbalik: makin banyak subnet → makin sedikit host

2. **`sim-belah-blok`** — animasi pembelahan `192.168.1.0/24` jadi 2 subnet /25, dengan label rentang tiap potongan muncul bertahap, lalu ditunjukkan bahwa perangkat di subnet A **tidak bisa** langsung ping ke subnet B (paket dibuang) kecuali lewat router.

### Blok 4 — DETAIL TEKNIS

**4.1 Dasar yang harus dipahami dulu**
- 1 alamat IPv4 = 32 bit, dibagi 4 oktet (8 bit)
- Subnet mask menandai batas: bit `1` = bagian Network, bit `0` = bagian Host
- `/24` artinya 24 bit pertama adalah Network

```
IP        : 192.168.1.10
Biner     : 11000000.10101000.00000001.00001010
Mask /24  : 11111111.11111111.11111111.00000000
            └────── NETWORK ──────┘ └─ HOST ─┘
```

**4.2 Kenapa "pinjam bit"?**
> Untuk membuat lebih banyak jaringan, kita **mengambil bit dari bagian Host dan menjadikannya bagian Network**. Bit itu tidak hilang — hanya berpindah tugas. Karena itu istilahnya "meminjam bit dari host".
>
> Akibatnya selalu: **jumlah jaringan bertambah, jumlah host per jaringan berkurang.** Ini pertukaran yang tidak bisa dihindari — total alamatnya tetap sama.

**4.3 Tiga rumus dan asal-usulnya**

| Rumus | Kenapa begitu |
|---|---|
| Jumlah subnet = 2ⁿ (n = bit yang dipinjam) | Setiap bit punya 2 kemungkinan (0 atau 1). Pinjam 2 bit → 2×2 = 4 kombinasi → 4 subnet |
| Jumlah host = 2ʰ − 2 (h = sisa bit host) | 2ʰ adalah semua kombinasi alamat. Dikurangi 2 karena alamat pertama = Network ID (nama jaringan) dan alamat terakhir = Broadcast (kirim ke semua). Keduanya tidak boleh dipasang ke perangkat |
| Ukuran blok = 256 − nilai oktet mask terakhir | Ini cara cepat mencari jarak antar Network ID. Kalau mask /26 = 255.255.255.192, maka 256 − 192 = 64, jadi Network ID-nya melompat tiap 64: 0, 64, 128, 192 |

**4.4 Langkah baku menghitung subnetting**

```
① Tentukan kebutuhan: berapa subnet? atau berapa host per subnet?
② Hitung bit yang dipinjam (n) atau bit host yang disisakan (h)
③ Tentukan prefix baru dan subnet mask-nya
④ Hitung ukuran blok = 256 − oktet terakhir mask
⑤ Daftar semua Network ID (kelipatan ukuran blok)
⑥ Untuk tiap subnet tentukan: Network ID, host pertama, host terakhir, Broadcast
```

Setiap langkah ditampilkan sebagai kartu langkah (lihat `04-DESIGN.md` bagian 4) dengan bagian "Kenapa" terisi.

**4.5 Tabel referensi cepat (Kelas C)**

| Prefix | Subnet Mask | Ukuran Blok | Jumlah Subnet | Host per Subnet |
|---|---|---|---|---|
| /24 | 255.255.255.0 | 256 | 1 | 254 |
| /25 | 255.255.255.128 | 128 | 2 | 126 |
| /26 | 255.255.255.192 | 64 | 4 | 62 |
| /27 | 255.255.255.224 | 32 | 8 | 30 |
| /28 | 255.255.255.240 | 16 | 16 | 14 |
| /29 | 255.255.255.248 | 8 | 32 | 6 |
| /30 | 255.255.255.252 | 4 | 64 | 2 |

Beri catatan: `/30` sering dipakai untuk koneksi antar-router (point-to-point), karena hanya butuh 2 alamat.

**4.6 VLSM — wajib dijelaskan terpisah dan mendalam**

> **Masalah dengan subnetting biasa:** membagi rata. Kalau kantor punya divisi dengan kebutuhan 100, 50, 25, dan 2 perangkat, lalu semua dibagi rata /26 (62 host), maka divisi 100 orang **tidak cukup**, sementara divisi 2 orang membuang 60 alamat.
>
> **VLSM (Variable Length Subnet Mask)** = membagi dengan ukuran berbeda-beda sesuai kebutuhan masing-masing.
>
> **Aturan emas VLSM: kerjakan dari kebutuhan TERBESAR ke TERKECIL.** Kalau dibalik, alamat akan tumpang tindih dan harus diulang dari awal.
>
> **Kenapa harus dari yang terbesar?** Karena blok besar hanya bisa dimulai di posisi kelipatan ukurannya. Kalau blok kecil sudah menempati awal blok, blok besar tidak lagi punya tempat yang rapi.

Animasi wajib untuk VLSM: **`sim-vlsm`** — balok alamat 256 dipotong bertahap: 128 → 64 → 32 → 4, dengan label divisi dan sisa alamat yang masih kosong.

### Blok 5 — STUDI KASUS LENGKAP (wajib, dengan solusi bertahap)

> **Kasus: Jaringan SMK Nusantara**
>
> Sekolah mendapat blok `192.168.10.0/24`. Kebutuhan:
>
> | Divisi | Jumlah perangkat |
> |---|---|
> | Lab Komputer | 50 |
> | Ruang Guru | 25 |
> | Administrasi | 10 |
> | Link router ke router | 2 |
>
> **Pertanyaan:** rancang pembagian alamatnya dengan VLSM agar hemat dan tidak tumpang tindih.
>
> ---
> **SOLUSI — LANGKAH DEMI LANGKAH**
>
> **Langkah 1 — Urutkan dari kebutuhan terbesar**
> Lab (50) → Guru (25) → Admin (10) → Link (2)
>
> **Langkah 2 — Tentukan prefix tiap divisi**
> - Lab butuh 50 host → cari 2ʰ − 2 ≥ 50 → h=6 (62 host) → **/26**
> - Guru butuh 25 host → 2ʰ − 2 ≥ 25 → h=5 (30 host) → **/27**
> - Admin butuh 10 host → 2ʰ − 2 ≥ 10 → h=4 (14 host) → **/28**
> - Link butuh 2 host → 2ʰ − 2 ≥ 2 → h=2 (2 host) → **/30**
>
> **Langkah 3 — Alokasikan berurutan dari alamat 0**
>
> | Divisi | Network ID | Prefix | Rentang host | Broadcast | Kapasitas |
> |---|---|---|---|---|---|
> | Lab Komputer | 192.168.10.0 | /26 | .1 – .62 | .63 | 62 |
> | Ruang Guru | 192.168.10.64 | /27 | .65 – .94 | .95 | 30 |
> | Administrasi | 192.168.10.96 | /28 | .97 – .110 | .111 | 14 |
> | Link router | 192.168.10.112 | /30 | .113 – .114 | .115 | 2 |
> | *(sisa belum dipakai)* | 192.168.10.116 – .255 | — | — | — | 140 alamat cadangan |
>
> **Langkah 4 — Verifikasi**
> - Tidak ada rentang yang tumpang tindih ✓
> - Semua divisi kapasitasnya cukup ✓
> - Masih tersisa 140 alamat untuk pengembangan ✓
>
> **Pelajaran:** dengan subnetting rata (/26 semua), hanya muat 4 subnet dan Lab pas-pasan. Dengan VLSM, 4 kebutuhan terpenuhi dan masih sisa lebih dari separuh blok.

### Blok 6 — QUEST (minimal 3, bertingkat)

> **Quest 1 (dasar, isian):** Jaringan `192.168.20.0/24` dibagi jadi 4 subnet sama besar. Berapa prefix barunya dan berapa host yang bisa dipakai per subnet?
>
> **Quest 2 (menengah, isian):** Dari pembagian Quest 1, tentukan Network ID, host pertama, host terakhir, dan Broadcast untuk **subnet ke-3**.
>
> **Quest 3 (lanjut, kasus):** Sebuah warnet punya blok `192.168.50.0/24` dengan kebutuhan: area Gaming 30 PC, area Kantor 12 PC, area Tamu 5 perangkat, dan 1 link ke router ISP (2 alamat). Rancang pembagian VLSM-nya lengkap dengan tabel.
>
> **Quest 4 (debug):** Seorang teknisi mengatur PC-A dengan IP `192.168.1.100/26` dan PC-B dengan `192.168.1.200/26`, keduanya tersambung ke switch yang sama. Mereka tidak bisa saling ping. Kenapa? *(Jawaban: keduanya berada di subnet berbeda — /26 membuat blok 0-63, 64-127, 128-191, 192-255. PC-A di blok 64-127, PC-B di blok 192-255. Butuh router untuk menghubungkan, atau ubah mask jadi /24.)*

### Blok 7 — PEMBAHASAN BERANIMASI
Setiap quest di atas punya animasi jawabannya sendiri. Untuk Quest 4, animasi wajib menunjukkan: dua PC di switch yang sama, paket dari A menuju B, lalu **dibuang** dengan label *"Tujuan di subnet berbeda — butuh gateway"*, dan setelahnya ditampilkan versi perbaikannya (ditambah router) di mana paket berhasil sampai.

---

## BAGIAN D — ALOKASI KEDALAMAN PER JENIS TOPIK

| Jenis topik | Perlakuan |
|---|---|
| **Konsep abstrak** (OSI, TCP/IP) | Perbanyak analogi + animasi enkapsulasi. Hindari hafalan urutan — beri jembatan keledai tapi tekankan fungsinya |
| **Topik berhitung** (subnetting, VLSM, Erlang) | Wajib: asal-usul rumus, langkah baku, tabel referensi, minimal 1 studi kasus lengkap, minimal 3 quest bertingkat |
| **Topik perangkat** (hub/switch/router) | Wajib: gambar wujud nyata, animasi perbandingan perilaku, kapan pakai yang mana |
| **Topik konfigurasi** (VLAN, routing, Linux) | Wajib: komponen terminal beranimasi, perintah lengkap yang bisa disalin, penjelasan tiap baris perintah |
| **Topik praktik** (Packet Tracer, GNS3) | Wajib: langkah bergambar, hasil yang diharapkan, cara memverifikasi berhasil, daftar kesalahan umum |
