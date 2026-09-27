/**
 * ==========================================================================
 * MODUL-1-1.JS — LOGIKA SIMULASI & DATA INTERAKTIF MODUL 1.1
 * Modul 1.1: Dasar Jaringan & Pengalamatan IP
 * Protokol: file:// aman (Vanilla JS, Zero-Dependency)
 * ==========================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. REGISTRASI SEMUA SIMULASI MODUL 1.1 KE ANIM-ENGINE
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {

    // === SIMULASI 1.1: ALUR TRANSMISI HP -> SWITCH -> LAPTOP ===
    if (window.AnimEngine) {
      window.AnimEngine.register({
        id: 'sim-pengiriman-data',
        judul: 'Alur Pengiriman Data: HP -> Switch -> Laptop',
        pertanyaanYangDijawab: 'Bagaimana data dibungkus, dicek di switch, dan dibuka di tujuan?',
        langkah: [
          {
            narasi: '1. Smartphone membuat pesan "Halo Guru!". Pesan kemudian dibungkus (Enkapsulasi) menjadi Paket Data dengan IP Tujuan 192.168.1.50 dan MAC Tujuan B2:34.',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.clear();
              ctx.createRawPayload('sim1-node-hp', 'Halo Guru!');
              ctx.highlight('sim1-node-hp', 'var(--info)');
              setTimeout(() => {
                ctx.encapsulatePacket('sim1-node-hp', 'Halo Guru!', { destIP: '192.168.1.50', destMAC: 'B2:34' });
              }, 800);
            }
          },
          {
            narasi: '2. Paket data meluncur melalui kabel UTP Port 1 menuju Switch jaringan.',
            durasi: 1800,
            aksi: function (ctx) {
              ctx.movePacket('sim1-node-hp', 'sim1-node-sw', { durasi: 1500 });
            }
          },
          {
            narasi: '3. Di Switch, lampu indikator Port 4 berkedip. Switch memeriksa CAM Table: MAC B2:34 (Laptop Guru) terdaftar di Port 4. Paket siap diteruskan.',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.highlight('sim1-node-sw', 'var(--info)');
              ctx.inspectSwitch('sim1-node-sw', {
                targetMAC: 'B2:34 (Laptop Guru)',
                forwardPort: 'Port 4'
              });
            }
          },
          {
            narasi: '4. Paket diteruskan ke Port 4 (Laptop). Di laptop, amplop paket dibuka (Dekapsulasi) dan pesan asli "Halo Guru!" berhasil dibaca!',
            durasi: 2000,
            aksi: function (ctx) {
              ctx.movePacket('sim1-node-sw', 'sim1-node-laptop', {
                durasi: 1400,
                onArrive: function () {
                  ctx.decapsulatePacket('sim1-node-laptop', 'Halo Guru!');
                  ctx.highlight('sim1-node-laptop', 'var(--success)');
                }
              });
            }
          }
        ]
      });

      // === SIMULASI 1.2: PERANGKAT TERISOLASI (KASUS GAGAL) ===
      window.AnimEngine.register({
        id: 'sim-perangkat-terisolasi',
        judul: 'Perangkat Tanpa Koneksi Media Transmisi',
        pertanyaanYangDijawab: 'Mengapa perangkat di ruangan yang sama gagal komunikasi jika tanpa jalur media?',
        langkah: [
          {
            narasi: '1. Smartphone Siswa dalam kondisi WiFi nonaktif (tidak terhubung kabel maupun radio). HP mencoba mengirim paket data ke jaringan lab.',
            durasi: 2000,
            aksi: function (ctx) {
              ctx.clear();
              ctx.encapsulatePacket('sim-iso-hp', 'Data Ping', { destIP: '192.168.1.50', destMAC: '??:??' });
              ctx.highlight('sim-iso-hp', 'var(--warning)');
            }
          },
          {
            narasi: '2. Paket mencoba meluncur... tetapi tidak menemukan jalur transmisi fisik maupun nirkabel! Paket terhenti di udara.',
            durasi: 1800,
            aksi: function (ctx) {
              const svg = ctx.stage.querySelector('svg');
              const packet = svg ? svg.querySelector('.packet') : null;
              if (packet && packet.animate) {
                packet.animate([
                  { transform: 'translate(140px, 160px)' },
                  { transform: 'translate(220px, 160px)' }
                ], { duration: 1000, fill: 'forwards' });
              }
            }
          },
          {
            narasi: '3. PAKET DIBUANG! Karena tidak ada media transmisi dan IP di jaringan yang sama, paket berubah merah, jatuh, dan musnah.',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.dropPacket({ x: 220, y: 160 }, 'Tidak ada media transmisi — Paket dibuang!');
            }
          },
          {
            narasi: '4. Kesimpulan: Jarak fisik tidak menjamin konektivitas. Dua perangkat wajib memiliki media aktif dan segmen IP yang sama.',
            durasi: 2000,
            aksi: function (ctx) {
              ctx.arrive('sim-iso-laptop');
              ctx.showLabel('sim-iso-laptop', 'Laptop Guru Tetap Siaga', { color: 'var(--text-muted)' });
            }
          }
        ]
      });

      // === SIMULASI 1.3: ENKAPSULASI & DEKAPSULASI OSI 7 LAYER ===
      window.AnimEngine.register({
        id: 'sim-enkapsulasi-osi',
        judul: 'Enkapsulasi 7 Lapis OSI: Turun Membungkus, Naik Membuka',
        pertanyaanYangDijawab: 'Bagaimana data dibungkus dari Layer 7 ke Layer 1 dan dibuka kembali di penerima?',
        langkah: [
          {
            narasi: '1. Layer 7-5 (Aplikasi): User mengetik pesan di aplikasi web. Terbentuk unit Data mentah.',
            durasi: 1800,
            aksi: function (ctx) {
              ctx.clear();
              ctx.highlight('osi-l7', 'var(--info)');
              ctx.showLabel({ x: 250, y: 100 }, 'Data Aplikasi Dibuat', { color: 'var(--info)' });
            }
          },
          {
            narasi: '2. Layer 4 (Transport): Data diberi Header TCP/UDP (Nomor Port Sumber & Port Tujuan). Data berubah menjadi SEGMENT.',
            durasi: 2000,
            aksi: function (ctx) {
              ctx.highlight('osi-l4', 'var(--primary)');
              ctx.showLabel({ x: 250, y: 150 }, 'Dibungkus Header Port -> SEGMENT', { color: 'var(--primary)' });
            }
          },
          {
            narasi: '3. Layer 3 (Network): Segmen diberi Header IP (IP Asal & IP Tujuan). Segmen berubah menjadi PACKET.',
            durasi: 2000,
            aksi: function (ctx) {
              ctx.highlight('osi-l3', 'var(--warning)');
              ctx.showLabel({ x: 250, y: 200 }, 'Dibungkus Header IP -> PACKET', { color: 'var(--warning)' });
            }
          },
          {
            narasi: '4. Layer 2 (Data Link): Paket diberi Header MAC & FCS Trailer pengecek error. Paket berubah menjadi FRAME.',
            durasi: 2000,
            aksi: function (ctx) {
              ctx.highlight('osi-l2', 'var(--info)');
              ctx.showLabel({ x: 250, y: 250 }, 'Dibungkus Header MAC -> FRAME', { color: 'var(--info)' });
            }
          },
          {
            narasi: '5. Layer 1 (Physical): Frame diubah menjadi denyut sinyal listrik / bit biner 010101 yang meluncur di kabel menuju komputer tujuan.',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.highlight('osi-l1', 'var(--success)');
              ctx.showLabel({ x: 425, y: 310 }, 'Sinyal Biner 010101 Meluncur di Kabel ->->->', { color: 'var(--success)' });
            }
          },
          {
            narasi: '6. Sisi Penerima (Dekapsulasi): Komputer tujuan membuka Header MAC (L2) -> Header IP (L3) -> Header Port (L4) -> Pesan asli diterima di Aplikasi (L7)!',
            durasi: 2500,
            aksi: function (ctx) {
              ctx.highlight('osi-rx-l7', 'var(--success)');
              ctx.arrive({ x: 600, y: 100 });
              ctx.showLabel({ x: 600, y: 100 }, 'v Pesan Berhasil Dibuka!', { color: 'var(--success)' });
            }
          }
        ]
      });

      // === SIMULASI 1.4: MAC VS IP PERJALANAN LINTAS ROUTER ===
      window.AnimEngine.register({
        id: 'sim-mac-vs-ip',
        judul: 'Perjalanan Lintas Router: IP Tetap, MAC Berganti di Tiap Hop',
        pertanyaanYangDijawab: 'Mengapa alamat IP selalu tetap dari ujung ke ujung sementara alamat MAC berganti tiap melewati router?',
        langkah: [
          {
            narasi: '1. PC Siswa (IP: 192.168.1.10) ingin mengirim data ke Server Google (IP: 8.8.8.8). IP Asal dan IP Tujuan disetel.',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.clear();
              ctx.encapsulatePacket('hop-node-pc', 'Query DNS', {
                destIP: '8.8.8.8',
                destMAC: 'MAC-Router1 (00:AA)'
              });
              ctx.highlight('hop-node-pc', 'var(--info)');
            }
          },
          {
            narasi: '2. Hop 1: PC mengirim ke Router 1. Header Frame: Source MAC = PC (00:11), Dest MAC = Router 1 (00:AA). IP Tujuan TETAP 8.8.8.8.',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.movePacket('hop-node-pc', 'hop-node-r1', { durasi: 1600 });
            }
          },
          {
            narasi: '3. Di Router 1: Router melepas header MAC lama, membaca IP Tujuan (8.8.8.8), lalu memasang MAC BARU: Source MAC = Router 1 (00:BB), Dest MAC = Router 2 (00:CC).',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.highlight('hop-node-r1', 'var(--warning)');
              ctx.showLabel('hop-node-r1', 'Ganti MAC Frame Baru: 00:BB -> 00:CC', { color: 'var(--warning)' });
              setTimeout(() => {
                ctx.encapsulatePacket('hop-node-r1', 'Query DNS', {
                  destIP: '8.8.8.8',
                  destMAC: 'MAC-Router2 (00:CC)'
                });
              }, 600);
            }
          },
          {
            narasi: '4. Hop 2: Paket meluncur antar-router. Header IP Tujuan tetap 8.8.8.8, tidak pernah berubah!',
            durasi: 2000,
            aksi: function (ctx) {
              ctx.movePacket('hop-node-r1', 'hop-node-r2', { durasi: 1600 });
            }
          },
          {
            narasi: '5. Hop 3: Router 2 meneruskan ke Server Google dengan Dest MAC = Server (00:DD). Paket tiba di Server Google dengan IP Asal 192.168.1.10 dan IP Tujuan 8.8.8.8!',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.movePacket('hop-node-r2', 'hop-node-server', {
                durasi: 1500,
                onArrive: function () {
                  ctx.decapsulatePacket('hop-node-server', 'Query DNS');
                  ctx.highlight('hop-node-server', 'var(--success)');
                }
              });
            }
          }
        ]
      });

      // === SIMULASI 1.5: HUB VS SWITCH PERBANDINGAN BERDAMPINGAN ===
      window.AnimEngine.register({
        id: 'sim-hub-vs-switch',
        judul: 'Perbandingan HUB vs SWITCH: Collision vs Smart Forwarding',
        pertanyaanYangDijawab: 'Mengapa Hub menyebabkan tabrakan data (collision) sedangkan Switch membagi jalur secara cerdas?',
        langkah: [
          {
            narasi: '1. Sisi Kiri (HUB): PC-A mengirim data ke PC-B. Hub adalah perangkat pasif (Layer 1) yang tidak membaca MAC address.',
            durasi: 2200,
            aksi: function (ctx) {
              ctx.clear();
              ctx.encapsulatePacket('hub-pc-a', 'Pesan A', { destIP: '192.168.1.20', destMAC: 'PC-B' });
              ctx.highlight('hub-pc-a', 'var(--warning)');
            }
          },
          {
            narasi: '2. Banjir di HUB: Hub menyalin paket ke SEMUA PORT! PC-C dan PC-D terpaksa menerima dan membuang paket. Jika dua PC bicara bersamaan, terjadi TABRAKAN DATA (Collision)!',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.movePacket('hub-pc-a', 'hub-device', {
                durasi: 1000,
                onArrive: function () {
                  ctx.showLabel('hub-device', '️ FLOODING KE SEMUA PORT', { color: 'var(--danger)' });
                  ctx.highlight('hub-device', 'var(--danger)');
                }
              });
            }
          },
          {
            narasi: '3. Sisi Kanan (SWITCH): PC-1 mengirim data ke PC-2. Switch membaca MAC Table dan HANYA mengirimkan paket ke kabel PC-2.',
            durasi: 2400,
            aksi: function (ctx) {
              ctx.encapsulatePacket('sw-pc-1', 'Pesan 1', { destIP: '192.168.1.2', destMAC: 'PC-2' });
              ctx.highlight('sw-pc-1', 'var(--info)');
              setTimeout(() => {
                ctx.movePacket('sw-pc-1', 'sw-device', {
                  durasi: 1000,
                  onArrive: function () {
                    ctx.inspectSwitch('sw-device', { targetMAC: 'PC-2', forwardPort: 'Port 2' });
                  }
                });
              }, 500);
            }
          },
          {
            narasi: '4. Paket tiba di PC-2 dengan bersih tanpa mengganggu PC-3 dan PC-4. Switch memecah Collision Domain di setiap port!',
            durasi: 2000,
            aksi: function (ctx) {
              ctx.movePacket('sw-device', 'sw-pc-2', {
                durasi: 1200,
                onArrive: function () {
                  ctx.arrive('sw-pc-2');
                  ctx.showLabel('sw-pc-2', 'v Unicast Lancar', { color: 'var(--success)' });
                }
              });
            }
          }
        ]
      });
    }

    // === 2. INJEKSI SVG PERANGKAT KE MASING-MASING STAGE ===
    function renderDeviceNodes() {
      if (!window.Devices) return;

      // Stage 1: Alur Transmisi
      const s1Hp = document.getElementById('sim1-node-hp');
      const s1Sw = document.getElementById('sim1-node-sw');
      const s1Lp = document.getElementById('sim1-node-laptop');
      if (s1Hp) s1Hp.innerHTML = window.Devices.hp({ name: 'HP Siswa', ip: '192.168.1.10', mac: 'MAC: A1:4F', state: 'aktif' });
      if (s1Sw) s1Sw.innerHTML = window.Devices.switch({ name: 'Switch-Lab', state: 'normal' });
      if (s1Lp) s1Lp.innerHTML = window.Devices.laptop({ name: 'Laptop Guru', ip: '192.168.1.50', mac: 'MAC: B2:34', state: 'normal' });

      // Stage 2: Perangkat Terisolasi
      const isoHp = document.getElementById('sim-iso-hp');
      const isoLp = document.getElementById('sim-iso-laptop');
      if (isoHp) isoHp.innerHTML = window.Devices.hp({ name: 'HP Non-WiFi', ip: 'Tanpa IP', mac: 'MAC: A1:4F', state: 'nonaktif' });
      if (isoLp) isoLp.innerHTML = window.Devices.laptop({ name: 'Laptop Guru', ip: '192.168.1.50', mac: 'MAC: B2:34', state: 'normal' });

      // Stage 4: MAC vs IP Hop
      const hopPc = document.getElementById('hop-node-pc');
      const hopR1 = document.getElementById('hop-node-r1');
      const hopR2 = document.getElementById('hop-node-r2');
      const hopSrv = document.getElementById('hop-node-server');
      if (hopPc) hopPc.innerHTML = window.Devices.laptop({ name: 'PC Siswa', ip: '192.168.1.10', mac: 'MAC: 00:11' });
      if (hopR1) hopR1.innerHTML = window.Devices.router({ name: 'Router-1', ip: '192.168.1.1' });
      if (hopR2) hopR2.innerHTML = window.Devices.router({ name: 'Router-2', ip: '10.0.0.2' });
      if (hopSrv) hopSrv.innerHTML = window.Devices.server ? window.Devices.server({ name: 'Google DNS', ip: '8.8.8.8' }) : '';

      // Stage 5: Hub vs Switch
      const hubDev = document.getElementById('hub-device');
      const swDev = document.getElementById('sw-device');
      if (hubDev) hubDev.innerHTML = window.Devices.hub({ name: 'HUB Lab Lama', state: 'normal' });
      if (swDev) swDev.innerHTML = window.Devices.switch({ name: 'SWITCH Baru', state: 'normal' });
    }

    renderDeviceNodes();


    // === 3. WIDGET INTERAKTIF: SLIDER SUBNETTING FLSM ===
    const prefixSlider = document.getElementById('flsm-prefix-slider');
    const prefixLabel = document.getElementById('flsm-prefix-val');
    const maskLabel = document.getElementById('flsm-mask-val');
    const subnetCountLabel = document.getElementById('flsm-subnets-val');
    const hostCountLabel = document.getElementById('flsm-hosts-val');
    const blockSizeLabel = document.getElementById('flsm-block-val');
    const visualBlocksContainer = document.getElementById('flsm-visual-blocks');

    const FLSM_TABLE = {
      24: { mask: '255.255.255.0', subnets: 1, hosts: 254, block: 256, bits: 0 },
      25: { mask: '255.255.255.128', subnets: 2, hosts: 126, block: 128, bits: 1 },
      26: { mask: '255.255.255.192', subnets: 4, hosts: 62, block: 64, bits: 2 },
      27: { mask: '255.255.255.224', subnets: 8, hosts: 30, block: 32, bits: 3 },
      28: { mask: '255.255.255.240', subnets: 16, hosts: 14, block: 16, bits: 4 },
      29: { mask: '255.255.255.248', subnets: 32, hosts: 6, block: 8, bits: 5 },
      30: { mask: '255.255.255.252', subnets: 64, hosts: 2, block: 4, bits: 6 }
    };

    function updateFLSMWidget(prefix) {
      const data = FLSM_TABLE[prefix];
      if (!data) return;

      if (prefixLabel) prefixLabel.textContent = `/${prefix}`;
      if (maskLabel) maskLabel.textContent = data.mask;
      if (subnetCountLabel) subnetCountLabel.textContent = `${data.subnets} Subnet (2^${data.bits})`;
      if (hostCountLabel) hostCountLabel.textContent = `${data.hosts} Host Valid (2^${8 - data.bits} - 2)`;
      if (blockSizeLabel) blockSizeLabel.textContent = `${data.block} Alamat (256 - ${parseInt(data.mask.split('.')[3])})`;

      if (visualBlocksContainer) {
        visualBlocksContainer.innerHTML = '';
        const displayLimit = Math.min(data.subnets, 16);
        for (let i = 0; i < displayLimit; i++) {
          const blockEl = document.createElement('div');
          blockEl.className = 'flsm-mini-block';
          const netId = i * data.block;
          blockEl.innerHTML = `<span>Subnet ${i + 1}</span><strong>. ${netId}</strong>`;
          visualBlocksContainer.appendChild(blockEl);
        }
        if (data.subnets > 16) {
          const moreEl = document.createElement('div');
          moreEl.className = 'flsm-mini-block flsm-mini-block--more';
          moreEl.textContent = `+ ${data.subnets - 16} Subnet Lainnya...`;
          visualBlocksContainer.appendChild(moreEl);
        }
      }
    }

    if (prefixSlider) {
      prefixSlider.addEventListener('input', function (e) {
        updateFLSMWidget(parseInt(e.target.value));
      });
      updateFLSMWidget(26);
    }
  });

})();
