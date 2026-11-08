const conexao = require("../../conexao/conexao.js");

function findAll(callback) {
  const sql = "SELECT * FROM cadclient ORDER BY cli_codigo";
  conexao.query(sql, callback);
}

function findOne(codigo, callback) {
  const codigoNum = Number(codigo);
  if (isNaN(codigoNum) || codigoNum <= 0) {
    console.log("❌ Código inválido:", codigo);
    return callback(new Error("Código inválido"));
  }
  conexao.query("SELECT * FROM cadclient WHERE cli_codigo = ?", [codigoNum], (err, res) => {
    if (err) return callback(err);
    if (!res || res.length === 0) return callback(null, null);
    callback(null, res[0]);
  });
}

function create(dados, callback) {
  if (!dados.cli_ativoinativo) dados.cli_ativoinativo = 'A';
  conexao.query("INSERT INTO cadclient SET ?", dados, (err, res) => {
    if (err) return callback(err);
    findOne(res.insertId, callback);
  });
}

function update(dados, codigo, callback) {
  const codigoNum = Number(codigo);
  conexao.query("UPDATE cadclient SET ? WHERE cli_codigo = ?", [dados, codigoNum], (err) => {
    if (err) return callback(err);
    findOne(codigoNum, callback);
  });
}

function remove(codigo, callback) {
  const codigoNum = Number(codigo);
  conexao.query("DELETE FROM cadclient WHERE cli_codigo = ?", [codigoNum], callback);
}

function ativoinativo(codigo, callback) {
  const codigoNum = Number(codigo);
  console.log("🔍 Model — código recebido:", codigoNum);
  
  if (isNaN(codigoNum) || codigoNum <= 0) {
    return callback(new Error("Código inválido"));
  }

  findOne(codigoNum, (err, registro) => {
    if (err || !registro) {
      console.log("❌ Registro não encontrado");
      return callback(new Error("Cliente não encontrado"));
    }

    const novoStatus = registro.cli_ativoinativo === 'A' ? 'I' : 'A';

    conexao.query(
      "UPDATE cadclient SET cli_ativoinativo = ? WHERE cli_codigo = ?",
      [novoStatus, codigoNum],
      (err) => {
        if (err) return callback(err);
        
        const retorno = {
          cli_codigo: registro.cli_codigo,
          cli_nome: registro.cli_nome,
          cli_ativoinativo: novoStatus
        };
        
        console.log("📤 Retorno:", retorno);
        callback(null, retorno);
      }
    );
  });
}

module.exports = { findAll, findOne, create, update, remove, ativoinativo };