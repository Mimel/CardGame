CREATE TABLE IF NOT EXISTS Card (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(50) NOT NULL,
  description VARCHAR(200) NOT NULL,
  powercost   INT NOT NULL
);

INSERT INTO Card(name, description, powercost) VALUES("Monster", "This is a Monster.", 3);
