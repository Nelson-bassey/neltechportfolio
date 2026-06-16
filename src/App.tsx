import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  SpotLight,
  ContactShadows,
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// 1. Navigation Bar (Smart Scroll-to-Close)
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Smart Scroll Listener - Ignores tapping wiggles, only closes on actual scroll
  useEffect(() => {
    if (!isOpen) return;

    const initialScrollY = window.scrollY;

    const handleScroll = () => {
      // Only close the menu if the user scrolls more than 40px
      if (Math.abs(window.scrollY - initialScrollY) > 40) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinkClass =
    "relative pb-1 hover:text-white transition-colors cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300";

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="px-6 md:px-12 py-6 flex justify-between items-center relative z-50">
        <div
          onClick={() => scrollToSection("top")}
          className="text-white text-lg tracking-[0.2em] uppercase font-light cursor-pointer"
        >
          NELSON
        </div>

        <div className="hidden md:flex gap-8 text-xs tracking-widest uppercase text-gray-400">
          <button
            onClick={() => scrollToSection("top")}
            className={navLinkClass}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={navLinkClass}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("work")}
            className={navLinkClass}
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={navLinkClass}
          >
            Engage
          </button>
        </div>

        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`absolute w-6 h-[1.5px] bg-white transition-all duration-300 ease-out ${isOpen ? "rotate-45" : "-translate-y-2"}`}
          ></span>
          <span
            className={`absolute w-6 h-[1.5px] bg-white transition-all duration-300 ease-out ${isOpen ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}
          ></span>
          <span
            className={`absolute w-6 h-[1.5px] bg-white transition-all duration-300 ease-out ${isOpen ? "-rotate-45" : "translate-y-2"}`}
          ></span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full md:hidden overflow-hidden bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          >
            <div className="flex flex-col items-start px-6 pt-4 pb-8 gap-8">
              <button
                onClick={() => scrollToSection("top")}
                className="text-white text-xl tracking-[0.2em] uppercase font-light w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-white text-xl tracking-[0.2em] uppercase font-light w-full text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("work")}
                className="text-white text-xl tracking-[0.2em] uppercase font-light w-full text-left"
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-white text-xl tracking-[0.2em] uppercase font-light w-full text-left"
              >
                Engage
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// 2. 3D Geometric Core
const MetallicCore = ({ isMobile }: { isMobile: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      const targetRotationX = _state.pointer.y * 0.4;
      const targetRotationY = (isMobile ? 0 : 2.0) + _state.pointer.x * 0.4;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotationX,
        0.05,
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.05,
      );
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[2.0, 0, 0]} scale={1}>
        <torusKnotGeometry args={[1, 0.3, 256, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.1}
          envMapIntensity={2.5}
        />
      </mesh>
    </Float>
  );
};

// 3. Cinematic Lighting
const CinematicLighting = () => (
  <>
    <color attach="background" args={["#050505"]} />
    <ambientLight intensity={0.2} />
    <SpotLight
      position={[5, 5, 5]}
      angle={0.15}
      penumbra={1}
      intensity={2}
      color="#ffffff"
      castShadow
    />
    <SpotLight
      position={[-5, -5, -5]}
      angle={0.3}
      penumbra={1}
      intensity={1}
      color="#a0a0a0"
    />
    <Environment preset="studio" />
    <ContactShadows
      position={[0, -2, 0]}
      opacity={0.5}
      scale={10}
      blur={2}
      far={4}
      color="#ffffff"
    />
  </>
);

// 4. About Section
const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-16 md:py-32 px-8 md:px-24 max-w-7xl mx-auto border-t border-white/5 flex flex-col md:flex-row items-center gap-12 md:gap-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-5/12 flex justify-center md:justify-start"
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-1 border border-white/20">
          <div className="w-full h-full rounded-full overflow-hidden bg-[#0d0d0d]">
            <img
              src="/nelson.png"
              alt="Nelson Bassey"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="w-full md:w-7/12 text-center md:text-left"
      >
        <p className="text-gray-500 tracking-[0.2em] text-xs uppercase mb-4">
          The Architect
        </p>
        <h3 className="text-3xl md:text-5xl font-light tracking-tight mb-8">
          Behind the Code
        </h3>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 font-light">
          I am a professional Full Stack Developer and Graphic Designer with a
          deep focus on crafting intelligent, scalable digital experiences. My
          work bridges the gap between high-end cinematic aesthetics and robust
          server-side architecture.
        </p>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
          With expertise spanning React, modern frontend cinematography, and
          comprehensive MERN systems, I engineer premium, detail-oriented
          solutions that refuse to compromise on visual identity or technical
          performance.
        </p>
      </motion.div>
    </section>
  );
};

// 5. Contact & Footer Section
const ContactFooter = () => {
  const whatsappMessage = encodeURIComponent(
    "Hi Nelson, I just explored your portfolio and I'm interested in elevating my brand's digital presence. Let's talk!",
  );
  const whatsappUrl = `https://wa.me/2347031103125?text=${whatsappMessage}`;

  return (
    <section
      id="contact"
      className="relative py-16 md:py-32 px-8 md:px-24 max-w-7xl mx-auto flex flex-col items-center justify-center text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-3xl w-full"
      >
        <p className="text-gray-500 tracking-[0.2em] text-xs uppercase mb-4">
          Initiate Contact
        </p>
        <h3 className="text-3xl md:text-6xl font-light text-white mb-8 tracking-tight">
          Let's build something intelligent.
        </h3>
        <p className="text-gray-400 mb-12 text-sm md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
          I am currently open for new architectural challenges and full-stack
          opportunities. Whether you have a project in mind or simply want to
          connect, my inbox is always open.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-16 w-full px-4 md:px-0">
          <a
            href="mailto:hello@nelsonbassey.com"
            className="w-full md:w-auto px-10 py-5 bg-white text-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors duration-300 font-medium"
          >
            Send Mail to Nelson
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full md:w-auto px-10 py-5 border border-white/20 text-white text-[10px] md:text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            Chat on WhatsApp
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] text-gray-500 uppercase tracking-widest font-mono gap-6 lg:gap-0"
      >
        <p>© {new Date().getFullYear()} Nelson Bassey. All rights reserved.</p>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
          <a
            href="#"
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
            aria-label="GitHub"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
            aria-label="LinkedIn"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
            aria-label="Twitter"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
            aria-label="Facebook"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
            aria-label="Instagram"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.88z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
            aria-label="TikTok"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.5 3.96-1.6 5.58-1.14 1.67-2.91 2.8-4.89 3.12-1.92.32-3.95.12-5.74-.69-1.74-.79-3.14-2.18-3.93-3.88-.81-1.76-1.02-3.79-.6-5.69.42-1.89 1.48-3.56 2.97-4.73 1.44-1.13 3.3-1.71 5.12-1.68.22 0 .43.01.65.02v4.01c-.13 0-.25-.01-.38-.01-1.02-.02-2.06.28-2.89.87-.85.61-1.42 1.52-1.62 2.54-.2 1.02-.05 2.1.4 3.01.44.89 1.2 1.61 2.1 2 1.02.43 2.22.48 3.27.15 1.06-.34 1.96-1.08 2.47-2.05.47-.9.65-1.94.62-2.95V.02h-.03z" />
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

// Engineering Portfolio Data
const PROJECTS = [
  {
    title: "MERN School Management System",
    category: "Full Stack Architecture / SaaS",
    description:
      "An enterprise-grade educational platform engineered with robust role-based access controls, complete administrative workflows, and a scalable backend architecture.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    link: "https://github.com/your-username",
  },
  {
    title: "BOSCO GADGETS Serverless Store",
    category: "Cloud Architecture / E-Commerce",
    description:
      "A high-performance digital storefront featuring dynamic cart selection and a seamless WhatsApp-based checkout integration.",
    tags: ["JavaScript", "Firebase", "HTML/CSS", "API Integration"],
    link: "https://github.com/your-username",
  },
  {
    title: "EJEBE KITCHEN Gallery Engine",
    category: "Frontend Cinematography",
    description:
      "A premium, conversion-focused product showcase boasting fluid animations, custom interfaces, and a sophisticated minimalist aesthetic.",
    tags: ["Vanilla JS", "UI/UX Design", "Performance Optimization"],
    link: "https://github.com/your-username",
  },
];

// Main Application Entry
export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
      <Navbar />

      {/* SECTION 1: HERO (Dynamic Viewport Height for perfectly framed mobile view) */}
      <section className="relative w-screen h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* 3D Canvas Layer - Safely Hidden on Mobile */}
        {!isMobile && (
          <div className="absolute inset-0 z-0 hidden md:block">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <CinematicLighting />
              <MetallicCore isMobile={false} />
            </Canvas>
          </div>
        )}

        <div className="relative z-10 w-full flex flex-col justify-center px-8 md:px-24 pointer-events-none mt-10 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-gray-400 tracking-[0.2em] text-xs md:text-sm uppercase mb-4">
              Full Stack Developer & Designer
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          >
            <h1 className="text-white text-5xl md:text-8xl font-light tracking-tight mb-6">
              Nelson Bassey
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="max-w-md lg:max-w-xl"
          >
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 font-light pointer-events-auto">
              Many businesses settle for generic websites that cost them
              credibility and customers. I build the exact opposite. By blending
              cinematic design with robust engineering, I create premium digital
              experiences that immediately establish trust and turn your
              visitors into clients.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="pointer-events-auto flex flex-col sm:flex-row gap-4 w-full sm:w-auto pr-8 md:pr-0"
          >
            <button
              onClick={() =>
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 tracking-widest text-[10px] md:text-xs uppercase cursor-pointer"
            >
              Explore Work
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-gray-200 transition-all duration-300 tracking-widest text-[10px] md:text-xs uppercase font-medium cursor-pointer"
            >
              Hire Me
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <AboutSection />

      {/* SECTION 3: CASE STUDIES */}
      <section
        id="work"
        className="py-16 md:py-32 px-8 md:px-24 max-w-7xl mx-auto border-t border-white/5"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-20 text-center md:text-left"
        >
          <p className="text-gray-500 tracking-[0.2em] text-xs uppercase mb-2">
            Selected Productions
          </p>
          <h3 className="text-3xl md:text-4xl font-light tracking-tight">
            Case Studies
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="group relative bg-[#0d0d0d] border border-white/5 p-8 md:p-12 hover:border-white/20 transition-all duration-500 flex flex-col justify-between min-h-[350px] md:min-h-[400px]"
            >
              <div>
                <span className="text-[10px] md:text-xs text-gray-500 tracking-wider font-mono block mb-6">
                  {project.category}
                </span>
                <h4 className="text-xl md:text-2xl font-light text-white group-hover:text-gray-300 transition-colors duration-300 mb-4">
                  {project.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed font-light mb-8">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, tIndex) => (
                    <span
                      key={tIndex}
                      className="text-[9px] md:text-[10px] uppercase tracking-widest font-mono px-2.5 py-1 bg-white/5 text-gray-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/5 group-hover:border-white/20 transition-colors duration-500">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <span className="text-[10px] uppercase tracking-widest font-mono">
                      View Project
                    </span>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4: CONTACT & FOOTER */}
      <ContactFooter />
    </div>
  );
}
