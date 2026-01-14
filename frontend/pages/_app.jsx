import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

/**
 * Custom App Component
 * Wraps all pages with Navbar and Footer
 */
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>StreamFinder - Discover Movies, TV Shows & Anime</title>
        <meta name="description" content="Discover where to watch your favorite movies, TV shows, and anime legally" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen flex flex-col bg-secondary">
        <Navbar />
        <main className="flex-grow pt-16">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}
