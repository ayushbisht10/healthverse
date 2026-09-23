import React, { useState } from 'react';
import { Activity, Plus, TrendingUp, Scale, Flame, Target, Dumbbell } from 'lucide-react';

export default function VitalsTracker() {
  const [logs, setLogs] = useState([
    { id: 1, metric: 'Body Weight', value: '72.5 kg', date: 'Today, 8:00 AM', status: 'Optimal', note: 'Morning weigh-in' },
    { id: 2, metric: 'Active Calorie Burn', value: '640 kcal', date: 'Today, 2:15 PM', status: 'Target Met', note: 'Post gym workout' },
    { id: 3, metric: 'BMI Index', value: '23.4 kg/m²', date: 'Yesterday', status: 'Normal Range', note: 'Calculated' },
    { id: 4, metric: 'Daily Water Intake', value: '3.2 Liters', date: 'Yesterday', status: 'Hydrated', note: 'Self recorded' }
  ]);

  const [metricType, setMetricType] = useState('Body Weight');
  const [metricVal, setMetricVal] = useState('');
  const [metricNote, setMetricNote] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddLog = () => {
    if (!metricVal) return;
    const newEntry = {
      id: Date.now(),
      metric: metricType,
      value: metricVal,
      date: 'Just now',
      status: 'Logged',
      note: metricNote || 'Self recorded'
    };
    setLogs([newEntry, ...logs]);
    setMetricVal('');
    setMetricNote('');
    setShowAddModal(false);
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Bar */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '4px' }}>Fitness & Physical Progress Vault</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Self-recorded weight, BMI, caloric burn & hydration analytics</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={18} /> Record New Entry
        </button>
      </div>

      {/* Analytics Visualizers Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* Weight Progress Trend */}
        <div className="glass-panel" style={{ padding: '22px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={18} color="#06b6d4" /> Weight Progress (30 Days)
            </h3>
            <span className="badge badge-cyan">-1.2 kg</span>
          </div>

          <svg width="100%" height="100" viewBox="0 0 300 80" style={{ overflow: 'visible' }}>
            <path
              d="M0,30 Q60,35 120,45 T240,55 T300,60"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="3"
            />
            <path
              d="M0,30 Q60,35 120,45 T240,55 T300,60 L300,80 L0,80 Z"
              fill="rgba(6, 182, 212, 0.12)"
            />
            <circle cx="300" cy="60" r="5" fill="#06b6d4" />
          </svg>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '8px' }}>
            <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Current</span>
          </div>
        </div>

        {/* Caloric Burn Graph */}
        <div className="glass-panel" style={{ padding: '22px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={18} color="#f59e0b" /> Daily Caloric Burn (kcal)
            </h3>
            <span className="badge badge-emerald">640 kcal Avg</span>
          </div>

          <svg width="100%" height="100" viewBox="0 0 300 80" style={{ overflow: 'visible' }}>
            <path
              d="M0,60 Q50,30 100,40 T200,25 T300,35"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
            />
            <path
              d="M0,60 Q50,30 100,40 T200,25 T300,35 L300,80 L0,80 Z"
              fill="rgba(245, 158, 11, 0.12)"
            />
            <circle cx="200" cy="25" r="5" fill="#f59e0b" />
          </svg>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '8px' }}>
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span>
          </div>
        </div>

      </div>

      {/* Recent History Table */}
      <div className="glass-panel" style={{ padding: '22px', borderRadius: '20px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px' }}>Logged Fitness Entries</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {logs.map(log => (
            <div key={log.id} style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              borderRadius: '14px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              gap: '12px'
            }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{log.metric}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{log.date} • {log.note}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--accent-cyan)' }}>{log.value}</span>
                <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '2px' }}>{log.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Log Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div className="glass-panel animate-fade" style={{ width: '100%', maxWidth: '420px', padding: '26px', borderRadius: '20px', background: '#0f172a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Record Fitness Reading</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Metric Type</label>
                <select
                  value={metricType}
                  onChange={(e) => setMetricType(e.target.value)}
                  style={{
                    width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '10px', borderRadius: '10px', outline: 'none'
                  }}
                >
                  <option value="Body Weight">Body Weight (kg)</option>
                  <option value="Calorie Burn">Active Calorie Burn (kcal)</option>
                  <option value="Water Intake">Water Intake (Liters)</option>
                  <option value="Waist Circumference">Waist Circumference (inches)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Value Reading</label>
                <input
                  type="text"
                  placeholder="e.g. 72.5 kg or 650 kcal"
                  value={metricVal}
                  onChange={(e) => setMetricVal(e.target.value)}
                  style={{
                    width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '10px', borderRadius: '10px', outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Context Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Morning fasting weight"
                  value={metricNote}
                  onChange={(e) => setMetricNote(e.target.value)}
                  style={{
                    width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '10px', borderRadius: '10px', outline: 'none'
                  }}
                />
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }} onClick={handleAddLog}>
              Save Reading
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
