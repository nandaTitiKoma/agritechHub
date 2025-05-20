
import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full bg-muted py-12 mt-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-eco-500 to-eco-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">AG</span>
            </div>
            <span className="font-bold text-xl">AgriTech Hub</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Menghubungkan petani dengan solusi teknologi inovatif untuk pertanian berkelanjutan.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
        
        <div>
          <h5 className="font-medium text-base mb-4">Tautan Cepat</h5>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Beranda</Link></li>
            <li><Link to="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">Pasar</Link></li>
            <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard IoT</Link></li>
            <li><Link to="/forum" className="text-muted-foreground hover:text-foreground transition-colors">Forum Komunitas</Link></li>
            <li><Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors">Proyek Open Source</Link></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-medium text-base mb-4">Sumber Daya</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Makalah Penelitian</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Tutorial</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Acara</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Webinar</a></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-medium text-base mb-4">Hubungi Kami</h5>
          <ul className="space-y-2 text-sm">
            <li className="text-muted-foreground">Email: contact@agritechhub.com</li>
            <li className="text-muted-foreground">Telepon: +1 (555) 123-4567</li>
            <li className="text-muted-foreground">Alamat: Jl. Inovasi No. 123, Lembah Pertanian, Jakarta 12345</li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-8 pt-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2025 AgriTech Hub. Hak Cipta Dilindungi.</p>
          <div className="flex space-x-6 text-xs">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Kebijakan Privasi</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Syarat Layanan</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Kebijakan Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
