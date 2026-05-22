// script.js — extracted vanilla JS logic for PortfolioClient
// Import this in page.tsx or PortfolioClient.tsx and call initPortfolio()

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// ─── Project Data ────────────────────────────────────────────────────────────
export const PROJECTS = {
  earthview: {
    num: "001",
    title: "Earth View – GeoTracker",
    subtitle: "Real-Time 3D Globe Visualization",
    description:
      "Earth View is a high-performance interactive 3D globe built to visualize live data streams from multiple sources simultaneously. It renders satellites in orbit, commercial flights, maritime vessels, live weather overlays, and road traffic — all in real time on a photorealistic globe.\n\nThe interface is built on CesiumJS for geospatial accuracy and Three.js for supplemental 3D rendering. A custom day/night terminator shader provides atmospheric realism, while a smooth camera controller enables seamless navigation across any scale — from global view to street level.",
    highlights: [
      "Interactive 3D globe rendering using CesiumJS with day/night visualization and atmospheric shaders",
      "Live satellite tracking via OpenSky Network API — position, altitude, speed, and trajectory",
      "Maritime vessel tracking using AISStream with real-time AIS data parsing",
      "Road traffic and mapping powered by TomTom APIs with multi-layer overlay support",
      "Optimized real-time data pipeline handling simultaneous feeds across all data layers with minimal frame drops",
      "Telemetry HUD showing speed, altitude, heading, and object-specific metadata on hover",
    ],
    tags: ["CesiumJS", "Three.js", "JavaScript", "OpenSky API", "TomTom API", "AISStream", "WebGL", "REST APIs"],
    links: [
      { label: "↗ Comming Soon", href: "#" },
      { label: "⌥ GitHub Repo", href: "https://github.com/webgo-oss/earth-app" },
    ],
  },
  pqvault: {
    num: "002",
    title: "Post-Quantum Cryptography Vault",
    subtitle: "Future-Proof Secure File Storage System",
    description:
      "A desktop-based encrypted vault engineered to withstand attacks from quantum computers. Standard RSA and ECC encryption become vulnerable once large-scale quantum computers exist — this vault uses ML-KEM-768 (formerly Kyber), a NIST-standardized post-quantum key encapsulation mechanism, combined with AES-256-GCM for symmetric file encryption.\n\nBuilt entirely in Python, the application features a rich CLI, an interactive terminal dashboard, and a clean file management interface for monitoring vault contents and sync status.",
    highlights: [
      "ML-KEM-768 (Kyber) for post-quantum key encapsulation — NIST PQC standardized algorithm",
      "AES-256-GCM for authenticated file encryption with per-file unique IVs",
      "Argon2id password hashing with tunable memory/time cost for brute-force resistance",
      "Ed25519 digital signatures and SHA-256 integrity hashing to verify file authenticity",
      "Secure private key protection using SHA-256 derived keys — never stored in plaintext",
      "Automated encrypted backups and cloud synchronization (Supabase/Firebase)",
      "Full-featured CLI + interactive terminal UI (Rich/Textual) with vault dashboard",
    ],
    tags: ["Python", "ML-KEM-768 (Kyber)", "AES-256-GCM", "Argon2id", "Ed25519", "SHA-256", "CLI", "Supabase", "Firebase"],
    links: [
      { label: "↗ Live APP Download", href: "https://pqc-vault-live.vercel.app" },
      { label: "⌥ GitHub Repo", href: "https://github.com/webgo-oss/pqc_vault_exe" },
    ],
  },
  airoadmap: {
    num: "003",
    title: "AI Roadmap Generator",
    subtitle: "Interactive 3D Neural-Network Learning Path Engine",
    description:
      "AI Roadmap Generator takes any topic as input and instantly constructs a fully personalized, three-tier learning roadmap — Beginner, Core, and Advanced — rendered as an interactive 3D neural network in the browser. Each node in the network represents a discrete concept; hovering or clicking it expands a panel with a concise definition, two curated YouTube video links, an auto-generated concept diagram, and a time-to-learn graph showing estimated hours across all three tiers.\n\nBeyond exploration, the platform can convert any topic node into a narrated explainer video using Manim, the mathematical animation engine — giving learners a visual, step-by-step breakdown they can watch rather than read. A personal dashboard stores generated PDFs for each topic, tracks learning history, and surfaces progress analytics across every roadmap the user has created.",
    highlights: [
      "Natural-language topic input with AI-driven decomposition into Beginner, Core, and Advanced concept tiers",
      "Interactive 3D neural network visualization — nodes, weighted edges, and animated signal propagation built with Three.js and WebGL",
      "Per-node expansion panel: concise definition, 2 curated YouTube video links, and an auto-generated concept relationship diagram",
      "Time-to-learn bar & radar graphs per topic tier — estimated learning hours visualized with D3.js",
      "Manim script generation pipeline — each topic node can be exported as a narrated mathematical animation video for deep understanding",
      "PDF generation per topic with diagrams, definitions, and resource links — stored and accessible from the user dashboard",
      "Full learning history with session tracking, completion flags, and per-roadmap progress analytics",
      "Dashboard with roadmap archive, PDF library, history timeline, and daily learning streak tracker",
    ],
    tags: [
      "Express", "Three.js", "WebGL", "Python", "Manim", "OpenAI API",
      "D3.js", "YouTube Data API", "Flask", "Msql", "Supabase", "PDF Generation",
    ],
    links: [
      { label: "↗ Comming Soon", href: "#" },
      { label: "⌥ GitHub Repo", href: "https://github.com/webgo-oss/road-map" },
    ],
  },
  aixray: {
    num: "004",
    title: "AI X-Ray Detection System",
    subtitle: "Deep Learning Fracture Analysis with GradCAM Heatmaps",
    description:
      "AI X-Ray Detection System is a full-stack medical imaging platform that accepts an uploaded X-ray image and runs it through a fine-tuned convolutional neural network to detect fractures across three anatomical regions — hand, elbow, and knee. The pipeline delivers a dual-view result: a standard 2D X-ray panel alongside an immersive 3D volumetric reconstruction of the scan, both rendered interactively in the browser.\n\nAfter a realistic 5–10 second processing window that mirrors a real diagnostic workflow, a Grad-CAM heatmap overlays the original X-ray — highlighting the exact regions the model focused on — accompanied by a prediction confidence score and a binary fracture / no-fracture verdict. Every scan result is stored in a fully interactive 3D dashboard with complete report history, shareable PDF exports, and per-session analytics.",
    highlights: [
      "X-ray upload interface supporting hand, elbow, and knee anatomical regions — validated and auto-classified on ingest",
      "Fine-tuned CNN (ResNet-50 backbone) achieving high accuracy fracture detection across all three supported joint types",
      "Dual-view rendering: side-by-side 2D X-ray panel and interactive Three.js 3D volumetric reconstruction of the scan",
      "Realistic 5–10 second processing pipeline with animated progress stages mimicking real diagnostic latency",
      "Grad-CAM heatmap overlay — visually highlights the exact regions that drove the model's fracture prediction",
      "Prediction confidence score (0–100%) and clear Fracture / No Fracture verdict displayed alongside the heatmap",
      "Fully interactive 3D dashboard — each report card is a spatial object that can be rotated, expanded, and inspected",
      "Complete scan history with filterable report archive, PDF export per scan, and per-patient analytics panel",
    ],
    tags: [
      "Python", "PyTorch", "ResNet-50", "Grad-CAM", "Three.js", "WebGL",
      "Flask", "Express", "OpenCV", "Mysql", "Kaggle", "Medical Imaging",
    ],
    links: [
      { label: "↗ Comming Soon", href: "#" },
      { label: "⌥ GitHub Repo (static version)", href: "https://github.com/webgo-oss/X-RAY-APP-STATIC" },
    ],
  },
};

// ─── Loader Helpers ───────────────────────────────────────────────────────────
export function setProgress(pct, statusText) {
  const bar = document.getElementById("ldr-bar");
  const status = document.getElementById("ldr-status");
  if (bar) bar.style.width = `${pct}%`;
  if (status && statusText) status.textContent = statusText;
}

export function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hidden");
}

// ─── Geometry Helpers ────────────────────────────────────────────────────────
const _boxSize = new THREE.Vector3();
const _boxCenter = new THREE.Vector3();

export function splitByIslands(mesh, tg, allKeys, hitboxes) {
  const geo = mesh.geometry.clone();
  if (!geo.index) return [mesh];

  const idx = geo.index;
  const triCount = idx.count / 3;
  const v2t = Array.from({ length: geo.attributes.position.count }, () => []);

  for (let i = 0; i < triCount; i++) {
    v2t[idx.getX(i * 3)].push(i);
    v2t[idx.getX(i * 3 + 1)].push(i);
    v2t[idx.getX(i * 3 + 2)].push(i);
  }

  const visited = new Uint8Array(triCount);
  const pieces = [];

  for (let i = 0; i < triCount; i++) {
    if (visited[i]) continue;
    const q = [i];
    const comp = [];
    visited[i] = 1;

    while (q.length) {
      const tri = q.shift();
      comp.push(tri);
      for (let j = 0; j < 3; j++) {
        const v = idx.getX(tri * 3 + j);
        v2t[v].forEach((n) => {
          if (!visited[n]) {
            visited[n] = 1;
            q.push(n);
          }
        });
      }
    }

    const sg = new THREE.BufferGeometry();
    const sp = [], sn = [], su = [], si = [];
    const map = new Map();

    comp.forEach((tri) => {
      for (let j = 0; j < 3; j++) {
        const o = idx.getX(tri * 3 + j);
        if (!map.has(o)) {
          map.set(o, sp.length / 3);
          sp.push(
            geo.attributes.position.getX(o),
            geo.attributes.position.getY(o),
            geo.attributes.position.getZ(o)
          );
          sn.push(
            geo.attributes.normal.getX(o),
            geo.attributes.normal.getY(o),
            geo.attributes.normal.getZ(o)
          );
          su.push(geo.attributes.uv.getX(o), geo.attributes.uv.getY(o));
        }
        si.push(map.get(o));
      }
    });

    sg.setAttribute("position", new THREE.Float32BufferAttribute(sp, 3));
    sg.setAttribute("normal", new THREE.Float32BufferAttribute(sn, 3));
    sg.setAttribute("uv", new THREE.Float32BufferAttribute(su, 2));
    sg.setIndex(si);
    sg.computeBoundingBox();
    sg.boundingBox.getSize(_boxSize);

    const mat = mesh.material.clone();
    mat.metalness = 0.6;
    mat.roughness = 0.3;

    const nm = new THREE.Mesh(sg, mat);
    if (_boxSize.x < 1.5 || _boxSize.y < 1.0) {
      nm.userData.targetZ = 0;
      nm.userData.currentZ = 0;

      const hg = sg.clone();
      hg.center();
      hg.scale(0.85, 0.85, 1);

      sg.boundingBox.getCenter(_boxCenter);
      const hb = new THREE.Mesh(hg, new THREE.MeshBasicMaterial({ visible: false }));
      hb.position.copy(_boxCenter);
      hb.userData.parentKey = nm;

      tg.add(hb);
      hitboxes.push(hb);
      allKeys.push(nm);
    }

    pieces.push(nm);
  }

  return pieces;
}

// ─── Audio Helpers ────────────────────────────────────────────────────────────
export function createAudioController() {
  let audioCtx = null;
  let soundEnabled = false;

  async function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") await audioCtx.resume();
  }

  async function toggleSound(soundBtn, stxt) {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      await initAudio();
      soundBtn?.classList.add("on");
      if (stxt) stxt.textContent = "Sound On";
    } else {
      soundBtn?.classList.remove("on");
      if (stxt) stxt.textContent = "Sound Off";
    }
    return soundEnabled;
  }

  function playClack() {
    if (!soundEnabled || !audioCtx) return;
    const ctx = audioCtx;
    const t = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.value = 0.38;
    master.connect(ctx.destination);

    const bufSize = ctx.sampleRate * 0.025;
    const nBuf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const d = nBuf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = nBuf;

    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 4500;
    bp.Q.value = 2.2;

    const ng = ctx.createGain();
    ng.gain.setValueAtTime(1, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.018);

    noise.connect(bp);
    bp.connect(ng);
    ng.connect(master);
    noise.start(t);
    noise.stop(t + 0.025);

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(240, t);
    osc.frequency.exponentialRampToValueAtTime(55, t + 0.045);

    const og = ctx.createGain();
    og.gain.setValueAtTime(0.75, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    osc.connect(og);
    og.connect(master);
    osc.start(t);
    osc.stop(t + 0.08);
  }

  return { toggleSound, playClack };
}

// ─── Clock Helper ─────────────────────────────────────────────────────────────
export function startClock() {
  const clockEl = document.getElementById("clock");
  const dateEl = document.getElementById("datebox");

  function updateClock() {
    const now = new Date();
    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    }
    if (dateEl) {
      dateEl.textContent = now
        .toLocaleDateString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .toUpperCase();
    }
  }

  updateClock();
  return setInterval(updateClock, 1000);
}

// ─── Nav Helper ───────────────────────────────────────────────────────────────
export function createNavController() {
  const sections = ["section-home", "section-projects", "section-about", "section-education", "section-contact"];
  const navLinks = document.querySelectorAll(".nav-item");
  const spineDot = document.getElementById("nav-spine-dot");
  const navItemsEl = document.querySelector("#side-right .nav-items");
  let _activeId = "";

  function updateNav() {
    const midY = window.scrollY + window.innerHeight * 0.4;
    let activeId = sections[0];

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= midY) activeId = id;
    }

    if (activeId === _activeId) return;
    _activeId = activeId;

    navLinks.forEach((a) => {
      const isActive = a.getAttribute("data-section") === activeId;
      a.classList.toggle("active", isActive);
      if (isActive && spineDot && navItemsEl) {
        const aRect = a.getBoundingClientRect();
        const pRect = navItemsEl.getBoundingClientRect();
        spineDot.style.top = `${aRect.top - pRect.top + aRect.height / 2 - 2.5}px`;
      }
    });
  }

  return { updateNav };
}

// ─── Cursor Helper ────────────────────────────────────────────────────────────
export function initCursor() {
  const cursorDot = document.getElementById("cursor");
  const cursorRing = document.getElementById("cursor-ring");
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx;
  let ry = my;
  let cursorRafId = null;

  function animCursor() {
    cursorRafId = null;
    if (!cursorDot || !cursorRing) return;

    cursorDot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    cursorRing.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;

    if (Math.abs(mx - rx) > 0.2 || Math.abs(my - ry) > 0.2) {
      cursorRafId = requestAnimationFrame(animCursor);
    }
  }

  function onMouseMove(e) {
    mx = e.clientX;
    my = e.clientY;
    if (!cursorRafId) cursorRafId = requestAnimationFrame(animCursor);
  }

  window.addEventListener("mousemove", onMouseMove, { passive: true });

  return () => {
    window.removeEventListener("mousemove", onMouseMove);
    if (cursorRafId) cancelAnimationFrame(cursorRafId);
  };
}

// ─── Main Init ────────────────────────────────────────────────────────────────
/**
 * Call this inside a useEffect in PortfolioClient.
 * @param {Function} openDrawerCallback  – called with projectId string when a card is clicked
 * @param {Function} closeDrawerCallback – called with no args when drawer should close
 * @returns cleanup function
 */
export function initPortfolio(openDrawerCallback, closeDrawerCallback) {
  const overlay = document.getElementById("project-overlay");
  const drawer = document.getElementById("project-drawer");
  const closeBtn = document.getElementById("drawer-close-btn");
  const soundBtn = document.getElementById("soundToggle");
  const stxt = document.getElementById("stxt");
  const heroEl = document.getElementById("hero");
  const canvasEl = document.getElementById("three-canvas");
  const scrollHintEl = document.getElementById("scroll-hint");
  const homeOnlyEls = document.querySelectorAll(".home-only");

  // ── Drawer ──
  function openDrawer(projectId) {
    openDrawerCallback(projectId);
    document.body.style.overflow = "hidden";
    overlay?.classList.add("active");
    drawer?.classList.add("open");
  }

  function closeDrawer() {
    closeDrawerCallback();
    document.body.style.overflow = "";
    overlay?.classList.remove("active");
    drawer?.classList.remove("open");
  }

  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    const btn = card.querySelector(".project-expand-btn");
    btn?.addEventListener("click", (e) => {
      e.stopPropagation();
      openDrawer(card.dataset.project);
    });
    card.addEventListener("click", () => openDrawer(card.dataset.project));
  });

  closeBtn?.addEventListener("click", closeDrawer);
  overlay?.addEventListener("click", closeDrawer);

  const onKeyDown = (e) => { if (e.key === "Escape") closeDrawer(); };
  document.addEventListener("keydown", onKeyDown);

  // ── Clock ──
  const clockTimer = startClock();

  // ── Nav ──
  const { updateNav } = createNavController();

  // ── Scroll ──
  let targetScrollY = 0;
  let homeHidden = false;

  function onScroll() {
    targetScrollY = window.scrollY;
    const pastHome = window.scrollY > window.innerHeight * 0.15;

    if (pastHome && !homeHidden) {
      homeHidden = true;
      homeOnlyEls.forEach((el) => el.classList.add("hide"));
      if (scrollHintEl) { scrollHintEl.style.opacity = "0"; scrollHintEl.style.pointerEvents = "none"; }
    } else if (!pastHome && homeHidden) {
      homeHidden = false;
      homeOnlyEls.forEach((el) => el.classList.remove("hide"));
      if (scrollHintEl) { scrollHintEl.style.opacity = ""; scrollHintEl.style.pointerEvents = ""; }
    }

    updateNav();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  setTimeout(updateNav, 100);

  // ── Cursor ──
  const cleanupCursor = initCursor();

  // ── Reveal on scroll ──
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("visible"); }),
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));

  // ── Sound ──
  const { toggleSound, playClack } = createAudioController();
  soundBtn?.addEventListener("click", () => toggleSound(soundBtn, stxt));

  // ── Three.js scene ──
  const canvas = canvasEl;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0.139, -1.397, 2.028);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas,
    powerPreference: "high-performance",
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x080406, 1);
  scene.fog = new THREE.FogExp2(0x1a040b, 0.032);

  scene.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(60, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x0d0407, side: THREE.BackSide })
    )
  );

  const pCount = 1800;
  const pPos = new Float32Array(pCount * 3);
  const pCol = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 90;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 90;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 90;
    const t2 = Math.random();
    pCol[i * 3] = 1;
    pCol[i * 3 + 1] = 0.3 + t2 * 0.55;
    pCol[i * 3 + 2] = 0.55 + t2 * 0.4;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.Float32BufferAttribute(pPos, 3));
  pGeo.setAttribute("color", new THREE.Float32BufferAttribute(pCol, 3));
  const particles = new THREE.Points(
    pGeo,
    new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.7 })
  );
  scene.add(particles);

  scene.add(new THREE.AmbientLight(0x1a0510, 1.2));
  const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
  keyLight.position.set(5, 10, 5);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0xff2266, 14, 35);
  rimLight.position.set(-3, 5, 4);
  scene.add(rimLight);

  const warmLight = new THREE.PointLight(0xff88bb, 7, 30);
  warmLight.position.set(4, 2, -3);
  scene.add(warmLight);

  const fillLight = new THREE.PointLight(0xff0055, 5, 20);
  fillLight.position.set(0, -4, 2);
  scene.add(fillLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target.set(0, -0.2, 0);
  camera.rotation.set(0.533, 0.059, -0.035);
  controls.minDistance = 1;
  controls.maxDistance = 12;
  controls.update();

  // ── GLTF model ──
  let kbGroup = null;
  const allKeys = [];
  const hitboxes = [];

  setProgress(15, "Building scene");
  setProgress(40, "Preparing lights");

  new GLTFLoader().load(
    "/mechanical_keyboard_-_aesthetic.glb",
    (gltf) => {
      const kb = new THREE.Group();
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          const name = `${child.material?.name || ""} ${child.name || ""}`.toLowerCase();
          if (name.includes("button") || name.includes("key")) {
            splitByIslands(child, kb, allKeys, hitboxes).forEach((k) => kb.add(k));
          } else {
            const c = child.clone();
            if (c.material) {
              c.material = c.material.clone();
              c.material.metalness = 0.7;
              c.material.roughness = 0.25;
            }
            kb.add(c);
          }
        }
      });

      kb.rotation.set(0, 0, 0);
      const box = new THREE.Box3().setFromObject(kb);
      const center = box.getCenter(new THREE.Vector3());
      kb.position.sub(center);
      kb.position.y = -0.6;
      scene.add(kb);
      kbGroup = kb;

      setProgress(100, "Ready");
      setTimeout(hideLoader, 500);
    },
    (xhr) => {
      if (xhr.total) {
        const dlPct = Math.round((xhr.loaded / xhr.total) * 50);
        setProgress(40 + dlPct, "Loading model");
      }
    },
    () => {
      setProgress(100, "Ready");
      setTimeout(hideLoader, 300);
    }
  );

  // ── Raycasting / key interaction ──
  const raycaster = new THREE.Raycaster();
  const mouse3d = new THREE.Vector2(-9, -9);
  let lastKey = null;
  const LERP = 0.15;
  const PRESS = -0.055;
  const KEY_COLOR = 0xff2266;
  const _hits = [];
  let mouseDirty = false;

  const onMouseMove3d = (e) => {
    mouse3d.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse3d.y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouseDirty = true;
  };
  window.addEventListener("mousemove", onMouseMove3d, { passive: true });

  // ── Render loop ──
  let scrollY = 0;
  let _heroOpacity = -1;
  let _canvasOpacity = -1;
  let lastFrameTime = 0;
  let rafId = 0;
  const FRAME_TIME = 1000 / 60;
  let t = 0;

  function animate(now) {
    rafId = requestAnimationFrame(animate);

    const delta = now - lastFrameTime;
    if (delta < FRAME_TIME - 1) return;
    lastFrameTime = now - (delta % FRAME_TIME);

    t += 0.01;
    scrollY += (targetScrollY - scrollY) * 0.08;

    rimLight.intensity = 12 + Math.sin(t * 1.3) * 3;
    fillLight.intensity = 4 + Math.sin(t * 0.8 + 1) * 2;

    const sf = Math.min(scrollY / window.innerHeight, 1);
    if (sf < 0.9) {
      particles.rotation.y += 0.00018;
      particles.rotation.x += 0.00006;
    }

    const heroOp = Math.max(0, 1 - sf * 2.5);
    const canvasOp = Math.max(0, 1 - sf * 1.8);

    if (heroEl && Math.abs(heroOp - _heroOpacity) > 0.005) {
      heroEl.style.opacity = heroOp;
      _heroOpacity = heroOp;
    }
    if (canvasEl && Math.abs(canvasOp - _canvasOpacity) > 0.005) {
      canvasEl.style.opacity = canvasOp;
      _canvasOpacity = canvasOp;
    }

    if (kbGroup) {
      kbGroup.position.y = -0.6 - sf * 3.2;
      kbGroup.rotation.x = sf * 0.35;
      kbGroup.scale.setScalar(1 - sf * 0.12);
    }

    const keyboardVisible = sf < 0.55;

    if (keyboardVisible && hitboxes.length > 0 && mouseDirty) {
      mouseDirty = false;
      raycaster.setFromCamera(mouse3d, camera);
      _hits.length = 0;
      raycaster.intersectObjects(hitboxes, false, _hits);

      const activeKey = _hits.length > 0 ? _hits[0].object.userData.parentKey : null;
      if (activeKey && activeKey !== lastKey) playClack();
      lastKey = activeKey;

      allKeys.forEach((key) => {
        if (key === activeKey) {
          key.userData.targetZ = PRESS;
          key.material.emissive.setHex(KEY_COLOR);
          key.material.emissiveIntensity = THREE.MathUtils.lerp(key.material.emissiveIntensity, 2.2, LERP);
        } else {
          key.userData.targetZ = 0;
          key.material.emissiveIntensity = THREE.MathUtils.lerp(key.material.emissiveIntensity, 0, LERP);
        }

        const d2 = key.userData.targetZ - key.userData.currentZ;
        if (Math.abs(d2) > 0.0005) {
          key.userData.currentZ += d2 * LERP;
          key.position.z = key.userData.currentZ;
        } else if (key.userData.targetZ === 0) {
          key.position.z = 0;
          key.userData.currentZ = 0;
        }
      });
    } else if (!keyboardVisible && lastKey !== null) {
      lastKey = null;
      allKeys.forEach((key) => {
        key.userData.targetZ = 0;
        key.userData.currentZ = 0;
        key.position.z = 0;
        key.material.emissiveIntensity = 0;
      });
    }

    controls.update();
    renderer.render(scene, camera);
  }

  rafId = requestAnimationFrame(animate);

  // ── Resize ──
  let resizeTimer;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, 150);
  };
  window.addEventListener("resize", onResize);

  // ── Cleanup ──
  return () => {
    cancelAnimationFrame(rafId);
    clearInterval(clockTimer);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("mousemove", onMouseMove3d);
    document.removeEventListener("keydown", onKeyDown);
    soundBtn?.removeEventListener("click", () => toggleSound(soundBtn, stxt));
    closeBtn?.removeEventListener("click", closeDrawer);
    overlay?.removeEventListener("click", closeDrawer);
    cleanupCursor();
    io.disconnect();
    renderer.dispose();
    pGeo.dispose();
  };
}