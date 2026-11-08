const express = require("express");
const path = require("path");
const app = express();

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Importa a conexão do DB
const conexao = require("./conexao/conexao");

// Configuração do EJS
// Observação: apontamos para api/views, assim podemos organizar várias subpastas
const viewsPath = path.join(__dirname, "api", "views");
app.set("view engine", "ejs");
app.set("views", viewsPath);
console.log("📂 ViewsPath configurado:", viewsPath);

// Middleware para interpretar JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (CSS, JS, imagens)
// Observação: tudo que estiver dentro de /public pode ser acessado direto pela URL
app.use(express.static(path.join(__dirname, "public")));

// Importando rotas
const indexRoutes = require("./api/routes/indexRoutes");
const empresaRoutes = require("./api/routes/empresaRoutes");
const livrosRoutes = require("./api/routes/livrosRoutes");
const cepRoutes = require("./api/routes/cepRoutes");
const cadclientRoutes = require("./api/routes/cadclientRoutes");
const construtoraRoutes = require("./api/routes/construtoraRoutes");

// Usando as rotas
// Observação: qualquer rota que começar com /empresa será tratada pelo empresaRoutes
app.use("/", indexRoutes);
app.use("/empresa", empresaRoutes);
app.use("/livros", livrosRoutes);
app.use("/", cepRoutes);
app.use("/cadclient", cadclientRoutes)
app.use("/construtora", construtoraRoutes);

// Porta do servidor
// const PORT = process.env.PORT || 3000;

// Configuração da Porta usando variáveis de ambiente para maior segurança
// Configuração da Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

