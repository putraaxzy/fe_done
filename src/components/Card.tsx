import { motion } from 'framer-motion';
import { ContentItem, ContentData } from '../types';
import Link from 'next/link';
import { sanitizeDescription } from '../helpers/sanitize';  // import helper

interface CardProps {
  item: ContentItem;
  index: number;
  type: keyof ContentData;
}

export default function Card({ item, index, type }: CardProps) {
  return (
    <Link href={`/detail/${type}/${item.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group relative cursor-pointer transform transition-all duration-500 hover:scale-105"
      >
        {/* Softer shadow and refined gradient border */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-lg shadow-md group-hover:shadow-xl transition-shadow duration-500" />
        <div className="relative bg-black/50 backdrop-blur-sm rounded-2xl p-5 border border-white/10 shadow-md">
          <div className="rounded-xl overflow-hidden mb-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-contain transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="p-3">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
              {item.title}
            </h3>
            <p className="text-white/70 mb-3 line-clamp-2" 
               dangerouslySetInnerHTML={{ __html: sanitizeDescription(item.description) }} />
            <div className="flex items-center gap-2 text-blue-300 group-hover:text-purple-300 transition-colors">
              <span>Selengkapnya</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
