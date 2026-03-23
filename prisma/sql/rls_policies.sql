-- ============================================================
-- Row Level Security Policies for Big Valley Properties
-- Run AFTER Prisma migration creates the tables.
-- Requires Supabase with auth.uid() available.
-- ============================================================

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

-- ─── Users ──────────────────────────────────────────────────

-- Agents can read all users (for team directory)
CREATE POLICY "users_select_authenticated" ON users
  FOR SELECT USING (auth.role() = 'authenticated');

-- Users can update their own profile
CREATE POLICY "users_update_own" ON users
  FOR UPDATE USING ("authId" = auth.uid()::text);

-- Brokers/Super Admins can update any user
CREATE POLICY "users_update_admin" ON users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u."authId" = auth.uid()::text AND u.role IN ('BROKER', 'SUPER_ADMIN')
    )
  );

-- ─── Offices ────────────────────────────────────────────────

-- Public read
CREATE POLICY "offices_select_public" ON offices
  FOR SELECT USING (true);

-- ─── Listings ───────────────────────────────────────────────

-- Public: only ACTIVE listings, private fields handled at API layer
CREATE POLICY "listings_select_public" ON listings
  FOR SELECT USING (status = 'ACTIVE');

-- Authenticated agents: read own listings (any status)
CREATE POLICY "listings_select_own" ON listings
  FOR SELECT USING (
    "agentId" IN (SELECT id FROM users WHERE "authId" = auth.uid()::text)
  );

-- Brokers/Super Admins: read all listings
CREATE POLICY "listings_select_admin" ON listings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u."authId" = auth.uid()::text AND u.role IN ('BROKER', 'SUPER_ADMIN')
    )
  );

-- Agents can insert their own listings
CREATE POLICY "listings_insert_own" ON listings
  FOR INSERT WITH CHECK (
    "agentId" IN (SELECT id FROM users WHERE "authId" = auth.uid()::text)
  );

-- Agents can update their own listings (not ACTIVE — requires broker)
CREATE POLICY "listings_update_own" ON listings
  FOR UPDATE USING (
    "agentId" IN (SELECT id FROM users WHERE "authId" = auth.uid()::text)
    AND status NOT IN ('ACTIVE', 'SOLD')
  );

-- Brokers can update any listing (approve, status change)
CREATE POLICY "listings_update_admin" ON listings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u."authId" = auth.uid()::text AND u.role IN ('BROKER', 'SUPER_ADMIN')
    )
  );

-- ─── Media ──────────────────────────────────────────────────

-- Public: media for active listings
CREATE POLICY "media_select_public" ON media
  FOR SELECT USING (
    "listingId" IN (SELECT id FROM listings WHERE status = 'ACTIVE')
  );

-- Agents: media for own listings
CREATE POLICY "media_select_own" ON media
  FOR SELECT USING (
    "listingId" IN (
      SELECT l.id FROM listings l
      JOIN users u ON l."agentId" = u.id
      WHERE u."authId" = auth.uid()::text
    )
  );

-- Agents can insert media for own listings
CREATE POLICY "media_insert_own" ON media
  FOR INSERT WITH CHECK (
    "listingId" IN (
      SELECT l.id FROM listings l
      JOIN users u ON l."agentId" = u.id
      WHERE u."authId" = auth.uid()::text
    )
  );

-- Agents can update/delete media for own listings
CREATE POLICY "media_update_own" ON media
  FOR UPDATE USING (
    "listingId" IN (
      SELECT l.id FROM listings l
      JOIN users u ON l."agentId" = u.id
      WHERE u."authId" = auth.uid()::text
    )
  );

CREATE POLICY "media_delete_own" ON media
  FOR DELETE USING (
    "listingId" IN (
      SELECT l.id FROM listings l
      JOIN users u ON l."agentId" = u.id
      WHERE u."authId" = auth.uid()::text
    )
  );

-- ─── Listing Features ──────────────────────────────────────

CREATE POLICY "listing_features_select_public" ON listing_features
  FOR SELECT USING (
    "listingId" IN (SELECT id FROM listings WHERE status = 'ACTIVE')
  );

CREATE POLICY "listing_features_select_own" ON listing_features
  FOR SELECT USING (
    "listingId" IN (
      SELECT l.id FROM listings l JOIN users u ON l."agentId" = u.id WHERE u."authId" = auth.uid()::text
    )
  );

CREATE POLICY "listing_features_insert_own" ON listing_features
  FOR INSERT WITH CHECK (
    "listingId" IN (
      SELECT l.id FROM listings l JOIN users u ON l."agentId" = u.id WHERE u."authId" = auth.uid()::text
    )
  );

-- ─── Status History ────────────────────────────────────────

CREATE POLICY "status_history_select_own" ON listing_status_history
  FOR SELECT USING (
    "listingId" IN (
      SELECT l.id FROM listings l JOIN users u ON l."agentId" = u.id WHERE u."authId" = auth.uid()::text
    )
  );

CREATE POLICY "status_history_select_admin" ON listing_status_history
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users u WHERE u."authId" = auth.uid()::text AND u.role IN ('BROKER', 'SUPER_ADMIN'))
  );

-- ─── Open Houses ───────────────────────────────────────────

CREATE POLICY "open_houses_select_public" ON open_houses
  FOR SELECT USING (
    "listingId" IN (SELECT id FROM listings WHERE status = 'ACTIVE')
  );

CREATE POLICY "open_houses_insert_own" ON open_houses
  FOR INSERT WITH CHECK (
    "listingId" IN (
      SELECT l.id FROM listings l JOIN users u ON l."agentId" = u.id WHERE u."authId" = auth.uid()::text
    )
  );

-- ─── Lead Submissions ──────────────────────────────────────

-- Agents see leads assigned to them
CREATE POLICY "leads_select_own" ON lead_submissions
  FOR SELECT USING (
    "agentId" IN (SELECT id FROM users WHERE "authId" = auth.uid()::text)
  );

-- Brokers see all leads
CREATE POLICY "leads_select_admin" ON lead_submissions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users u WHERE u."authId" = auth.uid()::text AND u.role IN ('BROKER', 'SUPER_ADMIN'))
  );

-- Public can insert leads (contact forms)
CREATE POLICY "leads_insert_public" ON lead_submissions
  FOR INSERT WITH CHECK (true);

-- ─── Offline Sync Queue ────────────────────────────────────

CREATE POLICY "sync_queue_select_own" ON offline_sync_queue
  FOR SELECT USING (
    "agentId" IN (SELECT id FROM users WHERE "authId" = auth.uid()::text)
  );

CREATE POLICY "sync_queue_insert_own" ON offline_sync_queue
  FOR INSERT WITH CHECK (
    "agentId" IN (SELECT id FROM users WHERE "authId" = auth.uid()::text)
  );

-- ─── Lookup Values ─────────────────────────────────────────

-- Public read (property types, features, etc.)
CREATE POLICY "lookup_values_select_public" ON lookup_values
  FOR SELECT USING (true);
