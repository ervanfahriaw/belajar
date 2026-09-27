/**
 * ==========================================================================
 * MODUL-1-4.JS — LOGIKA SIMULASI & DATA INTERAKTIF MODUL 1.4
 * Modul 1.4: Keamanan Jaringan Dasar & Wireless (ACL, WiFi, WPA2/3, VPN)
 * Protokol: file:// aman (Vanilla JS, Zero-Dependency, Web Animations API)
 * ==========================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* --------------------------------------------------------------------------
       1. RENDER SVG PERANGKAT KE SEMUA STAGE SIMULASI MODUL 1.4
       -------------------------------------------------------------------------- */
    function renderDeviceNodes() {
      if (!window.Devices) return;

      // Stage 1: ACL Filtering (Tamu vs Keuangan)
      const aclTamu = document.getElementById('acl-node-tamu');
      const aclRtr = document.getElementById('acl-node-router');
      const aclSrv = document.getElementById('acl-node-server');
      if (aclTamu) aclTamu.innerHTML = window.Devices.laptop({ name: 'Laptop Tamu (VLAN 30)', ip: '192.168.30.50', mac: 'MAC: 3C:55:1A', state: 'normal' });
      if (aclRtr) aclRtr.innerHTML = window.Devices.router({ name: 'Router Core', ip: '192.168.30.1 / .10.1', state: 'aktif' });
      if (aclSrv) aclSrv.innerHTML = window.Devices.server({ name: 'Server Keuangan (VLAN 10)', ip: '192.168.10.100', state: 'normal' });

      // Stage 2: ACL Quest Answer (Rule Ordering Trap)
      const aclqaAtk = document.getElementById('aclqa-node-attacker');
      const aclqaRtr = document.getElementById('aclqa-node-router');
      const aclqaSrv = document.getElementById('aclqa-node-server');
      if (aclqaAtk) aclqaAtk.innerHTML = window.Devices.laptop({ name: 'Attacker Tamu', ip: '192.168.30.99', mac: 'MAC: AA:BB:CC' });
      if (aclqaRtr) aclqaRtr.innerHTML = window.Devices.router({ name: 'Router (Flawed ACL)', ip: 'Top-Down Order' });
      if (aclqaSrv) aclqaSrv.innerHTML = window.Devices.server({ name: 'Server SSH (Port 22)', ip: '192.168.10.100' });

      // Stage 3: WiFi Channel Allocation
      const ap1 = document.getElementById('wifi-ap1');
      const ap2 = document.getElementById('wifi-ap2');
      const ap3 = document.getElementById('wifi-ap3');
      if (ap1) ap1.innerHTML = window.Devices.ap({ name: 'AP Lab (Gedung A)', ip: '192.168.1.2', ssid: 'CH 1 (2412 MHz)' });
      if (ap2) ap2.innerHTML = window.Devices.ap({ name: 'AP Kantor (Gedung B)', ip: '192.168.1.3', ssid: 'CH 6 (2437 MHz)' });
      if (ap3) ap3.innerHTML = window.Devices.ap({ name: 'AP Aula (Gedung C)', ip: '192.168.1.4', ssid: 'CH 11 (2462 MHz)' });

      // Stage 4: WPA2 vs WPA3 Handshake Comparison
      const wpaCln = document.getElementById('wpa-node-client');
      const wpaAp = document.getElementById('wpa-node-ap');
      const wpaHck = document.getElementById('wpa-node-hacker');
      if (wpaCln) wpaCln.innerHTML = window.Devices.laptop({ name: 'Laptop Siswa', ip: 'DHCP Client', mac: 'MAC: E8:9D:87' });
      if (wpaAp) wpaAp.innerHTML = window.Devices.ap({ name: 'Access Point Sekolah', ip: '192.168.1.1', ssid: 'SSID: SMK-Secure' });
      if (wpaHck) wpaHck.innerHTML = window.Devices.hacker ? window.Devices.hacker({ name: 'Sniffer Hacker', ip: 'Aircrack-ng' }) : window.Devices.laptop({ name: 'Sniffer Hacker', ip: 'Promiscuous Mode', state: 'nonaktif' });

      // Stage 5: IPSec Site-to-Site VPN Tunnel
      const vpnCabang = document.getElementById('vpn-node-cabang');
      const vpnPusat = document.getElementById('vpn-node-pusat');
      const vpnHck = document.getElementById('vpn-node-hacker');
      if (vpnCabang) vpnCabang.innerHTML = window.Devices.mikrotik({ name: 'Router Surabaya (Cabang)', ip: 'WAN: 203.0.113.50', mac: 'LAN: 192.168.20.0/24' });
      if (vpnPusat) vpnPusat.innerHTML = window.Devices.mikrotik({ name: 'Router Jakarta (Pusat)', ip: 'WAN: 103.10.20.1', mac: 'LAN: 192.168.10.0/24' });
      if (vpnHck) vpnHck.innerHTML = window.Devices.hacker ? window.Devices.hacker({ name: 'ISP Sniffer (Public Internet)', ip: 'Man-in-the-Middle' }) : window.Devices.laptop({ name: 'ISP Sniffer', ip: 'Wiretap WAN' });

      // Stage 6: Defense in Depth (School Network)
      const ddSiswa = document.getElementById('dd-node-siswa');
      const ddFw = document.getElementById('dd-node-fw');
      const ddCctv = document.getElementById('dd-node-cctv');
      if (ddSiswa) ddSiswa.innerHTML = window.Devices.hp({ name: 'HP Siswa (VLAN 40)', ip: '172.16.40.15', mac: 'MAC: FA:88:12' });
      if (ddFw) ddFw.innerHTML = window.Devices.firewall ? window.Devices.firewall({ name: 'Core Firewall & ACL', ip: 'Layer 3/4 Security' }) : window.Devices.router({ name: 'Core Firewall & ACL', ip: 'Layer 3/4 Security' });
      if (ddCctv) ddCctv.innerHTML = window.Devices.server({ name: 'Server CCTV & NVR (VLAN 50)', ip: '172.16.50.10:554', mac: 'Zone: Restricted' });
    }

    renderDeviceNodes();


    /* --------------------------------------------------------------------------
       2. REGISTRASI SEMUA SIMULASI MODUL 1.4 KE ANIM-ENGINE
       -------------------------------------------------------------------------- */
    if (window.AnimEngine) {

      // === SIMULASI 1.4.1: ACL FILTERING (TAMU VS KEUANGAN) ===
      window.AnimEngine.register({
        id: 'sim-acl-filter',
        judul: 'Simulasi Pemfilteran Paket oleh Access Control List (ACL)',
        pertanyaanYangDijawab: 'Bagaimana Router memutuskan apakah sebuah paket diizinkan (PERMIT) atau dibuang (DENY)?',
        langkah: [
          {
            narasi: '1. Inisiasi: Laptop Tamu (192.168.30.50 di VLAN 30) mencoba membuka web Server Keuangan (192.168.10.100) di port 80.',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.clear();
              ctx.createRawPayload('acl-node-tamu', 'GET /laporan-keuangan.pdf HTTP/1.1');
              ctx.highlight('acl-node-tamu', 'var(--danger)');
              ctx.showLabel('acl-node-tamu', 'VLAN 30 (Untrusted)', { color: 'var(--danger)' });
            }
          },
          {
            narasi: '2. Enkapsulasi & Pengiriman: Paket dibungkus dengan Source IP 192.168.30.50 dan Dest IP 192.168.10.100, lalu meluncur ke Default Gateway (Router Core).',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.encapsulatePacket('acl-node-tamu', 'HTTP GET', {
                srcIP: '192.168.30.50',
                destIP: '192.168.10.100',
                label: 'TCP Port 80'
              });
              ctx.movePacket('acl-node-tamu', 'acl-node-router');
            }
          },
          {
            narasi: '3. Evaluasi ACL: Router memeriksa Extended ACL pada interface masuk: "deny ip 192.168.30.0 0.0.0.255 192.168.10.0 0.0.0.255". Terjadi MATCH pada aturan pertama!',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.inspectSwitch('acl-node-router', {
                title: ' Router Core — ACL Engine Inbound',
                port: 'Inbound Gi0/0.30',
                vlan: 'ACL 100 Rule #1: MATCH!',
                status: 'RULE: deny ip 192.168.30.0/24 192.168.10.0/24'
              });
              ctx.highlight('acl-node-router', 'var(--danger)');
            }
          },
          {
            narasi: '4. Eksekusi DENY (DROP): Paket segera dibuang di router. Paket TIDAK PERNAH sampai ke Server Keuangan! Server tetap 100% aman dan rahasia terlindungi.',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.dropPacket('acl-node-router', ' ACL DENIED (Packet Dropped)');
              ctx.showLabel('acl-node-server', ' Aman! 0 Bytes Diterima', { color: 'var(--success)' });
            }
          },
          {
            narasi: '5. Kesimpulan: ACL bertindak sebagai satpam gerbang. Paket yang tidak memenuhi kriteria dibuang saat masuk (inbound), menghemat bandwidth dan melindungi server internal.',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.arrive('acl-node-router', { label: 'v ACL Bekerja Sempurna' });
            }
          }
        ]
      });


      // === SIMULASI 1.4.1 QA: ACL ORDERING TRAP ===
      window.AnimEngine.register({
        id: 'sim-acl-quest-answer',
        judul: 'Pembahasan Quest: Bahaya Urutan Aturan ACL (First-Match Principle)',
        pertanyaanYangDijawab: 'Kenapa perintah "permit ip any any" di baris pertama membuat semua baris deny di bawahnya tidak berguna?',
        langkah: [
          {
            narasi: '1. Skenario Kesalahan: Admin ingin memblokir SSH port 22, tetapi keliru meletakkan "permit ip any any" di baris 10 dan "deny tcp any any eq 22" di baris 20.',
            durasi: 2500,
            aksi: function (ctx) {
              ctx.clear();
              ctx.createRawPayload('aclqa-node-attacker', 'SSH root@192.168.10.100');
              ctx.highlight('aclqa-node-attacker', 'var(--danger)');
            }
          },
          {
            narasi: '2. Pengiriman Paket: Attacker mengirim paket SSH (TCP Port 22) menuju server tujuan.',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.encapsulatePacket('aclqa-node-attacker', 'SSH Syn', {
                srcIP: '192.168.30.99',
                destIP: '192.168.10.100',
                label: 'Port 22 (SSH)'
              });
              ctx.movePacket('aclqa-node-attacker', 'aclqa-node-router');
            }
          },
          {
            narasi: '3. Evaluasi Baris 1: Router mengecek Line 10: "permit ip any any". Paket SSH COCOK dengan kriteria "any any". Router langsung MENGIZINKAN dan berhenti mengecek baris berikutnya!',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.inspectSwitch('aclqa-node-router', {
                title: '️ FIRST-MATCH TRAP!',
                port: 'Line 10 Matched!',
                vlan: 'permit ip any any',
                status: 'Line 20 (deny SSH) DIABAIKAN TOTAL!'
              });
              ctx.highlight('aclqa-node-router', 'var(--warning)');
            }
          },
          {
            narasi: '4. Konsekuensi Fatal: Paket SSH lolos ke server! KESIMPULAN: Aturan spesifik (DENY) HARUS selalu diletakkan di ATAS aturan umum (PERMIT ANY).',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.movePacket('aclqa-node-router', 'aclqa-node-server');
              ctx.decapsulatePacket('aclqa-node-server', 'SSH Port 22 Terbuka!');
              ctx.showLabel('aclqa-node-server', '️ Bocor! Aturan Deny Gagal', { color: 'var(--danger)' });
            }
          }
        ]
      });


      // === SIMULASI 1.4.2: WIFI CHANNELS & INTERFERENCE ===
      window.AnimEngine.register({
        id: 'sim-wifi-channel',
        judul: 'Simulasi Perilaku Channel 2.4 GHz (Interferensi vs Non-Overlapping 1, 6, 11)',
        pertanyaanYangDijawab: 'Kenapa kita harus menggunakan Channel 1, 6, 11 pada frekuensi 2.4 GHz?',
        langkah: [
          {
            narasi: '1. Skenario Buruk: Tiga Access Point dipasang berdekatan dengan channel berurutan (AP1 = CH 1, AP2 = CH 3, AP3 = CH 6).',
            durasi: 2500,
            aksi: function (ctx) {
              ctx.clear();
              // Tampilkan zona interferensi bertumpuk
              const z1 = document.getElementById('wifi-zone1');
              const z2 = document.getElementById('wifi-zone2');
              const z3 = document.getElementById('wifi-zone3');
              if (z1) { z1.setAttribute('fill', 'var(--danger)'); z1.setAttribute('opacity', '0.35'); }
              if (z2) { z2.setAttribute('fill', 'var(--danger)'); z2.setAttribute('opacity', '0.35'); }
              if (z3) { z3.setAttribute('fill', 'var(--warning)'); z3.setAttribute('opacity', '0.25'); }

              const c1 = document.getElementById('wifi-ch1');
              const t1 = document.getElementById('wifi-ch1-txt');
              const c2 = document.getElementById('wifi-ch2');
              const t2 = document.getElementById('wifi-ch2-txt');
              if (c1) c1.setAttribute('opacity', '1');
              if (t1) { t1.setAttribute('opacity', '1'); t1.textContent = 'CH 1'; }
              if (c2) c2.setAttribute('opacity', '1');
              if (t2) { t2.setAttribute('opacity', '1'); t2.textContent = 'CH 3 (Tumpang Tindih!)'; }

              ctx.showLabel('wifi-ap1', 'AP Gedung A (CH 1)', { color: 'var(--danger)' });
              ctx.showLabel('wifi-ap2', 'AP Kantor (CH 3 - Overlap!)', { color: 'var(--danger)' });
            }
          },
          {
            narasi: '2. Terjadi Tabrakan Frekuensi (Co-Channel Interference): Sinyal CH 1 (2401-2423 MHz) dan CH 3 (2411-2433 MHz) saling bertabrakan di udara!',
            durasi: 2700,
            aksi: function (ctx) {
              ctx.highlight('wifi-ap1', 'var(--danger)');
              ctx.highlight('wifi-ap2', 'var(--danger)');
              ctx.showLabel('wifi-ap2', ' Collision & Packet Loss 60%!', { color: 'var(--danger)' });
            }
          },
          {
            narasi: '3. Solusi Desain Bersih: Admin mengatur ulang frekuensi menjadi Non-Overlapping Channel: AP1 = CH 1, AP2 = CH 6, AP3 = CH 11.',
            durasi: 2600,
            aksi: function (ctx) {
              const z1 = document.getElementById('wifi-zone1');
              const z2 = document.getElementById('wifi-zone2');
              const z3 = document.getElementById('wifi-zone3');
              if (z1) { z1.setAttribute('fill', 'var(--success)'); z1.setAttribute('opacity', '0.2'); }
              if (z2) { z2.setAttribute('fill', 'var(--info)'); z2.setAttribute('opacity', '0.2'); }
              if (z3) { z3.setAttribute('fill', 'var(--primary)'); z3.setAttribute('opacity', '0.2'); }

              const t2 = document.getElementById('wifi-ch2-txt');
              const c3 = document.getElementById('wifi-ch3');
              const t3 = document.getElementById('wifi-ch3-txt');
              if (t2) t2.textContent = 'CH 6 (2437 MHz)';
              if (c3) c3.setAttribute('opacity', '1');
              if (t3) { t3.setAttribute('opacity', '1'); t3.textContent = 'CH 11 (2462 MHz)'; }

              ctx.showLabel('wifi-ap1', 'CH 1 (2412 MHz)', { color: 'var(--success)' });
              ctx.showLabel('wifi-ap2', 'CH 6 (2437 MHz)', { color: 'var(--info)' });
              ctx.showLabel('wifi-ap3', 'CH 11 (2462 MHz)', { color: 'var(--primary)' });
            }
          },
          {
            narasi: '4. Transmisi Bebas Hambatan: Sinyal memiliki jarak guard band 25 MHz, sehingga ketiga AP bisa mengirim data secara bersamaan tanpa tabrakan.',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.highlight('wifi-ap1', 'var(--success)');
              ctx.highlight('wifi-ap2', 'var(--success)');
              ctx.highlight('wifi-ap3', 'var(--success)');
              ctx.arrive('wifi-ap2', { label: 'v Throughput Maksimal (0% Collision)' });
            }
          },
          {
            narasi: '5. Aturan Baku: Pada WiFi 2.4 GHz di seluruh dunia, SELALU gunakan kombinasi Channel 1, 6, dan 11 untuk jaringan multi-AP yang stabil.',
            durasi: 2300,
            aksi: function (ctx) {
              ctx.showLabel('wifi-ap1', 'Golden Rule: 1 - 6 - 11', { color: 'var(--success)' });
            }
          }
        ]
      });


      // === SIMULASI 1.4.3: WPA2 VS WPA3 ENCRYPTION ===
      window.AnimEngine.register({
        id: 'sim-wpa-compare',
        judul: 'Komparasi Kriptografi: WPA2-PSK 4-Way Handshake vs WPA3-SAE Dragonfly',
        pertanyaanYangDijawab: 'Mengapa WPA2 rentan offline dictionary attack dan bagaimana WPA3 melindunginya?',
        langkah: [
          {
            narasi: '1. Skenario WPA2: Laptop Siswa terhubung ke AP menggunakan WPA2-PSK (Pre-Shared Key). Terjadi proses 4-Way Handshake.',
            durasi: 2500,
            aksi: function (ctx) {
              ctx.clear();
              ctx.createRawPayload('wpa-node-client', 'Connect SSID: SMK-Secure');
              ctx.highlight('wpa-node-client', 'var(--info)');
              ctx.showLabel('wpa-node-client', 'WPA2-PSK Handshake', { color: 'var(--info)' });
            }
          },
          {
            narasi: '2. Sniffing EAPOL Frame: Hacker di dekat lokasi menyadap 4 paket EAPOL (ANonce, SNonce, MIC) yang melayang di udara menggunakan Wireshark/Aircrack.',
            durasi: 2700,
            aksi: function (ctx) {
              ctx.encapsulatePacket('wpa-node-client', 'EAPOL Handshake', {
                label: 'ANonce + SNonce + MIC',
                srcMAC: 'Client: E8:9D',
                destMAC: 'AP: 00:1A'
              });
              ctx.movePacket('wpa-node-client', 'wpa-node-ap');
              ctx.highlight('wpa-node-hacker', 'var(--danger)');
              ctx.showLabel('wpa-node-hacker', ' Sniffing EAPOL Frame!', { color: 'var(--danger)' });
            }
          },
          {
            narasi: '3. Serangan Offline WPA2: Hacker pulang dan menjalankan Wordlist Dictionary Attack secara offline pada GPU tanpa perlu mengirim 1 pun paket ke AP.',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.inspectSwitch('wpa-node-hacker', {
                title: ' Aircrack-ng Offline Cracking',
                port: 'Wordlist: rockyou.txt',
                vlan: 'Speed: 150,000 Key/s',
                status: 'PASSWORD CRACKED: "rahasia123"'
              });
              ctx.showLabel('wpa-node-hacker', ' Password Berhasil Ditebak!', { color: 'var(--danger)' });
            }
          },
          {
            narasi: '4. Transisi ke WPA3-SAE (Dragonfly): AP di-upgrade ke WPA3. Autentikasi menggunakan algoritma SAE (Simultaneous Authentication of Equals).',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.clear();
              ctx.showLabel('wpa-node-ap', ' WPA3-SAE Aktif (No Clear Nonce)', { color: 'var(--success)' });
              ctx.highlight('wpa-node-ap', 'var(--success)');
            }
          },
          {
            narasi: '5. Kekebalan WPA3 terhadap Offline Attack: Setiap tebakan password memerlukan interaksi langsung (online) dengan AP. Hacker diblokir setelah beberapa kali salah!',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.encapsulatePacket('wpa-node-client', 'SAE Commit/Confirm', {
                label: 'Zero-Knowledge Proof',
                destIP: 'Diffie-Hellman Key'
              });
              ctx.movePacket('wpa-node-client', 'wpa-node-ap');
              ctx.dropPacket('wpa-node-hacker', ' Offline Attack IMPOSSIBLE');
              ctx.showLabel('wpa-node-hacker', 'Gagal: Butuh Live AP Interaction', { color: 'var(--text-muted)' });
            }
          },
          {
            narasi: '6. Forward Secrecy: Meskipun password dibocorkan di masa depan, data percakapan masa lalu yang pernah direkam hacker TETAP TIDAK BISA didekripsi!',
            durasi: 2500,
            aksi: function (ctx) {
              ctx.arrive('wpa-node-ap', { label: 'v WPA3 Forward Secrecy Terjamin' });
            }
          }
        ]
      });


      // === SIMULASI 1.4.4: IPSEC VPN ENCRYPTED TUNNEL ===
      window.AnimEngine.register({
        id: 'sim-vpn-tunnel',
        judul: 'Simulasi VPN IPSec: Enkapsulasi & Enkripsi Melintasi Internet Publik',
        pertanyaanYangDijawab: 'Bagaimana data rahasia kantor Surabaya bisa aman melewati internet publik menuju kantor Jakarta?',
        langkah: [
          {
            narasi: '1. Inisiasi LAN Surabaya: PC Kantor Surabaya mengirim data laporan gaji (Plaintext) menuju Server Jakarta (192.168.10.50).',
            durasi: 2500,
            aksi: function (ctx) {
              ctx.clear();
              ctx.createRawPayload('vpn-node-cabang', 'Laporan_Gaji_Nov.xlsx');
              ctx.highlight('vpn-node-cabang', 'var(--info)');
              ctx.showLabel('vpn-node-cabang', 'LAN Surabaya: 192.168.20.0/24', { color: 'var(--info)' });
            }
          },
          {
            narasi: '2. Enkripsi & Enkapsulasi IPSec ESP: Router Surabaya mengenkripsi isi paket dengan AES-256 dan membungkusnya dengan header IP Publik baru (Src: 203.0.113.50, Dst: 103.10.20.1).',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.encapsulatePacket('vpn-node-cabang', ' AES-256 ESP', {
                srcIP: '203.0.113.50',
                destIP: '103.10.20.1',
                label: 'IPSec Tunnel Packet'
              });
              ctx.showLabel('vpn-node-cabang', ' Data Dienkripsi AES-256', { color: 'var(--success)' });
            }
          },
          {
            narasi: '3. Melintasi Internet Publik: Paket terenkripsi meluncur melewati kabel fiber optic bawah laut & ISP publik menuju Jakarta.',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.movePacket('vpn-node-cabang', 'vpn-node-pusat', { duration: 1800 });
            }
          },
          {
            narasi: '4. Hacker / ISP Wiretap di Internet: Hacker menyadap paket di kabel WAN, tetapi hanya melihat karakter acak sampah (#8@$!x%9&...) tanpa bisa membaca gaji karyawan!',
            durasi: 2700,
            aksi: function (ctx) {
              ctx.highlight('vpn-node-hacker', 'var(--danger)');
              ctx.showLabel('vpn-node-hacker', ' Sniffing: Gagal! Hanya Ciphertext', { color: 'var(--warning)' });
            }
          },
          {
            narasi: '5. Dekripsi di Router Jakarta: Router Jakarta memvalidasi Security Association (SA), membuka bungkus ESP dengan kunci privat bersama, dan mengembalikan plaintext asli.',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.inspectSwitch('vpn-node-pusat', {
                title: ' Router Jakarta — IPSec Decrypt',
                port: 'Interface WAN 103.10.20.1',
                vlan: 'SA Match: SPI 0x88F2',
                status: 'AES-256 Plaintext Decrypted OK!'
              });
              ctx.highlight('vpn-node-pusat', 'var(--success)');
            }
          },
          {
            narasi: '6. Tiba di Tujuan: Server Jakarta menerima file "Laporan_Gaji_Nov.xlsx" secara utuh, rahasia, dan terverifikasi integritasnya.',
            durasi: 2500,
            aksi: function (ctx) {
              ctx.decapsulatePacket('vpn-node-pusat', 'Laporan_Gaji_Nov.xlsx');
              ctx.arrive('vpn-node-pusat', { label: 'v Data Utuh & 100% Rahasia' });
            }
          }
        ]
      });


      // === SIMULASI 1.4.5: DEFENSE IN DEPTH SEKOLAH ===
      window.AnimEngine.register({
        id: 'sim-defense-depth',
        judul: 'Simulasi Pertahanan Berlapis (Defense in Depth) SMK Nusantara',
        pertanyaanYangDijawab: 'Bagaimana VLAN, ACL, dan Firewall bekerja bersama mencegah siswa meretas CCTV sekolah?',
        langkah: [
          {
            narasi: '1. Upaya Penetrasi: Siswa di WiFi Lab (VLAN 40: 172.16.40.15) mencoba membuka video feed kamera CCTV ruang guru (172.16.50.10 di VLAN 50) via port RTSP 554.',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.clear();
              ctx.createRawPayload('dd-node-siswa', 'RTSP rtsp://172.16.50.10:554/cam1');
              ctx.highlight('dd-node-siswa', 'var(--warning)');
              ctx.showLabel('dd-node-siswa', 'VLAN 40 (Siswa)', { color: 'var(--info)' });
            }
          },
          {
            narasi: '2. Pengiriman Paket: Frame dikirim melalui switch trunk menuju Gateway Router / Layer 3 Firewall.',
            durasi: 2500,
            aksi: function (ctx) {
              ctx.encapsulatePacket('dd-node-siswa', 'RTSP Stream Request', {
                srcIP: '172.16.40.15',
                destIP: '172.16.50.10',
                label: 'Port 554 (RTSP)'
              });
              ctx.movePacket('dd-node-siswa', 'dd-node-fw');
            }
          },
          {
            narasi: '3. Evaluasi Firewall Layer 3 & 4: Firewall memeriksa Security Matrix: "Traffic dari VLAN 40 (Siswa) ke VLAN 50 (CCTV) DIBLOKIR TOTAL".',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.inspectSwitch('dd-node-fw', {
                title: ' Firewall Zone Matrix Rule #4',
                port: 'In: VLAN 40 -> Out: VLAN 50',
                vlan: 'Src 172.16.40.0/24 Dst 172.16.50.0/24',
                status: 'ACTION: DROP & LOG ALERT!'
              });
              ctx.highlight('dd-node-fw', 'var(--danger)');
            }
          },
          {
            narasi: '4. Eksekusi Pemblokiran & Alarm: Paket dibuang seketika! Log tercatat di SIEM: "UNAUTHORIZED_CCTV_ACCESS_ATTEMPT from 172.16.40.15". CCTV tetap aman!',
            durasi: 2700,
            aksi: function (ctx) {
              ctx.dropPacket('dd-node-fw', ' BLOCKED BY FIREWALL RULE');
              ctx.showLabel('dd-node-cctv', ' CCTV Restricted (Safe)', { color: 'var(--success)' });
            }
          },
          {
            narasi: '5. Kesimpulan Defense in Depth: Bahkan jika siswa tahu IP CCTV, segmentasi VLAN + ACL mencegah akses fisik Layer 2 dan akses rute Layer 3/4. Keamanan sekolah terjaga!',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.arrive('dd-node-fw', { label: 'v Multi-Layer Defense Active' });
            }
          }
        ]
      });

    }

  });
})();
