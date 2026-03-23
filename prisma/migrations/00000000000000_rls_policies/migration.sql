-- Row Level Security Policies for Supabase
-- Run this after Prisma migrations in Supabase SQL Editor

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE offices ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE open_houses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE offline_sync_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE lookup_values ENABLE ROW LEVEL SECURITY;

-- Public read access for active listings
CREATE POLICY "Public can view active listings" ON listings
  FOR SELECT USING (status = 'ACTIVE');

-- Public can view media for active listings
CREATE POLICY "Public can view listing media" ON media
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM listings WHERE listings.id = media.listing_id AND listings.status = 'ACTIVE')
  );

-- Public can view listing features for active listings
CREATE POLICY "Public can view listing features" ON listing_features
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM listings WHERE listings.id = listing_features.listing_id AND listings.status = 'ACTIVE')
  );

-- Public can view open houses for active listings
CREATE POLICY "Public can view open houses" ON open_houses
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM listings WHERE listings.id = open_houses.listing_id AND listings.status = 'ACTIVE')
  );

-- Public can view agents
CREATE POLICY "Public can view agents" ON users
  FOR SELECT USING (true);

-- Public can view offices
CREATE POLICY "Public can view offices" ON offices
  FOR SELECT USING (true);

-- Public can view lookup values
CREATE POLICY "Public can view lookup values" ON lookup_values
  FOR SELECT USING (true);

-- Agents can manage their own listings
CREATE POLICY "Agents manage own listings" ON listings
  FOR ALL USING (auth.uid()::text = agent_id);

-- Agents can manage media for their listings
CREATE POLICY "Agents manage own listing media" ON media
  FOR ALL USING (
    EXISTS (SELECT 1 FROM listings WHERE listings.id = media.listing_id AND listings.agent_id = auth.uid()::text)
  );

-- Brokers and Super Admins can manage all listings
CREATE POLICY "Brokers manage all listings" ON listings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid()::text AND users.role IN ('BROKER', 'SUPER_ADMIN'))
  );

-- Agents can view their own leads
CREATE POLICY "Agents view own leads" ON lead_submissions
  FOR SELECT USING (agent_id = auth.uid()::text);

-- Brokers can view all leads
CREATE POLICY "Brokers view all leads" ON lead_submissions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid()::text AND users.role IN ('BROKER', 'SUPER_ADMIN'))
  );

-- Anyone can submit leads (for contact forms)
CREATE POLICY "Anyone can submit leads" ON lead_submissions
  FOR INSERT WITH CHECK (true);

-- Agents manage their own sync queue
CREATE POLICY "Agents manage own sync queue" ON offline_sync_queue
  FOR ALL USING (agent_id = auth.uid()::text);

-- Users can update their own profile
CREATE POLICY "Users update own profile" ON users
  FOR UPDATE USING (id = auth.uid()::text);
