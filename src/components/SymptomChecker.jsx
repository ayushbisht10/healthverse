import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, AlertTriangle, ShieldCheck, Stethoscope, RefreshCw } from 'lucide-react';

export default function SymptomChecker({ onBookWithDoctor }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello Alex! I'm Healthverse AI, your clinical symptom triage assistant. What health concerns or symptoms are you experiencing today?",
      time: 'Just now',
      suggestions: ['Sore throat & Mild Fever', 'Persistent Headaches', 'Chest Tightness', 'Joint Stiffness']
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend = inputMsg) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMsg('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = '';
      let recommendedSpecialist = 'General Practitioner';
      let urgencyLevel = 'Low to Moderate';

      if (textToSend.toLowerCase().includes('throat') || textToSend.toLowerCase().includes('fever')) {
        aiResponseText = "Based on your reported symptoms of sore throat and mild fever, these are common indicators of an upper respiratory infection or viral pharyngitis. Stay hydrated, rest, and consider warm saline gargles.";
        recommendedSpecialist = 'ENT Specialist / General Physician';
      } else if (textToSend.toLowerCase().includes('headache')) {
        aiResponseText = "Persistent headaches can stem from tension, hydration changes, or eye strain. If accompanied by sensitivity to light or nausea, it might be a migraine pattern.";
        recommendedSpecialist = 'Neurologist / Internal Medicine';
      } else if (textToSend.toLowerCase().includes('chest')) {
        aiResponseText = "⚠️ Chest tightness requires immediate evaluation. If accompanied by shortness of breath, dizziness, or pain radiating to the jaw/arm, seek emergency medical care immediately.";
        recommendedSpecialist = 'Cardiologist';
        urgencyLevel = 'High (Seek SOS Evaluation)';
      } else {
        aiResponseText = `I have logged your input: "${textToSend}". Based on standard medical triage guidelines, monitor your vitals over the next 24 hours.`;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResponseText,
        specialist: recommendedSpecialist,
        urgency: urgencyLevel,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="animate-fade" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>
      
      {/* Main Chat Interface */}
      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 160px)', minHeight: '580px' }}>
        
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          background: 'rgba(6, 182, 212, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Bot size={22} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                Healthverse AI Symptom Checker <Sparkles size={14} color="#22d3ee" />
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Powered by Clinical AI Decision Triage Engine</p>
            </div>
          </div>
          <button 
            className="btn-secondary" 
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            onClick={() => setMessages([messages[0]])}
          >
            <RefreshCw size={13} /> Reset Chat
          </button>
        </div>

        {/* Chat Messages */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              display: 'flex',
              flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
              gap: '12px',
              maxWidth: '85%',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: msg.sender === 'user' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(6, 182, 212, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                {msg.sender === 'user' ? <User size={18} color="#8b5cf6" /> : <Bot size={18} color="#06b6d4" />}
              </div>

              <div>
                <div style={{
                  background: msg.sender === 'user' ? 'var(--primary-gradient)' : 'rgba(255, 255, 255, 0.05)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                  color: '#fff',
                  padding: '14px 16px',
                  borderRadius: msg.sender === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                  fontSize: '0.92rem',
                  lineHeight: '1.5'
                }}>
                  {msg.text}

                  {/* Recommendations Callout */}
                  {msg.specialist && (
                    <div style={{
                      marginTop: '12px',
                      padding: '12px',
                      background: 'rgba(6, 182, 212, 0.1)',
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                      borderRadius: '10px'
                    }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#22d3ee', marginBottom: '4px' }}>
                        Recommended Next Step:
                      </div>
                      <div style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                        Consult with: <strong>{msg.specialist}</strong>
                      </div>
                      <button 
                        className="btn-primary" 
                        style={{ padding: '6px 12px', fontSize: '0.78rem', width: '100%', justifyContent: 'center' }}
                        onClick={() => onBookWithDoctor && onBookWithDoctor(msg.specialist)}
                      >
                        <Stethoscope size={14} /> Schedule Specialist Consultation
                      </button>
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
                        onClick={() => handleSend(s)}
                        style={{
                          background: 'rgba(6, 182, 212, 0.1)',
                          border: '1px solid rgba(6, 182, 212, 0.3)',
                          color: '#22d3ee',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
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
              <Bot size={18} color="#06b6d4" /> AI Triage Engine analyzing symptoms...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Describe your symptoms (e.g. fever, headache, stomach pain)..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
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
          <button className="btn-primary" onClick={() => handleSend()}>
            <Send size={18} /> Send
          </button>
        </div>
      </div>

      {/* Side Info & Medical Disclaimer */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '18px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={18} color="#10b981" /> Clinical Disclaimer
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Healthverse AI provides informative symptom guidance based on medical knowledge models. It does not replace a licensed medical practitioner's diagnosis.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: '18px', background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f43f5e', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={18} /> Severe Emergency?
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            If you experience severe chest pain, sudden numbness, difficulty breathing, or severe trauma call local emergency services immediately.
          </p>
        </div>
      </div>

    </div>
  );
}
