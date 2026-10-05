/**
 * ===================================================================
 *  KAISERFPS MOBILE — CLIENT CONTROLLER & COSMIC STARFIELD ENGINE
 * ===================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Config reference
  const cfg = window.KAISER_CONFIG || {
    subscribeUrl: "https://www.youtube.com/@KaiserEverhart-Adaptation?sub_confirmation=1",
    featuredVideo: {
      title: "I beg you, fix your Rivals mobile FPS like this",
      videoId: "tLureNE4Cbs",
      url: "https://www.youtube.com/watch?v=tLureNE4Cbs",
      thumbnail: "https://i4.ytimg.com/vi/tLureNE4Cbs/hqdefault.jpg"
    }
  };

  // State
  let currentVideoUrl = cfg.featuredVideo.url;
  let subCompleted = localStorage.getItem("kaiser_sub_done") === "true";
  let likeCompleted = localStorage.getItem("kaiser_like_done") === "true";
  let isUnlocked = localStorage.getItem("kaiser_mobile_unlocked") === "true";

  // Elements
  const canvas = document.getElementById("space-canvas");
  const lockIndicator = document.getElementById("lockIndicator");
  const lockIcon = document.getElementById("lockIcon");
  const lockStatusText = document.getElementById("lockStatusText");
  const stepSubBox = document.getElementById("stepSubBox");
  const stepLikeBox = document.getElementById("stepLikeBox");
  const btnActionSubscribe = document.getElementById("btnActionSubscribe");
  const btnActionLike = document.getElementById("btnActionLike");
  const lblSub = document.getElementById("lblSub");
  const lblLike = document.getElementById("lblLike");
  const unlockedArea = document.getElementById("unlockedArea");
  const videoPreviewCard = document.getElementById("videoPreviewCard");
  const featuredVideoThumb = document.getElementById("featuredVideoThumb");
  const featuredVideoTitle = document.getElementById("featuredVideoTitle");

  /* ===================================================================
     1. COSMIC STARFIELD SIMULATION (HTML5 CANVAS)
     =================================================================== */
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const starCount = Math.floor(Math.min(width, height) > 600 ? 160 : 80);
    const stars = [];
    const colors = ["#ffffff", "#00f5ff", "#b026ff", "#ffd066", "#e6edfd"];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.12,
        vy: Math.random() * 0.18 + 0.04
      });
    }

    let animId = null;
    function renderStars() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.twinklePhase += star.twinkleSpeed;
        const alpha = star.baseAlpha + Math.sin(star.twinklePhase) * 0.25;

        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen
        if (star.y > height) star.y = 0;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));
        ctx.shadowBlur = star.radius > 1.2 ? 6 : 0;
        ctx.shadowColor = star.color;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(renderStars);
    }
    renderStars();
  }

  /* ===================================================================
     2. AUDIO SYNTHESIS FOR CELEBRATION
     =================================================================== */
  function playUnlockChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      if (ctx.state === "suspended") ctx.resume();

      const chords = [523.25, 659.25, 783.99, 1046.5]; // C Major arpeggio
      chords.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
      });
    } catch (_) {}
  }

  /* ===================================================================
     3. DYNAMIC YOUTUBE RSS FEED (EXCLUDING SHORTS)
     =================================================================== */
  async function fetchLatestLongFormVideo() {
    try {
      const channelId = cfg.channelId || "UCdtXtgGplcMdtncG46WQM8g";
      const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`;

      const res = await fetch(proxyUrl);
      if (res.ok) {
        const data = await res.json();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "application/xml");
        const entries = xml.querySelectorAll("entry");

        for (const entry of entries) {
          const link = entry.querySelector("link")?.getAttribute("href");
          
          // MUST EXCLUDE SHORTS: Only long-form videos
          if (link && (link.includes("/shorts/") || link.includes("shorts"))) {
            continue;
          }

          const title = entry.querySelector("title")?.textContent;
          const videoId = entry.querySelector("videoId")?.textContent;

          if (title && link) {
            featuredVideoTitle.textContent = title;
            currentVideoUrl = link;
            if (videoId) {
              featuredVideoThumb.src = `https://i4.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            }
            break; // Found newest long-form video!
          }
        }
      }
    } catch (_) {
      // Fallback details from KAISER_CONFIG remain active
    }
  }

  fetchLatestLongFormVideo();

  if (videoPreviewCard) {
    videoPreviewCard.addEventListener("click", () => {
      window.open(currentVideoUrl, "_blank", "noopener,noreferrer");
    });
  }

  /* ===================================================================
     4. SUBSCRIBE-TO-UNLOCK CONTROLLER
     =================================================================== */
  function updateGateUI() {
    // Step 1: Sub
    if (subCompleted) {
      stepSubBox?.classList.add("completed");
      btnActionSubscribe?.classList.add("done");
      if (lblSub) lblSub.textContent = "✓ 1. Subscribed!";
    }

    // Step 2: Like
    if (likeCompleted) {
      stepLikeBox?.classList.add("completed");
      btnActionLike?.classList.add("done");
      if (lblLike) lblLike.textContent = "✓ 2. Liked!";
    }

    // Check overall unlock
    if (subCompleted && likeCompleted) {
      if (!isUnlocked) {
        isUnlocked = true;
        localStorage.setItem("kaiser_mobile_unlocked", "true");
        playUnlockChime();
        triggerCosmicConfetti();
      }
      lockIndicator?.classList.add("unlocked");
      if (lockIcon) lockIcon.textContent = "🔓";
      if (lockStatusText) lockStatusText.textContent = "ACCESS UNLOCKED!";
      unlockedArea?.classList.add("active");
    }
  }

  // Restore on load
  if (isUnlocked || (subCompleted && likeCompleted)) {
    subCompleted = true;
    likeCompleted = true;
    updateGateUI();
  }

  // Action 1: Subscribe
  btnActionSubscribe?.addEventListener("click", () => {
    window.open(cfg.subscribeUrl, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      subCompleted = true;
      localStorage.setItem("kaiser_sub_done", "true");
      updateGateUI();
    }, 1500);
  });

  // Action 2: Like
  btnActionLike?.addEventListener("click", () => {
    window.open(currentVideoUrl, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      likeCompleted = true;
      localStorage.setItem("kaiser_like_done", "true");
      updateGateUI();
    }, 1500);
  });

  /* ===================================================================
     5. COSMIC CELEBRATION PARTICLES
     =================================================================== */
  function triggerCosmicConfetti() {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.pointerEvents = "none";
    container.style.zIndex = "999";
    document.body.appendChild(container);

    const particleColors = ["#00f5ff", "#b026ff", "#ffd066", "#00f076", "#ffffff"];
    for (let i = 0; i < 60; i++) {
      const p = document.createElement("div");
      p.style.position = "absolute";
      p.style.width = Math.random() * 8 + 4 + "px";
      p.style.height = p.style.width;
      p.style.borderRadius = "50%";
      p.style.backgroundColor = particleColors[Math.floor(Math.random() * particleColors.length)];
      p.style.left = "50%";
      p.style.top = "50%";
      p.style.boxShadow = `0 0 10px ${p.style.backgroundColor}`;

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 350 + 150;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      p.animate([
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
      ], {
        duration: 1200 + Math.random() * 500,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "forwards"
      });

      container.appendChild(p);
    }

    setTimeout(() => container.remove(), 2000);
  }

  /* ===================================================================
     6. FAQ ACCORDION CONTROLLER
     =================================================================== */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question?.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach(f => {
        f.classList.remove("active");
        f.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
      });
      if (!isActive) {
        item.classList.add("active");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });
});
