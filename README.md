# Our First Month ♡ — A Romantic Interactive Love Letter

An interactive romantic anniversary website created for a couple celebrating their first month together. Built with React, TypeScript, Tailwind CSS, and Three.js, focusing exclusively on heartfelt love messages, an interactive 3D diary, delicate animations, a secret anniversary letter lock, and romantic piano melody.

---

## ✨ Features

- **3D Interactive Diary Opening Scene**: A closed pink-and-cream leather diary with cream paper edge textures, golden embossed heart, and satin ribbon bookmark that swings open smoothly in 3D with warm glowing light.
- **Romantic Secret Letter Unlock**: Six-digit passcode (`030969`) with leading zero preserved, interactive hint modal revealing `0309XX`, mobile numeric keyboard support, friendly retry messages, and animated wax seal opening.
- **Immersive 3D Love World**: Translucent 3D glass hearts, drifting rose sparkles, and delicate paper particles floating in a soft pastel pink and ivory sky powered by Three.js with smooth parallax movement.
- **Emotional Progression Diary (4 Pages)**:
  - Page 1 — A Cute Beginning (*รู้มั้ยว่า…*)
  - Page 2 — Little Things I Love About You (*สิ่งเล็ก ๆ ที่เค้าชอบในตัวเธอ*)
  - Page 3 — You Make My Days Special (*ขอบคุณที่เข้ามาในชีวิตเค้านะ*)
  - Page 4 — One Month With You (*สุขสันต์วันครบรอบหนึ่งเดือนนะ*)
- **The Main Love Letter**: Cream-colored parchment with delicate rose borders, heartwarming text, authentic handwritten signature (*จากเค้า*), and re-read/fold interactions.
- **Interactive Romantic Love Coupons (4 Coupons)**:
  - 🎫 คูปองกอดแน่น ๆ ฟรี ไม่มีวันหมดอายุ
  - 🎫 คูปองตามใจหนึ่งวัน (เธอเลือกกินอะไรเค้าตามใจหมด)
  - 🎫 คูปองนั่งฟังเธอเล่าเรื่องเรื่อยเปื่อยจนหลับ
  - 🎫 คูปองให้อภัยทันทีเมื่อเค้างอแง
  - Interactive "Redeem" action with pink heart wax/ink seal stamp animation, sparkling audio chime, and saved redemption status in `localStorage`.
- **Closing Scene**: Delicate floating heart, anniversary reflection (*หนึ่งเดือนของเรา และอีกหลายหน้าที่รอให้เราเขียนด้วยกัน ♡*), and an interactive *"ส่งกอดให้เธอ ♡"* button triggering a burst of floating hearts and sweet affectionate message (*กอดแน่น ๆ เลยนะคนเก่งของเค้า*).
- **Graceful Piano Audio Player**: Configurable for `public/audio/piano.mp3` with manual play/pause and volume control. If the MP3 file is not yet added, the app gracefully falls back to a gentle synthesized romantic piano lullaby created via the Web Audio API.
- **Anti-Photo Policy**: 100% focused on typography, 3D paper textures, lighting, and love messages (no photos or image galleries).
- **Mobile-First & Accessible**: Fluid typography, responsive layout, touch-friendly inputs, zero overflow, and `prefers-reduced-motion` compliance.

---

## 🔐 Passcode Verification

- **Correct Code**: `030969`
- **Hint Revealed**: `0309XX`
- The passcode is treated strictly as a string to preserve the leading zero `0`.
- The code only unlocks the letter within the app; the website itself is public and does not require authentication.

---

## 🎵 Adding Your Custom Piano Music

1. Obtain your favorite gentle piano instrumental MP3 file.
2. Place the audio file at:
   ```
   public/audio/piano.mp3
   ```
3. When visitors click the music button in the top bar, it will play your uploaded MP3 track.
4. If this file is omitted, the app automatically plays a romantic Web Audio synthesized piano melody so the experience is never silent or broken.

---

## ✍️ Customizing Messages and Text

All texts, dates, names, secrets, hints, and letter paragraphs are cleanly organized in one single configuration file:

```
src/config/loveContent.ts
```

In that file, you can easily change:
- `secretCodeConfig.code`: Change the 6-digit passcode (e.g. `'030969'`)
- `secretCodeConfig.hint`: Change the hint (e.g. `'0309XX'`)
- `diaryPages`: Change the headings and messages for all 4 chapters
- `mainLetter`: Edit salutation, paragraphs, closing signature, and date
- `finalScene`: Edit the final message and the hug response

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18+ or 20+)
- npm or bun

### 1. Installation
```bash
npm install
```

### 2. Local Development
To run the development server on `http://localhost:3000`:
```bash
npm run dev
```

### 3. Production Build
To create an optimized production build:
```bash
npm run build
```
The output files will be in the `dist` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Public Deployment Instructions

You can deploy this website to any static hosting service in just minutes:

### Deploying to Vercel
1. Install Vercel CLI (or connect your Git repository on [vercel.com](https://vercel.com)):
   ```bash
   npm i -g vercel
   vercel
   ```
2. Set Build Command: `npm run build`
3. Set Output Directory: `dist`
4. Share the generated HTTPS link with your special person!

### Deploying to Netlify
1. Create a `_redirects` file in `public/` containing `/* /index.html 200` (or configure in Netlify UI).
2. Connect your Git repository or drag-and-drop the `dist` folder into Netlify Drop.
3. Set Build Command: `npm run build`
4. Set Publish Directory: `dist`

---

## 📜 License
Apache-2.0
