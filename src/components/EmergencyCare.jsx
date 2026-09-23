import React, { useState } from 'react';
import { 
  Bot, Send, User, Sparkles, AlertTriangle, ShieldCheck, Pill, Dumbbell, 
  Activity, Zap, CheckCircle2, Clock, HeartHandshake, RefreshCw, Flame
} from 'lucide-react';

export default function EmergencyCare() {
  // Prescription & Recovery Meds Vault
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      title: 'Post-Workout Muscle Recovery Rx',
      doctor: 'Dr. Sarah Jenkins (Sports Physio)',
      date: 'Aug 24, 2026',
      medicines: [
        { name: 'Magnesium Glycinate 400mg', dose: '1 Capsule Night', timing: 'Reduces muscle cramps & DOMS', status: 'Active' },
        { name: 'BCAA + Electrolyte Hydration', dose: '1 Scoop in 500ml Water', timing: 'Intra/Post Workout', status: 'Active' }
      ]
    },
    {
      id: 2,
      title: 'Joint Protection & Anti-Inflammatory Care',
      doctor: 'Dr. David Chen (Sports Medicine)',
      date: 'Jul 15, 2026',
      medicines: [
        { name: 'Omega 3 Fish Oil 1000mg', dose: '1 Softgel Daily', timing: 'After lunch with meals', status: 'Active' },
        { name: 'Glucosamine & Chondroitin 500mg', dose: '1 Tablet Daily', timing: 'Morning for cartilage support', status: 'Active' }
      ]
    }
  ]);

  // Gym Injury & Fatigue AI Emergency Chat State
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello Alex! I am your Gym Emergency & Sports Injury AI Coach. Tell me what happened during your workout (e.g. heavy lift muscle strain, DOMS soreness, shoulder impingement, dizziness, or joint pain) and I will provide immediate SOS emergency response protocols, R.I.C.E. guidance, and recovery care.",
      time: 'Just now',
      suggestions: [
        'Extreme Muscle Fatigue & Cramps',
        'Lower Back Pain after Deadlifts',
        'Shoulder Joint Pinch during Bench Press',
        'Workout Dizziness & Overtraining'
      ]
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (textToSend = inputMsg) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputMsg('');
    setIsTyping(true);

    setTimeout(() => {
      let responseText = '';
      let actionSteps = [];
      let warningAlert = '';

      const query = textToSend.toLowerCase();

      if (query.includes('fatigue') || query.includes('cramp') || query.includes('exhaust')) {
        responseText = "⚡ Gym Emergency Protocol: Acute Muscle Fatigue & Heat Cramps Response:";
        actionSteps = [
          'Immediate Cessation: Stop your workout set right away. Do not force another rep.',
          'Electrolyte Rehydration: Drink 500-750ml of cold sodium & potassium electrolyte water.',
          'Active Muscle Stretch: Gently hold the cramped muscle in a stretched position for 20-30 seconds.',
          'Post-Workout Recovery: Take Magnesium Glycinate and cold-water soak affected muscles.'
        ];
      } else if (query.includes('back') || query.includes('deadlift') || query.includes('spine')) {
        responseText = "⚠️ Emergency SOS: Lower Back Strain / Lumbar Compression Triage:";
        actionSteps = [
          'Decompress Spine: Lay flat on your back on a firm mat with knees bent at 90° on a bench (Decompress position).',
          'Ice Therapy: Apply cold ice pack for 15 minutes to reduce acute spinal inflammation.',
          'Avoid Bending: Do NOT bend forward or perform toe touches immediately after strain.',
          'Recovery Care: Apply anti-inflammatory gel and avoid heavy spinal loading for 72 hours.'
        ];
        warningAlert = "If lower back pain radiates down your leg with numbness or tingling, seek immediate orthopedic evaluation.";
      } else if (query.includes('shoulder') || query.includes('bench') || query.includes('rotator') || query.includes('joint')) {
        responseText = "🏋️ Gym Emergency: Shoulder Impingement & Rotator Cuff Pain SOS:";
        actionSteps = [
          'Stop Overhead / Pressing Movements: Immediately abort Bench Press or Shoulder Press.',
          'R.I.C.E. Protocol: Rest shoulder in a neutral relaxed position, apply ice pack wrapped in cloth for 15 mins.',
          'Pendulum Swings: Gently lean forward and let arm dangle in small relaxed circles to reduce joint friction.',
          'Form Correction: Re-evaluate grip width and shoulder retraction once recovered.'
        ];
      } else if (query.includes('dizz') || query.includes('faint') || query.includes('lighthead') || query.includes('nausea')) {
        responseText = "🚨 Emergency Alert: Workout Dizziness / Valsalva Overtraining Response:";
        actionSteps = [
          'Sit Down Immediately: Sit on a flat bench or lie back with legs elevated above heart level.',
          'Unbutton Tight Gym Gear: Loosen belt, wrist wraps, or tight shirts for airflow.',
          'Breathe Deeply: Take slow abdominal breaths (in through nose for 4s, out through mouth for 6s).',
          'Fast-Acting Carbs: Consume a banana or glucose drink to restore blood sugar levels.'
        ];
        warningAlert = "Do NOT attempt to stand up quickly or drive until dizziness completely subsides.";
      } else if (query.includes('sprain') || query.includes('tear') || query.includes('pulled muscle')) {
        responseText = "🩹 Emergency Sports Injury: Acute Muscle Strain & Pulled Fiber Care:";
        actionSteps = [
          'Protection & Rest: Immobilize the muscle. Avoid putting weight on the torn area.',
          'Cold Compression: Wrap elastic bandage lightly over ice pack to limit internal hemorrhaging.',
          'Elevation: Raise the injured limb above heart level for the first 24-48 hours.',
          'No Heat: Avoid hot baths or heat rubs for the first 48 hours to prevent increased swelling.'
        ];
      } else {
        responseText = `Processed Gym Query: "${textToSend}". Here is the Athletic First-Aid SOS Safety Guide:`;
        actionSteps = [
          'Stop current exercise immediately if experiencing sharp, sudden pain.',
          'Apply cold ice compression to affected area for 15-20 minutes.',
          'Hydrate with electrolytes and refrain from heavy lifting for 48 hours.',
          'Consult a physical therapist if pain persists past 72 hours.'
        ];
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: responseText,
        steps: actionSteps,
        warning: warningAlert,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '24px', borderRadius: '22px',
        background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.18) 0%, rgba(15, 23, 42, 0.95) 100%)',
        border: '1px solid rgba(244, 63, 94, 0.35)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <div className="badge badge-rose" style={{ marginBottom: '8px' }}>
            <Dumbbell size={13} style={{ marginRight: '4px' }} /> Gym SOS & Workout Injury AI Assistant
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Gym Injury Emergency, Fatigue & Recovery AI</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Get instant athletic first-aid, R.I.C.E. protocols & post-workout muscle recovery guidance</p>
        </div>
      </div>

      {/* Main Grid: Gym Emergency AI Chat & Recovery Prescriptions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px' }}>
        
        {/* Left Column: AI Gym Emergency Assistant Chat */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '620px', borderRadius: '22px', overflow: 'hidden' }}>
          
          {/* Chat Header */}
          <div style={{
            padding: '16px 20px', borderBottom: '1px solid var(--border-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(244, 63, 94, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #f43f5e 0%, #06b6d4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Bot size={22} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Gym Emergency & Injury AI Coach <Sparkles size={14} color="#f43f5e" />
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fatigue, sprains, cramps & athletic first-aid advisor</p>
              </div>
            </div>
            <button 
              className="btn-secondary" 
              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
              onClick={() => setChatMessages([chatMessages[0]])}
            >
              <RefreshCw size={13} /> Reset Chat
            </button>
          </div>

          {/* Chat Stream */}
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {chatMessages.map(msg => (
              <div key={msg.id} style={{
                display: 'flex',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                gap: '12px',
                maxWidth: '88%',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: msg.sender === 'user' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  {msg.sender === 'user' ? <User size={18} color="#8b5cf6" /> : <Dumbbell size={18} color="#f43f5e" />}
                </div>

                <div>
                  <div style={{
                    background: msg.sender === 'user' ? 'var(--primary-gradient)' : 'rgba(255, 255, 255, 0.04)',
                    border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                    color: '#fff',
                    padding: '14px 16px',
                    borderRadius: msg.sender === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                  }}>
                    {msg.text}

                    {/* Action Steps */}
                    {msg.steps && msg.steps.length > 0 && (
                      <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {msg.steps.map((step, sIdx) => (
                          <div key={sIdx} style={{ fontSize: '0.83rem', color: '#22d3ee', background: 'rgba(6, 182, 212, 0.1)', padding: '8px 12px', borderRadius: '8px', borderLeft: '3px solid #06b6d4' }}>
                            • {step}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Warning Callout */}
                    {msg.warning && (
                      <div style={{ marginTop: '10px', padding: '10px 12px', background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: '8px', fontSize: '0.8rem', color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <AlertTriangle size={15} /> {msg.warning}
                      </div>
                    )}
                  </div>

                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px', display: 'block', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                    {msg.time}
                  </span>

                  {/* Quick Suggestion Pills */}
                  {msg.suggestions && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                      {msg.suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(s)}
                          style={{
                            background: 'rgba(244, 63, 94, 0.1)',
                            border: '1px solid rgba(244, 63, 94, 0.3)',
                            color: '#f43f5e',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '0.78rem',
                            cursor: 'pointer'
                          }}
                        >
                          + {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <Dumbbell size={18} color="#f43f5e" className="animate-spin" /> Gym AI Coach analyzing workout injury & generating recovery SOS...
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div style={{ padding: '14px 16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Describe gym fatigue, muscle pain, back strain, or joint injury..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              style={{
                flex: 1,
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '12px 16px',
                color: '#fff',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            />
            <button className="btn-primary" onClick={() => handleSendMessage()}>
              <Send size={18} /> Send
            </button>
          </div>
        </div>

        {/* Right Column: Active Recovery Prescriptions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div className="glass-panel" style={{ padding: '22px', borderRadius: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Pill size={18} color="var(--primary)" /> Recovery & Injury Prescriptions
              </h3>
              <span className="badge badge-emerald">Active Care</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {prescriptions.map(rx => (
                <div key={rx.id} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', padding: '16px', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--accent-cyan)' }}>{rx.title}</div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{rx.date}</span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{rx.doctor}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {rx.medicines.map((med, mIdx) => (
                      <div key={mIdx} style={{ background: 'rgba(0,0,0,0.25)', padding: '10px 12px', borderRadius: '10px' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{med.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                          Dose: {med.dose} • {med.timing}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Athletic Safety Box */}
          <div className="glass-panel" style={{ padding: '18px', borderRadius: '18px', background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.25)' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f43f5e', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} /> Athletic Recovery Principles
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              For severe muscle tears, spinal compression, or persistent joint swelling lasting over 72 hours, consult a licensed physical therapist or sports medicine physician immediately.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
