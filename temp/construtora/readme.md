# 🏗️ Sistema de Gestão da Construtora

Projeto acadêmico desenvolvido no curso de **Desenvolvimento de Software Multi-Plataforma — Disciplina Programação Web-II**, apresentando um sistema completo de gestão de engenheiros e obras com operações CRUD, relacionamento entre entidades e interface responsiva.

## 📋 Índice

1. Evolução do Projeto
2. Arquitetura do Sistema
3. Modelo de Dados e Relacionamentos
4. Fluxo de Navegação
5. Tecnologias Utilizadas
6. Estrutura de Diretórios
7. Como Executar
8. Script do Banco de Dados
9. Funcionalidades
10. Autor
11. Licença

---

## 🚀 Evolução do Projeto

### 📅 Etapas de Desenvolvimento

#### Fase 1: Estrutura Base e Conexão com Banco
- **Configuração do ambiente** : Node.js, Express e dependências instaladas
- **Conexão MySQL**            : Módulo de conexão com tratamento de erros e variáveis de ambiente
- **Estrutura de pastas**      : Organização em `controllers/`, `routes/`, `views/` e `public/`
- **Página inicial**           : Dashboard com navegação centralizada

**Como era:**
```javascript
// Servidor mínimo
const express = require('express');
const app = express();
app.listen(3000);

#### Fase 2: Cadastro e Gestão de Engenheiros

- **CRUD completo**         : Inclusão, listagem, edição e exclusão de engenheiros
- **Validação de dados**    : Campos obrigatórios e formatação de datas
- **Interface padronizada** : Formulários, tabelas e botões com identidade visual única

**Funcionalidades implementadas:**

GET  /construtora/engenheiros                → Formulário de cadastro
POST /construtora/engenheiros/salvar         → Incluir no banco
GET  /construtora/engenheiros/listar         → Listagem completa
GET  /construtora/engenheiros/editar/:id     → Carregar dados para edição
POST /construtora/engenheiros/atualizar/:id  → Gravar alterações
GET  /construtora/engenheiros/excluir/:id    → Remover registro

#### Fase 3: Cadastro e Relacionamento de Obras

- **Chave estrangeira**     : Vinculação de cada obra a um engenheiro responsável
- **Select dinâmico**       : Lista de engenheiros carregada no formulário de obras
- **Exclusão em cascata**   : Remoção de engenheiro exclui também suas obras
- **Formatação de valores** : Moeda R$ e datas no formato brasileiro

**Como funciona o relacionamento:**

const obra = {
  cidade: req.body.obr_cidade,
  tipo: req.body.obr_tipoobra,
  valor: req.body.obr_valor,
  dataInicio: req.body.obr_dtinicio,
  engenheiroCodigo: req.body.eng_codigo
};

#### Fase 4: Padronização e Aprimoramento Visual

- **Cabeçalhos unificados**     : Header externo e interno (.hero) com largura e altura idênticas
- **Rodapé padronizado**        : Presente em todas as páginas com mesmas informações
- **Responsividade**            : Adaptação para celulares e telas menores
- **Remoção de estilos inline** : Todo o visual controlado pelo arquivo CSS
- **Indentação e semântica**    : Código organizado e de fácil manutenção

**Resultado Final:**

- ✅ 7 páginas com estrutura visual idêntica
- ✅ Cabeçalhos perfeitamente alinhados
- ✅ Formulários com validação e feedback
- ✅ Tabelas com formatação de dados
- ✅ Confirmação antes de exclusão
- ✅ Navegação consistente entre todos os módulos

---

## 🏗️ Arquitetura do Sistema

### 🧩 Padrão MVC Adaptado

O projeto segue uma divisão lógica entre camadas:

Tabela

| ------------------ | --------------------------------------------------- | -------------------------------------- |
| Camada             | Responsabilidade                                    | Arquivos                               |
| ------------------ | --------------------------------------------------- | -------------------------------------- |
| **Rotas**          | Definição de endpoints e recebimento de requisições | `routes/construtora.js`                |
| **Controlador**    | Lógica de negócio, validação e regras               | `controllers/construtoraController.js` |
| **Modelo/Conexão** | Comunicação direta com o MySQL                      | `conexao/conexao.js`                   |
| **Visualização**   | Renderização do HTML dinâmico                       | `views/construtora/*.ejs`              |
| ------------------ | --------------------------------------------------- | -------------------------------------- |

Usuário → Navegador
   ↓
Express → Rota correspondente
   ↓
Controlador → Processa dados e regras
   ↓
Conexão → Executa consulta no MySQL
   ↓
Controlador → Prepara dados para a view
   ↓
EJS → Renderiza HTML com variáveis
   ↓
Navegador → Exibe a página ao usuário

## 🗄️ Modelo de Dados e Relacionamentos

### Diagrama Simplificado

const_engenheiro                  const_obra
├── eng_codigo (PK) ◄──────────────┬── obr_codigo (PK)
├── eng_nome                       ├── obr_cidade
├── eng_apelido                    ├── obr_tipoobra
├── eng_telefone                   ├── obr_valor
├── eng_crea                       ├── obr_dtinicio
└── eng_datacrea                   └── eng_codigo (FK) → referencia const_engenheiro

### Regras de Negócio

- Uma **obra** só pode ser cadastrada se houver um **engenheiro** vinculado
- Ao excluir um **engenheiro**, todas as **obras** vinculadas são excluídas primeiro
- O valor da obra é armazenado como `DECIMAL(12,2)` — sem perda de precisão
- Datas são armazenadas no formato `DATE` do MySQL e formatadas para exibição

---

## 🗺️ Fluxo de Navegação

### Páginas do Sistema

Início (Dashboard)
├── Engenheiros
│   ├── Novo Cadastro
│   ├── Listagem
│   │   ├── Editar
│   │   └── Excluir
│   └── (voltar para Início)
└── Obras
    ├── Nova Obra
    ├── Listagem
    │   ├── Editar
    │   └── Excluir
    └── (voltar para Início)

### Exemplo de Fluxo Completo — Cadastro de Obra

1. Usuário acessa `/construtora/obras`
↓
2. Formulário carrega com lista de engenheiros no `<select>`
↓
3. Usuário preenche cidade, tipo, valor, data e seleciona engenheiro
↓
4. Envia para `/construtora/obras/salvar` via POST
↓
5. Controlador valida campos e insere no banco
↓
6. Redireciona para `/construtora/obras/listar` com mensagem de confirmação
↓
7. Tabela exibe nome do engenheiro responsável (JOIN entre tabelas)

---

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js**     — Ambiente de execução JavaScript no servidor
- **Express 4.x** — Framework web leve e flexível
- **MySQL**       — Banco de dados relacional
- **mysql2**      — Driver Node.js para conexão com MySQL
- **EJS**         — Motor de templates para renderização dinâmica
- **DotEnv**      — Gerenciamento de variáveis de ambiente
- **Nodemon**     — Reinicialização automática durante desenvolvimento

### Frontend

- **HTML5**                    — Estrutura semântica
- **CSS3**                     — Estilos, gradientes, animações e responsividade
- **JavaScript (client-side)** — Confirmação de exclusão e interações
- **Formatação nativa**        — `toLocaleString` para moeda e datas

### Ferramentas de Desenvolvimento

- **VS Code**            — Editor de código
- **Git**                — Controle de versão
- **Navegador DevTools** — Depuração e testes

---

## 📂 Estrutura de Diretórios

projeto/
├── app.js                           # Arquivo principal — inicialização do servidor
├── package.json                     # Dependências e scripts
├── .env                             # Variáveis de ambiente (não versionado)
│
├── conexao/
│   └── conexao.js                   # Configuração e pool de conexões MySQL
│
├── controllers/
│   └── construtoraController.js     # Lógica de negócio e operações com banco
│
├── routes/
│   └── construtora.js               # Definição de todas as rotas do sistema
│
├── views/
│   └── construtora/
│       ├── index.ejs                # Dashboard / Página Inicial
│       ├── engenheiro.ejs           # Formulário de Cadastro de Engenheiro
│       ├── listaEngenheiros.ejs     # Listagem e ações
│       ├── editarEngenheiro.ejs     # Formulário de Edição
│       ├── cadobra.ejs              # Formulário de Cadastro de Obra
│       ├── listaObras.ejs           # Listagem e ações
│       └── editarObra.ejs           # Formulário de Edição de Obra
│
└── public/
    └── css/
        └── construtora/
            └── construtora.css      # Estilos — Versão 3.0 padronizada

## ⚙️ Como Executar

### Pré-requisitos

- Node.js 16+ instalado
- MySQL 5.7+ instalado e em execução
- Gerenciador de pacotes npm ou yarn

### Passo 1 — Instalar Dependências

cd caminho/do/projeto
npm install

### Passo 2 — Configurar o Banco de Dados

Crie um arquivo `.env` na raiz do projeto com suas credenciais:

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nome_do_banco
PORT=3000

### Passo 3 — Executar o Script SQL

Abra o MySQL Workbench ou terminal e execute:

-- APAGAR TABELAS CASO EXISTAM
DROP TABLE IF EXISTS const_obra;
DROP TABLE IF EXISTS const_engenheiro;

-- TABELA ENGENHEIRO
CREATE TABLE const_engenheiro (
    eng_codigo INT AUTO_INCREMENT PRIMARY KEY,
    eng_nome VARCHAR(50) NOT NULL,
    eng_apelido VARCHAR(20),
    eng_telefone VARCHAR(15),
    eng_crea VARCHAR(10),
    eng_datacrea DATE
);

-- TABELA OBRA
CREATE TABLE const_obra (
    obr_codigo INT AUTO_INCREMENT PRIMARY KEY,
    obr_cidade VARCHAR(30) NOT NULL,
    obr_tipoobra VARCHAR(20) NOT NULL,
    obr_valor DECIMAL(12,2),
    obr_dtinicio DATE,
    eng_codigo INT NOT NULL,
    CONSTRAINT fk_const_obra_engenheiro
        FOREIGN KEY (eng_codigo)
        REFERENCES const_engenheiro(eng_codigo)
);

-- INSERIR ENGENHEIROS
INSERT INTO const_engenheiro
(eng_nome, eng_apelido, eng_telefone, eng_crea, eng_datacrea)
VALUES
('Carlos Alberto Silva', 'Carlos', '16991234567', '123456', '2015-03-10'),
('Mariana Souza Lima', 'Mari', '16992345678', '234567', '2017-08-21'),
('Ricardo Mendes Rocha', 'Ricardo', '16993456789', '345678', '2013-06-14'),
('Fernanda Costa Alves', 'Fern', '16994567890', '456789', '2018-11-05'),
('Paulo Henrique Dias', 'Paulo', '16995678901', '567890', '2012-04-18'),
('Juliana Martins Reis', 'Ju', '16996789012', '678901', '2019-09-30'),
('Roberto Nunes Prado', 'Beto', '16997890123', '789012', '2011-01-12'),
('Tatiane Oliveira Campos', 'Tati', '16998901234', '890123', '2020-07-25');

-- INSERIR OBRAS
INSERT INTO const_obra
(obr_cidade, obr_tipoobra, obr_valor, obr_dtinicio, eng_codigo)
VALUES
('Franca', 'Residencia', 350000.00, '2024-01-15', 1),
('Ribeirao Preto', 'Escola', 1850000.00, '2024-03-10', 2),
('Uberaba', 'Barracao', 980000.00, '2024-05-22', 3),
('Batatais', 'Apartamento', 620000.00, '2024-02-05', 4),
('Araraquara', 'Residencia', 420000.00, '2024-06-18', 5),
('Barretos', 'Escola', 2250000.00, '2024-04-12', 6),
('Sertaozinho', 'Barracao', 1450000.00, '2024-07-08', 7),
('Jaboticabal', 'Apartamento', 850000.00, '2024-08-01', 8);

### Passo 4 — Iniciar o Servidor

# Ambiente de desenvolvimento (com Nodemon)
npm run dev

# Ou diretamente
node app.js

### Passo 5 — Acessar no Navegador

http://localhost:3000/construtora

## ✅ Funcionalidades

### Módulo Engenheiros

abela
| --------- | -------------------------------------------------------------------------- |
| Função    | Descrição                                                                  |
| --------- | -------------------------------------------------------------------------- |
| Cadastrar | Inclui novo engenheiro com nome, apelido, telefone, CREA e data de emissão |
| Listar    | Exibe todos os registros em tabela com formatação de data                  |
| Editar    | Carrega e altera dados existentes                                          |
| Excluir   | Remove engenheiro e obras vinculadas (confirmação prévia)                  |
| --------- | -------------------------------------------------------------------------- |

### Módulo Obras

Tabela
| --------- | ------------------------------------------------------------ |
| Função    | Descrição                                                    |
| --------- | ------------------------------------------------------------ |
| Cadastrar | Cidade, tipo, valor, data de início e engenheiro responsável |
| Listar    | Tabela com nome do engenheiro, valor formatado em R$ e data  |
| Editar    | Atualiza dados e troca engenheiro responsável                |
| Excluir   | Remove obra com confirmação prévia                           |
| --------- | ------------------------------------------------------------ |

### Interface e Usabilidade

- ✅ Navegação centralizada em todas as páginas
- ✅ Campos obrigatórios indicados no formulário
- ✅ Valores monetários formatados com `toLocaleString('pt-BR')`
- ✅ Datas no formato brasileiro
- ✅ Confirmação `confirm()` antes de exclusões
- ✅ Layout responsivo para celular e desktop
- ✅ Cabeçalhos e rodapé padronizados

---

## 👨‍💻 Autor

**Andre Roberto Longo Garcia**

- 📧 E-mail: andregarcia81@gmail.com
- 🔗 GitHub: [@andregarcia81](https://github.com/andregarcia81)
- 🎓 Curso: Desenvolvimento de Software Multi-Plataforma
- 🏫 Instituição: FATEC — Franca/SP

---

## 📄 Licença

© 2026 — Andre Roberto Longo Garcia
Projeto desenvolvido para fins educacionais e acadêmicos. Distribuição livre para aprendizado e referência.