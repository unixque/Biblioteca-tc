/**
 * Opens a printable HTML report; user can Save as PDF from the browser print dialog.
 */
export function openAdminPdfReport({ stats, loans, books }) {
  const now = new Date().toLocaleString('pt-PT')
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>BibliotecaTC — Relatório</title>
<style>
  body { font-family: system-ui, sans-serif; padding: 24px; color: #18181b; }
  h1 { color: #631D1D; }
  table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
  th, td { border: 1px solid #e4e4e7; padding: 8px; text-align: left; }
  th { background: #f4f4f5; }
  .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 20px 0; }
  .stat { background: #fafafa; padding: 16px; border-radius: 8px; border: 1px solid #e4e4e7; }
  .stat strong { font-size: 24px; display: block; color: #631D1D; }
  @media print { button { display: none; } }
</style></head><body>
  <h1>BibliotecaTC — Relatório estatístico</h1>
  <p>Gerado em ${now}</p>
  <div class="stats">
    <div class="stat"><span>Total livros</span><strong>${stats.totalBooks}</strong></div>
    <div class="stat"><span>Empréstimos ativos</span><strong>${stats.activeLoans}</strong></div>
    <div class="stat"><span>Pendentes</span><strong>${stats.pendingLoans}</strong></div>
    <div class="stat"><span>Em atraso</span><strong>${stats.overdueLoans}</strong></div>
  </div>
  <h2>Últimos empréstimos</h2>
  <table>
    <thead><tr><th>Livro</th><th>Utilizador</th><th>Estado</th><th>Vencimento</th></tr></thead>
    <tbody>
      ${(loans || [])
        .slice(0, 30)
        .map(
          (l) => `<tr>
        <td>${l.books?.title || '—'}</td>
        <td>${l.profiles?.email || '—'}</td>
        <td>${l.status}</td>
        <td>${l.due_date ? new Date(l.due_date).toLocaleDateString('pt-PT') : '—'}</td>
      </tr>`
        )
        .join('')}
    </tbody>
  </table>
  <h2>Stock (primeiros 50)</h2>
  <table>
    <thead><tr><th>Título</th><th>Disponível</th><th>Total</th></tr></thead>
    <tbody>
      ${(books || [])
        .slice(0, 50)
        .map(
          (b) => `<tr>
        <td>${b.title}</td>
        <td>${b.available_qty}</td>
        <td>${b.quantity}</td>
      </tr>`
        )
        .join('')}
    </tbody>
  </table>
  <p style="margin-top:24px"><button onclick="window.print()">Imprimir / Guardar PDF</button></p>
</body></html>`

  const w = window.open('', '_blank')
  if (!w) return false
  w.document.write(html)
  w.document.close()
  return true
}
