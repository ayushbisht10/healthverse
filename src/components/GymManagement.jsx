import React, { useState } from 'react';
import { Dumbbell, Users, Calendar, Clock, CreditCard, CheckCircle, Plus, Search, UserPlus } from 'lucide-react';

export default function GymManagement() {
  const [activeTab, setActiveTab] = useState('members');

  const members = [
    { id: 1, name: 'Sarah Jenkins', plan: 'VIP Platinum', checkIn: 'Today, 07:45 AM', status: 'Active', trainer: 'Marcus Vance' },
    { id: 2, name: 'David Chen', plan: 'Gold Monthly', checkIn: 'Today, 06:30 AM', status: 'Active', trainer: 'Self Trained' },
    { id: 3, name: 'Elena Rostova', plan: 'Silver Annual', checkIn: 'Yesterday', status: 'Active', trainer: 'Marcus Vance' },
    { id: 4, name: 'Alex Rivera', plan: 'VIP Platinum', checkIn: 'Today, 09:15 AM', status: 'Active', trainer: 'Marcus Vance' }
  ];

  const classes = [
    { id: 1, title: 'HIIT Cardio Burn', time: '08:00 AM - 09:00 AM', trainer: 'Coach Sarah', enrolled: 14, max: 20 },
    { id: 2, title: 'Powerlifting & Form Class', time: '10:30 AM - 11:30 AM', trainer: 'Coach Marcus', enrolled: 8, max: 12 },
    { id: 3, title: 'Vinyasa Yoga & Mobility', time: '05:00 PM - 06:00 PM', trainer: 'Coach Elena', enrolled: 18, max: 20 }
  ];

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '4px' }}>Gym Management & Facility Operations Hub</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Member subscriptions, check-in tracking, trainer scheduling & group classes</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-primary" onClick={() => alert('Member Registration Form Launched')}>
            <UserPlus size={16} /> Register New Member
          </button>
        </div>
      </div>

      {/* Overview Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Active Members</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '4px' }}>1,420</div>
        </div>
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Today Check-Ins</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>184</div>
        </div>
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Group Classes Today</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>6 Sessions</div>
        </div>
      </div>

      {/* Main Grid: Members List & Group Class Schedule */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px' }}>
        
        {/* Members Directory */}
        <div className="glass-panel" style={{ padding: '22px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="var(--primary)" /> Member Roster & Subscriptions
            </h3>
            <span className="badge badge-cyan">4 Active Checked In</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {members.map(m => (
              <div key={m.id} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', padding: '14px 18px', borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{m.name}</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Plan: {m.plan} • Assigned Trainer: {m.trainer}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-emerald">{m.status}</span>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>Checked in: {m.checkIn}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Group Classes Schedule */}
        <div className="glass-panel" style={{ padding: '22px', borderRadius: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} color="var(--accent-emerald)" /> Today Group Classes
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {classes.map(c => (
              <div key={c.id} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', padding: '14px', borderRadius: '14px' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{c.title}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  <Clock size={12} style={{ marginRight: '4px' }} /> {c.time}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Trainer: {c.trainer}</span>
                  <span className="badge badge-cyan">{c.enrolled}/{c.max} Booked</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
