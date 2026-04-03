import { getDevScore } from '../data/districts';

// ── Download a single district's data as CSV ─────────────────────────────────
export const downloadDistrictCSV = (d) => {
  const score = getDevScore(d);
  const rows  = [
    ['Field', 'Value', 'Source'],
    ['District',          d.name,                      'Census 2011'],
    ['State',             d.state,                     'Census 2011'],
    ['Region',            d.region,                    'Census 2011'],
    ['Population',        d.population,                'Census 2011'],
    ['Dev. Score',        `${score}/100`,              'Grameen Drishti Formula'],
    ['Literacy Rate',     `${d.literacy}%`,            'Census 2011'],
    ['Sex Ratio',         `${d.sex_ratio} per 1000`,   'Census 2011'],
    ['Electrification',   `${d.electrification}%`,     'Ministry of Power 2024'],
    ['Water Access (JJM)',`${d.water}%`,               'Jal Jeevan Mission 2024'],
    ['NREGA Avg Wage',    `Rs.${d.nrega}/day`,         'NREGA Portal 2023-24'],
    ['Sanitation (ODF)',  `${d.sanitation}%`,          'Swachh Bharat Mission 2024'],
    ['Road Connectivity', `${d.roads}%`,               'PMGSY / OMMS 2024'],
    ['Irrigation',        `${d.irrigation}%`,          'Agriculture Census 2022'],
    ['Latitude',          d.lat,                       'Survey of India'],
    ['Longitude',         d.lng,                       'Survey of India'],
  ];

  const csv  = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const el   = document.createElement('a');
  el.href     = url;
  el.download = `${d.name}_${d.state}_GrameenDrishti.csv`;
  el.click();
  URL.revokeObjectURL(url);
};
