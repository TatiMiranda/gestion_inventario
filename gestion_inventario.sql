-- Crear la base de datos con el conjunto de caracteres y la colación correctos
CREATE DATABASE IF NOT EXISTS gestionInventario CHARACTER SET utf8 COLLATE utf8_general_ci;
USE gestionInventario;

-- Tabla para gestionar las categorías de los equipos
CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_modificacion DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Tabla para almacenar la información de los proveedores
CREATE TABLE proveedores (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),
    telefono VARCHAR(10),
    email VARCHAR(30)
);

-- Tabla para los usuarios del sistema
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),
    apellido VARCHAR(50),
    email VARCHAR(20),
    telefono VARCHAR(10),
    direccion VARCHAR(30),
    rol ENUM('superAdmin', 'admin') NOT NULL DEFAULT 'admin',
    contraseña VARCHAR(20) NOT NULL
);

-- Tabla para las sedes de la empresa
CREATE TABLE sedes (
    id_sede INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE
);

-- Tabla para los centros de costos
CREATE TABLE centro_costos (
    id_centro_costo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    codigo VARCHAR(10) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_modificacion DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Tabla para los equipos, que depende de categorias, sedes y proveedores
CREATE TABLE equipos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    serial VARCHAR(30) NOT NULL,
    marca VARCHAR(20) NOT NULL,
    modelo VARCHAR(20) NOT NULL,
    descripcion VARCHAR(100),
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    id_categoria INT NOT NULL,
    id_sede INT NOT NULL,
    id_proveedor INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
    FOREIGN KEY (id_sede) REFERENCES sedes(id_sede),
    FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor)
);

-- Tabla para el stock, que depende de la tabla de categorías
CREATE TABLE stock (
    id_stock INT AUTO_INCREMENT PRIMARY KEY,
    cantidad INT,
    ubicacion VARCHAR(50),
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)

);

-- Tabla para el seguimiento, que depende de proveedores, usuarios, categorias y sedes
CREATE TABLE seguimiento (
    id_seguimiento INT AUTO_INCREMENT PRIMARY KEY,
    id_proveedor INT NOT NULL,
    id_usuario INT NOT NULL,
    id_categoria INT NOT NULL,
    id_sede INT NOT NULL,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    descripcion VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
    FOREIGN KEY (id_sede) REFERENCES sedes(id_sede)
);
