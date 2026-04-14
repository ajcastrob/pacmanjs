# Pac-Man

Juego clásico de Pac-Man desarrollado con JavaScript vanilla, Canvas y SCSS.

## Características

- **Controles**: Flechas del teclado o WASD
- **Móvil**: Controles táctiles integrados
- **4 fantasmas**: Cada uno con su propio color (rojo, rosa, azul, naranja)
- **Sonido**: Efectos de audio para comer, morir y victoria
- **Música**: Melodía característica de Pac-Man
- **Sistema de vidas**: 3 vidas por partida
- **Puntuación**: 10 puntos por cada comida
- **Teletransporte**: Pasadizos en los laterales del mapa

## Tecnologías

- JavaScript (ES6+)
- HTML5 Canvas
- SCSS
- Vite

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Producción

```bash
npm run build
npm run preview
```

## Despliegue

```bash
npm run deploy
```

## Estructura del proyecto

```
├── src/
│   ├── class/
│   │   └── Block.js          # Clase para entidades del juego
│   ├── functions/
│   │   ├── game.js           # Lógica principal del juego
│   │   ├── load-images.js    # Carga de sprites
│   │   ├── mapa.js           # Diseño del tablero
│   │   └── variables.js      # Configuración y constantes
│   └── main.js               # Punto de entrada
├── assets/
│   ├── *.svg                 # Sprites de Pac-Man y fantasmas
│   └── sounds/               # Archivos de audio
├── sass/                     # Estilos SCSS
├── public/                   # Archivos estáticos
└── index.html
```
