
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { GitFork, Heart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Project {
  id: string;
  title: string;
  description: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  stars: number;
  forks: number;
  likes: number;
  license: string;
  thumbnail?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const updatedAtDate = new Date(project.updatedAt);
  const timeAgo = formatDistanceToNow(updatedAtDate, { addSuffix: true });
  
  // Get author initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/50 flex flex-col">
      {project.thumbnail && (
        <Link to={`/projects/${project.id}`}>
          <div className="aspect-[2/1] w-full overflow-hidden">
            <img 
              src={project.thumbnail} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
      )}
      <CardContent className={cn("p-4", !project.thumbnail && "pt-4")}>
        <div className="mb-2">
          <Badge variant="outline" className="rounded-sm text-xs px-2 py-0 h-5 mb-2">
            {project.category}
          </Badge>
          <Link to={`/projects/${project.id}`}>
            <h3 className="font-medium hover:text-primary transition-colors">
              {project.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {project.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {project.tags.slice(0, 4).map(tag => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="bg-secondary text-xs font-normal rounded-sm"
            >
              {tag}
            </Badge>
          ))}
          {project.tags.length > 4 && (
            <Badge 
              variant="outline" 
              className="bg-secondary text-xs font-normal rounded-sm"
            >
              +{project.tags.length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-1 mt-auto border-t flex flex-col gap-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star className="h-4 w-4" />
              <span className="text-xs">{project.stars}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <GitFork className="h-4 w-4" />
              <span className="text-xs">{project.forks}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span className="text-xs">{project.likes}</span>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {project.license}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center w-full">
          <Link to={`/profile/${project.author.id}`} className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={project.author.avatar} alt={project.author.name} />
              <AvatarFallback>{getInitials(project.author.name)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{project.author.name}</span>
          </Link>
          <div className="text-xs text-muted-foreground">
            Updated {timeAgo}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
