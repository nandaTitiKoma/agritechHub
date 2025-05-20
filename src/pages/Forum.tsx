
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { CategoryList } from '@/components/forum/CategoryList';
import { ThreadCard } from '@/components/forum/ThreadCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockForumCategories, mockThreads } from '@/services/mockData';
import { Link } from 'react-router-dom';

const Forum = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <PageLayout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">Forum Komunitas</h1>
            <p className="text-muted-foreground max-w-3xl">
              Terhubung dengan sesama petani, peneliti, dan penggemar teknologi pertanian.
              Berbagi pengetahuan, ajukan pertanyaan, dan temukan solusi.
            </p>
          </div>
          <div>
            <Link to="/forum/new-thread">
              <Button className="gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                Diskusi Baru
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center mb-8">
          <div className="flex-1 max-w-lg">
            <Input 
              placeholder="Cari diskusi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="ml-4">
            <Tabs defaultValue="recent">
              <TabsList>
                <TabsTrigger value="recent">Terbaru</TabsTrigger>
                <TabsTrigger value="popular">Populer</TabsTrigger>
                <TabsTrigger value="unanswered">Belum Dijawab</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Diskusi Terbaru</h2>
            {mockThreads.map(thread => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
            
            <div className="flex justify-center mt-8">
              <Button variant="outline">Muat Lebih Banyak</Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kategori</CardTitle>
                <CardDescription>
                  Jelajahi diskusi berdasarkan topik
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockForumCategories.map(category => (
                  <div key={category.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <Link 
                      to={`/forum/category/${category.id}`}
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <div className={`p-1.5 rounded-sm ${category.color || "bg-primary/10"}`}>
                        {category.icon}
                      </div>
                      <span>{category.name}</span>
                    </Link>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {category.threadCount}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pedoman Komunitas</CardTitle>
                <CardDescription>
                  Harap ikuti aturan ini saat memposting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <div className="text-primary">•</div>
                    <p>Bersikap hormat dan konstruktif dalam semua diskusi</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="text-primary">•</div>
                    <p>Tetap pada topik dan gunakan kategori yang sesuai</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="text-primary">•</div>
                    <p>Tidak ada konten promosi atau spam</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="text-primary">•</div>
                    <p>Hormati kekayaan intelektual dan berikan kredit</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="text-primary">•</div>
                    <p>Gunakan format kode untuk konten teknis</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Kontributor Teratas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(index => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <img 
                          src={`https://i.pravatar.cc/150?img=${index + 10}`}
                          alt={`Pengguna ${index}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Kontributor {index}</div>
                        <div className="text-xs text-muted-foreground">
                          {120 - index * 15} postingan
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Forum;
