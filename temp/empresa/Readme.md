Sistema de Cadastro de Empresa, Clientes, Fornecedores, Orçamentos e Projetos

📌 Visão Geral

Este projeto é um backend em Node.js com Express e MySQL, desenvolvido para gerenciar:

Páginas institucionais da empresa.

Cadastro completo de clientes e fornecedores.

Cadastro de materiais.

Cadastro de orçamentos com itens e materiais.

Cadastro de projetos, vinculados a clientes e orçamentos.

Relatórios consolidados de projetos, orçamentos e materiais.

O projeto utiliza EJS para renderização de páginas, DotEnv para variáveis de ambiente e Nodemon para facilitar o desenvolvimento.

⚙️ Tecnologias Utilizadas

Node.js

Express.js

MySQL

EJS

DotEnv

Nodemon

📂 Estrutura de Pastas

api/
├── controllers/
│   ├── empresaController.js
│   ├── clienteController.js
│   ├── orcamentoController.js
│   ├── projetoController.js
│   └── relatorioController.js
├── routes/
│   └── empresaRoutes.js
├── config/
│   └── db.js
└── views/
    └── empresa/
        ├── home.ejs
        ├── equipe.ejs
        ├── missao.ejs
        ├── visao.ejs
        ├── valores.ejs
        ├── sobre.ejs
        └── contato.ejs

🗄️ Estrutura do Banco de Dados

Clientes/Fornecedores

Contém dados completos de clientes e fornecedores.

Materiais

Lista de materiais disponíveis para orçamentos.

Orçamentos

Orçamentos vinculados a clientes, com valor total calculado.

Itens de Orçamento

Itens vinculados a orçamentos, com materiais, quantidade e subtotal.

Projetos

Projetos vinculados a clientes e orçamentos.

Relação Projeto-Orçamentos

Tabela de vínculo entre projetos e orçamentos.

🔗 Rotas Disponíveis

Empresa

GET /empresa/ → Página Home

GET /empresa/equipe → Página Equipe

GET /empresa/missao → Página Missão

GET /empresa/sobre → Página Sobre

GET /empresa/valores → Página Valores

GET /empresa/visao → Página Visão

GET /empresa/contato → Página Contato

Clientes/Fornecedores

POST /empresa/cadastro → Criar cliente/fornecedor

GET /empresa/cadastro → Listar todos

GET /empresa/cadastro/:id → Buscar por ID

PUT /empresa/cadastro/:id → Atualizar

DELETE /empresa/cadastro/:id → Excluir

Materiais

POST /empresa/materiais → Criar material

GET /empresa/materiais → Listar todos

GET /empresa/materiais/:id → Buscar por ID

PUT /empresa/materiais/:id → Atualizar

DELETE /empresa/materiais/:id → Excluir

Orçamentos

POST /empresa/orcamentos → Criar orçamento com itens

GET /empresa/orcamentos → Listar todos

GET /empresa/orcamentos/:id → Buscar por ID

PUT /empresa/orcamentos/:id → Atualizar orçamento e itens

DELETE /empresa/orcamentos/:id → Excluir orçamento e itens

Projetos

POST /empresa/projetos → Criar projeto com orçamentos vinculados

GET /empresa/projetos → Listar todos

GET /empresa/projetos/:id → Buscar por ID

PUT /empresa/projetos/:id → Atualizar projeto e vínculos

DELETE /empresa/projetos/:id → Excluir projeto e vínculos

Relatórios

GET /empresa/relatorios/projetos → Relatório consolidado de projetos, orçamentos e materiais

📊 Relatórios

O relatório consolidado traz:

Projeto (nome, tipo, datas)

Cliente vinculado

Orçamentos associados

Materiais de cada orçamento (quantidade e subtotal)

Exemplo de saída:

Projeto

Cliente

Orçamento

Valor Total

Material

Quantidade

Subtotal

Rede Elétrica

Empresa X

Orçamento 1

5000.00

Cabo 2,5mm

100m

1200.00

Rede Elétrica

Empresa X

Orçamento 1

5000.00

Disjuntor 20A

10

800.00

Cabeamento Estruturado

Empresa Y

Orçamento 2

3000.00

Patch Panel

2

600.00

🚀 Como Executar o Projeto

Clone o repositório.

Instale dependências:

npm install

Configure o arquivo .env com as credenciais do MySQL:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=rede_cadastros

Execute o servidor:

npm run dev

Acesse via navegador ou API client (Postman/Insomnia).

📌 Exemplos de Requisições

Criar Cliente

POST /empresa/cadastro
{
  "tipo": "cliente",
  "nome": "Empresa X",
  "cpf_cnpj": "12345678900",
  "email": "contato@empresa.com",
  "telefone": "1633334444"
}

Criar Orçamento com Itens

POST /empresa/orcamentos
{
  "descricao": "Instalação elétrica",
  "tipo": "rede_eletrica",
  "data": "2026-10-18",
  "cliente_id": 1,
  "itens": [
    { "material_id": 1, "quantidade": 100, "preco_unitario": 12.00 },
    { "material_id": 2, "quantidade": 10, "preco_unitario": 80.00 }
  ]
}

Criar Projeto com Orçamentos

POST /empresa/projetos
{
  "nome": "Projeto Rede Estruturada",
  "tipo": "cabeamento_estruturado",
  "data_inicio": "2026-10-20",
  "data_fim": "2026-11-10",
  "cliente_id": 1,
  "orcamentos": [1, 2]
}

📌 Expansões Futuras

Autenticação de usuários.

Exportação de relatórios em PDF/Excel.

Validações de CPF/CNPJ e emails.

Dashboard com gráficos.

👨‍💻 Autor

Andre R. L. Garcia