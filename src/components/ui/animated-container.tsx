
import React, { ReactNode, HTMLAttributes } from 'react';
import { useAnimate } from '@/hooks/use-animate';
import { cn } from '@/lib/utils';

interface AnimatedContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
  animation?: 'fade' | 'slide-up' | 'slide-right' | 'scale';
  duration?: 'fast' | 'normal' | 'slow';
  threshold?: number;
  once?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export function AnimatedContainer({
  children,
  delay = 0,
  animation = 'fade',
  duration = 'normal',
  threshold = 0.1,
  once = true,
  as = 'div',
  className,
  ...props
}: AnimatedContainerProps) {
  const ref = useAnimate({
    threshold: threshold,
    animateOnce: once,
  });

  const getAnimationClass = () => {
    switch (animation) {
      case 'slide-up':
        return 'translate-y-8';
      case 'slide-right':
        return '-translate-x-8';
      case 'scale':
        return 'scale-95';
      case 'fade':
      default:
        return '';
    }
  };

  const getDurationClass = () => {
    switch (duration) {
      case 'fast':
        return 'duration-300';
      case 'slow':
        return 'duration-1000';
      case 'normal':
      default:
        return 'duration-500';
    }
  };

  const Component = as as any;
  
  return (
    <Component
      ref={ref}
      className={cn(
        'opacity-0 transform transition-all',
        getDurationClass(),
        getAnimationClass(),
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Component>
  );
}

export function AnimatedGroup({
  children,
  stagger = 100,
  ...props
}: AnimatedContainerProps & { stagger?: number }) {
  return React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    
    return (
      <AnimatedContainer
        {...props}
        delay={index * stagger}
      >
        {child}
      </AnimatedContainer>
    );
  });
}
