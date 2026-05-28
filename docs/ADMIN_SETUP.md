# Conta administrador

Não há email/password fixos no repositório. Cada ambiente (o teu Supabase) tem as suas contas.

## Ver quem é admin

1. [Supabase Dashboard](https://supabase.com/dashboard) → projeto **ylcoynhihpvzttnuyaft**
2. **Table Editor** → tabela **`profiles`**
3. Procura `role = admin` — o email está na coluna **`email`**

## Criar ou promover admin

### Opção A — Utilizador já existe

1. O utilizador regista-se em `/registar` ou entra com Google.
2. No SQL Editor:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'teu-email@agr-tc.pt';
```

### Opção B — Criar utilizador no Dashboard

1. **Authentication** → **Users** → **Add user**
2. Email + password temporária
3. Copiar o **User UID**
4. SQL Editor:

```sql
INSERT INTO profiles (id, email, name, role)
VALUES (
  'USER_UID_AQUI',
  'admin@agr-tc.pt',
  'Administrador',
  'admin'
)
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

(Se o trigger já criar `profiles` ao registar, usa só o `UPDATE` da Opção A.)

## Password

- Definida no registo ou em **Authentication** → **Users** → utilizador → **Reset password**.
- Login admin: **`/console/entrar`** (não uses só `/entrar` se quiseres ir direto à consola).

## Não consigo entrar

1. Confirmar `role = admin` em `profiles` (não basta estar em Auth).
2. Repor password no Dashboard (Authentication → Users).
3. Verificar email confirmado se tiveres confirmação ativada.
