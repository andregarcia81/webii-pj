/**
 * Controlador — Sistema de Gestão da Construtora
 * Arquivo: controllers/construtoraController.js
 */

const conexao = require("../../conexao/conexao");

const nomeProjeto = "Meu Primeiro Projeto Backend - NodeJs - Express - Mysql - DotEnv - EJS - NodeMon";
const nomeAutor = "Andre R. L. Garcia";

class ConstrutoraController {

    // ==================================================
    // HOME
    // ==================================================
    index(req, res) {
        res.render("construtora/index", {
            nomeProjeto,
            nomeAutor
        });
    }

    // ==================================================
    // ENGENHEIROS
    // ==================================================
    engenheiro(req, res) {
        res.render("construtora/engenheiro", {
            title: "Cadastro de Engenheiros",
            nomeProjeto,
            nomeAutor
        });
    }

    listarEngenheiros(req, res) {
        const sql = `
            SELECT *
            FROM const_engenheiro
            ORDER BY eng_nome
        `;

        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                console.log(erro);
                return res.send("Erro ao listar engenheiros.");
            }

            res.render("construtora/listaEngenheiros", {
                title: "Lista de Engenheiros",
                nomeProjeto,
                nomeAutor,
                engenheiros: resultado
            });
        });
    }

    salvarEngenheiro(req, res) {
        const {
            eng_nome,
            eng_apelido,
            eng_telefone,
            eng_crea,
            eng_datacrea
        } = req.body;

        const sql = `
            INSERT INTO const_engenheiro
            (
                eng_nome,
                eng_apelido,
                eng_telefone,
                eng_crea,
                eng_datacrea
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        conexao.query(
            sql,
            [
                eng_nome,
                eng_apelido,
                eng_telefone,
                eng_crea,
                eng_datacrea
            ],
            (erro) => {
                if (erro) {
                    console.log(erro);
                    return res.send("Erro ao cadastrar engenheiro.");
                }
                res.redirect("/construtora/engenheiros/listar");
            }
        );
    }

    editarEngenheiro(req, res) {
        const id = req.params.id;

        const sql = `
            SELECT *
            FROM const_engenheiro
            WHERE eng_codigo = ?
        `;

        conexao.query(sql, [id], (erro, resultado) => {
            if (erro) {
                console.log(erro);
                return res.send("Erro ao localizar engenheiro.");
            }

            if (resultado.length === 0) {
                return res.send("Engenheiro não encontrado.");
            }

            res.render(
                "construtora/editarEngenheiro",
                {
                    title: "Editar Engenheiro",
                    nomeProjeto,
                    nomeAutor,
                    engenheiro: resultado[0]
                }
            );
        });
    }

    atualizarEngenheiro(req, res) {
        const id = req.params.id;

        const {
            eng_nome,
            eng_apelido,
            eng_telefone,
            eng_crea,
            eng_datacrea
        } = req.body;

        const sql = `
            UPDATE const_engenheiro
            SET
                eng_nome = ?,
                eng_apelido = ?,
                eng_telefone = ?,
                eng_crea = ?,
                eng_datacrea = ?
            WHERE eng_codigo = ?
        `;

        conexao.query(
            sql,
            [
                eng_nome,
                eng_apelido,
                eng_telefone,
                eng_crea,
                eng_datacrea,
                id
            ],
            (erro) => {
                if (erro) {
                    console.log(erro);
                    return res.send("Erro ao atualizar engenheiro.");
                }
                res.redirect("/construtora/engenheiros/listar");
            }
        );
    }

    excluirEngenheiro(req, res) {
        const id = req.params.id;

        const sqlObras = `
            DELETE FROM const_obra
            WHERE eng_codigo = ?
        `;

        const sqlEngenheiro = `
            DELETE FROM const_engenheiro
            WHERE eng_codigo = ?
        `;

        conexao.query(sqlObras, [id], (erro) => {
            if (erro) {
                console.log(erro);
                return res.send("Erro ao remover obras relacionadas.");
            }

            conexao.query(
                sqlEngenheiro,
                [id],
                (erro) => {
                    if (erro) {
                        console.log(erro);
                        return res.send("Erro ao excluir engenheiro.");
                    }
                    res.redirect("/construtora/engenheiros/listar");
                }
            );
        });
    }

    // ==================================================
    // OBRAS
    // ==================================================
    cadobra(req, res) {
        const sql = `
            SELECT
                eng_codigo,
                eng_nome
            FROM const_engenheiro
            ORDER BY eng_nome
        `;

        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                console.log(erro);
                return res.send("Erro ao carregar engenheiros.");
            }

            res.render("construtora/cadobra", {
                title: "Cadastro de Obras",
                nomeProjeto,
                nomeAutor,
                engenheiros: resultado
            });
        });
    }

    listarObras(req, res) {
        const sql = `
            SELECT
                o.*,
                e.eng_nome
            FROM const_obra o
            INNER JOIN const_engenheiro e
                ON o.eng_codigo = e.eng_codigo
            ORDER BY o.obr_codigo
        `;

        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                console.log(erro);
                return res.send("Erro ao listar obras.");
            }

            res.render("construtora/listaObras", {
                title: "Lista de Obras",
                nomeProjeto,
                nomeAutor,
                obras: resultado
            });
        });
    }

    salvarObra(req, res) {
        const {
            obr_cidade,
            obr_tipoobra,
            obr_valor,
            obr_dtinicio,
            eng_codigo
        } = req.body;

        const sql = `
            INSERT INTO const_obra
            (
                obr_cidade,
                obr_tipoobra,
                obr_valor,
                obr_dtinicio,
                eng_codigo
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        conexao.query(
            sql,
            [
                obr_cidade,
                obr_tipoobra,
                obr_valor,
                obr_dtinicio,
                eng_codigo
            ],
            (erro) => {
                if (erro) {
                    console.log(erro);
                    return res.send("Erro ao cadastrar obra.");
                }
                res.redirect("/construtora/obras/listar");
            }
        );
    }

    editarObra(req, res) {
        const id = req.params.id;

        const sqlObra = `
            SELECT *
            FROM const_obra
            WHERE obr_codigo = ?
        `;

        const sqlEng = `
            SELECT *
            FROM const_engenheiro
            ORDER BY eng_nome
        `;

        conexao.query(sqlObra, [id], (erro, obra) => {
            if (erro) {
                return res.send("Erro");
            }

            conexao.query(sqlEng, (erro, engenheiros) => {
                if (erro) {
                    return res.send("Erro");
                }

                res.render(
                    "construtora/editarObra",
                    {
                        obra: obra[0],
                        engenheiros,
                        title: "Editar Obra",
                        nomeProjeto,
                        nomeAutor
                    }
                );
            });
        });
    }

    atualizarObra(req, res) {
        const id = req.params.id;

        const {
            obr_cidade,
            obr_tipoobra,
            obr_valor,
            obr_dtinicio,
            eng_codigo
        } = req.body;

        const sql = `
            UPDATE const_obra
            SET
                obr_cidade = ?,
                obr_tipoobra = ?,
                obr_valor = ?,
                obr_dtinicio = ?,
                eng_codigo = ?
            WHERE obr_codigo = ?
        `;

        conexao.query(
            sql,
            [
                obr_cidade,
                obr_tipoobra,
                obr_valor,
                obr_dtinicio,
                eng_codigo,
                id
            ],
            (erro) => {
                if (erro) {
                    console.log(erro);
                    return res.send("Erro ao atualizar obra.");
                }
                res.redirect("/construtora/obras/listar");
            }
        );
    }

    excluirObra(req, res) {
        const id = req.params.id;

        const sql = `
            DELETE FROM const_obra
            WHERE obr_codigo = ?
        `;

        conexao.query(sql, [id], (erro) => {
            if (erro) {
                console.log(erro);
                return res.send("Erro ao excluir obra.");
            }
            res.redirect("/construtora/obras/listar");
        });
    }
}

module.exports = new ConstrutoraController();
