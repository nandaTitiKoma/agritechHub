
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { AuthForm } from '@/components/auth/AuthForm';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedContainer } from '@/components/ui/animated-container';

const Login = () => {
  return (
    <PageLayout>
      <div className="container py-6 md:py-12">
        <div className="max-w-md mx-auto">
          <AnimatedContainer animation="slide-up">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">
              Selamat Datang di AgriTech Hub
            </h1>
          </AnimatedContainer>
          
          <AnimatedContainer animation="slide-up" delay={200}>
            <p className="text-muted-foreground text-center mb-6 md:mb-8 px-4 md:px-0">
              Masuk ke akun Anda atau buat akun baru untuk mengakses semua fitur
            </p>
          </AnimatedContainer>
          
          <AnimatedContainer animation="fade" delay={400}>
            <Card className="mx-4 md:mx-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <AuthForm />
              </CardContent>
            </Card>
          </AnimatedContainer>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
