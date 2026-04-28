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

// import React, { useState, useEffect, useRef } from "react";
// import "./App.css";
// // Background image state
// const [bgImage] = useState<string | undefined>(undefined);

// // Safe ref usage
// const playMascotVideo = () => {
//   if (mascotVideoRef.current) {
//     mascotVideoRef.current.play();
//   }
// };

// const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const files = e.target.files;
//   if (files && files.length > 0) {
//     const file = files[0];
//     if (mascotImageRef.current) {
//       mascotImageRef.current.src = URL.createObjectURL(file);
//     }
//   }
// };

// // Example usage in JSX
// return (
//   <div className="App">
//     <nav>...</nav>
//     <main>...</main>

//     <button onClick={playMascotVideo}>Play Mascot</button>
//     <input type="file" onChange={handleFileUpload} />
//   </div>
// );

// // -------------------- Interfaces --------------------
// interface Device {
//   id: string;
//   name: string;
//   status: "online" | "offline" | "maintenance";
// }

// interface Alert {
//   id: string;
//   message: string;
//   severity: "low" | "medium" | "high";
// }

// interface HistoricalData {
//   timestamp: string;
//   value: number;
// }

// interface RealTimeData {
//   gridFrequency: number;
//   totalDemand: number;
//   totalGeneration: number;
// }

// // -------------------- Components --------------------
// interface DeviceCardProps {
//   device: Device;
//   onSelect: (id: string) => void;
// }
// const DeviceCard: React.FC<DeviceCardProps> = ({ device, onSelect }) => (
//   <div className="device-card" onClick={() => onSelect(device.id)}>
//     <h3>{device.name}</h3>
//     <p>Status: {device.status}</p>
//   </div>
// );

// interface AlertCardProps {
//   alert: Alert;
// }
// const AlertCard: React.FC<AlertCardProps> = ({ alert }) => (
//   <div className={`alert-card ${alert.severity}`}>
//     <p>{alert.message}</p>
//   </div>
// );

// // -------------------- Main App --------------------
// const App: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<
//     "compose" | "preview" | "templates" | "assets" | "tts" | "export"
//   >("compose");

//   const [devices, setDevices] = useState<Device[]>([]);
//   const [alerts, setAlerts] = useState<Alert[]>([]);
//   const [history, setHistory] = useState<HistoricalData[]>([]);
//   const [realTimeData, setRealTimeData] = useState<RealTimeData | null>(null);
//   const [bgImage, setBgImage] = useState<string | undefined>(undefined);

//   const mascotVideoRef = useRef<HTMLVideoElement | null>(null);
//   const mascotImageRef = useRef<HTMLImageElement | null>(null);
//   const bgRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     setDevices([
//       { id: "1", name: "Transformer A", status: "online" },
//       { id: "2", name: "Generator B", status: "maintenance" },
//     ]);
//     setAlerts([{ id: "a1", message: "Voltage fluctuation detected", severity: "high" }]);
//     setHistory([{ timestamp: "2026-04-29T00:00:00Z", value: 50 }]);
//     setRealTimeData({ gridFrequency: 50, totalDemand: 1200, totalGeneration: 1250 });
//   }, []);

//   const renderOverview = (): JSX.Element => (
//     <div>
//       <h2>Grid Frequency: {realTimeData?.gridFrequency} Hz</h2>
//       <h2>Total Demand: {realTimeData?.totalDemand} MW</h2>
//       <h2>Total Generation: {realTimeData?.totalGeneration} MW</h2>
//     </div>
//   );

//   const renderDevices = (): JSX.Element => (
//     <div>
//       {devices.map((device) => (
//         <DeviceCard key={device.id} device={device} onSelect={(id) => console.log("Selected", id)} />
//       ))}
//     </div>
//   );

//   const renderAlerts = (): JSX.Element => (
//     <div>
//       {alerts.map((alert) => (
//         <AlertCard key={alert.id} alert={alert} />
//       ))}
//     </div>
//   );

//   const renderReports = (): JSX.Element => (
//     <div>
//       <h2>Historical Data</h2>
//       {history.map((h) => (
//         <p key={h.timestamp}>
//           {h.timestamp}: {h.value}
//         </p>
//       ))}
//     </div>
//   );

//   // Example safe ref usage
//   const playMascotVideo = () => {
//     if (mascotVideoRef.current) {
//       mascotVideoRef.current.play();
//     }
//   };

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       const file = files[0];
//       if (mascotImageRef.current) {
//         mascotImageRef.current.src = URL.createObjectURL(file);
//       }
//     }
//   };

//   useEffect(() => {
//     if (bgRef.current && bgImage) {
//       bgRef.current.style.backgroundImage = `url(${bgImage})`;
//     }
//   }, [bgImage]);

//   return (
//     <div className="App">
//       <nav>
//         <button onClick={() => setActiveTab("compose")}>Compose</button>
//         <button onClick={() => setActiveTab("preview")}>Preview</button>
//         <button onClick={() => setActiveTab("templates")}>Templates</button>
//         <button onClick={() => setActiveTab("assets")}>Assets</button>
//         <button onClick={() => setActiveTab("tts")}>TTS</button>
//         <button onClick={() => setActiveTab("export")}>Export</button>
//       </nav>

//       <main>
//         {activeTab === "compose" && renderOverview()}
//         {activeTab === "preview" && renderDevices()}
//         {activeTab === "templates" && renderAlerts()}
//         {activeTab === "assets" && renderReports()}
//       </main>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// -------------------- Interfaces --------------------
interface Device {
  id: string;
  name: string;
  status: "online" | "offline" | "maintenance";
}

interface Alert {
  id: string;
  message: string;
  severity: "low" | "medium" | "high";
}

interface HistoricalData {
  timestamp: string;
  value: number;
}

interface RealTimeData {
  gridFrequency: number;
  totalDemand: number;
  totalGeneration: number;
}

// -------------------- Components --------------------
interface DeviceCardProps {
  device: Device;
  onSelect: (id: string) => void;
}
const DeviceCard: React.FC<DeviceCardProps> = ({ device, onSelect }) => (
  <div className="device-card" onClick={() => onSelect(device.id)}>
    <h3>{device.name}</h3>
    <p>Status: {device.status}</p>
  </div>
);

interface AlertCardProps {
  alert: Alert;
}
const AlertCard: React.FC<AlertCardProps> = ({ alert }) => (
  <div className={`alert-card ${alert.severity}`}>
    <p>{alert.message}</p>
  </div>
);

// -------------------- Main App --------------------
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "compose" | "preview" | "templates" | "assets" | "tts" | "export"
  >("compose");

  const [devices, setDevices] = useState<Device[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [history, setHistory] = useState<HistoricalData[]>([]);
  const [realTimeData, setRealTimeData] = useState<RealTimeData | null>(null);
  const [bgImage] = useState<string | undefined>(undefined);

  const mascotVideoRef = useRef<HTMLVideoElement | null>(null);
  const mascotImageRef = useRef<HTMLImageElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setDevices([
      { id: "1", name: "Transformer A", status: "online" },
      { id: "2", name: "Generator B", status: "maintenance" },
    ]);
    setAlerts([{ id: "a1", message: "Voltage fluctuation detected", severity: "high" }]);
    setHistory([{ timestamp: "2026-04-29T00:00:00Z", value: 50 }]);
    setRealTimeData({ gridFrequency: 50, totalDemand: 1200, totalGeneration: 1250 });
  }, []);

  const renderOverview = () => (
    <div>
      <h2>Grid Frequency: {realTimeData?.gridFrequency} Hz</h2>
      <h2>Total Demand: {realTimeData?.totalDemand} MW</h2>
      <h2>Total Generation: {realTimeData?.totalGeneration} MW</h2>
    </div>
  );

  const renderDevices = () => (
    <div>
      {devices.map((device) => (
        <DeviceCard key={device.id} device={device} onSelect={(id) => console.log("Selected", id)} />
      ))}
    </div>
  );

  const renderAlerts = () => (
    <div>
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </div>
  );

  const renderReports = () => (
    <div>
      <h2>Historical Data</h2>
      {history.map((h) => (
        <p key={h.timestamp}>
          {h.timestamp}: {h.value}
        </p>
      ))}
    </div>
  );

  const playMascotVideo = () => {
    if (mascotVideoRef.current) {
      mascotVideoRef.current.play();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (mascotImageRef.current) {
        mascotImageRef.current.src = URL.createObjectURL(file);
      }
    }
  };

  useEffect(() => {
    if (bgRef.current && bgImage) {
      bgRef.current.style.backgroundImage = `url(${bgImage})`;
    }
  }, [bgImage]);

  return (
    <div className="App">
      <nav>
        <button onClick={() => setActiveTab("compose")}>Compose</button>
        <button onClick={() => setActiveTab("preview")}>Preview</button>
        <button onClick={() => setActiveTab("templates")}>Templates</button>
        <button onClick={() => setActiveTab("assets")}>Assets</button>
        <button onClick={() => setActiveTab("tts")}>TTS</button>
        <button onClick={() => setActiveTab("export")}>Export</button>
      </nav>

      <main>
        {activeTab === "compose" && renderOverview()}
        {activeTab === "preview" && renderDevices()}
        {activeTab === "templates" && renderAlerts()}
        {activeTab === "assets" && renderReports()}
      </main>

      <button onClick={playMascotVideo}>Play Mascot</button>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default App;

