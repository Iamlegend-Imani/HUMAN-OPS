import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HUMAN//OPS',
  description: 'AI handles the volume. Humans keep the judgment.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
