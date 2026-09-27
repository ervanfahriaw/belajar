/**
 * ==========================================================================
 * MODUL-1-2.JS — LOGIKA SIMULASI & DATA INTERAKTIF MODUL 1.2
 * Modul 1.2: Routing & Switching
 * Protokol: file:// aman (Vanilla JS, Zero-Dependency, Web Animations API)
 * ==========================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* --------------------------------------------------------------------------
       1. RENDER SVG PERANGKAT KE SEMUA STAGE SIMULASI
       -------------------------------------------------------------------------- */
    function renderDeviceNodes() {
      if (!window.Devices) return;

      // Stage 1: CAM Table Learning
      const camPca = document.getElementById('cam-node-pca');
      const camSw = document.getElementById('cam-node-sw');
      const camPcb = document.getElementById('cam-node-pcb');
      const camPcc = document.getElementById('cam-node-pcc');
      if (camPca) camPca.innerHTML = window.Devices.laptop({ name: 'PC-A (Fa0/1)', ip: '192.168.1.10', mac: 'MAC: AA:11:01', state: 'aktif' });
      if (camSw) camSw.innerHTML = window.Devices.switch({ name: 'Switch-L2', state: 'normal' });
      if (camPcb) camPcb.innerHTML = window.Devices.laptop({ name: 'PC-B (Fa0/2)', ip: '192.168.1.20', mac: 'MAC: BB:22:02', state: 'normal' });
      if (camPcc) camPcc.innerHTML = window.Devices.laptop({ name: 'PC-C (Fa0/3)', ip: '192.168.1.30', mac: 'MAC: CC:33:03', state: 'normal' });

      // Stage 2: VLAN Isolation
      const vFin1 = document.getElementById('vlan-node-fin1');
      const vFin2 = document.getElementById('vlan-node-fin2');
      const vSw = document.getElementById('vlan-node-sw');
      const vHr1 = document.getElementById('vlan-node-hr1');
      const vHr2 = document.getElementById('vlan-node-hr2');
      if (vFin1) vFin1.innerHTML = window.Devices.laptop({ name: 'PC-Fin 1 (Fa0/1)', ip: '192.168.10.11', mac: 'VLAN 10' });
      if (vFin2) vFin2.innerHTML = window.Devices.laptop({ name: 'PC-Fin 2 (Fa0/2)', ip: '192.168.10.12', mac: 'VLAN 10' });
      if (vSw) vSw.innerHTML = window.Devices.switch({ name: 'Switch 24-Port', state: 'normal' });
      if (vHr1) vHr1.innerHTML = window.Devices.laptop({ name: 'PC-HR 1 (Fa0/3)', ip: '192.168.20.21', mac: 'VLAN 20' });
      if (vHr2) vHr2.innerHTML = window.Devices.laptop({ name: 'PC-HR 2 (Fa0/4)', ip: '192.168.20.22', mac: 'VLAN 20' });

      // Stage 3: VLAN Trunking & 802.1Q Tagging
      const trPca1 = document.getElementById('trunk-node-pca1');
      const trSw1 = document.getElementById('trunk-node-sw1');
      const trSw2 = document.getElementById('trunk-node-sw2');
      const trPca2 = document.getElementById('trunk-node-pca2');
      if (trPca1) trPca1.innerHTML = window.Devices.laptop({ name: 'PC-A1 (Lt 1)', ip: '192.168.10.21', mac: 'VLAN 10' });
      if (trSw1) trSw1.innerHTML = window.Devices.switch({ name: 'Switch Lantai 1', state: 'normal' });
      if (trSw2) trSw2.innerHTML = window.Devices.switch({ name: 'Switch Lantai 2', state: 'normal' });
      if (trPca2) trPca2.innerHTML = window.Devices.laptop({ name: 'PC-A2 (Lt 2)', ip: '192.168.10.22', mac: 'VLAN 10' });

      // Stage 4: Router-on-a-Stick
      const roasPc1 = document.getElementById('roas-node-pc1');
      const roasSw = document.getElementById('roas-node-sw');
      const roasRtr = document.getElementById('roas-node-rtr');
      const roasPc2 = document.getElementById('roas-node-pc2');
      if (roasPc1) roasPc1.innerHTML = window.Devices.laptop({ name: 'PC-1 (VLAN 10)', ip: '192.168.10.5', mac: 'GW: .10.1' });
      if (roasSw) roasSw.innerHTML = window.Devices.switch({ name: 'Switch (Trunk Link)', state: 'normal' });
      if (roasRtr) roasRtr.innerHTML = window.Devices.router({ name: 'Router (ROAS)', ip: 'g0/0.10 & g0/0.20' });
      if (roasPc2) roasPc2.innerHTML = window.Devices.laptop({ name: 'PC-2 (VLAN 20)', ip: '192.168.20.8', mac: 'GW: .20.1' });

      // Stage 5: Hop-by-Hop MAC Rewrite
      const hopPc = document.getElementById('hop-node-pc');
      const hopR1 = document.getElementById('hop-node-r1');
      const hopR2 = document.getElementById('hop-node-r2');
      const hopSrv = document.getElementById('hop-node-srv');
      if (hopPc) hopPc.innerHTML = window.Devices.laptop({ name: 'Laptop Arya', ip: '192.168.1.10', mac: 'MAC: AA:AA:01' });
      if (hopR1) hopR1.innerHTML = window.Devices.router({ name: 'Router-1 (Jakarta)', ip: 'LAN: .1.1 | WAN: .10.1' });
      if (hopR2) hopR2.innerHTML = window.Devices.router({ name: 'Router-2 (Surabaya)', ip: 'WAN: .10.2 | LAN: .1.1' });
      if (hopSrv) hopSrv.innerHTML = window.Devices.server ? window.Devices.server({ name: 'Web Server', ip: '10.0.0.50' }) : window.Devices.laptop({ name: 'Web Server', ip: '10.0.0.50', mac: 'MAC: SS:SS:01' });

      // Stage 6: OSPF Failover
      const foRa = document.getElementById('failover-node-ra');
      const foRc = document.getElementById('failover-node-rc');
      const foRb = document.getElementById('failover-node-rb');
      if (foRa) foRa.innerHTML = window.Devices.router({ name: 'Router Jakarta (A)', ip: '192.168.1.1' });
      if (foRc) foRc.innerHTML = window.Devices.router({ name: 'Router Semarang (C)', ip: '10.10.30.1' });
      if (foRb) foRb.innerHTML = window.Devices.router({ name: 'Router Surabaya (B)', ip: '192.168.2.1' });
    }

    renderDeviceNodes();


    /* --------------------------------------------------------------------------
       2. REGISTRASI SEMUA SIMULASI MODUL 1.2 KE ANIM-ENGINE
       -------------------------------------------------------------------------- */
    if (window.AnimEngine) {

      // === SIMULASI 1.2.1: CAM TABLE LEARNING ===
      window.AnimEngine.register({
        id: 'sim-cam-learning',
        judul: 'Cara Kerja MAC Address Table (CAM Table) di Switch',
        pertanyaanYangDijawab: 'Bagaimana switch belajar port perangkat dan kenapa switch tidak mem-flood selamanya?',
        langkah: [
          {
            narasi: '1. Kondisi Awal: Switch baru dinyalakan, CAM Table masih KOSONG. PC-A (Port 1, MAC: AA:11) ingin mengirim ping ke PC-B (Port 2, MAC: BB:22). Paket dibungkus dan dikirim ke Port 1 Switch.',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.clear();
              _updateCamTableHUD(ctx, []);
              ctx.highlight('cam-node-pca', 'var(--info)');
              ctx.encapsulatePacket('cam-node-pca', 'Ping PC-B', {
                destIP: '192.168.1.20',
                destMAC: 'BB:22'
              });
              setTimeout(() => {
                ctx.movePacket('cam-node-pca', 'cam-node-sw', { durasi: 1200 });
              }, 800);
            }
          },
          {
            narasi: '2. TAHAP LEARNING: Switch menerima frame di Port 1. Switch membaca Source MAC (AA:11) dan langsung mencatatnya ke CAM Table: Port 1 -> MAC AA:11.',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.highlight('cam-node-sw', 'var(--info)');
              _updateCamTableHUD(ctx, [
                { vlan: '1', mac: 'AA:11:01 (PC-A)', port: 'Fa0/1', status: 'NEW' }
              ]);
              ctx.showLabel('cam-node-sw', 'Belajar: Port Fa0/1 = AA:11', { color: 'var(--success)' });
            }
          },
          {
            narasi: '3. TAHAP FLOODING (Unknown Unicast): Switch memeriksa Destination MAC (BB:22). Karena MAC BB:22 BELUM ADA di tabel, Switch mem-flood (menyalin paket) ke SEMUA port aktif kecuali port asal (Fa0/2 dan Fa0/3).',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.showLabel('cam-node-sw', 'MAC BB:22 Tidak Ada -> FLOODING!', { color: 'var(--warning)' });
              ctx.movePacket('cam-node-sw', 'cam-node-pcb', { durasi: 1300 });
              _spawnDuplicateAndMove(ctx, 'cam-node-sw', 'cam-node-pcc', { durasi: 1300 });
            }
          },
          {
            narasi: '4. PENGECEKAN TUJUAN: PC-C (Fa0/3) menerima paket tapi MAC miliknya (CC:33) tidak cocok, maka PC-C MEMBUANG paket (DROP). PC-B (Fa0/2) menerima karena MAC tujuannya cocok!',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.dropPacket('cam-node-pcc', 'Bukan Tujuan (MAC CC:33 != BB:22)');
              ctx.highlight('cam-node-pcb', 'var(--success)');
              ctx.showLabel('cam-node-pcb', 'Paket Diterima!', { color: 'var(--success)' });
            }
          },
          {
            narasi: '5. RESPONSE & SECOND LEARNING: PC-B mengirim balasan (Reply) ke PC-A. Saat balasan masuk ke Fa0/2, Switch membaca Source MAC (BB:22) dan mencatatnya ke CAM Table: Port 2 -> MAC BB:22.',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.encapsulatePacket('cam-node-pcb', 'Reply PC-A', {
                destIP: '192.168.1.10',
                destMAC: 'AA:11'
              });
              ctx.movePacket('cam-node-pcb', 'cam-node-sw', {
                durasi: 1100,
                onArrive: function () {
                  _updateCamTableHUD(ctx, [
                    { vlan: '1', mac: 'AA:11:01 (PC-A)', port: 'Fa0/1', status: 'Learned' },
                    { vlan: '1', mac: 'BB:22:02 (PC-B)', port: 'Fa0/2', status: 'NEW' }
                  ]);
                  ctx.showLabel('cam-node-sw', 'Belajar: Port Fa0/2 = BB:22', { color: 'var(--success)' });
                }
              });
            }
          },
          {
            narasi: '6. TAHAP FORWARDING CERDAS (Unicast Filtered): Karena MAC tujuan (AA:11) SUDAH TERDAFTAR di Fa0/1, Switch langsung meneruskan frame HANYA ke Fa0/1 tanpa mem-flood ke Fa0/3. Port 3 tidak terganggu!',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.movePacket('cam-node-sw', 'cam-node-pca', {
                durasi: 1200,
                onArrive: function () {
                  ctx.decapsulatePacket('cam-node-pca', 'Reply PC-A');
                  ctx.highlight('cam-node-pca', 'var(--success)');
                  ctx.showLabel('cam-node-pca', 'Ping Sukses!', { color: 'var(--success)' });
                }
              });
            }
          }
        ]
      });


      // === SIMULASI 1.2.2: VLAN ISOLATION ===
      window.AnimEngine.register({
        id: 'sim-vlan-isolation',
        judul: 'Isolasi Lalu Lintas & Broadcast Domain dengan VLAN',
        pertanyaanYangDijawab: 'Kenapa perangkat beda VLAN tidak bisa saling mengganggu meski di satu switch fisik?',
        langkah: [
          {
            narasi: '1. Pada Switch 24-Port ini, Port 1-2 diatur sebagai VLAN 10 (Keuangan / Ungu) dan Port 3-4 diatur sebagai VLAN 20 (HRD / Cyan).',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.clear();
              ctx.highlight('vlan-node-fin1', '#A855F7');
              ctx.highlight('vlan-node-fin2', '#A855F7');
              ctx.highlight('vlan-node-hr1', '#06B6D4');
              ctx.highlight('vlan-node-hr2', '#06B6D4');
              ctx.showLabel('vlan-node-sw', 'Switch Terbagi 2 VLAN Virtual', { color: 'var(--info)' });
            }
          },
          {
            narasi: '2. KASUS 1 (SESAMA VLAN): PC-Fin 1 (VLAN 10) mengirim broadcast ARP. Switch menerima frame di Port Fa0/1 (anggota VLAN 10).',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.encapsulatePacket('vlan-node-fin1', 'ARP Broadcast', { destIP: '255.255.255.255', destMAC: 'FF:FF:FF' });
              ctx.movePacket('vlan-node-fin1', 'vlan-node-sw', { durasi: 1200 });
            }
          },
          {
            narasi: '3. SWITCH MEMBATASI BROADCAST: Switch hanya mem-forward broadcast ke Port Fa0/2 (sesama VLAN 10). Port Fa0/3 dan Fa0/4 (VLAN 20) TIDAK MENERIMA broadcast apa pun!',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.movePacket('vlan-node-sw', 'vlan-node-fin2', {
                durasi: 1200,
                onArrive: function () {
                  ctx.highlight('vlan-node-fin2', 'var(--success)');
                  ctx.showLabel('vlan-node-fin2', 'Broadcast Diterima (VLAN 10)', { color: 'var(--success)' });
                }
              });
            }
          },
          {
            narasi: '4. KASUS 2 (LINTAS VLAN TANPA ROUTER): PC-Fin 1 mencoba mengirim paket data langsung ke PC-HR 1 (Port Fa0/3 di VLAN 20).',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.encapsulatePacket('vlan-node-fin1', 'Rahasia Fin', { destIP: '192.168.20.10', destMAC: 'HR:01' });
              ctx.movePacket('vlan-node-fin1', 'vlan-node-sw', { durasi: 1200 });
            }
          },
          {
            narasi: '5. PAKET DIBLOKIR / DROP DI SWITCH! Switch mendeteksi paket dari Port Fa0/1 (VLAN 10) menuju Port Fa0/3 (VLAN 20). Karena beda VLAN, switch langsung membuang paket!',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.dropPacket('vlan-node-sw', 'DROP: Port Berbeda VLAN! Butuh Router untuk nyeberang.');
              ctx.highlight('vlan-node-hr1', 'var(--text-muted)');
            }
          }
        ]
      });


      // === SIMULASI 1.2.3: VLAN TRUNKING & 802.1Q ===
      window.AnimEngine.register({
        id: 'sim-trunk-tagging',
        judul: 'VLAN Trunking & 802.1Q Header Tagging Antar-Switch',
        pertanyaanYangDijawab: 'Bagaimana 1 kabel fisik trunk bisa membawa lalu lintas banyak VLAN tanpa tertukar?',
        langkah: [
          {
            narasi: '1. Gedung 2 Lantai: Switch Lantai 1 dan Switch Lantai 2 terhubung oleh 1 kabel Trunk (Gi0/1). PC-A1 (Lantai 1, VLAN 10) ingin kirim data ke PC-A2 (Lantai 2, VLAN 10).',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.clear();
              ctx.encapsulatePacket('trunk-node-pca1', 'Data Laporan', { destIP: '192.168.10.20', destMAC: 'A2:02' });
              ctx.highlight('trunk-node-pca1', '#A855F7');
            }
          },
          {
            narasi: '2. Frame Untagged dari PC-A1 masuk ke Port Access Fa0/1 Switch 1. Switch 1 mengetahui frame ini milik VLAN 10.',
            durasi: 2000,
            aksi: function (ctx) {
              ctx.movePacket('trunk-node-pca1', 'trunk-node-sw1', { durasi: 1200 });
            }
          },
          {
            narasi: '3. 802.1Q TAGGING: Sebelum mengirim lewat kabel Trunk, Switch 1 MENYISIPKAN TAG 802.1Q (4-Byte dengan VLAN ID = 10) ke dalam header frame Ethernet.',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.highlight('trunk-node-sw1', '#A855F7');
              _showTaggedPacketOnSwitch(ctx, 'trunk-node-sw1', 'TAG: VLAN 10');
              ctx.showLabel('trunk-node-sw1', 'Tempel Tag: VLAN ID 10', { color: '#F59E0B' });
            }
          },
          {
            narasi: '4. Frame ber-tag [VLAN 10] meluncur melintasi kabel Trunk Gigabit tunggal menuju Switch 2 Lantai 2.',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.movePacket('trunk-node-sw1', 'trunk-node-sw2', { durasi: 1500 });
            }
          },
          {
            narasi: '5. UNTAGGING DI SWITCH 2: Switch 2 membaca tag [VLAN 10], lalu MENCABUT tag tersebut sebelum meneruskan frame standar (Untagged) ke Port Fa0/1 PC-A2. PC-B2 (VLAN 20) tidak menerima apa pun!',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.showLabel('trunk-node-sw2', 'Copot Tag -> Kirim ke Port VLAN 10', { color: 'var(--success)' });
              ctx.movePacket('trunk-node-sw2', 'trunk-node-pca2', {
                durasi: 1200,
                onArrive: function () {
                  ctx.decapsulatePacket('trunk-node-pca2', 'Data Laporan');
                  ctx.highlight('trunk-node-pca2', 'var(--success)');
                  ctx.showLabel('trunk-node-pca2', 'Frame Diterima Bersih!', { color: 'var(--success)' });
                }
              });
            }
          }
        ]
      });


      // === SIMULASI 1.2.4: ROUTER-ON-A-STICK ===
      window.AnimEngine.register({
        id: 'sim-router-on-a-stick',
        judul: 'Inter-VLAN Routing: Router-on-a-Stick (ROAS)',
        pertanyaanYangDijawab: 'Bagaimana paket menyeberang antar VLAN melewati sub-interface router?',
        langkah: [
          {
            narasi: '1. PC-1 (VLAN 10, IP 192.168.10.5) ingin mengirim data ke PC-2 (VLAN 20, IP 192.168.20.8). Karena beda subnet, PC-1 mengirim paket ke Default Gateway miliknya (192.168.10.1).',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.clear();
              ctx.encapsulatePacket('roas-node-pc1', 'Data Nilai', {
                destIP: '192.168.20.8',
                destMAC: 'R-Fa0/0.10'
              });
              ctx.highlight('roas-node-pc1', '#A855F7');
            }
          },
          {
            narasi: '2. Paket masuk ke Switch. Switch menempelkan tag [VLAN 10] dan meneruskan paket naik ke Router melalui kabel Trunk tunggal.',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.movePacket('roas-node-pc1', 'roas-node-sw', {
                durasi: 1000,
                onArrive: function () {
                  ctx.movePacket('roas-node-sw', 'roas-node-rtr', { durasi: 1200 });
                }
              });
            }
          },
          {
            narasi: '3. SUB-INTERFACE ROUTING: Paket diterima sub-interface Fa0/0.10 di Router. Router melepas tag VLAN 10, membaca IP Destination (192.168.20.8), dan mencocokkan dengan Routing Table ke Fa0/0.20.',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.highlight('roas-node-rtr', 'var(--info)');
              ctx.showLabel('roas-node-rtr', 'Routing: Fa0/0.10 -> Fa0/0.20 (Ganti Tag VLAN 20)', { color: 'var(--success)' });
            }
          },
          {
            narasi: '4. RE-TAGGING: Router membungkus paket dengan Tag Baru [VLAN 20] dan mengirimkannya turun kembali ke Switch melalui kabel trunk yang sama.',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.movePacket('roas-node-rtr', 'roas-node-sw', { durasi: 1200 });
            }
          },
          {
            narasi: '5. SAMPAI DI TUJUAN: Switch membaca tag [VLAN 20], mencabut tag, lalu mengantarkan frame untagged ke PC-2 di Port VLAN 20. Inter-VLAN Routing Berhasil!',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.movePacket('roas-node-sw', 'roas-node-pc2', {
                durasi: 1200,
                onArrive: function () {
                  ctx.decapsulatePacket('roas-node-pc2', 'Data Nilai');
                  ctx.highlight('roas-node-pc2', 'var(--success)');
                  ctx.showLabel('roas-node-pc2', 'Inter-VLAN Berhasil!', { color: 'var(--success)' });
                }
              });
            }
          }
        ]
      });


      // === SIMULASI 1.2.5: HOP-BY-HOP MAC REWRITE ===
      window.AnimEngine.register({
        id: 'sim-hop-mac-rewrite',
        judul: 'Hop-by-Hop MAC Rewrite: MAC Berubah Tiap Hop, IP Tetap Asli',
        pertanyaanYangDijawab: 'Kenapa alamat IP tidak pernah berubah di perjalanan, tapi MAC address selalu diganti di setiap router?',
        langkah: [
          {
            narasi: '1. HOP 1 (LAN Asal): Laptop Arya (192.168.1.10) membungkus paket menuju Web Server (10.0.0.50). Karena server berada di luar LAN, MAC tujuan diisi MAC Router-1 (Gateway).',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.clear();
              _updateHopHUD(ctx, {
                hop: 'Hop 1: Laptop -> Router 1',
                srcIP: '192.168.1.10 (Arya)',
                dstIP: '10.0.0.50 (Server)',
                srcMAC: 'AA:AA:01 (Laptop)',
                dstMAC: '11:11:01 (R1-Fa0/0)',
                ttl: '64'
              });
              ctx.highlight('hop-node-pc', 'var(--info)');
              ctx.encapsulatePacket('hop-node-pc', 'HTTP GET', {
                destIP: '10.0.0.50',
                destMAC: '11:11:01'
              });
            }
          },
          {
            narasi: '2. Paket meluncur dari Laptop ke Router-1 melalui media LAN lokal.',
            durasi: 2000,
            aksi: function (ctx) {
              ctx.movePacket('hop-node-pc', 'hop-node-r1', { durasi: 1400 });
            }
          },
          {
            narasi: '3. MAC REWRITE DI ROUTER 1: R1 mencopot MAC Header lama. R1 mengurangi TTL (64 -> 63). Lalu R1 memasang MAC Header BARU untuk menyeberang WAN: Src MAC = R1-Serial, Dst MAC = R2-Serial. IP TETAP!',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.highlight('hop-node-r1', 'var(--warning)');
              _updateHopHUD(ctx, {
                hop: 'Hop 2: Router 1 -> Router 2 (WAN Link)',
                srcIP: '192.168.1.10 (TETAP)',
                dstIP: '10.0.0.50 (TETAP)',
                srcMAC: '12:12:02 (R1-Se0)',
                dstMAC: '21:21:01 (R2-Se0)',
                ttl: '63 (Berkurang 1)'
              });
              ctx.showLabel('hop-node-r1', 'MAC Header Diganti! IP Tetap.', { color: 'var(--warning)' });
            }
          },
          {
            narasi: '4. Paket meluncur di link WAN antar Router-1 dan Router-2 membawa MAC Header milik link WAN.',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.movePacket('hop-node-r1', 'hop-node-r2', { durasi: 1500 });
            }
          },
          {
            narasi: '5. MAC REWRITE DI ROUTER 2: R2 mencopot MAC Header WAN, mengurangi TTL (63 -> 62), dan memasang MAC Header LAN Server: Src MAC = R2-Fa0/0, Dst MAC = Web Server (SS:SS:01).',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.highlight('hop-node-r2', 'var(--warning)');
              _updateHopHUD(ctx, {
                hop: 'Hop 3: Router 2 -> Web Server (LAN Server)',
                srcIP: '192.168.1.10 (TETAP)',
                dstIP: '10.0.0.50 (TETAP)',
                srcMAC: '22:22:02 (R2-Fa0/0)',
                dstMAC: 'SS:SS:01 (Server)',
                ttl: '62 (Berkurang 1)'
              });
              ctx.showLabel('hop-node-r2', 'MAC Diganti ke MAC Server', { color: 'var(--warning)' });
            }
          },
          {
            narasi: '6. SAMPAI DI WEB SERVER: Web Server menerima paket utuh. Server melihat IP Asli pengirim adalah 192.168.1.10 (Laptop Arya) dan siap membalas!',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.movePacket('hop-node-r2', 'hop-node-srv', {
                durasi: 1300,
                onArrive: function () {
                  ctx.decapsulatePacket('hop-node-srv', 'HTTP GET');
                  ctx.highlight('hop-node-srv', 'var(--success)');
                  ctx.showLabel('hop-node-srv', 'Paket Diterima Sempurna!', { color: 'var(--success)' });
                }
              });
            }
          }
        ]
      });


      // === SIMULASI 1.2.6: OSPF FAILOVER ===
      window.AnimEngine.register({
        id: 'sim-routing-failover',
        judul: 'Perbandingan Static vs Dynamic Routing: OSPF Automatic Failover',
        pertanyaanYangDijawab: 'Apa yang terjadi saat kabel utama putus pada static routing vs dynamic routing?',
        langkah: [
          {
            narasi: '1. Topologi Segitiga: Router-A (Jakarta) terhubung ke Router-B (Surabaya) via Jalur Utama FO 10G (Bawah), serta jalur cadangan via Router-C (Semarang 1G - Atas).',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.clear();
              _setLinkState(ctx, 'link-ab', 'active');
              _setLinkState(ctx, 'link-ac', 'idle');
              _setLinkState(ctx, 'link-cb', 'idle');
              ctx.showLabel('failover-node-ra', 'Kondisi Normal: OSPF Pilih Jalur Cepat (Cost 1)', { color: 'var(--success)' });
            }
          },
          {
            narasi: '2. KONDISI NORMAL: OSPF memilih Jalur Utama Jakarta-Surabaya karena Metric Cost paling rendah. Paket data meluncur lancar langsung A -> B.',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.encapsulatePacket('failover-node-ra', 'Paket Data', { destIP: '192.168.2.10', destMAC: 'RB-01' });
              ctx.movePacket('failover-node-ra', 'failover-node-rb', {
                durasi: 1400,
                onArrive: function () {
                  ctx.highlight('failover-node-rb', 'var(--success)');
                }
              });
            }
          },
          {
            narasi: '3. GANGGUAN FISIK! Kabel Fiber Optik Jakarta-Surabaya putus di laut! Pada Static Routing tanpa backup, paket akan langsung HILANG (Request Timed Out).',
            durasi: 2600,
            aksi: function (ctx) {
              _setLinkState(ctx, 'link-ab', 'broken');
              ctx.showLabel('failover-node-ra', '️ LINK UTAMA PUTUS!', { color: 'var(--danger)' });
              ctx.highlight('failover-node-ra', 'var(--danger)');
            }
          },
          {
            narasi: '4. DYNAMIC ROUTING BERAKSI (OSPF RE-CONVERGENCE): Router-A mendeteksi Hello Packet mati, menyebarkan LSA ke Router-C, dan menghitung ulang jalur terpendek dalam 2 detik!',
            durasi: 2600,
            aksi: function (ctx) {
              _setLinkState(ctx, 'link-ac', 'active');
              _setLinkState(ctx, 'link-cb', 'active');
              ctx.showLabel('failover-node-rc', 'OSPF Update: Rute Baru via Semarang Aktif', { color: 'var(--info)' });
              ctx.highlight('failover-node-rc', 'var(--info)');
            }
          },
          {
            narasi: '5. AUTOMATIC FAILOVER SUKSES: Paket data berikutnya otomatis dibelokkan mendaki ke Semarang (Router-C), lalu diteruskan ke Surabaya (Router-B) tanpa intervensi manusia!',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.encapsulatePacket('failover-node-ra', 'Paket Failover', { destIP: '192.168.2.10', destMAC: 'RC-01' });
              ctx.movePacket('failover-node-ra', 'failover-node-rc', {
                durasi: 1200,
                onArrive: function () {
                  ctx.movePacket('failover-node-rc', 'failover-node-rb', {
                    durasi: 1200,
                    onArrive: function () {
                      ctx.decapsulatePacket('failover-node-rb', 'Paket Failover');
                      ctx.highlight('failover-node-rb', 'var(--success)');
                      ctx.showLabel('failover-node-rb', 'Failover Berhasil! 0 Downtime.', { color: 'var(--success)' });
                    }
                  });
                }
              });
            }
          }
        ]
      });

    }


    /* --------------------------------------------------------------------------
       3. WIDGET INTERAKTIF: KALKULATOR WILDCARD MASK & SINTAKS CISCO OSPF
       -------------------------------------------------------------------------- */
    const wildcardSlider = document.getElementById('wildcard-slider');
    const wildcardPrefixLabel = document.getElementById('wildcard-prefix-label');
    const wildcardMaskLabel = document.getElementById('wildcard-mask-label');
    const wildcardResultLabel = document.getElementById('wildcard-result-label');
    const wildcardFormulaLabel = document.getElementById('wildcard-formula-label');
    const ospfCmdLabel = document.getElementById('ospf-cmd-preview');

    const WILDCARD_TABLE = {
      24: { mask: '255.255.255.0', wildcard: '0.0.0.255', lastOctetSub: 0 },
      25: { mask: '255.255.255.128', wildcard: '0.0.0.127', lastOctetSub: 128 },
      26: { mask: '255.255.255.192', wildcard: '0.0.0.63', lastOctetSub: 192 },
      27: { mask: '255.255.255.224', wildcard: '0.0.0.31', lastOctetSub: 224 },
      28: { mask: '255.255.255.240', wildcard: '0.0.0.15', lastOctetSub: 240 },
      29: { mask: '255.255.255.248', wildcard: '0.0.0.7', lastOctetSub: 248 },
      30: { mask: '255.255.255.252', wildcard: '0.0.0.3', lastOctetSub: 252 }
    };

    function updateWildcardWidget(prefix) {
      const data = WILDCARD_TABLE[prefix];
      if (!data) return;

      if (wildcardPrefixLabel) wildcardPrefixLabel.textContent = `/${prefix}`;
      if (wildcardMaskLabel) wildcardMaskLabel.textContent = data.mask;
      if (wildcardResultLabel) wildcardResultLabel.textContent = data.wildcard;
      if (wildcardFormulaLabel) {
        wildcardFormulaLabel.innerHTML = `
          255.255.255.255<br>
          <span style="color:var(--danger);">- ${data.mask}</span><br>
          <span style="border-top:1.5px solid var(--border-light); display:inline-block; margin-top:2px; font-weight:bold; color:var(--success);">
            = ${data.wildcard} (255 - ${data.lastOctetSub} = ${255 - data.lastOctetSub})
          </span>
        `;
      }
      if (ospfCmdLabel) {
        ospfCmdLabel.textContent = `Router(config-router)# network 192.168.1.0 ${data.wildcard} area 0`;
      }
    }

    if (wildcardSlider) {
      wildcardSlider.addEventListener('input', function (e) {
        updateWildcardWidget(parseInt(e.target.value));
      });
      updateWildcardWidget(26);
    }

  });


  /* --------------------------------------------------------------------------
     HELPER FUNCTIONS UNTUK SIMULASI MODUL 1.2
     -------------------------------------------------------------------------- */

  function _updateCamTableHUD(ctx, entries) {
    const tableEl = document.getElementById('cam-hud-table');
    if (!tableEl) return;

    if (!entries || entries.length === 0) {
      tableEl.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-dim); padding:10px;">(CAM Table Masih Kosong — Switch Baru Nyala)</td></tr>`;
      return;
    }

    let html = '';
    entries.forEach(row => {
      const isNew = row.status === 'NEW';
      html += `
        <tr style="${isNew ? 'background: rgba(16, 185, 129, 0.15); font-weight: bold;' : ''}">
          <td style="color:var(--text-muted); font-family:var(--font-mono);">${row.vlan}</td>
          <td style="color:var(--primary); font-family:var(--font-mono);">${row.mac}</td>
          <td style="color:var(--info); font-family:var(--font-mono);">${row.port}</td>
          <td><span class="badge ${isNew ? 'badge--success' : 'badge--outline'}" style="font-size:0.75rem;">${row.status}</span></td>
        </tr>
      `;
    });
    tableEl.innerHTML = html;
  }

  function _spawnDuplicateAndMove(ctx, fromNode, toNode, opts) {
    const fromCoords = ctx.stage ? ctx.stage.querySelector(`#${fromNode}`) : null;
    const toCoords = ctx.stage ? ctx.stage.querySelector(`#${toNode}`) : null;
    if (!fromCoords || !toCoords) return;

    const fcx = parseFloat(fromCoords.dataset.cx || 400);
    const fcy = parseFloat(fromCoords.dataset.cy || 180);
    const tcx = parseFloat(toCoords.dataset.cx || 640);
    const tcy = parseFloat(toCoords.dataset.cy || 260);

    const svg = ctx.stage.querySelector('svg');
    if (!svg) return;

    const dup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    dup.setAttribute('class', 'packet packet--duplicate');
    dup.innerHTML = `
      <rect x="-30" y="-14" width="60" height="28" rx="5" fill="#F59E0B" stroke="#FFF" stroke-width="1.5" />
      <text x="0" y="3" text-anchor="middle" fill="#0B0F19" font-size="9" font-weight="bold" font-family="var(--font-mono)">FLOOD</text>
    `;
    svg.appendChild(dup);

    dup.animate([
      { transform: `translate(${fcx}px, ${fcy}px)` },
      { transform: `translate(${tcx}px, ${tcy}px)` }
    ], {
      duration: opts.durasi || 1300,
      fill: 'forwards',
      easing: 'ease-in-out'
    }).onfinish = function () {
      setTimeout(() => dup.remove(), 400);
    };
  }

  function _showTaggedPacketOnSwitch(ctx, swNode, tagText) {
    const sw = ctx.stage.querySelector(`#${swNode}`);
    if (!sw) return;
    const cx = parseFloat(sw.dataset.cx || 260);
    const cy = parseFloat(sw.dataset.cy || 190);

    const svg = ctx.stage.querySelector('svg');
    if (!svg) return;

    const badge = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    badge.setAttribute('class', 'vlan-tag-badge');
    badge.innerHTML = `
      <rect x="${cx - 45}" y="${cy - 50}" width="90" height="22" rx="4" fill="#F59E0B" stroke="#FFF" stroke-width="1.5" />
      <text x="${cx}" y="${cy - 35}" text-anchor="middle" fill="#0B0F19" font-size="9.5" font-weight="bold" font-family="var(--font-mono)">${tagText}</text>
    `;
    svg.appendChild(badge);

    badge.animate([
      { transform: 'scale(0.8)', opacity: 0 },
      { transform: 'scale(1)', opacity: 1 }
    ], { duration: 400, fill: 'forwards' });

    setTimeout(() => badge.remove(), 2400);
  }

  function _updateHopHUD(ctx, data) {
    const hud = document.getElementById('hop-hud-container');
    if (!hud) return;

    hud.innerHTML = `
      <div style="background:var(--bg-elevated); border:1.5px solid var(--border); border-radius:var(--radius-md); padding:var(--space-sm); font-size:0.85rem; box-shadow:var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:8px;">
          <span style="font-weight:750; color:var(--primary); font-size:0.9rem;"> ${data.hop}</span>
          <span class="badge badge--warning" style="font-family:var(--font-mono); font-size:0.75rem;">TTL: ${data.ttl}</span>
        </div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:var(--space-sm);">
          <div style="background:rgba(99, 102, 241, 0.08); padding:6px 10px; border-radius:var(--radius-sm); border-left:3px solid var(--primary);">
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:bold;">LAYER 3 (IP - TETAP GLOBAL)</div>
            <div style="font-family:var(--font-mono); color:var(--text); margin-top:2px;">Src: <span style="color:var(--info);">${data.srcIP}</span></div>
            <div style="font-family:var(--font-mono); color:var(--text);">Dst: <span style="color:var(--success);">${data.dstIP}</span></div>
          </div>
          <div style="background:rgba(245, 158, 11, 0.08); padding:6px 10px; border-radius:var(--radius-sm); border-left:3px solid var(--warning);">
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:bold;">LAYER 2 (MAC - BERGANTI TIAP HOP)</div>
            <div style="font-family:var(--font-mono); color:var(--text); margin-top:2px;">Src: <span style="color:var(--warning);">${data.srcMAC}</span></div>
            <div style="font-family:var(--font-mono); color:var(--text);">Dst: <span style="color:var(--warning);">${data.dstMAC}</span></div>
          </div>
        </div>
      </div>
    `;
  }

  function _setLinkState(ctx, linkId, state) {
    const line = ctx.stage.querySelector(`#${linkId}`);
    if (!line) return;

    if (state === 'broken') {
      line.setAttribute('stroke', 'var(--danger)');
      line.setAttribute('stroke-dasharray', '6,6');
      line.setAttribute('stroke-width', '3.5');
    } else if (state === 'active') {
      line.setAttribute('stroke', 'var(--success)');
      line.removeAttribute('stroke-dasharray');
      line.setAttribute('stroke-width', '3');
    } else {
      line.setAttribute('stroke', 'var(--border-light)');
      line.removeAttribute('stroke-dasharray');
      line.setAttribute('stroke-width', '2');
    }
  }

})();
