import React, { useState } from 'react';
import { 
  Users, DollarSign, Activity, Dumbbell, ShieldCheck, UserPlus, 
  Search, Edit3, Trash2, CheckCircle2, AlertCircle, BarChart2, Server, Cpu, RefreshCw 
} from 'lucide-react';

export default function AdminPortal() {
  const [activeSubTab, setActiveSubTab] = useState('members');
  const [searchQuery, setSearchQuery] = useState('');

  const [membersList, setMembersList] = useState([
    { id: 101, name: 'Sarah Jenkins', email: 'sarah.j@example.com', plan: 'VIP Platinum', status: 'Active', joined: '12 Jan 2026', checkIns: 42, trainer: 'Coach Marcus' },
    { id: 102, name: 'David Chen', email: 'david.c@example.com', plan: 'Gold Monthly', status: 'Active', joined: '04 Feb 2026', checkIns: 18, trainer: 'Self Trained' },
    { id: 103, name: 'Elena Rostova', email: 'elena.r@example.com', plan: 'Silver Annual', status: 'Active', joined: '20 Feb 2026', checkIns: 29, trainer: 'Coach Marcus' },
    { id: 104, name: 'Alex Rivera', email: 'alex.r@example.com', plan: 'VIP Platinum', status: 'Active', joined: '01 Mar 2026', checkIns: 14, trainer: 'Coach Marcus' },
    { id: 105, name: 'Michael Thorne', email: 'm.thorne@example.com', plan: 'Basic Pass', status: 'Pending', joined: '04 Sep 2026', checkIns: 2, trainer: 'None' }
  ]);

  const [aiTelemetry, setAiTelemetry] = useState({
    cvInferenceCalls: 4820,
    dietPlansGenerated: 1290,
    riskPredictions: 854,
    fastapiLatency: '42 ms',
    modelAccuracy: '97.8%'
  });

  const filteredMembers = membersList.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.plan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMemberStatus = (id) => {
    setMembersList(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, status: m.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return m;
    }));
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Admin Portal Header Banner */}
      <div className="glass-panel" style={{
        padding: '26px', borderRadius: '22px',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(15, 23, 42, 0.95) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <div className="badge badge-purple" style={{ marginBottom: '8px', background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa', border: '1px solid rgba(139, 92, 246, 0.4)' }}>
            <ShieldCheck size={13} style={{ marginRight: '4px' }} /> HealthVerse Admin Master Portal
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Gym Operations & AI Control Center</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Facility telemetry, member management, subscription revenue, & AI ML service monitoring</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '12px' }}>
          <button
            onClick={() => setActiveSubTab('members')}
            style={{
              background: activeSubTab === 'members' ? 'var(--accent-purple)' : 'transparent',
              color: activeSubTab === 'members' ? '#fff' : 'var(--text-muted)',
              border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem'
            }}
          >
            <Users size={15} style={{ marginRight: '6px' }} /> Member Admin
          </button>
          <button
            onClick={() => setActiveSubTab('telemetry')}
            style={{
              background: activeSubTab === 'telemetry' ? 'var(--accent-purple)' : 'transparent',
              color: activeSubTab === 'telemetry' ? '#fff' : 'var(--text-muted)',
              border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem'
            }}
          >
            <Cpu size={15} style={{ marginRight: '6px' }} /> AI/ML Telemetry
          </button>
        </div>
      </div>

      {/* Quick Admin Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Monthly Membership Revenue</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>$48,920</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>+12% vs last month</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Gym Subscriptions</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#22d3ee', marginTop: '4px' }}>1,420</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>94% Retention Rate</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Daily Facility Check-Ins</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>318</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>Peak hours: 5-8 PM</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CV Keypoint Inferences</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a78bfa', marginTop: '4px' }}>4.8k</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>FastAPI Latency: 42ms</div>
        </div>
      </div>

      {/* Main SubTab Content */}
      {activeSubTab === 'members' ? (
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
          
          {/* Table Search & Add Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search member name, email, or plan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '10px 14px 10px 42px', color: '#fff', outline: 'none' }}
              />
            </div>
            <button className="btn-primary" onClick={() => alert('Add Member Dialog')}>
              <UserPlus size={16} /> Add Member Account
            </button>
          </div>

          {/* Members Admin Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px' }}>Member Name</th>
                  <th style={{ padding: '12px' }}>Plan</th>
                  <th style={{ padding: '12px' }}>Joined Date</th>
                  <th style={{ padding: '12px' }}>Check-ins</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map(m => (
                  <tr key={m.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '14px 12px' }}>
                      <div style={{ fontWeight: 700 }}>{m.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{m.email}</div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>{m.plan}</span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{m.joined}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{m.checkIns} Visits</td>
                    <td style={{ padding: '12px' }}>
                      <span className={`badge badge-${m.status === 'Active' ? 'emerald' : 'rose'}`} style={{ fontSize: '0.72rem' }}>
                        {m.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button
                        onClick={() => toggleMemberStatus(m.id)}
                        style={{
                          background: m.status === 'Active' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                          border: m.status === 'Active' ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
                          color: m.status === 'Active' ? '#f43f5e' : '#10b981',
                          padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600
                        }}
                      >
                        {m.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      ) : (
        /* AI/ML Telemetry SubTab */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          
          <div className="glass-panel" style={{ padding: '22px', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Server size={18} color="var(--primary)" /> FastAPI ML Service Health
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Microservice Status</span>
                <span className="badge badge-emerald">Online (100% Uptime)</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>MediaPipe Computer Vision Calls</span>
                <strong style={{ color: '#22d3ee' }}>{aiTelemetry.cvInferenceCalls}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>AI Diet Plans Generated</span>
                <strong style={{ color: '#10b981' }}>{aiTelemetry.dietPlansGenerated}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>ML Risk Prediction Assessments</span>
                <strong style={{ color: '#a78bfa' }}>{aiTelemetry.riskPredictions}</strong>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '22px', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart2 size={18} color="var(--accent-emerald)" /> Model Accuracy & Benchmarks
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span>MediaPipe MoveNet Keypoint Precision</span>
                  <strong style={{ color: '#10b981' }}>98.4%</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '98.4%', height: '100%', background: '#10b981' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span>ML Risk Classification F1 Score</span>
                  <strong style={{ color: '#22d3ee' }}>96.2%</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '96.2%', height: '100%', background: '#22d3ee' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
