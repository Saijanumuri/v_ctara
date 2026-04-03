import { useEffect, useRef } from 'react';
import districts, { getDevScore, getScoreColor } from '../data/districts';
import { getLayerVal, layerColor, fmtPop } from '../utils/helpers';

export default function MapView({
  onSelect, selected, activeLayer, stateFilter, compareA, compareB
}) {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);
  const markersRef = useRef({});

  const visible = stateFilter
    ? districts.filter(d => d.state === stateFilter)
    : districts;

  // Initialize map once
  useEffect(() => {
    if (instanceRef.current || !window.L) return;
    const L = window.L;
    const map = L.map(mapRef.current, { center: [22, 80], zoom: 5, zoomControl: false });
    
    // Add zoom control to top right for cleaner UI
    L.control.zoom({ position: 'topright' }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      opacity: 0.35,
    }).addTo(map);
    
    instanceRef.current = map;
  }, []);

  // Sync Markers
  useEffect(() => {
    if (!instanceRef.current || !window.L) return;
    const L = window.L;
    const map = instanceRef.current;

    // Remove markers that are no longer visible (due to stateFilter)
    const visibleIds = new Set(visible.map(d => d.id));
    Object.keys(markersRef.current).forEach(id => {
      if (!visibleIds.has(id)) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });

    visible.forEach(d => {
      const val = getLayerVal(d, activeLayer);
      const color = layerColor(val, activeLayer);
      const score = getDevScore(d);

      const isSelected = selected?.id === d.id;
      const isCompA = compareA?.id === d.id;
      const isCompB = compareB?.id === d.id;

      const radius = isSelected || isCompA || isCompB ? 13 : 8;
      const weight = isSelected || isCompA || isCompB ? 3 : 1;
      const borderColor = isCompA ? '#EF9F27' : isCompB ? '#378ADD' : isSelected ? '#1a3d0a' : '#fff';

      // If marker exists, just update style. Otherwise, create it.
      if (markersRef.current[d.id]) {
        const m = markersRef.current[d.id];
        m.setStyle({ radius, fillColor: color, color: borderColor, weight });
      } else {
        const m = L.circleMarker([d.lat, d.lng], {
          radius, fillColor: color, color: borderColor,
          weight, opacity: 1, fillOpacity: 0.9,
        }).addTo(map);

        // Tooltip Content (Optimized string)
        m.bindTooltip(`
          <div style="font-family:Inter,sans-serif;min-width:160px;">
            <b style="font-size:13px;color:#1a3d0a">${d.name}</b><br/>
            <span style="font-size:11px;color:#639922">${d.state}</span>
            <hr style="margin:4px 0;border-color:#eee"/>
            <div style="font-size:11px;display:grid;grid-template-columns: 1fr 1fr; gap:2px;">
               <span style="color:#888">Dev Score:</span><b style="text-align:right;color:${getScoreColor(score)}">${score}/100</b>
               <span style="color:#888">Water:</span><b style="text-align:right;color:#378ADD">${d.water}%</b>
               <span style="color:#888">Irrigation:</span><b style="text-align:right;color:#0F6E56">${d.irrigation}%</b>
            </div>
          </div>
        `, { className: 'gd-tooltip', sticky: true });

        m.on('click', () => onSelect(d));
        markersRef.current[d.id] = m;
      }
    });
  }, [activeLayer, stateFilter, selected, compareA, compareB, visible]);

  // Fly to selection
  useEffect(() => {
    if (selected && instanceRef.current) {
      instanceRef.current.flyTo([selected.lat, selected.lng], 8, { 
        duration: 1.2,
        easeLinearity: 0.25 
      });
    }
  }, [selected]);

  return (
    <div className="map-area">
      <div ref={mapRef} className="map-container" style={{ height: '100%', background: '#f8f9fa' }} />
      
      {/* Legend stays visible on top of the map */}
      <div className="map-legend">
        <div className="legend-title" style={{ textTransform: 'capitalize' }}>
          {activeLayer.replace('_', ' ')}
        </div>
        <div className="legend-bar" style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', margin: '6px 0' }}>
          {['#A32D2D','#D85A30','#EF9F27','#97C459','#639922','#27500A','#173404'].map((c, i) => (
            <div key={i} style={{ flex: 1, background: c }} />
          ))}
        </div>
        <div className="legend-labels" style={{ display:'flex', justifyContent:'space-between', fontSize: 10, color: '#666' }}>
          <span>Low</span><span>High</span>
        </div>
      </div>
    </div>
  );
}