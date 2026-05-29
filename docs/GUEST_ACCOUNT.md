# Conta convidado (demo)

Conta partilhada para demonstrações e visitantes, com perfil **aluno**.

| Campo | Valor |
|--------|--------|
| Login (curto) | `convidado` |
| Email (Auth) | `convidado@bibliotecatc.com` |
| Password | `convidado` |
| Role | `aluno` |

O Supabase exige um email com `@`; na página **Entrar** pode usar só `convidado` — a app converte automaticamente.

## Criar ou atualizar a conta

### Script (recomendado)

1. Copie a chave **service_role** em [Supabase Dashboard](https://supabase.com/dashboard) → **Project Settings** → **API** (nunca commitar).
2. Na raiz do projeto (PowerShell):

```powershell
$env:SUPABASE_SERVICE_ROLE_KEY="sua_service_role_key"
node scripts/create-guest-user.mjs
```

### Manual no Dashboard

1. **Authentication** → **Users** → **Add user**
   - Email: `convidado@bibliotecatc.com`
   - Password: `convidado`
   - Marcar email como confirmado
2. Copiar o **User UID**
3. **SQL Editor**:

```sql
INSERT INTO public.profiles (id, email, name, role)
VALUES (
  'USER_UID_AQUI',
  'convidado@bibliotecatc.com',
  'Convidado',
  'aluno'
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  name = EXCLUDED.name,
  role = 'aluno';
```

## Segurança

Esta conta é apenas para **demo / convidados**. Não use a mesma password em produção com dados reais de alunos. Pode alterar a password em **Authentication** → **Users**.
