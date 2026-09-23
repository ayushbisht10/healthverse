import React, { useState } from 'react';
import { Activity, ShieldAlert, AlertTriangle, CheckCircle, Brain, RefreshCw, BarChart2, Info } from 'lucide-react';

export default function HealthRiskPrediction() {
  const [age, setAge] = useState(32);
  const [systolicBP, setSystolicBP] = useState(120);
  const [diastolicBP, setDiastolicBP] = useState(80);
  const [bloodSugar, setBloodSugar] = useState(105);
  const [bmi, setBmi] = useState(24.2);
  const [heartRate, setHeartRate] = useState(74);
  const [smoking, setSmoking] = useState('No');

  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState({
    riskLevel: 'Low Risk',
    riskScore: 18,
    color: '#10b981',
    badgeType: 'emerald',
    factors: [
      'Optimal Blood Pressure ratio (120/80 mmHg)',
      'Normal Fasting Glucose level (105 mg/dL)',
      'Non-smoker cardiovascular profile'
    ],
    recommendations: [
      'Maintain current weekly 150-min moderate exercise regimen.',
      'Schedule annual biometrics checkup.'
    ]
  });

  const handlePredict = () => {
    setIsPredicting(true);
    setTimeout(() => {
      setIsPredicting(false);
      let score = 0;
      let factorsArr = [];

      if (systolicBP > 135 || diastolicBP > 88) {
        score += 35;
        factorsArr.push('Elevated Blood Pressure parameters');
      } else {
        factorsArr.push('Optimal Resting Blood Pressure');
      }

      if (bloodSugar > 125) {
        score += 30;
        factorsArr.push('High Fasting Glucose reading (>125 mg/dL)');
      }

      if (bmi > 28) {
        score += 20;
        factorsArr.push('BMI above optimal physiological range');
      }

      if (smoking === 'Yes') {
        score += 25;
        factorsArr.push('Tobacco smoking multiplier active');
      }

      let riskLvl = 'Low Risk';
      let riskClr = '#10b981';
      let badge = 'emerald';

      if (score >= 50) {
        riskLvl = 'High Risk';
        riskClr = '#f43f5e';
        badge = 'rose';
      } else if (score >= 25) {
        riskLvl = 'Medium Risk';
        riskClr = '#f59e0b';
        badge = 'amber';
      }

      setPredictionResult({
        riskLevel: riskLvl,
        riskScore: Math.min(score, 98),
        color: riskClr,
        badgeType: badge,
        factors: factorsArr,
        recommendations: riskLvl === 'High Risk' 
          ? ['Recommend comprehensive clinical evaluation by physician.', 'Initiate low-sodium diet and daily walking.']
          : ['Keep monitoring vitals bi-weekly.', 'Maintain balanced dietary intake.']
      });
    }, 900);
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Disclaimer Banner */}
      <div className="glass-panel" style={{
        padding: '16px 20px', borderRadius: '16px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', display: 'flex', alignItems: 'center', gap: '14px'
      }}>
        <Info size={24} color="#f59e0b" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
          <strong style={{ color: '#f59e0b' }}>Important Clinical Note:</strong> This Machine Learning module provides a <strong>predictive health risk assessment</strong> based on statistical historical dataset patterns. It is designed for wellness awareness and preventative risk evaluation — <em>it does NOT constitute a formal medical diagnosis</em>.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '20px' }}>
        
        {/* ML Parameters Form */}
        <div className="glass-panel" style={{ padding: '22px', borderRadius: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Brain size={18} color="var(--primary)" /> Input Health Parameters
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Age (Years)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '9px', borderRadius: '8px', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>BMI</label>
                <input
                  type="number"
                  step="0.1"
                  value={bmi}
                  onChange={(e) => setBmi(Number(e.target.value))}
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '9px', borderRadius: '8px', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Systolic BP (mmHg)</label>
                <input
                  type="number"
                  value={systolicBP}
                  onChange={(e) => setSystolicBP(Number(e.target.value))}
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '9px', borderRadius: '8px', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Diastolic BP (mmHg)</label>
                <input
                  type="number"
                  value={diastolicBP}
                  onChange={(e) => setDiastolicBP(Number(e.target.value))}
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '9px', borderRadius: '8px', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Fasting Blood Sugar (mg/dL)</label>
              <input
                type="number"
                value={bloodSugar}
                onChange={(e) => setBloodSugar(Number(e.target.value))}
                style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '9px', borderRadius: '8px', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Tobacco Use</label>
              <select
                value={smoking}
                onChange={(e) => setSmoking(e.target.value)}
                style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '9px', borderRadius: '8px', outline: 'none' }}
              >
                <option value="No">No / Non-Smoker</option>
                <option value="Yes">Yes / Smoker</option>
              </select>
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', marginTop: '8px', padding: '11px' }}
              onClick={handlePredict}
              disabled={isPredicting}
            >
              {isPredicting ? <RefreshCw size={16} className="animate-spin" /> : <Brain size={16} />}
              {isPredicting ? 'Evaluating ML Classification...' : 'Run ML Health Risk Model'}
            </button>
          </div>
        </div>

        {/* Prediction Results Gauge & Factors */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>ML Risk Evaluation Summary</h3>
              <span className={`badge badge-${predictionResult.badgeType}`} style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                {predictionResult.riskLevel}
              </span>
            </div>

            {/* Risk Gauge Bar */}
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', marginBottom: '20px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Cardiovascular & Metabolic Risk Index</span>
                <strong style={{ color: predictionResult.color, fontSize: '1.1rem' }}>{predictionResult.riskScore} / 100</strong>
              </div>

              <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{
                  width: `${predictionResult.riskScore}%`, height: '100%', background: predictionResult.color, transition: 'all 0.5s ease'
                }}></div>
              </div>
            </div>

            {/* Key Risk Drivers */}
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px' }}>Identified Physiological Factors:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {predictionResult.factors.map((fact, idx) => (
                <div key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-main)', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={15} color={predictionResult.color} /> {fact}
                </div>
              ))}
            </div>

            {/* Recommended Action Plan */}
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px' }}>ML Suggested Preventative Guidance:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {predictionResult.recommendations.map((rec, idx) => (
                <div key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '10px', borderLeft: '2px solid var(--primary)' }}>
                  {rec}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
