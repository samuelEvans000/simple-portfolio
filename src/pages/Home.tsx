import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectGallery } from '@/components/Dialog';
import { TextEffect } from '../components/TextEffect';
import AnimatedBackground from '@/components/core/animated-background';
import { User, SquareLibrary, Boxes, Wrench, Mail, MoveRight } from 'lucide-react';
import '../index.css';
import Timeline from '@/components/TimeLine';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import { Toaster } from '@/components/ui/toaster';

const TABS = [
  {
    id: 'about',
    label: 'About',
    icon: <User className='h-5 w-5' />,
    content: (
      <div className='space-y-4'>
        <TextEffect per='char' preset='fade' className="text-4xl font-bold">
          Hey! I'm Vincent Samuel Kesari.
        </TextEffect>
        <TextEffect per='char' preset='fade' className="text-2xl">
          I'm a Frontend Developer.
        </TextEffect>
        <a target='_blank' href='https://drive.google.com/file/d/1n1KS4MC2Hh3A6IYL4qmMaG2NQta2PvGL/view?usp=sharing' download className='btn flex items-center gap-4'><MoveRight className='h-5 w-5 mt-1'/><TextEffect className="text-2xl">My Resume</TextEffect></a>
      </div>
    ),
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: <Boxes className='h-5 w-5' />,
    content: (
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">My Experience</h2>
        <Timeline defaultColor="" />
      </div>
    ),
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: <SquareLibrary className='h-5 w-5' />,
    content: (
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">My Projects</h2>
        <ProjectGallery />
      </div>
    ),
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: <Wrench className='h-5 w-5' />,
    content: (
      <div>
        <Skills />
      </div>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: <Mail className='h-5 w-5' />,
    content: <Contact />,
  },
];

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("about");
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const virtualScrollPosition = useRef(0);
  const tabHeight = 100; // Virtual height for each tab

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const isScrolledToTop = scrollTop === 0;
        const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 1; // -1 for potential rounding errors

        if ((isScrolledToTop && e.deltaY < 0) || (isScrolledToBottom && e.deltaY > 0)) {
          e.preventDefault();
          
          virtualScrollPosition.current += e.deltaY;
          const newTabIndex = Math.floor(virtualScrollPosition.current / tabHeight) % TABS.length;
          const newActiveTab = TABS[newTabIndex < 0 ? TABS.length + newTabIndex : newTabIndex].id;
          
          setScrollDirection(e.deltaY > 0 ? 'down' : 'up');
          
          if (newActiveTab !== activeTab) {
            setActiveTab(newActiveTab);
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [activeTab]);

  const handleTabChange = (newActiveId: string | null) => {
    if (newActiveId) {
      setActiveTab(newActiveId);
      const newIndex = TABS.findIndex(tab => tab.id === newActiveId);
      virtualScrollPosition.current = newIndex * tabHeight;
    }
  };

  return (
    <div ref={containerRef} className={`w-full ${activeTab === 'experience' ? 'h-full' : 'h-full'} text-white relative overflow-hidden`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: scrollDirection === 'down' ? 50 : -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: scrollDirection === 'down' ? -50 : 50 }}
          transition={{ duration: 0.3 }}
          className="p-8 pb-24 flex justify-center items-center h-full"
        >
          <div 
            ref={contentRef} 
            className="w-full h-full overflow-y-auto"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none', 
            }}
          >
            <div className={`min-h-full flex items-center justify-center`}>
              {TABS.find(tab => tab.id === activeTab)?.content}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10'>
        <div className='flex w-full space-x-2 rounded-xl border border-zinc-950/10 bg-white p-2 shadow-lg shadow-gray-800'>
          <AnimatedBackground
            defaultValue={activeTab}
            onValueChange={handleTabChange}
            className='rounded-lg bg-black'
            transition={{
              type: 'spring',
              bounce: 0.2,
              duration: 0.3,
            }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                data-id={tab.id}
                type='button'
                className='inline-flex h-9 w-9 items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-50'
              >
                {tab.icon}
              </button>
            ))}
          </AnimatedBackground>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Home;
