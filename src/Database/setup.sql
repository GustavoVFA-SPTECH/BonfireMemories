-- Cria o usuário
CREATE USER 'bonfireMemories'@'%' IDENTIFIED BY 'bonfireMemories#2024';

-- Concede as permissões necessárias
GRANT ALL ON *.* TO 'bonfireMemories'@'%';

-- Aplica as mudanças
FLUSH PRIVILEGES;
