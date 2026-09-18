CREATE DATABASE PERU_CARS;

USE PERU_CARS;

CREATE TABLE vehiculos(
	id 					INT AUTO_INCREMENT PRIMARY KEY,
    marca 				VARCHAR(50) NOT NULL,
    categoria			VARCHAR(30) NOT NULL,
    modelo 				VARCHAR(50) NOT NULL,
    anio_fabricacion	SMALLINT 	NOT NULL,
    precio				DECIMAL(10,2) NOT NULL,
    create_at 			DATETIME	NOT NULL DEFAULT NOW(),
    update_at			DATETIME	NULL
)ENGINE = INNODB;

INSERT INTO vehiculos (marca, categoria, modelo, anio_fabricacion, precio)
	VALUES
    ('Hyundai', 'SUV', 'Tucson', 2024, 28500.00),
    ('Kia', 'Hatchback', 'Picanto', 2025, 13990.00),
	('Toyota', 'Pick-up', 'Hilux', 2023, 34000.00);
    
SELECT *  FROM vehiculos;
    
DROP DATABASE PERU_CARS;
