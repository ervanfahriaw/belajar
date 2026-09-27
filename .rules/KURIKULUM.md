# Kurikulum Mentoring Teknik: Dari Jaringan sampai AI
### Disusun untuk membimbing adik (siswa TKJ, kelas 11 awal) menuju portofolio siap kerja
### Disiapkan berdasarkan pengalaman & keahlian Ervan Fahri Adriansyah Wahab

---

## 0. FILOSOFI & PRINSIP MENGAJAR

Sebelum masuk ke materi, ini prinsip yang perlu dipegang selama seluruh proses mentoring — ini yang membedakan "murid biasa" dengan "murid yang di atas rata-rata":

1. **Fundamental dulu, tools kemudian.** Jangan langsung lompat ke "cara pakai software X". Pastikan dia paham *kenapa* sesuatu bekerja, bukan cuma *bagaimana* mengklik-kliknya. Ini alasan kenapa mulai dari jaringan adalah keputusan yang tepat — jaringan adalah "hukum fisika"-nya IT: semua hal (web, IoT, AI deployment, server) pada akhirnya jalan di atas jaringan.
2. **Project-based, bukan textbook-based.** Setiap topik harus berakhir di sebuah artefak nyata yang bisa difoto/screenshot/demo — bukan cuma nilai kuis. Rekruter dan panitia lomba tidak peduli nilai ujian, mereka peduli apa yang bisa ditunjukkan.
3. **Spiral learning.** Topik yang sama akan muncul lagi di fase berikutnya dengan kedalaman lebih tinggi. Contoh: konsep IP address diajarkan dasar di Fase 1, lalu dipakai lagi saat konfigurasi MQTT broker di Fase 3, lalu dipakai lagi saat deploy dashboard di cloud di Fase 4.
4. **Dokumentasi adalah bagian dari pengerjaan, bukan tambahan.** Setiap proyek harus punya README, diagram topologi/arsitektur, dan (kalau bisa) tulisan singkat di blog/portofolio. Ini melatih komunikasi teknis sekaligus membangun portofolio otomatis.
5. **AI agent adalah co-pilot, bukan pengganti otak.** Karena kamu sendiri merasakan betapa besar dampak Claude Code/Antigravity/Codex terhadap produktivitas, adikmu WAJIB belajar pakai alat ini — tapi baru diperkenalkan **setelah** dia punya fondasi cukup untuk membaca dan mengevaluasi output AI (idealnya mulai Fase 2 akhir/Fase 3, dengan aturan ketat di bawah).
6. **Ritme, bukan maraton.** 1 sesi terbimbing per minggu (1.5–2 jam) + tugas mandiri di sela-sela adalah ritme yang realistis untuk anak sekolah. Jangan overload.

---

## 1. ASESMEN TITIK AWAL

Dari yang kamu ceritakan, modal awal adiknya sekarang:
- Sudah kenal **Cisco Packet Tracer** (dari tugas sekolah) — kemungkinan level pemula: bikin topologi sederhana, belum tentu paham subnetting/routing secara mendalam.
- Sudah pernah **instalasi Linux** — kemungkinan level pemula: install OS, belum tentu bisa administrasi (user, permission, service, networking di CLI).
- Belum ada portofolio publik (GitHub, proyek nyata, sertifikasi).

**Rekomendasi:** Sebelum mulai Fase 1 secara formal, lakukan **1 sesi asesmen santai (30–45 menit)** — minta dia tunjukkan topologi Packet Tracer yang pernah dia buat, dan tanya dia jelaskan alurnya. Ini menentukan apakah Fase 1 dimulai dari Minggu 1 (benar-benar dari nol) atau bisa mulai agak lebih cepat (skip 1–2 minggu pengantar dasar).

---

## 2. PETA BESAR KURIKULUM (ROADMAP)

Total durasi realistis: **±16–20 bulan** (pas dengan sisa waktu SMK kelas 11–12, sebelum dia masuk masa PKL/kelulusan). Bisa dipercepat kalau progresnya cepat.

| Fase | Topik | Durasi | Output Utama |
|---|---|---|---|
| 0 | Onboarding & Mindset | 2 minggu | Kontrak belajar + akun GitHub/portofolio dibuat |
| 1 | Jaringan & Infrastruktur | 3–4 bulan | Simulasi jaringan multi-vendor + sertifikasi dasar |
| 2 | Linux & Server Administration | 1.5–2 bulan | Home-lab server (web, DNS, FTP, VoIP) |
| 3 | IoT & Embedded Systems | 2–3 bulan | Alat IoT nyata (sensor + kontrol jarak jauh) |
| 4 | Web Development | 2–3 bulan | Dashboard web untuk monitoring alat IoT-nya |
| 5 | AI, Computer Vision & AI Agent | 3–4 bulan | Model CV sederhana + terbiasa AI-assisted coding |
| 6 | Proyek Integrasi (Capstone) & Karier | 2 bulan | 1 proyek besar yang menggabungkan semua stack |

Kenapa urutannya begini: **Jaringan → Linux → IoT → Web → AI**. Jaringan dan Linux adalah "tanah" tempat semua berdiri. IoT diajarkan sebelum Web karena IoT butuh pemahaman jaringan/protokol yang baru saja dipelajari (MQTT, TCP/IP) — momentumnya nyambung. Web diajarkan sebelum AI karena dia butuh media untuk menampilkan hasil AI (dashboard). AI di taruh terakhir karena secara konsep paling abstrak dan powernya baru terasa penuh kalau infrastrukturnya (server, web, IoT) sudah dikuasai untuk deployment.

---

## 3. FASE 0 — ONBOARDING & MINDSET (2 minggu)

**Goals:**
- Dia paham *kenapa* belajar ini penting (framing: "portofolio > ijazah" di dunia IT).
- Alat kerja siap: akun GitHub, folder portofolio, text editor (VS Code), akun cloud gratis (untuk nanti).

**Kegiatan:**
- Sesi 1: Diskusi tujuan hidup & minat. Tanyakan: dia lebih tertarik "membangun sesuatu yang terlihat" (hardware/IoT), "menjaga sesuatu tetap jalan" (jaringan/infra), atau "membuat sesuatu berpikir" (AI)? Jawaban ini akan membantumu tahu nanti fase mana yang harus lebih didalami untuknya.
- Sesi 2: Setup tools — buat akun GitHub, install VS Code, buat repository pertama bernama `belajar-log` untuk mencatat progres mingguan (ini juga melatih kebiasaan dokumentasi dari awal).

**Tugas:**
- Tulis 1 halaman (bebas, boleh di GitHub README) berjudul "Kenapa saya ingin jadi ahli IT" — untuk dilihat lagi 1 tahun ke depan.

**Output Fase:** Kontrak belajar (goals + jadwal sesi mingguan yang disepakati bersama) + akun GitHub aktif.

---

## 4. FASE 1 — JARINGAN & INFRASTRUKTUR (3–4 bulan)

**Goals Fase:** Paham cara data berjalan dari satu perangkat ke perangkat lain, bisa merancang & mengonfigurasi jaringan skala kecil-menengah multi-vendor, siap ambil sertifikasi dasar.

### Modul 1.1 — Dasar Jaringan (2–3 minggu)
- Topik: model OSI/TCP-IP, IP address & subnetting (WAJIB sampai lancar, ini fondasi semua hal), MAC address, switch vs router vs hub.
- Tugas: soal subnetting manual (bukan pakai kalkulator online) sampai dia bisa hitung tanpa bantuan.
- Mini-proyek: buat topologi Packet Tracer sederhana (2 subnet, 1 router, komunikasi antar subnet berhasil di-ping).

### Modul 1.2 — Routing & Switching (3–4 minggu)
- Topik: static routing, VLAN, trunking, dasar dynamic routing (RIP/OSPF pengantar).
- Tugas: konfigurasi VLAN di Packet Tracer untuk 3 departemen berbeda dalam 1 gedung fiktif.
- Mini-proyek: topologi kantor kecil dengan VLAN + inter-VLAN routing, didokumentasikan dengan diagram.

### Modul 1.3 — Multi-Vendor & Simulasi Lanjutan (3–4 minggu)
- Topik: pindah dari Packet Tracer ke **GNS3** (lebih dekat ke Real IOS), mulai kenalkan **MikroTik** (karena ini banyak dipakai di industri lokal Indonesia, beda dengan Cisco-only di sekolah — ini nilai tambah dia dibanding teman-temannya).
- Tugas: replikasi topologi Modul 1.2 di GNS3.
- Mini-proyek: jaringan heterogen Cisco + MikroTik dengan firewall dasar (mirip proyek "Enterprise Network Simulation" yang pernah kamu kerjakan — bisa jadi referensi langsung untukmu menjelaskan).

### Modul 1.4 — Keamanan Jaringan Dasar & Wireless (2–3 minggu)
- Topik: ACL, firewall rules dasar, WiFi security (WPA2/3), pengantar VPN.
- Tugas: buat ACL yang membatasi akses 1 VLAN ke VLAN lain.

### Modul 1.5 — Pengantar Sistem Antrian & Telco (opsional, 1–2 minggu)
- Karena kamu sendiri paham Erlang B/C dan VoIP dari lab CPS — ini bisa jadi diferensiator kuat untuk anak SMK (biasanya tidak diajarkan). Cukup pengantar konsep, tidak perlu mendalam.

**Proyek Akhir Fase 1 (pilih salah satu, sesuaikan minat dari Fase 0):**
- **Opsi A (paling direkomendasikan):** Simulasi jaringan kantor/sekolah skala menengah — multi-VLAN, multi-vendor (Cisco+MikroTik), routing dinamis (OSPF), ACL keamanan, didokumentasikan lengkap (topologi + penjelasan desain) dan diunggah ke GitHub + portofolio.
- **Opsi B:** Ikut kompetisi **LKS (Lomba Kompetensi Siswa) bidang IT Network Systems Administration** — proyek fase ini otomatis jadi bahan latihan lomba.

**Sertifikasi yang bisa dikejar setelah fase ini:** CCNA (mulai dari modul gratis Cisco NetAcad "Introduction to Networks" — kamu sudah punya ini, bisa jadi bahan ajar langsung), atau BNSP Junior Network Administrator.

---

## 5. FASE 2 — LINUX & SERVER ADMINISTRATION (1.5–2 bulan)

**Goals Fase:** Nyaman di CLI Linux, bisa menjalankan server dasar (web, DNS, FTP) sendiri — ini jembatan penting sebelum IoT dan Web Dev karena hampir semua nanti jalan di atas Linux server.

### Modul 2.1 — CLI Dasar & User Management (2 minggu)
- Topik: navigasi terminal, permission (chmod/chown), package manager, systemd/service dasar.
- Tugas: setup 1 VM Ubuntu Server dari nol (headless, tanpa GUI) — dia harus terbiasa kerja tanpa antarmuka grafis.

### Modul 2.2 — Layanan Server Dasar (3–4 minggu)
- Topik: Web server (Nginx/Apache), DNS server (Bind9), FTP server, dasar database (MySQL).
- Tugas mingguan: setiap minggu deploy 1 layanan baru di VM yang sama, sampai akhirnya jadi 1 mini-server multi-fungsi (mirip proyek "Enterprise Network & Linux Infrastructure" versi mini kamu).

### Modul 2.3 — Networking di Linux & Dasar Docker (2 minggu)
- Topik: konfigurasi network interface di Linux, firewall (ufw/iptables dasar), pengantar Docker (containerization) — ini penting karena nanti banyak tools AI/IoT modern jalan lewat Docker.
- Tugas: jalankan 1 aplikasi sederhana (misal web app statis) di dalam container Docker.

**Proyek Akhir Fase 2:** Home-lab server pribadi (bisa VM di laptop atau Raspberry Pi lama kalau ada) yang menjalankan minimal: web server, DNS lokal, dan 1 service dalam Docker. Didokumentasikan step-by-step di GitHub (ini portofolio yang sangat dihargai perekrut junior sysadmin/network engineer).

---

## 6. FASE 3 — IoT & EMBEDDED SYSTEMS (2–3 bulan)

**Goals Fase:** Bisa membangun alat fisik yang terhubung ke jaringan dan bisa dipantau/dikendalikan dari jarak jauh — momen "wah" pertama untuk portofolio karena hasilnya berupa benda nyata.

### Modul 3.1 — Dasar Mikrokontroler (2–3 minggu)
- Topik: ESP32 basics, GPIO, sensor sederhana (suhu, jarak/ultrasonik), Arduino IDE.
- Tugas: baca sensor suhu, tampilkan di Serial Monitor.

### Modul 3.2 — Konektivitas & Protokol IoT (3–4 minggu)
- Topik: WiFi di ESP32, protokol **MQTT** (di sinilah pemahaman jaringan Fase 1 langsung kepakai), pengantar REST API.
- Tugas: kirim data sensor dari ESP32 ke broker MQTT (bisa pakai broker lokal yang di-host di home-lab Fase 2 — ini menyambungkan fase sebelumnya, jangan lewatkan momen ini, tunjukkan ke dia betapa semua yang dipelajari saling terhubung).

### Modul 3.3 — Cloud Integration & Kontrol Dua Arah (3–4 minggu)
- Topik: kirim data ke cloud (bisa contoh AWS IoT Core seperti proyek Flocify kamu, atau alternatif gratis seperti Blynk/ThingSpeak untuk anak SMK), kontrol perangkat dari jarak jauh (relay/aktuator).
- Tugas: buat alat yang bisa dikontrol dari HP (misal nyalakan LED/kipas dari jarak jauh via internet, bukan cuma LAN).

**Proyek Akhir Fase 3:** Alat IoT nyata dengan use-case yang dia pilih sendiri (monitoring tanaman, monitoring suhu kamar, sistem pakan ikan otomatis — sesuaikan minat, atau bisa terinspirasi dari lini bisnis Tentang Guppy kalau dia tertarik). Syarat: minimal 1 sensor + 1 aktuator + terhubung cloud + bisa dipantau dari HP. Ini proyek yang paling "foto-genic" untuk pameran sekolah/lomba.

---

## 7. FASE 4 — WEB DEVELOPMENT (2–3 bulan)

**Goals Fase:** Bisa membuat dashboard web untuk menampilkan & mengontrol data dari alat IoT-nya sendiri — closing the loop dari fase sebelumnya.

### Modul 4.1 — Dasar Web (2 minggu)
- Topik: HTML, CSS, dasar JavaScript.
- Tugas: buat halaman profil pribadi statis, deploy ke GitHub Pages (gratis, langsung dapat portofolio online).

### Modul 4.2 — Backend & API Dasar (3–4 minggu)
- Topik: Node.js/Express dasar (samakan dengan stack yang kamu pakai, jadi kamu bisa bantu debug), REST API, koneksi ke database.
- Tugas: buat API sederhana yang menerima data dan menyimpannya ke database.

### Modul 4.3 — Integrasi Real-Time (3–4 minggu)
- Topik: menampilkan data real-time (WebSocket atau polling), chart/visualisasi data (mirip pengalamanmu bikin dashboard NOC).
- Tugas: hubungkan API Modul 4.2 dengan data MQTT dari alat IoT Fase 3.

**Proyek Akhir Fase 4:** Dashboard web untuk memantau & mengontrol alat IoT dari Fase 3 secara real-time, lengkap dengan grafik histori data. Deploy online (bisa pakai layanan gratis seperti Render/Railway/Vercel). Ini adalah proyek "full-stack IoT" yang sangat kuat untuk portofolio — setara proyek anak kuliah tingkat akhir.

---

## 8. FASE 5 — AI, COMPUTER VISION & AI AGENT (3–4 bulan)

**Goals Fase:** Paham dasar AI/ML secukupnya untuk bisa membangun model computer vision ringan, DAN — yang tidak kalah penting — terbiasa bekerja dengan AI coding agent secara bertanggung jawab.

### Modul 5.1 — Dasar AI/ML & Python (2–3 minggu)
- Topik: Python dasar (kalau belum), konsep dasar machine learning (tanpa terlalu berat matematika), pengantar dataset & labeling.
- Tugas: latihan Python kecil (manipulasi data sederhana).

### Modul 5.2 — Computer Vision Dasar (3–4 minggu)
- Topik: pengantar YOLO (kamu punya pengalaman langsung di YOLOv8n/YOLO11n — ini modal besar untuk mengajar), object detection dasar, cara melakukan labeling dataset.
- Tugas: latih model deteksi objek sederhana pakai dataset kecil (bisa dataset publik seperti COCO subset, sama seperti yang kamu pakai di pengabdian masyarakat SMK PU Negeri Bandung).

### Modul 5.3 — Deploy ke Edge Device (3–4 minggu)
- Topik: jalankan model CV di Raspberry Pi/ESP32-CAM (skala kecil dulu, tidak perlu Jetson).
- Tugas: hubungkan hasil deteksi CV ke alat IoT/dashboard yang sudah dia buat di fase sebelumnya (misal: notifikasi ke dashboard saat objek terdeteksi).

### Modul 5.4 — AI Agent & Prompting yang Bertanggung Jawab (2–3 minggu)
- Ini bagian yang kamu tekankan sangat penting. Baru diperkenalkan di titik ini karena dia sudah punya cukup fondasi untuk **membaca dan mengevaluasi** kode yang dihasilkan AI, bukan cuma copy-paste buta.
- Topik: cara menulis prompt yang jelas & spesifik, cara memverifikasi output AI (bukan percaya 100%), kapan pakai AI agent (Claude Code/Antigravity/Codex) vs kapan harus paham sendiri dulu.
- **Aturan ketat yang perlu kamu tanamkan:** Sebelum boleh minta AI membuatkan kode, dia harus bisa jelaskan dulu secara manual apa yang seharusnya terjadi (logika/alur). AI dipakai untuk mempercepat penulisan, bukan menggantikan pemahaman. Latih dengan cara: dia coding manual dulu untuk fitur sederhana, baru dibandingkan dengan hasil AI agent untuk fitur yang lebih kompleks — biar dia lihat sendiri bedanya "paham vs tidak paham".
- Tugas: gunakan AI agent untuk mempercepat salah satu bagian dari proyek Modul 5.3, dengan syarat dia menulis catatan review: "apa yang AI buat, apakah benar, apa yang perlu diperbaiki".

**Proyek Akhir Fase 5:** Sistem monitoring berbasis computer vision sederhana (contoh: deteksi kehadiran/objek untuk keamanan sederhana, atau deteksi kondisi tanaman/ikan kalau relevan dengan minatnya), dengan sebagian proses pengembangan dibantu AI agent secara terdokumentasi.

---

## 9. FASE 6 — PROYEK INTEGRASI (CAPSTONE) & PERSIAPAN KARIER (2 bulan)

Ini fase penutup yang menyatukan semua stack menjadi satu proyek besar yang jadi "mahkota" portofolinya.

**Contoh ide Capstone** (pilih/sesuaikan dengan minat yang muncul selama perjalanan):
> **"Smart Monitoring System"** — sebuah sistem yang punya: (1) jaringan/infrastruktur sebagai backbone (VLAN + firewall dasar), (2) server Linux sebagai backend, (3) alat IoT dengan sensor & kamera, (4) computer vision untuk deteksi kejadian tertentu, (5) dashboard web untuk monitoring & kontrol real-time. Ini setara (bahkan mendekati) proyek "monitoring keselamatan industri" yang kamu kerjakan magang — hanya versi skala kecil.

**Kegiatan Fase 6:**
- Minggu 1–5: pengerjaan proyek.
- Minggu 6: dokumentasi lengkap (README, diagram arsitektur, video demo).
- Minggu 7: persiapan portofolio — rapikan GitHub, buat halaman portofolio web (dia sudah bisa dari Fase 4), tulis CV pertama (bisa pakai format CV ATS-mu sebagai referensi struktur, tapi isi tetap proyek-proyeknya sendiri).
- Minggu 8: simulasi wawancara teknis — kamu jadi "interviewer", minta dia jelaskan setiap proyek dari awal Fase 1 sampai Capstone.

**Output akhir yang harus ada di tangan adiknya setelah 16–20 bulan:**
1. GitHub aktif dengan minimal 6 repository (1 per fase) + dokumentasi rapi.
2. Portofolio web pribadi (dibuat sendiri saat Fase 4).
3. 1 proyek IoT fisik yang benar-benar berjalan (bisa didemokan langsung).
4. 1 sertifikasi minimal (CCNA Introduction to Networks / BNSP).
5. CV yang berisi pengalaman proyek nyata, bukan cuma nilai sekolah.
6. Kebiasaan kerja dengan AI agent secara bertanggung jawab — nilai jual besar yang jarang dimiliki lulusan SMK seangkatannya.

---

## 10. PANDUAN PRAKTIS UNTUKMU SEBAGAI MENTOR

- **Format sesi:** 1x/minggu, 90–120 menit sesi terbimbing + tugas mandiri di sela minggu (usahakan max 2–3 jam/minggu di luar sesi, jangan bebankan berlebihan mengingat dia masih sekolah).
- **Struktur tiap sesi:** 15 menit review tugas minggu lalu → 45–60 menit materi baru + praktik bareng → 15 menit briefing tugas minggu ini.
- **Evaluasi:** bukan nilai angka, tapi checklist "bisa demo tanpa dibantu?" — kalau belum, ulangi materi sebelum lanjut (jangan maksa lanjut ke topik berikutnya kalau fondasi belum kuat, apalagi untuk Modul 1.1 subnetting).
- **Dorong dia ikut komunitas/lomba** begitu Fase 1 atau Fase 3 selesai (LKS, kompetisi IoT tingkat sekolah/kota) — pengalaman kompetisi sangat menambah nilai portofolio dan melatih mental kerja di bawah tekanan.
- **Cek minat secara berkala** (tiap akhir fase, tanya lagi: fase mana yang paling dia nikmati?) — kalau ternyata dia lebih condong ke satu arah (misal jaringan lebih dari AI, atau sebaliknya), boleh perpanjang durasi fase itu dan perdalam, tidak harus kaku ikut jadwal di atas.
- **Manfaatkan pengalamanmu langsung** — di banyak modul di atas ada referensi ke proyek nyata yang pernah kamu kerjakan (NOC dashboard, IoT water monitoring, computer vision karung, dsb). Ceritakan proses nyatanya (termasuk kegagalan/debugging-nya), bukan cuma hasil akhirnya — ini yang paling berharga dan tidak ada di buku manapun.

---

*Dokumen ini adalah kerangka awal — sesuaikan kecepatan dan urutan sesuai progres dan minat adikmu selama perjalanan. Yang terpenting: konsisten sesi mingguan dan selalu berakhir dengan sesuatu yang bisa dia tunjukkan.*
