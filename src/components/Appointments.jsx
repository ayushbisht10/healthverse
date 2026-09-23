import React, { useState } from 'react';
import { Calendar, Clock, Star, Video, MapPin, Search, Filter, CheckCircle2, ChevronRight, UserCheck } from 'lucide-react';

export default function Appointments({ onStartTelehealth }) {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('2026-09-06');
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const specialties = ['All', 'Cardiology', 'Neurology', 'Dermatology', 'General Medicine', 'Pediatrics', 'ENT Specialist'];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Jenkins',
      specialty: 'Cardiology',
      hospital: 'Metro Health Heart Center',
      rating: 4.9,
      reviews: 128,
      experience: '12 Yrs Exp.',
      fee: '$85',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
      availableToday: true,
      slots: ['09:00 AM', '10:30 AM', '02:15 PM', '04:00 PM']
    },
    {
      id: 2,
      name: 'Dr. Marcus Vance',
      specialty: 'Neurology',
      hospital: 'St. Jude Brain & Nerve Institute',
      rating: 4.8,
      reviews: 94,
      experience: '15 Yrs Exp.',
      fee: '$110',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
      availableToday: false,
      slots: ['11:00 AM', '01:30 PM', '03:45 PM']
    },
    {
      id: 3,
      name: 'Dr. Elena Rostova',
      specialty: 'Dermatology',
      hospital: 'Aura Skin & Cosmetic Clinic',
      rating: 4.95,
      reviews: 210,
      experience: '9 Yrs Exp.',
      fee: '$75',
      avatar: 'https://images.unsplash.com/photo-1594824813566-78a93272d3d0?auto=format&fit=crop&w=300&q=80',
      availableToday: true,
      slots: ['08:30 AM', '11:45 AM', '05:00 PM']
    },
    {
      id: 4,
      name: 'Dr. David Chen',
      specialty: 'General Medicine',
      hospital: 'Healthverse Integrated Wellness Center',
      rating: 4.7,
      reviews: 165,
      experience: '8 Yrs Exp.',
      fee: '$60',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80',
      availableToday: true,
      slots: ['09:30 AM', '01:00 PM', '03:30 PM']
    }
  ];

  const filteredDoctors = doctors.filter(doc => {
    const matchesSpec = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    const matchesQuery = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpec && matchesQuery;
  });

  const handleConfirmBooking = () => {
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedDoctor(null);
    }, 2500);
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Search & Filter Header */}
      <div className="glass-panel" style={{ padding: '20px', borderRadius: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search doctors, specialties, or clinics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '10px 14px 10px 42px',
                color: '#fff',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {specialties.map(spec => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                style={{
                  background: selectedSpecialty === spec ? 'var(--primary-gradient)' : 'rgba(255, 255, 255, 0.04)',
                  border: selectedSpecialty === spec ? 'none' : '1px solid var(--border-color)',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredDoctors.map(doc => (
          <div key={doc.id} className="glass-panel" style={{ padding: '22px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
                <img src={doc.avatar} alt={doc.name} style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{doc.name}</h3>
                    <UserCheck size={16} color="#06b6d4" />
                  </div>
                  <p style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600 }}>{doc.specialty}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <MapPin size={12} /> {doc.hospital}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '12px', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Rating</span>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={14} color="#f59e0b" fill="#f59e0b" /> {doc.rating} ({doc.reviews})
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Experience</span>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{doc.experience}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Consult Fee</span>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10b981' }}>{doc.fee}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="btn-primary" 
                style={{ flex: 1, justifyContent: 'center', padding: '10px' }}
                onClick={() => setSelectedDoctor(doc)}
              >
                <Calendar size={16} /> Book Appointment
              </button>
              <button 
                className="btn-secondary" 
                style={{ padding: '10px' }}
                title="Instant Video Consult"
                onClick={onStartTelehealth}
              >
                <Video size={16} color="var(--primary)" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedDoctor && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div className="glass-panel animate-fade" style={{ width: '100%', maxWidth: '480px', padding: '28px', borderRadius: '24px', background: '#0f172a' }}>
            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={60} color="#10b981" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px' }}>Appointment Confirmed!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Your telehealth consultation with <strong>{selectedDoctor.name}</strong> is scheduled for <strong>{selectedDate} at {selectedSlot}</strong>.
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Schedule Consultation</h3>
                  <button onClick={() => setSelectedDoctor(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
                </div>

                <div style={{ display: 'flex', gap: '14px', marginBottom: '20px', alignItems: 'center' }}>
                  <img src={selectedDoctor.avatar} alt={selectedDoctor.name} style={{ width: '50px', height: '50px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontWeight: 700 }}>{selectedDoctor.name}</h4>
                    <p style={{ color: 'var(--accent-cyan)', fontSize: '0.82rem' }}>{selectedDoctor.specialty} • {selectedDoctor.fee}</p>
                  </div>
                </div>

                {/* Date Picker */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Select Date</label>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Time Slots */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Available Time Slots</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    {selectedDoctor.slots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        style={{
                          background: selectedSlot === slot ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                          border: selectedSlot === slot ? 'none' : '1px solid var(--border-color)',
                          color: '#fff',
                          padding: '10px',
                          borderRadius: '10px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        <Clock size={13} style={{ marginRight: '6px' }} /> {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }} onClick={handleConfirmBooking}>
                  Confirm Consultation ({selectedDoctor.fee})
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
