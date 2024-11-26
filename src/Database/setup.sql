-- Cria o usuário
CREATE USER 'bonfireMemories'@'%' IDENTIFIED BY 'bonfireMemories';

-- Concede as permissões necessárias
GRANT SELECT, INSERT, DELETE, UPDATE ON *.* TO 'bonfireMemories'@'%';

-- Aplica as mudanças
FLUSH PRIVILEGES;
