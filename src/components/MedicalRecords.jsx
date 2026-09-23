import React, { useState } from 'react';
import { FileText, Download, Eye, Pill, Shield, Search, Lock, Share2 } from 'lucide-react';

export default function MedicalRecords() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewRecord, setViewRecord] = useState(null);

  const categories = ['All', 'Lab Reports', 'Prescriptions', 'Vaccine Certificates', 'Radiology Scans'];

  const records = [
    {
      id: 1,
      title: 'Comprehensive Lipid & Cardiac Panel',
      category: 'Lab Reports',
      doctor: 'Dr. Sarah Jenkins',
      date: 'Sep 02, 2026',
      size: '2.4 MB',
      type: 'PDF Document',
      details: 'Cholesterol: 175 mg/dL (Desirable), HDL: 58 mg/dL, LDL: 98 mg/dL, Triglycerides: 110 mg/dL. Overall cardiac risk score: Low.'
    },
    {
      id: 2,
      title: 'E-Prescription - Antihistamine & Vit D3',
      category: 'Prescriptions',
      doctor: 'Dr. David Chen',
      date: 'Aug 24, 2026',
      size: '1.1 MB',
      type: 'Digital Rx',
      details: 'Rx Ref #99281. Take Cetirizine 10mg once daily as needed. Vitamin D3 2000 IU daily with breakfast.'
    },
    {
      id: 3,
      title: 'Brain MRI T2 Contrast Scan',
      category: 'Radiology Scans',
      doctor: 'Dr. Marcus Vance',
      date: 'Aug 10, 2026',
      size: '18.5 MB',
      type: 'DICOM / PDF',
      details: 'Normal brain parenchyma structure without focal mass effect or acute ischemia. Ventricles and sulci normal for age.'
    },
    {
      id: 4,
      title: 'COVID-19 & Flu Booster Certificate',
      category: 'Vaccine Certificates',
      doctor: 'Healthverse Immunization Hub',
      date: 'Jan 15, 2026',
      size: '850 KB',
      type: 'Verified QR PDF',
      details: 'Verified digital immunization record. Batch #VX-883921. State registry synchronized.'
    }
  ];

  const filteredRecords = records.filter(r => activeCategory === 'All' || r.category === activeCategory);

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '4px' }}>Digital Medical Vault & Prescriptions</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>HIPAA-compliant, end-to-end encrypted health documents</p>
        </div>
        <div className="badge badge-emerald" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
          <Lock size={14} /> Vault Secured (256-bit AES)
        </div>
      </div>

      {/* Categories Filter */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              background: activeCategory === cat ? 'var(--primary-gradient)' : 'rgba(255, 255, 255, 0.04)',
              border: activeCategory === cat ? 'none' : '1px solid var(--border-color)',
              color: '#fff',
              padding: '8px 18px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Documents List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
        {filteredRecords.map(rec => (
          <div key={rec.id} className="glass-panel" style={{ padding: '20px', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '12px',
                  background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <FileText size={20} color="#06b6d4" />
                </div>
                <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>{rec.category}</span>
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px', lineHeight: '1.4' }}>{rec.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Issued by: {rec.doctor}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{rec.date} • {rec.size} • {rec.type}</p>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '18px' }}>
              <button 
                className="btn-secondary" 
                style={{ flex: 1, justifyContent: 'center', padding: '8px', fontSize: '0.8rem' }}
                onClick={() => setViewRecord(rec)}
              >
                <Eye size={14} /> Preview
              </button>
              <button 
                className="btn-primary" 
                style={{ flex: 1, justifyContent: 'center', padding: '8px', fontSize: '0.8rem' }}
                onClick={() => alert(`Downloading encrypted package for: ${rec.title}`)}
              >
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Record Preview Modal */}
      {viewRecord && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div className="glass-panel animate-fade" style={{ width: '100%', maxWidth: '520px', padding: '28px', borderRadius: '24px', background: '#0f172a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Medical Record Viewer</h3>
              <button onClick={() => setViewRecord(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '14px', marginBottom: '20px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '4px' }}>{viewRecord.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                Category: {viewRecord.category} | Date: {viewRecord.date}
              </div>
              <div style={{ fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-main)', background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '10px' }}>
                {viewRecord.details}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => alert('Download initiated...')}>
                <Download size={16} /> Download Encrypted File
              </button>
              <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => alert('Secure QR share link generated.')}>
                <Share2 size={16} /> Share QR
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
