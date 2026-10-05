/**
 * ===================================================================
 *  KAISERFPS MOBILE OPTIMIZER — CENTRAL CONFIGURATION
 * ===================================================================
 *  Easily update your YouTube channel, latest video, version info,
 *  and download links from this single file!
 */

const KAISER_CONFIG = {
  // App Metadata
  appName: "KaiserFPS",
  appTagline: "Ultimate Mobile Performance Suite for Roblox",
  appVersion: "v3.0.0",
  androidVersionSupport: "Android 9.0 – 16.0 (All Devices)",
  iosVersionSupport: "iOS 15.0 – 18.0+ (iPhone & iPad)",

  // YouTube Channel & Subscribe-to-Unlock
  channelName: "Kaiser Everhart",
  channelHandle: "@KaiserEverhart-Adaptation",
  channelId: "UCdtXtgGplcMdtncG46WQM8g", // YouTube Channel ID
  channelUrl: "https://www.youtube.com/@KaiserEverhart-Adaptation",
  subscribeUrl: "https://www.youtube.com/@KaiserEverhart-Adaptation?sub_confirmation=1",

  // Default Featured Long-Form Video (Auto-updated by RSS, fallback if offline)
  featuredVideo: {
    title: "Corax Is Finished... Why You Don't Need Rivals Cheats Anymore",
    videoId: "OUNl81bv4f0",
    url: "https://www.youtube.com/watch?v=OUNl81bv4f0",
    thumbnail: "https://i4.ytimg.com/vi/OUNl81bv4f0/maxresdefault.jpg"
  },

  // Download Artifacts
  downloads: {
    android: {
      filename: "kaiserFPS.apk",
      path: "downloads/kaiserFPS.apk",
      size: "16.8 MB",
      version: "v3.0.0",
      architecture: "ARM64-v8a / Universal Android"
    },
    ios: {
      filename: "kaiserFPS-iOS.zip",
      path: "downloads/kaiserFPS-iOS.zip",
      size: "2.37 MB",
      pwaUrl: "ios/index.html",
      version: "v3.0.0 (PWA + Guide)"
    }
  },

  // Trust & Security Facts
  securityFacts: {
    scansClean: "100% Clean (0/72 Antivirus Detections)",
    hyperionSafe: "100% Anti-Cheat Safe (No DLL Injection / No Memory Tampering)",
    noRoot: "Zero Root Required (Works with Shizuku / Stock Android)",
    noPc: "100% Mobile (Zero Computer or Cables Needed)"
  }
};

// Freeze to prevent accidental runtime mutation
if (typeof Object.freeze === "function") {
  Object.freeze(KAISER_CONFIG);
}
