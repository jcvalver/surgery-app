import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/surgery-app/',
  plugins: [
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        // Main pages
        main: resolve(__dirname, 'index.html'),
        'dra-karen': resolve(__dirname, 'pages/dra-karen.html'),
        'cirugia-plastica': resolve(__dirname, 'pages/cirugia-plastica.html'),
        'medicina-estetica': resolve(__dirname, 'pages/medicina-estetica.html'),
        'no-invasivos': resolve(__dirname, 'pages/no-invasivos.html'),
        contacto: resolve(__dirname, 'pages/contacto.html'),
        privacidad: resolve(__dirname, 'pages/privacidad.html'),
        terminos: resolve(__dirname, 'pages/terminos.html'),
        // Procedimientos (cirugía plástica)
        'proc-rinoplastia': resolve(__dirname, 'pages/procedimientos/rinoplastia.html'),
        'proc-mamoplastia': resolve(__dirname, 'pages/procedimientos/mamoplastia.html'),
        'proc-lipoescultura': resolve(__dirname, 'pages/procedimientos/lipoescultura.html'),
        'proc-lipoabdominoplastia': resolve(__dirname, 'pages/procedimientos/lipoabdominoplastia.html'),
        'proc-lipomarcacion-abdominal': resolve(__dirname, 'pages/procedimientos/lipomarcacion-abdominal.html'),
        'proc-lipotransferencia-gluteos': resolve(__dirname, 'pages/procedimientos/lipotransferencia-gluteos.html'),
        'proc-implante-gluteos': resolve(__dirname, 'pages/procedimientos/implante-gluteos.html'),
        'proc-blefaroplastia': resolve(__dirname, 'pages/procedimientos/blefaroplastia.html'),
        'proc-otoplastia': resolve(__dirname, 'pages/procedimientos/otoplastia.html'),
        'proc-bichectomia': resolve(__dirname, 'pages/procedimientos/bichectomia.html'),
        'proc-afinamiento-facial': resolve(__dirname, 'pages/procedimientos/afinamiento-facial.html'),
        'proc-ginecomastia': resolve(__dirname, 'pages/procedimientos/ginecomastia.html'),
        // Tratamientos (medicina estética + no invasivos)
        'trat-plasma-rico-en-plaquetas': resolve(__dirname, 'pages/tratamientos/plasma-rico-en-plaquetas.html'),
        'trat-acido-hialuronico': resolve(__dirname, 'pages/tratamientos/acido-hialuronico.html'),
        'trat-vitamina-c': resolve(__dirname, 'pages/tratamientos/vitamina-c.html'),
        'trat-toxina-botulinica': resolve(__dirname, 'pages/tratamientos/toxina-botulinica.html'),
        'trat-depilacion-laser': resolve(__dirname, 'pages/tratamientos/depilacion-laser.html'),
        'trat-exilis-ultra-360': resolve(__dirname, 'pages/tratamientos/exilis-ultra-360.html'),
      },
    },
  },
})
