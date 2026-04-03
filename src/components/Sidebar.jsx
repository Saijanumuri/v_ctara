import districts, { getDevScore, getScoreColor } from '../data/districts';
import { stateList, LAYER_CONFIG } from '../utils/helpers';

const topDistricts = [...districts]
  .sort((a, b) => getDevScore(b) - getDevScore(a))
  .slice(0, 8);

export default function Sidebar({ activeLayer, setActiveLayer, stateFilter, setStateFilter }) {
  return (
    <div className="sidebar">
      <div className="sidebar-title">Filter by State</div>
      <select
        className="state-select"
        value={stateFilter}
        onChange={e => setStateFilter(e.target.value)}
      >
        <option value="">All India</option>
        {stateList.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <div className="sidebar-title" style={{ marginTop: 14 }}>Data Layer</div>
      {Object.keys(LAYER_CONFIG).map(l => (
        <div
          key={l}
          className="layer-item"
          style={{ background: activeLayer === l ? '#EAF3DE' : '' }}
          onClick={() => setActiveLayer(l)}
        >
          <span style={{ backgroundColor: LAYER_CONFIG[l].color }}></span>
          {l}
        </div>
      ))}

      <div className="sidebar-title" style={{ marginTop: 14 }}>Top Districts</div>
      {topDistricts.map(d => {
        const score = getDevScore(d);
        return (
          <div key={d.id} className="state-item">
            <span style={{ backgroundColor: getScoreColor(score) }}></span>
            <span style={{ flex: 1, fontSize: 11 }}>{d.name}</span>
            <span className="state-score">{score}</span>
          </div>
        );
      })}
    </div>
  );
}
