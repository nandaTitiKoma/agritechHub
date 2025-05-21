
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectSubmit = () => {
  return (
    <PageLayout>
      <div className="container py-4 md:py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4 md:mb-8">
            <Link to="/projects" className="text-muted-foreground hover:text-primary flex items-center gap-1 mb-4">
              <ChevronLeft className="h-4 w-4" />
              <span>Kembali ke Proyek</span>
            </Link>
            
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Kirim Proyek Open Source</h1>
                <p className="text-muted-foreground mt-1">
                  Bagikan proyek teknologi pertanian Anda dengan komunitas untuk kolaborasi dan pembelajaran bersama.
                </p>
              </div>
            </div>
          </div>
          
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle>Detail Proyek</CardTitle>
              <CardDescription>
                Isi formulir di bawah ini untuk mengirimkan proyek open source Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <ProjectForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProjectSubmit;
