import districts, { getDevScore, getScoreColor } from '../data/districts';

export const LAYER_CONFIG = {
  'Dev. Score':      { key: 'devScore',       color: '#639922' },
  'Electrification': { key: 'electrification', color: '#EF9F27' },
  'Water Access':    { key: 'water',           color: '#378ADD' },
  'Literacy':        { key: 'literacy',        color: '#534AB7' },
  'Sex Ratio':       { key: 'sex_ratio',       color: '#D4537E' },
  'NREGA Wages':     { key: 'nrega',           color: '#EF9F27' },
  'Sanitation':      { key: 'sanitation',      color: '#1D9E75' },
  'Roads':           { key: 'roads',           color: '#888780' },
  'Irrigation':      { key: 'irrigation',      color: '#0F6E56' },
};


export const getLayerVal = (d, layer) => {
  if (layer === 'Dev. Score') return getDevScore(d);
  return d[LAYER_CONFIG[layer]?.key] ?? 0;
};


export const layerColor = (val, layer) => {
  if (layer === 'Dev. Score') return getScoreColor(val);
  const max = layer === 'NREGA Wages' ? 350 : layer === 'Sex Ratio' ? 1200 : 100;
  const min = layer === 'NREGA Wages' ? 140 : layer === 'Sex Ratio' ? 800  : 0;
  const pct = Math.min(Math.max((val - min) / (max - min), 0), 1);
  if (pct >= 0.80) return '#173404';
  if (pct >= 0.65) return '#27500A';
  if (pct >= 0.50) return '#639922';
  if (pct >= 0.35) return '#97C459';
  if (pct >= 0.20) return '#EF9F27';
  if (pct >= 0.10) return '#D85A30';
  return '#A32D2D';
};


export const fmtPop = (n) =>
  n >= 1e7 ? `${(n / 1e7).toFixed(1)}Cr`
  : n >= 1e5 ? `${(n / 1e5).toFixed(1)}L`
  : n.toLocaleString('en-IN');


export const stateList = [...new Set(districts.map(d => d.state))].sort();