# Bahan Ajar Fase 1: Jaringan & Infrastruktur

> **Panduan Praktis Pengajar (Untuk Ervan sebagai Mentor)**  
> Kurikulum Pembimbingan Teknik Jaringan Komputer Menuju Portofolio Siap Kerja (SMK TKJ Kelas 11).

---

## 1. Cara Menggunakan

1. **Buka Portal Utama:** Cukup klik dua kali file [`index.html`](file:///d:/Belajar/BELAJAR%20ARYA/Bahan-Ajar-Fase-1/index.html) di Windows Explorer.
2. **Offline-Ready:** Web ini 100% mandiri (*zero-dependency*), tidak membutuhkan `npm`, Node.js, web server, maupun koneksi internet.
3. **Panel Catatan Mentor:** Di setiap sub-topik terdapat panel berwarna ungu bertuliskan *"Catatan Khusus Mentor"* yang dapat kamu buka untuk melihat naskah pembuka, miskonsepsi umum siswa, dan pertanyaan pemantik diskusi.

---

## 2. Struktur Modul Fase 1

| Modul | Judul Modul | Estimasi Waktu | Status |
|---|---|---|---|
| **Modul 1.1** | [Dasar Jaringan & Pengalamatan IP](file:///d:/Belajar/BELAJAR%20ARYA/Bahan-Ajar-Fase-1/modul-1-1.html) | 2–3 Minggu | ✅ **Selesai & Lengkap** |
| **Modul 1.2** | [Routing & Switching](file:///d:/Belajar/BELAJAR%20ARYA/Bahan-Ajar-Fase-1/modul-1-2.html) | 3–4 Minggu | ✅ **Selesai & Lengkap** |
| **Modul 1.3** | [Multi-Vendor & Simulasi Lanjutan (GNS3 + MikroTik)](file:///d:/Belajar/BELAJAR%20ARYA/Bahan-Ajar-Fase-1/modul-1-3.html) | 3–4 Minggu | ✅ **Selesai & Lengkap** |
| **Modul 1.4** | [Keamanan Jaringan Dasar & Wireless](file:///d:/Belajar/BELAJAR%20ARYA/Bahan-Ajar-Fase-1/modul-1-4.html) | 2–3 Minggu | ✅ **Selesai & Lengkap** |
| **Modul 1.5** | [Pengantar Sistem Antrian & Telco Dasar](file:///d:/Belajar/BELAJAR%20ARYA/Bahan-Ajar-Fase-1/modul-1-5.html) | 1–2 Minggu | ✅ **Selesai & Lengkap** |
| **Modul 1.6** | [Bagaimana Internet Bekerja: Dari Klik ke Data Center](file:///d:/Belajar/BELAJAR%20ARYA/Bahan-Ajar-Fase-1/modul-1-6.html) | 2–3 Minggu | ✅ **Selesai & Lengkap** |

---

## 3. Kunci Jawaban Lengkap Quest Modul 1.1 (Untuk Mentor)

| No Quest | Sub-Topik | Soal Inti | Kunci Jawaban | Alasan / Pembahasan Singkat |
|---|---|---|---|---|
| **Quest 1** | 1.1.1 (Definisi Jaringan) | HP di ruangan lab tanpa WiFi, apakah termasuk jaringan? | **C** (Tidak Termasuk & Tidak Bisa Komunikasi) | Belum memenuhi 2 syarat pokok: tidak ada media transmisi fisik/radio dan belum memiliki IP address di segmen yang sama. |
| **Quest 2** | 1.1.2 (Model OSI) | Sebutan unit data (PDU) saat turun dari Layer 4 ke Layer 3? | **B** (Packet) | Layer 4 = Segment, Layer 3 = Packet (diberi IP Header), Layer 2 = Frame, Layer 1 = Bits. |
| **Quest 3** | 1.1.3 (Anatomi IPv4) | Mana yang merupakan IP Private yang sah di jaringan lokal? | **B** (`192.168.10.25`) | Termasuk standar IP Private RFC 1918 Kelas C (`192.168.0.0/16`). Opsi lain adalah IP Publik internet. |
| **Quest 4** | 1.1.4 (Subnetting FLSM) | Network ID dan Host Terakhir untuk Subnet ke-3 dari `192.168.20.0/26`? | **A** (Net ID: `.128`, Host Terakhir: `.190`) | Ukuran blok = 64. Subnet 1 = `.0`, Subnet 2 = `.64`, Subnet 3 = `.128` (Rentang host: `.129` s.d. `.190`, Broadcast: `.191`). |
| **Quest 5** | 1.1.5 (VLSM) | Mengapa alokasi VLSM wajib diurutkan dari kebutuhan terbesar? | **B** (Menjaga batas kelipatan blok biner) | Blok besar hanya bisa dimulai pada kelipatan ukurannya (*boundary alignment*), agar tidak terjadi tabrakan alamat (*overlap*). |
| **Quest 6** | 1.1.6 (MAC vs IP) | Bagian header manakah yang berganti di setiap lompatan router? | **B** (MAC Asal & MAC Tujuan) | IP Address bersifat *end-to-end* (tetap), sedangkan MAC Address bersifat *hop-to-hop* lokal (selalu diganti frame-nya oleh router). |
| **Quest 7** | 1.1.7 (Perangkat) | Perangkat mana yang dapat memecah Broadcast Domain? | **C** (Router Jaringan) | Switch Layer 2 hanya memecah Collision Domain, hanya Router (Layer 3) yang memblokir paket broadcast. |
| **Quest Akhir** | Evaluasi Modul 1.1 | PC-1 (`192.168.1.100/26`) gagal ping PC-2 (`192.168.1.200/26`) di switch yang sama? | **B** (Berada di subnet berbeda sehingga butuh Router) | PC-1 di Subnet 2 (`.64`–`.127`) dan PC-2 di Subnet 4 (`.192`–`.255`). Berbeda Network ID wajib melewati Gateway Router. |

---

## 4. Kunci Jawaban Lengkap Quest Modul 1.2 (Untuk Mentor)

| No Quest | Sub-Topik | Soal Inti | Kunci Jawaban | Alasan / Pembahasan Singkat |
|---|---|---|---|---|
| **Quest 1.2.1** | 1.2.1 (CAM Table) | Tindakan switch saat Destination MAC belum ada di CAM Table? | **B** (Catat Src MAC, Flood ke semua port aktif lain) | Switch melakukan *Unknown Unicast Flooding* agar pemilik MAC membalas, sambil mencatat Source MAC yang masuk (Learning). |
| **Quest 1.2.2** | 1.2.1 (CAM Table) | Port mana yang menerima frame jika Dest MAC `44:44` sudah ada di Port Fa0/4? | **C** (HANYA Port Fa0/4) | Forwarding cerdas Layer 2 (Unicast Filtered) tanpa flooding ke port lain. |
| **Quest 1.2.3** | 1.2.2 (VLAN Access) | Kenapa PC VLAN 10 tidak bisa ping PC VLAN 20 di switch yang sama? | **B** (Terisolasi broadcast domain Layer 2 berbeda) | Frame broadcast ARP tidak diteruskan lintas VLAN oleh switch, sehingga MAC tujuan tidak ditemukan. |
| **Quest 1.2.5** | 1.2.3 (802.1Q Trunk) | Ukuran tag 802.1Q dan panjang bit VLAN ID? | **C** (4 Byte tag, 12 bit VID) | 4 Byte header tambahan memuat 12-bit VLAN ID (hingga 4096 VLAN unik). |
| **Quest 1.2.7** | 1.2.4 (ROAS) | Kenapa `encapsulation dot1Q` wajib sebelum `ip address` di sub-interface? | **A** (Router harus tahu tipe enkapsulasi & VLAN ID yang dilayani) | Sub-interface Layer 3 membutuhkan pengikatan VLAN ID sebelum bisa menerima konfigurasi IP. |
| **Quest 1.2.9** | 1.2.5 (MAC Rewrite) | Alamat mana yang berubah pada kabel WAN antar router? | **B** (IP Tetap Asli, MAC diganti sesuai link fisik hop WAN) | Prinsip L3 End-to-End vs L2 Hop-by-Hop Delivery. |
| **Quest 1.2.11** | 1.2.6 (Wildcard OSPF) | Wildcard Mask untuk prefix `/28` (`255.255.255.240`)? | **C** (`0.0.0.15`) | `255.255.255.255 - 255.255.255.240 = 0.0.0.15`. |
| **Quest 1.2.12** | 1.2.6 (AD Priority) | Jalur OSPF (AD 110) vs Static Route (AD 1), mana yang menang? | **A** (Static Route menang karena AD 1 lebih kecil) | Makin kecil nilai Administrative Distance, makin dipercaya oleh router. |
| **Q. Akhir 1** | Evaluasi Modul 1.2 | Switch 24 port dengan 3 VLAN, berapa Collision & Broadcast Domain? | **B** (24 Collision Domain, 3 Broadcast Domain) | 1 port = 1 collision domain terpisah; 1 VLAN = 1 broadcast domain terpisah. |
| **Q. Akhir 2** | Evaluasi Modul 1.2 | Bagaimana frame Native VLAN dilewatkan di link trunk 802.1Q? | **D** (Dilewatkan dalam bentuk UNTAGGED / Tanpa Tag) | Standar 802.1Q tidak menyisipkan tag 4-byte pada frame milik Native VLAN. |
| **Q. Akhir 3** | Evaluasi Modul 1.2 | Pemilihan rute tujuan `10.20.30.55` dari 3 opsi (/8, /16, /24)? | **A** (Rute 3 `/24` karena Longest Prefix Match) | Router memilih rute paling spesifik dengan bit prefix terpanjang. |
| **Q. Akhir 4** | Evaluasi Modul 1.2 | Debugging ROAS: sub-interface `.20` diberi `encapsulation dot1Q 10`? | **B** (Tag enkapsulasi salah ketik `dot1Q 10` harusnya `dot1Q 20`) | Yang menentukan penerimaan frame adalah angka pada `dot1Q`, bukan nomor nama sub-interface. |

---

## 5. Kunci Jawaban Lengkap Quest Modul 1.3 (Untuk Mentor)

| No Quest | Sub-Topik | Soal Inti | Kunci Jawaban | Alasan / Pembahasan Singkat |
|---|---|---|---|---|
| **Quest 1.3.1** | 1.3.1 (GNS3 vs PT) | Kenapa GNS3 bisa menjalankan binary image OS nyata dan Wireshark live capture? | **B** (Menjalankan virtual machine QEMU/Dynamips dengan kernel OS nyata) | GNS3 adalah Network Emulator penuh, bukan Simulator sintetis seperti Cisco Packet Tracer. |
| **Quest 1.3.2** | 1.3.2 (MikroTik Discovery)| Protokol apa yang dipakai Winbox untuk menemukan MikroTik tanpa IP? | **C** (MNDP / CDP di Layer 2 melalui MAC Address) | Winbox mengirim broadcast Layer 2 menggunakan MNDP (*MikroTik Neighbor Discovery Protocol*). |
| **Quest 1.3.3** | 1.3.3 (DHCP DORA) | Urutan 4 pesan proses pemberian IP DHCP? | **A** (Discover → Offer → Request → Acknowledgment) | D-O-R-A: Client broadcast Discover, Server tawarkan Offer, Client minta Request, Server sahkan Ack. |
| **Quest 1.3.4** | 1.3.4 (NAT Masquerade) | Fungsi utama `action=masquerade` pada RouterOS? | **B** (Mengganti Source IP Private LAN menjadi IP Publik interface WAN otomatis) | Masquerade adalah variasi SNAT dinamis yang menyesuaikan IP output WAN saat ini. |
| **Quest 1.3.5** | 1.3.5 (Interkoneksi Cisco-MikroTik)| Standar terbuka apa yang memungkinkan Cisco & MikroTik bertukar routing dinamis? | **B** (OSPF - Open Shortest Path First) | OSPF adalah protokol standar terbuka IETF (RFC 2328) yang interoperabel di semua vendor. |
| **Quest 1.3.6** | 1.3.6 (Firewall Chains) | Chain mana di RouterOS untuk memblokir bot internet yang menyerang port Winbox (8291)? | **A** (`chain=input`) | Traffic yang tujuannya adalah Router itu sendiri diproses di chain **input**, sedangkan traffic melintas di chain **forward**. |

---

## 6. Kunci Jawaban Lengkap Quest Modul 1.4 (Untuk Mentor)

| No Quest | Sub-Topik | Soal Inti | Kunci Jawaban | Alasan / Pembahasan Singkat |
|---|---|---|---|---|
| **Quest 1.4.1** | 1.4.1 (ACL Ordering) | Kenapa aturan deny SSH gagal saat diletakkan setelah `permit ip any any`? | **B** (Urutan salah: aturan deny tertutup permit di atasnya) | Router mengevaluasi ACL dari atas ke bawah (*first-match principle*). Begitu cocok dengan baris permit, evaluasi berhenti. |
| **Quest 1.4.2** | 1.4.2 (WiFi Channel) | 3 Channel 2.4 GHz yang tidak saling tumpang tindih (*non-overlapping*)? | **C** (Channel 1, 6, dan 11) | Ketiga channel ini memiliki jarak frekuensi tengah 25 MHz sehingga tidak menimbulkan interferensi saluran silang. |
| **Quest 1.4.3** | 1.4.3 (WPA2 vs WPA3) | Keunggulan kriptografis utama WPA3-SAE dibanding WPA2-PSK? | **A** (Tahan offline dictionary attack + Forward Secrecy) | Protokol Dragonfly (SAE) mewajibkan interaksi online dengan AP dan mengamankan rekaman sesi lama. |
| **Quest 1.4.4** | 1.4.4 (VPN IPSec) | Jenis VPN terbaik untuk menghubungkan LAN Jakarta dan LAN Surabaya permanen? | **B** (IPSec Site-to-Site VPN) | Menghubungkan dua router gateway secara terenkripsi permanen tanpa software client tambahan di PC. |
| **Quest 1.4.5** | 1.4.5 (Defense in Depth) | Cara terbaik mencegah siswa WiFi mengakses NVR CCTV di jaringan sekolah? | **B** (Segmentasi VLAN + Firewall Filter / ACL di Gateway L3) | Memisahkan broadcast domain dan memblokir port RTSP 554 antar subnet di router core. |
| **Q. Akhir 1** | Evaluasi Modul 1.4 | Perbedaan mendasar Standard ACL (1–99) vs Extended ACL (100–199)? | **B** (Standard hanya Source IP; Extended: Src, Dst, Protocol & Port) | Extended ACL memberikan kontrol granular hingga Layer 4 TCP/UDP. |
| **Q. Akhir 2** | Evaluasi Modul 1.4 | Karakteristik frekuensi 5 GHz dibanding 2.4 GHz? | **C** (Bandwidth lebih besar & channel banyak, tapi jangkauan tembus dinding lebih lemah) | Gelombang frekuensi tinggi memiliki redaman lebih besar saat menembus partisi padat. |
| **Q. Akhir 3** | Evaluasi Modul 1.4 | Arti Forward Secrecy pada WPA3 dan IPSec VPN? | **B** (Kebocoran kunci masa depan tidak bisa membuka rekaman percakapan masa lalu) | Setiap sesi menghasilkan kunci ephemeral yang independen dari Master Key. |
| **Q. Akhir 4** | Evaluasi Modul 1.4 | Karyawan VPN bisa ping server kantor tapi tidak bisa browsing internet? | **A** (Full Tunnel tanpa NAT/routing internet di router pusat) | Solusi: konfigurasi Split Tunnel agar browsing keluar melalui ISP lokal client. |

---

## 7. Kunci Jawaban Lengkap Quest Modul 1.5 (Untuk Mentor)

| No Quest | Sub-Topik | Soal Inti | Kunci Jawaban | Alasan / Pembahasan Singkat |
|---|---|---|---|---|
| **Quest 1.5.1** | 1.5.1 (Metrik QoS) | Hasil pengukuran delay 20, 22, 19, 21 ms menunjukkan? | **B** (Jitter sangat rendah / stabil ± 2 ms) | Fluktuasi kedatangan paket hanya 2–3 ms, masuk kategori Sangat Bagus standar TIPHON (< 10 ms). |
| **Quest 1.5.2** | 1.5.2 (Antrian Router) | Arti parameter `limit-at=2M` pada Simple Queue MikroTik? | **B** (Bandwidth garansi minimal / CIR) | Garansi alokasi bandwidth minimum yang pasti diperoleh user sepadat apapun jaringan. |
| **Quest 1.5.3** | 1.5.3 (Protokol VoIP) | Port & protokol standar untuk signaling pembentukan panggilan SIP? | **B** (UDP/TCP Port 5060) | Standar RFC 3261 untuk signaling SIP unencrypted (SIPS terenkripsi memakai port 5061). |
| **Quest 1.5.4** | 1.5.4 (Teori Erlang B) | 60 panggilan/jam dengan durasi rata-rata 4 menit = berapa Erlang? | **B** (4.0 Erlang) | `A = λ × h = 60 × (4/60) = 4.0 Erlang`. |
| **Quest 1.5.5** | 1.5.5 (Voice VLAN) | Keuntungan utama perintah `switchport voice vlan 60` di switch? | **B** (1 kabel fisik melayani PC Data Untagged & IP Phone Tagged CoS 5) | Menghemat biaya instalasi kabel kantor sebesar 50% lewat port pass-through telepon. |
| **Q. Akhir 1** | Evaluasi Modul 1.5 | Metrik yang membuat suara VoIP robotik dan patah-patah? | **B** (Jitter / Variasi delay yang tinggi) | Mengacaukan buffer audio di telepon penerima sehingga paket audio tiba tidak beraturan. |
| **Q. Akhir 2** | Evaluasi Modul 1.5 | Kenapa media suara VoIP menggunakan UDP bukan TCP? | **B** (Menuntut transmisi real-time tanpa jeda retransmisi) | Paket suara hilang sesaat lebih baik daripada ditahan jeda retransmisi TCP selama 1–2 detik. |
| **Q. Akhir 3** | Evaluasi Modul 1.5 | Asumsi sistem Erlang B saat semua saluran sibuk? | **A** (Panggilan baru ditolak seketika / Blocked Calls Cleared) | Erlang B adalah *Loss Model* tanpa antrian tunggu. |
| **Q. Akhir 4** | Evaluasi Modul 1.5 | Debugging: Guru macet saat Lab download penuh pada bandwidth 50 Mbps? | **B** (Beri `limit-at=15M` pada antrian Guru & turunkan priority Lab ke 8) | Menjamin alokasi CIR minimum untuk Ruang Guru agar tidak kelaparan bandwidth (*starvation*). |

---

## 8. Kunci Jawaban Lengkap Quest Modul 1.6 (Untuk Mentor)

| No Quest | Sub-Topik | Soal Inti | Kunci Jawaban | Alasan / Pembahasan Singkat |
|---|---|---|---|---|
| **Quest 1.6.1** | 1.6.1 (Infrastruktur Fisik) | Fasilitas di Jakarta tempat pertukaran data lokal antar-ISP tanpa ke luar negeri? | **B** (Internet Exchange Point / OpenIXP / IIX Jakarta) | Pusat peering lokal memangkas biaya transit internasional dan menjaga latency domestik < 5 ms. |
| **Quest 1.6.2** | 1.6.2 (Sistem DNS) | Parameter DNS yang mengatur durasi penyimpanan cache IP di resolver? | **B** (TTL - Time-To-Live pada DNS Record) | Nilai TTL dalam detik menentukan masa berlaku data cache sebelum resolver menanyakan ulang ke server otoritatif. |
| **Quest 1.6.3** | 1.6.3 (CDN YouTube) | Dari mana file video YouTube trending disajikan ke pengguna Surabaya? | **B** (Edge Server Google Global Cache terdekat di Jawa Timur/Jakarta) | Cache HIT lokal menghilangkan beban transmisi kabel bawah laut lintas Pasifik ke California. |
| **Quest 1.6.4** | 1.6.4 (Cloud Storage) | Teknologi yang memecah file jadi data chunks + parity chunks ke server berbeda? | **A** (Erasure Coding / Reed-Solomon) | Memberikan ketahanan 11 Nines (99.999999999%) tanpa duplikasi data 3x lipat yang boros. |
| **Quest 1.6.5** | 1.6.5 (Sintesis End-to-End) | Di perangkat mana IP Private (192.168.1.50) pertama kali diubah ke IP Publik? | **B** (Di Router Gateway Rumah via NAT Masquerade) | Fungsi NAT menerjemahkan alamat lokal ke satu IP Publik WAN ISP. |
| **Q. Akhir 1** | Evaluasi Modul 1.6 | Dampak Authoritative DNS Server putus rute BGP? | **B** (Browser error NXDOMAIN / DNS Timeout meski server aplikasi menyala) | Tanpa IP dari DNS, browser tidak bisa memulai koneksi TCP/QUIC. |
| **Q. Akhir 2** | Evaluasi Modul 1.6 | Arti header HTTP respon `X-Cache: HIT`? | **B** (File video sudah ada di Edge Server lokal dan langsung disajikan) | Data disajikan seketika dari RAM/NVMe SSD Edge Node tanpa request ke origin. |
| **Q. Akhir 3** | Evaluasi Modul 1.6 | Karakteristik fasilitas Data Center Tier 4? | **A** (Sistem 2(N+1) Fault Tolerant dengan garansi Uptime 99.995%) | Tidak ada titik kegagalan tunggal pada kelistrikan maupun pendingin. |
| **Q. Akhir 4** | Evaluasi Modul 1.6 | Debugging: Bisa buka Google & YouTube tapi `ping smknusantara.sch.id` gagal host not found? | **B** (Masalah konfigurasi A Record DNS domain sekolah atau sewa kadaluarsa) | Jaringan internet dan ISP normal, kegagalan terisolasi pada resolusi nama domain sekolah. |

---

## 9. Rekomendasi Urutan Pengajaran Modul 1.3 s.d. 1.6

1. **Modul 1.3 (GNS3 & MikroTik - 3–4 Minggu):**
   - Instalasi GNS3 VM + MikroTik CHR, eksplorasi Winbox L2 discovery, DHCP Server DORA, NAT Masquerade, OSPF Cisco-MikroTik, & Firewall Filter Chains.

2. **Modul 1.4 (Keamanan & Wireless - 2–3 Minggu):**
   - Standard vs Extended ACL di Cisco & MikroTik, WiFi Channel Planning 1-6-11, WPA2 vs WPA3-SAE, & IPSec Site-to-Site VPN.

3. **Modul 1.5 (QoS, VoIP & Erlang B - 1–2 Minggu):**
   - Analisis TIPHON (Throughput, Latency, Jitter, Packet Loss), Priority Queuing MikroTik, SIP/RTP di Asterisk, & Dimensi Saluran Erlang B.

4. **Modul 1.6 (Bagaimana Internet Bekerja - 2–3 Minggu):**
   - Pelacakan kabel bawah laut & OpenIXP BGP, jejak rekursif DNS, audit caching YouTube CDN (DASH/QUIC), arsitektur Data Center Tier 4 Google Drive, dan penutupan seluruh materi Fase 1!



