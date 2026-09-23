import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Video, AlertCircle, CheckCircle, RefreshCw, Zap, Award, Activity, 
  Play, Square, Info, Volume2, VolumeX, History, Flame, ShieldAlert, Sparkles, Layers, UserCheck
} from 'lucide-react';

// ==========================================
// 10 EXERCISES BIOMECHANICAL ALGORITHMS CONFIG
// ==========================================
const EXERCISES_CONFIG = {
  Squats: {
    id: 1,
    label: 'Squats',
    category: 'Lower Body',
    difficulty: 'Intermediate',
    caloriesPerRep: 0.32,
    demoVideo: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-in-a-gym-43336-large.mp4',
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
    id: 2,
    label: 'Push-ups',
    category: 'Chest & Core',
    difficulty: 'Intermediate',
    caloriesPerRep: 0.45,
    demoVideo: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-doing-push-ups-in-a-gym-43337-large.mp4',
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
    id: 3,
    label: 'Bicep Curls',
    category: 'Arms',
    difficulty: 'Beginner',
    caloriesPerRep: 0.20,
    demoVideo: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-dumbbells-and-doing-bicep-curls-43340-large.mp4',
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
    id: 4,
    label: 'Jumping Jacks',
    category: 'Cardio',
    difficulty: 'Beginner',
    caloriesPerRep: 0.15,
    demoVideo: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-in-a-gym-43336-large.mp4',
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
    id: 5,
    label: 'Forward Lunges',
    category: 'Legs',
    difficulty: 'Intermediate',
    caloriesPerRep: 0.38,
    demoVideo: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-doing-lunges-in-a-gym-43338-large.mp4',
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
    id: 6,
    label: 'Shoulder Press',
    category: 'Shoulders',
    difficulty: 'Intermediate',
    caloriesPerRep: 0.35,
    demoVideo: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-dumbbells-and-doing-bicep-curls-43340-large.mp4',
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
    id: 7,
    label: 'Lying Leg Raises',
    category: 'Abs',
    difficulty: 'Advanced',
    caloriesPerRep: 0.28,
    demoVideo: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-doing-push-ups-in-a-gym-43337-large.mp4',
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
    id: 8,
    label: 'Tricep Dips',
    category: 'Arms',
    difficulty: 'Intermediate',
    caloriesPerRep: 0.30,
    demoVideo: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-doing-push-ups-in-a-gym-43337-large.mp4',
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
    id: 9,
    label: 'High Knees',
    category: 'Cardio',
    difficulty: 'Beginner',
    caloriesPerRep: 0.12,
    demoVideo: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-in-a-gym-43336-large.mp4',
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
    id: 10,
    label: 'Plank Hold',
    category: 'Core',
    difficulty: 'Intermediate',
    caloriesPerRep: 0.05,
    demoVideo: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-doing-push-ups-in-a-gym-43337-large.mp4',
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
  const [isHumanDemoActive, setIsHumanDemoActive] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState('Squats');
  const [repCount, setRepCount] = useState(0);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [postureScore, setPostureScore] = useState(98);
  const [feedback, setFeedback] = useState('Select an exercise & start WebCam or Real Human Demo.');
  const [feedbackType, setFeedbackType] = useState('good');
  const [detectorStatus, setDetectorStatus] = useState('Idle');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [workoutLog, setWorkoutLog] = useState([]);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [plankHoldSeconds, setPlankHoldSeconds] = useState(0);

  const videoRef = useRef(null);
  const demoVideoRef = useRef(null);
  const canvasRef = useRef(null);
  const repStageRef = useRef('up');
  const detectorRef = useRef(null);
  const animFrameIdRef = useRef(null);

  const currentExConfig = EXERCISES_CONFIG[selectedExercise];

  const triggerSound = (type) => {
    if (soundEnabled) playSoundCue(type);
  };

  // Plank hold timer
  useEffect(() => {
    let timer;
    if ((isCameraActive || isHumanDemoActive) && selectedExercise === 'Plank' && feedbackType === 'good') {
      timer = setInterval(() => {
        setPlankHoldSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCameraActive, isHumanDemoActive, selectedExercise, feedbackType]);

  // REAL HUMAN DEMO VIDEO TRACKING ENGINE (MediaPipe AI processes real human video frames!)
  useEffect(() => {
    if (!isHumanDemoActive) return;

    let animId;
    let poseEngine;
    let isCancelled = false;

    const startHumanDemoProcessing = async () => {
      setDetectorStatus('Loading MediaPipe AI for Real Human Video...');

      if (!window.Pose) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      if (isCancelled) return;

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
        if (!canvasRef.current || !demoVideoRef.current || isCancelled) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const video = demoVideoRef.current;
        const videoWidth = video.videoWidth || 640;
        const videoHeight = video.videoHeight || 480;

        canvas.width = videoWidth;
        canvas.height = videoHeight;
        ctx.clearRect(0, 0, videoWidth, videoHeight);

        if (results.poseLandmarks) {
          processKeypointsAndDraw(results.poseLandmarks, ctx, videoWidth, videoHeight);
        }
      });

      poseEngine = pose;
      detectorRef.current = pose;
      setDetectorStatus('Real Human AI Pose Detector Active');

      // Video frame loop
      const processDemoFrame = async () => {
        if (demoVideoRef.current && poseEngine && !demoVideoRef.current.paused && !demoVideoRef.current.ended && !isCancelled) {
          try {
            await poseEngine.send({ image: demoVideoRef.current });
          } catch (err) {
            console.warn('Demo frame warning:', err);
          }
        }
        if (!isCancelled) {
          animId = requestAnimationFrame(processDemoFrame);
        }
      };

      processDemoFrame();
    };

    startHumanDemoProcessing();

    return () => {
      isCancelled = true;
      if (animId) cancelAnimationFrame(animId);
      if (poseEngine) poseEngine.close();
    };
  }, [isHumanDemoActive, selectedExercise]);

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
        setIsHumanDemoActive(false);

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
        setDetectorStatus('MediaPipe WebCam Vision Active');

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
      setDetectorStatus('WebCam Unavailable -> Real Human Demo Video Active');
      setIsCameraActive(false);
      startHumanDemoVideo();
    }
  };

  const startHumanDemoVideo = () => {
    stopTracking();
    setIsCameraActive(false);
    setIsHumanDemoActive(true);
    setSessionStartTime(Date.now());
    setDetectorStatus('Real Human Demo Video AI Tracking Active');
    setFeedback(`Real Human AI Pose Analysis running for ${EXERCISES_CONFIG[selectedExercise].label}!`);
    setFeedbackType('good');
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

    // Glow Skeleton Lines on Real Human Body
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 4;
    ctx.shadowColor = 'rgba(6, 182, 212, 0.8)';
    ctx.shadowBlur = 12;

    connections.forEach(([i, j]) => {
      if (landmarks[i] && landmarks[j] && landmarks[i].visibility > 0.3) {
        ctx.beginPath();
        ctx.moveTo(landmarks[i].x * w, landmarks[i].y * h);
        ctx.lineTo(landmarks[j].x * w, landmarks[j].y * h);
        ctx.stroke();
      }
    });

    // Draw Joint Nodes
    landmarks.forEach((lm) => {
      if (lm && lm.visibility > 0.35) {
        ctx.beginPath();
        ctx.arc(lm.x * w, lm.y * h, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 14;
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
      ctx.font = 'bold 22px Inter, sans-serif';
      const vertexPt = p2 || { x: w / 2, y: h / 2 };
      ctx.fillText(`${angle}°`, vertexPt.x + 12, vertexPt.y);
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
            setFeedback(`✅ Perfect Form Rep Counted! Total: ${repCount + 1}`);
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
    setIsHumanDemoActive(false);
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
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
      
      {/* Header Panel */}
      <div className="glass-panel" style={{ padding: '10px 14px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', width: '100%', minWidth: 0 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Real-Time Exercise CV Rep & Posture AI</h2>
            <span style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', padding: '2px 8px', borderRadius: '12px', fontSize: '0.68rem', fontWeight: 700, border: '1px solid rgba(6, 182, 212, 0.3)' }}>
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
            onClick={isHumanDemoActive ? stopTracking : startHumanDemoVideo}
            style={{ borderColor: isHumanDemoActive ? '#22d3ee' : 'var(--border-color)', color: isHumanDemoActive ? '#22d3ee' : '#fff', padding: '6px 12px', fontSize: '0.78rem' }}
          >
            <UserCheck size={14} color="#22d3ee" />
            {isHumanDemoActive ? 'Stop Human Demo' : 'Real Human Demo Video AI'}
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

      {/* ALL 10 EXERCISES IN MULTI-LINE FLEX WRAP GRID */}
      <div className="glass-panel" style={{ padding: '10px 14px', borderRadius: '14px', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
        <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Layers size={13} color="#22d3ee" /> Select Exercise (All 10 Available Below):
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', width: '100%' }}>
          {Object.keys(EXERCISES_CONFIG).map(exKey => {
            const isSelected = selectedExercise === exKey;
            const ex = EXERCISES_CONFIG[exKey];
            return (
              <button
                key={exKey}
                onClick={() => handleExerciseChange(exKey)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '10px',
                  border: isSelected ? '1.5px solid #06b6d4' : '1px solid var(--border-color)',
                  background: isSelected ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.3) 0%, rgba(15, 23, 42, 0.95) 100%)' : 'rgba(15, 23, 42, 0.6)',
                  color: isSelected ? '#fff' : 'var(--text-muted)',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 0 12px rgba(6, 182, 212, 0.3)' : 'none'
                }}
              >
                <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: isSelected ? '#06b6d4' : 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.65rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {ex.id}
                </span>
                <span>{ex.label}</span>
                <span style={{ fontSize: '0.62rem', padding: '1px 5px', borderRadius: '4px', background: isSelected ? 'rgba(6, 182, 212, 0.4)' : 'rgba(255,255,255,0.08)', color: '#fff' }}>
                  {ex.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Info Banner for Selected Exercise */}
      <div className="glass-panel" style={{ padding: '8px 14px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', minWidth: 0 }}>
        <Info size={15} color="#22d3ee" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
          <strong style={{ color: '#22d3ee' }}>Exercise #{EXERCISES_CONFIG[selectedExercise].id} - {currentExConfig.label} Algorithm: </strong>
          {currentExConfig.description}
        </div>
      </div>

      {/* Main Vision Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 260px', gap: '10px', width: '100%', minWidth: 0 }}>
        
        {/* Real-Time Video & Canvas Overlay Area */}
        <div className="glass-panel" style={{
          borderRadius: '16px', position: 'relative', overflow: 'hidden', height: 'clamp(280px, 42vh, 340px)', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minWidth: 0
        }}>
          {(isCameraActive || isHumanDemoActive) ? (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              
              {/* WebCam Video */}
              <video
                ref={videoRef}
                playsInline
                muted
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transform: 'scaleX(-1)',
                  display: isCameraActive ? 'block' : 'none'
                }}
              />

              {/* Real Human Demo Video Loop */}
              <video
                ref={demoVideoRef}
                src={currentExConfig.demoVideo}
                autoPlay
                loop
                muted
                playsInline
                crossOrigin="anonymous"
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  display: isHumanDemoActive ? 'block' : 'none'
                }}
              />

              {/* Canvas Overlay for Joints & Vector Angles */}
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
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isHumanDemoActive ? '#22d3ee' : '#10b981', boxShadow: isHumanDemoActive ? '0 0 6px #22d3ee' : '0 0 6px #10b981' }}></span>
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
                Real Human Video & WebCam AI Ready
              </h3>
              <p style={{ fontSize: '0.76rem', maxWidth: '340px', margin: '0 auto 12px', color: 'var(--text-muted)' }}>
                Watch a real human perform workouts with live MediaPipe AI joint angle tracking overlay, or use your WebCam.
              </p>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button className="btn-primary" onClick={startRealTimeTracking} style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                  <Play size={13} /> Activate Camera
                </button>
                <button className="btn-secondary" onClick={startHumanDemoVideo} style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                  <UserCheck size={13} color="#22d3ee" /> Real Human Demo Video AI
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Dashboard Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '260px', minWidth: '260px' }}>
          
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
