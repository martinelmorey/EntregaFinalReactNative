# REM E-commerce - Aplicación de React Native

## Descripción
REM E-commerce es una aplicación móvil desarrollada con React Native y Expo que ofrece una experiencia completa de compra en línea. La aplicación permite a los usuarios navegar por productos, agregarlos al carrito, gestionar listas de favoritos y realizar pedidos, todo con una interfaz moderna y atractiva.

## Características Principales

- **Autenticación de Usuarios**: Sistema completo de registro e inicio de sesión con persistencia mediante SQLite local.
- **Catálogo de Productos**: Visualización de productos con detalles, imágenes y descripciones.
- **Carrito de Compras**: Funcionalidad para agregar productos al carrito con selector de cantidad.
- **Lista de Favoritos**: Sistema para guardar y gestionar productos favoritos con persistencia en Firebase.
- **Gestión de Órdenes**: Creación y seguimiento de pedidos.
- **Interfaz de Usuario Moderna**: Diseño atractivo con gradientes, animaciones y fuentes personalizadas (Ubuntu).
- **Integración con Firebase**: Almacenamiento de datos en Firebase Realtime Database.

## Tecnologías Utilizadas

- **React Native**: Framework principal para el desarrollo de la aplicación móvil.
- **Expo**: Plataforma para facilitar el desarrollo y despliegue.
- **Redux Toolkit**: Gestión de estado global con RTK Query para la comunicación con APIs.
- **Firebase Realtime Database**: Base de datos en tiempo real para almacenar favoritos, listas y órdenes.
- **SQLite**: Almacenamiento local para sesiones de usuario.
- **React Navigation**: Navegación entre pantallas con stack y tabs.
- **Expo Font**: Carga de fuentes personalizadas (Ubuntu).
- **Expo Image Picker**: Selección de imágenes para perfiles de usuario.
- **React Native Vector Icons**: Iconos para mejorar la interfaz de usuario.
- **Expo Linear Gradient**: Fondos degradados para mejorar la estética.
- **Yup**: Validación de formularios.

## Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables (AnimatedError, FlatCard, etc.)
├── data/            # Datos estáticos y mocks
├── features/        # Slices de Redux (shop, cart, user)
├── global/          # Estilos y configuraciones globales
├── navigation/      # Configuración de navegación
├── screens/         # Pantallas de la aplicación
│   ├── auth/        # Pantallas de autenticación
│   ├── cart/        # Pantalla de carrito
│   ├── list/        # Pantalla de favoritos
│   ├── orders/      # Pantalla de órdenes
│   ├── shop/        # Pantallas de tienda y productos
│   └── user/        # Pantalla de perfil de usuario
├── services/        # Servicios de API con RTK Query
│   ├── auth/        # Servicios de autenticación
│   ├── lista/       # Servicios para gestión de favoritos
│   ├── orders/      # Servicios para gestión de órdenes
│   ├── shop/        # Servicios para productos
│   └── user/        # Servicios para datos de usuario
├── store/           # Configuración de Redux store
└── validations/     # Esquemas de validación
```

## Instalación y Ejecución

1. Clona este repositorio:
```bash
git clone <url-del-repositorio>
cd EcommerceRem
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
EXPO_PUBLIC_BASE_RTDB_URL=<tu-url-de-firebase-rtdb>
```

4. Inicia la aplicación:
```bash
npm start
```

5. Escanea el código QR con la aplicación Expo Go en tu dispositivo o utiliza un emulador.

## Características Destacadas

### Gestión de Favoritos
La aplicación implementa un sistema completo de gestión de favoritos utilizando Firebase Realtime Database y RTK Query para una experiencia fluida y con actualizaciones en tiempo real.

### Interfaz de Usuario Mejorada
- Fuentes personalizadas (Ubuntu)
- Gradientes lineales para fondos atractivos
- Animaciones para mensajes de error
- Iconos intuitivos para mejorar la experiencia de usuario

### Selector de Cantidad
En la pantalla de productos, los usuarios pueden seleccionar la cantidad deseada antes de agregar al carrito, con validaciones para respetar el stock disponible.

## Autor
Martin Moreira - Proyecto Final para el curso de React Native de Coderhouse
