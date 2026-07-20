import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dev Academy',
  description: 'Plataforma de aulas técnicas interativas para desenvolvedores',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
