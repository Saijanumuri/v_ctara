import { useEffect, useRef } from 'react';
import districts, { getDevScore, getScoreColor } from '../data/districts';
import { getLayerVal, layerColor, fmtPop } from '../utils/helpers';

export default function MapView({
  onSelect, selected, activeLayer, stateFilter, compareA, compareB
}) {
  const mapRef       = useRef(null);
  const instanceRef  = useRef(null);
  const markersRef   = useRef({});

  const visible = stateFilter
    ? districts.filter(d => d.state === stateFilter)
    : districts;

  // initialise map once
  useEffect(() => {
    if (instanceRef.current || !window.L) return;
    const L   = window.L;
    const map = L.map(mapRef.current, { center: [22, 80], zoom: 5 });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      opacity: 0.35,
    }).addTo(map);
    instanceRef.current = map;
  }, []);

  // redraw markers when anything changes
  useEffect(() => {
    if (!instanceRef.current || !window.L) return;
    const L   = window.L;
    const map = instanceRef.current;

    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    visible.forEach(d => {
      const val   = getLayerVal(d, activeLayer);
      const color = layerColor(val, activeLayer);
      const score = getDevScore(d);

      const isSelected = selected?.id === d.id;
      const isCompA    = compareA?.id  === d.id;
      const isCompB    = compareB?.id  === d.id;

      const radius      = isSelected || isCompA || isCompB ? 13 : 9;
      const weight      = isSelected || isCompA || isCompB ? 3  : 1;
      const borderColor = isCompA    ? '#EF9F27'
                        : isCompB    ? '#378ADD'
                        : isSelected ? '#1a3d0a'
                        : '#fff';

      const m = L.circleMarker([d.lat, d.lng], {
        radius, fillColor: color, color: borderColor,
        weight, opacity: 1, fillOpacity: 0.88,
      }).addTo(map);

      m.bindTooltip(`
        <div style="font-family:Inter,sans-serif;min-width:160px;padding:2px">
          <b style="font-size:13px;color:#1a3d0a">${d.name}</b><br/>
          <span style="font-size:11px;color:#639922">${d.state}</span>
          <hr style="margin:4px 0;border-color:#eee"/>
          <table style="font-size:11px;width:100%">
            <tr><td style="color:#888">Dev. Score</td>      <td style="text-align:right;font-weight:700;color:${getScoreColor(score)}">${score}/100</td></tr>
            <tr><td style="color:#888">Literacy</td>         <td style="text-align:right;color:#534AB7;font-weight:600">${d.literacy}%</td></tr>
            <tr><td style="color:#888">Sex Ratio</td>        <td style="text-align:right;color:#D4537E;font-weight:600">${d.sex_ratio}/1000</td></tr>
            <tr><td style="color:#888">Water Access</td>     <td style="text-align:right;color:#378ADD;font-weight:600">${d.water}%</td></tr>
            <tr><td style="color:#888">Electrification</td>  <td style="text-align:right;color:#EF9F27;font-weight:600">${d.electrification}%</td></tr>
            <tr><td style="color:#888">NREGA Wage</td>       <td style="text-align:right;color:#639922;font-weight:600">₹${d.nrega}/day</td></tr>
            <tr><td style="color:#888">Sanitation</td>       <td style="text-align:right;color:#1D9E75;font-weight:600">${d.sanitation}%</td></tr>
            <tr><td style="color:#888">Roads</td>            <td style="text-align:right;color:#888780;font-weight:600">${d.roads}%</td></tr>
            <tr><td style="color:#888">Irrigation</td>       <td style="text-align:right;color:#0F6E56;font-weight:600">${d.irrigation}%</td></tr>
            <tr><td style="color:#888">Population</td>       <td style="text-align:right;color:#555;font-weight:600">${fmtPop(d.population)}</td></tr>
          </table>
        </div>
      `, { className: 'gd-tooltip', sticky: false });

      m.on('click', () => onSelect(d));
      markersRef.current[d.id] = m;
    });
  }, [activeLayer, stateFilter, selected, compareA, compareB]);

  // fly to selected district
  useEffect(() => {
    if (selected && instanceRef.current) {
      instanceRef.current.flyTo([selected.lat, selected.lng], 9, { duration: 1 });
    }
  }, [selected]);

  return (
    <div className="map-area">
      <div ref={mapRef} className="map-container" />
      <div className="map-legend">
        <div className="legend-title">{activeLayer}</div>
        <div className="legend-bar">
          {['#A32D2D','#D85A30','#EF9F27','#97C459','#639922','#27500A','#173404'].map((c, i) => (
            <div key={i} style={{ flex: 1, background: c }} />
          ))}
        </div>
        <div className="legend-labels"><span>Low</span><span>High</span></div>
      </div>
    </div>
  );
}
