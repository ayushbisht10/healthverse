import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Video, AlertCircle, CheckCircle, RefreshCw, Zap, Award, Activity, 
  Play, Square, Info, Volume2, VolumeX, History, Flame, ShieldAlert, Sparkles, Layers
} from 'lucide-react';
import { SupabaseDataEngine } from '../lib/supabase';

// ==========================================
// 10 EXERCISES BIOMECHANICAL ALGORITHMS CONFIG
// ==========================================
const EXERCISES_CONFIG = {
  Squats: {
    label: 'Squats',
    category: 'Lower Body',
    difficulty: 'Intermediate',
    caloriesPerRep: 0.32,
    description: 'Tracks Hip-Knee-Ankle vector angle & spine alignment. Count rep when knees flex below 100° and extend >160°.',
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
    description: 'Tracks Shoulder-Elbow-Wrist flexion & spine plank alignment. Count rep when elbows bend below 90° and extend >150°.',
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
    description: 'Tracks Shoulder-Elbow-Wrist arm flexion. Count rep when elbow flexes <50° and extends fully >150°.',
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
    category: 'Cardio Full Body',
    difficulty: 'Beginner',
    caloriesPerRep: 0.15,
    description: 'Tracks Overhead Arm angle (Wrist-Shoulder-Hip) & Leg spread. Rep counted when hands touch overhead >150°.',
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
    category: 'Legs & Glutes',
    difficulty: 'Intermediate',
    caloriesPerRep: 0.38,
    description: 'Tracks lead Hip-Knee-Ankle flexion. Count rep when front knee flexes <95° and returns straight >165°.',
    targetAngleJoints: ['hip', 'knee', 'ankle'],
    downThreshold: 95,
    upThreshold: 165,
    goodFeedback: 'Deep 90° lunge bend! Strong hip stability.',
    badFeedback: '⚠️ Warning: Step further forward and dip lower.',
    postureCheck: (spineAngle) => spineAngle >= 140,
    postureWarning: '⚠️ Keep torso vertical. Avoid leaning forward!'
  },
  OverheadPress: {
    label: 'Shoulder / Overhead Press',
    category: 'Shoulders & Arms',
    difficulty: 'Intermediate',
    caloriesPerRep: 0.35,
    description: 'Tracks Elbow-Shoulder-Hip & Shoulder-Elbow-Wrist lockout. Rep counted when arms lock out overhead >160°.',
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
    category: 'Abs & Core',
    difficulty: 'Advanced',
    caloriesPerRep: 0.28,
    description: 'Tracks lying Shoulder-Hip-Knee angle. Count rep when legs raise vertical >65° off ground and lower <25°.',
    targetAngleJoints: ['shoulder', 'hip', 'knee'],
    downThreshold: 25,
    upThreshold: 65,
    goodFeedback: 'Controlled abs contraction! Straight leg lift.',
    badFeedback: '⚠️ Warning: Raise legs higher toward vertical.',
    postureCheck: () => true, // Lying posture
    postureWarning: '⚠️ Keep lower back pressed firmly against ground.'
  },
  TricepDips: {
    label: 'Tricep Dips',
    category: 'Arms & Chest',
    difficulty: 'Intermediate',
    caloriesPerRep: 0.30,
    description: 'Tracks Shoulder-Elbow-Wrist flexion. Count rep when elbow flexes below 90° and extends >155°.',
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
    category: 'Cardio & Abs',
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
    label: 'Plank Hold & Alignment',
    category: 'Core & Stability',
    difficulty: 'Intermediate',
    caloriesPerRep: 0.05, // per second
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

// ==========================================
// VECTOR GEOMETRY UTILITIES
// ==========================================
function calculateAngle(a, b, c) {
  if (!a || !b || !c) return 0;
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  return Math.round(angle);
}

// Sound Synth Feedback Utility via Web Audio API
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
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, audioCtx.currentTime); // A3
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
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
  const [feedback, setFeedback] = useState('Stand in front of WebCam or start AI Simulation.');
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
  const simAngleRef = useRef(170);

  // Exercise config shortcut
  const currentExConfig = EXERCISES_CONFIG[selectedExercise];

  // Sound ref wrapper
  const triggerSound = (type) => {
    if (soundEnabled) playSoundCue(type);
  };

  // Plank hold timer
  useEffect(() => {
    let timer;
    if ((isCameraActive || isSimulating) && selectedExercise === 'Plank' && feedbackType === 'good') {
      timer = setInterval(() => {
        setPlankHoldSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCameraActive, isSimulating, selectedExercise, feedbackType]);

  // Reset exercise state on select
  const handleExerciseChange = (newEx) => {
    setSelectedExercise(newEx);
    setRepCount(0);
    setPlankHoldSeconds(0);
    repStageRef.current = 'up';
    setFeedback(`Selected ${EXERCISES_CONFIG[newEx].label}. Ready to detect!`);
    setFeedbackType('good');
    setPostureScore(98);
  };

  // ==========================================
  // REAL WEBCAM MEDIAPIPE TRACKING
  // ==========================================
  const startRealTimeTracking = async () => {
    stopTracking(); // Clear any running simulation/camera
    setSessionStartTime(Date.now());

    try {
      setDetectorStatus('Loading MediaPipe AI Engine...');

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
        setDetectorStatus('60 FPS MediaPipe AI Engine Active');

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
      console.error('Camera/MediaPipe initialization error:', err);
      setDetectorStatus('WebCam Access Failed. Switching to AI Simulation Mode!');
      setIsCameraActive(false);
      startAISimulation();
    }
  };

  // ==========================================
  // AI MOTION SIMULATOR (DEMO MODE)
  // ==========================================
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

      // Trigonometric skeleton motion physics generator
      frameCount++;
      const speed = 0.05;
      const progress = (Math.sin(frameCount * speed) + 1) / 2; // 0 to 1 smooth wave
      
      const angleRange = config.upThreshold - config.downThreshold;
      const simulatedAngle = Math.round(config.downThreshold + (progress * angleRange));
      
      // Build synthetic keypoint landmarks for skeleton visualization
      const syntheticLandmarks = createSyntheticPose(selectedExercise, simulatedAngle, w, h);

      processKeypointsAndDraw(syntheticLandmarks, ctx, w, h, simulatedAngle);

      animFrameIdRef.current = requestAnimationFrame(simLoop);
    };
    simLoop();
  };

  // ==========================================
  // SYNTHETIC KEYPOINT GENERATOR FOR SIMULATION
  // ==========================================
  const createSyntheticPose = (exercise, angle, w, h) => {
    // Generate normalized 0-1 coordinates for joints
    const cX = 0.5;
    const normAngle = (angle - 30) / 150; // normalized height flex
    
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
      // Horizontal body orientation
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

  // ==========================================
  // CORE POSE PROCESSING & SKELETON RENDERER
  // ==========================================
  const processKeypointsAndDraw = (landmarks, ctx, w, h, forcedAngle = null) => {
    // Map MediaPipe Landmark Indices
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

      // Pick whichever side has higher visibility
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

    // Draw Skeleton Connections
    const connections = [
      [11, 12], [11, 13], [13, 15], [12, 14], [14, 16], // Upper Body
      [11, 23], [12, 24], [23, 24],                    // Torso
      [23, 25], [25, 27], [24, 26], [26, 28]             // Legs
    ];

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 4;
    ctx.shadowColor = 'rgba(6, 182, 212, 0.6)';
    ctx.shadowBlur = 10;

    connections.forEach(([i, j]) => {
      if (landmarks[i] && landmarks[j] && (landmarks[i].visibility > 0.3 || isSimulating)) {
        ctx.beginPath();
        ctx.moveTo(landmarks[i].x * w, landmarks[i].y * h);
        ctx.lineTo(landmarks[j].x * w, landmarks[j].y * h);
        ctx.stroke();
      }
    });

    // Draw Joint Points
    landmarks.forEach((lm) => {
      if (lm && (lm.visibility > 0.35 || isSimulating)) {
        ctx.beginPath();
        ctx.arc(lm.x * w, lm.y * h, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 12;
        ctx.fill();
      }
    });
    ctx.shadowBlur = 0; // reset

    // Vector Calculations for Exercise Angle
    const config = EXERCISES_CONFIG[selectedExercise];
    const [j1Name, j2Name, j3Name] = config.targetAngleJoints;

    const p1 = getBestPoint(j1Name);
    const p2 = getBestPoint(j2Name);
    const p3 = getBestPoint(j3Name);

    // Spine Angle for Posture Verification (Shoulder - Hip - Ankle)
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

      // Render Angle Text on Canvas (Un-mirrored matrix reset)
      ctx.save();
      ctx.fillStyle = isPostureValid ? '#22d3ee' : '#f43f5e';
      ctx.font = 'bold 22px Inter, sans-serif';
      const vertexPt = p2 || { x: w / 2, y: h / 2 };
      ctx.fillText(`${angle}°`, vertexPt.x + 15, vertexPt.y);
      ctx.restore();

      // State Machine Rep Logic
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
              // Save completed set milestone
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

  // Stop tracking
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

    // Save final workout log if reps were done
    if (repCount > 0) {
      logWorkoutSession(selectedExercise, repCount);
    }
  };

  // Save Workout Session Log
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

    setWorkoutLog(prev => [newEntry, ...prev.slice(0, 4)]);
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Panel */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Real-Time Exercise CV Rep & Posture AI</h2>
            <span style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              10 Exercises Biomechanics
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Vector joint geometry tracking, strict form posture validation, and real-time audio coaching feedback.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          <button 
            className="btn-secondary" 
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute Audio Cues' : 'Enable Audio Cues'}
            style={{ padding: '10px 14px' }}
          >
            {soundEnabled ? <Volume2 size={18} color="#10b981" /> : <VolumeX size={18} color="#f43f5e" />}
          </button>

          <button 
            className={isSimulating ? 'btn-secondary' : 'btn-secondary'} 
            onClick={isSimulating ? stopTracking : startAISimulation}
            style={{ borderColor: isSimulating ? '#22d3ee' : 'var(--border-color)', color: isSimulating ? '#22d3ee' : '#fff' }}
          >
            <Sparkles size={16} color="#22d3ee" />
            {isSimulating ? 'Stop AI Demo' : 'AI Motion Simulator'}
          </button>

          <button 
            className={isCameraActive ? 'btn-secondary' : 'btn-primary'} 
            onClick={isCameraActive ? stopTracking : startRealTimeTracking}
          >
            {isCameraActive ? <Square size={16} color="#f43f5e" /> : <Play size={16} />}
            {isCameraActive ? 'Stop Vision Tracking' : 'Start WebCam AI Vision'}
          </button>
        </div>
      </div>

      {/* 10 Exercises Selector Bar */}
      <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: '18px', display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'thin' }}>
        {Object.keys(EXERCISES_CONFIG).map(exKey => {
          const isSelected = selectedExercise === exKey;
          const ex = EXERCISES_CONFIG[exKey];
          return (
            <button
              key={exKey}
              onClick={() => handleExerciseChange(exKey)}
              style={{
                padding: '10px 16px',
                borderRadius: '14px',
                border: isSelected ? '1px solid #06b6d4' : '1px solid var(--border-color)',
                background: isSelected ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(15, 23, 42, 0.9) 100%)' : 'var(--bg-input)',
                color: isSelected ? '#fff' : 'var(--text-muted)',
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{ex.label}</span>
              <span style={{ fontSize: '0.68rem', padding: '2px 6px', borderRadius: '6px', background: isSelected ? '#06b6d4' : 'rgba(255,255,255,0.08)', color: '#fff' }}>
                {ex.category}
              </span>
            </button>
          );
        })}
      </div>

      {/* Info Banner for Selected Exercise Biomechanics */}
      <div className="glass-panel" style={{ padding: '14px 20px', borderRadius: '16px', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Info size={20} color="#22d3ee" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <strong style={{ color: '#22d3ee' }}>{currentExConfig.label} Algorithm: </strong>
          {currentExConfig.description} (Target: {currentExConfig.downThreshold}° to {currentExConfig.upThreshold}°)
        </div>
      </div>

      {/* Main Vision Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '20px' }}>
        
        {/* Real-Time Video & Skeleton Overlay Canvas */}
        <div className="glass-panel" style={{
          borderRadius: '24px', position: 'relative', overflow: 'hidden', height: '480px', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center'
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
              <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', padding: '6px 14px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', border: '1px solid rgba(6, 182, 212, 0.4)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isSimulating ? '#22d3ee' : '#10b981', boxShadow: isSimulating ? '0 0 10px #22d3ee' : '0 0 10px #10b981' }}></span>
                {detectorStatus}
              </div>

              {/* Live Joint Angle Floating Meter */}
              {currentAngle > 0 && (
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.8)', padding: '8px 16px', borderRadius: '14px', fontSize: '0.88rem', color: '#22d3ee', fontWeight: 700, border: '1px solid rgba(6, 182, 212, 0.4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={16} color="#22d3ee" />
                  Live Joint Angle: <span style={{ fontSize: '1.1rem', color: '#fff' }}>{currentAngle}°</span>
                </div>
              )}
            </div>

          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>
              <Camera size={64} color="var(--primary)" style={{ opacity: 0.5, marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
                WebCam & AI Motion Detection Ready
              </h3>
              <p style={{ fontSize: '0.88rem', maxWidth: '400px', margin: '0 auto 20px' }}>
                Select an exercise from above and start WebCam AI Vision or test with AI Motion Simulator.
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button className="btn-primary" onClick={startRealTimeTracking}>
                  <Play size={16} /> Activate Camera Vision
                </button>
                <button className="btn-secondary" onClick={startAISimulation}>
                  <Sparkles size={16} color="#22d3ee" /> Test AI Simulator
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Dashboard Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Rep / Plank Counter Card */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
              {selectedExercise === 'Plank' ? 'Plank Hold Time' : `${currentExConfig.label} Reps`}
            </div>
            
            <div style={{ fontSize: '4.5rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#fff', margin: '4px 0', lineHeight: 1 }}>
              {selectedExercise === 'Plank' ? `${plankHoldSeconds}s` : repCount}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
              <button 
                className="btn-secondary" 
                style={{ padding: '6px 14px', fontSize: '0.78rem' }} 
                onClick={() => { setRepCount(0); setPlankHoldSeconds(0); repStageRef.current = 'up'; }}
              >
                <RefreshCw size={14} /> Reset Counter
              </button>
            </div>
          </div>

          {/* Form Alignment Score Meter */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Posture Alignment Score</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: postureScore > 80 ? '#10b981' : '#f43f5e' }}>
                {postureScore}%
              </span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${postureScore}%`, height: '100%', background: postureScore > 80 ? 'linear-gradient(90deg, #06b6d4, #10b981)' : 'linear-gradient(90deg, #f59e0b, #f43f5e)', transition: 'all 0.3s ease' }}></div>
            </div>
          </div>

          {/* Real-time AI Coach Feedback Card */}
          <div className="glass-panel" style={{
            padding: '20px', borderRadius: '20px',
            background: feedbackType === 'warn' ? 'rgba(244, 63, 94, 0.12)' : 'rgba(16, 185, 129, 0.12)',
            border: feedbackType === 'warn' ? '1px solid rgba(244, 63, 94, 0.35)' : '1px solid rgba(16, 185, 129, 0.35)'
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: feedbackType === 'warn' ? '#f43f5e' : '#10b981', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {feedbackType === 'warn' ? <AlertCircle size={16} /> : <CheckCircle size={16} />} Real-Time Form Coach
            </div>
            <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600, lineHeight: '1.4' }}>
              "{feedback}"
            </div>
          </div>

          {/* Workout Log Session Preview */}
          {workoutLog.length > 0 && (
            <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: '20px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <History size={15} color="#22d3ee" /> Session Rep Log History
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {workoutLog.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', padding: '6px 10px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px' }}>
                    <span style={{ fontWeight: 600 }}>{item.exercise} ({item.reps} reps)</span>
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
