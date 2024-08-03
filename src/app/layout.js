import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chonija DJ",
  description: "Web oficial de Chonija DJ",
  keywords: [
    'DJ',
    'eventos',
    'música',
    'canciones',
    'peticiones',
    'app',
    'choni',
    'chonija',
    'festivales',
    'sonido',
    'escenario',
    'escenarios',
    'performance',
    'festivales',
    'espectáculo',
  ],
  creator: 'Jonathan Muñoz Arribas',
  authors: [{ name: 'jomuarribas', url: 'https://jomuarribas.com' }],
  publisher: 'Chonija DJ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
