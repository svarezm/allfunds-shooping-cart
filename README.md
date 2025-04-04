
# 🛒 E-commerce App – Proyecto Técnico

Este es un proyecto técnico de una aplicación web de e-commerce construida con **React**, **TypeScript** y **Express**, que permite listar productos, añadirlos al carrito, gestionar cantidades, ver favoritos y más.

---

## 📁 Estructura del proyecto

```
my-ecommerce-project/
├── client/        # Frontend en React + TS
├── server/        # Backend en Express (API REST simulada con db.json)
├── README.md      # Este archivo
```

---

## 🚀 Cómo ejecutar el proyecto localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/tu-repo.git
cd my-ecommerce-project
```

### 2. Instalar dependencias

#### Backend (API)
```bash
cd server
npm install
node server.js
```

La API quedará corriendo en `http://localhost:3001`

#### Frontend (React)
```bash
cd ../client
npm install
npm run dev
```

La app se abrirá en `http://localhost:5173` (o el puerto de Vite)

---

## ⚙️ Scripts útiles

### Frontend
- `npm run dev` – Iniciar entorno de desarrollo
- `npm run build` – Generar build de producción
- `npm run preview` – Servir build localmente

### Backend
- `node server.js` – Iniciar API con Express leyendo `db.json`

---

## 🌐 Despliegue (opcional)

Puedes subir el frontend a **Vercel**, **Netlify** o **GitHub Pages**, y el backend a **Render**, **Railway**, etc.

---

## 📦 Tecnologías usadas

- React + TypeScript
- Express + Node.js
- Material UI
- Context API
- JSON server custom
- Vite

---

## ✅ Funcionalidades

- Listado de productos con paginación
- Añadir al carrito y modificar cantidades
- Mostrar stock disponible
- Calcular total del carrito
- Marcar y listar productos favoritos
- Diseño responsive y navegación entre vistas

---

## 🧪 Testing

Si implementaste tests, describe cómo ejecutarlos aquí:

```bash
npm test
```

---

## ✍️ Autor

Proyecto realizado por [Tu Nombre] – [Tu GitHub o LinkedIn]
