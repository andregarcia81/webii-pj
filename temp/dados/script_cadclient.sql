USE `dados262`;

--
-- Table structure for table `cadclient`
--

DROP TABLE IF EXISTS `cadclient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `cadclient` (
  `cli_codigo` INT NOT NULL AUTO_INCREMENT,
  `cli_tipo` CHAR(1) NOT NULL,              -- 'F' = Física, 'J' = Jurídica
  `cli_nome` VARCHAR(100) NOT NULL,         -- Nome completo ou Razão Social
  `cli_apelido` VARCHAR(50) DEFAULT NULL,   -- Apelido ou Nome Fantasia

  -- Campos específicos para PF
  `cli_cpf` VARCHAR(14) DEFAULT NULL,       -- CPF (Pessoa Física)
  `cli_rg` VARCHAR(20) DEFAULT NULL,        -- RG (Pessoa Física)

  -- Campos específicos para PJ
  `cli_cnpj` VARCHAR(18) DEFAULT NULL,      -- CNPJ (Pessoa Jurídica)
  `cli_ie` VARCHAR(20) DEFAULT NULL,        -- Inscrição Estadual (Pessoa Jurídica)

  -- Campos comuns
  `cli_email` VARCHAR(100) NOT NULL,
  `cli_telefone` VARCHAR(20) DEFAULT NULL,
  `cli_celular` VARCHAR(20) DEFAULT NULL,
  `cli_endereco` VARCHAR(150) NOT NULL,
  `cli_numero` VARCHAR(10) NOT NULL,
  `cli_complemento` VARCHAR(50) DEFAULT NULL,
  `cli_bairro` VARCHAR(50) NOT NULL,
  `cli_cidade` VARCHAR(50) NOT NULL,
  `cli_estado` CHAR(2) NOT NULL,
  `cli_cep` CHAR(9) NOT NULL,

  `cli_ativoinativo` CHAR(1) DEFAULT 'A',

  -- Constraints
  CONSTRAINT pk_cli_codigo PRIMARY KEY (`cli_codigo`),
  CONSTRAINT uk_cli_cpf UNIQUE (`cli_cpf`),
  CONSTRAINT uk_cli_cnpj UNIQUE (`cli_cnpj`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cadclient`
--

LOCK TABLES `cadclient` WRITE;
/*!40000 ALTER TABLE `cadclient` DISABLE KEYS */;

-- Pessoa Física
INSERT INTO `cadclient` 
(cli_tipo, cli_nome, cli_apelido, cli_cpf, cli_rg, cli_email, cli_telefone, cli_endereco, cli_numero, cli_bairro, cli_cidade, cli_estado, cli_cep, cli_ativoinativo)
VALUES 
('F', 'João da Silva', 'João', '123.456.789-00', '12.345.678-9', 'joao@email.com', '16-99999-9999',
 'Rua das Flores', '123', 'Centro', 'Franca', 'SP', '14400-000', 'A');

-- Pessoa Jurídica
INSERT INTO `cadclient` 
(cli_tipo, cli_nome, cli_apelido, cli_cnpj, cli_ie, cli_email, cli_telefone, cli_endereco, cli_numero, cli_bairro, cli_cidade, cli_estado, cli_cep, cli_ativoinativo)
VALUES 
('J', 'Empresa XPTO Ltda', 'XPTO', '12.345.678/0001-99', '123456789', 'contato@xpto.com.br', '11-3333-4444',
 'Av. Paulista', '1000', 'Bela Vista', 'São Paulo', 'SP', '01310-000', 'A');

 /*!40000 ALTER TABLE `cadclient` ENABLE KEYS */;
UNLOCK TABLES;

-- ============================
-- Pessoas Físicas (15 registros com CPFs únicos)
-- ============================
INSERT INTO cadclient
(cli_tipo, cli_nome, cli_apelido, cli_cpf, cli_rg, cli_email, cli_telefone, cli_endereco, cli_numero, cli_bairro, cli_cidade, cli_estado, cli_cep, cli_ativoinativo)
VALUES
('F','João da Silva','João','111.111.111-11','11.111.111-1','joao@email.com','16-99999-9999','Rua das Flores','123','Centro','Franca','SP','14400-000','A'),
('F','Maria Oliveira','Maria','222.222.222-22','22.222.222-2','maria@email.com','16-98888-7777','Rua das Acácias','45','Jardim','Franca','SP','14401-000','A'),
('F','Carlos Pereira','Carlos','333.333.333-33','33.333.333-3','carlos@email.com','16-97777-6666','Av. Brasil','200','Centro','Ribeirão Preto','SP','14000-000','A'),
('F','Ana Souza','Ana','444.444.444-44','44.444.444-4','ana@email.com','16-96666-5555','Rua das Palmeiras','78','Vila Nova','Campinas','SP','13000-000','A'),
('F','Pedro Santos','Pedro','555.555.555-55','55.555.555-5','pedro@email.com','16-95555-4444','Rua das Hortênsias','12','Centro','São Paulo','SP','01000-000','A'),
('F','Juliana Costa','Ju','666.666.666-66','66.666.666-6','juliana@email.com','16-94444-3333','Av. Independência','300','Jardim América','Franca','SP','14402-000','A'),
('F','Ricardo Almeida','Ricardo','777.777.777-77','77.777.777-7','ricardo@email.com','16-93333-2222','Rua das Orquídeas','56','Centro','Sorocaba','SP','18000-000','A'),
('F','Fernanda Lima','Fer','888.888.888-88','88.888.888-8','fernanda@email.com','16-92222-1111','Rua das Violetas','89','Jardim Paulista','São Paulo','SP','01400-000','A'),
('F','Paulo Henrique','PH','999.999.999-99','99.999.999-9','paulo@email.com','16-91111-0000','Av. das Nações','1500','Centro','Campinas','SP','13001-000','A'),
('F','Camila Rocha','Camila','123.456.789-01','12.345.678-1','camila@email.com','16-90000-9999','Rua das Magnólias','34','Centro','Franca','SP','14403-000','A'),
('F','Felipe Martins','Felipe','234.567.890-12','23.456.789-2','felipe@email.com','16-98877-6666','Av. Paulista','1500','Bela Vista','São Paulo','SP','01311-000','A'),
('F','Patrícia Gomes','Paty','345.678.901-23','34.567.890-3','patricia@email.com','16-97766-5555','Rua Augusta','500','Consolação','São Paulo','SP','01305-000','A'),
('F','Rodrigo Nunes','Rod','456.789.012-34','45.678.901-4','rodrigo@email.com','16-96655-4444','Rua das Laranjeiras','78','Centro','Franca','SP','14404-000','A'),
('F','Beatriz Fernandes','Bia','567.890.123-45','56.789.012-5','bia@email.com','16-95544-3333','Av. Brasil','250','Centro','Campinas','SP','13002-000','A'),
('F','Lucas Carvalho','Lucas','678.901.234-56','67.890.123-6','lucas@email.com','16-94433-2222','Rua das Oliveiras','90','Centro','Ribeirão Preto','SP','14001-000','A');

-- ============================
-- Pessoas Jurídicas (15 registros com CNPJs únicos)
-- ============================
INSERT INTO cadclient
(cli_tipo, cli_nome, cli_apelido, cli_cnpj, cli_ie, cli_email, cli_telefone, cli_endereco, cli_numero, cli_bairro, cli_cidade, cli_estado, cli_cep, cli_ativoinativo)
VALUES
('J','Empresa XPTO Ltda','XPTO','01.111.111/0001-01','111111111','contato@xpto.com.br','11-3333-4444','Av. Paulista','1000','Bela Vista','São Paulo','SP','01310-000','A'),
('J','Tech Solutions SA','TechSol','02.222.222/0001-02','222222222','contato@techsol.com','11-4444-5555','Rua Augusta','200','Consolação','São Paulo','SP','01305-000','A'),
('J','Construtora Alfa Ltda','Alfa','03.333.333/0001-03','333333333','contato@alfa.com','11-5555-6666','Av. Brasil','300','Centro','Campinas','SP','13000-000','A'),
('J','Supermercado Bom Preço','BomPre','04.444.444/0001-04','444444444','contato@bompreco.com','11-6666-7777','Rua das Flores','400','Centro','Franca','SP','14400-000','A'),
('J','Farmácia Saúde Ltda','Saúde','05.555.555/0001-05','555555555','contato@saude.com','11-7777-8888','Av. Independência','500','Jardim América','Franca','SP','14402-000','A'),
('J','Transportadora Rápida SA','Rapida','06.666.666/0001-06','666666666','contato@rapida.com','11-8888-9999','Rua das Palmeiras','600','Centro','Sorocaba','SP','18000-000','A'),
('J','Editora Cultura Ltda','Cultura','07.777.777/0001-07','777777777','contato@cultura.com','11-9999-0000','Av. das Nações','700','Centro','Campinas','SP','13001-000','A'),
('J','Agência Criativa Ltda','Criativa','08.888.888/0001-08','888888888','contato@criativa.com','11-1111-2222','Rua das Orquídeas','800','Centro','São Paulo','SP','01400-000','A'),
('J','Indústria Metalúrgica SA','Metal','09.999.999/0001-09','999999999','contato@metal.com','11-2222-3333','Rua das Violetas','900','Jardim Paulista','São Paulo','SP','01401-000','A'),
('J','Loja de Roupas Fashion','Fashion','10.101.010/0001-10','101010101','contato@fashion.com','11-3333-4444','Av. Paulista','1100','Bela Vista','São Paulo','SP','01311-000','A'),
('J','Restaurante Sabor Ltda','Sabor','11.111.111/0001-11','111111112','contato@sabor.com','11-4444-5555','Rua Augusta','1200','Consolação','São Paulo','SP','01306-000','A'),
('J','Escola Saber Ltda','Saber','12.121.212/0001-12','121212121','contato@saber.com','11-5555-6666','Rua das Laranjeiras','1300','Centro','Franca','SP','14404-000','A'),
('J','Hospital Vida SA','Vida','13.131.313/0001-13','131313131','contato@vida.com','11-6666-7777','Av. Brasil','1400','Centro','Campinas','SP','13002-000','A'),
('J','Clínica Bem Estar Ltda','BemEstar','14.141.414/0001-14','141414141','contato@bemestar.com','11-7777-8888','Rua das Oliveiras','1500','Centro','Ribeirão Preto','SP','14001-000','A'),
('J','Oficina Mecânica Turbo','Turbo','15.151.515/0001-15','151515151','contato@turbo.com','11-8888-9999','Av. Independência','1600','Centro','Sorocaba','SP','18001-000','A');
