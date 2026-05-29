/**
 * Creates the shared guest student account (convidado / convidado).
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=your_service_role node scripts/create-guest-user.mjs
 *
 * Or add SUPABASE_SERVICE_ROLE_KEY to .env (never commit) and run from project root.
 */

import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const GUEST_EMAIL = 'convidado@bibliotecatc.com'
const GUEST_PASSWORD = 'convidado'
const GUEST_NAME = 'Convidado'

function loadEnv() {
  const envPath = resolve(root, '.env')
  if (!existsSync(envPath)) return {}
  const lines = readFileSync(envPath, 'utf8').split('\n')
  const env = {}
  for (const line of lines) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m) env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '')
  }
  return env
}

const env = { ...loadEnv(), ...process.env }
const supabaseUrl = env.SUPABASE_URL || env.VITE_SUPABASE_URL
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceKey) {
  console.error(
    'Missing SUPABASE_SERVICE_ROLE_KEY (and VITE_SUPABASE_URL in .env).\n' +
      'Get the service_role key from Supabase Dashboard → Project Settings → API.\n' +
      'Then run:\n' +
      '  $env:SUPABASE_SERVICE_ROLE_KEY="eyJ..."; node scripts/create-guest-user.mjs'
  )
  process.exit(1)
}

const headers = {
  apikey: serviceKey,
  Authorization: `Bearer ${serviceKey}`,
  'Content-Type': 'application/json',
}

async function findUserByEmail(email) {
  const res = await fetch(`${supabaseUrl}/auth/v1/admin/users?per_page=200`, { headers })
  const data = await res.json()
  if (!res.ok) throw new Error(data.msg || data.message || JSON.stringify(data))
  const users = data.users ?? data
  return users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
}

async function createAuthUser() {
  const res = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email: GUEST_EMAIL,
      password: GUEST_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: GUEST_NAME },
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.msg || data.message || JSON.stringify(data))
  return data
}

async function upsertProfile(userId) {
  const res = await fetch(`${supabaseUrl}/rest/v1/profiles`, {
    method: 'POST',
    headers: {
      ...headers,
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify({
      id: userId,
      email: GUEST_EMAIL,
      name: GUEST_NAME,
      role: 'aluno',
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(JSON.stringify(data))
  return data
}

try {
  let user = await findUserByEmail(GUEST_EMAIL)
  if (user) {
    console.log('Auth user already exists:', user.id, user.email)
  } else {
    user = await createAuthUser()
    console.log('Created auth user:', user.id, user.email)
  }

  const profile = await upsertProfile(user.id)
  console.log('Profile ready (role: aluno):', profile[0]?.id ?? user.id)
  console.log('\nLogin at /entrar with:')
  console.log('  Email: convidado   (or', GUEST_EMAIL + ')')
  console.log('  Password: convidado')
} catch (err) {
  console.error('Failed:', err.message || err)
  process.exit(1)
}
