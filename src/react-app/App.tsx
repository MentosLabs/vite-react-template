// src/App.tsx

// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import cloudflareLogo from "./assets/Cloudflare_Logo.svg";
// import honoLogo from "./assets/hono.svg";
// import "./App.css";

// function App() {
// 	const [count, setCount] = useState(0);
// 	const [name, setName] = useState("unknown");

// 	return (
// 		<>
// 			<div>
// 				<a href="https://vite.dev" target="_blank">
// 					<img src={viteLogo} className="logo" alt="Vite logo" />
// 				</a>
// 				<a href="https://react.dev" target="_blank">
// 					<img src={reactLogo} className="logo react" alt="React logo" />
// 				</a>
// 				<a href="https://hono.dev/" target="_blank">
// 					<img src={honoLogo} className="logo cloudflare" alt="Hono logo" />
// 				</a>
// 				<a href="https://workers.cloudflare.com/" target="_blank">
// 					<img
// 						src={cloudflareLogo}
// 						className="logo cloudflare"
// 						alt="Cloudflare logo"
// 					/>
// 				</a>
// 			</div>
// 			<h1>Vite + React + Hono + Cloudflare</h1>
// 			<div className="card">
// 				<button
// 					onClick={() => setCount((count) => count + 1)}
// 					aria-label="increment"
// 				>
// 					count is {count}
// 				</button>
// 				<p>
// 					Edit <code>src/App.tsx</code> and save to test HMR
// 				</p>
// 			</div>
// 			<div className="card">
// 				<button
// 					onClick={() => {
// 						fetch("/api/")
// 							.then((res) => res.json() as Promise<{ name: string }>)
// 							.then((data) => setName(data.name));
// 					}}
// 					aria-label="get name"
// 				>
// 					Name from API is: {name}
// 				</button>
// 				<p>
// 					Edit <code>worker/index.ts</code> to change the name
// 				</p>
// 			</div>
// 			<p className="read-the-docs">Click on the logos to learn more</p>
// 		</>
// 	);
// }

// export default App;
import { useState, useRef, useEffect, useCallback } from "react";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: "classroom",
    name: "Classroom Buddy",
    desc: "Warm lavender with mascot guide — perfect for primary science",
    bg: "linear-gradient(135deg, #e8eaf6 0%, #c5cae9 40%, #dce8f5 100%)",
    card: { bg: "rgba(255,255,255,0.96)", border: "#5C6BC0", shadow: "#3949AB", header: "linear-gradient(90deg,#5C6BC0,#7E57C2)" },
    accent: "#5C6BC0", tag: "🏫", dark: false
  },
  {
    id: "nature",
    name: "Nature Explorer",
    desc: "Fresh greens & earth tones — ideal for biology & environment",
    bg: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 40%, #DCEDC8 100%)",
    card: { bg: "rgba(255,255,255,0.96)", border: "#388E3C", shadow: "#1B5E20", header: "linear-gradient(90deg,#43A047,#66BB6A)" },
    accent: "#2E7D32", tag: "🌿", dark: false
  },
  {
    id: "space",
    name: "Space Academy",
    desc: "Deep cosmos dark theme — captivating for older learners",
    bg: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #1a0a2e 100%)",
    card: { bg: "rgba(20,20,50,0.95)", border: "#7C4DFF", shadow: "#00E5FF", header: "linear-gradient(90deg,#7C4DFF,#00E5FF)" },
    accent: "#7C4DFF", tag: "🚀", dark: true
  },
  {
    id: "sunshine",
    name: "Sunshine Studio",
    desc: "Warm yellows & coral — energetic, joyful early learning",
    bg: "linear-gradient(135deg, #FFFDE7 0%, #FFF9C4 40%, #FFF3E0 100%)",
    card: { bg: "rgba(255,255,255,0.97)", border: "#F57C00", shadow: "#E65100", header: "linear-gradient(90deg,#FF8F00,#FF6F00)" },
    accent: "#E65100", tag: "☀️", dark: false
  },
  {
    id: "ocean",
    name: "Ocean Lab",
    desc: "Deep teal gradients — calm focus for science & geography",
    bg: "linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 40%, #E0F2F1 100%)",
    card: { bg: "rgba(255,255,255,0.96)", border: "#00838F", shadow: "#006064", header: "linear-gradient(90deg,#00838F,#00ACC1)" },
    accent: "#00695C", tag: "🌊", dark: false
  },
  {
    id: "candy",
    name: "Candy Pop",
    desc: "Bold pastels & bouncy type — playful preschool to grade 3",
    bg: "linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 40%, #E1BEE7 100%)",
    card: { bg: "rgba(255,255,255,0.97)", border: "#E91E63", shadow: "#AD1457", header: "linear-gradient(90deg,#E91E63,#9C27B0)" },
    accent: "#AD1457", tag: "🍭", dark: false
  }
];

const SLIDES_DATA = [
  { id: "intro", heading: "What Will I Learn?", icon: "📚", bg: "#E8F5E9",
    text: "In this chapter, we will compare and contrast characteristics that distinguish major groups of living things — plants and animals. We will classify animals as vertebrates and invertebrates, and plants as flowering and non-flowering. We will also explore biodiversity and learn how to protect it.",
    shortDesc: "Learning objectives overview", duration: 9 },
  { id: "similar", heading: "Are All Living Things Similar?", icon: "🌿", bg: "#F1F8E9",
    text: "Living things include humans, animals, plants and microorganisms. All of them share similar characteristics: they are all living things, made up of cells, need energy to live, can breathe, can grow, and can respond to their environment.",
    shortDesc: "Shared traits of all life", duration: 8 },
  { id: "comparison", heading: "Plants vs Animals", icon: "⚖️", bg: "#E3F2FD",
    text: "Plants produce their own food using carbon dioxide, water and sunlight. Animals cannot — they depend on plants and other animals. Plants cannot move; animals can. Plants breathe through stomata; animals use lungs or gills. Most plants grow from seeds; animals lay eggs or give birth.",
    shortDesc: "Key differences compared", duration: 10 },
  { id: "vertebrates", heading: "Vertebrates", icon: "🦴", bg: "#FFF8E1",
    text: "Vertebrates are animals with a backbone called an endoskeleton. Found on land, in oceans, rivers, forests and deserts. Around 45,000 species exist on Earth. Examples include horse, frog, snake, fish and pigeon.",
    shortDesc: "Animals with a backbone", duration: 8 },
  { id: "invertebrates", heading: "Invertebrates", icon: "🦀", bg: "#FBE9E7",
    text: "Invertebrates are animals without a backbone. Most have a hard outer exoskeleton — like crabs and beetles. Some have soft bodies like worms and jellyfish. The largest group are insects, with a hard chitin-based shell. Examples: crab, wasp, centipede, spider, starfish.",
    shortDesc: "Animals without backbone", duration: 9 },
  { id: "flowering", heading: "Flowering Plants", icon: "🌸", bg: "#FCE4EC",
    text: "Flowering plants, also called Angiosperms, produce flowers which are their reproductive organs. Seeds develop inside fruits. Common examples are lavender, rose and apple tree. These are the largest group of plants on Earth with over 250,000 species.",
    shortDesc: "Plants that make flowers", duration: 8 },
  { id: "nonflowering", heading: "Non-Flowering Plants", icon: "🌲", bg: "#E8F5E9",
    text: "Non-flowering plants do not produce flowers. Conifers are called gymnosperms — their seeds are attached to wooden cones. Some non-flowering plants produce no seeds at all — called seedless plants. Examples: ferns, mosses, sago palm and maidenhair tree.",
    shortDesc: "Plants without flowers", duration: 8 },
  { id: "biodiversity", heading: "Biodiversity", icon: "🌍", bg: "#E0F7FA",
    text: "Biodiversity means the variety of living organisms in an environment. All organisms live together to keep the environment balanced. Biodiversity provides food, medicine, oxygen and life conditions for all living things on Earth.",
    shortDesc: "Variety of life on Earth", duration: 8 },
  { id: "threats", heading: "Threats to Biodiversity", icon: "⚠️", bg: "#FFF3E0",
    text: "Threats include deforestation, pollution, habitat loss, population growth, global warming and climate change. These have led to extinction of species like the mammoth, dodo bird and Tasmanian tiger. Tiger, mountain panda and gorilla are now endangered.",
    shortDesc: "Human impact on nature", duration: 9 },
  { id: "protect", heading: "Ways to Protect Biodiversity", icon: "🛡️", bg: "#E8EAF6",
    text: "Conservation means protecting variety of species. Stop cutting forests. Create laws to protect endangered species. Ban hunting and capturing wild animals. Introduce afforestation programs. Avoid plastic pollution in oceans to protect marine biodiversity.",
    shortDesc: "Conservation strategies", duration: 9 }
];

const MASCOT_SVG = `<svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="60" cy="108" rx="42" ry="50" fill="#7EC8E3"/>
  <ellipse cx="60" cy="102" rx="38" ry="44" fill="#A8DDEF"/>
  <circle cx="60" cy="58" r="32" fill="#7EC8E3"/>
  <circle cx="60" cy="58" r="28" fill="#A8DDEF"/>
  <ellipse cx="45" cy="52" rx="13" ry="15" fill="white"/>
  <ellipse cx="75" cy="52" rx="13" ry="15" fill="white"/>
  <circle cx="45" cy="54" r="8" fill="#3B2A1A"/>
  <circle cx="75" cy="54" r="8" fill="#3B2A1A"/>
  <circle cx="47" cy="51" r="3" fill="white"/>
  <circle cx="77" cy="51" r="3" fill="white"/>
  <rect x="30" y="38" width="22" height="10" rx="5" fill="#E8922A" transform="rotate(-15 41 43)"/>
  <rect x="68" y="38" width="22" height="10" rx="5" fill="#E8922A" transform="rotate(15 79 43)"/>
  <ellipse cx="60" cy="74" rx="8" ry="5" fill="#7EC8E3"/>
  <path d="M52 78 Q60 86 68 78" stroke="#3B2A1A" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="42" cy="76" rx="5" ry="3" fill="#F4A0B0"/>
  <ellipse cx="78" cy="76" rx="5" ry="3" fill="#F4A0B0"/>
  <ellipse cx="30" cy="120" rx="14" ry="8" fill="#5BB8D4" transform="rotate(-30 30 120)"/>
  <ellipse cx="90" cy="120" rx="14" ry="8" fill="#5BB8D4" transform="rotate(30 90 120)"/>
  <ellipse cx="48" cy="152" rx="10" ry="6" fill="#5BB8D4"/>
  <ellipse cx="72" cy="152" rx="10" ry="6" fill="#5BB8D4"/>
</svg>`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function TabBtn({ id, label, icon, active, onClick }) {
  return (
    <button onClick={() => onClick(id)} style={{
      padding: "7px 14px", borderRadius: "20px", border: "none",
      cursor: "pointer", fontSize: "12px", fontWeight: 800,
      fontFamily: "inherit",
      background: active ? "white" : "rgba(255,255,255,0.18)",
      color: active ? "#1a1a3e" : "rgba(255,255,255,0.9)",
      transition: "all 0.2s", whiteSpace: "nowrap",
      boxShadow: active ? "0 2px 10px rgba(0,0,0,0.2)" : "none"
    }}>{icon} {label}</button>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "white", borderRadius: "18px",
      padding: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
      ...style
    }}>{children}</div>
  );
}

function SectionTitle({ children }) {
  return <div style={{ fontWeight: 800, fontSize: "14px", color: "#1a1a3e", marginBottom: "12px" }}>{children}</div>;
}

// ─── VIDEO CANVAS ─────────────────────────────────────────────────────────────

function VideoCanvas({ slide, template, mascotVideo, mascotImage, isPlaying, isSpeaking, progress, slideIndex, totalSlides }) {
  const videoRef = useRef(null);
  const t = template;

  useEffect(() => {
    if (!videoRef.current) return;
    if (isSpeaking) videoRef.current.play().catch(() => {});
    else videoRef.current.pause();
  }, [isSpeaking]);

  const textColor = t.card.dark ? "#e0e0ff" : "#1a1a3e";
  const subColor = t.card.dark ? "rgba(220,220,255,0.7)" : "#555";

  return (
    <div style={{
      position: "relative", width: "100%", aspectRatio: "16/9",
      borderRadius: "16px", overflow: "hidden",
      background: t.bg, boxShadow: "0 8px 40px rgba(0,0,0,0.35)"
    }}>
      {/* Hex pattern overlay */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }}
        xmlns="http://www.w3.org/2000/svg">
        {[...Array(20)].map((_, i) => (
          <polygon key={i}
            points="30,0 60,15 60,45 30,60 0,45 0,15"
            fill="none" stroke={t.accent} strokeWidth="1.5"
            transform={`translate(${(i % 5) * 70 - 20}, ${Math.floor(i / 5) * 65 - 10})`}
          />
        ))}
      </svg>

      {/* Logo badge */}
      <div style={{
        position: "absolute", top: "5%", left: "3%",
        background: "rgba(255,255,255,0.92)", borderRadius: "8px",
        padding: "3px 9px", fontSize: "9px", fontWeight: 900,
        color: t.accent, border: `2px solid ${t.accent}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
      }}>S·S EDU</div>

      {/* Chapter title pill */}
      <div style={{
        position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%)",
        background: "rgba(255,255,255,0.88)", borderRadius: "20px",
        padding: "3px 14px", fontSize: "8px", fontWeight: 800,
        color: t.accent, whiteSpace: "nowrap",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)"
      }}>Chapter 1A · Living Organisms</div>

      {/* Mascot */}
      <div style={{
        position: "absolute", bottom: "4%", left: "2%", width: "21%",
        animation: isSpeaking ? "mcTalk 0.35s ease-in-out infinite alternate" : "mcFloat 3s ease-in-out infinite",
        transformOrigin: "bottom center"
      }}>
        {mascotVideo ? (
          <video ref={videoRef} src={mascotVideo} loop muted playsInline
            style={{ width: "100%", display: "block" }} />
        ) : mascotImage ? (
          <img src={mascotImage} style={{ width: "100%", display: "block" }} alt="mascot" />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: MASCOT_SVG }} style={{ width: "100%" }} />
        )}
      </div>

      {/* Sound waves when speaking */}
      {isSpeaking && (
        <div style={{
          position: "absolute", bottom: "14%", left: "8%",
          display: "flex", gap: "3px", alignItems: "flex-end"
        }}>
          {[4, 7, 10, 7, 4].map((h, i) => (
            <div key={i} style={{
              width: "4px", borderRadius: "3px",
              background: t.accent, height: `${h}px`,
              animation: `wave 0.4s ease-in-out ${i * 0.08}s infinite alternate`
            }} />
          ))}
        </div>
      )}

      {/* Content card */}
      <div style={{
        position: "absolute", right: "2.5%", top: "50%",
        transform: "translateY(-50%)", width: "67%",
        background: t.card.bg,
        borderRadius: "14px", padding: "10px 13px",
        border: `3px solid ${t.card.border}`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.18), 4px 4px 0 ${t.card.shadow}`,
      }}>
        {/* Header */}
        <div style={{
          background: t.card.header, borderRadius: "9px",
          padding: "5px 10px", marginBottom: "7px",
          display: "flex", alignItems: "center", gap: "6px"
        }}>
          <span style={{ fontSize: "13px" }}>{slide?.icon}</span>
          <span style={{ color: "white", fontWeight: 800, fontSize: "10px", letterSpacing: "0.3px" }}>
            {slide?.heading}
          </span>
          <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.7)", fontSize: "8px", fontWeight: 700 }}>
            {slideIndex + 1}/{totalSlides}
          </span>
        </div>

        {/* Text */}
        <div style={{
          fontSize: "9px", color: textColor, lineHeight: 1.65, fontWeight: 600,
          maxHeight: "80px", overflow: "hidden",
          display: "-webkit-box", WebkitLineClamp: 6, WebkitBoxOrient: "vertical"
        }}>{slide?.text}</div>

        {/* Short desc tag */}
        <div style={{
          marginTop: "6px", display: "inline-block",
          background: `${t.accent}18`,
          color: t.accent, padding: "2px 8px",
          borderRadius: "8px", fontSize: "8px", fontWeight: 800
        }}>{slide?.shortDesc}</div>

        {/* Decorative stars */}
        <span style={{ position: "absolute", top: "-10px", right: "14px", fontSize: "14px" }}>⭐</span>
        <span style={{ position: "absolute", top: "-7px", right: "30px", fontSize: "9px" }}>✨</span>
      </div>

      {/* Progress bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "4px", background: "rgba(0,0,0,0.15)"
      }}>
        <div style={{
          height: "100%", borderRadius: "2px",
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${t.accent}, ${t.card.border})`,
          transition: "width 0.15s linear"
        }} />
      </div>
    </div>
  );
}

// ─── TEMPLATE PICKER ──────────────────────────────────────────────────────────

function TemplatePicker({ selected, onSelect }) {
  return (
    <Card>
      <SectionTitle>🎨 Video Template</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {TEMPLATES.map(t => (
          <div key={t.id} onClick={() => onSelect(t)}
            style={{
              borderRadius: "12px", overflow: "hidden", cursor: "pointer",
              border: selected.id === t.id ? `3px solid ${t.accent}` : "3px solid transparent",
              boxShadow: selected.id === t.id ? `0 0 0 2px ${t.accent}40` : "0 2px 8px rgba(0,0,0,0.1)",
              transition: "all 0.2s"
            }}>
            {/* Mini preview */}
            <div style={{
              height: "52px", background: t.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "22px", position: "relative"
            }}>
              <span>{t.tag}</span>
              {selected.id === t.id && (
                <span style={{
                  position: "absolute", top: "4px", right: "6px",
                  background: t.accent, color: "white",
                  borderRadius: "50%", width: "16px", height: "16px",
                  fontSize: "9px", display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900
                }}>✓</span>
              )}
            </div>
            <div style={{ padding: "7px 9px", background: "white" }}>
              <div style={{ fontWeight: 800, fontSize: "11px", color: "#1a1a3e" }}>{t.name}</div>
              <div style={{ fontSize: "9px", color: "#888", lineHeight: 1.4, marginTop: "2px" }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function EduVideoComposerV2() {
  const [tab, setTab] = useState("compose");
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [slides, setSlides] = useState(SLIDES_DATA);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mascotVideo, setMascotVideo] = useState(null);
  const [mascotImage, setMascotImage] = useState(null);
  const [bgImage, setBgImage] = useState(null);
  const [ttsApiKey, setTtsApiKey] = useState("");
  const [ttsVoice, setTtsVoice] = useState("en-US-Neural2-F");
  const [ttsSpeed, setTtsSpeed] = useState(0.9);
  const [ttsPitch, setTtsPitch] = useState(2.0);
  const [showAddSlide, setShowAddSlide] = useState(false);
  const [newSlideTitle, setNewSlideTitle] = useState("");
  const [newSlideText, setNewSlideText] = useState("");
  const [newSlideDesc, setNewSlideDesc] = useState("");
  const [exportStatus, setExportStatus] = useState("");
  const [activeAudio, setActiveAudio] = useState(null);

  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const mascotVideoRef = useRef();
  const mascotImageRef = useRef();
  const bgRef = useRef();

  const SLIDE_MS = useCallback(() => (slides[currentSlide]?.duration || 9) * 1000, [slides, currentSlide]);

  const stopAll = useCallback(() => {
    synthRef.current?.cancel();
    activeAudio?.pause();
    setActiveAudio(null);
    clearInterval(intervalRef.current);
    clearInterval(progressRef.current);
    setIsPlaying(false);
    setIsSpeaking(false);
    setProgress(0);
  }, [activeAudio]);

  // Google TTS
  const speakGoogleTTS = useCallback(async (text) => {
    if (!ttsApiKey) return false;
    try {
      const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${ttsApiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: { text },
          voice: { languageCode: ttsVoice.slice(0, 5), name: ttsVoice },
          audioConfig: { audioEncoding: "MP3", speakingRate: ttsSpeed, pitch: ttsPitch }
        })
      });
      const data = await res.json();
      if (!data.audioContent) return false;
      const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
      setActiveAudio(audio);
      audio.onended = () => { setIsSpeaking(false); setActiveAudio(null); };
      audio.play();
      setIsSpeaking(true);
      return true;
    } catch { return false; }
  }, [ttsApiKey, ttsVoice, ttsSpeed, ttsPitch]);

  // Browser fallback TTS
  const speakBrowser = useCallback((text) => {
    synthRef.current.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = ttsSpeed; utt.pitch = 1.1;
    utt.onstart = () => setIsSpeaking(true);
    utt.onend = () => setIsSpeaking(false);
    utt.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utt);
  }, [ttsSpeed]);

  const speakSlide = useCallback(async (slide) => {
    const text = `${slide.heading}. ${slide.text}`;
    const usedGoogle = await speakGoogleTTS(text);
    if (!usedGoogle) speakBrowser(text);
  }, [speakGoogleTTS, speakBrowser]);

  const advanceSlide = useCallback(() => {
    setCurrentSlide(prev => {
      if (prev >= slides.length - 1) { stopAll(); return prev; }
      return prev + 1;
    });
    setProgress(0);
  }, [slides.length, stopAll]);

  useEffect(() => {
    if (!isPlaying) return;
    const ms = SLIDE_MS();
    speakSlide(slides[currentSlide]);
    setProgress(0);
    progressRef.current = setInterval(() => setProgress(p => Math.min(p + 100 / (ms / 100), 100)), 100);
    intervalRef.current = setTimeout(advanceSlide, ms);
    return () => { clearInterval(progressRef.current); clearTimeout(intervalRef.current); };
  }, [isPlaying, currentSlide]);

  const handlePlay = () => { if (isPlaying) { stopAll(); } else { setIsPlaying(true); } };
  const goToSlide = (i) => { stopAll(); setCurrentSlide(i); setTimeout(() => speakSlide(slides[i]), 80); };

  const addSlide = () => {
    if (!newSlideTitle || !newSlideText) return;
    setSlides(prev => [...prev, {
      id: `custom_${Date.now()}`, heading: newSlideTitle, text: newSlideText,
      icon: "✏️", bg: "#F3E5F5", shortDesc: newSlideDesc || "Custom slide", duration: 10
    }]);
    setNewSlideTitle(""); setNewSlideText(""); setNewSlideDesc(""); setShowAddSlide(false);
  };

  const removeSlide = (id) => setSlides(prev => prev.filter(s => s.id !== id));

  const handleExport = async (format) => {
    setExportStatus(`⏳ Queuing ${format} render job on backend...`);
    try {
      const res = await fetch("https://your-cloud-run-url.run.app/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides, template: template.id, format, ttsVoice, ttsSpeed })
      });
      const data = await res.json();
      setExportStatus(`✅ Job queued! ID: ${data.jobId} — check /api/status/${data.jobId}`);
    } catch {
      setExportStatus("⚠️ Backend not connected. Deploy the server package to enable real MP4 export.");
      setTimeout(() => setExportStatus(""), 4000);
    }
  };

  const slide = slides[currentSlide];
  const textColor = template.dark ? "rgba(220,220,255,0.9)" : "#1a1a3e";

  return (
    <div style={{
      fontFamily: "'Nunito', 'Trebuchet MS', sans-serif",
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0f0c29, #302b63, #24243e)",
      padding: "12px",
      color: "white"
    }}>
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "14px" }}>
        <div style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "-0.5px", lineHeight: 1.1 }}>
          📹 EduVideo Composer <span style={{
            background: "linear-gradient(90deg,#a78bfa,#38bdf8)", WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent", fontSize: "11px",
            fontWeight: 700, letterSpacing: "2px", marginLeft: "6px"
          }}>v2.0</span>
        </div>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", marginTop: "3px" }}>
          Chapter-by-chapter narrated video builder · Google TTS · Multi-template
        </div>
      </div>

      {/* TABS */}
      <div style={{
        display: "flex", gap: "6px", justifyContent: "center",
        marginBottom: "14px", flexWrap: "wrap"
      }}>
        {[
          { id: "compose", label: "Compose", icon: "✏️" },
          { id: "preview", label: "Preview", icon: "▶️" },
          { id: "templates", label: "Templates", icon: "🎨" },
          { id: "assets", label: "Assets", icon: "🎭" },
          { id: "tts", label: "Narration", icon: "🎙️" },
          { id: "export", label: "Export", icon: "📤" },
        ].map(t => <TabBtn key={t.id} {...t} active={tab === t.id} onClick={setTab} />)}
      </div>

      {/* ── COMPOSE ── */}
      {tab === "compose" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Card>
            <SectionTitle>📖 Chapter 1A — Characteristics of Living Organisms</SectionTitle>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
              {[
                { label: `${slides.length} slides`, color: "#E8F5E9", text: "#2E7D32" },
                { label: `~${Math.ceil(slides.reduce((a, s) => a + (s.duration || 9), 0) / 60)} min`, color: "#E3F2FD", text: "#1565C0" },
                { label: template.name, color: "#EDE7F6", text: "#5C6BC0" }
              ].map(b => (
                <span key={b.label} style={{
                  background: b.color, color: b.text,
                  padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 800
                }}>{b.label}</span>
              ))}
            </div>
          </Card>

          <Card>
            <SectionTitle>📋 Slides</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              {slides.map((s, i) => (
                <div key={s.id}
                  style={{
                    display: "flex", alignItems: "center", gap: "9px",
                    padding: "9px 11px", borderRadius: "11px",
                    background: currentSlide === i ? "#EDE7F6" : "#F7F7FB",
                    border: currentSlide === i ? "2px solid #7C3AED" : "2px solid transparent",
                    cursor: "pointer", transition: "all 0.18s"
                  }}
                  onClick={() => { setCurrentSlide(i); setTab("preview"); }}
                >
                  <div style={{
                    width: "26px", height: "26px", flexShrink: 0,
                    background: currentSlide === i ? "#7C3AED" : "#e0d9f7",
                    color: currentSlide === i ? "white" : "#7C3AED",
                    borderRadius: "50%", display: "flex", alignItems: "center",
                    justifyContent: "center", fontWeight: 900, fontSize: "11px"
                  }}>{i + 1}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: "12px", color: "#1a1a3e" }}>{s.icon} {s.heading}</div>
                    <div style={{ fontSize: "10px", color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {s.shortDesc} · {s.duration}s
                    </div>
                  </div>
                  <button onClick={e => { e.stopPropagation(); removeSlide(s.id); }} style={{
                    background: "#fee2e2", border: "none", borderRadius: "6px",
                    color: "#ef4444", fontSize: "11px", padding: "3px 7px",
                    cursor: "pointer", fontWeight: 800, fontFamily: "inherit"
                  }}>✕</button>
                </div>
              ))}
            </div>

            {!showAddSlide ? (
              <button onClick={() => setShowAddSlide(true)} style={{
                width: "100%", marginTop: "10px", padding: "10px",
                border: "2px dashed #7C3AED", borderRadius: "12px",
                background: "transparent", color: "#7C3AED",
                fontWeight: 800, fontSize: "12px", cursor: "pointer", fontFamily: "inherit"
              }}>+ Add Custom Slide</button>
            ) : (
              <div style={{
                marginTop: "10px", padding: "12px",
                background: "#F3E5F5", borderRadius: "12px",
                display: "flex", flexDirection: "column", gap: "8px"
              }}>
                <input value={newSlideTitle} onChange={e => setNewSlideTitle(e.target.value)}
                  placeholder="Slide heading..." style={{
                    padding: "8px 11px", borderRadius: "8px",
                    border: "1.5px solid #CE93D8", fontSize: "12px",
                    fontFamily: "inherit", outline: "none"
                  }} />
                <input value={newSlideDesc} onChange={e => setNewSlideDesc(e.target.value)}
                  placeholder="Short description tag (optional)..." style={{
                    padding: "8px 11px", borderRadius: "8px",
                    border: "1.5px solid #CE93D8", fontSize: "12px",
                    fontFamily: "inherit", outline: "none"
                  }} />
                <textarea value={newSlideText} onChange={e => setNewSlideText(e.target.value)}
                  placeholder="Narration text for this slide..." rows={3} style={{
                    padding: "8px 11px", borderRadius: "8px",
                    border: "1.5px solid #CE93D8", fontSize: "12px",
                    fontFamily: "inherit", resize: "none", outline: "none"
                  }} />
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={addSlide} style={{
                    flex: 1, padding: "8px", background: "#7C3AED", color: "white",
                    border: "none", borderRadius: "8px", fontWeight: 800,
                    cursor: "pointer", fontFamily: "inherit", fontSize: "12px"
                  }}>Add Slide</button>
                  <button onClick={() => setShowAddSlide(false)} style={{
                    flex: 1, padding: "8px", background: "#e5e7eb", color: "#374151",
                    border: "none", borderRadius: "8px", fontWeight: 800,
                    cursor: "pointer", fontFamily: "inherit", fontSize: "12px"
                  }}>Cancel</button>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* ── PREVIEW ── */}
      {tab === "preview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <VideoCanvas
            slide={slide} template={template}
            mascotVideo={mascotVideo} mascotImage={mascotImage}
            isPlaying={isPlaying} isSpeaking={isSpeaking}
            progress={isPlaying ? progress : (currentSlide / Math.max(slides.length - 1, 1)) * 100}
            slideIndex={currentSlide} totalSlides={slides.length}
          />

          {/* Controls */}
          <Card>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "12px" }}>
              <button onClick={() => goToSlide(Math.max(0, currentSlide - 1))} style={{
                width: "38px", height: "38px", borderRadius: "50%",
                border: "none", background: "#EDE7F6", cursor: "pointer", fontSize: "15px"
              }}>⏮</button>
              <button onClick={handlePlay} style={{
                width: "54px", height: "54px", borderRadius: "50%", border: "none",
                background: isPlaying ? "linear-gradient(135deg,#ef4444,#ec4899)" : "linear-gradient(135deg,#7C3AED,#2563EB)",
                cursor: "pointer", fontSize: "20px", color: "white",
                boxShadow: "0 4px 16px rgba(124,58,237,0.4)"
              }}>{isPlaying ? "⏸" : "▶️"}</button>
              <button onClick={() => goToSlide(Math.min(slides.length - 1, currentSlide + 1))} style={{
                width: "38px", height: "38px", borderRadius: "50%",
                border: "none", background: "#EDE7F6", cursor: "pointer", fontSize: "15px"
              }}>⏭</button>
              <button onClick={() => { stopAll(); speakSlide(slide); }} style={{
                width: "38px", height: "38px", borderRadius: "50%",
                border: "none", background: "#E8F5E9", cursor: "pointer", fontSize: "15px"
              }}>🔊</button>
            </div>

            <input type="range" min={0} max={slides.length - 1} value={currentSlide}
              onChange={e => { stopAll(); setCurrentSlide(Number(e.target.value)); }}
              style={{ width: "100%", accentColor: "#7C3AED", marginBottom: "6px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#888" }}>
              <span>Slide {currentSlide + 1}</span>
              <span style={{ fontWeight: 700, color: "#7C3AED" }}>{slide?.heading}</span>
              <span>of {slides.length}</span>
            </div>

            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "center", marginTop: "8px" }}>
              {slides.map((s, i) => (
                <button key={i} onClick={() => goToSlide(i)} style={{
                  width: "26px", height: "26px", borderRadius: "50%", border: "none",
                  background: currentSlide === i ? "#7C3AED" : "#EDE7F6",
                  color: currentSlide === i ? "white" : "#7C3AED",
                  fontSize: "9px", fontWeight: 900, cursor: "pointer", fontFamily: "inherit"
                }}>{i + 1}</button>
              ))}
            </div>
          </Card>

          {/* Slide detail panel */}
          <Card>
            <SectionTitle>📝 Current Slide Detail</SectionTitle>
            <div style={{
              background: slide?.bg || "#F5F5F5", borderRadius: "10px",
              padding: "11px 13px"
            }}>
              <div style={{ fontWeight: 800, fontSize: "13px", color: "#1a1a3e", marginBottom: "5px" }}>
                {slide?.icon} {slide?.heading}
              </div>
              <div style={{ fontSize: "11px", color: "#444", lineHeight: 1.65 }}>{slide?.text}</div>
              <div style={{ marginTop: "8px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                <span style={{
                  background: "white", color: "#555", padding: "2px 8px",
                  borderRadius: "8px", fontSize: "10px", fontWeight: 700,
                  border: "1px solid #ddd"
                }}>⏱ {slide?.duration}s narration</span>
                <span style={{
                  background: "white", color: "#555", padding: "2px 8px",
                  borderRadius: "8px", fontSize: "10px", fontWeight: 700,
                  border: "1px solid #ddd"
                }}>🏷 {slide?.shortDesc}</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ── TEMPLATES ── */}
      {tab === "templates" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <TemplatePicker selected={template} onSelect={t => { setTemplate(t); }} />
          <Card>
            <SectionTitle>👁 Live Preview</SectionTitle>
            <VideoCanvas
              slide={slide} template={template}
              mascotVideo={mascotVideo} mascotImage={mascotImage}
              isPlaying={false} isSpeaking={false} progress={40}
              slideIndex={currentSlide} totalSlides={slides.length}
            />
            <div style={{
              marginTop: "10px", padding: "8px 12px",
              background: "#F0FDF4", borderRadius: "9px",
              fontSize: "11px", color: "#15803d", fontWeight: 700
            }}>
              ✅ Template applied: <strong>{template.name}</strong> — {template.desc}
            </div>
          </Card>
        </div>
      )}

      {/* ── ASSETS ── */}
      {tab === "assets" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Card>
            <SectionTitle>🎭 Mascot Assets</SectionTitle>

            {/* Mascot Video Upload */}
            <div style={{ marginBottom: "14px" }}>
              <div style={{
                fontSize: "11px", fontWeight: 800, color: "#555", marginBottom: "6px",
                display: "flex", alignItems: "center", gap: "5px"
              }}>
                🎬 Mascot Animation Video
                <span style={{
                  background: "#DCFCE7", color: "#15803D",
                  padding: "1px 7px", borderRadius: "8px", fontSize: "9px"
                }}>NEW</span>
              </div>
              <button onClick={() => mascotVideoRef.current.click()} style={{
                width: "100%", padding: "14px",
                border: `2px dashed ${mascotVideo ? "#22C55E" : "#7C3AED"}`,
                borderRadius: "12px", background: mascotVideo ? "#F0FDF4" : "white",
                color: mascotVideo ? "#15803D" : "#7C3AED",
                fontWeight: 800, fontSize: "12px",
                cursor: "pointer", fontFamily: "inherit"
              }}>
                {mascotVideo ? "✅ Video mascot loaded — click to replace" : "📹 Upload Mascot Video (MP4/WebM/GIF)"}
              </button>
              <input ref={mascotVideoRef} type="file" accept="video/*,.gif"
                onChange={e => { const f = e.target.files[0]; if (f) setMascotVideo(URL.createObjectURL(f)); }}
                style={{ display: "none" }} />
              <div style={{ fontSize: "10px", color: "#888", marginTop: "5px" }}>
                Upload an animated MP4, WebM, or GIF of your mascot. It will play during narration and pause when silent.
              </div>
            </div>

            {/* Mascot Image Upload */}
            <div style={{ marginBottom: "14px" }}>
              <div style={{ fontSize: "11px", fontWeight: 800, color: "#555", marginBottom: "6px" }}>
                🖼 Mascot Still Image (PNG with transparency)
              </div>
              <button onClick={() => mascotImageRef.current.click()} style={{
                width: "100%", padding: "12px",
                border: `2px dashed ${mascotImage ? "#22C55E" : "#7C3AED"}`,
                borderRadius: "12px", background: mascotImage ? "#F0FDF4" : "white",
                color: mascotImage ? "#15803D" : "#7C3AED",
                fontWeight: 800, fontSize: "12px",
                cursor: "pointer", fontFamily: "inherit"
              }}>
                {mascotImage ? "✅ Mascot image loaded" : "📁 Upload Mascot PNG (transparent bg)"}
              </button>
              <input ref={mascotImageRef} type="file" accept="image/png,image/webp"
                onChange={e => { const f = e.target.files[0]; if (f) setMascotImage(URL.createObjectURL(f)); }}
                style={{ display: "none" }} />
            </div>

            {/* Background */}
            <div>
              <div style={{ fontSize: "11px", fontWeight: 800, color: "#555", marginBottom: "6px" }}>
                🌄 Custom Background Image
              </div>
              <button onClick={() => bgRef.current.click()} style={{
                width: "100%", padding: "12px",
                border: `2px dashed ${bgImage ? "#22C55E" : "#7C3AED"}`,
                borderRadius: "12px", background: bgImage ? "#F0FDF4" : "white",
                color: bgImage ? "#15803D" : "#7C3AED",
                fontWeight: 800, fontSize: "12px",
                cursor: "pointer", fontFamily: "inherit"
              }}>
                {bgImage ? "✅ Background uploaded" : "📁 Upload Background (JPG/PNG)"}
              </button>
              <input ref={bgRef} type="file" accept="image/*"
                onChange={e => { const f = e.target.files[0]; if (f) setBgImage(URL.createObjectURL(f)); }}
                style={{ display: "none" }} />
            </div>
          </Card>

          {/* Asset preview */}
          {(mascotVideo || mascotImage) && (
            <Card>
              <SectionTitle>👁 Mascot Preview</SectionTitle>
              <div style={{
                display: "flex", justifyContent: "center",
                background: "#F0F4FF", borderRadius: "12px", padding: "20px"
              }}>
                {mascotVideo ? (
                  <video src={mascotVideo} autoPlay loop muted playsInline
                    style={{ maxHeight: "140px", borderRadius: "8px" }} />
                ) : (
                  <img src={mascotImage} style={{ maxHeight: "140px" }} alt="mascot preview" />
                )}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* ── TTS / NARRATION ── */}
      {tab === "tts" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Card>
            <SectionTitle>🎙️ Google Cloud Text-to-Speech</SectionTitle>
            <div style={{
              padding: "10px 12px", background: "#EFF6FF", borderRadius: "10px",
              fontSize: "11px", color: "#1e40af", marginBottom: "12px", lineHeight: 1.5
            }}>
              📌 Get your API key from <strong>console.cloud.google.com</strong> → Enable Cloud Text-to-Speech API → Create credentials. Free tier: 1M chars/month for WaveNet/Neural voices.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 800, color: "#555", marginBottom: "5px" }}>API Key</div>
                <input type="password" value={ttsApiKey} onChange={e => setTtsApiKey(e.target.value)}
                  placeholder="AIzaSy..." style={{
                    width: "100%", padding: "9px 12px", borderRadius: "9px",
                    border: "1.5px solid #d1d5db", fontSize: "12px",
                    fontFamily: "inherit", outline: "none", boxSizing: "border-box"
                  }} />
              </div>

              <div>
                <div style={{ fontSize: "11px", fontWeight: 800, color: "#555", marginBottom: "5px" }}>Voice</div>
                <select value={ttsVoice} onChange={e => setTtsVoice(e.target.value)} style={{
                  width: "100%", padding: "9px 12px", borderRadius: "9px",
                  border: "1.5px solid #d1d5db", fontSize: "12px",
                  fontFamily: "inherit", outline: "none", background: "white"
                }}>
                  <optgroup label="🇺🇸 English US — Neural2 (Best)">
                    <option value="en-US-Neural2-F">Neural2-F · Female · Clear & warm</option>
                    <option value="en-US-Neural2-A">Neural2-A · Male · Deep & steady</option>
                    <option value="en-US-Neural2-C">Neural2-C · Female · Bright</option>
                    <option value="en-US-Neural2-J">Neural2-J · Male · Friendly</option>
                  </optgroup>
                  <optgroup label="🇬🇧 English UK — Neural2">
                    <option value="en-GB-Neural2-A">GB Neural2-A · Female · British</option>
                    <option value="en-GB-Neural2-B">GB Neural2-B · Male · British</option>
                  </optgroup>
                  <optgroup label="🇺🇸 English US — WaveNet">
                    <option value="en-US-Wavenet-F">WaveNet-F · Female</option>
                    <option value="en-US-Wavenet-D">WaveNet-D · Male</option>
                  </optgroup>
                  <optgroup label="🌐 Other">
                    <option value="en-AU-Neural2-A">AU Neural2-A · Australian Female</option>
                    <option value="en-IN-Neural2-A">IN Neural2-A · Indian Female</option>
                  </optgroup>
                </select>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#555" }}>Speaking Rate</span>
                  <span style={{ fontSize: "11px", color: "#7C3AED", fontWeight: 800 }}>{ttsSpeed}x</span>
                </div>
                <input type="range" min={0.5} max={1.5} step={0.05} value={ttsSpeed}
                  onChange={e => setTtsSpeed(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#7C3AED" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", color: "#aaa" }}>
                  <span>Slow (0.5x)</span><span>Normal (1.0x)</span><span>Fast (1.5x)</span>
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#555" }}>Pitch</span>
                  <span style={{ fontSize: "11px", color: "#7C3AED", fontWeight: 800 }}>{ttsPitch > 0 ? "+" : ""}{ttsPitch}</span>
                </div>
                <input type="range" min={-10} max={10} step={0.5} value={ttsPitch}
                  onChange={e => setTtsPitch(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#7C3AED" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", color: "#aaa" }}>
                  <span>Deep (-10)</span><span>Normal (0)</span><span>High (+10)</span>
                </div>
              </div>

              <button onClick={() => speakSlide(slides[currentSlide])} style={{
                padding: "11px", background: "linear-gradient(135deg,#7C3AED,#2563EB)",
                color: "white", border: "none", borderRadius: "10px",
                fontWeight: 800, fontSize: "13px", cursor: "pointer", fontFamily: "inherit"
              }}>
                🔊 Test Narration — Slide {currentSlide + 1}
              </button>

              {!ttsApiKey && (
                <div style={{
                  padding: "9px 12px", background: "#FFF7ED", borderRadius: "9px",
                  fontSize: "10px", color: "#92400e"
                }}>
                  ⚠️ No API key set — using browser built-in speech (lower quality). Add your Google TTS key above for professional narration.
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* ── EXPORT ── */}
      {tab === "export" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Card>
            <SectionTitle>📤 Export Video</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { fmt: "mp4_1080", label: "YouTube HD 1080p", spec: "1920×1080 · H.264 · MP4", icon: "🎬", rec: true },
                { fmt: "mp4_4k", label: "YouTube 4K", spec: "3840×2160 · H.265 · MP4", icon: "💎", rec: false },
                { fmt: "webm_720", label: "Web Optimized", spec: "1280×720 · VP9 · WebM", icon: "🌐", rec: false },
                { fmt: "mp4_vertical", label: "Shorts / Reels", spec: "1080×1920 · H.264 · Vertical", icon: "📱", rec: false },
              ].map(f => (
                <div key={f.fmt} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "11px 13px", borderRadius: "12px",
                  background: f.rec ? "#EDE7F6" : "#F7F7FB",
                  border: f.rec ? "2px solid #7C3AED" : "2px solid transparent"
                }}>
                  <span style={{ fontSize: "20px" }}>{f.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: "12px", color: "#1a1a3e" }}>
                      {f.label}
                      {f.rec && <span style={{
                        marginLeft: "6px", background: "#7C3AED", color: "white",
                        padding: "1px 7px", borderRadius: "8px", fontSize: "9px"
                      }}>Recommended</span>}
                    </div>
                    <div style={{ fontSize: "10px", color: "#888" }}>{f.spec}</div>
                  </div>
                  <button onClick={() => handleExport(f.fmt)} style={{
                    padding: "7px 13px",
                    background: "linear-gradient(135deg,#7C3AED,#2563EB)",
                    color: "white", border: "none", borderRadius: "8px",
                    fontWeight: 800, fontSize: "11px",
                    cursor: "pointer", fontFamily: "inherit"
                  }}>Export</button>
                </div>
              ))}
            </div>
            {exportStatus && (
              <div style={{
                marginTop: "10px", padding: "10px 12px",
                background: "#EDE7F6", borderRadius: "9px",
                fontSize: "11px", color: "#5B21B6", fontWeight: 700
              }}>{exportStatus}</div>
            )}
          </Card>

          {/* Backend status */}
          <Card style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)", color: "white" }}>
            <SectionTitle><span style={{ color: "#a78bfa" }}>🚀 Backend Stack</span></SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              {[
                ["Render Engine", "FFmpeg 6 + Node.js Canvas"],
                ["AI Narration", "Google Cloud TTS Neural2"],
                ["Job Queue", "Bull + Redis 7"],
                ["Storage", "Google Cloud Storage / R2"],
                ["Deploy", "Cloud Run (Docker)"],
                ["Endpoint", "/api/render · /api/status/:id"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>{k}</span>
                  <span style={{ color: "#a78bfa", fontWeight: 800 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: "12px", padding: "8px 11px",
              background: "rgba(124,58,237,0.25)", borderRadius: "9px",
              fontSize: "10px", color: "#c4b5fd", lineHeight: 1.5
            }}>
              📦 Deploy the included <strong>server/</strong> package to Cloud Run. Set <code>GOOGLE_TTS_KEY</code>, <code>GCS_BUCKET</code>, <code>REDIS_URL</code> env vars. The frontend's Export button will POST to <strong>/api/render</strong> and poll <strong>/api/status/:jobId</strong> for the MP4 download URL.
            </div>
          </Card>
        </div>
      )}

      <style>{`
        @keyframes mcFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes mcTalk { 0%{transform:translateY(0) rotate(-2deg)} 100%{transform:translateY(-5px) rotate(2deg)} }
        @keyframes wave { 0%{opacity:0.4} 100%{opacity:1;transform:scaleY(1.4)} }
      `}</style>
    </div>
  );
}
export default App;
