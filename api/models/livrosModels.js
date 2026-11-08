const conexao = require("../../conexao/conexao.js")

module.exports = {
    findAll, findOne, create, update, remove, ativoinativo
}

function findAll(callback) {
    var m_sql = "Select * from livros "
    conexao.query(m_sql, callback)
}

function findOne(id, callback) {
    var m_sql = "Select * from livros where liv_codigo = " + id
    conexao.query(m_sql, callback)
}

function create(dados, callback) {
    var m_sql = "INSERT INTO LIVROS SET ? "
    conexao.query(m_sql, dados, callback)
}

function update(dados, codigo, callback) {
    const camposValidos = [
        "liv_titulo",
    ];

    const dadosFiltrados = {};
    camposValidos.forEach(campo => {
        if (dados[campo] !== undefined) {
            dadosFiltrados[campo] = dados[campo];
        }
    });

    if (Object.keys(dadosFiltrados).length === 0) {
        return callback(new Error("Nenhum campo válido para atualizar"));
    }

    const sql = "UPDATE LIVROS SET ? WHERE liv_codigo = ?";
    conexao.query(sql, [dadosFiltrados, codigo], (err, resultado) => {
        if (err) return callback(err, null);
        callback(null, resultado);
    });
}

function remove(id, callback) {
    var m_sql = `DELETE from LIVROS WHERE liv_codigo = ${id}`
    conexao.query(m_sql, id, callback)
}

function ativoinativo(id, ativo, callback) {
    var m_sql = `UPDATE LIVROS SET liv_ativoinativo = '${ativo}' WHERE liv_codigo = ${id}`
    console.log(m_sql)
    conexao.query(m_sql, callback)
}
