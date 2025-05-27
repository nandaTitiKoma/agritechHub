
import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { ThreadCard } from '@/components/forum/ThreadCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { mockProducts, mockThreads, mockProjects } from '@/services/mockData';
import { AnimatedContainer, AnimatedGroup } from '@/components/ui/animated-container';

const Index = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <AnimatedContainer animation="fade" duration="normal" className="py-12 lg:py-24 bg-gradient-to-br from-eco-50 to-white">
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
                <Button size="lg" variant="outline" className="border-gray-400 text-gray-700 transition-transform hover:scale-105 hover:bg-gray-100 hover:text-gray-900">
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
            <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border max-w-xs hidden md:block">
              <div className="text-sm font-medium mb-1">Perangkat Terhubung</div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-eco-500 rounded-full animate-pulse"></div>
                <div className="text-sm">152 perangkat online di area Anda</div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedContainer>

      {/* Featured Products */}
      <AnimatedContainer animation="fade" delay={200} className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Produk Unggulan</h2>
            <Link to="/marketplace" className="text-primary hover:underline story-link">
              Lihat semua produk
            </Link>
          </div>
          
          <AnimatedGroup animation="fade" stagger={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockProducts.slice(0, 4).map((product) => (
                <div 
                  key={product.id} 
                  className="transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </AnimatedGroup>
        </div>
      </AnimatedContainer>

      {/* Benefits Section */}
      <AnimatedContainer animation="fade" delay={300} className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Mengapa Memilih AgriTech Hub?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedContainer animation="slide-up" delay={100} className="flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-eco-100 flex items-center justify-center mb-4">
                <span className="text-eco-600 text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Inovasi Terkurasi</h3>
              <p className="text-muted-foreground">
                Temukan teknologi pertanian berkualitas tinggi yang terverifikasi dari pengembang dan lembaga penelitian tepercaya.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slide-up" delay={200} className="flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-eco-100 flex items-center justify-center mb-4">
                <span className="text-eco-600 text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Komunitas Aktif</h3>
              <p className="text-muted-foreground">
                Terhubung dengan sesama petani, ahli agronomi, dan pakar teknologi untuk berbagi pengetahuan dan menyelesaikan tantangan.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slide-up" delay={300} className="flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-eco-100 flex items-center justify-center mb-4">
                <span className="text-eco-600 text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Solusi Open Source</h3>
              <p className="text-muted-foreground">
                Akses dan berkontribusi pada proyek pertanian open source yang mendemokratisasi teknologi untuk pertanian segala ukuran.
              </p>
            </AnimatedContainer>
          </div>
        </div>
      </AnimatedContainer>

      {/* Latest Discussions */}
      <AnimatedContainer animation="fade" delay={400} className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Diskusi Terbaru</h2>
            <Link to="/forum" className="text-primary hover:underline story-link">
              Bergabung dalam diskusi
            </Link>
          </div>
          
          <AnimatedGroup animation="fade" stagger={100}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockThreads.slice(0, 4).map((thread) => (
                <div 
                  key={thread.id} 
                  className="transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-md"
                >
                  <ThreadCard thread={thread} />
                </div>
              ))}
            </div>
          </AnimatedGroup>
        </div>
      </AnimatedContainer>

      {/* Featured Open Source Projects */}
      <AnimatedContainer animation="fade" delay={500} className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Proyek Open Source Populer</h2>
            <Link to="/projects" className="text-primary hover:underline story-link">
              Jelajahi semua proyek
            </Link>
          </div>
          
          <AnimatedGroup animation="fade" stagger={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProjects.slice(0, 3).map((project) => (
                <div 
                  key={project.id} 
                  className="transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </AnimatedGroup>
        </div>
      </AnimatedContainer>

      {/* Call to Action */}
      <AnimatedContainer animation="fade" delay={600} className="py-16 bg-eco-600 text-white">
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
              <Button size="lg" variant="outline" className="border-white text-white font-semibold hover:bg-white/20 transition-transform hover:scale-105">
                Jelajahi Teknologi
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedContainer>
    </PageLayout>
  );
};

export default Index;
