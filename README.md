# REM E-commerce - Aplicación de React Native

## Descripción
REM E-commerce es una aplicación móvil desarrollada con React Native y Expo. La aplicación permite a los usuarios navegar por productos, agregarlos al carrito, gestionar listas de favoritos y realizar pedidos.

## Características Principales

- **Autenticación de Usuarios**: Sistema completo de registro e inicio de sesión con persistencia mediante SQLite local.
- **Catálogo de Productos**: Visualización de productos con detalles, imágenes y descripciones.
- **Carrito de Compras**: Funcionalidad para agregar productos al carrito con selector de cantidad.
- **Lista de Favoritos**: Sistema para guardar y gestionar productos favoritos con persistencia en Firebase.
- **Gestión de Órdenes**: Creación y seguimiento de pedidos.
- **Interfaz de Usuario**: Gradientes, animaciones y fuentes (Ubuntu).
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
├── components/      # Componentes reutilizables (AnimatedError, FlatCard, etc.)
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
git clone https://github.com/martinelmorey/EntregaFinalReactNative.git
cd EcommerceRem
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
EXPO_PUBLIC_API_KEY=<tu-api-key-de-firebase>
EXPO_PUBLIC_BASE_RTDB_URL=<tu-url-de-firebase-rtdb>
EXPO_PUBLIC_AUTH_BASE_URL=<tu-url-de-autenticación>
EXPO_PUBLIC_GMAPS_API_KEY=<tu-api-key-de-google-maps>
```

4. Inicia la aplicación:
```bash
npm start
```

5. Escanea el código QR con la aplicación Expo Go en tu dispositivo o utiliza un emulador.

## Autor
Martin Moreira - Proyecto Final para el curso de React Native de Coderhouse
