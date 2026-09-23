import React, { useState } from 'react';
import { 
  Dumbbell, Flame, Target, Scale, Zap, Activity, Brain, Camera,
  Calendar, Clock, Plus, CheckCircle2, Bot, Trophy, TrendingUp, Sparkles, Shield, ArrowUpRight
} from 'lucide-react';

export default function Dashboard({ setActiveTab, onStartAI }) {
  const fitnessMetrics = [
    {
      id: 'weight',
      title: 'Current Body Weight',
      value: '72.5',
      unit: 'kg',
      status: 'Target: 70.0 kg',
      statusType: 'cyan',
      change: '-1.2 kg this month',
      icon: Scale,
      color: '#06b6d4',
      bgGlow: 'rgba(6, 182, 212, 0.15)',
      sparkline: 'M0,25 Q30,22 60,18 T120,12'
    },
    {
      id: 'bmi',
      title: 'BMI Ratio',
      value: '23.4',
      unit: 'kg/m²',
      status: 'Optimal Range',
      statusType: 'emerald',
      change: 'Normal Category',
      icon: Target,
      color: '#10b981',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      sparkline: 'M0,15 Q30,15 60,16 T120,15'
    },
    {
      id: 'calories',
      title: 'Active Caloric Burn',
      value: '640',
      unit: 'kcal',
      status: '80% Daily Goal',
      statusType: 'amber',
      change: '+120 kcal vs yesterday',
      icon: Flame,
      color: '#f59e0b',
      bgGlow: 'rgba(245, 158, 11, 0.15)',
      sparkline: 'M0,25 Q30,10 60,20 T120,8'
    },
    {
      id: 'workout-streak',
      title: 'Workout Consistency',
      value: '5 Days',
      unit: '🔥',
      status: 'Personal Record',
      statusType: 'purple',
      change: 'Active Member Streak',
      icon: Dumbbell,
      color: '#8b5cf6',
      bgGlow: 'rgba(139, 92, 246, 0.15)',
      sparkline: 'M0,20 Q30,15 60,10 T120,5'
    }
  ];

  const aiActionCards = [
    {
      id: 'cv-pose',
      title: 'Computer Vision Posture & Rep Counter',
      subtitle: 'Real-time 60 FPS WebCam keypoint movement tracking',
      icon: Camera,
      tag: 'Vision AI',
      color: '#06b6d4',
      tab: 'cv-pose'
    },
    {
      id: 'ai-workout-diet',
      title: 'AI Workout & Nutrition Planner',
      subtitle: 'FastAPI ML model powered hypertrophy & macro generator',
      icon: Dumbbell,
      tag: 'FastAPI ML',
      color: '#10b981',
      tab: 'ai-workout-diet'
    },
    {
      id: 'health-risk-ml',
      title: 'Machine Learning Health Risk Classifier',
      subtitle: 'Preventative biometrics assessment & risk scoring',
      icon: Brain,
      tag: 'Scikit ML',
      color: '#a78bfa',
      tab: 'health-risk-ml'
    }
  ];

  const medicationReminders = [
    { id: 1, name: 'Omega 3 Fish Oil', dose: '1000mg - 1 Softgel', time: '08:00 AM', taken: true },
    { id: 2, name: 'Vitamin D3', dose: '2000 IU', time: '01:00 PM', taken: true },
    { id: 3, name: 'Magnesium Glycinate', dose: '400mg', time: '09:00 PM', taken: false },
  ];

  const todayGymSession = {
    title: 'Hypertrophy & Strength Split',
    focus: 'Chest & Triceps (Day 1)',
    duration: '45 mins',
    trainer: 'Coach Marcus Vance',
    exercises: [
      { name: 'Barbell Bench Press', sets: '4 Sets x 10 Reps', target: 'Chest Upper' },
      { name: 'Incline Dumbbell Flyes', sets: '3 Sets x 12 Reps', target: 'Pectoral Isolated' },
      { name: 'Tricep Cable Pushdowns', sets: '4 Sets x 12 Reps', target: 'Tricep Lateral' }
    ]
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
      
      {/* Executive Hero Welcome Banner */}
      <div className="glass-panel" style={{ 
        padding: '32px', 
        borderRadius: '26px', 
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(6, 182, 212, 0.18) 50%, rgba(139, 92, 246, 0.15) 100%)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(6, 182, 212, 0.35)',
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
            <span className="badge badge-cyan" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
              <Zap size={14} style={{ marginRight: '4px' }} /> HealthVerse AI Platform v2.4
            </span>
            <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
              <Activity size={14} style={{ marginRight: '4px' }} /> 98.4% Telemetry Precision
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800, marginBottom: '10px', letterSpacing: '-0.5px' }}>
            Welcome Back, <span className="gradient-text">Alex Rivera</span> 👋
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px' }}>
            Your fitness consistency index is <strong style={{ color: '#10b981' }}>Optimal (94/100)</strong>. Your Computer Vision form tracker and FastAPI ML diet split are active for today's workout.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.95rem' }} onClick={onStartAI}>
              <Sparkles size={18} /> Generate AI Workout & Diet Plan
            </button>
            <button className="btn-secondary" style={{ padding: '12px 24px', fontSize: '0.95rem' }} onClick={() => setActiveTab('cv-pose')}>
              <Camera size={18} color="var(--primary)" /> Launch CV WebCam Rep Counter
            </button>
          </div>
        </div>

        {/* Ambient Geometric Glow Graphic */}
        <div style={{
          position: 'absolute', right: '-40px', bottom: '-60px', opacity: 0.12, pointerEvents: 'none'
        }}>
          <Dumbbell size={340} color="#06b6d4" />
        </div>
      </div>

      {/* Metric Cards Row */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={20} color="var(--primary)" /> Real-Time Biometric & Fitness Analytics
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
          {fitnessMetrics.map(v => {
            const Icon = v.icon;
            return (
              <div key={v.id} className="glass-panel" style={{ padding: '22px', borderRadius: '20px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{
                      width: '46px', height: '46px', borderRadius: '14px',
                      background: v.bgGlow, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `1px solid ${v.color}40`
                    }}>
                      <Icon size={22} color={v.color} />
                    </div>
                    <span className={`badge badge-${v.statusType}`} style={{ fontSize: '0.75rem' }}>{v.status}</span>
                  </div>

                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>{v.title}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '6px 0' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#fff' }}>{v.value}</span>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 600 }}>{v.unit}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '10px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <TrendingUp size={14} /> {v.change}
                  </span>
                  
                  {/* Sparkline Graphic */}
                  <svg width="60" height="24" viewBox="0 0 120 30" fill="none">
                    <path d={v.sparkline} stroke={v.color} strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Intelligence Modules Launchpad */}
      <div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Brain size={20} color="var(--accent-cyan)" /> HealthVerse AI Suite Launchpad
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
          {aiActionCards.map(card => {
            const Icon = card.icon;
            return (
              <div 
                key={card.id} 
                className="glass-panel" 
                onClick={() => setActiveTab(card.tab)}
                style={{
                  padding: '22px', borderRadius: '20px', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  transition: 'all 0.25s ease',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{
                    width: '50px', height: '50px', borderRadius: '14px',
                    background: `${card.color}20`, border: `1px solid ${card.color}50`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <Icon size={24} color={card.color} />
                  </div>

                  <div>
                    <span className="badge badge-cyan" style={{ fontSize: '0.68rem', marginBottom: '4px' }}>{card.tag}</span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{card.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{card.subtitle}</p>
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px', color: 'var(--text-muted)' }}>
                  <ArrowUpRight size={18} color={card.color} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid Row: Today Gym Session & Daily Nutrition Routine */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '22px' }}>
        
        {/* Today Gym Session Card */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Dumbbell size={20} color="var(--primary)" /> Scheduled Gym Session
            </h3>
            <span className="badge badge-cyan" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>{todayGymSession.duration}</span>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '18px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{todayGymSession.title}</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Focus: {todayGymSession.focus} • {todayGymSession.trainer}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {todayGymSession.exercises.map((ex, idx) => (
                <div key={idx} style={{
                  background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.05)',
                  padding: '10px 14px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>{ex.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{ex.target}</div>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '8px' }}>
                    {ex.sets}
                  </span>
                </div>
              ))}
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.9rem' }}
              onClick={() => setActiveTab('cv-pose')}
            >
              <Trophy size={18} /> Launch WebCam Form & Rep Analysis
            </button>
          </div>
        </div>

        {/* Daily Supplement & Nutrition Routine */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={20} color="var(--accent-emerald)" /> Daily Supplement Schedule
            </h3>
            <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>2/3 Taken</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {medicationReminders.map(med => (
              <div key={med.id} style={{
                background: med.taken ? 'rgba(16, 185, 129, 0.06)' : 'rgba(255, 255, 255, 0.03)',
                border: med.taken ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid var(--border-color)',
                borderRadius: '14px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between'
              }}>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: med.taken ? 'var(--text-main)' : 'var(--text-muted)' }}>
                    {med.name}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>{med.dose} • {med.time}</p>
                </div>
                {med.taken ? (
                  <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700 }}>
                    <CheckCircle2 size={18} /> Verified
                  </span>
                ) : (
                  <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.78rem' }}>
                    Mark Taken
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
