-- =============================================================================
-- Biblioteca TC — Schedule automatic email Edge Functions (pg_cron + pg_net)
--
-- 1. Deploy: send-due-reminders, send-newsletter, send-weekly-picks
-- 2. Set Edge secrets (see supabase/SECRETS.md)
-- 3. Replace YOUR_PROJECT_REF and YOUR_SERVICE_ROLE_KEY below, then RUN
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Remove previous schedules (ignore errors if job does not exist)
DO $unschedule$
BEGIN
  PERFORM cron.unschedule('biblioteca-send-due-reminders');
EXCEPTION WHEN OTHERS THEN NULL;
END $unschedule$;

DO $unschedule$
BEGIN
  PERFORM cron.unschedule('biblioteca-send-newsletter');
EXCEPTION WHEN OTHERS THEN NULL;
END $unschedule$;

DO $unschedule$
BEGIN
  PERFORM cron.unschedule('biblioteca-send-weekly-picks');
EXCEPTION WHEN OTHERS THEN NULL;
END $unschedule$;

-- Daily 08:00 UTC — loans due tomorrow
SELECT cron.schedule(
  'biblioteca-send-due-reminders',
  '0 8 * * *',
  $$
  SELECT net.http_post(
    url := 'https://ylcoynhihpvzttnuyaft.supabase.co/functions/v1/send-due-reminders',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer YOUR_SERVICE_ROLE_KEY'
    ),
    body := '{}'::jsonb
  ) AS request_id;
  $$
);

-- Weekdays 08:20 UTC — newsletter (Edge Function also skips weekends)
SELECT cron.schedule(
  'biblioteca-send-newsletter',
  '20 8 * * 1-5',
  $$
  SELECT net.http_post(
    url := 'https://ylcoynhihpvzttnuyaft.supabase.co/functions/v1/send-newsletter',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer YOUR_SERVICE_ROLE_KEY'
    ),
    body := '{}'::jsonb
  ) AS request_id;
  $$
);

-- Mondays 09:00 UTC — weekly book pick
SELECT cron.schedule(
  'biblioteca-send-weekly-picks',
  '0 9 * * 1',
  $$
  SELECT net.http_post(
    url := 'https://ylcoynhihpvzttnuyaft.supabase.co/functions/v1/send-weekly-picks',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer YOUR_SERVICE_ROLE_KEY'
    ),
    body := '{}'::jsonb
  ) AS request_id;
  $$
);

-- Verify:
-- SELECT jobid, jobname, schedule FROM cron.job WHERE jobname LIKE 'biblioteca-%';
