import React, { useState } from 'react';
import { Video, Mic, MicOff, VideoOff, MessageSquare, PhoneOff, Share2, Shield, Settings, Send, User } from 'lucide-react';

export default function Telehealth() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Dr. Sarah Jenkins', text: "Hello Alex! I'm reviewing your latest ECG & Heart Rate trends.", time: '3:30 PM' },
    { sender: 'You', text: 'Hi Doctor! Glad to connect. I had a slight spike in BPM yesterday evening.', time: '3:31 PM' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, {
      sender: 'You',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setChatInput('');
  };

  return (
    <div className="animate-fade" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', height: 'calc(100vh - 160px)', minHeight: '600px' }}>
      
      {/* Video Call Window */}
      <div className="glass-panel" style={{
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        background: '#040711',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between'
      }}>
        
        {/* Top Overlay Badge */}
        <div style={{
          position: 'absolute', top: '20px', left: '20px', right: '20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 10px #10b981' }}></span>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>Dr. Sarah Jenkins</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Cardiology Telehealth Consultation • 00:14:32</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.78rem', color: '#10b981' }}>
            <Shield size={14} /> End-to-End Encrypted
          </div>
        </div>

        {/* Doctor Video Stream (Main Feed) */}
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          <img 
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80" 
            alt="Doctor Video Feed" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Patient PIP Video Feed */}
        <div style={{
          position: 'absolute', bottom: '90px', right: '20px',
          width: '160px', height: '110px', borderRadius: '16px',
          overflow: 'hidden', border: '2px solid rgba(6, 182, 212, 0.5)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)', zIndex: 10, background: '#1e293b'
        }}>
          {isVideoOn ? (
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" 
              alt="Patient Feed" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <User size={30} />
            </div>
          )}
        </div>

        {/* Bottom Call Control Dock */}
        <div style={{
          position: 'relative', zIndex: 10, padding: '20px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
          display: 'flex', justifyContent: 'center', gap: '16px'
        }}>
          <button 
            onClick={() => setIsMicOn(!isMicOn)}
            style={{
              width: '50px', height: '50px', borderRadius: '50%',
              background: isMicOn ? 'rgba(255,255,255,0.15)' : '#f43f5e',
              border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', backdropFilter: 'blur(10px)'
            }}
          >
            {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
          </button>

          <button 
            onClick={() => setIsVideoOn(!isVideoOn)}
            style={{
              width: '50px', height: '50px', borderRadius: '50%',
              background: isVideoOn ? 'rgba(255,255,255,0.15)' : '#f43f5e',
              border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', backdropFilter: 'blur(10px)'
            }}
          >
            {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>

          <button style={{
            width: '50px', height: '50px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)'
          }}>
            <Share2 size={20} />
          </button>

          <button style={{
            width: '60px', height: '50px', borderRadius: '25px',
            background: '#f43f5e', border: 'none', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }}>
            <PhoneOff size={22} />
          </button>
        </div>

      </div>

      {/* Side Chat Sidebar */}
      <div className="glass-panel" style={{ borderRadius: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={18} color="var(--primary)" /> Consultation Live Chat
        </div>

        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {chatMessages.map((m, idx) => (
            <div key={idx} style={{
              background: m.sender === 'You' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-color)',
              padding: '10px 12px',
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: m.sender === 'You' ? '#22d3ee' : '#10b981' }}>{m.sender}</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>{m.time}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.4' }}>{m.text}</p>
            </div>
          ))}
        </div>

        <div style={{ padding: '14px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Type message to doctor..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
            style={{
              flex: 1,
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '10px 12px',
              color: '#fff',
              outline: 'none',
              fontSize: '0.85rem'
            }}
          />
          <button className="btn-primary" style={{ padding: '10px 14px' }} onClick={handleSendChat}>
            <Send size={15} />
          </button>
        </div>
      </div>

    </div>
  );
}
