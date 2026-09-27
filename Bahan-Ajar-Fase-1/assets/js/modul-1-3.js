/**
 * ==========================================================================
 * MODUL-1-3.JS — LOGIKA SIMULASI & DATA INTERAKTIF MODUL 1.3
 * Modul 1.3: Multi-Vendor & Simulasi Lanjutan (GNS3 & MikroTik)
 * Protokol: file:// aman (Vanilla JS, Zero-Dependency, Web Animations API)
 * ==========================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* --------------------------------------------------------------------------
       1. RENDER SVG PERANGKAT KE SEMUA STAGE SIMULASI MODUL 1.3
       -------------------------------------------------------------------------- */
    function renderDeviceNodes() {
      if (!window.Devices) return;

      // Stage 1: Simulator vs Emulator
      const ptNode = document.getElementById('gns-node-pt');
      const gnsNode = document.getElementById('gns-node-gns');
      if (ptNode) ptNode.innerHTML = window.Devices.laptop({ name: 'Packet Tracer', ip: 'Simulasi Sintetis', mac: 'Cisco Proprietary', state: 'normal' });
      if (gnsNode) gnsNode.innerHTML = window.Devices.server({ name: 'GNS3 Server', ip: 'Real OS Binary (QEMU)', state: 'aktif' });

      // Stage 2: Winbox MAC Discovery
      const winLap = document.getElementById('win-node-laptop');
      const winMik = document.getElementById('win-node-mikrotik');
      if (winLap) winLap.innerHTML = window.Devices.laptop({ name: 'Laptop Admin', ip: '0.0.0.0 (No IP)', mac: 'MAC: E4:12:AA', state: 'aktif' });
      if (winMik) winMik.innerHTML = window.Devices.mikrotik({ name: 'MikroTik Baru', ip: 'Belum Ada IP', mac: 'MAC: D4:01:C3' });

      // Stage 3: DHCP DORA
      const doraCln = document.getElementById('dora-node-client');
      const doraSrv = document.getElementById('dora-node-server');
      if (doraCln) doraCln.innerHTML = window.Devices.hp({ name: 'HP Arya', ip: 'Mencari IP...', mac: 'MAC: 8A:3F:11', state: 'aktif' });
      if (doraSrv) doraSrv.innerHTML = window.Devices.mikrotik({ name: 'DHCP Server (MikroTik)', ip: '192.168.88.1', mac: 'Pool: .10-.100' });

      // Stage 4: NAT Masquerade
      const natPc1 = document.getElementById('nat-node-pc1');
      const natPc2 = document.getElementById('nat-node-pc2');
      const natRtr = document.getElementById('nat-node-router');
      const natSrv = document.getElementById('nat-node-cloud');
      if (natPc1) natPc1.innerHTML = window.Devices.laptop({ name: 'PC-1 (LAN)', ip: '192.168.1.10:5021' });
      if (natPc2) natPc2.innerHTML = window.Devices.laptop({ name: 'PC-2 (LAN)', ip: '192.168.1.20:5022' });
      if (natRtr) natRtr.innerHTML = window.Devices.mikrotik({ name: 'Router NAT', ip: 'WAN: 203.0.113.88' });
      if (natSrv) natSrv.innerHTML = window.Devices.server({ name: 'Web Google', ip: '142.250.190.46:80' });

      // Stage 5: Multi-Vendor OSPF (Cisco + MikroTik)
      const peerCisco = document.getElementById('peer-node-cisco');
      const peerMik = document.getElementById('peer-node-mik');
      if (peerCisco) peerCisco.innerHTML = window.Devices.router({ name: 'Cisco 2911 (Core)', ip: '10.10.10.1/30' });
      if (peerMik) peerMik.innerHTML = window.Devices.mikrotik({ name: 'MikroTik CCR (Dist)', ip: '10.10.10.2/30' });

      // Stage 6: Firewall Filter Chains
      const fwHacker = document.getElementById('fw-node-hacker');
      const fwRtr = document.getElementById('fw-node-router');
      const fwLan = document.getElementById('fw-node-lan');
      if (fwHacker) fwHacker.innerHTML = window.Devices.laptop({ name: 'Bot Internet (Asing)', ip: '185.220.101.5', mac: 'Attacking Port 8291', state: 'nonaktif' });
      if (fwRtr) fwRtr.innerHTML = window.Devices.mikrotik({ name: 'MikroTik Firewall', ip: 'Input & Forward Chains' });
      if (fwLan) fwLan.innerHTML = window.Devices.laptop({ name: 'PC Karyawan (LAN)', ip: '192.168.88.25', mac: 'Browsing Web' });
    }

    renderDeviceNodes();


    /* --------------------------------------------------------------------------
       2. REGISTRASI SEMUA SIMULASI MODUL 1.3 KE ANIM-ENGINE
       -------------------------------------------------------------------------- */
    if (window.AnimEngine) {

      // === SIMULASI 1.3.1: SIMULATOR VS EMULATOR ===
      window.AnimEngine.register({
        id: 'sim-simulator-vs-emulator',
        judul: 'Perbedaan Simulator (Packet Tracer) vs Emulator (GNS3)',
        pertanyaanYangDijawab: 'Kenapa GNS3 menjalankan kernel OS nyata dan mendukung live packet capture Wireshark?',
        langkah: [
          {
            narasi: '1. Simulator (Cisco Packet Tracer): Aplikasi perangkat lunak buatan yang menirukan respon Cisco berdasarkan kode sintetis tertutup. Ringan, tetapi fiturnya dibatasi.',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.clear();
              ctx.highlight('gns-node-pt', 'var(--warning)');
              ctx.showLabel('gns-node-pt', 'Packet Tracer: Model Perilaku Buatan (Terkunci)', { color: 'var(--warning)' });
            }
          },
          {
            narasi: '2. Emulator (GNS3 / EVE-NG): Menggunakan QEMU/Dynamips untuk memutar BINARY OS ASLI (Cisco IOS `.bin`, MikroTik RouterOS `.vmdk`, Linux Kernel).',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.highlight('gns-node-gns', 'var(--success)');
              ctx.showLabel('gns-node-gns', 'GNS3: Real Virtualized Kernel (100% Fitur Asli)', { color: 'var(--success)' });
            }
          },
          {
            narasi: '3. INTEGRASI WIRESHARK ASLI: Pada GNS3, kamu bisa klik kanan link kabel apa pun dan membuka Wireshark untuk menyadap bit-bit biner asli yang melintas di jaringan!',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.encapsulatePacket('gns-node-gns', 'Raw Pcap', { destIP: 'Wireshark Sniffer', destMAC: 'Live Stream' });
              ctx.showLabel('gns-node-gns', ' Live Wireshark Packet Capture Aktif!', { color: 'var(--info)' });
            }
          }
        ]
      });


      // === SIMULASI 1.3.2: WINBOX MAC DISCOVERY (MNDP) ===
      window.AnimEngine.register({
        id: 'sim-winbox-mac-discovery',
        judul: 'Winbox Layer 2 Discovery (MNDP) & Login via MAC Address',
        pertanyaanYangDijawab: 'Bagaimana Winbox bisa mendeteksi dan me-remote MikroTik baru yang belum disetting IP?',
        langkah: [
          {
            narasi: '1. Laptop Admin dicolok kabel LAN ke Port ether2 MikroTik baru. Laptop belum disetting IP (0.0.0.0) dan MikroTik baru di-reset.',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.clear();
              _updateWinboxNeighborsTable(ctx, false);
              ctx.highlight('win-node-laptop', 'var(--info)');
              ctx.showLabel('win-node-laptop', 'Laptop: IP 0.0.0.0 (Tanpa IP)', { color: 'var(--info)' });
            }
          },
          {
            narasi: '2. ADMIN MEMBUKA TAB NEIGHBORS: Winbox mengirimkan paket MNDP (MikroTik Neighbor Discovery Protocol) berupa broadcast Layer 2 di kabel LAN.',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.encapsulatePacket('win-node-laptop', 'MNDP Probe', { destIP: '255.255.255.255', destMAC: 'FF:FF:FF:FF:FF:FF' });
              ctx.movePacket('win-node-laptop', 'win-node-mikrotik', { durasi: 1200 });
            }
          },
          {
            narasi: '3. MIKROTIK MERESPON DENGAN IDENTITAS LAYER 2: MikroTik membalas dengan membawa MAC D4:01:C3, BoardName: RB750r2, Version: RouterOS v7.14.',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.highlight('win-node-mikrotik', 'var(--success)');
              ctx.encapsulatePacket('win-node-mikrotik', 'MNDP Info', { destIP: 'Broadcast', destMAC: 'MAC: D4:01:C3' });
              ctx.movePacket('win-node-mikrotik', 'win-node-laptop', {
                durasi: 1200,
                onArrive: function () {
                  _updateWinboxNeighborsTable(ctx, true);
                  ctx.showLabel('win-node-laptop', 'Router Terdeteksi di Winbox!', { color: 'var(--success)' });
                }
              });
            }
          },
          {
            narasi: '4. LOGIN VIA MAC ADDRESS BERHASIL: Admin mengklik MAC Address D4:01:C3 di Winbox dan menekan "Connect". GUI Winbox terbuka penuh tanpa butuh IP subnet yang sama!',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.highlight('win-node-laptop', 'var(--primary)');
              ctx.highlight('win-node-mikrotik', 'var(--primary)');
              ctx.showLabel('win-node-laptop', 'v Terhubung via MAC Winbox (Port 20561 UDP)', { color: 'var(--primary)' });
            }
          }
        ]
      });


      // === SIMULASI 1.3.3: DHCP DORA PROCESS ===
      window.AnimEngine.register({
        id: 'sim-dhcp-dora',
        judul: 'Alur 4 Langkah DHCP Negosiasi Otomatis (DORA Process)',
        pertanyaanYangDijawab: 'Bagaimana smartphone mendapatkan IP, Gateway, dan DNS secara otomatis dalam 0.5 detik?',
        langkah: [
          {
            narasi: '1. [D — DISCOVER]: Smartphone Siswa baru terhubung ke WiFi/LAN. HP belum punya IP, sehingga membroadcast paket DHCPDISCOVER ke 255.255.255.255.',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.clear();
              _updateDoraHUD(ctx, { step: '1. DISCOVER', src: '0.0.0.0:68', dst: '255.255.255.255:67', desc: 'Siswa: "Adakah DHCP Server di jaringan ini? Saya butuh alamat IP!"' });
              ctx.encapsulatePacket('dora-node-client', 'DHCP DISCOVER', { destIP: '255.255.255.255', destMAC: 'FF:FF:FF' });
              ctx.movePacket('dora-node-client', 'dora-node-server', { durasi: 1300 });
            }
          },
          {
            narasi: '2. [O — OFFER]: Router MikroTik menerima Discover. MikroTik memeriksa pool dan menawarkan IP 192.168.88.50, Gateway 192.168.88.1, DNS 8.8.8.8.',
            durasi: 2600,
            aksi: function (ctx) {
              _updateDoraHUD(ctx, { step: '2. OFFER', src: '192.168.88.1:67', dst: '192.168.88.50:68', desc: 'MikroTik: "Saya punya IP 192.168.88.50 untukmu dengan Gateway .88.1!"' });
              ctx.highlight('dora-node-server', 'var(--info)');
              ctx.encapsulatePacket('dora-node-server', 'DHCP OFFER (.50)', { destIP: '192.168.88.50', destMAC: '8A:3F:11' });
              ctx.movePacket('dora-node-server', 'dora-node-client', { durasi: 1300 });
            }
          },
          {
            narasi: '3. [R — REQUEST]: Smartphone menyetujui tawaran tersebut dan mengirim paket DHCPREQUEST: "Saya setuju menyewa IP 192.168.88.50 dari servermu!"',
            durasi: 2600,
            aksi: function (ctx) {
              _updateDoraHUD(ctx, { step: '3. REQUEST', src: '0.0.0.0:68', dst: '255.255.255.255:67', desc: 'Siswa: "Saya setuju mengambil IP 192.168.88.50 dari Router .88.1!"' });
              ctx.encapsulatePacket('dora-node-client', 'DHCP REQUEST', { destIP: '255.255.255.255', destMAC: 'FF:FF:FF' });
              ctx.movePacket('dora-node-client', 'dora-node-server', { durasi: 1300 });
            }
          },
          {
            narasi: '4. [A — ACKNOWLEDGE]: Server MikroTik mencatat MAC HP di tabel Leases, mengunci sewa selama 30 menit, dan mengirim konfirmasi final DHCPACK!',
            durasi: 2800,
            aksi: function (ctx) {
              _updateDoraHUD(ctx, { step: '4. ACKNOWLEDGE', src: '192.168.88.1:67', dst: '192.168.88.50:68', desc: 'MikroTik: "Selesai! IP 192.168.88.50 resmi milikmu selama masa sewa (Lease Time)."' });
              ctx.encapsulatePacket('dora-node-server', 'DHCP ACK', { destIP: '192.168.88.50', destMAC: '8A:3F:11' });
              ctx.movePacket('dora-node-server', 'dora-node-client', {
                durasi: 1300,
                onArrive: function () {
                  ctx.highlight('dora-node-client', 'var(--success)');
                  ctx.showLabel('dora-node-client', 'v IP Aktif: 192.168.88.50/24', { color: 'var(--success)' });
                }
              });
            }
          }
        ]
      });


      // === SIMULASI 1.3.4: NAT MASQUERADE / PAT ===
      window.AnimEngine.register({
        id: 'sim-nat-masquerade',
        judul: 'NAT Masquerade & Port Address Translation (PAT)',
        pertanyaanYangDijawab: 'Bagaimana ribuan perangkat IP privat bisa internetan bersamaan dengan 1 IP publik?',
        langkah: [
          {
            narasi: '1. PC-1 (192.168.1.10:5021) dan PC-2 (192.168.1.20:5022) mengirim request browsing ke Web Server Google (142.250.190.46:80).',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.clear();
              _updateNatTableHUD(ctx, []);
              ctx.highlight('nat-node-pc1', 'var(--info)');
              ctx.encapsulatePacket('nat-node-pc1', 'HTTP GET', { destIP: '142.250.190.46', destMAC: 'RTR-LAN' });
              ctx.movePacket('nat-node-pc1', 'nat-node-router', { durasi: 1200 });
            }
          },
          {
            narasi: '2. TRANSLASI NAT MASQUERADE DI ROUTER: Router MikroTik mengganti Source IP privat menjadi IP Publik (203.0.113.88:10001) dan mencatat pemetaan di NAT Table.',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.highlight('nat-node-router', 'var(--warning)');
              _updateNatTableHUD(ctx, [
                { proto: 'tcp', privIp: '192.168.1.10:5021', pubIp: '203.0.113.88:10001', dstIp: '142.250.190.46:80' }
              ]);
              ctx.showLabel('nat-node-router', 'NAT Rewrite: Src IP -> 203.0.113.88:10001', { color: 'var(--warning)' });
            }
          },
          {
            narasi: '3. Paket dengan IP Publik meluncur ke Server Google di internet. Server hanya melihat pengirim adalah IP Publik 203.0.113.88:10001.',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.movePacket('nat-node-router', 'nat-node-cloud', { durasi: 1400 });
            }
          },
          {
            narasi: '4. GOOGLE MEMBALAS KE IP PUBLIK: Server Google mengirim data balasan (HTTP 200 OK) menuju IP Publik Router 203.0.113.88:10001.',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.highlight('nat-node-cloud', 'var(--success)');
              ctx.encapsulatePacket('nat-node-cloud', 'HTML Data', { destIP: '203.0.113.88:10001', destMAC: 'RTR-WAN' });
              ctx.movePacket('nat-node-cloud', 'nat-node-router', { durasi: 1400 });
            }
          },
          {
            narasi: '5. REVERSE TRANSLATION: Router memeriksa NAT Table: Port 10001 adalah milik PC-1 (192.168.1.10:5021). Router menerjemahkan balik dan mengantar data ke PC-1!',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.showLabel('nat-node-router', 'Reverse NAT -> 192.168.1.10:5021', { color: 'var(--success)' });
              ctx.movePacket('nat-node-router', 'nat-node-pc1', {
                durasi: 1200,
                onArrive: function () {
                  ctx.decapsulatePacket('nat-node-pc1', 'Halaman Web Google');
                  ctx.highlight('nat-node-pc1', 'var(--success)');
                  ctx.showLabel('nat-node-pc1', 'Web Terbuka Lancar!', { color: 'var(--success)' });
                }
              });
            }
          }
        ]
      });


      // === SIMULASI 1.3.5: CISCO + MIKROTIK OSPF PEERING ===
      window.AnimEngine.register({
        id: 'sim-cisco-mikrotik-peering',
        judul: 'Multi-Vendor OSPF Peering: Cisco IOS ↔ MikroTik RouterOS',
        pertanyaanYangDijawab: 'Bagaimana dua router dari pabrikan berbeda membentuk tetangga OSPF (Full Adjacency)?',
        langkah: [
          {
            narasi: '1. Cisco 2911 (10.10.10.1/30) dan MikroTik CCR (10.10.10.2/30) dihubungkan kabel Fiber Optik. Keduanya mengaktifkan OSPF Area 0.',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.clear();
              ctx.highlight('peer-node-cisco', 'var(--info)');
              ctx.highlight('peer-node-mik', 'var(--primary)');
              ctx.showLabel('peer-node-cisco', 'Cisco: OSPF Process 1 (Area 0)', { color: 'var(--info)' });
              ctx.showLabel('peer-node-mik', 'MikroTik: OSPF Instance default (Area 0)', { color: 'var(--primary)' });
            }
          },
          {
            narasi: '2. TAHAP HELLO HANDSHAKE: Cisco dan MikroTik saling mengirim paket OSPF Hello (Multicast 224.0.0.5). Parameter Hello (10s), Dead (40s), dan MTU (1500) cocok!',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.encapsulatePacket('peer-node-cisco', 'OSPF Hello', { destIP: '224.0.0.5', destMAC: '01:00:5E:00:00:05' });
              ctx.movePacket('peer-node-cisco', 'peer-node-mik', { durasi: 1300 });
            }
          },
          {
            narasi: '3. PERTUKARAN DATABASE TOPOLOGI (LSA EXCHANGE): Kedua router saling mengirim DBD (Database Description) dan bertukar Link-State Request.',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.encapsulatePacket('peer-node-mik', 'LSA Update', { destIP: '224.0.0.5', destMAC: '01:00:5E:00:00:05' });
              ctx.movePacket('peer-node-mik', 'peer-node-cisco', { durasi: 1300 });
            }
          },
          {
            narasi: '4. FULL ADJACENCY TERCAPAI: Status OSPF mencapai state "FULL". Rute LAN Cisco otomatis muncul di MikroTik, dan rute LAN MikroTik muncul di Cisco!',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.highlight('peer-node-cisco', 'var(--success)');
              ctx.highlight('peer-node-mik', 'var(--success)');
              ctx.showLabel('peer-node-cisco', 'OSPF State: FULL / BDR', { color: 'var(--success)' });
              ctx.showLabel('peer-node-mik', 'OSPF State: FULL / DR', { color: 'var(--success)' });
            }
          }
        ]
      });


      // === SIMULASI 1.3.6: FIREWALL FILTER CHAINS ===
      window.AnimEngine.register({
        id: 'sim-firewall-chains',
        judul: 'Arsitektur Firewall Filter MikroTik: Input vs Forward Chain',
        pertanyaanYangDijawab: 'Bagaimana router membedakan serangan yang menyerang dirinya vs paket yang hanya melintas?',
        langkah: [
          {
            narasi: '1. SERANGAN BRUTE FORCE (INPUT CHAIN): Bot hacker dari internet mencoba login SSH/Winbox ke port 8291 Router MikroTik.',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.clear();
              ctx.highlight('fw-node-hacker', 'var(--danger)');
              ctx.encapsulatePacket('fw-node-hacker', 'Attack Port 8291', { destIP: 'MikroTik-WAN', destMAC: 'RTR' });
              ctx.movePacket('fw-node-hacker', 'fw-node-router', { durasi: 1300 });
            }
          },
          {
            narasi: '2. ACTION DROP DI INPUT CHAIN: Firewall memeriksa: Paket menuju router sendiri (Chain: Input) dari interface WAN tanpa izin -> DROP! Paket dimusnahkan seketika.',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.dropPacket('fw-node-router', '️ DROP Input Chain: Blokir Hacker Port 8291');
              ctx.highlight('fw-node-router', 'var(--success)');
            }
          },
          {
            narasi: '3. TRAFIK KARYAWAN (FORWARD CHAIN): PC Karyawan di LAN membuka website Google. Paket ini tidak menyerang router, hanya numpang lewat melintasi router.',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.highlight('fw-node-lan', 'var(--info)');
              ctx.encapsulatePacket('fw-node-lan', 'HTTP Request', { destIP: 'Google.com', destMAC: 'RTR-LAN' });
              ctx.movePacket('fw-node-lan', 'fw-node-router', { durasi: 1200 });
            }
          },
          {
            narasi: '4. ACTION ACCEPT DI FORWARD CHAIN: Firewall memeriksa: Paket melintasi router (Chain: Forward) dari LAN yang sah -> ACCEPT! Paket diloloskan ke internet.',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.showLabel('fw-node-router', 'v ACCEPT Forward Chain: Loloskan ke Internet', { color: 'var(--success)' });
              ctx.highlight('fw-node-router', 'var(--success)');
            }
          }
        ]
      });

    }


    /* --------------------------------------------------------------------------
       3. WIDGET INTERAKTIF: SIMULATOR PEMETAAN PORT ADDRESS TRANSLATION (PAT)
       -------------------------------------------------------------------------- */
    const patPrivIpInput = document.getElementById('pat-priv-ip');
    const patPrivPortInput = document.getElementById('pat-priv-port');
    const patBtnAdd = document.getElementById('pat-btn-add');
    const patTableBody = document.getElementById('pat-table-body');

    let patEntries = [
      { id: 1, priv: '192.168.88.10:5021', pub: '203.0.113.88:10001', dst: '142.250.190.46:80 (Google)' },
      { id: 2, priv: '192.168.88.25:6112', pub: '203.0.113.88:10002', dst: '157.240.22.35:443 (Instagram)' }
    ];

    function renderPatTable() {
      if (!patTableBody) return;
      let html = '';
      patEntries.forEach(item => {
        html += `
          <tr>
            <td style="color:var(--info); font-family:var(--font-mono);">${item.priv}</td>
            <td style="color:var(--success); font-family:var(--font-mono); font-weight:bold;">-> ${item.pub}</td>
            <td style="color:var(--text-muted); font-family:var(--font-mono);">${item.dst}</td>
            <td><span class="badge badge--success" style="font-size:0.75rem;">Established</span></td>
          </tr>
        `;
      });
      patTableBody.innerHTML = html;
    }

    if (patBtnAdd) {
      patBtnAdd.addEventListener('click', function () {
        const ip = patPrivIpInput ? patPrivIpInput.value : '192.168.88.30';
        const port = patPrivPortInput ? patPrivPortInput.value : '5400';
        const newPubPort = 10000 + patEntries.length + 1;

        patEntries.push({
          id: patEntries.length + 1,
          priv: `${ip}:${port}`,
          pub: `203.0.113.88:${newPubPort}`,
          dst: '104.244.42.1:443 (Twitter/X)'
        });
        renderPatTable();
      });
    }

    renderPatTable();

  });


  /* --------------------------------------------------------------------------
     HELPER HUD MODUL 1.3
     -------------------------------------------------------------------------- */

  function _updateWinboxNeighborsTable(ctx, hasFound) {
    const tableEl = document.getElementById('winbox-neighbors-body');
    if (!tableEl) return;

    if (!hasFound) {
      tableEl.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-dim); padding:10px;">Scanning Layer 2 MNDP Neighbors...</td></tr>`;
      return;
    }

    tableEl.innerHTML = `
      <tr style="background: rgba(16, 185, 129, 0.15); font-weight: bold; cursor: pointer;">
        <td style="color:var(--success); font-family:var(--font-mono);">D4:01:C3:88:AA:01</td>
        <td style="color:var(--text-muted); font-family:var(--font-mono);">0.0.0.0</td>
        <td style="color:var(--primary);">MikroTik-Lab</td>
        <td>RB750r2</td>
        <td><span class="badge badge--success">v7.14 (MNDP)</span></td>
      </tr>
    `;
  }

  function _updateDoraHUD(ctx, data) {
    const hud = document.getElementById('dora-hud-container');
    if (!hud) return;

    hud.innerHTML = `
      <div style="background:var(--bg-elevated); border:1.5px solid var(--border); border-radius:var(--radius-md); padding:var(--space-sm); font-size:0.85rem; box-shadow:var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:6px;">
          <strong style="color:var(--primary); font-size:0.92rem;"> Tahap DORA: ${data.step}</strong>
          <span class="badge badge--info" style="font-family:var(--font-mono); font-size:0.75rem;">UDP 67 -> 68</span>
        </div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:var(--space-sm); margin-bottom:6px;">
          <div style="background:rgba(99, 102, 241, 0.08); padding:4px 8px; border-radius:var(--radius-sm);">
            <span style="font-size:0.75rem; color:var(--text-muted);">Source Socket:</span>
            <div style="font-family:var(--font-mono); color:var(--info); font-weight:bold;">${data.src}</div>
          </div>
          <div style="background:rgba(16, 185, 129, 0.08); padding:4px 8px; border-radius:var(--radius-sm);">
            <span style="font-size:0.75rem; color:var(--text-muted);">Dest Socket:</span>
            <div style="font-family:var(--font-mono); color:var(--success); font-weight:bold;">${data.dst}</div>
          </div>
        </div>
        <div style="color:var(--text); font-size:0.85rem; font-style:italic; background:var(--bg-base); padding:6px 10px; border-radius:var(--radius-sm); border-left:3px solid var(--primary);">
          ${data.desc}
        </div>
      </div>
    `;
  }

  function _updateNatTableHUD(ctx, rows) {
    const tableEl = document.getElementById('nat-hud-table');
    if (!tableEl) return;

    if (!rows || rows.length === 0) {
      tableEl.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-dim); padding:10px;">(Tabel NAT Kosong — Belum ada koneksi keluar)</td></tr>`;
      return;
    }

    let html = '';
    rows.forEach(r => {
      html += `
        <tr style="background: rgba(245, 158, 11, 0.15); font-weight: bold;">
          <td style="color:var(--text-muted); font-family:var(--font-mono);">${r.proto}</td>
          <td style="color:var(--info); font-family:var(--font-mono);">${r.privIp}</td>
          <td style="color:var(--warning); font-family:var(--font-mono);">${r.pubIp}</td>
          <td style="color:var(--success); font-family:var(--font-mono);">${r.dstIp}</td>
        </tr>
      `;
    });
    tableEl.innerHTML = html;
  }

})();
