import React, { useState } from 'react';
import { Mail, Lock, User, Shield, ArrowRight, CheckCircle2, AlertCircle, Sparkles, Building2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [role, setRole] = useState('user'); // 'user' | 'admin'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    if (mode === 'register' && !fullName) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    // Successful login object
    const userData = {
      name: mode === 'register' ? fullName : (role === 'admin' ? 'Admin Master' : 'Alex Rivera'),
      email: email,
      role: role, // 'user' | 'admin'
      id: role === 'admin' ? '#ADM-9001' : '#HV-994021',
      avatar: role === 'admin' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    };

    onLoginSuccess(userData);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px'
    }}>
      <div className="glass-panel animate-fade" style={{
        width: '100%', maxWidth: '440px', padding: '32px', borderRadius: '24px', background: '#0f172a', border: '1px solid rgba(6, 182, 212, 0.3)'
      }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {mode === 'login' ? 'Access your HealthVerse dashboard & fitness suite' : 'Join HealthVerse AI Fitness & Healthcare Platform'}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.3rem' }}>✕</button>
        </div>

        {/* Role Switcher Pill */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px',
          background: 'rgba(255, 255, 255, 0.05)', padding: '4px', borderRadius: '12px', marginBottom: '20px'
        }}>
          <button
            type="button"
            onClick={() => setRole('user')}
            style={{
              background: role === 'user' ? 'var(--primary-gradient)' : 'transparent',
              color: role === 'user' ? '#fff' : 'var(--text-muted)',
              border: 'none', padding: '8px', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
            }}
          >
            <User size={15} /> Member Login
          </button>

          <button
            type="button"
            onClick={() => setRole('admin')}
            style={{
              background: role === 'admin' ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' : 'transparent',
              color: role === 'admin' ? '#fff' : 'var(--text-muted)',
              border: 'none', padding: '8px', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
            }}
          >
            <Shield size={15} /> Admin Portal
          </button>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#f43f5e', padding: '10px 14px', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <AlertCircle size={16} /> {errorMsg}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {mode === 'register' && (
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Alex Rivera"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '10px 10px 10px 38px', borderRadius: '10px', outline: 'none' }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                placeholder={role === 'admin' ? 'admin@healthverse.com' : 'alex@example.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '10px 10px 10px 38px', borderRadius: '10px', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '10px 10px 10px 38px', borderRadius: '10px', outline: 'none' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: '100%', justifyContent: 'center', padding: '12px', marginTop: '8px',
              background: role === 'admin' ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' : 'var(--primary-gradient)'
            }}
          >
            {mode === 'login' ? `Sign In as ${role === 'admin' ? 'Admin' : 'Member'}` : 'Register Account'} <ArrowRight size={16} />
          </button>
        </form>

        {/* Toggle Mode Footer */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          {mode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button onClick={() => setMode('register')} style={{ background: 'none', border: 'none', color: '#22d3ee', fontWeight: 600, cursor: 'pointer' }}>
                Register Now
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button onClick={() => setMode('login')} style={{ background: 'none', border: 'none', color: '#22d3ee', fontWeight: 600, cursor: 'pointer' }}>
                Sign In
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
