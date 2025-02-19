'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ContentItem } from '@/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { sanitizeDescription } from '@/helpers/sanitize';  // import sanitizer

export default function DetailPage() {
  const params = useParams();
  const [item, setItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`/api/proxy?endpoint=${params.type}/${params.id}`);
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error('Error fetching detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [params.type, params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500" />
      </div>
    );
  }
  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-white/70 mb-4">Data tidak ditemukan</p>
        <Link href="/" className="text-blue-400 hover:text-purple-400">Kembali ke Beranda</Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-20"
      >
        <Link href="/" className="inline-flex items-center mb-8 group">
          <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span className="ml-2">Kembali</span>
        </Link>
        {/* Refined detail container */}
        <div className="bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="relative w-full">
            <img
              src={item.image}
              alt={item.title}
              className="w-full object-contain transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="p-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">{item.title}</h1>
            <p className="text-lg md:text-xl leading-relaxed whitespace-pre-line text-white/80"
               dangerouslySetInnerHTML={{ __html: sanitizeDescription(item.description) }} />
            <div className="mt-8 text-sm text-white/60">
              {item.updatedAt && (
                <p>Diperbarui: {new Date(item.updatedAt).toLocaleDateString('id-ID')}</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
