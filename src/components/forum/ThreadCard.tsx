
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Thread {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
  likes: number;
  replies: number;
  isSticky?: boolean;
  isHot?: boolean;
}

interface ThreadCardProps {
  thread: Thread;
}

export function ThreadCard({ thread }: ThreadCardProps) {
  const createdAtDate = new Date(thread.createdAt);
  const timeAgo = formatDistanceToNow(createdAtDate, { addSuffix: true });
  
  // Get author initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <Card className={cn(
      "transition-all duration-200 hover:border-primary/50 hover:shadow-md overflow-hidden animate-fade-in",
      thread.isSticky && "border-accent"
    )}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-4 mb-2">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-1 mb-1.5">
              <Badge variant="outline" className="rounded-sm text-xs px-2 py-0 h-5">
                {thread.category}
              </Badge>
              {thread.isSticky && (
                <Badge variant="secondary" className="text-xs">Sticky</Badge>
              )}
              {thread.isHot && (
                <Badge className="bg-red-500 text-xs">Hot</Badge>
              )}
            </div>
            <Link to={`/forum/thread/${thread.id}`}>
              <h3 className="font-medium hover:text-primary transition-colors line-clamp-2">
                {thread.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1 hidden sm:block">
              {thread.content}
            </p>
          </div>
          <Link to={`/profile/${thread.author.id}`} className="flex-shrink-0">
            <Avatar className="h-10 w-10">
              <AvatarImage src={thread.author.avatar} alt={thread.author.name} />
              <AvatarFallback>{getInitials(thread.author.name)}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {thread.tags.map(tag => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="bg-secondary text-xs font-normal rounded-sm"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Heart className="h-4 w-4" />
            <span className="text-xs">{thread.likes}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">{thread.replies}</span>
          </div>
        </div>
        <div className="flex items-center justify-between w-full sm:w-auto sm:gap-2">
          <Link to={`/profile/${thread.author.id}`} className="text-sm hover:text-primary transition-colors">
            {thread.author.name}
          </Link>
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
