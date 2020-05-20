DROP TABLE IF EXISTS fitness_dev.roles;
DROP TABLE IF EXISTS fitness_dev.user_auth;

CREATE TABLE fitness_dev.roles(
  role_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(15) NOT NULL
);

INSERT INTO fitness_dev.roles(name)
VALUES ('user'), ('admin'), ('super');

CREATE TABLE fitness_dev.user_auth(
user_auth_id SERIAL PRIMARY KEY,
email VARCHAR(255) NOT NULL,
hash TEXT NOT NULL,
role_id INT NOT NULL REFERENCES fitness_dev.roles("role_id")
);

CREATE TABLE fitness_dev.users(
  user_id SERIAL PRIMARY KEY,
  auth_id INT REFERENCES fitness_dev.user_auth("user_auth_id"),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(150)
);