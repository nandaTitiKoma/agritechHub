
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
            <h1 className="text-3xl font-bold mb-4">Community Forum</h1>
            <p className="text-muted-foreground max-w-3xl">
              Connect with fellow farmers, researchers, and agricultural technology enthusiasts. 
              Share knowledge, ask questions, and discover solutions.
            </p>
          </div>
          <div>
            <Link to="/forum/new-thread">
              <Button className="gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                New Thread
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center mb-8">
          <div className="flex-1 max-w-lg">
            <Input 
              placeholder="Search discussions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="ml-4">
            <Tabs defaultValue="recent">
              <TabsList>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Recent Discussions</h2>
            {mockThreads.map(thread => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
            
            <div className="flex justify-center mt-8">
              <Button variant="outline">Load More</Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>
                  Browse discussions by topic
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
                <CardTitle>Community Guidelines</CardTitle>
                <CardDescription>
                  Please follow these rules when posting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <div className="text-primary">•</div>
                    <p>Be respectful and constructive in all discussions</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="text-primary">•</div>
                    <p>Stay on topic and use appropriate categories</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="text-primary">•</div>
                    <p>No promotion or spam content</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="text-primary">•</div>
                    <p>Respect intellectual property and give credit</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="text-primary">•</div>
                    <p>Use code formatting for technical content</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(index => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <img 
                          src={`https://i.pravatar.cc/150?img=${index + 10}`}
                          alt={`User ${index}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Contributor {index}</div>
                        <div className="text-xs text-muted-foreground">
                          {120 - index * 15} posts
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
