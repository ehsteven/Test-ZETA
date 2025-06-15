-- Tabla para guardar usuarios y sus roles
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL UNIQUE, 
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR (255) NOT NULL,
	role VARCHAR(50) NOT NULL DEFAULT 'user', 
	created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para guardar los productos
CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description TEXT, 
	price NUMERIC(10, 2) NOT NULL,
	image_url VARCHAR(255),
	category VARCHAR(100),
	stock INT DEFAULT 0,
	created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inserts algunos productos 
INSERT INTO products (name, description, price, image_url, category, stock) VALUES
('Laptop Pro', 'Una laptop potente para profesionales.', 1200.00, 'https://placehold.co/600x400/EEE/31343C?text=Laptop+Pro', 'Electrónica', 50),
('Smartphone X', 'El último modelo de smartphone con cámara IA.', 800.50, 'https://placehold.co/600x400/EEE/31343C?text=Smartphone+X', 'Electrónica', 120),
('Auriculares Inalámbricos', 'Calidad de sonido superior y cancelación de ruido.', 150.75, 'https://placehold.co/600x400/EEE/31343C?text=Auriculares', 'Accesorios', 300),
('Teclado Mecánico', 'Teclado para gaming con switches rojos.', 99.99, 'https://placehold.co/600x400/EEE/31343C?text=Teclado', 'Periféricos', 80),
('Monitor 4K', 'Monitor de 27 pulgadas con resolución 4K UHD.', 450.00, 'https://placehold.co/600x400/EEE/31343C?text=Monitor+4K', 'Monitores', 60),
('Silla Ergonómica', 'Silla de oficina para máxima comodidad.', 250.00, 'https://placehold.co/600x400/EEE/31343C?text=Silla', 'Oficina', 40),
('Libro de Programación', 'Aprende a programar con ejemplos prácticos.', 45.50, 'https://placehold.co/600x400/EEE/31343C?text=Libro', 'Libros', 150),
('Taza de Café Geek', 'La taza perfecta para un desarrollador.', 15.00, 'https://placehold.co/600x400/EEE/31343C?text=Taza', 'Hogar', 200),
('Mochila para Laptop', 'Transporta tu equipo de forma segura y con estilo.', 55.00, 'https://placehold.co/600x400/EEE/31343C?text=Mochila', 'Accesorios', 90),
('Ratón Gaming', 'Ratón óptico con alta precisión y luces RGB.', 60.00, 'https://placehold.co/600x400/EEE/31343C?text=Ratón', 'Periféricos', 110),
('Cámara Web HD', 'Cámara para streaming y videoconferencias.', 75.00, 'https://placehold.co/600x400/EEE/31343C?text=Cámara+Web', 'Electrónica', 70);


INSERT INTO users (username, email, password, role) VALUES
	('Paco', 'paco@gmail.com', '$2a$10$fzAodYqjUylJG4KbPII2HO9nBxX.gDhhHR5u/2Y2bS8z/BIwcIWAW', 'user'),
	('Admin', 'admin@admin.com', '$2a$10$MfbdByUJWgimr2qknGfH.eOd5Wp1E4cDBhJFdSedhhDlRHwc1oWFG', 'admin');