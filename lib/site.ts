/**
 * Datos de contacto del sitio, en un solo lugar.
 * Si cambia alguno, se actualiza acá y se propaga al hero y al footer.
 */
export const site = {
  email: "juanmanuelramos813@gmail.com",
  linkedin: "https://www.linkedin.com/in/juanmramos3/",
  github: "https://github.com/juanm4ram",
  /** PDF del CV en Google Drive. Si se reemplaza el archivo, cambia el id. */
  cv: "https://drive.google.com/file/d/1CtaZGKYT5urDZPJ9UsWab7y6e7YM51XO/view?usp=drive_link",
  /** URL que codifica public/qr-portfolio.svg. Si cambia, hay que regenerar el SVG. */
  url: "https://juan-manuel-ramos.vercel.app",
} as const;
