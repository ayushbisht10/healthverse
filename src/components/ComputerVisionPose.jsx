import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Video, AlertCircle, CheckCircle, RefreshCw, Zap, Award, Activity, 
  Play, Square, Info, Volume2, VolumeX, History, Flame, ShieldAlert, Sparkles, Layers
} from 'lucide-react';

// ==========================================
// 10 EXERCISES BIOMECHANICAL ALGORITHMS CONFIG
// ==========================================
const EXERCISES_CONFIG = {
  Squats: {
    label: 'Squats',
    category: 'Lower Body',
    difficulty: 'Intermediate',
    caloriesPerRep: 0.32,
    description: 'Tracks Hip-Knee-Ankle vector angle. Count rep when knees flex <100° and extend >160°.',
    targetAngleJoints: ['hip', 'knee', 'ankle'],
    downThreshold: 100,
    upThreshold: 160,
    goodFeedback: 'Great squat depth! Knees aligned over toes.',
    badFeedback: '⚠️ Warning: Shallow depth! Lower hips until knees reach ~90°.',
    postureCheck: (spineAngle) => spineAngle >= 130,
    postureWarning: '⚠️ Keep spine straight! Avoid excessive forward leaning.'
  },
  Pushups: {
    label: 'Push-ups',
    category: 'Chest & Core',
    difficulty: 'Intermediate',
    caloriesPerRep: 0.45,
    description: 'Tracks Shoulder-Elbow-Wrist flexion. Count rep when elbows bend <90° and extend >150°.',
    targetAngleJoints: ['shoulder', 'elbow', 'wrist'],
    downThreshold: 90,
    upThreshold: 150,
    goodFeedback: 'Chest close to ground! Full range of motion.',
    badFeedback: '⚠️ Warning: Lower chest closer to ground for full rep.',
    postureCheck: (spineAngle) => spineAngle >= 155,
    postureWarning: '⚠️ Hips sagging or piking! Maintain straight plank line.'
  },
  BicepCurls: {
    label: 'Bicep Curls',
    category: 'Arms',
    difficulty: 'Beginner',
    caloriesPerRep: 0.20,
    description: 'Tracks Shoulder-Elbow-Wrist arm flexion. Count rep when elbow flexes <50° and extends >150°.',
    targetAngleJoints: ['shoulder', 'elbow', 'wrist'],
    downThreshold: 50,
    upThreshold: 150,
    goodFeedback: 'Full bicep squeeze at peak extension!',
    badFeedback: '⚠️ Warning: Flex elbow fully toward shoulder.',
    postureCheck: (spineAngle) => spineAngle >= 140,
    postureWarning: '⚠️ Keep upper arm stationary at torso. Avoid swinging!'
  },
  JumpingJacks: {
    label: 'Jumping Jacks',
    category: 'Cardio',
    difficulty: 'Beginner',
    caloriesPerRep: 0.15,
    description: 'Tracks Overhead Arm angle (Wrist-Shoulder-Hip). Rep counted when hands touch overhead >150°.',
    targetAngleJoints: ['wrist', 'shoulder', 'hip'],
    downThreshold: 65,
    upThreshold: 150,
    goodFeedback: 'Great explosive rhythm! Overhead arm reach.',
    badFeedback: '⚠️ Warning: Bring hands higher overhead.',
    postureCheck: (spineAngle) => spineAngle >= 135,
    postureWarning: '⚠️ Keep core engaged & jump legs wider.'
  },
  Lunges: {
    label: 'Forward Lunges',
    category: 'Legs',
    difficulty: 'Intermediate',
    caloriesPerRep: 0.38,
    description: 'Tracks lead Hip-Knee-Ankle flexion. Count rep when front knee flexes <95° and extends >165°.',
    targetAngleJoints: ['hip', 'knee', 'ankle'],
    downThreshold: 95,
    upThreshold: 165,
    goodFeedback: 'Deep 90° lunge bend! Strong hip stability.',
    badFeedback: '⚠️ Warning: Step further forward and dip lower.',
    postureCheck: (spineAngle) => spineAngle >= 140,
    postureWarning: '⚠️ Keep torso vertical. Avoid leaning forward!'
  },
  OverheadPress: {
    label: 'Shoulder Press',
    category: 'Shoulders',
    difficulty: 'Intermediate',
    caloriesPerRep: 0.35,
    description: 'Tracks Elbow-Shoulder-Hip lockout. Rep counted when arms lock out overhead >160°.',
    targetAngleJoints: ['elbow', 'shoulder', 'hip'],
    downThreshold: 85,
    upThreshold: 160,
    goodFeedback: 'Full overhead lockout achieved!',
    badFeedback: '⚠️ Warning: Lower weights to ear level before pressing up.',
    postureCheck: (spineAngle) => spineAngle >= 150,
    postureWarning: '⚠️ Lower back arching! Brace core tight.'
  },
  LegRaises: {
    label: 'Lying Leg Raises',
    category: 'Abs',
    difficulty: 'Advanced',
    caloriesPerRep: 0.28,
    description: 'Tracks lying Shoulder-Hip-Knee angle. Count rep when legs raise vertical >65° and lower <25°.',
    targetAngleJoints: ['shoulder', 'hip', 'knee'],
    downThreshold: 25,
    upThreshold: 65,
    goodFeedback: 'Controlled abs contraction! Straight leg lift.',
    badFeedback: '⚠️ Warning: Raise legs higher toward vertical.',
    postureCheck: () => true,
    postureWarning: '⚠️ Keep lower back pressed firmly against ground.'
  },
  TricepDips: {
    label: 'Tricep Dips',
    category: 'Arms',
    difficulty: 'Intermediate',
    caloriesPerRep: 0.30,
    description: 'Tracks Shoulder-Elbow-Wrist flexion. Count rep when elbow flexes <90° and extends >155°.',
    targetAngleJoints: ['shoulder', 'elbow', 'wrist'],
    downThreshold: 90,
    upThreshold: 155,
    goodFeedback: 'Deep tricep dip! Excellent lock-out.',
    badFeedback: '⚠️ Warning: Lower hips until elbows reach 90°.',
    postureCheck: (spineAngle) => spineAngle >= 130,
    postureWarning: '⚠️ Keep shoulders down and back. Don\'t shrug!'
  },
  HighKnees: {
    label: 'High Knees',
    category: 'Cardio',
    difficulty: 'Beginner',
    caloriesPerRep: 0.12,
    description: 'Tracks Hip elevation (Shoulder-Hip-Knee). Count rep when knee drives up parallel to hip (<90°).',
    targetAngleJoints: ['shoulder', 'hip', 'knee'],
    downThreshold: 90,
    upThreshold: 155,
    goodFeedback: 'High knee drive! Fast explosive tempo.',
    badFeedback: '⚠️ Warning: Drive knee higher up to hip level.',
    postureCheck: (spineAngle) => spineAngle >= 140,
    postureWarning: '⚠️ Avoid leaning backwards. Stay light on feet.'
  },
  Plank: {
    label: 'Plank Hold',
    category: 'Core',
    difficulty: 'Intermediate',
    caloriesPerRep: 0.05,
    description: 'Tracks Spine alignment vector (Shoulder-Hip-Ankle ~180°). Monitors hold duration & form stability.',
    targetAngleJoints: ['shoulder', 'hip', 'ankle'],
    downThreshold: 165,
    upThreshold: 195,
    goodFeedback: 'Perfect plank spine alignment! Core locked.',
    badFeedback: '⚠️ Warning: Hips sagging down or piking up! Flatten body line.',
    postureCheck: (spineAngle) => spineAngle >= 165 && spineAngle <= 195,
    postureWarning: '⚠️ Form breach! Align shoulders, hips, and ankles.'
  }
};

// Vector Geometry Utility
function calculateAngle(a, b, c) {
  if (!a || !b || !c) return 0;
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  return Math.round(angle);
}

// Sound Synth Feedback
let audioCtx = null;
function playSoundCue(type = 'rep') {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'rep') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    }
  } catch (err) {
    console.warn('Audio feedback failed:', err);
  }
}

export default function ComputerVisionPose() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState('Squats');
  const [repCount, setRepCount] = useState(0);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [postureScore, setPostureScore] = useState(98);
  const [feedback, setFeedback] = useState('Select an exercise & start WebCam or AI Simulation.');
  const [feedbackType, setFeedbackType] = useState('good');
  const [detectorStatus, setDetectorStatus] = useState('Idle');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [workoutLog, setWorkoutLog] = useState([]);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [plankHoldSeconds, setPlankHoldSeconds] = useState(0);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const repStageRef = useRef('up');
  const detectorRef = useRef(null);
  const animFrameIdRef = useRef(null);

  const currentExConfig = EXERCISES_CONFIG[selectedExercise];

  const triggerSound = (type) => {
    if (soundEnabled) playSoundCue(type);
  };

  useEffect(() => {
    let timer;
    if ((isCameraActive || isSimulating) && selectedExercise === 'Plank' && feedbackType === 'good') {
      timer = setInterval(() => {
        setPlankHoldSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCameraActive, isSimulating, selectedExercise, feedbackType]);

  const handleExerciseChange = (newEx) => {
    setSelectedExercise(newEx);
    setRepCount(0);
    setPlankHoldSeconds(0);
    repStageRef.current = 'up';
    setFeedback(`Selected ${EXERCISES_CONFIG[newEx].label}. Ready to track!`);
    setFeedbackType('good');
    setPostureScore(98);
  };

  const startRealTimeTracking = async () => {
    stopTracking();
    setSessionStartTime(Date.now());

    try {
      setDetectorStatus('Loading MediaPipe Engine...');

      if (!window.Pose) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsCameraActive(true);
        setIsSimulating(false);

        const pose = new window.Pose({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
        });

        pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: false,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        pose.onResults((results) => {
          if (!canvasRef.current || !videoRef.current) return;
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          const videoWidth = videoRef.current.videoWidth || 640;
          const videoHeight = videoRef.current.videoHeight || 480;

          canvas.width = videoWidth;
          canvas.height = videoHeight;
          ctx.clearRect(0, 0, videoWidth, videoHeight);

          if (results.poseLandmarks) {
            processKeypointsAndDraw(results.poseLandmarks, ctx, videoWidth, videoHeight);
          }
        });

        detectorRef.current = pose;
        setDetectorStatus('MediaPipe Vision Active');

        const processFrame = async () => {
          if (videoRef.current && detectorRef.current && !videoRef.current.paused && !videoRef.current.ended) {
            try {
              await detectorRef.current.send({ image: videoRef.current });
            } catch (err) {
              console.warn('MediaPipe send warning:', err);
            }
          }
          animFrameIdRef.current = requestAnimationFrame(processFrame);
        };
        processFrame();
      }
    } catch (err) {
      console.error('Camera initialization error:', err);
      setDetectorStatus('WebCam Unavailable -> AI Simulation Active');
      setIsCameraActive(false);
      startAISimulation();
    }
  };

  const startAISimulation = () => {
    stopTracking();
    setIsSimulating(true);
    setIsCameraActive(false);
    setSessionStartTime(Date.now());
    setDetectorStatus('AI Motion Simulator Running');

    const config = EXERCISES_CONFIG[selectedExercise];

    let frameCount = 0;
    const simLoop = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const w = 640;
      const h = 480;
      canvas.width = w;
      canvas.height = h;
      ctx.clearRect(0, 0, w, h);

      frameCount++;
      const speed = 0.05;
      const progress = (Math.sin(frameCount * speed) + 1) / 2;
      const angleRange = config.upThreshold - config.downThreshold;
      const simulatedAngle = Math.round(config.downThreshold + (progress * angleRange));
      
      const syntheticLandmarks = createSyntheticPose(selectedExercise, simulatedAngle, w, h);
      processKeypointsAndDraw(syntheticLandmarks, ctx, w, h, simulatedAngle);

      animFrameIdRef.current = requestAnimationFrame(simLoop);
    };
    simLoop();
  };

  const createSyntheticPose = (exercise, angle, w, h) => {
    const cX = 0.5;
    const normAngle = (angle - 30) / 150;
    
    let nose = { x: cX, y: 0.18, visibility: 0.99 };
    let lShoulder = { x: cX - 0.12, y: 0.28, visibility: 0.99 };
    let rShoulder = { x: cX + 0.12, y: 0.28, visibility: 0.99 };
    let lElbow = { x: cX - 0.18, y: 0.40, visibility: 0.99 };
    let rElbow = { x: cX + 0.18, y: 0.40, visibility: 0.99 };
    let lWrist = { x: cX - 0.20, y: 0.52, visibility: 0.99 };
    let rWrist = { x: cX + 0.20, y: 0.52, visibility: 0.99 };
    let lHip = { x: cX - 0.10, y: 0.54, visibility: 0.99 };
    let rHip = { x: cX + 0.10, y: 0.54, visibility: 0.99 };
    let lKnee = { x: cX - 0.11, y: 0.72 + (1 - normAngle) * 0.08, visibility: 0.99 };
    let rKnee = { x: cX + 0.11, y: 0.72 + (1 - normAngle) * 0.08, visibility: 0.99 };
    let lAnkle = { x: cX - 0.11, y: 0.90, visibility: 0.99 };
    let rAnkle = { x: cX + 0.11, y: 0.90, visibility: 0.99 };

    if (exercise === 'Pushups' || exercise === 'Plank') {
      lShoulder = { x: 0.25, y: 0.55 + (1 - normAngle) * 0.1, visibility: 0.99 };
      rShoulder = { x: 0.25, y: 0.55 + (1 - normAngle) * 0.1, visibility: 0.99 };
      lElbow = { x: 0.20, y: 0.65, visibility: 0.99 };
      rElbow = { x: 0.20, y: 0.65, visibility: 0.99 };
      lWrist = { x: 0.22, y: 0.75, visibility: 0.99 };
      rWrist = { x: 0.22, y: 0.75, visibility: 0.99 };
      lHip = { x: 0.55, y: 0.53 + (1 - normAngle) * 0.08, visibility: 0.99 };
      rHip = { x: 0.55, y: 0.53 + (1 - normAngle) * 0.08, visibility: 0.99 };
      lKnee = { x: 0.72, y: 0.54, visibility: 0.99 };
      rKnee = { x: 0.72, y: 0.54, visibility: 0.99 };
      lAnkle = { x: 0.88, y: 0.55, visibility: 0.99 };
      rAnkle = { x: 0.88, y: 0.55, visibility: 0.99 };
    } else if (exercise === 'BicepCurls' || exercise === 'OverheadPress') {
      lElbow = { x: cX - 0.14, y: 0.42, visibility: 0.99 };
      rElbow = { x: cX + 0.14, y: 0.42, visibility: 0.99 };
      const wristY = exercise === 'OverheadPress' ? 0.28 - (normAngle * 0.18) : 0.42 - (normAngle * 0.18);
      lWrist = { x: cX - 0.14, y: wristY, visibility: 0.99 };
      rWrist = { x: cX + 0.14, y: wristY, visibility: 0.99 };
    }

    const lmArray = new Array(33).fill({ x: 0, y: 0, visibility: 0 });
    lmArray[0] = nose;
    lmArray[11] = lShoulder; lmArray[12] = rShoulder;
    lmArray[13] = lElbow;    lmArray[14] = rElbow;
    lmArray[15] = lWrist;    lmArray[16] = rWrist;
    lmArray[23] = lHip;      lmArray[24] = rHip;
    lmArray[25] = lKnee;     lmArray[26] = rKnee;
    lmArray[27] = lAnkle;    lmArray[28] = rAnkle;
    return lmArray;
  };

  const processKeypointsAndDraw = (landmarks, ctx, w, h, forcedAngle = null) => {
    const MP_MAP = {
      nose: 0, left_shoulder: 11, right_shoulder: 12,
      left_elbow: 13, right_elbow: 14, left_wrist: 15, right_wrist: 16,
      left_hip: 23, right_hip: 24, left_knee: 25, right_knee: 26,
      left_ankle: 27, right_ankle: 28
    };

    const getBestPoint = (jointName) => {
      const leftIdx = MP_MAP[`left_${jointName}`];
      const rightIdx = MP_MAP[`right_${jointName}`];
      const directIdx = MP_MAP[jointName];

      const lPt = (leftIdx !== undefined && landmarks[leftIdx]) ? landmarks[leftIdx] : null;
      const rPt = (rightIdx !== undefined && landmarks[rightIdx]) ? landmarks[rightIdx] : null;
      const dPt = (directIdx !== undefined && landmarks[directIdx]) ? landmarks[directIdx] : null;

      if (dPt && dPt.visibility > 0.35) return { x: dPt.x * w, y: dPt.y * h };

      if (lPt && rPt) {
        if (lPt.visibility >= rPt.visibility && lPt.visibility > 0.35) {
          return { x: lPt.x * w, y: lPt.y * h };
        } else if (rPt.visibility > 0.35) {
          return { x: rPt.x * w, y: rPt.y * h };
        }
      }
      if (lPt && lPt.visibility > 0.35) return { x: lPt.x * w, y: lPt.y * h };
      if (rPt && rPt.visibility > 0.35) return { x: rPt.x * w, y: rPt.y * h };
      return null;
    };

    const connections = [
      [11, 12], [11, 13], [13, 15], [12, 14], [14, 16],
      [11, 23], [12, 24], [23, 24],
      [23, 25], [25, 27], [24, 26], [26, 28]
    ];

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(6, 182, 212, 0.5)';
    ctx.shadowBlur = 8;

    connections.forEach(([i, j]) => {
      if (landmarks[i] && landmarks[j] && (landmarks[i].visibility > 0.3 || isSimulating)) {
        ctx.beginPath();
        ctx.moveTo(landmarks[i].x * w, landmarks[i].y * h);
        ctx.lineTo(landmarks[j].x * w, landmarks[j].y * h);
        ctx.stroke();
      }
    });

    landmarks.forEach((lm) => {
      if (lm && (lm.visibility > 0.35 || isSimulating)) {
        ctx.beginPath();
        ctx.arc(lm.x * w, lm.y * h, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 10;
        ctx.fill();
      }
    });
    ctx.shadowBlur = 0;

    const config = EXERCISES_CONFIG[selectedExercise];
    const [j1Name, j2Name, j3Name] = config.targetAngleJoints;

    const p1 = getBestPoint(j1Name);
    const p2 = getBestPoint(j2Name);
    const p3 = getBestPoint(j3Name);

    const sPt = getBestPoint('shoulder');
    const hPt = getBestPoint('hip');
    const aPt = getBestPoint('ankle');
    let spineAngle = 175;
    if (sPt && hPt && aPt) {
      spineAngle = calculateAngle(sPt, hPt, aPt);
    }

    const isPostureValid = config.postureCheck(spineAngle);

    let angle = forcedAngle !== null ? forcedAngle : 0;
    if (forcedAngle === null && p1 && p2 && p3) {
      angle = calculateAngle(p1, p2, p3);
    }

    if (angle > 0) {
      setCurrentAngle(angle);

      ctx.save();
      ctx.fillStyle = isPostureValid ? '#22d3ee' : '#f43f5e';
      ctx.font = 'bold 18px Inter, sans-serif';
      const vertexPt = p2 || { x: w / 2, y: h / 2 };
      ctx.fillText(`${angle}°`, vertexPt.x + 10, vertexPt.y);
      ctx.restore();

      if (selectedExercise === 'Plank') {
        if (isPostureValid) {
          setFeedback(config.goodFeedback);
          setFeedbackType('good');
          setPostureScore(99);
        } else {
          setFeedback(config.postureWarning);
          setFeedbackType('warn');
          setPostureScore(62);
          triggerSound('warn');
        }
      } else {
        if (!isPostureValid) {
          setFeedback(config.postureWarning);
          setFeedbackType('warn');
          setPostureScore(60);
          triggerSound('warn');
        } else {
          if (angle <= config.downThreshold && repStageRef.current === 'up') {
            repStageRef.current = 'down';
            setFeedback(config.goodFeedback);
            setFeedbackType('good');
            setPostureScore(95);
          } else if (angle >= config.upThreshold && repStageRef.current === 'down') {
            repStageRef.current = 'up';
            setRepCount(prev => {
              const newCount = prev + 1;
              triggerSound('rep');
              if (newCount % 5 === 0) {
                logWorkoutSession(selectedExercise, newCount);
              }
              return newCount;
            });
            setFeedback(`✅ Perfect Form Rep Counted!`);
            setFeedbackType('good');
            setPostureScore(99);
          }
        }
      }
    }
  };

  const stopTracking = () => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsCameraActive(false);
    setIsSimulating(false);
    setDetectorStatus('Stopped');

    if (repCount > 0) {
      logWorkoutSession(selectedExercise, repCount);
    }
  };

  const logWorkoutSession = (exName, count) => {
    const durationMin = sessionStartTime ? Math.max(1, Math.round((Date.now() - sessionStartTime) / 1000 / 60)) : 1;
    const calories = Math.round((count * EXERCISES_CONFIG[exName].caloriesPerRep) * 10) / 10;
    
    const newEntry = {
      id: Date.now(),
      exercise: EXERCISES_CONFIG[exName].label,
      reps: count,
      duration: `${durationMin} min`,
      calories: calories,
      score: postureScore,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setWorkoutLog(prev => [newEntry, ...prev.slice(0, 3)]);
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
      
      {/* Header Panel - Super Compact Single Row */}
      <div className="glass-panel" style={{ padding: '10px 14px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', width: '100%', minWidth: 0 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Real-Time Exercise CV Rep & Posture AI</h2>
            <span style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', padding: '2px 7px', borderRadius: '12px', fontSize: '0.68rem', fontWeight: 700, border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              10 Exercises Biomechanics
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          <button 
            className="btn-secondary" 
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
            style={{ padding: '6px 10px', fontSize: '0.78rem' }}
          >
            {soundEnabled ? <Volume2 size={15} color="#10b981" /> : <VolumeX size={15} color="#f43f5e" />}
          </button>

          <button 
            className="btn-secondary" 
            onClick={isSimulating ? stopTracking : startAISimulation}
            style={{ borderColor: isSimulating ? '#22d3ee' : 'var(--border-color)', color: isSimulating ? '#22d3ee' : '#fff', padding: '6px 12px', fontSize: '0.78rem' }}
          >
            <Sparkles size={14} color="#22d3ee" />
            {isSimulating ? 'Stop AI Demo' : 'AI Motion Simulator'}
          </button>

          <button 
            className={isCameraActive ? 'btn-secondary' : 'btn-primary'} 
            onClick={isCameraActive ? stopTracking : startRealTimeTracking}
            style={{ padding: '6px 14px', fontSize: '0.78rem' }}
          >
            {isCameraActive ? <Square size={14} color="#f43f5e" /> : <Play size={14} />}
            {isCameraActive ? 'Stop Camera' : 'Start WebCam AI'}
          </button>
        </div>
      </div>

      {/* 10 Exercises Selector Chips */}
      <div className="glass-panel" style={{ padding: '8px 12px', borderRadius: '12px', display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none', width: '100%', minWidth: 0 }}>
        {Object.keys(EXERCISES_CONFIG).map(exKey => {
          const isSelected = selectedExercise === exKey;
          const ex = EXERCISES_CONFIG[exKey];
          return (
            <button
              key={exKey}
              onClick={() => handleExerciseChange(exKey)}
              style={{
                padding: '5px 10px',
                borderRadius: '8px',
                border: isSelected ? '1px solid #06b6d4' : '1px solid var(--border-color)',
                background: isSelected ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(15, 23, 42, 0.9) 100%)' : 'rgba(15, 23, 42, 0.4)',
                color: isSelected ? '#fff' : 'var(--text-muted)',
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{ex.label}</span>
              <span style={{ fontSize: '0.62rem', padding: '1px 4px', borderRadius: '4px', background: isSelected ? '#06b6d4' : 'rgba(255,255,255,0.08)', color: '#fff' }}>
                {ex.category}
              </span>
            </button>
          );
        })}
      </div>

      {/* Info Banner for Selected Exercise */}
      <div className="glass-panel" style={{ padding: '8px 14px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', minWidth: 0 }}>
        <Info size={15} color="#22d3ee" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <strong style={{ color: '#22d3ee' }}>{currentExConfig.label} Algorithm: </strong>
          {currentExConfig.description}
        </div>
      </div>

      {/* Main Vision Grid - Dynamic 100% Fit */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 270px', gap: '10px', width: '100%', minWidth: 0 }}>
        
        {/* Real-Time Video & Canvas Overlay - Fits dynamically */}
        <div className="glass-panel" style={{
          borderRadius: '16px', position: 'relative', overflow: 'hidden', height: 'clamp(280px, 42vh, 340px)', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minWidth: 0
        }}>
          {(isCameraActive || isSimulating) ? (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <video
                ref={videoRef}
                playsInline
                muted
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transform: isCameraActive ? 'scaleX(-1)' : 'none',
                  display: isCameraActive ? 'block' : 'none'
                }}
              />
              <canvas
                ref={canvasRef}
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  pointerEvents: 'none',
                  transform: isCameraActive ? 'scaleX(-1)' : 'none'
                }}
              />

              {/* Status Badge */}
              <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', padding: '3px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', border: '1px solid rgba(6, 182, 212, 0.4)' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isSimulating ? '#22d3ee' : '#10b981', boxShadow: isSimulating ? '0 0 6px #22d3ee' : '0 0 6px #10b981' }}></span>
                {detectorStatus}
              </div>

              {/* Live Joint Angle Floating Meter */}
              {currentAngle > 0 && (
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.8)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', color: '#22d3ee', fontWeight: 700, border: '1px solid rgba(6, 182, 212, 0.3)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Activity size={13} color="#22d3ee" />
                  Angle: <span style={{ fontSize: '0.92rem', color: '#fff' }}>{currentAngle}°</span>
                </div>
              )}
            </div>

          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '16px' }}>
              <Camera size={40} color="var(--primary)" style={{ opacity: 0.5, marginBottom: '8px' }} />
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff', marginBottom: '3px' }}>
                WebCam & AI Motion Detection Ready
              </h3>
              <p style={{ fontSize: '0.76rem', maxWidth: '320px', margin: '0 auto 12px', color: 'var(--text-muted)' }}>
                Select an exercise from above and start WebCam AI Vision or test with AI Motion Simulator.
              </p>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button className="btn-primary" onClick={startRealTimeTracking} style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                  <Play size={13} /> Activate Camera
                </button>
                <button className="btn-secondary" onClick={startAISimulation} style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                  <Sparkles size={13} color="#22d3ee" /> Test AI Simulator
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Dashboard Column - Fixed 270px Width */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '270px', minWidth: '270px' }}>
          
          {/* Rep / Plank Counter Card */}
          <div className="glass-panel" style={{ padding: '12px', borderRadius: '14px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(6, 182, 212, 0.25)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
              {selectedExercise === 'Plank' ? 'Plank Hold Time' : `${currentExConfig.label} Reps`}
            </div>
            
            <div style={{ fontSize: '2.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#fff', margin: '2px 0', lineHeight: 1 }}>
              {selectedExercise === 'Plank' ? `${plankHoldSeconds}s` : repCount}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '6px' }}>
              <button 
                className="btn-secondary" 
                style={{ padding: '3px 8px', fontSize: '0.7rem' }} 
                onClick={() => { setRepCount(0); setPlankHoldSeconds(0); repStageRef.current = 'up'; }}
              >
                <RefreshCw size={11} /> Reset
              </button>
            </div>
          </div>

          {/* Form Alignment Score Meter */}
          <div className="glass-panel" style={{ padding: '12px', borderRadius: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 600 }}>Posture Score</span>
              <span style={{ fontSize: '0.92rem', fontWeight: 800, color: postureScore > 80 ? '#10b981' : '#f43f5e' }}>
                {postureScore}%
              </span>
            </div>
            <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${postureScore}%`, height: '100%', background: postureScore > 80 ? 'linear-gradient(90deg, #06b6d4, #10b981)' : 'linear-gradient(90deg, #f59e0b, #f43f5e)', transition: 'all 0.3s ease' }}></div>
            </div>
          </div>

          {/* Real-time AI Coach Feedback Card */}
          <div className="glass-panel" style={{
            padding: '12px', borderRadius: '14px',
            background: feedbackType === 'warn' ? 'rgba(244, 63, 94, 0.12)' : 'rgba(16, 185, 129, 0.12)',
            border: feedbackType === 'warn' ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: feedbackType === 'warn' ? '#f43f5e' : '#10b981', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {feedbackType === 'warn' ? <AlertCircle size={13} /> : <CheckCircle size={13} />} Form Coach
            </div>
            <div style={{ fontSize: '0.78rem', color: '#fff', fontWeight: 600, lineHeight: '1.3' }}>
              "{feedback}"
            </div>
          </div>

          {/* Workout Log Session Preview */}
          {workoutLog.length > 0 && (
            <div className="glass-panel" style={{ padding: '10px 12px', borderRadius: '14px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <History size={12} color="#22d3ee" /> Session Log
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {workoutLog.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', padding: '3px 6px', background: 'rgba(255,255,255,0.04)', borderRadius: '5px' }}>
                    <span style={{ fontWeight: 600 }}>{item.exercise} ({item.reps})</span>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>~{item.calories} kcal</span>
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
