-- Your SQL goes here
-- Your SQL goes here
CREATE TABLE dev_fonts (
  id INTEGER NOT NULL PRIMARY KEY,
  title VARCHAR NOT NULL,
  installed BOOLEAN NOT NULL DEFAULT 'f'
);