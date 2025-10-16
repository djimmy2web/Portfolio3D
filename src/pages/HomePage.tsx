import { Hero3D } from '@/components/Hero3D';
import { About3D } from '@/components/About3D';
import { Portfolio3D } from '@/components/Portfolio3D';
import { Services } from '@/components/Services';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Background3D } from '@/components/Background3D';

export const HomePage = () => {
  return (
    <>
      <Background3D />
      <main className="relative z-10">
        <Hero3D />
        <About3D />
        <Portfolio3D />
        <Services />
        <Contact />
        <Footer />
      </main>
    </>
  );
};
