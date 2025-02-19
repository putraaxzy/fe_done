'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContentData, ContentItem } from '../types';
import { useInView } from 'react-intersection-observer';
import { fetchData } from '../services/api';
import Card from '@/components/Card';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ContentData>({
    history: [],
    tourism: [],
    culinary: [],
    events: []
  });
  const [error, setError] = useState<string | null>(null);

  // Use keys matching the API response
  const sections = ['History', 'Tourism', 'Culinary', 'Events'] as const;
  type Section = typeof sections[number];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      sections.forEach(section => {
        const element = document.getElementById(section.toLowerCase());
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(section.toLowerCase());
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchData();
      console.log('Fetched data:', result);

      // Only update state if we have data
      if (Object.values(result).some(arr => arr.length > 0)) {
        setData(result);
        setError(null);
      } else {
        setError('Data tidak tersedia');
      }
    } catch (error) {
      console.error('Load error:', error);
      setError('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    loadData();
    return () => { isMounted = false; };
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  const { ref: heroRef, inView: heroInView } = useInView();

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute inset-0 animate-pulse-slow">
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(29,78,216,0.15),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_300px,rgba(124,58,237,0.15),transparent)]" />
        </div>
      </div>

      {/* Enhanced Navbar */}
      <nav className="fixed w-full z-50 backdrop-blur-xl bg-white/[0.02] border-b border-white/[0.05] shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.h1 
            className="text-4xl font-black"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Wonder
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              wise
            </span>
          </motion.h1>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1">
              {sections.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 }
          }}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center z-10 max-w-5xl mx-auto"
        >
          <h1 className="text-7xl font-bold mb-6 text-white">
            <span className="block mb-2">Jelajahi Keindahan</span>
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Sulawesi Tenggara
            </span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Temukan pesona alam yang memukau, warisan budaya yang kaya, 
            dan citarasa kuliner yang menggoda
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="group relative px-8 py-3 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-white font-medium overflow-hidden">
              <span className="relative z-10">Mulai Eksplorasi</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>
        </motion.div>
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
      </section>

      {/* Team Section - Moved here */}
      <section className="container mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Tim Pengembang</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Putra",
              role: "Web Developer",
              image: "https://raw.githubusercontent.com/arundaya-project/images/refs/heads/main/putra.jpeg",
              desc: "Developing Website & API"
            },
            {
              name: "Aan",
              role: "Data Researcher",
              image: "https://raw.githubusercontent.com/arundaya-project/images/refs/heads/main/aan.jpeg",
              desc: "API Data Researcher"
            },
            {
              name: "Rendra",
              role: "UI/UX Designer",
              image: "https://raw.githubusercontent.com/arundaya-project/images/refs/heads/main/rendra.jpeg",
              desc: "UI/UX Web Design"
            },
            {
              name: "Prima",
              role: "API Developer",
              image: 'https://raw.githubusercontent.com/arundaya-project/images/refs/heads/main/prima.jpeg',
              desc: "API Worker & Data Researcher"
            }
          ].map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur group-hover:opacity-60 transition-opacity" />
              <div className="relative bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="aspect-square rounded-xl overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <div className="text-sm font-medium text-blue-400 mb-2">{member.role}</div>
                <p className="text-white/60 text-sm">{member.desc}</p>
                <div className="mt-4 flex justify-center gap-3">
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enhanced Content Sections */}
      <main className="container mx-auto px-4">
        {sections.map((section, idx) => { 
          const sectionKey = section.toLowerCase() as keyof ContentData;
          const items = data[sectionKey];

          console.log(`Rendering section ${section}:`, items?.length || 0, 'items');

          return (
            <section key={section} id={section.toLowerCase()} className="min-h-screen py-32">
              {/* Add decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <div className="text-[20rem] font-black text-white/10 pointer-events-none select-none">
                  {idx + 1}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl font-bold text-white mb-4">{section}</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-blue-500 mx-auto rounded-full" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                  // Loading skeleton
                  [...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-white/10 rounded-2xl h-[300px]" />
                  ))
                ) : items?.length > 0 ? (
                  items.map((item, index) => (
                    <Card
                      key={item.id || index}
                      item={item}
                      index={index}
                      type={sectionKey}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-white/60">Tidak ada data tersedia</p>
                    <button onClick={loadData} className="mt-4 text-blue-400">
                      Muat Ulang
                    </button>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </main>

      {/* Enhanced Footer */}
      <footer className="relative border-t border-white/[0.05] backdrop-blur-xl bg-black/40">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="container mx-auto px-4 py-12 relative">
          <div className="text-center">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Wonderwise
            </h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              Jelajahi keajaiban Sulawesi Tenggara bersama kami. Temukan cerita yang belum pernah terungkap.
            </p>
          </div>
        </div>
      </footer>

      {/* Update error message display */}
      {error && (
        <div className="fixed top-20 left-0 right-0 z-50 mx-auto max-w-md">
          <div className="bg-red-500/80 backdrop-blur-sm text-white px-6 py-4 rounded-lg shadow-lg">
            <p className="text-center mb-4">{error}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRetry}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors"
              >
                Coba Lagi
              </button>
              <button
                onClick={() => setError(null)}
                className="text-white/80 hover:text-white"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
