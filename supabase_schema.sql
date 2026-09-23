-- HealthVerse Supabase Production Database Schema
-- Designed for High-Traffic Heavy Concurrency & Real-Time Sync

-- 1. Profiles Table (Users & Admins)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'user', -- 'user' | 'admin'
  avatar_url TEXT,
  membership_plan TEXT DEFAULT 'VIP Platinum',
  weight NUMERIC(5,2) DEFAULT 72.5,
  height NUMERIC(5,2) DEFAULT 175.0,
  fitness_goal TEXT DEFAULT 'Muscle Gain / Hypertrophy',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Biometric Logs Table (High-Throughput Vitals & Fitness Entries)
CREATE TABLE IF NOT EXISTS public.biometric_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL, -- 'Body Weight', 'Active Calorie Burn', 'Water Intake'
  metric_value TEXT NOT NULL,
  context_note TEXT,
  logged_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Computer Vision Telemetry Table (MediaPipe 60 FPS Keypoints Log)
CREATE TABLE IF NOT EXISTS public.cv_telemetry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  exercise_type TEXT NOT NULL, -- 'Squats', 'Pushups', 'Bicep Curls'
  completed_reps INT DEFAULT 0,
  posture_score INT DEFAULT 95,
  ai_feedback TEXT,
  session_date TIMESTAMPTZ DEFAULT NOW()
);

-- 4. AI Workout & Diet Plans Table
CREATE TABLE IF NOT EXISTS public.ai_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_title TEXT NOT NULL,
  goal TEXT NOT NULL,
  daily_calories INT NOT NULL,
  routine_json JSONB NOT NULL,
  macros_json JSONB NOT NULL,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Gym Memberships & Facility Check-Ins Table
CREATE TABLE IF NOT EXISTS public.gym_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  facility_name TEXT DEFAULT 'HealthVerse Main Gym',
  checked_in_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.biometric_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cv_telemetry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_plans ENABLE ROW LEVEL SECURITY;

-- High-Performance Indexes for Concurrency
CREATE INDEX IF NOT EXISTS idx_biometric_logs_user ON public.biometric_logs(user_id, logged_at DESC);
CREATE INDEX IF NOT EXISTS idx_cv_telemetry_user ON public.cv_telemetry(user_id, session_date DESC);
