"use client";

import { useEffect, useState } from "react";
import { PROJECTS, initPortfolio } from "../components/script";

export default function PortfolioClient() {
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const cleanup = initPortfolio(
      (projectId) => setActiveProject(projectId), 
      ()           => setActiveProject(null)        
    );

    return cleanup;
  }, []);

  const p = activeProject ? PROJECTS[activeProject] : null;

  return (
    <>
      <div id="loader">
        <div
          id="grain"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            opacity: 0.055,
            backgroundImage: 'url("data:image/svg+xml,...")',
            backgroundSize: "180px",
          }}
        />
        <div className="ldr-name">launching</div>
        <div className="ldr-sub">Loading experience</div>
        <div className="ldr-bar-wrap">
          <div className="ldr-bar" id="ldr-bar" />
        </div>
        <div className="ldr-status" id="ldr-status">Initializing scene</div>
        <div className="ldr-dots">
          <div className="ldr-dot" />
          <div className="ldr-dot" />
          <div className="ldr-dot" />
        </div>
      </div>

      <div id="grain" />
      <div id="scanlines" />
      <div id="vignette" />
      <div id="cursor" />
      <div id="cursor-ring" />

      <div id="project-overlay" />
      <aside id="project-drawer" role="dialog" aria-modal="true" aria-label="Project details">
        <div className="drawer-close">
          <button className="drawer-close-btn" id="drawer-close-btn">
            ✕ &nbsp;Close
          </button>
        </div>

        <div className="drawer-scroll" id="drawer-content">
          {p && (
            <>
              <div className="drawer-eyebrow">Project {p.num}</div>
              <div className="drawer-title">{p.title}</div>
              <div className="drawer-subtitle">{p.subtitle}</div>
              <div className="drawer-rule" />

              {p.description
                .trim()
                .split("\n\n")
                .map((para, i) => (
                  <p className="drawer-desc" key={i}>{para}</p>
                ))}

              <div className="drawer-divider" />
              <span className="drawer-section-label">Key Features</span>
              <div className="drawer-highlights">
                {p.highlights.map((h, i) => (
                  <div className="drawer-highlight" key={i}>{h}</div>
                ))}
              </div>

              <div className="drawer-divider" />
              <span className="drawer-section-label">Tech Stack</span>
              <div className="drawer-tags">
                {p.tags.map((tag, i) => (
                  <span className="drawer-tag" key={i}>{tag}</span>
                ))}
              </div>

              <span className="drawer-section-label">Links</span>
              <div className="drawer-links">
                {p.links.map((l, i) => (
                  <a className="drawer-link" href={l.href} target="_blank" rel="noreferrer" key={i}>
                    <span>{l.label}</span>
                    <span className="dl-arrow">↗</span>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </aside>

      <div id="corner-tl" className="home-only">
        <span className="label">Portfolio</span>
        <span className="name">Hamza Shaikh</span>
      </div>

      <div id="corner-tr" className="home-only">
        <div className="time" id="clock">--:--:--</div>
        <div className="date" id="datebox">--- -- ----</div>
      </div>

      <div className="side-line left home-only" />
      <div className="side-line right home-only" />

      <nav id="side-right" aria-label="Page sections">
        <div className="nav-items">
          <div id="nav-spine">
            <div id="nav-spine-dot" />
          </div>
          <a className="nav-item active" href="#section-home" data-section="section-home">
            <span className="nav-num">01</span>Home
          </a>
          <a className="nav-item" href="#section-projects" data-section="section-projects">
            <span className="nav-num">02</span>Projects
          </a>
          <a className="nav-item" href="#section-about" data-section="section-about">
            <span className="nav-num">03</span>About
          </a>
          <a className="nav-item" href="#section-education" data-section="section-education">
            <span className="nav-num">04</span>Education
          </a>
          <a className="nav-item" href="#section-contact" data-section="section-contact">
            <span className="nav-num">05</span>Contact
          </a>
        </div>
      </nav>

      <div id="bottom-strip" className="home-only">
        <div id="bottom-left-panel">
          <button id="soundToggle">
            <div className="knob" />
            <span className="stxt" id="stxt">Sound Off</span>
          </button>

          <div id="hero-intro">
            <span className="intro-name">Software Engineer · Full-Stack Dev</span>
            <span className="intro-bio">
              B.Sc CS student · CGPA 9/9.3 · Passionate about building scalable, real-world software.
            </span>
          </div>

          <a id="resume-btn" href="/Hamza.pdf" download="Hamza.pdf">
            <span className="rb-icon">↓</span>
            <span className="rb-text">Get Resume</span>
          </a>
        </div>

        <div id="btag">
          Hamza Shaikh · Portfolio
          <br />
          Software Engineer · 2025
        </div>
      </div>

      <div id="scroll-root">

        <section id="section-home">
          <div id="scene-wrapper">
            <canvas id="three-canvas" />
          </div>

          <header id="hero">
            <span id="hero-title">Hamza Shaikh</span>
            <span id="hero-sub">Software · Engineer</span>
            <span id="hero-detail">
              Building scalable software &nbsp;·&nbsp; one line at a time &nbsp;·&nbsp; 2025
            </span>
            <span id="hero-rule" />
          </header>

          <div id="scroll-hint">
            <span className="sh-text">Scroll</span>
            <div className="sh-line" />
          </div>
        </section>

        {/* Projects */}
        <section id="section-projects" className="content-section">
          <div className="section-inner">
            <p className="sec-eyebrow reveal">01 / Selected Work</p>
            <h2 className="sec-title reveal">Projects</h2>
            <div className="sec-rule reveal" />

            <div className="projects-grid">
              <div className="project-card reveal" data-project="earthview">
                <p className="project-num">001</p>
                <h3 className="project-name">Earth View – GeoTracker</h3>
                <p className="project-short">
                  An interactive 3D globe visualizing real-time satellites, flights, vessels, weather, and traffic with live telemetry.
                </p>
                <div className="project-tags">
                  <span className="tag">Cesium</span>
                  <span className="tag">Three.js</span>
                  <span className="tag">OpenSky API</span>
                  <span className="tag">TomTom</span>
                  <span className="tag">AISStream</span>
                </div>
                <button className="project-expand-btn">
                  <span>View Details</span>
                  <span className="expand-icon">+</span>
                </button>
              </div>

              <div className="project-card reveal" data-project="pqvault">
                <p className="project-num">002</p>
                <h3 className="project-name">Post-Quantum Cryptography Vault</h3>
                <p className="project-short">
                  A secure desktop vault using post-quantum ML-KEM-768 and AES-256-GCM with CLI, backups, and cloud sync.
                </p>
                <div className="project-tags">
                  <span className="tag">Python</span>
                  <span className="tag">ML-KEM-768</span>
                  <span className="tag">AES-256-GCM</span>
                  <span className="tag">Argon2</span>
                  <span className="tag">Ed25519</span>
                </div>
                <button className="project-expand-btn">
                  <span>View Details</span>
                  <span className="expand-icon">+</span>
                </button>
              </div>

              <div className="project-card reveal" data-project="airoadmap">
                <p className="project-num">003</p>
                <h3 className="project-name">AI Roadmap Generator</h3>
                <p className="project-short">
                  Enter any topic and get a personalized 3D neural-network learning path across Beginner, Core, and Advanced tiers — with videos, diagrams, Manim explainer videos, and a full PDF dashboard.
                </p>
                <div className="project-tags">
                  <span className="tag">Three.js</span>
                  <span className="tag">Python</span>
                  <span className="tag">Manim</span>
                  <span className="tag">OpenAI API</span>
                  <span className="tag">D3.js</span>
                  <span className="tag">MongoDB</span>
                </div>
                <button className="project-expand-btn">
                  <span>View Details</span>
                  <span className="expand-icon">+</span>
                </button>
              </div>

              <div className="project-card reveal" data-project="aixray">
                <p className="project-num">004</p>
                <h3 className="project-name">AI X-Ray Detection System</h3>
                <p className="project-short">
                  Upload a hand, elbow, or knee X-ray and get a Grad-CAM heatmap overlay, fracture prediction score, and interactive 2D/3D scan viewer — with a full report dashboard and history.
                </p>
                <div className="project-tags">
                  <span className="tag">PyTorch</span>
                  <span className="tag">ResNet-50</span>
                  <span className="tag">Grad-CAM</span>
                  <span className="tag">Three.js</span>
                  <span className="tag">Flask</span>
                  <span className="tag">React</span>
                </div>
                <button className="project-expand-btn">
                  <span>View Details</span>
                  <span className="expand-icon">+</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="section-about" className="content-section">
          <div className="section-inner">
            <p className="sec-eyebrow reveal">02 / Who I Am</p>
            <h2 className="sec-title-solid reveal">About</h2>
            <div className="sec-rule reveal" />

            <div className="about-layout">
              <div>
                <p className="about-bio reveal">
                  I&apos;m <strong>Hamza Shaikh</strong>, a software engineer with a strong foundation in
                  programming, algorithms, web and app development, AI, and cloud technologies. Currently
                  pursuing a B.Sc in Computer Science with a CGPA of 9/9.3.
                </p>
                <p className="about-bio reveal" style={{ marginTop: 20 }}>
                  I&apos;m passionate about building <strong>efficient, scalable software solutions</strong> and
                  contributing to real-world projects that make an impact — from 3D geo-visualization to
                  post-quantum cryptography.
                </p>

                <div className="skills-list">
                  {[
                    "Python","JavaScript","C++","Node.js","Flask · Express.js",
                    "MySQL · MongoDB","TensorFlow · OpenCV","Three.js",
                    "HTML · CSS","Git · GitHub","REST APIs","Supabase · Firebase",
                  ].map((skill) => (
                    <div className="skill-item reveal" key={skill}>{skill}</div>
                  ))}
                </div>
              </div>

              <div className="stat-blocks">
                {[
                  { num: "9.0", lbl: "CGPA out of 9.3" },
                  { num: "3+",  lbl: "Major Projects Shipped" },
                  { num: "10+", lbl: "Technologies Mastered" },
                  { num: "250+",   lbl: "Problems Solved on LeetCode" },
                ].map(({ num, lbl }) => (
                  <div className="stat-block reveal" key={lbl}>
                    <div className="stat-num">{num}</div>
                    <div className="stat-lbl">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="section-education" className="content-section">
          <div className="section-inner">
            <p className="sec-eyebrow reveal">03 / Background</p>
            <h2 className="sec-title reveal">Education</h2>
            <div className="sec-rule reveal" />

            <div className="edu-timeline">
              <div className="edu-item reveal">
                <span className="edu-year">2023 – 2026</span>
                <div className="edu-degree">B.Sc — Computer Science</div>
                <div className="edu-school">
                  Pravin Rohidas Patil College of Engineering &amp; Technology
                </div>
                <p className="edu-desc">
                  Pursuing a Bachelor of Science in Computer Science with a strong focus on software
                  engineering, algorithms, and modern development practices. Currently scoring a CGPA of
                  9 out of 9.3.
                </p>
                <div className="edu-badges">
                  <span className="edu-badge">CGPA 9/9.3</span>
                  <span className="edu-badge">Software Engineering</span>
                  <span className="edu-badge">Algorithms</span>
                  <span className="edu-badge">AI &amp; ML</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 72 }}>
              <p className="sec-eyebrow reveal" style={{ marginBottom: 24 }}>Core Technical Skills</p>

              <div className="cert-grid">
                {[
                  { issuer: "Languages",            name: "Python, JavaScript, C++, HTML, CSS, Go (Basic)" },
                  { issuer: "Frameworks & Runtime", name: "Node.js, Flask, Express.js, Three.js" },
                  { issuer: "Databases & Cloud",    name: "MySQL, MongoDB, Supabase, Firebase" },
                  { issuer: "AI / CV / Tools",      name: "TensorFlow, OpenCV, Git, GitHub, VS Code, REST APIs" },
                  { issuer: "CS Fundamentals",      name: "Data Structures & Algorithms, OOPs, Problem Solving" },
                  { issuer: "Competitive Coding",   name: "Active LeetCode practitioner — DSA & problem solving" },
                ].map(({ issuer, name }) => (
                  <div className="cert-card reveal" key={issuer}>
                    <div className="cert-issuer">{issuer}</div>
                    <div className="cert-name">{name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="section-contact" className="content-section">
          <div className="section-inner">
            <p className="sec-eyebrow reveal">04 / Reach Out</p>
            <h2 className="sec-title-solid reveal">Contact</h2>
            <div className="sec-rule reveal" />

            <div className="contact-layout">
              <div>
                <p className="contact-text reveal">
                  I&apos;m seeking roles in dynamic organizations where I can apply my technical knowledge,
                  contribute to real-world projects, and build efficient, scalable software solutions.
                </p>
                <p
                  className="contact-text reveal"
                  style={{ marginTop: 20, color: "rgba(255,200,220,0.35)", fontSize: 12 }}
                >
                  Available for internships, full-time roles &amp; collaborations. Usually responds within
                  24 hours.
                </p>
              </div>

              <div className="contact-links reveal">
                {[
                  { label: "linkedin",    val: "hamzashaikh1654w@gmail.com", href: "https://www.linkedin.com/in/hamza-shaikh-0414193ab/" },
                  { label: "Email",    val: "hamzashaikh1654w@gmail.com", href: "mailto:hamzashaikh1654w@gmail.com" },
                  { label: "GitHub",   val: "github.com",     href: "https://github.com/webgo-oss",    ext: true },
                  { label: "LeetCode", val: "leetcode.com",   href: "https://leetcode.com/u/SyupWy7CEZ/",  ext: true },
                ].map(({ label, val, href, ext }) => (
                  <a
                    className="contact-link"
                    href={href}
                    key={label}
                    {...(ext ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    <span className="cl-label">{label}</span>
                    <span className="cl-val">{val}</span>
                    <span className="cl-arrow">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>{/* /scroll-root */}

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer id="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="fb-name">Hamza Shaikh</span>
              <span className="fb-role">Software Engineer · Open to Opportunities</span>
            </div>

            <div className="footer-divider" />

            <div className="footer-links">
              <a className="footer-link" href="mailto:hamzashaikh1654w@gmail.com">
                hamzashaikh1654w@gmail.com
              </a>
              <a className="footer-link" href="https://www.linkedin.com/in/hamza-shaikh-0414193ab/">
               linkedin
              </a>
              <a className="footer-link" href="https://github.com/webgo-oss" target="_blank" rel="noreferrer">
                github.com
              </a>
              <a className="footer-link" href="https://leetcode.com/u/SyupWy7CEZ/" target="_blank" rel="noreferrer">
                leetcode.com
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-copy">
              © 2025 Hamza Shaikh — All rights reserved. Built with Three.js · GLSL · Love
            </span>
            <div className="footer-status">
              <div className="footer-dot" />
              <span className="footer-status-text">Open to work</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}