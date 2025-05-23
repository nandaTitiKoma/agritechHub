
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Pengguna mencoba mengakses rute yang tidak ada:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center px-4">
          <AnimatedContainer animation="scale" duration="slow">
            <div className="text-9xl font-bold text-eco-600 opacity-20">404</div>
          </AnimatedContainer>
          
          <AnimatedContainer animation="slide-up" delay={300}>
            <h1 className="text-4xl font-bold mb-4">Halaman tidak ditemukan</h1>
          </AnimatedContainer>
          
          <AnimatedContainer animation="slide-up" delay={500}>
            <p className="text-xl text-gray-600 mb-8">
              Maaf, halaman yang Anda cari tidak tersedia.
            </p>
          </AnimatedContainer>
          
          <AnimatedContainer animation="slide-up" delay={700}>
            <Button 
              asChild 
              size="lg"
              className="bg-eco-600 hover:bg-eco-700 transition-all hover:scale-105"
            >
              <a href="/">Kembali ke Beranda</a>
            </Button>
          </AnimatedContainer>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
