# Each row represents a single card.
CREATE TABLE IF NOT EXISTS Card (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(50) UNIQUE NOT NULL,
  description VARCHAR(255) NOT NULL,
  powercost   INT NOT NULL
);

# Each row represents a single user.
CREATE TABLE IF NOT EXISTS User (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user        VARCHAR(20) UNIQUE NOT NULL,
  email       VARCHAR(50) UNIQUE NOT NULL,
  pass        VARCHAR(255) NOT NULL
);

# A junction table between users and cards.
# Represents the card collections of all users.
CREATE TABLE IF NOT EXISTS Collection (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  card_id     INT NOT NULL,

  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES User(id),
  CONSTRAINT fk_card
    FOREIGN KEY (card_id)
    REFERENCES Card(id)
);

# Insert cards.
INSERT INTO Card(name, description, powercost) VALUES("Monster", "This is a Monster.", 3);
