from docx import Document

def update_routes(input_file, output_file):
    doc = Document(input_file)
    
    rep_map = {
        "/ — Catálogo público": "/, /catalogo — Catálogo público",
        "/login, /signup — Autenticação por email": "/login, /entrar, /signup, /registar — Autenticação via Google e email",
        "/magic-link, /forgot-password — Acesso alternativo": "/acesso-link, /recuperar-password — Acesso alternativo e recuperação",
        "/my-loans — Empréstimos do utilizador autenticado": "/emprestimos — Empréstimos do utilizador autenticado",
        "/settings — Perfil do utilizador": "/definicoes — Perfil do utilizador",
        "/admin — Dashboard administrativo (acesso restrito)": "/console, /console/entrar — Dashboard administrativo (acesso restrito)\n•\t/notificacoes — Centro de notificações in-app\n•\t/docs — Documentação interativa e textos legais",
        "/admin/books, /loans, /users, /categories, /feedback — Módulos de gestão": "/console/livros, /categorias, /emprestimos, /utilizadores, /feedback — Módulos de gestão",
    }
    
    for para in doc.paragraphs:
        for old_txt, new_txt in rep_map.items():
            if old_txt in para.text:
                para.text = para.text.replace(old_txt, new_txt)
                
    doc.save(output_file)
    print(f"Successfully updated and saved to {output_file}")

if __name__ == '__main__':
    # Update the previously generated file
    update_routes("Relatorio_do_Projeto_Atualizado.docx", "Relatorio_do_Projeto_Atualizado.docx")
