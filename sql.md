# Citizen Vigilante ($VIG) — Database Queries

All queries are for **Supabase (PostgreSQL)**. Run them in the Supabase SQL Editor at
`https://app.supabase.com/project/_/sql`.

---

## 1. Schema — CREATE TABLES

### Users
```sql
CREATE TABLE public.users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  username    TEXT UNIQUE NOT NULL,
  role        TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### Campaigns (Operation Hope)
```sql
CREATE TABLE public.campaigns (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  case_file     TEXT UNIQUE NOT NULL,           -- e.g. "FILE #014"
  title         TEXT NOT NULL,
  subject_name  TEXT NOT NULL,
  location      TEXT NOT NULL,
  need_type     TEXT NOT NULL,                  -- e.g. "Medical Assistance"
  report        TEXT NOT NULL,
  goal_amount   NUMERIC(12,2) NOT NULL DEFAULT 0,
  raised_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  status        TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('urgent', 'active', 'closed')),
  verified      BOOLEAN NOT NULL DEFAULT FALSE,
  wallet_sol    TEXT,
  wallet_eth    TEXT,
  wallet_btc    TEXT,
  wallet_usdc   TEXT,
  wallet_usdt   TEXT,
  wallet_vig    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### Donations
```sql
CREATE TABLE public.donations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  donor_id    UUID REFERENCES public.users(id) ON DELETE SET NULL,
  donor_name  TEXT NOT NULL DEFAULT 'Anonymous',
  amount      NUMERIC(18,8) NOT NULL,
  currency    TEXT NOT NULL,               -- 'SOL', 'ETH', 'BTC', 'USDC', 'USDT', 'VIG'
  tx_hash     TEXT,
  message     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Keep raised_amount in sync automatically
CREATE OR REPLACE FUNCTION sync_raised_amount()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.campaigns
  SET raised_amount = (
    SELECT COALESCE(SUM(amount), 0)
    FROM public.donations
    WHERE campaign_id = NEW.campaign_id
  )
  WHERE id = NEW.campaign_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER donations_sync_raised
  AFTER INSERT OR DELETE ON public.donations
  FOR EACH ROW EXECUTE FUNCTION sync_raised_amount();
```

### Comments
```sql
CREATE TABLE public.comments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES public.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL DEFAULT 'Anonymous Agent',
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Badges
```sql
CREATE TYPE badge_type AS ENUM (
  'first_responder',
  'community_hero',
  'guardian',
  'elite_vigilante',
  'operation_leader'
);

CREATE TABLE public.badges (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  badge_type badge_type NOT NULL,
  awarded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, badge_type)
);
```

### Gallery
```sql
CREATE TABLE public.gallery (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  type          TEXT NOT NULL CHECK (type IN ('image', 'banner', 'clip')),
  url           TEXT NOT NULL,
  thumbnail_url TEXT,
  description   TEXT,
  file_ref      TEXT NOT NULL,              -- e.g. "MEDIA-001"
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## 2. Row Level Security (RLS)

Enable RLS on every table, then define policies.

```sql
ALTER TABLE public.users     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery    ENABLE ROW LEVEL SECURITY;
```

### users
```sql
-- Anyone can read public profiles
CREATE POLICY "users_select_public"
  ON public.users FOR SELECT USING (true);

-- Users can update their own row
CREATE POLICY "users_update_own"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);
```

### campaigns
```sql
-- Public read
CREATE POLICY "campaigns_select_public"
  ON public.campaigns FOR SELECT USING (true);

-- Authenticated users can insert their own
CREATE POLICY "campaigns_insert_own"
  ON public.campaigns FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Owner can update, admin can update any
CREATE POLICY "campaigns_update_own_or_admin"
  ON public.campaigns FOR UPDATE
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admin only delete
CREATE POLICY "campaigns_delete_admin"
  ON public.campaigns FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### donations
```sql
CREATE POLICY "donations_select_public"
  ON public.donations FOR SELECT USING (true);

CREATE POLICY "donations_insert_authenticated"
  ON public.donations FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
```

### comments
```sql
CREATE POLICY "comments_select_public"
  ON public.comments FOR SELECT USING (true);

CREATE POLICY "comments_insert_authenticated"
  ON public.comments FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "comments_delete_own_or_admin"
  ON public.comments FOR DELETE
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### badges
```sql
CREATE POLICY "badges_select_public"
  ON public.badges FOR SELECT USING (true);

-- Only admins award badges (or a server-side function)
CREATE POLICY "badges_insert_admin"
  ON public.badges FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### gallery
```sql
CREATE POLICY "gallery_select_public"
  ON public.gallery FOR SELECT USING (true);

CREATE POLICY "gallery_manage_admin"
  ON public.gallery FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

---

## 3. CRUD Queries

### Users

```sql
-- Get all users
SELECT * FROM public.users ORDER BY created_at DESC;

-- Get user by ID
SELECT * FROM public.users WHERE id = '<user-uuid>';

-- Get user by email
SELECT * FROM public.users WHERE email = 'agent@example.com';

-- Insert user (called after Supabase Auth signup via trigger)
INSERT INTO public.users (id, email, username, role)
VALUES ('<user-uuid>', 'agent@example.com', 'agent_007', 'user');

-- Update username
UPDATE public.users SET username = 'new_name' WHERE id = '<user-uuid>';

-- Promote to admin
UPDATE public.users SET role = 'admin' WHERE id = '<user-uuid>';

-- Delete user
DELETE FROM public.users WHERE id = '<user-uuid>';
```

### Campaigns

```sql
-- Get all active campaigns
SELECT c.*, u.username AS creator
FROM public.campaigns c
JOIN public.users u ON u.id = c.user_id
WHERE c.status != 'closed'
ORDER BY c.created_at DESC;

-- Get single campaign with comments and donations count
SELECT
  c.*,
  COUNT(DISTINCT d.id) AS donation_count,
  COUNT(DISTINCT cm.id) AS comment_count
FROM public.campaigns c
LEFT JOIN public.donations d  ON d.campaign_id = c.id
LEFT JOIN public.comments cm ON cm.campaign_id = c.id
WHERE c.id = '<campaign-uuid>'
GROUP BY c.id;

-- Get verified campaigns only
SELECT * FROM public.campaigns WHERE verified = true ORDER BY created_at DESC;

-- Get urgent campaigns
SELECT * FROM public.campaigns WHERE status = 'urgent' ORDER BY created_at DESC;

-- Insert campaign
INSERT INTO public.campaigns
  (user_id, case_file, title, subject_name, location, need_type, report, goal_amount)
VALUES
  ('<user-uuid>', 'FILE #018', 'Emergency Medical Aid', 'Jane Doe',
   'France', 'Medical Assistance', 'Report text here...', 15000.00);

-- Update campaign status
UPDATE public.campaigns SET status = 'urgent' WHERE id = '<campaign-uuid>';

-- Verify a campaign (admin only)
UPDATE public.campaigns SET verified = true WHERE id = '<campaign-uuid>';

-- Update wallet addresses
UPDATE public.campaigns
SET wallet_sol = '<sol-address>', wallet_eth = '<eth-address>'
WHERE id = '<campaign-uuid>';

-- Close campaign
UPDATE public.campaigns SET status = 'closed' WHERE id = '<campaign-uuid>';

-- Delete campaign (admin only)
DELETE FROM public.campaigns WHERE id = '<campaign-uuid>';
```

### Donations

```sql
-- All donations for a campaign
SELECT d.*, u.username
FROM public.donations d
LEFT JOIN public.users u ON u.id = d.donor_id
WHERE d.campaign_id = '<campaign-uuid>'
ORDER BY d.created_at DESC;

-- Top donors overall
SELECT donor_name, SUM(amount) AS total, currency
FROM public.donations
GROUP BY donor_name, currency
ORDER BY total DESC
LIMIT 10;

-- Insert donation
INSERT INTO public.donations (campaign_id, donor_id, donor_name, amount, currency, tx_hash, message)
VALUES ('<campaign-uuid>', '<user-uuid>', 'Agent Smith', 50.0, 'VIG', '<tx-hash>', 'Stay strong!');

-- Total raised per currency for a campaign
SELECT currency, SUM(amount) AS total
FROM public.donations
WHERE campaign_id = '<campaign-uuid>'
GROUP BY currency;
```

### Comments

```sql
-- Get comments for a campaign
SELECT cm.*, u.username
FROM public.comments cm
LEFT JOIN public.users u ON u.id = cm.user_id
WHERE cm.campaign_id = '<campaign-uuid>'
ORDER BY cm.created_at ASC;

-- Insert comment
INSERT INTO public.comments (campaign_id, user_id, author_name, message)
VALUES ('<campaign-uuid>', '<user-uuid>', 'Agent X', 'Stay strong!');

-- Delete comment
DELETE FROM public.comments WHERE id = '<comment-uuid>';
```

### Badges

```sql
-- Get badges for a user
SELECT * FROM public.badges WHERE user_id = '<user-uuid>' ORDER BY awarded_at DESC;

-- Award badge
INSERT INTO public.badges (user_id, badge_type)
VALUES ('<user-uuid>', 'first_responder')
ON CONFLICT (user_id, badge_type) DO NOTHING;

-- Leaderboard — users with most badges
SELECT u.username, COUNT(b.id) AS badge_count
FROM public.badges b
JOIN public.users u ON u.id = b.user_id
GROUP BY u.username
ORDER BY badge_count DESC
LIMIT 20;
```

### Gallery

```sql
-- Get all gallery items
SELECT * FROM public.gallery ORDER BY created_at DESC;

-- Filter by type
SELECT * FROM public.gallery WHERE type = 'clip' ORDER BY created_at DESC;

-- Insert media item
INSERT INTO public.gallery (title, type, url, thumbnail_url, description, file_ref)
VALUES ('VIG Launch', 'banner', 'https://...', 'https://...', 'Official banner', 'MEDIA-009');

-- Delete media item
DELETE FROM public.gallery WHERE id = '<gallery-uuid>';
```

---

## 4. Auth Trigger — Sync Users Table

When a user signs up via Supabase Auth, auto-insert a row into `public.users`:

```sql
CREATE OR REPLACE FUNCTION handle_new_auth_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_auth_user();
```

---

## 5. Useful Admin Queries

```sql
-- Dashboard stats
SELECT
  (SELECT COUNT(*) FROM public.users)     AS total_users,
  (SELECT COUNT(*) FROM public.campaigns) AS total_campaigns,
  (SELECT COUNT(*) FROM public.donations) AS total_donations,
  (SELECT COALESCE(SUM(raised_amount), 0) FROM public.campaigns) AS total_raised;

-- Campaigns needing review (unverified, > $1k raised)
SELECT * FROM public.campaigns
WHERE verified = false AND raised_amount > 1000
ORDER BY raised_amount DESC;

-- Recent activity feed
SELECT 'donation' AS type, donor_name AS actor, created_at FROM public.donations
UNION ALL
SELECT 'comment', author_name, created_at FROM public.comments
ORDER BY created_at DESC
LIMIT 50;
```
