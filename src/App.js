import { useState, useEffect } from 'react';
import './index.css';

import districts from './data/districts';
import Topbar       from './components/Topbar';
import Sidebar      from './components/Sidebar';
import MapView      from './components/MapView';
import StatsPanel   from './components/StatsPanel';
import CTARAPanel   from './components/CTARAPanel';
import ComparePanel from './components/ComparePanel';

export default function App() {
  const [mode,         setMode]         = useState('Overview');
  const [activeLayer,  setActiveLayer]  = useState('Dev. Score');
  const [selected,     setSelected]     = useState(null);
  const [stateFilter,  setStateFilter]  = useState('');
  const [search,       setSearch]       = useState('');
  const [compareA,     setCompareA]     = useState(null);
  const [compareB,     setCompareB]     = useState(null);
  const [leafletReady, setLeafletReady] = useState(false);

  useEffect(() => {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(css);
    const js = document.createElement('script');
    js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    js.onload = () => setLeafletReady(true);
    document.head.appendChild(js);
  }, []);

  const handleSearch = () => {
    const q = search.trim().toLowerCase();
    if (!q) return;
    const match = districts.find(d =>
      d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q)
    );
    if (match) { setSelected(match); setStateFilter(match.state); }
  };

  const handleSelect = (d) => {
    setSelected(d);
    if (mode === 'Compare') {
      if (!compareA) setCompareA(d);
      else if (!compareB) setCompareB(d);
    }
  };

  const renderPanel = () => {
    if (mode === 'Compare')    return <ComparePanel a={compareA} b={compareB} setA={setCompareA} setB={setCompareB} />;
    if (mode === 'CTARA Mode') return <CTARAPanel d={selected} />;
    return <StatsPanel selected={selected} />;
  };

  return (
    <div className="app">
      <Topbar mode={mode} setMode={setMode} search={search} setSearch={setSearch} onSearch={handleSearch} />
      {mode === 'CTARA Mode' && (
        <div className="ctara-banner">
          <div className="ctara-badge">CTARA Mode</div>
          <div className="ctara-banner-text">Rural planning indicators · CTARA IIT Bombay · Claude AI powered</div>
        </div>
      )}
      {mode === 'Compare' && (
        <div className="ctara-banner" style={{ background: '#042C53' }}>
          <div className="ctara-badge" style={{ background: '#378ADD', color: '#E6F1FB' }}>Compare Mode</div>
          <div className="ctara-banner-text">Click two districts on the map, or search in the panel</div>
        </div>
      )}
      <div className="main-body">
        <Sidebar activeLayer={activeLayer} setActiveLayer={setActiveLayer} stateFilter={stateFilter} setStateFilter={setStateFilter} />
        {leafletReady
          ? <MapView onSelect={handleSelect} selected={selected} activeLayer={activeLayer} stateFilter={stateFilter} compareA={compareA} compareB={compareB} />
          : <div className="map-area" style={{ display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:12, color:'#639922' }}>
              <div style={{ fontSize:40 }}>🗺️</div>
              <div style={{ fontSize:14, fontWeight:600 }}>Loading India map...</div>
            </div>
        }
        <div className="stats-panel">{renderPanel()}</div>
      </div>
    </div>
  );
}
