
import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { ThreadCard } from '@/components/forum/ThreadCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { mockProducts, mockThreads, mockProjects } from '@/services/mockData';

const Index = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-12 lg:py-24 bg-gradient-to-br from-eco-50 to-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Connecting Farmers with AgTech Innovation
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-700 max-w-2xl mx-auto lg:mx-0">
              Discover cutting-edge agricultural technologies, connect with innovators, and transform your farming practices for a sustainable future.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/marketplace">
                <Button size="lg" className="bg-eco-600 hover:bg-eco-700">
                  Explore Marketplace
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline">
                  View IoT Dashboard
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" 
              alt="Smart Farming" 
              className="rounded-xl shadow-xl w-full" 
            />
            <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border max-w-xs hidden md:block">
              <div className="text-sm font-medium mb-1">Connected Devices</div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-eco-500 rounded-full animate-pulse"></div>
                <div className="text-sm">152 devices online in your area</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <Link to="/marketplace" className="text-primary hover:underline">
              View all products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Choose AgriTech Hub?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-eco-100 flex items-center justify-center mb-4">
                <span className="text-eco-600 text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Innovation</h3>
              <p className="text-muted-foreground">
                Discover verified, high-quality agricultural technology from trusted developers and research institutions.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-eco-100 flex items-center justify-center mb-4">
                <span className="text-eco-600 text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Active Community</h3>
              <p className="text-muted-foreground">
                Connect with fellow farmers, agronomists, and technology experts to share knowledge and solve challenges.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-eco-100 flex items-center justify-center mb-4">
                <span className="text-eco-600 text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Open Source Solutions</h3>
              <p className="text-muted-foreground">
                Access and contribute to open source agricultural projects that democratize technology for farms of all sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Discussions */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Latest Discussions</h2>
            <Link to="/forum" className="text-primary hover:underline">
              Join the conversation
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockThreads.slice(0, 4).map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Open Source Projects */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Popular Open Source Projects</h2>
            <Link to="/projects" className="text-primary hover:underline">
              Explore all projects
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-eco-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of farmers already using AgriTech Hub to discover innovations, connect with experts, and implement sustainable solutions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="bg-white text-eco-600 hover:bg-gray-100">
                Get Started Now
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Browse Technologies
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
