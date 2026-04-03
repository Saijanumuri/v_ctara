export default function Topbar({ mode, setMode, search, setSearch, onSearch }) {
  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="topbar-logo">🌾 V_CTARA</span>
        <span className="topbar-subtitle">India Rural Dashboard</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          className="search-box"
          placeholder="Search district or state..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSearch()}
        />
        {['Overview', 'CTARA Mode', 'Compare'].map(m => (
          <button
            key={m}
            className={`nav-pill ${mode === m ? 'active' : ''}`}
            onClick={() => setMode(m)}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}
