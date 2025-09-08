CREATE DATABASE IF NOT EXISTS gestion_inventario;
USE gestion_inventario;

CREATE TABLE IF NOT EXISTS categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    estado DECIMAL(10, 2) NOT NULL,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS equipos(
    id_equipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    codigoProducto VARCHAR(50) UNIQUE NOT NULL,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

CREATE TABLE IF NOT EXISTS sedes (
    id_sede VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion TEXT
);

CREATE TABLE IF NOT EXISTS stock (
    id_stock INT AUTO_INCREMENT PRIMARY KEY,
    id_equipo INT,
    cantidad INT NOT NULL,
    id_sede VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_sede) REFERENCES sedes (id_sede),
    FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo)
);

CREATE TABLE IF NOT EXISTS seguimiento (
    id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
    id_equipo INT,
    cantidad INT NOT NULL,
    tipo_movimiento ENUM('entrada', 'salida') NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_sede_origen VARCHAR(50),
    id_sede_destino VARCHAR(50),
    FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo),
    FOREIGN KEY (id_sede_origen) REFERENCES sedes(id_sede),
    FOREIGN KEY (id_sede_destino) REFERENCES sedes(id_sede)
);

CREATE TABLE IF NOT EXISTS proveedores (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_equipo INT,
    id_stock INT,
    FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo),
    FOREIGN KEY (id_stock) REFERENCES stock(id_stock)
);

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(15),
    direccion TEXT,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'usuario') NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS centro_costos (
    id_centroCostos INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_sede VARCHAR(50),
    id_equipo INT,
    id_seguimiento INT,
    FOREIGN KEY (id_sede) REFERENCES sedes(id_sede),
    FOREIGN KEY (id_seguimiento) REFERENCES seguimiento(id_movimiento),
    FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo)
);
