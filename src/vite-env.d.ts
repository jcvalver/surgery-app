/// <reference types="vite/client" />

declare module '*.css' {
  const content: string
  export default content
}

declare module '*.json' {
  const value: unknown
  export default value
}

declare module 'swiper/css'
declare module 'swiper/css/navigation'
declare module 'swiper/css/pagination'
declare module 'swiper/css/autoplay'
declare module 'aos/dist/aos.css'
