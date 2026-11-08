const mysql = require("mysql2");

// carrega o .env
require("dotenv").config(); 

// Configuração da conexão insegura, mostrando dados
//const conexao = mysql.createConnection({
//  host: process.env.DB_HOST || "localhost",
//  port: process.env.DB_PORT || 3306,
//  user: process.env.DB_USER || "root",
//  password: process.env.DB_PASSWORD || "12345678",
//  database: process.env.DB_NAME || "dados262"
//});

// Configuração da conexão usando variáveis de ambiente para maior segurança
// Conexão mais segura recebendo as informacoes atraves do arquivo de configuracao .env
const conexao = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Testando a conexão
conexao.connect((err) => {
  if (err) {
    console.error("❌ Erro ao conectar com o banco de dados:", err.stack);
    process.exit(1); // encerra a aplicação se não conectar
  } else {
    console.log("✅ Conexão com o banco de dados estabelecida com sucesso!");
  }
});

module.exports = conexao;