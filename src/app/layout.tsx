import { Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'G11 Blog',
  description: 'G11 Engineering Blog Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Providers>
          <Navigation />
          <div style={{ flex: 1 }}>
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

