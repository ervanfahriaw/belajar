/**
 * ==========================================================================
 * MODUL-1-5.JS — LOGIKA SIMULASI & DATA INTERAKTIF MODUL 1.5
 * Modul 1.5: Pengantar Sistem Antrian & Telco Dasar (QoS, VoIP, SIP/RTP, Erlang B)
 * Protokol: file:// aman (Vanilla JS, Zero-Dependency, Web Animations API)
 * ==========================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* --------------------------------------------------------------------------
       1. RENDER SVG PERANGKAT KE SEMUA STAGE SIMULASI MODUL 1.5
       -------------------------------------------------------------------------- */
    function renderDeviceNodes() {
      if (!window.Devices) return;

      // Stage 1: QoS Metrics (VoIP vs Torrent)
      const qosVoip = document.getElementById('qos-node-voip');
      const qosTor = document.getElementById('qos-node-torrent');
      const qosRtr = document.getElementById('qos-node-router');
      const qosDst = document.getElementById('qos-node-dest');
      if (qosVoip) qosVoip.innerHTML = window.Devices.ipphone ? window.Devices.ipphone({ name: 'IP Phone (VoIP)', ip: '192.168.60.10', ext: 'Ext 101' }) : window.Devices.hp({ name: 'IP Phone', ip: '192.168.60.10' });
      if (qosTor) qosTor.innerHTML = window.Devices.laptop({ name: 'PC Torrent (Bulk)', ip: '192.168.20.55', mac: 'Downloader' });
      if (qosRtr) qosRtr.innerHTML = window.Devices.mikrotik({ name: 'Router (FIFO Queue)', ip: '192.168.1.1' });
      if (qosDst) qosDst.innerHTML = window.Devices.server({ name: 'Internet Server', ip: 'Cloud WAN' });

      // Stage 2: Priority Queuing
      const qpPhone = document.getElementById('qp-node-phone');
      const qpPc = document.getElementById('qp-node-pc');
      const qpRtr = document.getElementById('qp-node-router');
      const qpDst = document.getElementById('qp-node-dest');
      if (qpPhone) qpPhone.innerHTML = window.Devices.ipphone ? window.Devices.ipphone({ name: 'IP Phone (Suara)', ip: '192.168.60.10', ext: 'Prio 1 (High)' }) : window.Devices.hp({ name: 'IP Phone' });
      if (qpPc) qpPc.innerHTML = window.Devices.laptop({ name: 'PC Lab (Download)', ip: '192.168.20.80', mac: 'Prio 8 (Low)' });
      if (qpRtr) qpRtr.innerHTML = window.Devices.mikrotik({ name: 'Router Priority Queue', ip: 'Dual Buffer PQ' });
      if (qpDst) qpDst.innerHTML = window.Devices.server({ name: 'Gateway WAN', ip: '100 Mbps Link' });

      // Stage 3: VoIP Call Flow (SIP & RTP)
      const voipP1 = document.getElementById('voip-node-phone1');
      const voipPbx = document.getElementById('voip-node-pbx');
      const voipP2 = document.getElementById('voip-node-phone2');
      if (voipP1) voipP1.innerHTML = window.Devices.ipphone ? window.Devices.ipphone({ name: 'Kepala Sekolah', ip: '192.168.60.10', ext: 'Ext 101' }) : window.Devices.hp({ name: 'Ext 101' });
      if (voipPbx) voipPbx.innerHTML = window.Devices.pbx ? window.Devices.pbx({ name: 'Asterisk PBX', ip: '192.168.60.200' }) : window.Devices.server({ name: 'Asterisk PBX', ip: '192.168.60.200' });
      if (voipP2) voipP2.innerHTML = window.Devices.ipphone ? window.Devices.ipphone({ name: 'Ruang Guru', ip: '192.168.60.20', ext: 'Ext 102' }) : window.Devices.hp({ name: 'Ext 102' });

      // Stage 4: Erlang B Blocking
      const erlCallers = document.getElementById('erlang-node-callers');
      const erlOps = document.getElementById('erlang-node-operators');
      if (erlCallers) erlCallers.innerHTML = window.Devices.hp({ name: 'Penelepon Masuk', ip: 'Traffic λ = 60/jam' });
      if (erlOps) erlOps.innerHTML = window.Devices.server({ name: 'Agent Operator', ip: '3 Saluran Aktif' });

      // Stage 5: Multi-Service QoS
      const msPhone = document.getElementById('ms-node-phone');
      const msPc = document.getElementById('ms-node-pc');
      const msSw = document.getElementById('ms-node-switch');
      const msDst = document.getElementById('ms-node-dest');
      if (msPhone) msPhone.innerHTML = window.Devices.ipphone ? window.Devices.ipphone({ name: 'IP Phone Pos Satpam', ip: 'VLAN 60', ext: 'DSCP EF (46)' }) : window.Devices.hp({ name: 'IP Phone' });
      if (msPc) msPc.innerHTML = window.Devices.laptop({ name: '100 PC Lab Siswa', ip: 'VLAN 20', mac: 'DSCP 0 (Bulk)' });
      if (msSw) msSw.innerHTML = window.Devices.switch({ name: 'Switch Voice VLAN', ip: 'MLS QoS Trust CoS' });
      if (msDst) msDst.innerHTML = window.Devices.server({ name: 'Core Server e-Rapor', ip: '10.0.0.10' });
    }

    renderDeviceNodes();


    /* --------------------------------------------------------------------------
       2. REGISTRASI SEMUA SIMULASI MODUL 1.5 KE ANIM-ENGINE
       -------------------------------------------------------------------------- */
    if (window.AnimEngine) {

      // === SIMULASI 1.5.1: METRIK QOS & BOTTLENECK BUFFER ===
      window.AnimEngine.register({
        id: 'sim-qos-metrics',
        judul: 'Simulasi Metrik QoS: Throughput, Latency, Jitter & Buffer Saturation',
        pertanyaanYangDijawab: 'Kenapa paket suara real-time hancur jika terjebak di antrian FIFO bersama paket download file?',
        langkah: [
          {
            narasi: '1. Inisiasi: PC Torrent mengirim gelombang paket file raksasa (1500 Byte MTU) yang membanjiri antrian router.',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.clear();
              ctx.createRawPayload('qos-node-torrent', 'Download File 50GB (1500B)');
              ctx.highlight('qos-node-torrent', 'var(--warning)');
              const qStatus = document.getElementById('qos-queue-status');
              if (qStatus) { qStatus.textContent = 'Antrian: TERISI 10 Paket File (Buffer Penuh!)'; qStatus.setAttribute('fill', 'var(--danger)'); }
            }
          },
          {
            narasi: '2. Paket Suara Masuk: IP Phone mengirim paket suara berukuran kecil (64 Byte), tetapi harus antri di urutan ke-11 di belakang file torrent!',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.encapsulatePacket('qos-node-voip', 'VoIP (64B)', {
                srcIP: '192.168.60.10',
                destIP: 'Cloud Server',
                label: 'RTP Audio G.711'
              });
              ctx.movePacket('qos-node-voip', 'qos-node-router');
              ctx.showLabel('qos-node-router', '️ Bufferbloat: Delay 420 ms!', { color: 'var(--danger)' });
            }
          },
          {
            narasi: '3. Fluktuasi Jitter Ekstrem: Paket suara tertahan secara acak di buffer. Selisih waktu kedatangan melonjak menjadi Jitter = 85 ms (Kategori Buruk TIPHON).',
            durasi: 2700,
            aksi: function (ctx) {
              ctx.inspectSwitch('qos-node-router', {
                title: ' BUFFER SATURATION ALERT',
                port: 'Inbound Queue #11',
                vlan: 'Delay: 420 ms (Target < 150ms)',
                status: 'JITTER: 85 ms | LOSS: 6.5%'
              });
              ctx.highlight('qos-node-router', 'var(--danger)');
            }
          },
          {
            narasi: '4. Dampak ke Pengguna: Suara panggilan tiba di tujuan terpotong-potong, terdengar robotik, dan terjadi jeda canggung 1 detik dalam percakapan.',
            durasi: 2700,
            aksi: function (ctx) {
              ctx.movePacket('qos-node-router', 'qos-node-dest');
              ctx.decapsulatePacket('qos-node-dest', ' Suara Rusak / Robotik');
              ctx.showLabel('qos-node-dest', ' Kualitas: Buruk (TIPHON)', { color: 'var(--danger)' });
            }
          },
          {
            narasi: '5. Kesimpulan: Menambah bandwidth tidak menyelesaikan masalah antrian. Diperlukan manajemen QoS untuk mendahulukan paket suara di antrian prioritas!',
            durasi: 2500,
            aksi: function (ctx) {
              ctx.arrive('qos-node-dest', { label: 'Solusi: Wajib QoS Priority Queuing' });
            }
          }
        ]
      });


      // === SIMULASI 1.5.2: PRIORITY QUEUING (PQ) ===
      window.AnimEngine.register({
        id: 'sim-queuing-prio',
        judul: 'Simulasi Priority Queuing (PQ): Jalur Khusus Ambulans untuk Paket Suara',
        pertanyaanYangDijawab: 'Bagaimana router mendahulukan paket suara tanpa mematikan download file pengguna lain?',
        langkah: [
          {
            narasi: '1. Skenario Dual Queue: Router membagi buffer memorinya menjadi dua: High Priority Queue (VoIP) dan Low Priority Queue (Bulk Data).',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.clear();
              ctx.showLabel('qp-node-phone', 'Trafik Suara: Port 5060/RTP', { color: 'var(--success)' });
              ctx.showLabel('qp-node-pc', 'Trafik Download: Port 80/443', { color: 'var(--warning)' });
            }
          },
          {
            narasi: '2. Pengiriman Bersamaan: PC Lab mengirim file unduhan ke Low Queue, sementara IP Phone mengirim paket suara ke High Queue.',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.encapsulatePacket('qp-node-phone', 'Suara (Prio 1)', {
                label: 'High Queue (Voice)',
                destIP: 'Gateway'
              });
              ctx.movePacket('qp-node-phone', 'qp-node-router');
              ctx.highlight('qp-node-router', 'var(--success)');
            }
          },
          {
            narasi: '3. Eksekusi Penjadwalan Router: Scheduler memeriksa High Queue terlebih dahulu. Begitu melihat ada paket suara, router LANGSUNG meneruskannya seketika!',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.inspectSwitch('qp-node-router', {
                title: ' PQ SCHEDULER ACTIVE',
                port: 'High Queue: 1 Pkt Detected',
                vlan: 'Action: Transmit VOICE IMMEDIATELY',
                status: 'Low Queue (Bulk Data) di-HOLD sejenak'
              });
              ctx.movePacket('qp-node-router', 'qp-node-dest', { duration: 1200 });
            }
          },
          {
            narasi: '4. Hasil Pengukuran: Paket suara lolos dalam Delay 14 ms (Sangat Bagus!), Jitter 2 ms, dan 0% Packet Loss. Suara terdengar jernih tanpa putus.',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.decapsulatePacket('qp-node-dest', ' Suara Bening Jernih (14 ms)');
              ctx.showLabel('qp-node-dest', 'v Kualitas TIPHON: Sempurna', { color: 'var(--success)' });
            }
          },
          {
            narasi: '5. Transmisi Data Dilanjutkan: Setelah High Queue kosong, router kembali meneruskan antrian download PC Lab. Keduanya berjalan harmonis!',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.arrive('qp-node-dest', { label: 'v Dual-Queue Harmoni Selesai' });
            }
          }
        ]
      });


      // === SIMULASI 1.5.3: ALUR PANGGILAN VOIP (SIP & RTP) ===
      window.AnimEngine.register({
        id: 'sim-voip-call',
        judul: 'Simulasi Panggilan VoIP: Signaling SIP vs Direct RTP Audio Stream',
        pertanyaanYangDijawab: 'Bagaimana peran IP PBX saat telepon berdering vs saat dua orang sedang mengobrol suara?',
        langkah: [
          {
            narasi: '1. SIP INVITE: Kepala Sekolah (Ext 101) mengangkat telepon dan menekan 102. Telepon mengirim pesan "SIP INVITE" ke IP PBX Server di port UDP 5060.',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.clear();
              ctx.encapsulatePacket('voip-node-phone1', 'SIP INVITE 102', {
                srcIP: '192.168.60.10',
                destIP: '192.168.60.200',
                label: 'SIP Port 5060'
              });
              ctx.movePacket('voip-node-phone1', 'voip-node-pbx');
              ctx.highlight('voip-node-phone1', 'var(--info)');
            }
          },
          {
            narasi: '2. 180 Ringing: Asterisk PBX memeriksa database ekstensi, menemukan Ruang Guru (Ext 102), dan membunyikan dering telepon. Pesan "180 Ringing" dikirim balik ke Kepsek.',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.inspectSwitch('voip-node-pbx', {
                title: ' ASTERISK DIALPLAN MATCH',
                port: 'Ext 101 -> Ext 102',
                vlan: 'State: Ringing (180)',
                status: 'Routing ke IP 192.168.60.20'
              });
              ctx.highlight('voip-node-phone2', 'var(--warning)');
              ctx.showLabel('voip-node-phone2', ' Kring-Kring! Dering Masuk', { color: 'var(--warning)' });
            }
          },
          {
            narasi: '3. 200 OK & Handshake Selesai: Guru mengangkat gagang telepon. Ext 102 mengirim "SIP 200 OK (Answer)" dan Kepsek membalas "SIP ACK". Sesi panggilan resmi TERBENTUK!',
            durasi: 2700,
            aksi: function (ctx) {
              ctx.highlight('voip-node-phone2', 'var(--success)');
              ctx.showLabel('voip-node-phone1', ' Terhubung! (200 OK)', { color: 'var(--success)' });
            }
          },
          {
            narasi: '4. Direct RTP Stream Terbuka: PBX mundur dari jalur suara! Jalur audio peer-to-peer (RTP Port UDP 16384) langsung terhubung antara Ext 101 dan Ext 102.',
            durasi: 2800,
            aksi: function (ctx) {
              const rtpLine = document.getElementById('voip-rtp-line');
              const rtpBadge = document.getElementById('voip-rtp-badge');
              const rtpText = document.getElementById('voip-rtp-text');
              if (rtpLine) rtpLine.setAttribute('opacity', '1');
              if (rtpBadge) rtpBadge.setAttribute('opacity', '1');
              if (rtpText) rtpText.setAttribute('opacity', '1');

              ctx.encapsulatePacket('voip-node-phone1', 'PCM Audio', {
                label: 'RTP UDP 16384',
                srcIP: '192.168.60.10',
                destIP: '192.168.60.20'
              });
              ctx.movePacket('voip-node-phone1', 'voip-node-phone2', { duration: 1500 });
            }
          },
          {
            narasi: '5. Komunikasi Suara Real-time: Suara manusia yang dikonversi codec G.711 (64 kbps) mengalir bolak-balik dengan latensi sangat rendah.',
            durasi: 2500,
            aksi: function (ctx) {
              ctx.decapsulatePacket('voip-node-phone2', 'Halo Pak Kepsek!');
              ctx.showLabel('voip-node-phone2', ' Audio Streaming OK', { color: 'var(--success)' });
            }
          },
          {
            narasi: '6. Terminasi Panggilan (SIP BYE): Setelah selesai berbicara, gagang ditutup, dikirim pesan "SIP BYE", dan jalur RTP dibebaskan seketika.',
            durasi: 2300,
            aksi: function (ctx) {
              ctx.arrive('voip-node-phone2', { label: 'v Panggilan Ditutup Sempurna' });
            }
          }
        ]
      });


      // === SIMULASI 1.5.4: SISTEM ANTRIAN ERLANG B (LOSS MODEL) ===
      window.AnimEngine.register({
        id: 'sim-erlang-blocking',
        judul: 'Simulasi Erlang B: Analisis Kapasitas Saluran Trunk & Probabilitas Blocking',
        pertanyaanYangDijawab: 'Apa yang terjadi saat kapasitas 3 saluran trunk penuh dan datang panggilan ke-4?',
        langkah: [
          {
            narasi: '1. Panggilan 1 Masuk: Sistem memiliki kapasitas C = 3 Saluran Trunk. Panggilan Call-1 masuk dan menduduki Saluran Trunk 1.',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.clear();
              const s1 = document.getElementById('erlang-slot-1');
              if (s1) {
                s1.querySelector('rect').setAttribute('fill', '#133834');
                s1.querySelector('rect').setAttribute('stroke', 'var(--success)');
                s1.querySelector('text').textContent = 'Trunk Ch 1: [ CALL 1 - BUSY ]';
                s1.querySelector('text').setAttribute('fill', 'var(--success)');
              }
              ctx.highlight('erlang-node-callers', 'var(--success)');
            }
          },
          {
            narasi: '2. Panggilan 2 & 3 Masuk: Call-2 menduduki Trunk 2, disusul Call-3 menduduki Trunk 3. Sekarang SEMUA 3 SALURAN TRUNK PENUH (100% Occupied)!',
            durasi: 2700,
            aksi: function (ctx) {
              const s2 = document.getElementById('erlang-slot-2');
              const s3 = document.getElementById('erlang-slot-3');
              if (s2) {
                s2.querySelector('rect').setAttribute('fill', '#133834');
                s2.querySelector('rect').setAttribute('stroke', 'var(--success)');
                s2.querySelector('text').textContent = 'Trunk Ch 2: [ CALL 2 - BUSY ]';
                s2.querySelector('text').setAttribute('fill', 'var(--success)');
              }
              if (s3) {
                s3.querySelector('rect').setAttribute('fill', '#133834');
                s3.querySelector('rect').setAttribute('stroke', 'var(--success)');
                s3.querySelector('text').textContent = 'Trunk Ch 3: [ CALL 3 - BUSY ]';
                s3.querySelector('text').setAttribute('fill', 'var(--success)');
              }
              ctx.showLabel('erlang-node-callers', '️ Kapasitas Penuh (3/3 Saluran)', { color: 'var(--warning)' });
            }
          },
          {
            narasi: '3. Panggilan 4 Masuk (Kondisi Blocking): Call-4 masuk saat seluruh saluran sibuk. Pada model Erlang B (Loss System), panggilan TIDAK BISA MENGANTRI!',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.encapsulatePacket('erlang-node-callers', 'Call-4 (Ditolak)', {
                label: 'SIP Dial Attempt',
                destIP: 'SIP Trunk C=3'
              });
              ctx.showLabel('erlang-node-callers', ' CALL 4 DITOLAK (NADA SIBUK)', { color: 'var(--danger)' });
            }
          },
          {
            narasi: '4. Eksekusi Pemblokiran: Server mengembalikan kode "486 Busy Here". Panggilan ke-4 langsung dibuang (*Blocked Calls Cleared*).',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.dropPacket('erlang-node-callers', ' 486 Busy (Erlang B Blocked)');
            }
          },
          {
            narasi: '5. Kesimpulan Erlang B: Untuk menjaga agar probabilitas blocking di bawah 1%, perencana jaringan wajib menghitung formula Erlang B dan menambah jumlah trunk C sesuai beban trafik A.',
            durasi: 2500,
            aksi: function (ctx) {
              ctx.arrive('erlang-node-callers', { label: 'v Evaluasi Kapasitas Telco Tuntas' });
            }
          }
        ]
      });


      // === SIMULASI 1.5.5: MULTI-SERVICE VOICE VLAN & DSCP ===
      window.AnimEngine.register({
        id: 'sim-multiservice-qos',
        judul: 'Simulasi Jaringan Multi-Layanan: Voice VLAN (CoS 5) & DSCP EF',
        pertanyaanYangDijawab: 'Bagaimana Voice VLAN dan penandaan DSCP melindungi suara sekolah di tengah badai download?',
        langkah: [
          {
            narasi: '1. Inisiasi: PC Lab (VLAN 20) mengunduh ISO Linux dengan prioritas Best Effort (DSCP 0 / CoS 0).',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.clear();
              ctx.createRawPayload('ms-node-pc', 'Download Ubuntu ISO 4GB');
              ctx.highlight('ms-node-pc', 'var(--warning)');
            }
          },
          {
            narasi: '2. Panggilan Darurat Masuk: Telepon Pos Satpam (VLAN 60) melakukan panggilan darurat. Telepon menyisipkan tag 802.1p CoS 5 dan DSCP 46 (Expedited Forwarding).',
            durasi: 2700,
            aksi: function (ctx) {
              ctx.encapsulatePacket('ms-node-phone', 'Emergency Voice', {
                label: 'Voice VLAN 60 | DSCP 46 (EF)',
                srcIP: '192.168.60.10',
                destIP: 'Server Core'
              });
              ctx.movePacket('ms-node-phone', 'ms-node-switch');
              ctx.highlight('ms-node-phone', 'var(--success)');
            }
          },
          {
            narasi: '3. Evaluasi Tag di Switch: Switch mengenali tag Voice VLAN 60 dan mempercayai tanda CoS 5 (mls qos trust cos), lalu menaruhnya di antrian terdepan.',
            durasi: 2800,
            aksi: function (ctx) {
              ctx.inspectSwitch('ms-node-switch', {
                title: ' CISCO MLS QOS ENGINE',
                port: 'In: Fa0/5 (Voice VLAN 60)',
                vlan: 'CoS 5 -> Map to DSCP 46 EF',
                status: 'Action: STRICT PRIORITY QUEUE'
              });
              ctx.highlight('ms-node-switch', 'var(--success)');
            }
          },
          {
            narasi: '4. Bypass Tanpa Hambatan: Paket suara melaju mendahului banjir download data, sampai di server tujuan dengan latensi 11 ms dan 0% packet loss!',
            durasi: 2700,
            aksi: function (ctx) {
              ctx.movePacket('ms-node-switch', 'ms-node-dest');
              ctx.decapsulatePacket('ms-node-dest', ' Laporan Satpam Diterima!');
              ctx.showLabel('ms-node-dest', 'v SLA 100% Terpenuhi (11 ms)', { color: 'var(--success)' });
            }
          },
          {
            narasi: '5. Kesimpulan Proyek: Integrasi VLAN + Subnetting + Routing + Keamanan + QoS VoIP menghasilkan arsitektur jaringan kampus modern yang tangguh dan siap kerja!',
            durasi: 2600,
            aksi: function (ctx) {
              ctx.arrive('ms-node-dest', { label: ' Fase 1 Jaringan & Infra Tuntas Sempurna!' });
            }
          }
        ]
      });

    }

  });
})();
