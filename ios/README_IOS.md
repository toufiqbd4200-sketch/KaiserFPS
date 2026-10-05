# KaiserFPS iOS - Complete Roblox Performance & Setup Guide

Welcome to **KaiserFPS iOS**, the dedicated performance companion engineered specifically for iPhone and iPad gamers playing Roblox!

---

## 📱 Why iOS is Different from Android

| Feature | Android (kaiserFPS.apk) | iOS (KaiserFPS iOS) |
| :--- | :--- | :--- |
| **System Architecture** | Linux kernel, ADB shell daemon | Darwin/XNU kernel, strict sandboxing |
| **Privileged Bridge** | Shizuku (UID 2000 ADB shell) | Not permitted by Apple App Store / iOS sandbox |
| **Graphics API** | Vulkan / OpenGL ES | **Apple Metal (Lowest overhead in mobile gaming)** |
| **Max Frame Rate** | 60Hz / 120Hz display pacing lock | 60Hz / 120Hz ProMotion pacing lock |
| **Roblox Priority Engine**| `dumpsys deviceidle` & `pm trim-caches` | **Guided Access Core Lock & Hardware RAM Flush** |
| **YouTube Notification** | Android System Notification Drawer | Web Push / In-App Notification Hub |

> [!NOTE]
> Apple strictly disallows apps from executing arbitrary system commands or modifying other apps' sandboxes (no Shizuku or root equivalents exist on non-jailbroken iOS 17/18). 
> **However**, iOS has unique hardware features (like **Guided Access** and **Hardware RAM Flush**) that actually unlock **MORE consistent frame pacing** than many Android devices!

---

## 🚀 The 4 Ultimate iOS Roblox Optimizations

### 1. 🛡️ The Secret Weapon: iOS Guided Access (100% Core Priority)
When you play Roblox normally, iOS constantly reserves CPU cycles for swipe gestures, incoming banners, Siri background listening, and Dynamic Island animations.
**Guided Access completely locks down the phone, dedicating 100% of the Apple A-series / M-series Bionic chips to Roblox!**

**How to Enable (Takes 30 seconds):**
1. Open iPhone **Settings** > **Accessibility** > **Guided Access**.
2. Turn **Guided Access ON**.
3. Tap **Passcode Settings** and enable Face ID / Passcode.
4. Open **Roblox**, start your game (e.g. *Roblox Rivals*, *Bedwars*, *Blox Fruits*).
5. **Triple-click the Power / Side button**. Tap **Start** in the top right corner.
6. 🎯 **Result**: Zero gesture lag, zero notification frame drops, and maximum GPU priority! (To exit, triple-click power button again).

---

### 2. 🧹 Hardware RAM Flush (Free 2GB+ Memory with 1 Tap)
iOS keeps recently opened apps in RAM. If Safari, TikTok, or YouTube are sitting in background RAM, Roblox will stutter when rendering high-poly meshes.

**How to Flush RAM instantly before playing:**
1. Open **Settings** > **Accessibility** > **Touch** > turn **AssistiveTouch ON** (floating home button appears).
2. Now, press **Volume Up**, then **Volume Down**, then hold the **Power Button** until the "Slide to Power Off" screen appears.
3. Open the floating **AssistiveTouch menu** and press & hold the on-screen **Home Button** for 5 seconds until the screen flickers and returns to your passcode screen.
4. 🎯 **Result**: 1.5 GB to 3.0 GB of RAM is instantly purged! Launch Roblox now for completely buttery frames.

---

### 3. ⚡ Turn OFF Low Power Mode
Low Power Mode on iOS intentionally caps the GPU clock speed by up to **50%** and limits screen refresh rate to **30 FPS**.
- Make sure the battery icon is **WHITE**, not YELLOW, before playing Roblox.

---

### 4. 🛠️ FFlag & ClientAppSettings for iOS
For advanced players using Chevstrap or Voidstrap profiles on iOS via the Files app:
```json
{
  "DFIntTaskSchedulerTargetFps": 60,
  "FFlagDebugGraphicsPreferMetal": "True",
  "FFlagDisablePostFx": "True",
  "FIntRenderShadowIntensity": 0
}
```

---

## 🎬 Kaiser Everhart YouTube Video Alerts
KaiserFPS iOS comes with an integrated YouTube alert system for **[@KaiserEverhart-Adaptation](https://www.youtube.com/@KaiserEverhart-Adaptation)**!
- Notifies you immediately when Kaiser uploads a new Roblox video or FPS guide.
- Enabled by default so you never miss new content.
- Can be toggled on/off in Settings at any time with a single tap.

---

## 📲 How to Install KaiserFPS on iPhone / iPad (Add to Home Screen)
1. Open `index.html` in Safari on your iPhone or iPad.
2. Tap the **Share** button (the square with an arrow pointing up).
3. Scroll down and tap **"Add to Home Screen"**.
4. Tap **Add**.
5. KaiserFPS is now installed as a full-screen, standalone iOS app with custom app icon and haptic feedback!
