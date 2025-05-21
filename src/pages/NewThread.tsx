
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { mockForumCategories } from '@/services/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';

// Define the form schema
const formSchema = z.object({
  title: z.string().min(5, 'Judul harus minimal 5 karakter'),
  content: z.string().min(20, 'Konten harus minimal 20 karakter'),
  category: z.string().min(1, 'Pilih kategori'),
  tags: z.string().optional(),
});

const NewThread = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      category: '',
      tags: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would send data to an API
    console.log('Form submitted:', values);
    toast({
      title: "Diskusi berhasil dibuat!",
      description: "Diskusi Anda telah dipublikasikan ke forum.",
    });
    
    // Redirect to forum page
    navigate('/forum');
  };

  return (
    <PageLayout>
      <div className="container py-4 md:py-8">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Link to="/forum" className="text-muted-foreground hover:text-primary flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              <span>Kembali</span>
            </Link>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Buat Diskusi Baru</h1>
          <p className="text-muted-foreground">
            Bagikan pertanyaan, pengalaman, atau ide Anda dengan komunitas
          </p>
        </div>
        
        <div className="max-w-3xl">
          <Card>
            <CardContent className="p-4 md:p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Judul</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Apa yang ingin Anda diskusikan?" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih kategori yang sesuai" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockForumCategories.map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konten</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Jelaskan lebih detail..." 
                            className="min-h-[200px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tag (opsional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Pisahkan dengan koma, contoh: pertanian, hidroponik, organik" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex gap-3 pt-2">
                    <Button type="submit">Publikasikan Diskusi</Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate('/forum')}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default NewThread;
