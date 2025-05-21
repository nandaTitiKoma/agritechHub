
import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { CategoryList } from '@/components/forum/CategoryList';
import { ThreadCard } from '@/components/forum/ThreadCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockForumCategories, mockThreads } from '@/services/mockData';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger 
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Filter, MessageSquare, List, Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Forum = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recent');
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  // Filter threads based on search query
  const filteredThreads = mockThreads.filter(thread => 
    thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort threads based on active tab
  const sortedThreads = React.useMemo(() => {
    switch (activeTab) {
      case 'popular':
        return [...filteredThreads].sort((a, b) => b.likes - a.likes);
      case 'unanswered':
        return filteredThreads.filter(thread => thread.replies === 0);
      case 'recent':
      default:
        return [...filteredThreads].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }, [filteredThreads, activeTab]);

  const handleCreateThread = () => {
    navigate('/forum/new-thread');
  };
  
  // Mobile-optimized action button for creating new threads
  const MobileActionButton = () => (
    <div className="fixed right-6 bottom-6 md:hidden">
      <Button 
        onClick={handleCreateThread}
        size="lg"
        className="rounded-full w-14 h-14 shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
  
  return (
    <PageLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Forum Komunitas</h1>
            <p className="text-muted-foreground max-w-3xl">
              Terhubung dengan sesama petani, peneliti, dan penggemar teknologi pertanian.
              Berbagi pengetahuan, ajukan pertanyaan, dan temukan solusi.
            </p>
          </div>
          <div className="hidden md:block">
            <Link to="/forum/new-thread">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Diskusi Baru
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="w-full md:w-auto md:flex-1 max-w-lg">
            <Input 
              placeholder="Cari diskusi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-auto">
            {isMobile ? (
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="w-full gap-2">
                    <Filter className="h-4 w-4" />
                    Filter & Urutkan
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Filter Diskusi</DrawerTitle>
                    <DrawerDescription>
                      Atur urutkan dan filter diskusi
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4">
                    <div className="space-y-4 mb-4">
                      <h3 className="font-medium">Urutkan Berdasarkan</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <Button 
                          variant={activeTab === 'recent' ? 'default' : 'outline'}
                          className="justify-start"
                          onClick={() => setActiveTab('recent')}
                        >
                          Terbaru
                        </Button>
                        <Button 
                          variant={activeTab === 'popular' ? 'default' : 'outline'}
                          className="justify-start"
                          onClick={() => setActiveTab('popular')}
                        >
                          Populer
                        </Button>
                        <Button 
                          variant={activeTab === 'unanswered' ? 'default' : 'outline'}
                          className="justify-start"
                          onClick={() => setActiveTab('unanswered')}
                        >
                          Belum Dijawab
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Tutup</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            ) : (
              <Tabs 
                defaultValue="recent" 
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList>
                  <TabsTrigger value="recent">Terbaru</TabsTrigger>
                  <TabsTrigger value="popular">Populer</TabsTrigger>
                  <TabsTrigger value="unanswered">Belum Dijawab</TabsTrigger>
                </TabsList>
              </Tabs>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold">
                {activeTab === 'recent' && 'Diskusi Terbaru'}
                {activeTab === 'popular' && 'Diskusi Populer'}
                {activeTab === 'unanswered' && 'Diskusi Belum Dijawab'}
              </h2>
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden"
                aria-label="Tampilkan sebagai daftar"
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
            
            {sortedThreads.length > 0 ? (
              <div className="space-y-4">
                {sortedThreads.map(thread => (
                  <ThreadCard key={thread.id} thread={thread} />
                ))}
              </div>
            ) : (
              <Card className="flex flex-col items-center justify-center p-8 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">Tidak ada diskusi ditemukan</h3>
                <p className="text-muted-foreground mb-4">
                  Tidak ada diskusi yang cocok dengan filter atau pencarian Anda.
                </p>
                <Button onClick={handleCreateThread}>
                  <Plus className="h-4 w-4 mr-2" />
                  Mulai Diskusi Baru
                </Button>
              </Card>
            )}
            
            {sortedThreads.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline">Muat Lebih Banyak</Button>
              </div>
            )}
          </div>
          
          {/* Sidebar - Hidden on mobile, shown inline at bottom on tablet, sidebar on desktop */}
          <div className="space-y-6 order-first lg:order-last">
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
      <MobileActionButton />
    </PageLayout>
  );
};

export default Forum;
