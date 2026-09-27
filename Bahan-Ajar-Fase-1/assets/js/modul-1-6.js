/**
 * ==========================================================================
 * MODUL-1-6.JS — LOGIKA SIMULASI & DATA INTERAKTIF MODUL 1.6
 * Modul 1.6: Bagaimana Internet Bekerja (Kabel Laut, DNS, CDN, Cloud, End-to-End)
 * Protokol: file:// aman (Vanilla JS, Zero-Dependency, Web Animations API)
 * ==========================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* --------------------------------------------------------------------------
       1. RENDER SVG PERANGKAT KE SEMUA STAGE SIMULASI MODUL 1.6
       -------------------------------------------------------------------------- */
    function renderDeviceNodes() {
      if (!window.Devices) return;

      // Stage 1: Internet Backbone & Submarine Cable
      const bbUser = document.getElementById('bb-node-user');
      const bbIsp = document.getElementById('bb-node-isp');
      const bbIxp = document.getElementById('bb-node-ixp');
      const bbGlb = document.getElementById('bb-node-global');
      if (bbUser) bbUser.innerHTML = window.Devices.laptop({ name: 'Laptop (Bandung)', ip: '192.168.1.50', mac: 'LAN Rumah' });
      if (bbIsp) bbIsp.innerHTML = window.Devices.mikrotik({ name: 'ISP Tier-3 (Jabar)', ip: 'BRAS Gateway' });
      if (bbIxp) bbIxp.innerHTML = window.Devices.switch({ name: 'OpenIXP (Jakarta)', ip: 'Gedung Cyber 1' });
      if (bbGlb) bbGlb.innerHTML = window.Devices.datacenter ? window.Devices.datacenter({ name: 'Google DC (Singapore)', region: 'Kabel Laut SJC', ip: '142.250.190.46' }) : window.Devices.server({ name: 'Google DC SG', ip: '142.250.190.46' });

      // Stage 2: Recursive DNS Lookup
      const dnsBrw = document.getElementById('dns-node-browser');
      const dnsRes = document.getElementById('dns-node-resolver');
      const dnsRot = document.getElementById('dns-node-root');
      const dnsTld = document.getElementById('dns-node-tld');
      const dnsAut = document.getElementById('dns-node-auth');
      if (dnsBrw) dnsBrw.innerHTML = window.Devices.laptop({ name: 'Browser Arya', ip: 'Query: youtube.com' });
      if (dnsRes) dnsRes.innerHTML = window.Devices.server({ name: 'DNS Resolver (8.8.8.8)', ip: 'Recursive Server' });
      if (dnsRot) dnsRot.innerHTML = window.Devices.server({ name: 'Root Server (.)', ip: 'a.root-servers.net' });
      if (dnsTld) dnsTld.innerHTML = window.Devices.server({ name: 'TLD Server (.COM)', ip: 'Verisign Registry' });
      if (dnsAut) dnsAut.innerHTML = window.Devices.server({ name: 'Authoritative DNS', ip: 'ns1.google.com' });

      // Stage 3: CDN Caching (YouTube Stream)
      const cdnUsr = document.getElementById('cdn-node-user');
      const cdnEdg = document.getElementById('cdn-node-edge');
      const cdnOrg = document.getElementById('cdn-node-origin');
      if (cdnUsr) cdnUsr.innerHTML = window.Devices.hp({ name: 'HP User (Jakarta)', ip: '192.168.1.25', mac: 'Streaming 4K' });
      if (cdnEdg) cdnEdg.innerHTML = window.Devices.cdn ? window.Devices.cdn({ name: 'Google Edge (Jakarta)', ip: 'Cyber Building PoP' }) : window.Devices.server({ name: 'Google Edge JKT', ip: 'Cache HIT' });
      if (cdnOrg) cdnOrg.innerHTML = window.Devices.datacenter ? window.Devices.datacenter({ name: 'Origin DC (California)', region: 'Silicon Valley (14.500 km)', ip: 'Origin Server' }) : window.Devices.server({ name: 'Origin California' });

      // Stage 4: Cloud Storage (Google Drive Erasure Coding)
      const csUsr = document.getElementById('cs-node-user');
      const csRk1 = document.getElementById('cs-rack-1');
      const csRk2 = document.getElementById('cs-rack-2');
      const csRk3 = document.getElementById('cs-rack-3');
      if (csUsr) csUsr.innerHTML = window.Devices.laptop({ name: 'Laptop Arya', ip: 'Upload: Skripsi.docx' });
      if (csRk1) csRk1.innerHTML = window.Devices.server({ name: 'Data Center Node 1', ip: 'Chunk 1 (Data)' });
      if (csRk2) csRk2.innerHTML = window.Devices.server({ name: 'Data Center Node 2', ip: 'Chunk 2 (Data)' });
      if (csRk3) csRk3.innerHTML = window.Devices.server({ name: 'Data Center Node 3', ip: 'Chunk 3 (Parity EC)' });

      // Stage 5: End-to-End Packet Journey
      const e2ePhn = document.getElementById('e2e-node-phone');
      const e2eAp = document.getElementById('e2e-node-ap');
      const e2eSw = document.getElementById('e2e-node-switch');
      const e2eRtr = document.getElementById('e2e-node-router');
      const e2eIsp = document.getElementById('e2e-node-isp');
      const e2eSrv = document.getElementById('e2e-node-server');
      if (e2ePhn) e2ePhn.innerHTML = window.Devices.hp({ name: 'HP Arya', ip: '192.168.1.50', mac: 'WiFi 5GHz' });
      if (e2eAp) e2eAp.innerHTML = window.Devices.ap({ name: 'Access Point', ip: 'CH 36 (5GHz)', ssid: 'SMK-WiFi' });
      if (e2eSw) e2eSw.innerHTML = window.Devices.switch({ name: 'Switch VLAN 10', ip: '802.1Q Trunk' });
      if (e2eRtr) e2eRtr.innerHTML = window.Devices.router({ name: 'Gateway (NAT)', ip: 'WAN: 180.252.10.88' });
      if (e2eIsp) e2eIsp.innerHTML = window.Devices.cloud ? window.Devices.cloud({ name: 'ISP & OpenIXP', ip: 'Fiber Core JKT' }) : window.Devices.server({ name: 'ISP Core' });
      if (e2eSrv) e2eSrv.innerHTML = window.Devices.cdn ? window.Devices.cdn({ name: 'YouTube CDN Edge', ip: '142.250.190.46' }) : window.Devices.server({ name: 'YouTube Edge' });
    }

    renderDeviceNodes();


    /* --------------------------------------------------------------------------
       2. REGISTRASI SEMUA SIMULASI MODUL 1.6 KE ANIM-ENGINE
       -------------------------------------------------------------------------- */
    if (window.AnimEngine) {

      // === SIMULASI 1.6.1: PERJALANAN KABEL BAWAH LAUT & IXP ===
      window.AnimEngine.register({
        id: 'sim-internet-backbone',
        judul: 'Simulasi Perjalanan Paket Fisik: Bandung → OpenIXP Jakarta → Kabel Laut Singapura',
        pertanyaanYangDijawab: 'Bagaimana jalur fisik data merambat dari rumah melintasi serat optik darat dan dasar samudera?',
        langkah: [
          {
            narasi: '1. Inisiasi LAN Bandung: Laptop Arya mengirim paket data menuju internet. Paket keluar melewati kabel serat optik FTTH rumah menuju BRAS ISP Tier-3 di Bandung.',
            durasi: 2500,
            aksi: function (ctx) {
              ctx.clear();
              ctx.encapsulatePacket('bb-node-user', 'HTTP Request', {
                srcIP: '192.168.1.50',
                destIP: '142.250.190.46',
                label: 'Fiber Optic FTTH'
              });
              ctx.movePacket('bb-node-user', 'bb-node-isp');
              ctx.highlight('bb-node-user', 'var(--info)');
            }
          },
          {
            narasi: '2. Metro Ethernet ke Jakarta: Dari Bandung, paket dialirkan melalui kabel fiber darat sepanjang jalan tol Purbaleunyi menuju sentral OpenIXP di Gedung Cyber 1 Jakarta (Waktu tempuh: 8 ms).',
            durasi: 2700,
            aksi: function (ctx) {
              ctx.movePacket('bb-node-isp', 'bb-node-ixp', { duration: 1400 });
              ctx.highlight('bb-node-isp', 'var(--info)');
            }
          },
          {
            narasi: '3. Pertukaran Peering di OpenIXP: Switch IXP Jakarta membaca rute BGP dan membelokkan paket masuk ke jaringan internasional kabel bawah laut (Subsea Cable).',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.inspectSwitch('bb-node-ixp', {
                title: ' OPENIXP PEERING SWITCH',
                port: 'BGP AS15169 (Google)',
                vlan: 'Subsea Link: Indigo-West / SJC',
                status: 'Route: Jakarta -> Batam -> Singapore'
              });
              ctx.highlight('bb-node-ixp', 'var(--success)');
            }
          },
          {
            narasi: '4. Menembus Dasar Samudera: Pulsa laser cahaya inframerah meluncur di dalam inti kaca kabel bawah laut sedalam 3.000 meter melintasi Laut Jawa dan Selat Malaka menuju Singapura!',
            durasi: 2900,
            aksi: function (ctx) {
              ctx.movePacket('bb-node-ixp', 'bb-node-global', { duration: 1800 });
              ctx.showLabel('bb-node-global', ' Melintasi Kabel Bawah Laut!', { color: 'var(--warning)' });
            }
          },
          {
            narasi: '5. Tiba di Data Center Google Singapura: Paket diterima dalam waktu 24 ms! Server memproses dan bersiap mengirimkan balasan data kembali ke Bandung.',
            durasi: 2500,
            aksi: function (ctx) {
              ctx.decapsulatePacket('bb-node-global', 'Request Diterima Google SG');
              ctx.arrive('bb-node-global', { label: 'v RTT Total: 24 ms (7 Hops)' });
            }
          }
        ]
      });


      // === SIMULASI 1.6.2: ALUR RECURSIVE DNS LOOKUP ===
      window.AnimEngine.register({
        id: 'sim-dns-lookup',
        judul: 'Simulasi Pencarian DNS Hirarkis: Browser → Resolver → Root → TLD → Authoritative',
        pertanyaanYangDijawab: 'Bagaimana browser menemukan alamat IP 142.250.190.46 saat mengetik youtube.com?',
        langkah: [
          {
            narasi: '1. Browser Request: Pengguna mengetik "youtube.com". Browser meminta bantuan Recursive DNS Resolver (8.8.8.8): "Tolong carikan IP youtube.com!"',
            durasi: 2500,
            aksi: function (ctx) {
              ctx.clear();
              ctx.encapsulatePacket('dns-node-browser', 'Q: youtube.com', {
                label: 'DNS Query (UDP 53)',
                destIP: '8.8.8.8'
              });
              ctx.movePacket('dns-node-browser', 'dns-node-resolver');
              ctx.highlight('dns-node-browser', 'var(--info)');
            }
          },
          {
            narasi: '2. Tanya ke Root Server (.): Resolver bertanya ke Root Server puncak dunia. Root menjawab: "Saya tidak tahu IP youtube.com, tapi ini alamat server .COM!"',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.movePacket('dns-node-resolver', 'dns-node-root');
              ctx.inspectSwitch('dns-node-root', {
                title: ' ROOT SERVER (.)',
                port: 'Query: youtube.com',
                vlan: 'Referral: TLD .COM',
                status: 'Go ask: a.gtld-servers.net'
              });
              ctx.movePacket('dns-node-root', 'dns-node-resolver');
            }
          },
          {
            narasi: '3. Tanya ke TLD Server (.COM): Resolver bertanya ke TLD .COM. TLD menjawab: "Ini alamat Authoritative Name Server resmi Google (ns1.google.com)!"',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.movePacket('dns-node-resolver', 'dns-node-tld');
              ctx.inspectSwitch('dns-node-tld', {
                title: '️ TLD SERVER (.COM)',
                port: 'Query: youtube.com',
                vlan: 'Referral: NS ns1.google.com',
                status: 'Owner: Google LLC'
              });
              ctx.movePacket('dns-node-tld', 'dns-node-resolver');
            }
          },
          {
            narasi: '4. Tanya ke Authoritative Server: Resolver bertanya ke ns1.google.com. Authoritative menjawab pasti: "IP A Record youtube.com adalah 142.250.190.46, TTL 300 detik!"',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.movePacket('dns-node-resolver', 'dns-node-auth');
              ctx.inspectSwitch('dns-node-auth', {
                title: ' AUTHORITATIVE SERVER',
                port: 'Record: A (IPv4)',
                vlan: 'IP: 142.250.190.46',
                status: 'TTL: 300 seconds (Official Answer)'
              });
              ctx.movePacket('dns-node-auth', 'dns-node-resolver');
            }
          },
          {
            narasi: '5. Jawaban Disimpan di Cache: Resolver mengembalikan IP 142.250.190.46 ke browser dan menyimpannya di cache. Browser siap membuka koneksi video!',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.movePacket('dns-node-resolver', 'dns-node-browser');
              ctx.decapsulatePacket('dns-node-browser', 'IP: 142.250.190.46 Diterima!');
              ctx.arrive('dns-node-browser', { label: 'v Resolusi DNS Selesai (15 ms)' });
            }
          }
        ]
      });


      // === SIMULASI 1.6.3: CDN EDGE CACHING YOUTUBE ===
      window.AnimEngine.register({
        id: 'sim-cdn-caching',
        judul: 'Simulasi CDN Caching: Edge Server Jakarta (5 ms) vs Origin Server California (250 ms)',
        pertanyaanYangDijawab: 'Mengapa video YouTube berputar instan tanpa harus mengambil data dari California?',
        langkah: [
          {
            narasi: '1. Permintaan Video: HP pengguna di Jakarta meminta potongan video YouTube viral (Chunk #1 MP4 1080p).',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.clear();
              ctx.createRawPayload('cdn-node-user', 'GET /videoplayback?id=xyz');
              ctx.highlight('cdn-node-user', 'var(--info)');
            }
          },
          {
            narasi: '2. Anycast BGP Routing ke Node Terdekat: Rute jaringan otomatis mengarahkan paket ke Edge Server Google Global Cache (GGC) terdekat di Jakarta (Bukan ke California!).',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.encapsulatePacket('cdn-node-user', 'Video Request', {
                destIP: 'Google Edge JKT',
                label: 'HTTP/3 QUIC'
              });
              ctx.movePacket('cdn-node-user', 'cdn-node-edge');
            }
          },
          {
            narasi: '3. Pengecekan Cache (Cache HIT): Server Edge Jakarta memeriksa RAM SSD-nya. Video sudah tersimpan! Terjadi "Cache HIT (94%)". Server TIDAK PERLU menghubungi California!',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.inspectSwitch('cdn-node-edge', {
                title: ' GOOGLE EDGE CACHE HIT',
                port: 'PoP: Jakarta (Cyber 1)',
                vlan: 'Status: X-Cache HIT',
                status: 'Serving 4K Stream from Local SSD'
              });
              ctx.highlight('cdn-node-edge', 'var(--success)');
            }
          },
          {
            narasi: '4. Streaming Instan: Edge Server Jakarta langsung mengalirkan potongan video kembali ke HP dalam waktu hanya 5 milidetik!',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.encapsulatePacket('cdn-node-edge', 'DASH 1080p Video Chunk', {
                destIP: 'HP User',
                label: '2 MB Chunk'
              });
              ctx.movePacket('cdn-node-edge', 'cdn-node-user');
            }
          },
          {
            narasi: '5. Hasil: Video langsung berputar seketika (*zero buffering*), menghemat bandwidth kabel bawah laut internasional hingga 95%!',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.decapsulatePacket('cdn-node-user', '▶ Video Berputar Mulus (5 ms)!');
              ctx.arrive('cdn-node-user', { label: 'v CDN Edge Berhasil Sempurna' });
            }
          }
        ]
      });


      // === SIMULASI 1.6.4: CLOUD STORAGE ERASURE CODING ===
      window.AnimEngine.register({
        id: 'sim-cloud-storage',
        judul: 'Simulasi Google Drive: Distributed Chunking & Ketahanan Erasure Coding',
        pertanyaanYangDijawab: 'Bagaimana Google Drive menjamin file tidak hilang meski ada harddisk/server yang terbakar?',
        langkah: [
          {
            narasi: '1. Inisiasi Upload: Laptop Arya mengunggah file dokumen penting "Skripsi.docx" (100 MB) ke Google Drive.',
            durasi: 2500,
            aksi: function (ctx) {
              ctx.clear();
              ctx.createRawPayload('cs-node-user', 'Upload Skripsi.docx (100MB)');
              ctx.highlight('cs-node-user', 'var(--info)');
            }
          },
          {
            narasi: '2. Chunking & Erasure Coding: Google Cloud memecah file menjadi 2 Chunks Data + 1 Chunk Parity (Formula Reed-Solomon), lalu menyebarkannya ke 3 server berbeda.',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.showLabel('cs-rack-1', 'Chunk 1 (Data A)', { color: 'var(--success)' });
              ctx.showLabel('cs-rack-2', 'Chunk 2 (Data B)', { color: 'var(--success)' });
              ctx.showLabel('cs-rack-3', 'Chunk 3 (Parity EC)', { color: 'var(--info)' });
              ctx.highlight('cs-rack-1', 'var(--success)');
              ctx.highlight('cs-rack-2', 'var(--success)');
              ctx.highlight('cs-rack-3', 'var(--success)');
            }
          },
          {
            narasi: '3. Simulasi Bencana: Tiba-tiba harddisk di Data Center Node 2 RUSAK TOTAL / TERBAKAR!',
            durasi: 2700,
            aksi: function (ctx) {
              ctx.highlight('cs-rack-2', 'var(--danger)');
              ctx.showLabel('cs-rack-2', ' HARDDISK CRASH / RUSAK!', { color: 'var(--danger)' });
              const durText = document.getElementById('cs-durability-text');
              if (durText) { durText.textContent = 'Node 2 Down -> Reconstructing...'; durText.setAttribute('fill', 'var(--warning)'); }
            }
          },
          {
            narasi: '4. Rekonstruksi Otomatis: Sistem membaca Chunk 1 dan Chunk 3 (Parity), lalu menghitung ulang pecahan Chunk 2 yang hilang secara matematis. File Skripsi KEMBALI UTUH 100%!',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.showLabel('cs-rack-2', ' Data Direkonstruksi Otomatis!', { color: 'var(--success)' });
              ctx.highlight('cs-rack-2', 'var(--success)');
              const durText = document.getElementById('cs-durability-text');
              if (durText) { durText.textContent = 'Durability: 99.999999999% (OK)'; durText.setAttribute('fill', 'var(--success)'); }
            }
          },
          {
            narasi: '5. Kesimpulan: Cloud Storage tidak bergantung pada 1 server. Berkat Erasure Coding & Replikasi Multi-Region, data aman dari segala jenis kerusakan fisik.',
            durasi: 2500,
            aksi: function (ctx) {
              ctx.arrive('cs-node-user', { label: 'v File Skripsi 100% Aman Abadi' });
            }
          }
        ]
      });


      // === SIMULASI 1.6.5: ALUR END-TO-END PERJALANAN PAKET ===
      window.AnimEngine.register({
        id: 'sim-end-to-end-flow',
        judul: 'Simulasi Sintesis Penuh: Dari Klik Layar HP Hingga Video YouTube Tampil',
        pertanyaanYangDijawab: 'Bagaimana seluruh komponen jaringan (WiFi, VLAN, NAT, BGP, CDN) bersinergi dalam 150 milidetik?',
        langkah: [
          {
            narasi: '1. Klik Layar HP & WiFi: HP membungkus HTTP/3 request ke frame WiFi 802.11 dan memancarkannya ke Access Point.',
            durasi: 2500,
            aksi: function (ctx) {
              ctx.clear();
              ctx.encapsulatePacket('e2e-node-phone', 'HTTP/3 Video Req', {
                srcIP: '192.168.1.50',
                destIP: '142.250.190.46',
                label: 'WiFi 5GHz Frame'
              });
              ctx.movePacket('e2e-node-phone', 'e2e-node-ap');
              ctx.highlight('e2e-node-phone', 'var(--info)');
            }
          },
          {
            narasi: '2. Switching VLAN & Trunking: Access Point meneruskan frame ke Switch, disisipkan tag 802.1Q VLAN 10 menuju Router Gateway.',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.movePacket('e2e-node-ap', 'e2e-node-switch');
              ctx.highlight('e2e-node-switch', 'var(--info)');
            }
          },
          {
            narasi: '3. NAT Masquerade & MAC Rewrite: Router Gateway mengubah IP Private HP (192.168.1.50) menjadi IP Publik WAN (180.252.10.88) dan meneruskannya ke fiber optik ISP.',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.movePacket('e2e-node-switch', 'e2e-node-router');
              ctx.inspectSwitch('e2e-node-router', {
                title: ' ROUTER GATEWAY NAT',
                port: 'In: 192.168.1.50:5241',
                vlan: 'NAT: -> 180.252.10.88:49152',
                status: 'MAC Rewritten for ISP WAN Link'
              });
              ctx.highlight('e2e-node-router', 'var(--success)');
            }
          },
          {
            narasi: '4. Transit Melalui ISP & OpenIXP Jakarta: Paket meluncur menembus kabel fiber optik darat menuju switch OpenIXP.',
            durasi: 2700,
            aksi: function (ctx) {
              ctx.movePacket('e2e-node-router', 'e2e-node-isp', { duration: 1200 });
              ctx.highlight('e2e-node-isp', 'var(--warning)');
            }
          },
          {
            narasi: '5. Server YouTube Edge Memproses: Server CDN membaca request, mengambil potongan video 1080p dari SSD, dan mengirim stream balik ke HP.',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.movePacket('e2e-node-isp', 'e2e-node-server');
              ctx.inspectSwitch('e2e-node-server', {
                title: ' YOUTUBE CDN EDGE SERVER',
                port: 'IP: 142.250.190.46',
                vlan: 'Stream: DASH 1080p Chunk #1',
                status: 'Protocol: QUIC / TLS 1.3'
              });
              ctx.highlight('e2e-node-server', 'var(--success)');
            }
          },
          {
            narasi: '6. Layar Menyala & Video Berputar: Paket stream tiba kembali di HP, didekapsulasi, dan dirender oleh GPU ke layar. Total waktu: 35 milidetik!',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.movePacket('e2e-node-server', 'e2e-node-phone', { duration: 1600 });
              ctx.decapsulatePacket('e2e-node-phone', '▶ Video 1080p Berputar!');
              ctx.arrive('e2e-node-phone', { label: ' SELAMAT! FASE 1 SELESAI 100%' });
            }
          }
        ]
      });

    }

  });
})();
