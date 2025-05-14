
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
    { id: 'all', name: 'All Projects' },
    { id: 'sensor-networks', name: 'Sensor Networks' },
    { id: 'irrigation', name: 'Irrigation' },
    { id: 'climate-control', name: 'Climate Control' },
    { id: 'drones-mapping', name: 'Drones & Mapping' },
    { id: 'soil-monitoring', name: 'Soil Monitoring' },
    { id: 'livestock-monitoring', name: 'Livestock Monitoring' },
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
            <h1 className="text-3xl font-bold mb-4">Open Source Projects</h1>
            <p className="text-muted-foreground max-w-3xl">
              Explore and contribute to community-driven agricultural technology projects. 
              Find hardware designs, software code, and documentation for DIY solutions.
            </p>
          </div>
          <div>
            <Link to="/projects/new">
              <Button className="gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                Submit Project
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="flex-1">
                <Input 
                  placeholder="Search projects..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <Tabs defaultValue="trending">
                  <TabsList>
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                    <TabsTrigger value="newest">Newest</TabsTrigger>
                    <TabsTrigger value="mostStars">Most Stars</TabsTrigger>
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
                <h3 className="text-lg font-medium mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button variant="outline" onClick={() => {setSearchQuery(''); setCategory('all');}}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  New to open source agriculture?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Check out these resources to help you get started with agricultural technology projects:
                </p>
                <div className="space-y-2">
                  <a href="#" className="text-sm text-primary hover:underline flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    Arduino Basics for Agriculture
                  </a>
                  <a href="#" className="text-sm text-primary hover:underline flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    Sensor Selection Guide
                  </a>
                  <a href="#" className="text-sm text-primary hover:underline flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    IoT Network Planning
                  </a>
                  <a href="#" className="text-sm text-primary hover:underline flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    Solar Power for Remote Systems
                  </a>
                </div>
                <Button className="w-full" variant="outline">
                  View All Guides
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Technologies</CardTitle>
                <CardDescription>
                  Popular frameworks & platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b">
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-red-500"></span>
                      <span>Arduino</span>
                    </div>
                    <span className="text-xs text-muted-foreground">32 projects</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b">
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-green-500"></span>
                      <span>Raspberry Pi</span>
                    </div>
                    <span className="text-xs text-muted-foreground">28 projects</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b">
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-blue-500"></span>
                      <span>ESP32</span>
                    </div>
                    <span className="text-xs text-muted-foreground">23 projects</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b">
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-purple-500"></span>
                      <span>LoRaWAN</span>
                    </div>
                    <span className="text-xs text-muted-foreground">19 projects</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-amber-500"></span>
                      <span>Python</span>
                    </div>
                    <span className="text-xs text-muted-foreground">15 projects</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>How to Contribute</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Share your agricultural technology projects with our community:
                </p>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      1
                    </div>
                    <p className="text-sm">Create an account or log in</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      2
                    </div>
                    <p className="text-sm">Click "Submit Project" above</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      3
                    </div>
                    <p className="text-sm">Fill out the project details</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      4
                    </div>
                    <p className="text-sm">Upload code, diagrams, and photos</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      5
                    </div>
                    <p className="text-sm">Share with the community!</p>
                  </div>
                </div>
                <Button className="w-full">
                  Submit Your Project
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Projects;
