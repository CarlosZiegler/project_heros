
-- Drop the table 'TB_HEROIS' in schema 'Heros'

DROP TABLE IF EXISTS TB_HEROIS;

-- Create the table in the specified schema
CREATE TABLE TB_HEROIS
(
    ID INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY, -- primary key column
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
    -- specify more columns here
);

-- Insert rows into table 'TB_HEROIS'
INSERT INTO TB_HEROIS ( NOME, PODER)
VALUES
( 'Flash', 'Velocidade'),
('Aquaman','Marinho'),
('Batman','Dinheiro');


-- Select rows from a Table or View 'TB_HEROIS'
seleCt * from TB_HEROIS;

-- Select rows from a Table or View 'TB_HEROIS'
SELECT * FROM TB_HEROIS
WHERE NAME='Flash'


-- Update rows in table 'TableName'
UPDATE TB_HEROIS
SET
    NOME = 'Goku',
    PODER = 'Deus'
    -- add more columns and values here
WHERE ID = 1	/* add search conditions here */

-- Delete rows from table 'TableName'
DELETE FROM TB_HEROIS
WHERE id=2
GO