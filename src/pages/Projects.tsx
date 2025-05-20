
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockProjects } from '@/services/mockData';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'Semua Proyek' },
    { id: 'sensor-networks', name: 'Jaringan Sensor' },
    { id: 'irrigation', name: 'Irigasi' },
    { id: 'climate-control', name: 'Kontrol Iklim' },
    { id: 'drones-mapping', name: 'Drone & Pemetaan' },
    { id: 'soil-monitoring', name: 'Pemantauan Tanah' },
    { id: 'livestock-monitoring', name: 'Pemantauan Ternak' },
  ];
  
  const filteredProjects = mockProjects.filter(project => 
    (category === 'all' || project.category.toLowerCase().replace(/[^a-z0-9]/g, '-') === category) &&
    (project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );
  
  return (
    <PageLayout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">Proyek Open Source</h1>
            <p className="text-muted-foreground max-w-3xl">
              Jelajahi dan berkontribusi pada proyek teknologi pertanian yang dikembangkan komunitas.
              Temukan desain perangkat keras, kode perangkat lunak, dan dokumentasi untuk solusi mandiri.
            </p>
          </div>
          <div>
            <Link to="/projects/new">
              <Button className="gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                Kirim Proyek
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="flex-1">
                <Input 
                  placeholder="Cari proyek..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <Tabs defaultValue="trending">
                  <TabsList>
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                    <TabsTrigger value="newest">Terbaru</TabsTrigger>
                    <TabsTrigger value="mostStars">Bintang Terbanyak</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Button
                    key={cat.id}
                    variant={category === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategory(cat.id)}
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">Tidak ada proyek ditemukan</h3>
                <p className="text-muted-foreground mb-6">
                  Coba sesuaikan pencarian atau filter untuk menemukan yang Anda cari.
                </p>
                <Button variant="outline" onClick={() => {setSearchQuery(''); setCategory('all');}}>
                  Hapus Filter
                </Button>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Memulai</CardTitle>
                <CardDescription>
                  Baru mengenal pertanian open source?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Lihat sumber daya berikut untuk membantu Anda memulai dengan proyek teknologi pertanian:
                </p>
                <div className="space-y-2">
                  <a href="#" className="text-sm text-primary hover:underline flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    Dasar Arduino untuk Pertanian
                  </a>
                  <a href="#" className="text-sm text-primary hover:underline flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    Panduan Pemilihan Sensor
                  </a>
                  <a href="#" className="text-sm text-primary hover:underline flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    Perencanaan Jaringan IoT
                  </a>
                  <a href="#" className="text-sm text-primary hover:underline flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    Tenaga Surya untuk Sistem Jarak Jauh
                  </a>
                </div>
                <Button className="w-full" variant="outline">
                  Lihat Semua Panduan
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Teknologi Terpopuler</CardTitle>
                <CardDescription>
                  Framework & platform populer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b">
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-red-500"></span>
                      <span>Arduino</span>
                    </div>
                    <span className="text-xs text-muted-foreground">32 proyek</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b">
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-green-500"></span>
                      <span>Raspberry Pi</span>
                    </div>
                    <span className="text-xs text-muted-foreground">28 proyek</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b">
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-blue-500"></span>
                      <span>ESP32</span>
                    </div>
                    <span className="text-xs text-muted-foreground">23 proyek</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b">
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-purple-500"></span>
                      <span>LoRaWAN</span>
                    </div>
                    <span className="text-xs text-muted-foreground">19 proyek</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-amber-500"></span>
                      <span>Python</span>
                    </div>
                    <span className="text-xs text-muted-foreground">15 proyek</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Cara Berkontribusi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Bagikan proyek teknologi pertanian Anda dengan komunitas kami:
                </p>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      1
                    </div>
                    <p className="text-sm">Buat akun atau masuk</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      2
                    </div>
                    <p className="text-sm">Klik "Kirim Proyek" di atas</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      3
                    </div>
                    <p className="text-sm">Isi detail proyek</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      4
                    </div>
                    <p className="text-sm">Unggah kode, diagram, dan foto</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      5
                    </div>
                    <p className="text-sm">Bagikan dengan komunitas!</p>
                  </div>
                </div>
                <Link to="/projects/new">
                  <Button className="w-full">
                    Kirim Proyek Anda
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Projects;
