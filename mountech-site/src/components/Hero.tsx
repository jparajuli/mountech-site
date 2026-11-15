import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { MEDIA_ASSETS } from '../assets/media';
import MediaFrame from './MediaFrame';

interface HeroProps {
  setRoute?: (route: {
    page: string;
    courseId: string;
    aiTab?: 'overview' | 'disaster' | 'sovereign' | 'agents' | 'doc-intel';
  }) => void;
}

export default function Hero({ setRoute }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const scrollToSolutions = () => {
    const el = document.getElementById('core-expertise');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setRoute?.({ page: 'services', courseId: 'ai-agents', aiTab: 'overview' });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden mt-hero-gradient text-[#F8FAFC] border-b border-white/10">
      <div className="absolute inset-0 mt-grid-dark opacity-70 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Narrative */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center space-y-6"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <span className="text-[#2EB6E0] font-semibold">MounTech Solution</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#4ADE80]">Kathmandu, Nepal</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] text-[#F8FAFC] text-balance">
              Engineering Intelligence.{' '}
              <span className="text-[#2EB6E0]">Empowering Innovation.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed max-w-xl">
              Applied AI, Data Science, Technology Consulting, and Technical Education for Nepal—turning research and engineering into practical local capability.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                id="cta-explore-solutions"
                onClick={scrollToSolutions}
                className="px-6 py-3 rounded-lg text-sm font-semibold bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-glow-brand transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>Explore Our Solutions</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                id="cta-lets-collaborate"
                onClick={scrollToContact}
                className="px-6 py-3 rounded-lg text-sm font-semibold bg-[#15803D] hover:bg-[#166534] text-white transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>Let&apos;s Collaborate</span>
                <ArrowUpRight size={15} className="text-[#BBF7D0]" />
              </button>
            </div>
          </motion.div>

          {/* Right Hero Graphic */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex items-stretch"
          >
            <div className="w-full rounded-2xl overflow-hidden border border-white/15 bg-[#0B1924] shadow-elevated flex">
              <MediaFrame
                src={MEDIA_ASSETS.heroAiNetwork}
                alt="Abstract computational neural network transitioning into Himalayan topographic contours"
                title="Applied AI & Computational Systems for Nepal"
                aspectClass="aspect-[16/9] lg:h-full lg:min-h-[340px]"
                eager={true}
                darkFallback={true}
                className="flex-1"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
