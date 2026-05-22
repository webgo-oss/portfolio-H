"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function Keyboard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cursorDot = document.getElementById("cursor") as HTMLDivElement | null;
    const cursorRing = document.getElementById("cursor-ring") as HTMLDivElement | null;
    const heroEl = document.getElementById("hero") as HTMLDivElement | null;
    const scrollHint = document.getElementById("scroll-hint") as HTMLDivElement | null;
    const canvasEl = document.getElementById("three-canvas") as HTMLCanvasElement | null;
    const soundBtn = document.getElementById("soundToggle") as HTMLButtonElement | null;
    const stxt = document.getElementById("stxt") as HTMLSpanElement | null;

    const tickerList = document.getElementById("ticker-list") as HTMLDivElement | null;
    const tickItems = tickerList ? Array.from(tickerList.querySelectorAll<HTMLElement>(".ticker-item")) : [];
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-item"));
    const spineDot = document.getElementById("nav-spine-dot") as HTMLDivElement | null;
    const navItemsEl = document.querySelector("#side-right .nav-items") as HTMLDivElement | null;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    let cursorRAF = 0;
    let animRAF = 0;
    let t = 0;
    let scrollY = 0;
    let targetScrollY = 0;
    let tickIdx = 0;

    let audioCtx: AudioContext | null = null;
    let soundEnabled = false;
    let lastKey: THREE.Mesh | null = null;
    let kbGroup: THREE.Group | null = null;

    const sections = ["section-home", "section-projects", "section-about", "section-frontend", "section-contact"];

    const raycaster = new THREE.Raycaster();
    const mouse3d = new THREE.Vector2();
    const allKeys: THREE.Mesh[] = [];
    const hitboxes: THREE.Mesh[] = [];
    const LERP = 0.15;
    const PRESS = -0.055;
    const KEY_COLOR = 0xff2266;

    function updateClock() {
      const now = new Date();
      const clock = document.getElementById("clock");
      const datebox = document.getElementById("datebox");

      if (clock) {
        clock.textContent = now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      }

      if (datebox) {
        datebox.textContent = now
          .toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .toUpperCase();
      }
    }

    function updateNav() {
      const midY = window.scrollY + window.innerHeight * 0.4;
      let activeId = sections[0];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= midY) activeId = id;
      }

      navLinks.forEach((a) => {
        const target = a.getAttribute("data-section");
        const isActive = target === activeId;
        a.classList.toggle("active", isActive);

        if (isActive && spineDot && navItemsEl) {
          const aRect = a.getBoundingClientRect();
          const pRect = navItemsEl.getBoundingClientRect();
          const relY = aRect.top - pRect.top + aRect.height / 2 - 2.5;
          spineDot.style.top = `${relY}px`;
        }
      });
    }

    function animSys() {
      const defs = [
        { bar: "bar-cpu", val: "val-cpu", base: 35, range: 40 },
        { bar: "bar-mem", val: "val-mem", base: 55, range: 25 },
        { bar: "bar-fps", val: "val-fps", base: 88, range: 12, label: (v: number) => Math.round(v) },
        { bar: "bar-net", val: "val-net", base: 15, range: 40 },
      ];

      defs.forEach((d) => {
        const v = d.base + Math.random() * d.range;
        const b = document.getElementById(d.bar);
        const tEl = document.getElementById(d.val);
        if (b) b.style.width = `${v.toFixed(0)}%`;
        if (tEl) tEl.textContent = d.label ? String(d.label(v)) : `${v.toFixed(0)}%`;
      });
    }

    function advanceTicker() {
      if (!tickerList || tickItems.length < 2) return;
      tickItems.forEach((tItem) => tItem.classList.remove("t-active"));
      tickIdx = (tickIdx + 1) % (tickItems.length - 1);
      tickItems[tickIdx].classList.add("t-active");
      tickerList.style.transform = `translateY(-${tickIdx * 22}px)`;
    }

    function animCursor() {
      cursorRAF = window.requestAnimationFrame(animCursor);
      if (cursorDot) {
        cursorDot.style.left = `${mx}px`;
        cursorDot.style.top = `${my}px`;
      }
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (cursorRing) {
        cursorRing.style.left = `${rx}px`;
        cursorRing.style.top = `${ry}px`;
      }
    }

    async function initAudio() {
      if (!audioCtx) audioCtx = new window.AudioContext();
      if (audioCtx.state === "suspended") await audioCtx.resume();
    }

    function playClack() {
      if (!soundEnabled || !audioCtx) return;
      const ctx = audioCtx;
      const t0 = ctx.currentTime;

      const master = ctx.createGain();
      master.gain.value = 0.38;
      master.connect(ctx.destination);

      const bufSize = Math.floor(ctx.sampleRate * 0.025);
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
      ng.gain.setValueAtTime(1, t0);
      ng.gain.exponentialRampToValueAtTime(0.001, t0 + 0.018);

      noise.connect(bp);
      bp.connect(ng);
      ng.connect(master);
      noise.start(t0);
      noise.stop(t0 + 0.025);

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(240, t0);
      osc.frequency.exponentialRampToValueAtTime(55, t0 + 0.045);

      const og = ctx.createGain();
      og.gain.setValueAtTime(0.75, t0);
      og.gain.exponentialRampToValueAtTime(0.001, t0 + 0.07);

      osc.connect(og);
      og.connect(master);
      osc.start(t0);
      osc.stop(t0 + 0.08);
    }

    function splitByIslands(mesh: THREE.Mesh, targetGroup: THREE.Group) {
      const geo = mesh.geometry.clone() as THREE.BufferGeometry;
      if (!geo.index) return [mesh];

      const idx = geo.index;
      const triCount = idx.count / 3;
      const v2t = Array.from({ length: geo.attributes.position.count }, () => [] as number[]);

      for (let i = 0; i < triCount; i++) {
        v2t[idx.getX(i * 3)].push(i);
        v2t[idx.getX(i * 3 + 1)].push(i);
        v2t[idx.getX(i * 3 + 2)].push(i);
      }

      const visited = new Uint8Array(triCount);
      const pieces: THREE.Mesh[] = [];

      for (let i = 0; i < triCount; i++) {
        if (visited[i]) continue;

        const q = [i];
        const comp: number[] = [];
        visited[i] = 1;

        while (q.length) {
          const tri = q.shift() as number;
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
        const sp: number[] = [];
        const sn: number[] = [];
        const su: number[] = [];
        const si: number[] = [];
        const map = new Map<number, number>();

        comp.forEach((tri) => {
          for (let j = 0; j < 3; j++) {
            const o = idx.getX(tri * 3 + j);
            if (!map.has(o)) {
              map.set(o, sp.length / 3);
              sp.push(geo.attributes.position.getX(o), geo.attributes.position.getY(o), geo.attributes.position.getZ(o));
              sn.push(geo.attributes.normal.getX(o), geo.attributes.normal.getY(o), geo.attributes.normal.getZ(o));
              su.push(geo.attributes.uv.getX(o), geo.attributes.uv.getY(o));
            }
            si.push(map.get(o)!);
          }
        });

        sg.setAttribute("position", new THREE.Float32BufferAttribute(sp, 3));
        sg.setAttribute("normal", new THREE.Float32BufferAttribute(sn, 3));
        sg.setAttribute("uv", new THREE.Float32BufferAttribute(su, 2));
        sg.setIndex(si);
        sg.computeBoundingBox();

        const size = new THREE.Vector3();
        sg.boundingBox?.getSize(size);

        const mat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
        mat.metalness = 0.6;
        mat.roughness = 0.3;

        const nm = new THREE.Mesh(sg, mat);

        if (size.x < 1.5 || size.y < 1.0) {
          nm.userData.targetZ = 0;
          nm.userData.currentZ = 0;

          const hg = sg.clone();
          hg.center();
          hg.scale(0.85, 0.85, 1);

          const c = new THREE.Vector3();
          sg.boundingBox?.getCenter(c);

          const hb = new THREE.Mesh(hg, new THREE.MeshBasicMaterial({ visible: false }));
          hb.position.copy(c);
          hb.userData.parentKey = nm;

          targetGroup.add(hb);
          hitboxes.push(hb);
          allKeys.push(nm);
        }

        pieces.push(nm);
      }

      return pieces;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0.139, -1.397, 2.028);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x080406, 1);

    scene.fog = new THREE.FogExp2(0x1a040b, 0.032);

    const bgSphere = new THREE.Mesh(
      new THREE.SphereGeometry(60, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x0d0407, side: THREE.BackSide })
    );
    scene.add(bgSphere);

    const pCount = 3000;
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 90;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 90;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 90;
      const tt = Math.random();
      pCol[i * 3] = 1;
      pCol[i * 3 + 1] = 0.3 + tt * 0.55;
      pCol[i * 3 + 2] = 0.55 + tt * 0.4;
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

    const loader = new GLTFLoader();
    loader.load("/mechanical_keyboard_-_aesthetic.glb", (gltf) => {
      const kb = new THREE.Group();

      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const materialName = (mesh.material as any)?.name ?? "";
          const childName = mesh.name ?? "";

          if (materialName.toLowerCase().includes("button") || childName.toLowerCase().includes("key")) {
            splitByIslands(mesh, kb).forEach((k) => kb.add(k));
          } else {
            const c = mesh.clone();
            if (Array.isArray(c.material)) {
              c.material = c.material.map((m) => m.clone());
            } else if (c.material) {
              const cm = c.material.clone() as THREE.MeshStandardMaterial;
              cm.metalness = 0.7;
              cm.roughness = 0.25;
              c.material = cm;
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
    });

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      mouse3d.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse3d.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY;
      updateNav();
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach((el) => revealObs.observe(el));

    const advanceTickerTimer = window.setInterval(advanceTicker, 1800);
    const sysTimer = window.setInterval(animSys, 2200);
    const clockTimer = window.setInterval(updateClock, 1000);

    const animate = () => {
      animRAF = window.requestAnimationFrame(animate);
      t += 0.01;

      scrollY += (targetScrollY - scrollY) * 0.08;

      rimLight.intensity = 12 + Math.sin(t * 1.3) * 3;
      fillLight.intensity = 4 + Math.sin(t * 0.8 + 1) * 2;
      particles.rotation.y += 0.00018;
      particles.rotation.x += 0.00006;

      const vh = window.innerHeight;
      const sf = Math.min(scrollY / vh, 1);

      if (heroEl) heroEl.style.opacity = Math.max(0, 1 - sf * 2.5).toString();
      if (scrollHint) scrollHint.style.opacity = Math.max(0, 1 - sf * 4).toString();
      if (canvasEl) canvasEl.style.opacity = Math.max(0, 1 - sf * 1.8).toString();

      if (kbGroup) {
        kbGroup.position.y = -0.6 - sf * 3.2;
        kbGroup.rotation.x = sf * 0.35;
        kbGroup.scale.setScalar(1 - sf * 0.12);
      }

      const keyboardVisible = sf < 0.55;

      if (keyboardVisible && hitboxes.length > 0) {
        raycaster.setFromCamera(mouse3d, camera);
        const hits = raycaster.intersectObjects(hitboxes);
        const activeKey = hits.length > 0 ? (hits[0].object.userData.parentKey as THREE.Mesh) : null;

        if (activeKey && activeKey !== lastKey) playClack();
        lastKey = activeKey;

        allKeys.forEach((key) => {
          const material = key.material as THREE.MeshStandardMaterial;
          if (key === activeKey) {
            key.userData.targetZ = PRESS;
            material.emissive.setHex(KEY_COLOR);
            material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity || 0, 2.2, LERP);
          } else {
            key.userData.targetZ = 0;
            material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity || 0, 0, LERP);
          }

          const delta = key.userData.targetZ - key.userData.currentZ;
          if (Math.abs(delta) > 0.0005) {
            key.userData.currentZ += delta * LERP;
            key.position.z = key.userData.currentZ;
          } else if (key.userData.targetZ === 0) {
            key.position.z = 0;
            key.userData.currentZ = 0;
          }
        });
      } else if (lastKey !== null) {
        lastKey = null;
        allKeys.forEach((key) => {
          const material = key.material as THREE.MeshStandardMaterial;
          key.userData.targetZ = 0;
          key.userData.currentZ = 0;
          key.position.z = 0;
          material.emissiveIntensity = 0;
        });
      }

      controls.update();
      renderer.render(scene, camera);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    if (soundBtn) {
      soundBtn.addEventListener("click", async () => {
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
          await initAudio();
          soundBtn.classList.add("on");
          if (stxt) stxt.textContent = "Sound On";
        } else {
          soundBtn.classList.remove("on");
          if (stxt) stxt.textContent = "Sound Off";
        }
      });
    }

    updateClock();
    updateNav();
    animCursor();
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(cursorRAF);
      window.cancelAnimationFrame(animRAF);
      window.clearInterval(advanceTickerTimer);
      window.clearInterval(sysTimer);
      window.clearInterval(clockTimer);
      revealObs.disconnect();
      controls.dispose();
      renderer.dispose();
      if (audioCtx) audioCtx.close();
    };
  }, []);

  return <canvas ref={canvasRef} id="three-canvas" />;
}