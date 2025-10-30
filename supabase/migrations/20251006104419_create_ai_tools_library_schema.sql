/*
  # AI Tools Library Database Schema

  ## Overview
  This migration creates the complete database schema for an AI Tools Library platform
  where users can explore, compare, and save AI tools.

  ## New Tables

  ### 1. `profiles`
  - Extends auth.users with additional profile information
  - `id` (uuid, primary key, references auth.users)
  - `email` (text)
  - `full_name` (text)
  - `avatar_url` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `ai_tools`
  - Stores information about AI tools/models
  - `id` (uuid, primary key)
  - `name` (text) - Tool name
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Short description
  - `long_description` (text) - Detailed description
  - `logo_url` (text) - Tool logo/icon
  - `category` (text) - e.g., "Chatbot", "Image Generator", "Code Assistant"
  - `rating` (numeric) - Average rating (0-5)
  - `total_ratings` (integer) - Number of ratings
  - `api_endpoint` (text) - API endpoint for testing (optional)
  - `is_featured` (boolean) - Featured tool flag
  - `is_new` (boolean) - New release flag
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `favorites`
  - Stores user's favorite AI tools
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `tool_id` (uuid, references ai_tools)
  - `created_at` (timestamptz)
  - Unique constraint on (user_id, tool_id)

  ### 4. `comparisons`
  - Stores comparison sessions for tracking
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles, nullable for anonymous)
  - `prompt` (text) - User's test prompt
  - `tool_ids` (uuid[]) - Array of tool IDs being compared
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Profiles: Users can read all profiles, but only update their own
  - AI Tools: Public read access, no write access (admin-managed)
  - Favorites: Users can only access their own favorites
  - Comparisons: Users can only access their own comparisons

  ## Important Notes
  1. Data safety: All operations use IF NOT EXISTS/IF EXISTS
  2. Default values provided for all appropriate columns
  3. Indexes added for frequently queried columns
  4. Foreign key constraints ensure referential integrity
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text DEFAULT '',
  avatar_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ai_tools table
CREATE TABLE IF NOT EXISTS ai_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL DEFAULT '',
  long_description text DEFAULT '',
  logo_url text DEFAULT '',
  category text NOT NULL DEFAULT 'Other',
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  total_ratings integer DEFAULT 0,
  api_endpoint text DEFAULT '',
  is_featured boolean DEFAULT false,
  is_new boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tool_id uuid NOT NULL REFERENCES ai_tools(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tool_id)
);

-- Create comparisons table
CREATE TABLE IF NOT EXISTS comparisons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  prompt text NOT NULL,
  tool_ids uuid[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_ai_tools_category ON ai_tools(category);
CREATE INDEX IF NOT EXISTS idx_ai_tools_featured ON ai_tools(is_featured);
CREATE INDEX IF NOT EXISTS idx_ai_tools_new ON ai_tools(is_new);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_tool_id ON favorites(tool_id);
CREATE INDEX IF NOT EXISTS idx_comparisons_user_id ON comparisons(user_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparisons ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Anyone can view profiles"
  ON profiles FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- AI Tools policies (public read, no write)
CREATE POLICY "Anyone can view AI tools"
  ON ai_tools FOR SELECT
  TO authenticated, anon
  USING (true);

-- Favorites policies
CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add own favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Comparisons policies
CREATE POLICY "Users can view own comparisons"
  ON comparisons FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create comparisons"
  ON comparisons FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Insert sample AI tools data
INSERT INTO ai_tools (name, slug, description, long_description, category, rating, total_ratings, is_featured, is_new) VALUES
  ('GPT-4', 'gpt-4', 'Advanced language model for natural conversations', 'GPT-4 is OpenAI''s most advanced language model, capable of understanding and generating human-like text across a wide range of topics and tasks.', 'Chatbot', 4.8, 15420, true, false),
  ('Claude AI', 'claude-ai', 'Helpful, harmless, and honest AI assistant', 'Claude is an AI assistant created by Anthropic that excels at analysis, writing, coding, and thoughtful conversation.', 'Chatbot', 4.7, 8930, true, false),
  ('DALL-E 3', 'dalle-3', 'Create realistic images from text descriptions', 'DALL-E 3 generates high-quality images from detailed text prompts, perfect for creative projects and visual content.', 'Image Generator', 4.6, 12340, true, false),
  ('Midjourney', 'midjourney', 'AI art generation with stunning quality', 'Midjourney creates beautiful, artistic images with a unique aesthetic style perfect for creative professionals.', 'Image Generator', 4.9, 18750, true, false),
  ('GitHub Copilot', 'github-copilot', 'AI pair programmer for faster coding', 'GitHub Copilot suggests code and entire functions in real-time, helping developers code faster and more efficiently.', 'Code Assistant', 4.5, 9870, true, false),
  ('Stable Diffusion', 'stable-diffusion', 'Open-source image generation model', 'Stable Diffusion is a powerful open-source model for generating images from text, with full control and customization.', 'Image Generator', 4.4, 7650, false, false),
  ('ChatGPT', 'chatgpt', 'Conversational AI for everyday tasks', 'ChatGPT helps with writing, learning, brainstorming, and problem-solving through natural conversation.', 'Chatbot', 4.7, 22100, true, false),
  ('Bard', 'bard', 'Google''s experimental conversational AI', 'Bard is Google''s AI chatbot that can help with creative and practical tasks, powered by advanced language models.', 'Chatbot', 4.3, 6540, false, true),
  ('Jasper AI', 'jasper-ai', 'AI content writer for marketing', 'Jasper AI specializes in creating marketing copy, blog posts, and social media content with brand consistency.', 'Content Writer', 4.4, 5320, false, false),
  ('Synthesia', 'synthesia', 'AI video generation with avatars', 'Synthesia creates professional videos with AI avatars, perfect for training, marketing, and presentations.', 'Video Generator', 4.5, 4210, false, true),
  ('RunwayML', 'runwayml', 'AI tools for video editing and effects', 'RunwayML provides cutting-edge AI tools for video editing, including background removal and style transfer.', 'Video Generator', 4.6, 3890, false, true),
  ('Tabnine', 'tabnine', 'AI code completion for developers', 'Tabnine provides intelligent code completions based on your coding patterns and best practices.', 'Code Assistant', 4.3, 7120, false, false)
ON CONFLICT (slug) DO NOTHING;