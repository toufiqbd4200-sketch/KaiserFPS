/* ===================================================================
   KaiserFPS iOS - Logic & Haptic Simulation Engine
   =================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const circleContainer = document.getElementById("circleContainer");
  const btnMasterToggle = document.getElementById("btnMasterToggle");
  const statusMain = document.getElementById("statusMain");
  const statusSub = document.getElementById("statusSub");
  const boltIcon = document.getElementById("boltIcon");

  const presetLow = document.getElementById("presetLow");
  const presetMed = document.getElementById("presetMed");
  const presetHigh = document.getElementById("presetHigh");
  const presetDesc = document.getElementById("presetDesc");

  const toggleCreatorAlerts = document.getElementById("toggleCreatorAlerts");
  const creatorStatusText = document.getElementById("creatorStatusText");
  const latestVideoCard = document.getElementById("latestVideoCard");
  const videoTitle = document.getElementById("videoTitle");
  const videoThumb = document.getElementById("videoThumb");

  const btnLaunchRoblox = document.getElementById("btnLaunchRoblox");
  const btnOpenGuide = document.getElementById("btnOpenGuide");
  const btnIosGuide = document.getElementById("btnIosGuide");
  const btnPurgeRam = document.getElementById("btnPurgeRam");
  const btnTestAlert = document.getElementById("btnTestAlert");

  const guideModal = document.getElementById("guideModal");
  const btnCloseGuide = document.getElementById("btnCloseGuide");
  const btnCloseGuideBottom = document.getElementById("btnCloseGuideBottom");
  const bannerQuickStart = document.getElementById("bannerQuickStart");

  const themeDots = document.querySelectorAll(".theme-dot");
  const diagRam = document.getElementById("diagRam");

  // State
  let isActive = false;
  let currentPreset = "medium";
  let alertsEnabled = true;

  // Audio Context for Tactile Haptic Sound Synthesis
  let audioCtx = null;
  function playHapticBeep(frequency = 520, duration = 0.08, type = "sine") {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (_) {}
  }

  // Toggle Master Optimization
  function setMasterState(active) {
    isActive = active;
    if (isActive) {
      circleContainer.classList.add("active");
      statusMain.textContent = "ACTIVE";
      statusSub.textContent = "ROBLOX TURBOCHARGED • 60 FPS PACING";
      playHapticBeep(680, 0.12, "triangle");
      if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
    } else {
      circleContainer.classList.remove("active");
      statusMain.textContent = "INACTIVE";
      statusSub.textContent = "TAP CIRCLE TO ACTIVATE";
      playHapticBeep(340, 0.1, "sine");
      if (navigator.vibrate) navigator.vibrate(30);
    }
  }

  btnMasterToggle.addEventListener("click", () => {
    // Micro-interaction bounce
    btnMasterToggle.style.transform = "scale(0.93)";
    setTimeout(() => {
      btnMasterToggle.style.transform = "";
      setMasterState(!isActive);
    }, 120);
  });

  // Preset Descriptions
  const presetTexts = {
    low: "🟢 0-Setup Instant Mode: Runs 100% out-of-the-box! Purges background apps & tunes RAM. Zero setup needed.",
    medium: "⚡ Medium Mode: Guided Access priority lock + Metal shader pre-caching + 60Hz frame pacing lock.",
    high: "🔥 Extreme High Mode: Aggressive Metal draw-call optimization + full background kill + 0.8x fillrate rendering."
  };

  function selectPreset(preset) {
    currentPreset = preset;
    [presetLow, presetMed, presetHigh].forEach(btn => btn.classList.remove("active"));
    if (preset === "low") presetLow.classList.add("active");
    if (preset === "medium") presetMed.classList.add("active");
    if (preset === "high") presetHigh.classList.add("active");
    presetDesc.textContent = presetTexts[preset];
    playHapticBeep(480, 0.05);
  }

  presetLow.addEventListener("click", () => selectPreset("low"));
  presetMed.addEventListener("click", () => selectPreset("medium"));
  presetHigh.addEventListener("click", () => selectPreset("high"));

  bannerQuickStart.addEventListener("click", () => {
    selectPreset("low");
    if (!isActive) setMasterState(true);
  });

  // Guide Modal
  function openGuide() {
    guideModal.classList.add("open");
  }
  function closeGuide() {
    guideModal.classList.remove("open");
  }
  btnOpenGuide.addEventListener("click", openGuide);
  btnIosGuide.addEventListener("click", openGuide);
  btnCloseGuide.addEventListener("click", closeGuide);
  btnCloseGuideBottom.addEventListener("click", closeGuide);
  guideModal.addEventListener("click", (e) => {
    if (e.target === guideModal) closeGuide();
  });

  // 1-Tap RAM Purge Simulator
  btnPurgeRam.addEventListener("click", () => {
    btnPurgeRam.disabled = true;
    btnPurgeRam.textContent = "Purging RAM…";
    diagRam.textContent = "Flushing…";
    diagRam.style.color = "var(--accent-pink)";
    playHapticBeep(720, 0.2, "sawtooth");

    setTimeout(() => {
      diagRam.textContent = "Freed 2.4 GB";
      diagRam.style.color = "var(--accent-green)";
      btnPurgeRam.disabled = false;
      btnPurgeRam.innerHTML = "<span>✓</span> Memory Purged!";
      setTimeout(() => {
        btnPurgeRam.innerHTML = "<span>🧹</span> Flush iOS RAM";
      }, 2500);
    }, 1000);
  });

  // Launch Roblox
  btnLaunchRoblox.addEventListener("click", () => {
    if (!isActive) {
      setMasterState(true);
    }
    playHapticBeep(800, 0.15);
    window.location.href = "roblox://";
    setTimeout(() => {
      // Fallback if app not installed or in browser
      console.log("Roblox protocol launched");
    }, 800);
  });

  // Creator Notification Toggle & Feed
  toggleCreatorAlerts.addEventListener("change", (e) => {
    alertsEnabled = e.target.checked;
    creatorStatusText.textContent = alertsEnabled ? "New upload notifications: ON" : "New upload notifications: OFF";
    playHapticBeep(520, 0.05);
  });

  btnTestAlert.addEventListener("click", () => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("🎬 New Video from Kaiser!", {
          body: videoTitle.textContent,
          icon: "./icon.png"
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification("🎬 New Video from Kaiser!", {
              body: videoTitle.textContent,
              icon: "./icon.png"
            });
          }
        });
      }
    }
    // Interactive In-App Notification Toast
    showToast(`🎬 Alert: "${videoTitle.textContent}"`);
  });

  function showToast(msg) {
    const toast = document.createElement("div");
    toast.style.position = "fixed";
    toast.style.top = "24px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.backgroundColor = "rgba(18, 22, 34, 0.95)";
    toast.style.border = "1px solid var(--accent-cyan)";
    toast.style.color = "#FFFFFF";
    toast.style.padding = "10px 18px";
    toast.style.borderRadius = "20px";
    toast.style.fontSize = "12px";
    toast.style.fontWeight = "600";
    toast.style.boxShadow = "0 8px 24px rgba(0,0,0,0.5)";
    toast.style.zIndex = "1000";
    toast.style.backdropFilter = "blur(12px)";
    toast.textContent = msg;
    document.body.appendChild(toast);
    playHapticBeep(600, 0.1);

    setTimeout(() => {
      toast.style.transition = "opacity 0.4s ease";
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  // Theme Switching
  themeDots.forEach(dot => {
    dot.addEventListener("click", () => {
      const color = dot.dataset.color;
      document.body.setAttribute("data-theme", color);
      themeDots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
      playHapticBeep(560, 0.06);
    });
  });

  // Attempt to fetch fresh video from YouTube RSS feed via allorigins proxy or fallback
  async function fetchFreshVideo() {
    try {
      const feedUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=UCdtXtgGplcMdtncG46WQM8g";
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`;
      const res = await fetch(proxyUrl);
      if (res.ok) {
        const data = await res.json();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "application/xml");
        const entries = xml.querySelectorAll("entry");
        for (const entry of entries) {
          const link = entry.querySelector("link")?.getAttribute("href");
          // EXCLUDE SHORTS: User specified long-form videos only
          if (link && link.includes("/shorts/")) {
            continue;
          }
          const title = entry.querySelector("title")?.textContent;
          const videoId = entry.querySelector("videoId")?.textContent;
          if (title && link) {
            videoTitle.textContent = title;
            latestVideoCard.href = link;
            if (videoId) videoThumb.src = `https://i4.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            break; // Picked newest long-form video
          }
        }
      }
    } catch (_) {
      // Graceful offline fallback maintains pre-populated long-form video details
    }
  }

  fetchFreshVideo();
});
