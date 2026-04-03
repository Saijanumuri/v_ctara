import { useState } from 'react';
import { getDevScore } from '../data/districts';
import { fmtPop } from '../utils/helpers';


const CHIPS = [
  'Why is irrigation low here?',
  'Best CTARA rural interventions?',
  'SDG gaps in this district?',
  'What schemes can help?',
  'Compare water vs sanitation',
];

function TypingDots() {
  return (
    <div style={{ display:'flex', gap:4, padding:'4px 0', alignItems:'center' }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width:6, height:6, borderRadius:'50%', background:'#639922',
          animation:'gdBounce 1s infinite', animationDelay:`${i*0.15}s`,
        }}/>
      ))}
    </div>
  );
}

export default function CTARAPanel({ d }) {
  const [messages, setMessages] = useState([]);
  const [input,    setInput]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const ask = async (question) => {
    const q = question.trim();
    if (!q || loading) return;
    setMessages(prev => [...prev, { role:'user', text:q }]);
    setInput('');
    setLoading(true);

    const apiKey = process.env.REACT_APP_CLAUDE_KEY;

    if (!apiKey) {
      setMessages(prev => [...prev, {
        role: 'claude',
        text: '⚠️ API key missing. Add REACT_APP_CLAUDE_KEY to your .env file and restart the app. See the setup guide below.',
      }]);
      setLoading(false);
      return;
    }

    const context = d
      ? `District: ${d.name}, ${d.state}. Literacy:${d.literacy}%, SexRatio:${d.sex_ratio}/1000, Electrification:${d.electrification}%, Water:${d.water}%, NREGA:₹${d.nrega}/day, Sanitation:${d.sanitation}%, Roads:${d.roads}%, Irrigation:${d.irrigation}%, Pop:${fmtPop(d.population)}, DevScore:${getDevScore(d)}/100.`
      : 'National India rural development overview.';

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'x-api-key':     apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model:      'claude-sonnet-4-20250514',
          max_tokens: 600,
          messages: [{
            role: 'user',
            content: `You are a rural development research assistant aligned with CTARA (Centre for Technology Alternatives for Rural Areas), IIT Bombay. Give concise, research-backed insights in 3-5 sentences. Cite relevant government schemes where applicable.\n\nContext: ${context}\n\nQuestion: ${q}`,
          }],
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || `Error ${res.status}`);
      }

      const data = await res.json();
      setMessages(prev => [...prev, { role:'claude', text: data.content?.[0]?.text || 'No response.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role:'claude', text:`Error: ${err.message}` }]);
    }
    setLoading(false);
  };

  const ctaraInds = [
    { name:'Irrigation coverage',     val: d?.irrigation ?? 52,                     color:'#378ADD', desc:'% net irrigated vs cultivated land' },
    { name:'Road connectivity',        val: d?.roads ?? 82,                           color:'#639922', desc:'PMGSY all-weather road coverage' },
    { name:'Agri. productivity index', val: Math.round((d?.irrigation ?? 52) * 0.8), color:'#EF9F27', desc:'Relative crop yield vs national avg' },
    { name:'Rainfall dependency',      val: d ? Math.max(100 - d.irrigation, 0) : 48,color:'#D85A30', desc:'% farmland dependent on rainfall' },
  ];

  const hasKey = !!process.env.REACT_APP_CLAUDE_KEY;

  return (
    <div>
      <div className="panel-label">CTARA Focus · {d ? d.name : 'India'}</div>

      {ctaraInds.map(m => (
        <div className="ctara-ind" key={m.name}>
          <div className="ctara-ind-head">
            <div className="ctara-ind-name">{m.name}</div>
            <div className="ctara-ind-score">{m.val}%</div>
          </div>
          <div className="ctara-ind-desc">{m.desc}</div>
          <div className="ctara-bar-bg">
            <div className="ctara-bar" style={{ width:`${m.val}%`, background:m.color }}/>
          </div>
        </div>
      ))}

      {d && (
        <div className="insight-box">
          <div className="insight-title">📍 Research Insight</div>
          <div className="insight-text">
            {d.irrigation < 40
              ? `${d.name}'s low irrigation (${d.irrigation}%) and high rainfall dependency (${100 - d.irrigation}%) shows strong potential for solar micro-irrigation — a core CTARA research focus. PM-KUSUM scheme is directly relevant here.`
              : d.literacy < 65
              ? `${d.name}'s literacy (${d.literacy}%) is below the national average of 77.7%. Community learning centres and adult literacy drives aligned with CTARA's livelihood programmes can create lasting impact.`
              : d.water < 50
              ? `${d.name}'s water access (${d.water}%) is critically low. Jal Jeevan Mission targets full tap-water coverage — this district needs focused implementation with village-level water user committees.`
              : `${d.name} shows strength in ${d.electrification > 90 ? 'electrification' : 'roads'} but gaps in ${d.water < 65 ? 'water access' : 'sanitation'} require CTARA-style community-led interventions for sustained rural progress.`}
          </div>
        </div>
      )}

      {/* ── Claude AI Chat ── */}
      <div className="claude-chat">
        <div className="chat-header">
          <div className="claude-icon">✦</div>
          <div className="chat-header-title">Claude AI</div>
          <div className="chat-header-sub">{d ? `${d.name} loaded` : 'India overview'}</div>
        </div>

        {messages.length === 0 && (
          <div style={{ padding:'8px 10px 4px' }}>
            <div style={{ fontSize:9, color:'#888', marginBottom:5 }}>Suggested questions:</div>
            <div className="chip-row">
              {CHIPS.map(c => (
                <button key={c} className="chip" onClick={() => ask(c)}>{c}</button>
              ))}
            </div>
          </div>
        )}

        {messages.length > 0 && (
          <div className="chat-messages">
            {messages.map((m, i) =>
              m.role === 'user'
                ? <div key={i} className="msg-user">{m.text}</div>
                : <div key={i} className="msg-claude">
                    <div className="msg-claude-label">✦ Claude</div>
                    {m.text}
                  </div>
            )}
            {loading && (
              <div className="msg-claude">
                <div className="msg-claude-label">✦ Claude</div>
                <TypingDots/>
              </div>
            )}
          </div>
        )}

        <div className="chat-input-row">
          <input
            className="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !loading && ask(input)}
            placeholder={loading ? 'Claude is thinking...' : 'Ask about rural development...'}
            disabled={loading}
          />
          <button
            className="chat-send"
            onClick={() => ask(input)}
            disabled={loading || !input.trim()}
            style={{ opacity: loading || !input.trim() ? 0.5 : 1 }}
          >→</button>
        </div>
      </div>

      {/* ── API Key Guide (shown when key is missing) ── */}
      {!hasKey && (
        <div className="api-guide">
          <div className="api-guide-title">🔑 Enable Claude AI — 5 steps</div>
          {[
            ['1', 'Go to', 'console.anthropic.com', '→ sign up (free)'],
            ['2', 'Click', 'API Keys', '→ Create Key → Copy the key'],
            ['3', 'In VS Code, create a file named', '.env', 'in your project root (same folder as package.json)'],
            ['4', 'Paste this inside the .env file:', 'REACT_APP_CLAUDE_KEY=sk-ant-xxxxxx', '(replace with your actual key)'],
            ['5', 'Stop the app (Ctrl+C) and run', 'npm start', 'again — Claude will now work'],
          ].map(([num, pre, bold, post]) => (
            <div key={num} className="api-step">
              <span className="api-step-num">{num}</span>
              <span>{pre} <strong>{bold}</strong> {post}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
