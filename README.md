# Social Tracker

Social Tracker es una aplicación web construida con Next.js que permite a los usuarios buscar perfiles de redes sociales (YouTube, Instagram, TikTok) para un nombre de usuario específico y ver la información agregada. También permite a los usuarios "suscribirse" a perfiles para un acceso rápido, guardando estas suscripciones en el almacenamiento local del navegador.

## Características Principales

- **Búsqueda Multiplataforma:** Busca un nombre de usuario en YouTube, Instagram, TikTok y simultáneamente.
- **Resultados Agregados:** Muestra información básica del perfil y enlaces directos encontrados en cada plataforma.
- **Sistema de Suscripciones:** Guarda tus usuarios favoritos para buscarlos rápidamente con un solo clic. Las suscripciones incluyen avatar y plataforma principal detectada.
- **Sugerencia "¿Quizás quisiste decir?":** Si una búsqueda no arroja resultados, sugiere nombres de usuario similares de tus suscripciones.
- **Búsqueda Directa desde Suscripciones:** Inicia una búsqueda directamente haciendo clic en un usuario suscrito en la barra lateral.
- **Almacenamiento Local:** Las suscripciones se guardan directamente en tu navegador usando `localStorage`.
- **Interfaz Moderna y Responsiva:** Construida con Tailwind CSS y Shadcn UI, incluyendo una barra lateral adaptable para móviles.
- **Indicador de Carga Detallado:** Muestra un esqueleto de carga (`loading skeleton`) mientras se obtienen los resultados.
- **Feedback Mejorado:** Notificaciones claras para acciones como suscripción, cancelación o errores.

## Tecnologías Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [Shadcn UI](https://ui.shadcn.com/)
- **Scraping:** [Apify SDK](https://apify.com/) (a través de una API interna)
- **Notificaciones:** [Sonner](https://sonner.emilkowal.ski/)
- **Gestor de Paquetes/Runtime:** [Bun](https://bun.sh/) (o npm/yarn/pnpm)

## Configuración y Puesta en Marcha

1.  **Clonar el Repositorio:**

    ```bash
    git clone <url-del-repositorio>
    cd social-tracker
    ```

2.  **Instalar Dependencias:**
    Se recomienda usar Bun (como se indica en el `package.json`), pero puedes usar otros gestores.

    ```bash
    bun install
    ```

    _O alternativamente:_

    ```bash
    npm install
    # o
    yarn install
    # o
    pnpm install
    ```

3.  **Variables de Entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto y añade tu token de API de Apify:

    ```plaintext:.env.local
    APIFY_API_TOKEN="tu_token_de_apify_aqui"
    ```

    Puedes obtener un token registrándote en [Apify](https://apify.com/).

4.  **Ejecutar el Servidor de Desarrollo:**

    ```bash
    bun dev
    ```

    _O alternativamente:_

    ```bash
    npm run dev
    # o
    yarn dev
    # o
    pnpm dev
    ```

5.  **Abrir la Aplicación:**
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## ¿Cómo Funciona?

1.  **Búsqueda:** El usuario introduce un nombre de usuario en la barra de búsqueda y presiona "Buscar" o hace clic en una suscripción guardada.
2.  **Llamada a la API:** La interfaz de usuario realiza una solicitud POST al endpoint `/api/scrape-all` del backend de Next.js, enviando el nombre de usuario.
3.  **Scraping:** El endpoint de la API utiliza el cliente de Apify (`src/app/lib/scrapers.ts`) para ejecutar actores preconfigurados (scrapers) para cada plataforma social (YouTube, Instagram, TikTok, X).
4.  **Agregación de Resultados:** La API espera a que todos los scrapers finalicen (usando `Promise.allSettled`) y recopila los resultados (o errores) de cada plataforma.
5.  **Respuesta:** La API devuelve un array de objetos, cada uno representando los resultados (o error) para una plataforma específica.
6.  **Visualización:** La interfaz recibe los datos y los muestra en tarjetas separadas por plataforma. También actualiza la tarjeta de "Enlaces directos".
7.  **Suscripciones:**
    - Al hacer clic en "Suscribirse", se guarda el nombre de usuario actual, un avatar (si se encuentra) y la plataforma principal en `localStorage`.
    - La lista de suscripciones se muestra en la barra lateral y en la pantalla de bienvenida.
    - Al hacer clic en una suscripción, se llama a la función `handleSubmit` directamente con ese nombre de usuario, iniciando una nueva búsqueda.

## Endpoint de API

- `POST /api/scrape-all`:
  - **Body (JSON):** `{ "username": "nombre_a_buscar" }`
  - **Respuesta Exitosa (JSON):** `[{ platform: "...", items: [...], error: null }, ...]`
  - **Respuesta de Error (JSON):** `{ "error": "mensaje_de_error" }`

## Despliegue

La forma más sencilla de desplegar esta aplicación Next.js es utilizando la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles. Asegúrate de configurar la variable de entorno `APIFY_API_TOKEN` en la configuración de tu proyecto en Vercel.
