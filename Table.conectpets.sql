CREATE DATABASE IF NOT EXISTS plataforma_veterinaria 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE plataforma_veterinaria;

CREATE TABLE cidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL
);

CREATE TABLE servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    descricao TEXT
);

CREATE TABLE profissionais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    tipo_profissional ENUM('Veterinário', 'Auxiliar Veterinário', 'Esteticista Pet', 'Consultor Comportamental', 'Outro') NOT NULL,
    telefone VARCHAR(30),
    email VARCHAR(150),
    cidade_id INT NOT NULL,
    descricao TEXT,
    FOREIGN KEY (cidade_id) REFERENCES cidades(id)
);

CREATE TABLE profissional_servico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    profissional_id INT NOT NULL,
    servico_id INT NOT NULL,
    FOREIGN KEY (profissional_id) REFERENCES profissionais(id),
    FOREIGN KEY (servico_id) REFERENCES servicos(id)
);

INSERT INTO servicos (nome, descricao) VALUES
('Consulta Veterinária', 'Atendimento clínico geral'),
('Vacinação', 'Aplicação de vacinas obrigatórias e recomendadas'),
('Castração', 'Procedimento cirúrgico de esterilização'),
('Exames Laboratoriais', 'Exames de sangue, urina, fezes, etc.'),
('Ultrassom Animal', 'Diagnóstico por imagem'),
('Cirurgia', 'Procedimentos cirúrgicos veterinários'),
('Dermatologia Veterinária', 'Atendimento especializado'),
('Cardiologia Veterinária', 'Avaliação e tratamento de doenças cardíacas'),
('Terapia Comportamental', 'Correção de comportamentos e ansiedade'),
('Banho e Tosa', 'Serviços estéticos para pets');

INSERT INTO cidades (nome, estado) VALUES 
('São Paulo', 'SP'),
('Rio de Janeiro', 'RJ'),
('Curitiba', 'PR'),
('Porto Alegre', 'RS');

 INSERT INTO profissionais (nome, tipo_profissional, telefone, email, cidade_id, descricao) VALUES
('Dra. Ana Silva', 'Veterinário', '(11) 99999-1111', 'ana.vet@example.com', 1, 'Especialista em comportamento animal e clínica geral.'),
('João Almeida', 'Esteticista Pet', '(11) 98888-2222', 'joao.petgroom@example.com', 1, 'Banho e tosa humanizada para cães e gatos.'),
('Dr. Felipe Souza', 'Veterinário', '(21) 91234-5678', 'felipe.vet@exemplo.com', 2, 'Cirurgião e especialista em felinos.');

 INSERT INTO profissional_servico (profissional_id, servico_id) VALUES
(1, 1), -- Dra Ana: consulta
(1, 9), -- comportamento
(2, 10), -- João: banho e tosa
(3, 1), -- Felipe: consulta
(3, 6); -- Felipe: cirurgias

SELECT p.nome AS profissional, s.nome AS servico, c.nome AS cidade
FROM profissionais p
JOIN profissional_servico ps ON p.id = ps.profissional_id
JOIN servicos s ON ps.servico_id = s.id
JOIN cidades c ON c.id = p.cidade_id;
