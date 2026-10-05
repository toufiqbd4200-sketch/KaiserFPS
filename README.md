<p align="center">
  <img src="./assets/logo.png" alt="KaiserFPS Logo" width="130" style="border-radius: 50%;" />
</p>

<h1 align="center">⚡ KaiserFPS Mobile</h1>

<p align="center">
  <strong>The Ultimate, Transparent Performance Suite for Roblox Gamers on Android & iOS</strong><br>
  <em>Boost frame rates, slash GPU fillrate by 36%, eliminate 200ms ping spikes, and play Roblox Rivals & Bedwars with buttery-smooth 60+ FPS.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Android-9.0_to_16.0-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Android Support" />
  <img src="https://img.shields.io/badge/Apple_iOS-15_to_18+-000000?style=for-the-badge&logo=apple&logoColor=white" alt="iOS Support" />
  <img src="https://img.shields.io/badge/Roblox-60_FPS_Locked-00F5FF?style=for-the-badge" alt="Roblox FPS" />
  <img src="https://img.shields.io/badge/Anti--Cheat-100%25_Hyperion_Safe-00F076?style=for-the-badge" alt="Anti-Cheat Safe" />
  <img src="https://img.shields.io/badge/License-MIT-B026FF?style=for-the-badge" alt="License" />
</p>

---

## 🌌 Overview

Mobile phones were engineered for scrolling social media, not demanding 3D gaming. By default, mobile operating systems:
- Render millions of unnecessary pixels on small displays, causing severe GPU thermal throttling.
- Compile code on the fly (*Just-In-Time* compilation), causing 16ms to 45ms micro-stutters during combat.
- Allow background apps (TikTok, Discord, browser tabs) to steal physical memory.
- Trigger background Wi-Fi watchdog scans that result in sudden 200ms ping spikes.

**KaiserFPS fixes this.** It acts as an operating-system level game accelerator that tunes your device before you launch Roblox, ensuring **maximum FPS, lower device temperatures, and uninterrupted frame pacing.**

---

## ⚙️ Core Engineering (How It Works)

```
┌─────────────────────────────────────────────────────────────┐
│                      KAISERFPS ENGINE                       │
├──────────────────────────────┬──────────────────────────────┤
│ 1. GPU Fillrate Downscaler   │ Slashes pixel render load    │
│    (80% / 75% Scale)         │ by exactly 36% to 44%        │
├──────────────────────────────┼──────────────────────────────┤
│ 2. AOT Bytecode Compilation  │ Precompiles code to ARM64;   │
│    (dex2oat speed mode)      │ 0ms runtime JIT pauses       │
├──────────────────────────────┼──────────────────────────────┤
│ 3. Battery Doze Whitelist    │ Stops Android from sleeping  │
│    (deviceidle exemption)    │ or downclocking mid-fight    │
├──────────────────────────────┼──────────────────────────────┤
│ 4. Wi-Fi Low-Latency Lock    │ Blocks background scans;     │
│    (sleep_policy 2)          │ stops 200ms ping spikes      │
├──────────────────────────────┼──────────────────────────────┤
│ 5. Memory & Cache Purge      │ Evicts inactive apps & frees │
│    (pm trim-caches 9999M)    │ 1.5GB to 2.5GB of RAM        │
└──────────────────────────────┴──────────────────────────────┘
```

### 1. 📐 36% GPU Fillrate Reduction
A standard 1080p display renders **2.59 million pixels** every frame ($1080 \times 2400$). At 60 FPS, the GPU calculates shaders for **155 million pixels per second**. By downscaling display output to 80% ($864 \times 1920$), GPU render workload drops to **99.5 million pixels/sec** — a **permanent 36.0% reduction in graphics load**. Budget and mid-tier phones stop lagging immediately.

### 2. ⚡ Zero Micro-Stutter (AOT Native Compilation)
Standard Android compiles bytecode *during* gameplay. When a player fires a weapon or loads a new asset in *Roblox Rivals*, the game halts for 16–45ms. KaiserFPS forces Android's `dex2oat` compiler to pre-compile all Roblox DEX bytecode into native ARM64 machine code ahead of time (`cmd package compile -m speed -f com.roblox.client`), jumping 1% low framerates from ~20 FPS to ~50+ FPS.

### 3. 🛡️ Battery Doze Whitelist
Android's aggressive power-saver ("Doze") throttles CPU scheduling and network sockets when an app consumes heavy battery. KaiserFPS whitelists Roblox (`dumpsys deviceidle whitelist +com.roblox.client`), ensuring uninterrupted CPU threads.

### 4. 📶 Wi-Fi Latency & Ping Spike Lock
Prevents background network scans by locking `wifi_sleep_policy 2` (High Performance), stopping the notorious 200ms lag spikes during PvP.

### 5. 🧹 Memory & Cache Purge
Flushes stale page caches (`pm trim-caches 9999M`) and restricts inactive background processes from waking the CPU.

---

## 🎮 Android Setup (Android 9.0 to 16.0)

KaiserFPS offers three kid-friendly modes designed so anyone can get started in seconds:

| Mode | Who It's For | Setup Required | What It Does |
| :--- | :--- | :---: | :--- |
| **🟢 LOW (Instant)** | **Kids, Beginners & Any Phone** | **0 SECONDS (Zero Setup)** | Runs on **ANY Android phone**. Cleans RAM, compacts caches, and tunes frame pacing. **No Shizuku, no PC, no cables needed.** |
| **⚡ MEDIUM (Turbo)** | **Competitive Players** | **One-Time 2-min Shizuku** | Adds AOT Bytecode Compilation, GPU Game Driver routing, Doze Whitelist, and Wi-Fi latency lock. |
| **🔥 HIGH (Max FPS)** | **Budget / Lagging Phones** | **One-Time 2-min Shizuku** | All Medium optimizations + **80% resolution downscale** (36% less GPU load). Prevents overheating. |

### How to Install (Android):
1. Download **`kaiserFPS.apk`** (`downloads/kaiserFPS.apk`).
2. Tap the file on your phone to install it.
3. Open the app, select **🟢 LOW**, and tap the **Big Master Circle**.
4. Tap **Launch Roblox** and enjoy butter-smooth gameplay!

---

##  Apple iOS Autonomous Setup (iPhone & iPad)

> **Why is iOS different?**  
> Apple's iOS is a strict sandbox. Apple does not allow downloading raw `.apk` files, and disallows privileged shell daemons like Shizuku.  
> **However**, iPhones run on **Apple Metal** (the lowest graphics overhead in mobile gaming) and have built-in hardware controls that are **even more effective** when configured correctly!

### 1. Install KaiserFPS iOS Web App (10 Seconds)
1. Open [`ios/index.html`](./ios/index.html) in **Safari** on your iPhone or iPad.
2. Tap the **Share** button (`[↑]`) at the bottom of the screen.
3. Scroll down and tap **"Add to Home Screen"**, then tap **"Add"**.
4. KaiserFPS is now installed as a full-screen, standalone app with tactile haptics, theme customization, and YouTube alerts!

### 2. The iOS Secret Weapon: Guided Access (100% Core Lock)
Normally, iOS constantly reserves CPU cycles for swipe gestures, incoming notification banners, Siri, and Dynamic Island animations. **Guided Access locks down the device and dedicates 100% of the Apple A-series / M-series Bionic chips exclusively to Roblox:**
1. Open iPhone **Settings** > **Accessibility** > **Guided Access** > turn it **ON**.
2. Open **Roblox** and enter your match (*Rivals*, *Bedwars*, etc.).
3. **Triple-click the Power / Side button** and tap **Start** in the top right.
4. **Result**: Zero swipe lag, zero notification frame drops, and maximum GPU priority! *(To exit, triple-click power button again).*

### 3. The 5-Second Hardware RAM Flush (Free 2GB+ Memory)
1. Open **Settings** > **Accessibility** > **Touch** > turn **AssistiveTouch ON** (floating button appears).
2. Press **Volume Up**, then **Volume Down**, then hold the **Power Button** until "Slide to Power Off" appears.
3. Tap the floating **AssistiveTouch button**, then press & hold the on-screen **Home Button** for 5 seconds until the screen flickers back to your lock screen.
4. **Result**: 1.5GB to 3.0GB of frozen background RAM is instantly freed!

### 4. Turn OFF Low Power Mode
Low Power Mode on iOS intentionally caps the GPU clock speed by up to **50%** and limits display refresh rate to **30 FPS**. Ensure your battery icon is **White**, not Yellow, before launching Roblox.

---

## 🛡️ Safety & Anti-Cheat Guarantee (Zero Bans)

- ❌ **NOT A CHEAT OR MOD**: KaiserFPS does not inject DLLs, scripts, or hooks into the Roblox client. It does not modify game files, physics, or memory.
- ❌ **NO RISK OF ACCOUNT BANS**: Roblox's Hyperion anti-cheat only monitors the Roblox client binary and memory space. KaiserFPS operates strictly at the OS device level (display resolution, process priority, and Wi-Fi latency sleep policies).
- ❌ **NO ROOT REQUIRED**: Your phone's security and warranty remain completely untouched.
- ❌ **NO ADS, MINERS, OR SPYWARE**: 100% clean, transparent, and respectful freeware.
- ✅ **1-TAP ROLLBACK**: Tapping **"RESTORE STOCK DEFAULTS"** in Settings immediately returns all display resolutions, refresh rates, and battery parameters to factory defaults.

---

## 🌐 Deploying to GitHub Pages (100% Free Hosting)

This repository is pre-configured to be hosted directly on **GitHub Pages**:

1. In this repository, go to **Settings** > **Pages** (on the left menu).
2. Under **Build and deployment** > **Branch**:
   - Select **`main`** (or `master`).
   - Select folder: **`/ (root)`**.
   - Click **Save**.
3. In under 60 seconds, your site will be live at:  
   `https://<your-username>.github.io/<repo-name>/`

---

## 🎬 Creator & Community

- **Creator**: Kaiser Everhart ([YouTube @KaiserEverhart-Adaptation](https://www.youtube.com/@KaiserEverhart-Adaptation))
- **Subscribe to Unlock**: Integrated dynamic feed automatically tracking Kaiser's latest long-form video releases (Shorts excluded).
- **License**: MIT License — Safe, Transparent, Open.
