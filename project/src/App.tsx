import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Methodology from '@/components/Methodology';
import Industries from '@/components/Industries';
import Clients from '@/components/Clients';
import Testimonial from '@/components/Testimonial';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AdminPage from '@/components/admin/AdminPage';

function App() {
  if (window.location.pathname.replace(/\/+$/, '') === '/admin') {
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Services />
        <Methodology />
        <Industries />
        <Clients />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
