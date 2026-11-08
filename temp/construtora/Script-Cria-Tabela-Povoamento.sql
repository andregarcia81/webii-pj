USE `dados262`;

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

-- CONSULTA DE TESTE
SELECT
    e.eng_codigo,
    e.eng_nome,
    o.obr_codigo,
    o.obr_cidade,
    o.obr_tipoobra,
    o.obr_valor
FROM const_engenheiro e
INNER JOIN const_obra o
    ON e.eng_codigo = o.eng_codigo;