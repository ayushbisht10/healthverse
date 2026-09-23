import React, { useState } from 'react';
import { 
  User, Mail, Shield, Award, Calendar, Scale, Target, Dumbbell, 
  CheckCircle2, Edit3, LogOut, Lock, Activity, Save, RefreshCw 
} from 'lucide-react';

export default function UserProfile({ currentUser, onLogout, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name || 'Alex Rivera');
  const [email, setEmail] = useState(currentUser.email || 'alex.r@example.com');
  const [fitnessGoal, setFitnessGoal] = useState('Muscle Gain / Hypertrophy');
  const [weight, setWeight] = useState('72.5');
  const [height, setHeight] = useState('175');
  const [membershipPlan, setMembershipPlan] = useState('VIP Platinum Member');
  const [avatar, setAvatar] = useState(currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');
  const [savedMsg, setSavedMsg] = useState('');

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      onUpdateProfile({
        ...currentUser,
        avatar: imageUrl
      });
      setSavedMsg('Profile picture updated!');
      setTimeout(() => setSavedMsg(''), 3000);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateProfile({
      ...currentUser,
      name,
      email,
      avatar,
      goal: fitnessGoal,
      weight,
      height
    });
    setIsEditing(false);
    setSavedMsg('Profile updated successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Profile Header Banner */}
      <div className="glass-panel" style={{
        padding: '32px', borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(6, 182, 212, 0.18) 50%, rgba(139, 92, 246, 0.15) 100%)',
        border: '1px solid rgba(6, 182, 212, 0.35)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          
          {/* Avatar Upload Container */}
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <label htmlFor="avatar-upload" style={{ cursor: 'pointer' }}>
              <img 
                src={avatar} 
                alt={currentUser.name} 
                style={{ width: '88px', height: '88px', borderRadius: '22px', objectFit: 'cover', border: '2px solid #06b6d4', boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)' }}
              />
              <div style={{
                position: 'absolute', bottom: '-4px', right: '-4px', width: '28px', height: '28px',
                borderRadius: '50%', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 10px rgba(6, 182, 212, 0.6)', border: '2px solid #0f172a'
              }} title="Upload new profile picture">
                <Edit3 size={14} color="#fff" />
              </div>
            </label>
            <input 
              id="avatar-upload" 
              type="file" 
              accept="image/*" 
              onChange={handleAvatarChange} 
              style={{ display: 'none' }} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{currentUser.name}</h2>
              {currentUser.role === 'admin' && (
                <span className="badge badge-amber">Master Admin</span>
              )}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>{currentUser.email} • ID: {currentUser.id}</p>
            <div style={{ display: 'flex', gap: '14px', fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '8px' }}>
              <span>Joined: Jan 2026</span>
              <span>• Status: Active Member</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className="btn-secondary" 
            onClick={() => setIsEditing(!isEditing)}
            style={{ padding: '10px 18px', fontSize: '0.88rem' }}
          >
            <Edit3 size={16} /> {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>

          <button 
            onClick={onLogout}
            style={{
              background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)',
              color: '#f43f5e', padding: '10px 18px', borderRadius: '12px', fontWeight: 600,
              fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <LogOut size={16} /> Sign Out / Logout
          </button>
        </div>
      </div>

      {savedMsg && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', padding: '12px 18px', borderRadius: '14px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} /> {savedMsg}
        </div>
      )}

      {/* Main Grid: Details Form & Fitness Accomplishments */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '22px' }}>
        
        {/* User Account Settings Form */}
        <div className="glass-panel" style={{ padding: '28px', borderRadius: '22px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={20} color="var(--primary)" /> Account & Biometrics Settings
          </h3>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Full Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '11px', borderRadius: '10px', outline: 'none',
                    opacity: isEditing ? 1 : 0.7
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Email Address</label>
                <input
                  type="email"
                  disabled={!isEditing}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '11px', borderRadius: '10px', outline: 'none',
                    opacity: isEditing ? 1 : 0.7
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Body Weight (kg)</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '11px', borderRadius: '10px', outline: 'none', opacity: isEditing ? 1 : 0.7 }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Height (cm)</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '11px', borderRadius: '10px', outline: 'none', opacity: isEditing ? 1 : 0.7 }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Fitness Goal</label>
                <select
                  disabled={!isEditing}
                  value={fitnessGoal}
                  onChange={(e) => setFitnessGoal(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '11px', borderRadius: '10px', outline: 'none', opacity: isEditing ? 1 : 0.7 }}
                >
                  <option value="Muscle Gain / Hypertrophy">Muscle Gain</option>
                  <option value="Weight Loss & Fat Burn">Weight Loss</option>
                  <option value="Endurance & Athleticism">Endurance</option>
                  <option value="General Maintenance">Maintenance</option>
                </select>
              </div>
            </div>

            {isEditing && (
              <button className="btn-primary" type="submit" style={{ padding: '12px', justifyContent: 'center', marginTop: '10px' }}>
                <Save size={16} /> Save Profile Changes
              </button>
            )}
          </form>
        </div>

        {/* Member Accomplishments & Membership Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          <div className="glass-panel" style={{ padding: '22px', borderRadius: '22px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} color="var(--accent-cyan)" /> Member Stats & Badges
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Workout Streak</span>
                <span className="badge badge-emerald">5 Days 🔥</span>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>CV Keypoint Form Accuracy</span>
                <strong style={{ color: '#22d3ee' }}>96% Avg</strong>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>FastAPI ML Diet Plans</span>
                <strong style={{ color: '#a78bfa' }}>12 Generated</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
