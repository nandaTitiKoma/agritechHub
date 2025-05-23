
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { ThreadCard } from '@/components/forum/ThreadCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { mockProducts, mockThreads, mockProjects } from '@/services/mockData';

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Animate hero section on load
    if (heroRef.current) {
      heroRef.current.classList.add('animate-fade-in');
    }

    // Setup intersection observer for section animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe all section refs
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRefs.current) {
        sectionRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, []);

  // Add a ref to the array
  const addToRefs = (el: HTMLElement | null, index: number) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current[index] = el;
    }
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="py-12 lg:py-24 bg-gradient-to-br from-eco-50 to-white opacity-0"
      >
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Menghubungkan Petani dengan Inovasi AgTech
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-700 max-w-2xl mx-auto lg:mx-0">
              Temukan teknologi pertanian terkini, terhubung dengan para inovator, dan transformasikan praktik pertanian Anda untuk masa depan yang berkelanjutan.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/marketplace">
                <Button size="lg" className="bg-eco-600 hover:bg-eco-700 transition-transform hover:scale-105">
                  Jelajahi Pasar
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="transition-transform hover:scale-105">
                  Lihat Dashboard IoT
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <img 
              src="https://images.pexels.com/photos/30733226/pexels-photo-30733226.jpeg" 
              alt="Pertanian Pintar" 
              className="rounded-xl shadow-xl w-full transition-all duration-700 hover:shadow-2xl transform hover:-translate-y-1" 
            />
            <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border max-w-xs hidden md:block animate-pulse-gentle">
              <div className="text-sm font-medium mb-1">Perangkat Terhubung</div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-eco-500 rounded-full animate-pulse"></div>
                <div className="text-sm">152 perangkat online di area Anda</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section 
        ref={(el) => addToRefs(el, 0)} 
        className="py-12 bg-white opacity-0"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Produk Unggulan</h2>
            <Link to="/marketplace" className="text-primary hover:underline story-link">
              Lihat semua produk
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.slice(0, 4).map((product, index) => (
              <div 
                key={product.id} 
                className="transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        ref={(el) => addToRefs(el, 1)} 
        className="py-12 bg-muted opacity-0"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Mengapa Memilih AgriTech Hub?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-eco-100 flex items-center justify-center mb-4">
                <span className="text-eco-600 text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Inovasi Terkurasi</h3>
              <p className="text-muted-foreground">
                Temukan teknologi pertanian berkualitas tinggi yang terverifikasi dari pengembang dan lembaga penelitian tepercaya.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105" style={{ transitionDelay: '100ms' }}>
              <div className="w-16 h-16 rounded-full bg-eco-100 flex items-center justify-center mb-4">
                <span className="text-eco-600 text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Komunitas Aktif</h3>
              <p className="text-muted-foreground">
                Terhubung dengan sesama petani, ahli agronomi, dan pakar teknologi untuk berbagi pengetahuan dan menyelesaikan tantangan.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105" style={{ transitionDelay: '200ms' }}>
              <div className="w-16 h-16 rounded-full bg-eco-100 flex items-center justify-center mb-4">
                <span className="text-eco-600 text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Solusi Open Source</h3>
              <p className="text-muted-foreground">
                Akses dan berkontribusi pada proyek pertanian open source yang mendemokratisasi teknologi untuk pertanian segala ukuran.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Discussions */}
      <section 
        ref={(el) => addToRefs(el, 2)} 
        className="py-12 bg-white opacity-0"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Diskusi Terbaru</h2>
            <Link to="/forum" className="text-primary hover:underline story-link">
              Bergabung dalam percakapan
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockThreads.slice(0, 4).map((thread, index) => (
              <div 
                key={thread.id} 
                className="transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-md"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ThreadCard thread={thread} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Open Source Projects */}
      <section 
        ref={(el) => addToRefs(el, 3)} 
        className="py-12 bg-muted opacity-0"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Proyek Open Source Populer</h2>
            <Link to="/projects" className="text-primary hover:underline story-link">
              Jelajahi semua proyek
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects.slice(0, 3).map((project, index) => (
              <div 
                key={project.id} 
                className="transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        ref={(el) => addToRefs(el, 4)} 
        className="py-16 bg-eco-600 text-white opacity-0"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Siap Mentransformasi Pertanian Anda?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan petani yang telah menggunakan AgriTech Hub untuk menemukan inovasi, terhubung dengan para ahli, dan menerapkan solusi berkelanjutan.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="bg-white text-eco-600 hover:bg-gray-100 transition-transform hover:scale-105">
                Mulai Sekarang
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-transform hover:scale-105">
                Jelajahi Teknologi
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
