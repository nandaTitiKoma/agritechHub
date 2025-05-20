
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const ProjectSubmit = () => {
  return (
    <PageLayout>
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Kirim Proyek Open Source</h1>
                <p className="text-muted-foreground mt-1">
                  Bagikan proyek teknologi pertanian Anda dengan komunitas untuk kolaborasi dan pembelajaran bersama.
                </p>
              </div>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Detail Proyek</CardTitle>
              <CardDescription>
                Isi formulir di bawah ini untuk mengirimkan proyek open source Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProjectSubmit;
