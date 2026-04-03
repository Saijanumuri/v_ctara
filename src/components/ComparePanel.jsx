import { useState } from 'react';
import districts, { getDevScore} from '../data/districts';
import { fmtPop } from '../utils/helpers';

const METRICS = [
  { label: 'Dev. Score',      fn: d => `${getDevScore(d)}/100`,      pct: d => getDevScore(d),                                         color: '#1a3d0a' },
  { label: 'Literacy',        fn: d => `${d.literacy}%`,              pct: d => d.literacy,                                             color: '#534AB7' },
  { label: 'Sex Ratio',       fn: d => `${d.sex_ratio}/1k`,           pct: d => Math.min(((d.sex_ratio - 800) / 400) * 100, 100),       color: '#D4537E' },
  { label: 'Electrification', fn: d => `${d.electrification}%`,       pct: d => d.electrification,                                      color: '#EF9F27' },
  { label: 'Water Access',    fn: d => `${d.water}%`,                  pct: d => d.water,                                                color: '#378ADD' },
  { label: 'NREGA Wage',      fn: d => `₹${d.nrega}`,                  pct: d => Math.min((d.nrega / 350) * 100, 100),                  color: '#639922' },
  { label: 'Sanitation',      fn: d => `${d.sanitation}%`,             pct: d => d.sanitation,                                           color: '#1D9E75' },
  { label: 'Roads',           fn: d => `${d.roads}%`,                  pct: d => d.roads,                                                color: '#888780' },
  { label: 'Irrigation',      fn: d => `${d.irrigation}%`,             pct: d => d.irrigation,                                           color: '#0F6E56' },
  { label: 'Population',      fn: d => fmtPop(d.population),           pct: d => Math.min(d.population / 5000000 * 100, 100),            color: '#2C2C2A' },
];

function DistrictSearch({ label, color, selected, onSelect }) {
  const [q, setQ] = useState('');
  const results   = q.length >= 2
    ? districts.filter(d =>
        d.name.toLowerCase().includes(q.toLowerCase()) ||
        d.state.toLowerCase().includes(q.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color, marginBottom: 4 }}>District {label}</div>
      <input
        className="chat-input"
        style={{ width: '100%', marginBottom: 4 }}
        placeholder="Search district..."
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      {results.map(d => (
        <div
          key={d.id}
          className="chip"
          style={{ marginBottom: 3, display: 'block', cursor: 'pointer' }}
          onClick={() => { onSelect(d); setQ(''); }}
        >
          {d.name}, {d.state}
        </div>
      ))}
      {selected && (
        <div style={{ fontSize: 11, fontWeight: 700, color, padding: '4px 0' }}>
          ✓ {selected.name}, {selected.state}
        </div>
      )}
    </div>
  );
}

export default function ComparePanel({ a, b, setA, setB }) {
  const downloadCSV = () => {
    if (!a || !b) return;
    const rows = [
      ['Metric', a.name, b.name],
      ...METRICS.map(m => [m.label, m.fn(a), m.fn(b)]),
    ];
    const csv  = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const el   = document.createElement('a');
    el.href     = url;
    el.download = `compare_${a.name}_vs_${b.name}.csv`;
    el.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="panel-label">Compare Districts</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
        <DistrictSearch label="A" color="#EF9F27" selected={a} onSelect={setA} />
        <DistrictSearch label="B" color="#378ADD" selected={b} onSelect={setB} />
      </div>

      {a && b ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 50px 1fr', gap: 4, alignItems: 'center', marginBottom: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#EF9F27', textAlign: 'center' }}>{a.name}</div>
            <div></div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#378ADD', textAlign: 'center' }}>{b.name}</div>
          </div>

          {METRICS.map(m => {
            const va = m.pct(a);
            const vb = m.pct(b);
            return (
              <div key={m.label} style={{ display: 'grid', gridTemplateColumns: '1fr 50px 1fr', gap: 4, alignItems: 'center', marginBottom: 7 }}>
                <div>
                  <div className="bar-track" style={{ height: 8 }}>
                    <div className="bar-fill" style={{ width: `${va}%`, background: va >= vb ? '#1a3d0a' : '#D85A30', marginLeft: 'auto', direction: 'rtl' }} />
                  </div>
                  <div style={{ fontSize: 10, color: '#EF9F27', fontWeight: 700, textAlign: 'right' }}>{m.fn(a)}</div>
                </div>
                <div style={{ fontSize: 9, color: '#888', textAlign: 'center', fontWeight: 600 }}>{m.label}</div>
                <div>
                  <div className="bar-track" style={{ height: 8 }}>
                    <div className="bar-fill" style={{ width: `${vb}%`, background: vb >= va ? '#1a3d0a' : '#D85A30' }} />
                  </div>
                  <div style={{ fontSize: 10, color: '#378ADD', fontWeight: 700 }}>{m.fn(b)}</div>
                </div>
              </div>
            );
          })}

          <button className="download-btn" onClick={downloadCSV}>
            ⬇ Download Comparison CSV
          </button>
        </>
      ) : (
        <div style={{ textAlign: 'center', color: '#888', fontSize: 12, padding: '20px 0' }}>
          Search and select two districts above to compare
        </div>
      )}
    </>
  );
}
