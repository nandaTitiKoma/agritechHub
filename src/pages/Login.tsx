
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { AuthForm } from '@/components/auth/AuthForm';

const Login = () => {
  return (
    <PageLayout>
      <div className="container py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Selamat Datang di AgriTech Hub</h1>
          <p className="text-muted-foreground text-center mb-8">
            Masuk ke akun Anda atau buat akun baru untuk mengakses semua fitur
          </p>
          
          <AuthForm />
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
