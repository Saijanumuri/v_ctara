import districts, { getDevScore, getScoreColor, nationalStats } from '../data/districts';
import { fmtPop, stateList } from '../utils/helpers';
import { downloadDistrictCSV } from '../utils/download';

const regions = ['South','West','North','East','Central','Northeast'];

function OverviewStats() {
  const regionScores = regions.map(r => {
    const ds = districts.filter(d => d.region === r);
    return {
      r,
      score: Math.round(ds.reduce((s, d) => s + getDevScore(d), 0) / ds.length),
    };
  }).sort((a, b) => b.score - a.score);

  const kpis = [
    { label: 'Electrification', val: `${nationalStats.electrification}%`, color: '#EF9F27', trend: '+4% since 2019' },
    { label: 'Water Access',    val: `${nationalStats.water}%`,           color: '#378ADD', trend: '+18% since 2019' },
    { label: 'Literacy Rate',   val: `${nationalStats.literacy}%`,        color: '#534AB7', trend: 'Census 2011+' },
    { label: 'Sex Ratio',       val: `${nationalStats.sex_ratio}`,        color: '#D4537E', trend: 'per 1000 males' },
    { label: 'NREGA Wage',      val: `₹${nationalStats.nrega}`,           color: '#639922', trend: 'avg/day 2023-24' },
    { label: 'Sanitation',      val: `${nationalStats.sanitation}%`,      color: '#1D9E75', trend: 'ODF villages' },
    { label: 'Road Connect.',   val: `${nationalStats.roads}%`,           color: '#888780', trend: 'PMGSY 2024' },
    { label: 'Irrigation',      val: `${nationalStats.irrigation}%`,      color: '#0F6E56', trend: 'net irrigated' },
  ];

  return (
    <>
      <div className="panel-label">National Overview</div>
      <div className="kpi-grid">
        {kpis.map(k => (
          <div className="kpi-card" key={k.label}>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value" style={{ color: k.color, fontSize: k.val.length > 5 ? 16 : 20 }}>{k.val}</div>
            <div className="kpi-trend">{k.trend}</div>
          </div>
        ))}
      </div>

      <div className="panel-label" style={{ marginTop: 4 }}>Regional Dev. Score</div>
      {regionScores.map(({ r, score }) => (
        <div className="bar-row" key={r}>
          <div className="bar-region">{r}</div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${score}%`, background: getScoreColor(score) }} />
          </div>
          <div className="bar-val">{score}</div>
        </div>
      ))}

      <div className="score-card">
        <div className="score-label">Districts in database</div>
        <div className="score-value">{districts.length}</div>
        <div className="score-sub">across {stateList.length} states & UTs</div>
      </div>
    </>
  );
}

function DistrictDetail({ d }) {
  const score = getDevScore(d);
  const rank  = [...districts]
    .sort((a, b) => getDevScore(b) - getDevScore(a))
    .findIndex(x => x.id === d.id) + 1;

  const metrics = [
    { label: 'Literacy Rate',   val: `${d.literacy}%`,        color: '#534AB7', bg: '#EEEDFE', icon: '📚', pct: d.literacy },
    { label: 'Sex Ratio',       val: `${d.sex_ratio}/1000`,   color: '#D4537E', bg: '#FBEAF0', icon: '⚖️', pct: Math.min(((d.sex_ratio - 800) / 400) * 100, 100) },
    { label: 'Electrification', val: `${d.electrification}%`, color: '#EF9F27', bg: '#FAEEDA', icon: '⚡', pct: d.electrification },
    { label: 'Water Access',    val: `${d.water}%`,            color: '#378ADD', bg: '#E6F1FB', icon: '💧', pct: d.water },
    { label: 'NREGA Wage',      val: `₹${d.nrega}/day`,        color: '#639922', bg: '#EAF3DE', icon: '🌾', pct: Math.min((d.nrega / 350) * 100, 100) },
    { label: 'Sanitation',      val: `${d.sanitation}%`,       color: '#1D9E75', bg: '#E1F5EE', icon: '🏠', pct: d.sanitation },
    { label: 'Roads',           val: `${d.roads}%`,            color: '#888780', bg: '#F1EFE8', icon: '🛣️', pct: d.roads },
    { label: 'Irrigation',      val: `${d.irrigation}%`,       color: '#0F6E56', bg: '#E1F5EE', icon: '🚿', pct: d.irrigation },
  ];

  return (
    <>
      <div className="district-header">
        <div className="district-score-circle">
          <div className="dsc-num">{score}</div>
          <div className="dsc-sub">/100</div>
        </div>
        <div style={{ flex: 1 }}>
          <div className="district-name">{d.name}</div>
          <div className="district-state">{d.state} · Rank #{rank} of {districts.length}</div>
          <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>Pop: {fmtPop(d.population)}</div>
        </div>
      </div>

      {metrics.map(m => (
        <div className="metric-row" key={m.label}>
          <div className="metric-icon" style={{ background: m.bg, fontSize: 14 }}>{m.icon}</div>
          <div className="metric-info">
            <div className="metric-name">{m.label}</div>
            <div className="metric-val" style={{ color: m.color }}>{m.val}</div>
            <div className="metric-bar-bg">
              <div className="metric-bar" style={{ width: `${m.pct}%`, background: m.color }} />
            </div>
          </div>
        </div>
      ))}

      <button className="download-btn" onClick={() => downloadDistrictCSV(d)}>
        ⬇ Download District Report (CSV)
      </button>

      <div className="score-card">
        <div className="score-label">Dev. Score</div>
        <div className="score-value" style={{ color: getScoreColor(score) }}>{score}/100</div>
        <div className="score-sub">
          {score >= 70 ? 'Above national avg' : score >= 50 ? 'Near national avg' : 'Below national avg'}
        </div>
        <div className="score-bar-bg">
          <div className="score-bar-fill" style={{ width: `${score}%`, background: getScoreColor(score) }} />
        </div>
      </div>
    </>
  );
}

export default function StatsPanel({ selected }) {
  if (selected) return <DistrictDetail d={selected} />;
  return <OverviewStats />;
}
