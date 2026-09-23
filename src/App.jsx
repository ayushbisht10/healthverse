import React, { useState, useEffect } from 'react';
import { 
  Heart, LayoutDashboard, Dumbbell, Brain, Camera, Building2, Calendar, 
  Activity, FileText, AlertOctagon, Bot, Sun, Moon, Bell, Shield, LogIn, LogOut, User, CheckCircle
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import AIWorkoutDiet from './components/AIWorkoutDiet';
import HealthRiskPrediction from './components/HealthRiskPrediction';
import ComputerVisionPose from './components/ComputerVisionPose';
import GymManagement from './components/GymManagement';
import Appointments from './components/Appointments';
import VitalsTracker from './components/VitalsTracker';
import MedicalRecords from './components/MedicalRecords';
import EmergencyCare from './components/EmergencyCare';
import AdminPortal from './components/AdminPortal';
import AuthModal from './components/AuthModal';
import UserProfile from './components/UserProfile';
import { SupabaseDataEngine } from './lib/supabase';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('dark');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // User state
  const [currentUser, setCurrentUser] = useState({
    name: 'Alex Rivera',
    email: 'alex.r@example.com',
    role: 'user', // 'user' | 'admin'
    id: '#HV-994021',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  });

  useEffect(() => {
    // Initial Supabase background sync
    SupabaseDataEngine.syncProfile(currentUser);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile & Account', icon: User },
    { id: 'cv-pose', label: 'CV Rep & Posture AI', icon: Camera, badge: 'Vision' },
    { id: 'ai-workout-diet', label: 'AI Workout & Diet', icon: Dumbbell, badge: 'AI ML' },
    { id: 'health-risk-ml', label: 'Health Risk ML', icon: Brain, badge: 'ML' },
    { id: 'gym-mgmt', label: 'Gym Management', icon: Building2 },
    { id: 'vitals', label: 'Biometrics Vault', icon: Activity },
    { id: 'records', label: 'Medical Records', icon: FileText },
    { id: 'emergency', label: 'Emergency SOS', icon: AlertOctagon, danger: true }
  ];

  if (currentUser.role === 'admin') {
    navItems.splice(1, 0, { id: 'admin-portal', label: 'Admin Portal', icon: Shield, badge: 'Admin' });
  }

  const notifications = [
    { id: 1, title: 'AI Workout Plan Ready', desc: 'Hypertrophy ML Split updated for your goals', time: '5m ago' },
    { id: 2, title: 'CV Posture Analysis', desc: 'Average Squat Depth Accuracy: 94%', time: '1h ago' },
    { id: 3, title: 'Gym Session Reminders', desc: 'Chest & Triceps Day 1 at 5:00 PM', time: '10m ago' }
  ];

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setActiveTab('admin-portal');
    } else {
      setActiveTab('dashboard');
    }
  };

  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: '#040711',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'center',
        zIndex: 9999
      }}>
        <div className="animate-fade" style={{ textAlign: 'center', maxWidth: '420px', padding: '20px' }}>
          <img 
            src="/healthverse_logo_nobg.png" 
            alt="HealthVerse Logo" 
            style={{
              width: '280px',
              maxWidth: '90vw',
              height: 'auto',
              marginBottom: '24px'
            }}
          />
          
          <div style={{
            width: '200px',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            margin: '0 auto 16px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, #10b981, #06b6d4, #6366f1)',
              animation: 'pulseGlow 1.5s infinite ease-in-out'
            }}></div>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
            Initializing AI Triage & Vision Suite...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      
      {/* Left Sidebar Navigation */}
      <aside style={{
        width: '270px',
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--backdrop-blur)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        padding: '24px 16px',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 100
      }}>
        <div>
          {/* Brand Logo */}
          <div style={{
            display: 'flex',
            justify: 'center',
            alignItems: 'center',
            padding: '0 4px 18px 4px',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '16px'
          }}>
            <img 
              src="/healthverse_logo_nobg.png" 
              alt="HealthVerse Official Logo" 
              style={{
                width: '100%',
                maxHeight: '105px',
                objectFit: 'contain'
              }}
            />
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isActive ? (item.danger ? 'rgba(244, 63, 94, 0.2)' : 'rgba(6, 182, 212, 0.15)') : 'transparent',
                    color: isActive ? (item.danger ? '#f43f5e' : '#22d3ee') : 'var(--text-muted)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={17} color={isActive ? (item.danger ? '#f43f5e' : '#06b6d4') : 'var(--text-muted)'} />
                    {item.label}
                  </div>
                  {item.badge && (
                    <span className={`badge ${item.badge === 'Admin' ? 'badge-amber' : (item.badge === 'Vision' ? 'badge-cyan' : 'badge-emerald')}`} style={{ fontSize: '0.62rem', padding: '2px 6px' }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Info */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
          <div 
            onClick={() => setActiveTab('profile')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px', cursor: 'pointer', borderRadius: '10px', transition: 'all 0.2s ease' }}
            title="Click to view full profile"
          >
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              style={{ width: '38px', height: '38px', borderRadius: '12px', objectFit: 'cover' }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{currentUser.role === 'admin' ? 'Role: Admin Master' : currentUser.id}</div>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px' }}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '270px', display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Header */}
        <header style={{
          height: '70px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          padding: '0 32px',
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--backdrop-blur)',
          position: 'sticky',
          top: 0,
          zIndex: 90
        }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {navItems.find(i => i.id === activeTab)?.label}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }}>
            
            {/* Login / Auth Trigger Button */}
            <button
              onClick={() => setShowAuthModal(true)}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            >
              <LogIn size={15} color="var(--primary)" />
              {currentUser ? `Switch User (${currentUser.name})` : 'Login / Register'}
            </button>

            {/* Notification Bell */}
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-color)',
                width: '38px', height: '38px', borderRadius: '10px',
                color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', position: 'relative'
              }}
            >
              <Bell size={18} />
              <span style={{
                position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px',
                borderRadius: '50%', background: '#06b6d4'
              }}></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="glass-panel animate-fade" style={{
                position: 'absolute', top: '50px', right: 0, width: '320px',
                padding: '16px', borderRadius: '16px', background: '#0f172a', zIndex: 200
              }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>Notifications</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {notifications.map(n => (
                    <div key={n.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '10px', fontSize: '0.8rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>{n.title}</div>
                      <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>{n.desc}</div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main View Render */}
        <main style={{ padding: '32px', flex: 1 }}>
          {activeTab === 'dashboard' && (
            <Dashboard 
              setActiveTab={setActiveTab}
              onBookAppointment={() => setActiveTab('appointments')}
              onStartAI={() => setActiveTab('ai-workout-diet')}
            />
          )}

          {activeTab === 'profile' && (
            <UserProfile 
              currentUser={currentUser}
              onLogout={() => {
                setShowAuthModal(true);
              }}
              onUpdateProfile={(updatedUser) => {
                setCurrentUser(updatedUser);
              }}
            />
          )}
          {activeTab === 'admin-portal' && <AdminPortal />}
          {activeTab === 'cv-pose' && <ComputerVisionPose />}
          {activeTab === 'ai-workout-diet' && <AIWorkoutDiet />}
          {activeTab === 'health-risk-ml' && <HealthRiskPrediction />}
          {activeTab === 'gym-mgmt' && <GymManagement />}
          {activeTab === 'vitals' && <VitalsTracker />}
          {activeTab === 'records' && <MedicalRecords />}
          {activeTab === 'emergency' && <EmergencyCare />}
        </main>
      </div>

      {/* Login & Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
