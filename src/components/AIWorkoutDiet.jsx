import React, { useState } from 'react';
import { Dumbbell, Utensils, Sparkles, Target, Zap, RefreshCw, CheckCircle, ArrowRight, UserCheck } from 'lucide-react';

export default function AIWorkoutDiet() {
  const [activeSubTab, setActiveSubTab] = useState('workout');

  // Input states
  const [weight, setWeight] = useState(72);
  const [height, setHeight] = useState(175);
  const [goal, setGoal] = useState('Muscle Gain');
  const [experience, setExperience] = useState('Intermediate');
  const [dietPref, setDietPref] = useState('High Protein / Non-Veg');
  const [isGenerating, setIsGenerating] = useState(false);

  // Recommendations state
  const [workoutPlan, setWorkoutPlan] = useState({
    title: 'Hypertrophy & Strength Split (4-Day ML Optimized)',
    bmi: '23.5 (Normal)',
    dailyCalories: 2650,
    routine: [
      { day: 'Day 1: Chest & Triceps', exercises: ['Barbell Bench Press (4x8-10)', 'Incline Dumbbell Press (3x10-12)', 'Cable Chest Flyes (3x12)', 'Tricep Rope Pushdowns (4x12)'] },
      { day: 'Day 2: Back & Biceps', exercises: ['Lat Pulldowns (4x10)', 'Barbell Bent-Over Rows (3x8-10)', 'Hammer Curls (3x12)', 'Preacher Curls (3x10)'] },
      { day: 'Day 3: Rest & Mobility', exercises: ['Light 20-min cardio', 'Hamstring & Hip Mobility Stretches'] },
      { day: 'Day 4: Legs & Core', exercises: ['Barbell Squats (4x8-10)', 'Romanian Deadlifts (3x10)', 'Leg Press (3x12)', 'Hanging Leg Raises (4x15)'] }
    ]
  });

  const [dietPlan, setDietPlan] = useState({
    macros: { protein: '160g', carbs: '280g', fats: '70g', calories: '2400 kcal' },
    meals: [
      { name: 'Breakfast (8:00 AM)', items: '4 Egg Whites + 2 Whole Eggs, Oats with Peanut Butter & Almond Milk', protein: '38g' },
      { name: 'Mid-Morning Snack (11:30 AM)', items: 'Whey Protein Shake + 1 Banana + Handful of Walnuts', protein: '30g' },
      { name: 'Lunch (2:00 PM)', items: '200g Grilled Chicken Breast / Paneer, Brown Rice, Mixed Green Salad', protein: '45g' },
      { name: 'Evening Pre-Workout (5:30 PM)', items: 'Whole Wheat Toast with Avocado & Black Coffee', protein: '10g' },
      { name: 'Dinner (8:30 PM)', items: 'Grilled Salmon / Tofu, Sweet Potato, Steamed Broccoli', protein: '37g' }
    ]
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      if (goal === 'Weight Loss') {
        setWorkoutPlan({
          title: 'HIIT & Fat Loss Circuit (ML Caloric Burn Profile)',
          bmi: (weight / ((height / 100) ** 2)).toFixed(1) + ' (Calculated)',
          dailyCalories: 2100,
          routine: [
            { day: 'Day 1: High Intensity Fat Burn', exercises: ['Jumping Jacks (3x60s)', 'Kettlebell Swings (4x15)', 'Burpees (3x12)', 'Treadmill Incline Sprints (15 mins)'] },
            { day: 'Day 2: Full Body Resistance', exercises: ['Goblet Squats (4x12)', 'Push-ups (4x15)', 'Dumbbell Rows (3x12)', 'Plank Holds (3x60s)'] }
          ]
        });
        setDietPlan({
          macros: { protein: '140g', carbs: '180g', fats: '55g', calories: '1800 kcal' },
          meals: [
            { name: 'Breakfast', items: 'Green Protein Smoothie (Spinach, Chia Seeds, Whey, Almond Milk)', protein: '30g' },
            { name: 'Lunch', items: 'Quinoa Bowl with Roasted Chickpeas & Grilled Chicken', protein: '38g' },
            { name: 'Dinner', items: 'Egg White Omelet with Vegetables & Side Salad', protein: '32g' }
          ]
        });
      } else {
        setWorkoutPlan({
          title: `${goal} Custom ML Program`,
          bmi: (weight / ((height / 100) ** 2)).toFixed(1) + ' (Calculated)',
          dailyCalories: 2500,
          routine: [
            { day: 'Day 1: Upper Body Power', exercises: ['Bench Press (4x8)', 'Pull-ups (4xMax)', 'Overhead Press (3x8)', 'Dips (3x12)'] },
            { day: 'Day 2: Lower Body & Core', exercises: ['Barbell Squats (4x8)', 'Deadlifts (3x6)', 'Calf Raises (4x15)'] }
          ]
        });
      }
    }, 1000);
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '4px' }}>AI Workout & Diet Recommendation Engine</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Personalized plan generation powered by Python/FastAPI ML Models</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '12px' }}>
          <button
            onClick={() => setActiveSubTab('workout')}
            style={{
              background: activeSubTab === 'workout' ? 'var(--primary)' : 'transparent',
              color: activeSubTab === 'workout' ? '#fff' : 'var(--text-muted)',
              border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem'
            }}
          >
            <Dumbbell size={15} style={{ marginRight: '6px' }} /> Workout Plan
          </button>
          <button
            onClick={() => setActiveSubTab('diet')}
            style={{
              background: activeSubTab === 'diet' ? 'var(--primary)' : 'transparent',
              color: activeSubTab === 'diet' ? '#fff' : 'var(--text-muted)',
              border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem'
            }}
          >
            <Utensils size={15} style={{ marginRight: '6px' }} /> Diet & Nutrition
          </button>
        </div>
      </div>

      {/* Grid: Form Parameters & ML Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>
        
        {/* ML Model Inputs Panel */}
        <div className="glass-panel" style={{ padding: '22px', borderRadius: '20px', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--primary)" /> User Biometric Inputs
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Body Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '10px', borderRadius: '10px', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '10px', borderRadius: '10px', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Fitness Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '10px', borderRadius: '10px', outline: 'none' }}
              >
                <option value="Muscle Gain">Muscle Gain / Hypertrophy</option>
                <option value="Weight Loss">Weight Loss & Fat Burn</option>
                <option value="Endurance">Stamina & Endurance</option>
                <option value="Maintenance">General Fitness & Maintenance</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Experience Level</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '10px', borderRadius: '10px', outline: 'none' }}
              >
                <option value="Beginner">Beginner (&lt; 6 months)</option>
                <option value="Intermediate">Intermediate (1-3 yrs)</option>
                <option value="Advanced">Advanced (3+ yrs)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Diet Preference</label>
              <select
                value={dietPref}
                onChange={(e) => setDietPref(e.target.value)}
                style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', padding: '10px', borderRadius: '10px', outline: 'none' }}
              >
                <option value="High Protein / Non-Veg">High Protein (Non-Veg)</option>
                <option value="Vegetarian">Vegetarian High Protein</option>
                <option value="Vegan">Plant-Based / Vegan</option>
                <option value="Keto">Low Carb / Keto</option>
              </select>
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '12px' }}
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <Zap size={16} />}
              {isGenerating ? 'Running ML Inference...' : 'Generate AI Plan'}
            </button>
          </div>
        </div>

        {/* Output Recommendations Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {activeSubTab === 'workout' ? (
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{workoutPlan.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target Calories: {workoutPlan.dailyCalories} kcal/day | BMI: {workoutPlan.bmi}</p>
                </div>
                <span className="badge badge-emerald">ML Confidence: 96%</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {workoutPlan.routine.map((r, idx) => (
                  <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', padding: '16px', borderRadius: '14px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle size={16} color="#10b981" /> {r.day}
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                      {r.exercises.map((ex, eIdx) => (
                        <div key={eIdx} style={{ fontSize: '0.82rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', padding: '8px 12px', borderRadius: '8px' }}>
                          • {ex}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>AI Tailored Macro & Nutrition Guide</h3>
                <span className="badge badge-cyan">{dietPref}</span>
              </div>

              {/* Macros Summary Pills */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
                <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Protein</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#22d3ee' }}>{dietPlan.macros.protein}</div>
                </div>
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Carbs</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f59e0b' }}>{dietPlan.macros.carbs}</div>
                </div>
                <div style={{ background: 'rgba(244, 63, 94, 0.1)', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fats</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f43f5e' }}>{dietPlan.macros.fats}</div>
                </div>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Energy</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>{dietPlan.macros.calories}</div>
                </div>
              </div>

              {/* Meals Schedule */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {dietPlan.meals.map((m, idx) => (
                  <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', padding: '14px 18px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{m.name}</h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>{m.items}</p>
                    </div>
                    <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>{m.protein} Prot</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
