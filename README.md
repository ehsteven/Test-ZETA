## Instrucciones de Ejecución

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- PostgreSQL instalado y corriendo

---

### 1. Configuración de la Base de Datos

1. Abre terminal o pgAdmin.
2. Crea la base de datos:

```sql
CREATE DATABASE e-commerce-tecno; 
```

3. Conéctate a la base y ejecuta el script backend/database.sql para crear las tablas users y products y agregar algunos productos.

### 2. Configuración del Backend
1. Ve a la carpeta backend:

```bash 
cd backend
```

2. Instala dependencias:

```bash 
npm install
```

3. Crea un archivo .env en la raíz de backend con estas variables (usa tus configuraciones):

```
DB_USER=usuario_postgres
DB_HOST=localhost
DB_DATABASE=e-commerce-tecno
DB_PASSWORD=contraseña_postgres
DB_PORT=5432
JWT_SECRET=tu_secreto_super_secreto_para_jwt
PORT=5000

```
4. Inicia el servidor backend:

```bash
npm run dev
```

El backend correrá en http://localhost:5000.

### 3. Configuración del Frontend
1. En otra terminal y ve a la carpeta frontend:
```bash 
npm frontend
```
2. Instala dependencias:
```bash 
npm install
```
3. Crea un archivo .env.local en la raíz de frontend con esta variable:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
4. Inicia la aplicación frontend:
```bash
npm run dev
```
El frontend estará disponible en http://localhost:3000.