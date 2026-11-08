CREATE TABLE clientes_fornecedores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo ENUM('cliente','fornecedor') NOT NULL,
  nome VARCHAR(150) NOT NULL,
  razao_social VARCHAR(150),
  cpf_cnpj VARCHAR(20) UNIQUE,
  inscricao_estadual VARCHAR(20),
  inscricao_municipal VARCHAR(20),
  email VARCHAR(100),
  telefone VARCHAR(20),
  celular VARCHAR(20),
  rua VARCHAR(150),
  numero VARCHAR(10),
  complemento VARCHAR(50),
  bairro VARCHAR(100),
  cidade VARCHAR(100),
  estado VARCHAR(2),
  cep VARCHAR(10),
  banco VARCHAR(50),
  agencia VARCHAR(20),
  conta VARCHAR(20),
  forma_pagamento VARCHAR(50),
  observacoes TEXT
);

CREATE TABLE orcamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descricao VARCHAR(200),
  tipo ENUM('rede_eletrica','cabeamento_estruturado'),
  valor_total DECIMAL(10,2),
  data DATE,
  cliente_id INT,
  FOREIGN KEY (cliente_id) REFERENCES clientes_fornecedores(id)
);

CREATE TABLE materiais (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150),
  unidade VARCHAR(20), -- ex: metro, peça, caixa
  preco_unitario DECIMAL(10,2)
);

CREATE TABLE orcamento_itens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  orcamento_id INT,
  material_id INT,
  quantidade DECIMAL(10,2),
  subtotal DECIMAL(10,2),
  FOREIGN KEY (orcamento_id) REFERENCES orcamentos(id),
  FOREIGN KEY (material_id) REFERENCES materiais(id)
);

CREATE TABLE projetos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(200),
  tipo ENUM('rede_eletrica','cabeamento_estruturado'),
  data_inicio DATE,
  data_fim DATE,
  cliente_id INT,
  FOREIGN KEY (cliente_id) REFERENCES clientes_fornecedores(id)
);

CREATE TABLE projeto_orcamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  projeto_id INT,
  orcamento_id INT,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id),
  FOREIGN KEY (orcamento_id) REFERENCES orcamentos(id)
);

// api/controllers/projetoController.js
const connection = require("../../config/db");

// Criar projeto com orçamentos vinculados
exports.create = (req, res) => {
  const { nome, tipo, data_inicio, data_fim, cliente_id, orcamentos } = req.body;

  const sqlProjeto = `INSERT INTO projetos (nome, tipo, data_inicio, data_fim, cliente_id) VALUES (?, ?, ?, ?, ?)`;
  connection.query(sqlProjeto, [nome, tipo, data_inicio, data_fim, cliente_id], (err, result) => {
    if (err) throw err;
    const projetoId = result.insertId;

    orcamentos.forEach(orcamentoId => {
      const sqlRelacao = `INSERT INTO projeto_orcamentos (projeto_id, orcamento_id) VALUES (?, ?)`;
      connection.query(sqlRelacao, [projetoId, orcamentoId]);
    });

    res.send("Projeto criado com sucesso!");
  });
};

// Listar projetos com orçamentos
exports.list = (req, res) => {
  const sql = `
    SELECT p.id, p.nome, p.tipo, p.data_inicio, p.data_fim, c.nome AS cliente,
           o.id AS orcamento_id, o.descricao, o.valor_total
    FROM projetos p
    JOIN clientes_fornecedores c ON p.cliente_id = c.id
    LEFT JOIN projeto_orcamentos po ON p.id = po.projeto_id
    LEFT JOIN orcamentos o ON po.orcamento_id = o.id
  `;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

// Buscar projeto por ID
exports.getById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT p.id, p.nome, p.tipo, p.data_inicio, p.data_fim, c.nome AS cliente,
           o.id AS orcamento_id, o.descricao, o.valor_total
    FROM projetos p
    JOIN clientes_fornecedores c ON p.cliente_id = c.id
    LEFT JOIN projeto_orcamentos po ON p.id = po.projeto_id
    LEFT JOIN orcamentos o ON po.orcamento_id = o.id
    WHERE p.id = ?
  `;
  connection.query(sql, [id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

// Atualizar projeto
exports.update = (req, res) => {
  const { id } = req.params;
  const { nome, tipo, data_inicio, data_fim, cliente_id, orcamentos } = req.body;

  connection.query(
    `UPDATE projetos SET nome=?, tipo=?, data_inicio=?, data_fim=?, cliente_id=? WHERE id=?`,
    [nome, tipo, data_inicio, data_fim, cliente_id, id],
    (err) => {
      if (err) throw err;

      // Remove vínculos antigos
      connection.query(`DELETE FROM projeto_orcamentos WHERE projeto_id=?`, [id], (err) => {
        if (err) throw err;

        // Insere vínculos novos
        orcamentos.forEach(orcamentoId => {
          const sqlRelacao = `INSERT INTO projeto_orcamentos (projeto_id, orcamento_id) VALUES (?, ?)`;
          connection.query(sqlRelacao, [id, orcamentoId]);
        });

        res.send("Projeto atualizado com sucesso!");
      });
    }
  );
};

// Excluir projeto
exports.delete = (req, res) => {
  const { id } = req.params;

  connection.query(`DELETE FROM projeto_orcamentos WHERE projeto_id=?`, [id], (err) => {
    if (err) throw err;

    connection.query(`DELETE FROM projetos WHERE id=?`, [id], (err, results) => {
      if (err) throw err;
      if (results.affectedRows === 0) {
        res.status(404).send("Projeto não encontrado.");
      } else {
        res.send("Projeto excluído com sucesso!");
      }
    });
  });
};
