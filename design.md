# DESIGN SPECIFICATION — Anti-Slop Editorial Design System (TasteSkill v2 Inspired)

> **Design Read:**  
> *"Reading this as: Interactive web learning platform for vocational networking students (SMK TKJ), with an editorial minimalist design language inspired by TasteSkill v2 aesthetic (living warm bone canvas with subtle organic micro-dot mesh, ultra-crisp typography with selective italic accents, elevated white cards with delicate neutral borders, monochrome tactile buttons without raw arrow symbols, zero-slop icons, and smooth cubic-bezier micro-motion)."*

---

## 1. The Three Dials (Configuration)

Following the `design-taste-frontend` specification:

* **`DESIGN_VARIANCE: 6`** — Disciplined editorial structure with asymmetric rhythm, balanced whitespace, and clear 7-block hierarchy.
* **`MOTION_INTENSITY: 4`** — Smooth, motivated micro-interactions with cubic-bezier physics (`cubic-bezier(0.16, 1, 0.3, 1)`); page load entry transitions, tactile button press (`scale(0.97)`), and card hover elevations.
* **`VISUAL_DENSITY: 3`** — High breathing room, calm whitespace, and zero visual clutter to maximize cognitive retention and focus.

---

## 2. Anti-Slop Audit & Rules

### What Is BANNED (Eliminated AI Clichés):
- ❌ **No AI-Purple / Cyberpunk Neon:** Banned all electric cyan, neon purple, and glowing `box-shadow` borders.
- ❌ **No Decorative Emoji Clutter:** Removed 100% emojis (`📖`, `❓`, `💡`, `▶️`, `🔧`, `📋`, `🎯`, `✅`, `👨‍🏫`, `🚀`, `🌊`, `⚡`, `🔒`, `🛡`, `🗣`, `🔓`, `🔄`) from headers, badges, buttons, and technical explanations. Replaced with clean typographic markers.
- ❌ **No Rainbow Cards or Colored Left Border Strips:** Banned giving cards and sub-boxes thick colored left stripes (`border-left: 3px solid ...`). All cards and inset boxes share clean 1px hairline borders (`#E6E4DD`).
- ❌ **No Raw Arrow Symbols in Buttons:** Removed raw symbols like `←`, `<-`, `➔`, `->` from back buttons, pills, and navigation labels. Clean text typography is used instead (e.g., `Daftar Modul`, `Buka Modul`).
- ❌ **No Flat Dead Background:** Avoided plain lifeless gray/white sheets by applying a living tactile background texture with ambient radial warmth and fine micro-dot mesh.

### What Is ADOPTED (TasteSkill v2 Living Aesthetic):
- ✅ **Living Warm Bone Canvas:** Organic light background (`#F7F6F2`) with subtle top ambient radial illumination and a delicate 24px micro-dot mesh.
- ✅ **High-Contrast Surface Elevation:** Pure white (`#FFFFFF`) card containers with subtle warm ambient shadow (`0 2px 10px rgba(20, 21, 24, 0.04)`).
- ✅ **Editorial Typography Hierarchy:** Bold sans-serif display titles paired with elegant italic highlights for key concepts (e.g. *Dasar Jaringan.*, *Model OSI.*).
- ✅ **Monochrome Tactile Controls:** Solid dark pill buttons (`#141518`) with crisp white typography, smooth cubic-bezier transitions, and physical push feedback (`scale(0.97)` on active).
- ✅ **Restrained Singular Accent:** Warm terracotta rust (`#E05A44`) and subtle deep cobalt (`#1E3A8A`) strictly reserved for active states, packet paths, and section indicators.

---

## 3. Design Tokens & Color Palette

```css
:root {
  /* Canvas & Backgrounds (Warm Paper & Editorial Neutral) */
  --bg-canvas:       #F7F6F2;   /* Latar halaman utama (warm bone/paper) */
  --bg-surface:      #FFFFFF;   /* Kartu utama (pure elevated white) */
  --bg-subtle:       #EFECE6;   /* Kartu sekunder / panel hook / inset */
  --bg-inset:        #F3F1EC;   /* Kotak definisi, miskonsepsi, analogi */
  --bg-dark:         #141518;   /* Terminal, dark pills, code snippets */
  
  /* Hairline Borders */
  --border-subtle:   #E6E4DD;   /* Border kartu standar */
  --border-strong:   #D5D2C8;   /* Border tombol outline / divider */
  --border-dark:     #2D3039;   /* Border untuk komponen gelap */

  /* Tipografi & Kontras Teks */
  --text-primary:    #141518;   /* Teks utama (near black, tajam, mudah dibaca) */
  --text-secondary:  #4B505D;   /* Teks body & deskripsi (calm slate) */
  --text-muted:      #787F91;   /* Caption, metadata, timestamp */
  --text-inverse:    #FFFFFF;   /* Teks di atas tombol gelap / terminal */

  /* Akses & Status Terkalibrasi (Muted, Non-Neon) */
  --accent-rust:     #E05A44;   /* Aksen terracotta TasteSkill (live/active dot, CTA badge) */
  --accent-rust-soft:#FDF2EF;   /* Background badge aksen */
  
  --semantic-success:#15803D;   /* Emerald matang: Quest Benar / Ping Reply */
  --semantic-success-soft: #F0FDF4;
  
  --semantic-danger: #B91C1C;   /* Crimson tenang: Packet Drop / Jawaban Salah */
  --semantic-danger-soft:  #FEF2F2;
  
  --semantic-warning:#B45309;   /* Amber editorial: Sering Keliru / Perhatian */
  --semantic-warning-soft: #FFFBEB;

  --semantic-info:   #1D4ED8;   /* Royal Blue: Paket data bergerak / Link */
  --semantic-info-soft:    #EFF6FF;

  /* Font Stacks */
  --font-display:    "Plus Jakarta Sans", "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-body:       "Plus Jakarta Sans", "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono:       "SF Mono", "Geist Mono", "JetBrains Mono", Consolas, monospace;

  /* Corner Radius Scale (Harmonious & Consistent) */
  --radius-sm:       8px;       /* Input, code badge */
  --radius-md:       14px;      /* Step cards, sub-panels */
  --radius-lg:       20px;      /* Primary cards, containers */
  --radius-full:     9999px;    /* Pill badges, buttons, chips */

  /* Shadows (Subtle, Organic, Tinted) */
  --shadow-sm:       0 1px 3px rgba(20, 21, 24, 0.04);
  --shadow-md:       0 4px 16px rgba(20, 21, 24, 0.06);
  --shadow-lg:       0 12px 32px rgba(20, 21, 24, 0.08);

  /* Motion & Easing */
  --ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 4. Living Background Canvas Specification

To ensure the web feels organic, tactile, and living (never flat or dead):

```css
body {
  background-color: #F7F6F2;
  background-image:
    radial-gradient(ellipse 70% 360px at 50% 0%, rgba(255, 255, 255, 0.95) 0%, transparent 100%),
    radial-gradient(circle 800px at 100% 0%, rgba(224, 90, 68, 0.02) 0%, transparent 70%),
    radial-gradient(circle at 1px 1px, rgba(20, 21, 24, 0.045) 1px, transparent 0);
  background-size: 100% 100%, 100% 100%, 24px 24px;
  background-attachment: fixed;
}
```

---

## 5. Animation, Motion, and Micro-Interactions

### 5.1 Page & Content Entry Transitions
```css
@keyframes pageFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-content,
.content-area,
.portal-module-list {
  animation: pageFadeIn 350ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

### 5.2 Tactile Button Feedback
```css
.btn-sim,
.btn-reveal,
.btn--primary,
.btn-back,
.btn {
  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
              background-color 180ms ease,
              border-color 180ms ease,
              box-shadow 180ms ease;
}

.btn-sim:hover:not(:disabled),
.btn-reveal:hover,
.btn--primary:hover,
.btn-back:hover,
.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(20, 21, 24, 0.05);
}

.btn-sim:active:not(:disabled),
.btn-reveal:active,
.btn--primary:active,
.btn-back:active,
.btn:active {
  transform: scale(0.97) translateY(0);
}
```

---

## 6. Component System (Anti-Slop Redesign)

### 6.1 Eyebrow & Pill Badges
```html
<span class="block-badge">Blok 1 - Masalah Nyata</span>
```
- Shape: Full pill (`rounded-full`)
- Border: 1px subtle neutral border (`border: 1px solid #E6E4DD`)
- Colors: Soft neutral background (`#F3F1EC`) with dark slate text (`#141518`). Unified across all blocks.

### 6.2 Header Navigation
- Height: `64px`, sticky with clean background blur (`background: rgba(247, 246, 242, 0.92)`).
- Left: Back link button (`Daftar Modul` without raw arrows) styled as a sleek white pill.
- Center/Title: Crisp module title with breadcrumb.
- Right: Monospaced meta badges (`Estimasi: 120-150 Menit`, `Quest: 0 / 16`).

### 6.3 7-Blok Pembelajaran Cards
Every block sits on a pure white surface (`#FFFFFF`) with a 1px border (`#E6E4DD`), comfortable inner padding (`32px` desktop, `20px` mobile), and a minimal typographic block header (`Blok 1 - Masalah Nyata`, `Blok 2 - Konsep Inti & Definisi`, `Blok 3 - Simulasi Interaktif`, `Blok 4 - Detail Teknis`, `Blok 5 - Studi Kasus`, `Blok 6 - Quest Uji Pemahaman`, `Blok 7 - Pembahasan`):

1. **Blok 1 Masalah (Hook):** Inset card with warm tint background (`#F3F1EC`), clean problem statement, and question callout box without thick colored stripes.
2. **Blok 2 Konsep & Analogi:** Clear definition card with paired real-world analogies structured in a clean list or grid.
3. **Blok 3 Simulasi Interaktif:** Minimalist blueprint stage with light neutral grid, crisp vector devices, step counter pill, and solid monochrome playback controls (`Putar`, `Mundur`, `Maju`, `Reset`).
4. **Blok 4 Detail Teknis:** High-contrast step cards, calculation boxes with monospace font, and clean tables with subtle zebra striping.
5. **Blok 5 Studi Kasus:** Clean workplace scenario card with step-by-step resolution pills and a highlighted "Pelajaran yang Diambil" takeaway box.
6. **Blok 6 Quest Uji Pemahaman:** Refined card with radio choice list, hover border transitions, and prominent "Tampilkan Jawaban" button.
7. **Blok 7 Pembahasan Jawaban:** Slide-down explanation box with emerald badge, detailed reasoning, and linked animation replay.

### 6.4 Terminal CLI & Code Containers
- Housing: Dark slate (`#141518`), `radius-md` (14px).
- Window Header: 3 subtle monochrome traffic light dots + terminal title + copy button (`COPY` icon).
- Body: Monospace syntax highlighting (Prompt: `#2DD4BF`, Command: `#FFFFFF`, Comment: `#787F91`).

### 6.5 Buttons & CTAs
- **Primary CTA:** Solid Dark Pill (`#141518` background, `#FFFFFF` text, `border-radius: 9999px`, font-weight `600`, text `Buka Modul`).
- **Secondary CTA:** Crisp White Pill (`#FFFFFF` background, `#141518` text, `border: 1px solid #D5D2C8`).
- **Interactive Feedback:** `-translate-y-[1px]` on hover, `scale-[0.97]` on active push.

---

## 7. Responsive Behavior
- **Desktop (1024px+):** Left sticky sidebar navigation (`260px`) pinned smoothly during scroll + Centered content (`880px`).
- **Tablet (768px - 1023px):** Sidebar converts into a top dropdown pill selector (`Lompat ke sub-topik`).
- **Mobile (< 768px):** Padding reduces to `16px`, full-width cards, touch targets minimum `44px`, zero horizontal scrolling (`overflow-x: clip`).
