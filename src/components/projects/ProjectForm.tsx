import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription 
} from '@/components/ui/form';
import { Link, Upload, FileText, Tag, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const projectFormSchema = z.object({
  title: z.string().min(3, {
    message: 'Judul proyek harus minimal 3 karakter.',
  }),
  description: z.string().min(20, {
    message: 'Deskripsi proyek harus minimal 20 karakter.',
  }),
  repoUrl: z.string().url({
    message: 'Harap masukkan URL repositori yang valid.',
  }),
  tags: z.string().min(1, {
    message: 'Harap masukkan setidaknya satu tag.',
  }),
  license: z.string().min(1, {
    message: 'Harap tentukan jenis lisensi proyek.',
  }),
  thumbnail: z.instanceof(FileList).optional(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'Anda harus menyetujui syarat dan ketentuan untuk melanjutkan.' }),
  }),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

export function ProjectForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: '',
      description: '',
      repoUrl: '',
      tags: '',
      license: '',
    },
  });

  function onSubmit(data: ProjectFormValues) {
    // In a real app, we'd send this data to a backend
    console.log('Form submission data:', data);
    
    toast({
      title: "Proyek berhasil dikirim!",
      description: "Terima kasih atas kontribusi Anda terhadap komunitas kami.",
      variant: "default",
    });
    
    setTimeout(() => {
      navigate('/projects');
    }, 2000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Proyek</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan judul proyek" {...field} />
              </FormControl>
              <FormDescription>
                Judul yang jelas dan deskriptif untuk proyek Anda
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Jelaskan tentang proyek Anda..." 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Jelaskan apa yang dilakukan proyek Anda, teknologi yang digunakan, dan bagaimana cara menggunakannya
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="repoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Repositori</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2 border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                  <Link className="ml-2 text-muted-foreground" size={18} />
                  <Input 
                    placeholder="https://github.com/username/project" 
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormDescription>
                Tautan ke repositori GitHub, GitLab, atau platform serupa
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <Tag className="ml-2 text-muted-foreground" size={18} />
                    <Input 
                      placeholder="arduino, sensor, iot" 
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Pisahkan tag dengan koma
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="license"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lisensi</FormLabel>
                <FormControl>
                  <Input placeholder="MIT, GPL, Apache, dll" {...field} />
                </FormControl>
                <FormDescription>
                  Jenis lisensi open source yang Anda gunakan
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Gambar Thumbnail (Opsional)</FormLabel>
              <FormControl>
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <div className="space-y-1 text-center">
                      <p className="text-sm font-medium">
                        Seret dan lepaskan file atau klik untuk mengunggah
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG atau GIF maksimal 2MB
                      </p>
                    </div>
                    <Input 
                      type="file" 
                      className="hidden"
                      id="thumbnail-upload" 
                      accept="image/*"
                      onChange={(e) => {
                        onChange(e.target.files);
                      }}
                      {...fieldProps}
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        document.getElementById('thumbnail-upload')?.click();
                      }}
                      type="button"
                    >
                      Pilih File
                    </Button>
                  </CardContent>
                </Card>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Saya setuju bahwa proyek ini adalah Open Source dan saya memiliki hak untuk membagikannya
                </FormLabel>
                <FormDescription>
                  Dengan mengirimkan proyek, Anda memungkinkan anggota komunitas untuk melihat dan menggunakan kode Anda
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">Kirim Proyek</Button>
      </form>
    </Form>
  );
}
