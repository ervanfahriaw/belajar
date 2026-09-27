/**
 * ==========================================================================
 * ANIM-ENGINE.JS — MESIN SIMULASI PEDAGOGIS KAYA & DETAIL MIKRO
 * Mengimplementasikan alur: Enkapsulasi -> Pengiriman -> Inspeksi Switch -> Buka Paket
 * Protokol: file:// aman (Vanilla JS, Zero Dependency, Web Animations API)
 * ==========================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. WINDOW.DEVICES — VEKTOR PERANGKAT MODERN & RAMAH (SVG)
     Ukuran standar: Lebar 130px, Tinggi 140px (Pusat di x=65, y=70)
     -------------------------------------------------------------------------- */
  window.Devices = {
    // Smartphone: Pusat fisik di x=65, y=70
    hp: function (opts = {}) {
      const state = opts.state || 'normal';
      const name = opts.name || 'Smartphone';
      const ip = opts.ip || '';
      const mac = opts.mac || 'MAC: A1:4F';
      const strokeColor = state === 'aktif' ? 'var(--info)' : 'var(--border-light)';
      const opacity = state === 'nonaktif' ? '0.4' : '1';

      return `
        <g class="device device--hp" data-state="${state}" style="opacity: ${opacity};" transform="${opts.transform || ''}">
          <title>${name}</title>
          <!-- Bayangan Bawah -->
          <ellipse cx="65" cy="118" rx="26" ry="6" fill="#141518" opacity="0.06" />
          <!-- Body HP -->
          <rect x="41" y="16" width="48" height="92" rx="10" fill="#E8E6E0" stroke="${strokeColor}" stroke-width="2.5" />
          <!-- Layar Dalam -->
          <rect x="45" y="24" width="40" height="76" rx="6" fill="#1A1D24" />
          <!-- Header Layar -->
          <rect x="57" y="19" width="16" height="3" rx="1.5" fill="var(--border)" />
          <circle cx="51" cy="29" r="1.5" fill="var(--info)" />
          <line x1="75" y1="29" x2="80" y2="29" stroke="var(--success)" stroke-width="2" stroke-linecap="round" />
          <!-- Tampilan Chat UI -->
          <rect x="49" y="38" width="26" height="12" rx="3" fill="#E8E6E0" />
          <rect x="55" y="54" width="26" height="12" rx="3" fill="var(--primary-soft)" stroke="var(--primary)" stroke-width="0.8" />
          <circle cx="65" cy="85" r="5" fill="#D5D2C8" />
          <!-- Label Bawah -->
          <text x="65" y="126" text-anchor="middle" fill="var(--text)" font-size="11.5" font-weight="750" font-family="var(--font-body)">${name}</text>
          ${ip ? `<text x="65" y="139" text-anchor="middle" fill="var(--info)" font-size="10" font-family="var(--font-mono)">${ip}</text>` : ''}
          ${mac ? `<text x="65" y="150" text-anchor="middle" fill="var(--text-muted)" font-size="8.5" font-family="var(--font-mono)">${mac}</text>` : ''}
        </g>
      `;
    },

    // Switch Jaringan: Pusat fisik di x=65, y=70
    switch: function (opts = {}) {
      const state = opts.state || 'normal';
      const name = opts.name || 'Switch';
      const strokeColor = state === 'aktif' ? 'var(--info)' : 'var(--border-light)';
      const opacity = state === 'nonaktif' ? '0.4' : '1';

      return `
        <g class="device device--switch" data-state="${state}" style="opacity: ${opacity};" transform="${opts.transform || ''}">
          <title>${name}</title>
          <!-- Bayangan Bawah -->
          <ellipse cx="65" cy="116" rx="55" ry="8" fill="#141518" opacity="0.08" />
          <!-- Chassis Switch -->
          <rect x="10" y="44" width="110" height="52" rx="7" fill="#D5D2C8" stroke="${strokeColor}" stroke-width="2.5" />
          <rect x="15" y="49" width="100" height="8" rx="2" fill="#2D3039" />
          <!-- Grid 8 Port RJ45 -->
          <g fill="#1A1D24" stroke="var(--border)" stroke-width="1.2">
            <rect x="18" y="65" width="8" height="11" rx="1.5" id="sw-port-1" />
            <rect x="30" y="65" width="8" height="11" rx="1.5" />
            <rect x="42" y="65" width="8" height="11" rx="1.5" />
            <rect x="54" y="65" width="8" height="11" rx="1.5" id="sw-port-4" />
            <rect x="66" y="65" width="8" height="11" rx="1.5" />
            <rect x="78" y="65" width="8" height="11" rx="1.5" />
            <rect x="90" y="65" width="8" height="11" rx="1.5" />
            <rect x="102" y="65" width="8" height="11" rx="1.5" />
          </g>
          <!-- LED Indikator Port -->
          <circle cx="22" cy="60" r="2" fill="var(--success)" id="sw-led-1" />
          <circle cx="34" cy="60" r="1.8" fill="var(--text-dim)" />
          <circle cx="46" cy="60" r="1.8" fill="var(--text-dim)" />
          <circle cx="58" cy="60" r="2" fill="var(--success)" id="sw-led-4" />
          <circle cx="70" cy="60" r="1.8" fill="var(--text-dim)" />
          <circle cx="82" cy="60" r="1.8" fill="var(--success)" />
          <circle cx="94" cy="60" r="1.8" fill="var(--text-dim)" />
          <circle cx="106" cy="60" r="1.8" fill="var(--text-dim)" />
          <!-- Label -->
          <text x="65" y="125" text-anchor="middle" fill="var(--text)" font-size="11.5" font-weight="750" font-family="var(--font-body)">${name}</text>
          <text x="65" y="138" text-anchor="middle" fill="var(--info)" font-size="9" font-family="var(--font-mono)">Layer 2 (CAM Table)</text>
        </g>
      `;
    },

    // Laptop: Pusat fisik di x=65, y=70
    laptop: function (opts = {}) {
      const state = opts.state || 'normal';
      const name = opts.name || 'Laptop';
      const ip = opts.ip || '';
      const mac = opts.mac || 'MAC: B2:34';
      const strokeColor = state === 'aktif' ? 'var(--info)' : 'var(--border-light)';
      const opacity = state === 'nonaktif' ? '0.4' : '1';

      return `
        <g class="device device--laptop" data-state="${state}" style="opacity: ${opacity};" transform="${opts.transform || ''}">
          <title>${name}</title>
          <!-- Bayangan Bawah -->
          <ellipse cx="65" cy="116" rx="46" ry="7" fill="#141518" opacity="0.06" />
          <!-- Layar Terbuka -->
          <rect x="24" y="24" width="82" height="54" rx="6" fill="#D5D2C8" stroke="${strokeColor}" stroke-width="2.5" />
          <rect x="30" y="30" width="70" height="42" rx="3" fill="#1A1D24" />
          <!-- Konten Layar Laptop -->
          <g id="laptop-screen-content">
            <rect x="36" y="36" width="30" height="4" rx="2" fill="var(--info)" />
            <rect x="36" y="44" width="50" height="3" rx="1.5" fill="var(--text-dim)" />
            <rect x="36" y="51" width="40" height="3" rx="1.5" fill="var(--text-dim)" />
            <circle cx="86" cy="55" r="7" fill="var(--primary-soft)" />
            <text x="86" y="58" text-anchor="middle" fill="var(--primary)" font-size="7.5" font-weight="bold">v</text>
          </g>
          <!-- Base Keyboard Slanted -->
          <path d="M12 78 L118 78 L108 96 L22 96 Z" fill="#C8C5BC" stroke="${strokeColor}" stroke-width="2" />
          <rect x="52" y="86" width="26" height="6" rx="2" fill="#2D3039" />
          <!-- Label Bawah -->
          <text x="65" y="125" text-anchor="middle" fill="var(--text)" font-size="11.5" font-weight="750" font-family="var(--font-body)">${name}</text>
          ${ip ? `<text x="65" y="138" text-anchor="middle" fill="var(--info)" font-size="10" font-family="var(--font-mono)">${ip}</text>` : ''}
          ${mac ? `<text x="65" y="149" text-anchor="middle" fill="var(--text-muted)" font-size="8.5" font-family="var(--font-mono)">${mac}</text>` : ''}
        </g>
      `;
    },

    // Router Gateway
    router: function (opts = {}) {
      const state = opts.state || 'normal';
      const name = opts.name || 'Router';
      const ip = opts.ip || '';
      const strokeColor = state === 'aktif' ? 'var(--info)' : 'var(--border-light)';

      return `
        <g class="device device--router" data-state="${state}" transform="${opts.transform || ''}">
          <title>${name}</title>
          <ellipse cx="65" cy="116" rx="42" ry="7" fill="#141518" opacity="0.06" />
          <line x1="32" y1="46" x2="20" y2="18" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round" />
          <circle cx="20" cy="18" r="3.5" fill="var(--primary)" />
          <line x1="98" y1="46" x2="110" y2="18" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round" />
          <circle cx="110" cy="18" r="3.5" fill="var(--primary)" />
          <rect x="22" y="46" width="86" height="46" rx="9" fill="#D5D2C8" stroke="${strokeColor}" stroke-width="2.5" />
          <path d="M48 68 L65 56 L82 68 M65 56 L65 80" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="36" cy="58" r="2.5" fill="var(--success)" />
          <circle cx="36" cy="68" r="2.5" fill="var(--info)" />
          <text x="65" y="125" text-anchor="middle" fill="var(--text)" font-size="11.5" font-weight="750">${name}</text>
          ${ip ? `<text x="65" y="138" text-anchor="middle" fill="var(--info)" font-size="10" font-family="var(--font-mono)">${ip}</text>` : ''}
        </g>
      `;
    },

    // MikroTik RouterOS Box (Chassis Putih/Biru dengan 5 Port)
    mikrotik: function (opts = {}) {
      const state = opts.state || 'normal';
      const name = opts.name || 'MikroTik';
      const ip = opts.ip || '192.168.88.1';
      const mac = opts.mac || 'MAC: D4:01:C3';
      const strokeColor = state === 'aktif' ? 'var(--info)' : 'var(--primary)';

      return `
        <g class="device device--mikrotik" data-state="${state}" transform="${opts.transform || ''}">
          <title>${name}</title>
          <ellipse cx="65" cy="116" rx="46" ry="7" fill="#141518" opacity="0.06" />
          <!-- Chassis MikroTik Putih Elegan -->
          <rect x="16" y="44" width="98" height="52" rx="7" fill="#D5D2C8" stroke="${strokeColor}" stroke-width="2.5" />
          <rect x="22" y="50" width="86" height="8" rx="2" fill="#2D3039" />
          <!-- RouterOS Logo Badge -->
          <rect x="24" y="52" width="28" height="4" rx="1" fill="var(--info)" />
          <!-- 5 Port RJ45 MikroTik (ether1 s.d. ether5) -->
          <g fill="#1A1D24" stroke="var(--border)" stroke-width="1.2">
            <rect x="24" y="65" width="10" height="13" rx="1.5" />
            <rect x="38" y="65" width="10" height="13" rx="1.5" />
            <rect x="52" y="65" width="10" height="13" rx="1.5" />
            <rect x="66" y="65" width="10" height="13" rx="1.5" />
            <rect x="80" y="65" width="10" height="13" rx="1.5" />
          </g>
          <!-- LED Port Indikator -->
          <circle cx="29" cy="82" r="1.5" fill="var(--success)" />
          <circle cx="43" cy="82" r="1.5" fill="var(--success)" />
          <circle cx="57" cy="82" r="1.5" fill="var(--text-dim)" />
          <circle cx="71" cy="82" r="1.5" fill="var(--text-dim)" />
          <circle cx="85" cy="82" r="1.5" fill="var(--text-dim)" />
          <!-- Label -->
          <text x="65" y="125" text-anchor="middle" fill="var(--text)" font-size="11.5" font-weight="750">${name}</text>
          ${ip ? `<text x="65" y="138" text-anchor="middle" fill="var(--info)" font-size="10" font-family="var(--font-mono)">${ip}</text>` : ''}
          ${mac ? `<text x="65" y="149" text-anchor="middle" fill="var(--text-muted)" font-size="8.5" font-family="var(--font-mono)">${mac}</text>` : ''}
        </g>
      `;
    },

    // Server Rack Unit
    server: function (opts = {}) {
      const state = opts.state || 'normal';
      const name = opts.name || 'Server';
      const ip = opts.ip || '10.0.0.50';
      const strokeColor = state === 'aktif' ? 'var(--info)' : 'var(--border-light)';

      return `
        <g class="device device--server" data-state="${state}" transform="${opts.transform || ''}">
          <title>${name}</title>
          <ellipse cx="65" cy="116" rx="42" ry="7" fill="#141518" opacity="0.06" />
          <rect x="22" y="32" width="86" height="66" rx="6" fill="#D5D2C8" stroke="${strokeColor}" stroke-width="2.5" />
          <line x1="22" y1="54" x2="108" y2="54" stroke="var(--border)" stroke-width="1.5" />
          <line x1="22" y1="76" x2="108" y2="76" stroke="var(--border)" stroke-width="1.5" />
          <circle cx="34" cy="43" r="2.5" fill="var(--success)" />
          <circle cx="42" cy="43" r="2.5" fill="var(--info)" />
          <circle cx="34" cy="65" r="2.5" fill="var(--success)" />
          <circle cx="42" cy="65" r="2.5" fill="var(--info)" />
          <circle cx="34" cy="87" r="2.5" fill="var(--success)" />
          <circle cx="42" cy="87" r="2.5" fill="var(--warning)" />
          <rect x="56" y="41" width="40" height="4" rx="2" fill="#1A1D24" />
          <rect x="56" y="63" width="40" height="4" rx="2" fill="#1A1D24" />
          <rect x="56" y="85" width="40" height="4" rx="2" fill="#1A1D24" />
          <text x="65" y="125" text-anchor="middle" fill="var(--text)" font-size="11.5" font-weight="750">${name}</text>
          ${ip ? `<text x="65" y="138" text-anchor="middle" fill="var(--info)" font-size="10" font-family="var(--font-mono)">${ip}</text>` : ''}
        </g>
      `;
    },

    // Cloud Internet
    cloud: function (opts = {}) {
      const name = opts.name || 'Internet';
      const ip = opts.ip || 'Public WAN';

      return `
        <g class="device device--cloud" transform="${opts.transform || ''}">
          <title>${name}</title>
          <ellipse cx="65" cy="116" rx="46" ry="7" fill="#141518" opacity="0.06" />
          <path d="M40 78 A18 18 0 0 1 48 48 A24 24 0 0 1 82 46 A18 18 0 0 1 95 78 Z" fill="#C8C5BC" stroke="var(--info)" stroke-width="2.5" />
          <circle cx="60" cy="62" r="5" fill="var(--primary-soft)" />
          <text x="60" y="65" text-anchor="middle" fill="var(--info)" font-size="7" font-weight="bold">WAN</text>
          <text x="65" y="125" text-anchor="middle" fill="var(--text)" font-size="11.5" font-weight="750">${name}</text>
          <text x="65" y="138" text-anchor="middle" fill="var(--warning)" font-size="9.5" font-family="var(--font-mono)">${ip}</text>
        </g>
      `;
    },

    // Wireless Access Point (WiFi AP)
    ap: function (opts = {}) {
      const state = opts.state || 'normal';
      const name = opts.name || 'Access Point';
      const ip = opts.ip || '';
      const ssid = opts.ssid || 'SSID: SMK-WiFi';
      const strokeColor = state === 'aktif' ? 'var(--info)' : 'var(--border-light)';
      const opacity = state === 'nonaktif' ? '0.4' : '1';

      return `
        <g class="device device--ap" data-state="${state}" style="opacity: ${opacity};" transform="${opts.transform || ''}">
          <title>${name}</title>
          <ellipse cx="65" cy="118" rx="36" ry="6" fill="#141518" opacity="0.06" />
          <!-- Antena Tengah -->
          <line x1="65" y1="20" x2="65" y2="48" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round" />
          <circle cx="65" cy="17" r="4" fill="var(--info)" />
          <!-- Sinyal WiFi Arcs -->
          <path d="M45 30 A25 25 0 0 1 85 30" fill="none" stroke="var(--info)" stroke-width="2" opacity="0.7" />
          <path d="M38 22 A32 32 0 0 1 92 22" fill="none" stroke="var(--info)" stroke-width="1.5" opacity="0.4" />
          <!-- Body AP -->
          <rect x="30" y="48" width="70" height="42" rx="8" fill="#D5D2C8" stroke="${strokeColor}" stroke-width="2.5" />
          <!-- LED Indikator -->
          <circle cx="42" cy="60" r="2.5" fill="var(--success)" />
          <circle cx="52" cy="60" r="2.5" fill="var(--info)" />
          <circle cx="62" cy="60" r="2.5" fill="var(--success)" />
          <!-- Label WiFi -->
          <text x="65" y="82" text-anchor="middle" fill="var(--text-dim)" font-size="7.5" font-family="var(--font-mono)">802.11ac</text>
          <!-- 2 Port RJ45 -->
          <g fill="#1A1D24" stroke="var(--border)" stroke-width="1">
            <rect x="45" y="92" width="10" height="8" rx="1" />
            <rect x="60" y="92" width="10" height="8" rx="1" />
          </g>
          <!-- Label Bawah -->
          <text x="65" y="125" text-anchor="middle" fill="var(--text)" font-size="11.5" font-weight="750" font-family="var(--font-body)">${name}</text>
          ${ip ? `<text x="65" y="138" text-anchor="middle" fill="var(--info)" font-size="10" font-family="var(--font-mono)">${ip}</text>` : ''}
          ${ssid ? `<text x="65" y="149" text-anchor="middle" fill="var(--text-muted)" font-size="8.5" font-family="var(--font-mono)">${ssid}</text>` : ''}
        </g>
      `;
    },

    // Firewall Appliance
    firewall: function (opts = {}) {
      const state = opts.state || 'normal';
      const name = opts.name || 'Firewall';
      const ip = opts.ip || '';
      const strokeColor = state === 'aktif' ? 'var(--warning)' : 'var(--danger)';
      const opacity = state === 'nonaktif' ? '0.4' : '1';

      return `
        <g class="device device--firewall" data-state="${state}" style="opacity: ${opacity};" transform="${opts.transform || ''}">
          <title>${name}</title>
          <ellipse cx="65" cy="116" rx="42" ry="7" fill="#141518" opacity="0.06" />
          <!-- Chassis Firewall -->
          <rect x="20" y="38" width="90" height="56" rx="7" fill="#D5D2C8" stroke="${strokeColor}" stroke-width="2.5" />
          <!-- Shield Icon -->
          <path d="M55 50 L65 44 L75 50 L75 68 Q65 74 55 68 Z" fill="none" stroke="var(--warning)" stroke-width="2" />
          <text x="65" y="63" text-anchor="middle" fill="var(--warning)" font-size="10" font-weight="bold"></text>
          <!-- LED Status -->
          <circle cx="32" cy="50" r="2.5" fill="var(--danger)" />
          <circle cx="32" cy="58" r="2.5" fill="var(--success)" />
          <circle cx="32" cy="66" r="2.5" fill="var(--warning)" />
          <!-- Rule Chains Label -->
          <text x="65" y="86" text-anchor="middle" fill="var(--text-dim)" font-size="7" font-family="var(--font-mono)">IN | FWD | OUT</text>
          <!-- Label Bawah -->
          <text x="65" y="125" text-anchor="middle" fill="var(--text)" font-size="11.5" font-weight="750" font-family="var(--font-body)">${name}</text>
          ${ip ? `<text x="65" y="138" text-anchor="middle" fill="var(--warning)" font-size="10" font-family="var(--font-mono)">${ip}</text>` : ''}
        </g>
      `;
    },

    // Hacker / Attacker device
    hacker: function (opts = {}) {
      const name = opts.name || 'Attacker';
      const ip = opts.ip || '???';

      return `
        <g class="device device--hacker" transform="${opts.transform || ''}">
          <title>${name}</title>
          <ellipse cx="65" cy="116" rx="36" ry="6" fill="#141518" opacity="0.06" />
          <!-- Hooded Figure Silhouette -->
          <path d="M45 82 Q45 42 65 35 Q85 42 85 82 Z" fill="#4B505D" stroke="var(--danger)" stroke-width="2" />
          <circle cx="57" cy="58" r="3" fill="var(--danger)" opacity="0.8" />
          <circle cx="73" cy="58" r="3" fill="var(--danger)" opacity="0.8" />
          <!-- Laptop hacker -->
          <rect x="42" y="82" width="46" height="18" rx="3" fill="#1A1D24" stroke="var(--danger)" stroke-width="1.5" />
          <text x="65" y="94" text-anchor="middle" fill="var(--danger)" font-size="8" font-family="var(--font-mono)">$ _</text>
          <!-- Label -->
          <text x="65" y="125" text-anchor="middle" fill="var(--danger)" font-size="11.5" font-weight="750" font-family="var(--font-body)">${name}</text>
          <text x="65" y="138" text-anchor="middle" fill="var(--danger)" font-size="9" font-family="var(--font-mono)">${ip}</text>
        </g>
      `;
    },

    // VPN Tunnel Connector (decorative)
    vpnTunnel: function (opts = {}) {
      const x1 = opts.x1 || 100;
      const y1 = opts.y1 || 180;
      const x2 = opts.x2 || 700;
      const y2 = opts.y2 || 180;
      const label = opts.label || 'VPN Tunnel (Encrypted)';

      return `
        <g class="vpn-tunnel-line">
          <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--success)" stroke-width="4" stroke-dasharray="10,5" opacity="0.6" />
          <line x1="${x1}" y1="${y1 - 8}" x2="${x2}" y2="${y2 - 8}" stroke="var(--success)" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.3" />
          <line x1="${x1}" y1="${y1 + 8}" x2="${x2}" y2="${y2 + 8}" stroke="var(--success)" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.3" />
          <rect x="${(x1 + x2) / 2 - 70}" y="${(y1 + y2) / 2 - 30}" width="140" height="18" rx="9" fill="#F0FDF4" stroke="var(--success)" stroke-width="1.5" />
          <text x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 - 18}" text-anchor="middle" fill="var(--success)" font-size="8.5" font-weight="bold" font-family="var(--font-mono)"> ${label}</text>
        </g>
      `;
    },

    // Hub Jadul
    hub: function (opts = {}) {
      const name = opts.name || 'Hub';
      return `
        <g class="device device--hub" transform="${opts.transform || ''}">
          <title>${name}</title>
          <ellipse cx="65" cy="116" rx="45" ry="7" fill="#141518" opacity="0.06" />
          <rect x="18" y="52" width="94" height="42" rx="6" fill="#D5D2C8" stroke="var(--border-light)" stroke-width="2" />
          <g fill="#1A1D24">
            <rect x="26" y="65" width="8" height="12" rx="1" />
            <rect x="38" y="65" width="8" height="12" rx="1" />
            <rect x="50" y="65" width="8" height="12" rx="1" />
            <rect x="62" y="65" width="8" height="12" rx="1" />
            <rect x="74" y="65" width="8" height="12" rx="1" />
            <rect x="86" y="65" width="8" height="12" rx="1" />
          </g>
          <text x="65" y="125" text-anchor="middle" fill="var(--text-muted)" font-size="11.5" font-weight="750">${name}</text>
          <text x="65" y="138" text-anchor="middle" fill="var(--danger)" font-size="8.5" font-family="var(--font-mono)">Layer 1 (Repeater)</text>
        </g>
      `;
    },

    // VoIP IP Phone (SIP Phone): Pusat fisik di x=65, y=70
    ipphone: function (opts = {}) {
      const state = opts.state || 'normal';
      const name = opts.name || 'IP Phone';
      const ext = opts.ext || 'Ext 101';
      const ip = opts.ip || '192.168.60.10';
      const strokeColor = state === 'aktif' ? 'var(--info)' : 'var(--border-light)';
      const opacity = state === 'nonaktif' ? '0.4' : '1';

      return `
        <g class="device device--ipphone" data-state="${state}" style="opacity: ${opacity};" transform="${opts.transform || ''}">
          <title>${name}</title>
          <ellipse cx="65" cy="116" rx="42" ry="7" fill="#141518" opacity="0.06" />
          <!-- Base Body Telepon -->
          <rect x="24" y="32" width="82" height="66" rx="8" fill="#D5D2C8" stroke="${strokeColor}" stroke-width="2.5" />
          <!-- Handset (Gagang Telepon di sebelah kiri) -->
          <rect x="28" y="24" width="18" height="74" rx="9" fill="#C8C5BC" stroke="var(--info)" stroke-width="1.5" />
          <circle cx="37" cy="36" r="5" fill="#2D3039" />
          <circle cx="37" cy="86" r="5" fill="#2D3039" />
          <!-- Layar LCD Kecil -->
          <rect x="52" y="38" width="46" height="20" rx="3" fill="#1A1D24" stroke="var(--info)" stroke-width="1" />
          <text x="75" y="48" text-anchor="middle" fill="var(--info)" font-size="6.5" font-family="var(--font-mono)" font-weight="bold"> ${ext}</text>
          <text x="75" y="55" text-anchor="middle" fill="var(--success)" font-size="5.5" font-family="var(--font-mono)">SIP: READY</text>
          <!-- Keypad Numeric Grid (3x3 + 0) -->
          <g fill="#C8C5BC">
            <rect x="53" y="63" width="10" height="6" rx="1.5" />
            <rect x="66" y="63" width="10" height="6" rx="1.5" />
            <rect x="79" y="63" width="10" height="6" rx="1.5" />
            <rect x="53" y="72" width="10" height="6" rx="1.5" />
            <rect x="66" y="72" width="10" height="6" rx="1.5" />
            <rect x="79" y="72" width="10" height="6" rx="1.5" />
            <rect x="53" y="81" width="10" height="6" rx="1.5" />
            <rect x="66" y="81" width="10" height="6" rx="1.5" />
            <rect x="79" y="81" width="10" height="6" rx="1.5" />
          </g>
          <!-- Label Bawah -->
          <text x="65" y="125" text-anchor="middle" fill="var(--text)" font-size="11.5" font-weight="750" font-family="var(--font-body)">${name}</text>
          ${ip ? `<text x="65" y="138" text-anchor="middle" fill="var(--info)" font-size="9.5" font-family="var(--font-mono)">${ip}</text>` : ''}
          <text x="65" y="149" text-anchor="middle" fill="var(--success)" font-size="8.5" font-family="var(--font-mono)">${ext}</text>
        </g>
      `;
    },

    // IP PBX Server (Asterisk / VoIP Server)
    pbx: function (opts = {}) {
      const state = opts.state || 'normal';
      const name = opts.name || 'IP PBX Server';
      const ip = opts.ip || '192.168.60.200';
      const strokeColor = state === 'aktif' ? 'var(--info)' : 'var(--primary)';

      return `
        <g class="device device--pbx" data-state="${state}" transform="${opts.transform || ''}">
          <title>${name}</title>
          <ellipse cx="65" cy="116" rx="44" ry="7" fill="#141518" opacity="0.06" />
          <rect x="20" y="30" width="90" height="68" rx="7" fill="#E8E6E0" stroke="${strokeColor}" stroke-width="2.5" />
          <rect x="25" y="36" width="80" height="14" rx="3" fill="#1A1D24" />
          <text x="65" y="46" text-anchor="middle" fill="var(--info)" font-size="7.5" font-weight="bold" font-family="var(--font-mono)">ASTERISK PBX</text>
          <!-- Phone Lines Status Matrix -->
          <circle cx="35" cy="62" r="3" fill="var(--success)" />
          <circle cx="47" cy="62" r="3" fill="var(--success)" />
          <circle cx="59" cy="62" r="3" fill="var(--warning)" />
          <circle cx="71" cy="62" r="3" fill="var(--text-dim)" />
          <circle cx="83" cy="62" r="3" fill="var(--text-dim)" />
          <text x="65" y="82" text-anchor="middle" fill="var(--success)" font-size="7.5" font-family="var(--font-mono)">SIP TRUNK (5 ch)</text>
          <!-- Label -->
          <text x="65" y="125" text-anchor="middle" fill="var(--text)" font-size="11.5" font-weight="750">${name}</text>
          ${ip ? `<text x="65" y="138" text-anchor="middle" fill="var(--info)" font-size="10" font-family="var(--font-mono)">${ip}</text>` : ''}
        </g>
      `;
    },

    // Global Hyperscale Data Center Rack (Google / AWS Data Center)
    datacenter: function (opts = {}) {
      const state = opts.state || 'normal';
      const name = opts.name || 'Google Data Center';
      const region = opts.region || 'Region: Singapore (asia-southeast1)';
      const ip = opts.ip || '142.250.190.46';
      const strokeColor = state === 'aktif' ? 'var(--info)' : 'var(--success)';

      return `
        <g class="device device--datacenter" data-state="${state}" transform="${opts.transform || ''}">
          <title>${name}</title>
          <ellipse cx="65" cy="118" rx="48" ry="8" fill="#141518" opacity="0.08" />
          <!-- Chassis Rack Tower -->
          <rect x="15" y="18" width="100" height="88" rx="8" fill="#2D3039" stroke="${strokeColor}" stroke-width="2.5" />
          <!-- Server Blade Unit 1 -->
          <rect x="22" y="26" width="86" height="18" rx="3" fill="#D5D2C8" stroke="var(--border)" stroke-width="1" />
          <circle cx="30" cy="35" r="2.5" fill="var(--success)" />
          <circle cx="38" cy="35" r="2.5" fill="var(--info)" />
          <rect x="48" y="32" width="45" height="5" rx="1" fill="#1A1D24" />
          <!-- Server Blade Unit 2 -->
          <rect x="22" y="48" width="86" height="18" rx="3" fill="#D5D2C8" stroke="var(--border)" stroke-width="1" />
          <circle cx="30" cy="57" r="2.5" fill="var(--success)" />
          <circle cx="38" cy="57" r="2.5" fill="var(--success)" />
          <rect x="48" y="54" width="45" height="5" rx="1" fill="#1A1D24" />
          <!-- Storage Array Disk Unit 3 -->
          <rect x="22" y="70" width="86" height="24" rx="3" fill="#D5D2C8" stroke="var(--border)" stroke-width="1" />
          <circle cx="30" cy="82" r="2.5" fill="var(--warning)" />
          <circle cx="38" cy="82" r="2.5" fill="var(--success)" />
          <circle cx="46" cy="82" r="2.5" fill="var(--info)" />
          <text x="80" y="86" text-anchor="middle" fill="var(--info)" font-size="7" font-weight="bold" font-family="var(--font-mono)">100 TB SSD</text>
          <!-- Label -->
          <text x="65" y="124" text-anchor="middle" fill="var(--text)" font-size="11" font-weight="750">${name}</text>
          ${ip ? `<text x="65" y="136" text-anchor="middle" fill="var(--info)" font-size="9" font-family="var(--font-mono)">${ip}</text>` : ''}
          ${region ? `<text x="65" y="147" text-anchor="middle" fill="var(--success)" font-size="7.5" font-family="var(--font-mono)">${region}</text>` : ''}
        </g>
      `;
    },

    // CDN Edge Node (Content Delivery Network / Google Global Cache)
    cdn: function (opts = {}) {
      const state = opts.state || 'normal';
      const name = opts.name || 'Google CDN Edge (Jakarta)';
      const ip = opts.ip || 'PoP: Cyber 1 (JKT)';
      const strokeColor = state === 'aktif' ? 'var(--info)' : 'var(--warning)';

      return `
        <g class="device device--cdn" data-state="${state}" transform="${opts.transform || ''}">
          <title>${name}</title>
          <ellipse cx="65" cy="116" rx="44" ry="7" fill="#141518" opacity="0.06" />
          <rect x="18" y="28" width="94" height="72" rx="8" fill="#D5D2C8" stroke="${strokeColor}" stroke-width="2.5" />
          <rect x="24" y="34" width="82" height="14" rx="3" fill="#1A1D24" />
          <text x="65" y="44" text-anchor="middle" fill="var(--warning)" font-size="8" font-weight="bold" font-family="var(--font-mono)"> CDN EDGE CACHE</text>
          <!-- Cache Hits Bar -->
          <rect x="24" y="54" width="82" height="8" rx="2" fill="#2D3039" />
          <rect x="24" y="54" width="68" height="8" rx="2" fill="var(--success)" />
          <text x="65" y="74" text-anchor="middle" fill="var(--success)" font-size="7.5" font-family="var(--font-mono)">Cache HIT: 94.2%</text>
          <circle cx="32" cy="88" r="3" fill="var(--success)" />
          <circle cx="44" cy="88" r="3" fill="var(--info)" />
          <text x="75" y="91" text-anchor="middle" fill="var(--text-muted)" font-size="7" font-family="var(--font-mono)">DASH Video 4K</text>
          <!-- Label -->
          <text x="65" y="125" text-anchor="middle" fill="var(--text)" font-size="11" font-weight="750">${name}</text>
          ${ip ? `<text x="65" y="138" text-anchor="middle" fill="var(--warning)" font-size="9" font-family="var(--font-mono)">${ip}</text>` : ''}
        </g>
      `;
    }
  };


  /* --------------------------------------------------------------------------
     2. WINDOW.ANIMENGINE — LOGIKA & PENGENDALI SIMULASI
     -------------------------------------------------------------------------- */
  const AnimEngine = {
    sims: {},

    register: function (config) {
      if (!config || !config.id) return;
      const simId = config.id;

      this.sims[simId] = {
        config: config,
        currentStep: 0,
        isPlaying: false,
        timer: null,
        speed: 1.0,
        stageEl: null,
        narrationEl: null,
        badgeEl: null,
        playBtn: null,
        prevBtn: null,
        nextBtn: null
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this._initSimDOM(simId));
      } else {
        this._initSimDOM(simId);
      }
    },

    _initSimDOM: function (simId) {
      const sim = this.sims[simId];
      if (!sim) return;

      const container = document.getElementById(simId);
      if (!container) return;

      sim.stageEl = container.querySelector('.sim__stage');
      sim.narrationEl = container.querySelector('.sim__text');
      sim.badgeEl = container.querySelector('.sim__step-badge');

      const playBtn = container.querySelector('[data-action="play"]');
      const prevBtn = container.querySelector('[data-action="prev"]');
      const nextBtn = container.querySelector('[data-action="next"]');
      const resetBtn = container.querySelector('[data-action="reset"]');
      const speedInput = container.querySelector('[data-action="speed"]');

      sim.playBtn = playBtn;
      sim.prevBtn = prevBtn;
      sim.nextBtn = nextBtn;

      if (playBtn) playBtn.addEventListener('click', () => this.togglePlay(simId));
      if (prevBtn) prevBtn.addEventListener('click', () => this.prev(simId));
      if (nextBtn) nextBtn.addEventListener('click', () => this.next(simId));
      if (resetBtn) resetBtn.addEventListener('click', () => this.reset(simId));
      if (speedInput) {
        speedInput.addEventListener('input', (e) => {
          this.setSpeed(simId, parseFloat(e.target.value));
        });
      }

      this.goToStep(simId, 0);
    },

    setSpeed: function (simId, multiplier) {
      const sim = this.sims[simId];
      if (!sim) return;
      sim.speed = multiplier || 1.0;
    },

    togglePlay: function (simId) {
      const sim = this.sims[simId];
      if (!sim) return;
      if (sim.isPlaying) {
        this.pause(simId);
      } else {
        this.play(simId);
      }
    },

    play: function (simId) {
      const sim = this.sims[simId];
      if (!sim) return;

      if (sim.currentStep >= sim.config.langkah.length - 1) {
        sim.currentStep = -1;
      }

      sim.isPlaying = true;
      if (sim.playBtn) sim.playBtn.innerHTML = ' Jeda';
      this._runNextStepLoop(simId);
    },

    pause: function (simId) {
      const sim = this.sims[simId];
      if (!sim) return;
      sim.isPlaying = false;
      if (sim.timer) clearTimeout(sim.timer);
      if (sim.playBtn) sim.playBtn.innerHTML = '▶ Putar';
    },

    reset: function (simId) {
      const sim = this.sims[simId];
      if (!sim) return;
      this.pause(simId);
      this.clearStage(simId);
      this.goToStep(simId, 0);
    },

    next: function (simId) {
      const sim = this.sims[simId];
      if (!sim) return;
      this.pause(simId);
      if (sim.currentStep < sim.config.langkah.length - 1) {
        this.goToStep(simId, sim.currentStep + 1);
      }
    },

    prev: function (simId) {
      const sim = this.sims[simId];
      if (!sim) return;
      this.pause(simId);
      if (sim.currentStep > 0) {
        this.goToStep(simId, sim.currentStep - 1);
      }
    },

    goToStep: function (simId, stepIndex) {
      const sim = this.sims[simId];
      if (!sim || !sim.config.langkah || !sim.config.langkah[stepIndex]) return;

      sim.currentStep = stepIndex;
      const totalSteps = sim.config.langkah.length;
      const stepData = sim.config.langkah[stepIndex];

      if (sim.badgeEl) sim.badgeEl.textContent = `Langkah ${stepIndex + 1} dari ${totalSteps}`;
      if (sim.narrationEl) sim.narrationEl.textContent = stepData.narasi || '';

      if (sim.prevBtn) sim.prevBtn.disabled = stepIndex === 0;
      if (sim.nextBtn) sim.nextBtn.disabled = stepIndex === totalSteps - 1;

      if (typeof stepData.aksi === 'function') {
        const ctx = this._createContext(simId);
        stepData.aksi(ctx);
      }
    },

    _runNextStepLoop: function (simId) {
      const sim = this.sims[simId];
      if (!sim || !sim.isPlaying) return;

      const nextStep = sim.currentStep + 1;
      if (nextStep < sim.config.langkah.length) {
        this.goToStep(simId, nextStep);
        const stepData = sim.config.langkah[nextStep];
        const baseDuration = stepData.durasi || 2200;
        const actualDuration = baseDuration / sim.speed;

        sim.timer = setTimeout(() => {
          this._runNextStepLoop(simId);
        }, actualDuration);
      } else {
        this.pause(simId);
      }
    },

    _createContext: function (simId) {
      const self = this;
      return {
        simId: simId,
        stage: this.sims[simId].stageEl,
        createRawPayload: (node, text, opts) => self.createRawPayload(simId, node, text, opts),
        encapsulatePacket: (node, payloadText, headerOpts, opts) => self.encapsulatePacket(simId, node, payloadText, headerOpts, opts),
        movePacket: (fromNode, toNode, opts) => self.movePacket(simId, fromNode, toNode, opts),
        inspectSwitch: (node, info, opts) => self.inspectSwitch(simId, node, info, opts),
        decapsulatePacket: (node, payloadText, opts) => self.decapsulatePacket(simId, node, payloadText, opts),
        dropPacket: (node, alasan) => self.dropPacket(simId, node, alasan),
        arrive: (node, opts) => self.arrive(simId, node, opts),
        highlight: (element, warna) => self.highlight(simId, element, warna),
        showLabel: (node, teks, opts) => self.showLabel(simId, node, teks, opts),
        clear: () => self.clearStage(simId)
      };
    },

    /* --------------------------------------------------------------------------
       3. KALKULASI KOORDINAT PRESISI (Mencegah elemen numpuk di pojok kiri)
       -------------------------------------------------------------------------- */
    _getNodeCoords: function (simId, nodeRef) {
      const sim = this.sims[simId];
      if (!sim || !sim.stageEl) return { x: 400, y: 180 };
      if (typeof nodeRef === 'object' && nodeRef.x !== undefined) return nodeRef;

      const svg = sim.stageEl.querySelector('svg');
      if (!svg) return { x: 400, y: 180 };

      const el = svg.querySelector(`#${nodeRef}`) || svg.querySelector(`[data-node="${nodeRef}"]`);
      if (!el) return { x: 400, y: 180 };

      // 1. Cek koordinat pusat langsung dari data-cx / data-cy (Paling Akurat)
      if (el.dataset.cx && el.dataset.cy) {
        return {
          x: parseFloat(el.dataset.cx),
          y: parseFloat(el.dataset.cy)
        };
      }

      // 2. Cek atribut transform="translate(x, y)" pada elemen <g>
      let tx = 0, ty = 0;
      const transform = el.getAttribute('transform');
      if (transform) {
        const match = /translate\(\s*([-\d.]+)[,\s]+([-\d.]+)\s*\)/i.exec(transform);
        if (match) {
          tx = parseFloat(match[1]);
          ty = parseFloat(match[2]);
          // Tambahkan offset pusat standar perangkat (lebar 130px, tinggi 140px -> pusat di +65, +70)
          return { x: tx + 65, y: ty + 70 };
        }
      }

      // 3. Fallback jika ada id standar
      if (nodeRef.includes('hp')) return { x: 180, y: 180 };
      if (nodeRef.includes('switch')) return { x: 425, y: 180 };
      if (nodeRef.includes('laptop')) return { x: 670, y: 180 };

      return { x: 400, y: 180 };
    },

    // 1. Gelembung Teks Mentah (Raw Payload) di atas perangkat
    createRawPayload: function (simId, nodeRef, text = 'Halo Guru!', opts = {}) {
      const sim = this.sims[simId];
      if (!sim || !sim.stageEl) return;
      const svg = sim.stageEl.querySelector('svg');
      if (!svg) return;

      const coords = this._getNodeCoords(simId, nodeRef);
      const targetY = coords.y - 75; // Berada persis di atas smartphone

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'raw-payload-bubble');
      g.setAttribute('transform', `translate(${coords.x}, ${targetY})`);

      g.innerHTML = `
        <rect x="-65" y="-14" width="130" height="28" rx="7" fill="#C8C5BC" stroke="var(--info)" stroke-width="1.8" />
        <polygon points="-5,14 0,20 5,14" fill="#C8C5BC" />
        <text x="0" y="4" text-anchor="middle" fill="#fff" font-size="10" font-weight="750" font-family="var(--font-body)"> "${text}"</text>
      `;

      svg.appendChild(g);

      if (g.animate) {
        g.animate([
          { opacity: 0, transform: `translate(${coords.x}px, ${targetY + 15}px) scale(0.7)` },
          { opacity: 1, transform: `translate(${coords.x}px, ${targetY}px) scale(1)` }
        ], { duration: 350, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' });
      }
    },

    // 2. Membungkus payload ke dalam Amplop Paket Data
    encapsulatePacket: function (simId, nodeRef, payloadText = 'Halo Guru!', headerOpts = {}, opts = {}) {
      const sim = this.sims[simId];
      if (!sim || !sim.stageEl) return;
      const svg = sim.stageEl.querySelector('svg');
      if (!svg) return;

      const coords = this._getNodeCoords(simId, nodeRef);
      const targetY = coords.y; // Berada tepat di jalur kabel

      // Hapus bubble chat mentah
      const oldBubble = svg.querySelector('.raw-payload-bubble');
      if (oldBubble) oldBubble.remove();

      // Hapus paket lama jika ada
      const oldPacket = svg.querySelector('.packet');
      if (oldPacket) oldPacket.remove();

      const packetG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      packetG.setAttribute('class', 'packet packet--envelope');
      packetG.setAttribute('transform', `translate(${coords.x}, ${targetY})`);

      const destIP = headerOpts.destIP || '192.168.1.50';
      const destMAC = headerOpts.destMAC || 'B2:34';

      packetG.innerHTML = `
        <!-- Glow Box -->
        <rect x="-60" y="-18" width="120" height="36" rx="8" fill="var(--info-glow)" filter="blur(3px)" />
        <!-- Amplop Box Utama -->
        <rect x="-55" y="-16" width="110" height="32" rx="6" fill="#D5D2C8" stroke="var(--primary)" stroke-width="2" />
        <!-- Header Strip Biru -->
        <rect x="-55" y="-16" width="110" height="13" rx="6" fill="var(--primary-soft)" />
        <rect x="-55" y="-8" width="110" height="5" fill="var(--primary-soft)" />
        <text x="0" y="-7" text-anchor="middle" fill="#93C5FD" font-size="7.8" font-family="var(--font-mono)" font-weight="bold">IP: ${destIP} | MAC: ${destMAC}</text>
        <!-- Isi Pesan Terkunci -->
        <text x="0" y="8" text-anchor="middle" fill="#F1F5FD" font-size="9" font-weight="700" font-family="var(--font-body)"> "${payloadText}"</text>
      `;

      svg.appendChild(packetG);

      if (packetG.animate) {
        packetG.animate([
          { transform: `translate(${coords.x}px, ${targetY - 40}px) scale(0.6)`, opacity: 0.2 },
          { transform: `translate(${coords.x}px, ${targetY}px) scale(1)`, opacity: 1 }
        ], { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' });
      }
    },

    // 3. Menggerakkan Paket Data sepanjang jalur kabel (y = 180)
    movePacket: function (simId, fromNode, toNode, opts = {}) {
      const sim = this.sims[simId];
      if (!sim || !sim.stageEl) return;
      const svg = sim.stageEl.querySelector('svg');
      if (!svg) return;

      const start = this._getNodeCoords(simId, fromNode);
      const end = this._getNodeCoords(simId, toNode);
      const duration = (opts.durasi || 1400) / (sim.speed || 1);

      let packet = svg.querySelector('.packet');
      if (!packet) {
        this.encapsulatePacket(simId, fromNode, 'Data', {});
        packet = svg.querySelector('.packet');
      }

      // Bersihkan HUD lama
      const oldHud = svg.querySelector('.switch-hud');
      if (oldHud) oldHud.remove();

      if (packet && packet.animate) {
        const anim = packet.animate([
          { transform: `translate(${start.x}px, ${start.y}px)` },
          { transform: `translate(${end.x}px, ${end.y}px)` }
        ], {
          duration: duration,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards'
        });

        anim.onfinish = () => {
          packet.setAttribute('transform', `translate(${end.x}, ${end.y})`);
          if (opts.onArrive) opts.onArrive();
        };
      }
    },

    // 4. Inspeksi Cerdas Switch (Membuka CAM Table Card di atas Switch)
    inspectSwitch: function (simId, nodeRef, info = {}, opts = {}) {
      const sim = this.sims[simId];
      if (!sim || !sim.stageEl) return;
      const svg = sim.stageEl.querySelector('svg');
      if (!svg) return;

      const coords = this._getNodeCoords(simId, nodeRef);
      const targetMAC = info.targetMAC || 'B2:34 (Laptop)';
      const forwardPort = info.forwardPort || 'Port 4';
      const targetY = coords.y - 95; // Berada tepat di atas switch

      // Flash LED Port pada Switch SVG
      const swLed = svg.querySelector('#sw-led-4');
      if (swLed) {
        swLed.setAttribute('fill', '#FBBF24');
        setTimeout(() => swLed.setAttribute('fill', 'var(--success)'), 1500);
      }

      const hudG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      hudG.setAttribute('class', 'switch-hud');
      hudG.setAttribute('transform', `translate(${coords.x}, ${targetY})`);

      hudG.innerHTML = `
        <rect x="-95" y="-24" width="190" height="48" rx="8" fill="#2D3039" stroke="var(--info)" stroke-width="1.8" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.5))" />
        <text x="-85" y="-9" fill="var(--info)" font-size="8.5" font-weight="bold" font-family="var(--font-mono)"> BACA CAM TABLE:</text>
        <text x="-85" y="4" fill="#E2E8F8" font-size="8" font-family="var(--font-mono)">Dest MAC: ${targetMAC}</text>
        <text x="-85" y="16" fill="var(--success)" font-size="8.5" font-weight="bold" font-family="var(--font-mono)">-> Teruskan ke: ${forwardPort} v</text>
      `;

      svg.appendChild(hudG);

      if (hudG.animate) {
        hudG.animate([
          { opacity: 0, transform: `translate(${coords.x}px, ${targetY + 15}px) scale(0.8)` },
          { opacity: 1, transform: `translate(${coords.x}px, ${targetY}px) scale(1)` }
        ], { duration: 350, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' });
      }
    },

    // 5. Membuka Paket di Laptop Penerima
    decapsulatePacket: function (simId, nodeRef, payloadText = 'Halo Guru!', opts = {}) {
      const sim = this.sims[simId];
      if (!sim || !sim.stageEl) return;
      const svg = sim.stageEl.querySelector('svg');
      if (!svg) return;

      const coords = this._getNodeCoords(simId, nodeRef);
      const targetY = coords.y - 80;
      const packet = svg.querySelector('.packet');

      // Animasi paket menghilang
      if (packet && packet.animate) {
        const fade = packet.animate([
          { transform: `translate(${coords.x}px, ${coords.y}px) scale(1)`, opacity: 1 },
          { transform: `translate(${coords.x}px, ${coords.y - 20}px) scale(1.15)`, opacity: 0 }
        ], { duration: 350, fill: 'forwards' });
        fade.onfinish = () => packet.remove();
      }

      // Tampilkan Kartu Sukses Diterima
      const successG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      successG.setAttribute('class', 'received-success-card');
      successG.setAttribute('transform', `translate(${coords.x}, ${targetY})`);

      successG.innerHTML = `
        <rect x="-75" y="-18" width="150" height="38" rx="8" fill="#F0FDF4" stroke="var(--success)" stroke-width="2" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.5))" />
        <text x="0" y="-3" text-anchor="middle" fill="#5EEAD4" font-size="8.5" font-weight="bold" font-family="var(--font-mono)">v DATA DITERIMA LENGKAP</text>
        <text x="0" y="11" text-anchor="middle" fill="#fff" font-size="10" font-weight="750" font-family="var(--font-body)">"${payloadText}"</text>
      `;

      svg.appendChild(successG);

      if (successG.animate) {
        successG.animate([
          { opacity: 0, transform: `translate(${coords.x}px, ${targetY + 15}px) scale(0.7)` },
          { opacity: 1, transform: `translate(${coords.x}px, ${targetY}px) scale(1)` }
        ], { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' });
      }

      this.arrive(simId, nodeRef);
    },

    dropPacket: function (simId, atNode, alasan = 'Tidak ada jalur — Paket dibuang') {
      const sim = this.sims[simId];
      if (!sim || !sim.stageEl) return;
      const svg = sim.stageEl.querySelector('svg');
      if (!svg) return;

      const coords = this._getNodeCoords(simId, atNode);
      const packet = svg.querySelector('.packet');

      if (packet && packet.animate) {
        const anim = packet.animate([
          { transform: `translate(${coords.x}px, ${coords.y}px) scale(1)`, opacity: 1 },
          { transform: `translate(${coords.x}px, ${coords.y + 40}px) scale(0.3)`, opacity: 0 }
        ], {
          duration: 800 / (sim.speed || 1),
          easing: 'ease-in',
          fill: 'forwards'
        });
        anim.onfinish = () => packet.remove();
      }

      this.showLabel(simId, atNode, ` ${alasan}`, { color: 'var(--danger)', duration: 3000 });
    },

    arrive: function (simId, atNode) {
      const sim = this.sims[simId];
      if (!sim || !sim.stageEl) return;
      const svg = sim.stageEl.querySelector('svg');
      if (!svg) return;

      const coords = this._getNodeCoords(simId, atNode);
      const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      pulse.setAttribute('cx', coords.x);
      pulse.setAttribute('cy', coords.y);
      pulse.setAttribute('r', '15');
      pulse.setAttribute('fill', 'none');
      pulse.setAttribute('stroke', 'var(--success)');
      pulse.setAttribute('stroke-width', '2.5');
      svg.appendChild(pulse);

      if (pulse.animate) {
        const anim = pulse.animate([
          { r: 15, opacity: 1, strokeWidth: 3 },
          { r: 50, opacity: 0, strokeWidth: 0 }
        ], {
          duration: 750 / (sim.speed || 1),
          iterations: 2,
          easing: 'ease-out'
        });
        anim.onfinish = () => pulse.remove();
      }
    },

    highlight: function (simId, elementId, color = 'var(--info)') {
      const sim = this.sims[simId];
      if (!sim || !sim.stageEl) return;
      const svg = sim.stageEl.querySelector('svg');
      if (!svg) return;

      const el = typeof elementId === 'string' ? svg.querySelector(`#${elementId}`) : elementId;
      if (!el) return;

      el.style.transition = 'all 300ms ease';
      el.style.filter = `drop-shadow(0 0 12px ${color})`;

      setTimeout(() => {
        el.style.filter = '';
      }, 1400);
    },

    showLabel: function (simId, atNode, teks, opts = {}) {
      const sim = this.sims[simId];
      if (!sim || !sim.stageEl) return;
      const svg = sim.stageEl.querySelector('svg');
      if (!svg) return;

      const coords = this._getNodeCoords(simId, atNode);
      const color = opts.color || 'var(--text)';
      const duration = opts.duration || 2200;
      const targetY = coords.y - 75;

      const labelG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      labelG.setAttribute('class', 'sim-floating-label');
      labelG.setAttribute('transform', `translate(${coords.x}, ${targetY})`);

      labelG.innerHTML = `
        <rect x="-80" y="-12" width="160" height="24" rx="6" fill="#1A1D24" stroke="${color}" stroke-width="1.8" />
        <text x="0" y="4" text-anchor="middle" fill="${color}" font-size="9.5" font-weight="750" font-family="var(--font-body)">${teks}</text>
      `;

      svg.appendChild(labelG);

      if (labelG.animate) {
        labelG.animate([
          { opacity: 0, transform: `translate(${coords.x}px, ${targetY + 12}px)` },
          { opacity: 1, transform: `translate(${coords.x}px, ${targetY}px)` }
        ], { duration: 300, fill: 'forwards' });

        setTimeout(() => {
          const fade = labelG.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350 });
          fade.onfinish = () => labelG.remove();
        }, duration);
      }
    },

    clearStage: function (simId) {
      const sim = this.sims[simId];
      if (!sim || !sim.stageEl) return;
      const svg = sim.stageEl.querySelector('svg');
      if (!svg) return;

      const elements = svg.querySelectorAll('.packet, .raw-payload-bubble, .switch-hud, .received-success-card, .sim-floating-label');
      elements.forEach(el => el.remove());
    }
  };

  window.AnimEngine = AnimEngine;
})();
