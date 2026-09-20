import React, { useState } from 'react';
import { CoreSolution } from '../types';
import { 
  Bot, GraduationCap, Server, ArrowRight, CheckCircle2, 
  Sparkles, Layers, ShieldCheck, Cpu, Terminal
} from 'lucide-react';

interface CoreSolutionsProps {
  onSelectSolution?: (targetPage: string) => void;
}

const SOLUTIONS: CoreSolution[] = [
  {
    id: 'multi-agent',
    title: 'B2B Multi-Agent Workflows',
    categoryBadge: 'Autonomous Systems',
    tagline: 'Deterministic automation for Nepal cross-border trade, customs, and enterprise logistics.',
    description: 'Replace manual multi-stakeholder document routing with deterministic Directed Acyclic Graph (DAG) agent swarms. Engineered specifically for complex South Asian trade documentation, ASYCUDA harmonization, and localized banking compliance.',
    highlights: [
      'Trade Compliance & Customs Harmonized System (HS Code) AI classification with 99.2% audit precision',
      'Automated Letters of Credit (LC) and Bill of Lading verification with instant anomaly flagging',
      'Multi-agent cross-border transit logistics routing through Birgunj, Tatopani, and Bhairahawa dry ports',
      'Complete audit trail with deterministic verification hashes for zero-hallucination regulatory reporting'
    ],
    specs: [
      { label: 'Latency', value: '< 45ms per document' },
      { label: 'Compliance', value: 'Nepal Customs / ASYCUDA' },
      { label: 'Architecture', value: 'Self-correcting DAG Agents' }
    ],
    targetPage: 'consulting',
    ctaText: 'Deploy Multi-Agent Pipeline'
  },
  {
    id: 'corporate-upskilling',
    title: 'Corporate Upskilling & Executive AI',
    categoryBadge: 'Executive & Engineering Mastery',
    tagline: 'Tailored AI workshops and engineering intensive bootcamps for executive leadership and core devs.',
    description: 'Bridge the divide between AI strategy and production execution. We deliver tailored, high-touch AI training modules for Nepali C-suites, government directors, and software engineering departments to transform legacy workflows into intelligent systems.',
    highlights: [
      'Executive Leadership Briefings: AI risk governance, ROI calculation, and generative AI liability frameworks',
      'Senior Engineering Sprints: Fine-tuning local LLMs, Quantization (GGUF/AWQ), and Production RAG architectures',
      'Hands-on Agentic Tool Use: Building custom LangGraph and AutoGen workflows for banking & telecom teams',
      'Certified 40-hour deep dives backed by MLDSN Nepal mentorship and industry-grade capstones'
    ],
    specs: [
      { label: 'Formats', value: '2-Day Intensive & 40h Tracks' },
      { label: 'Curriculum', value: 'Agentic, RAG & LLMOps' },
      { label: 'Audience', value: 'C-Suite, PMs & Tech Leads' }
    ],
    targetPage: 'school',
    ctaText: 'Explore Corporate Syllabus'
  },
  {
    id: 'sovereign-ai',
    title: 'Applied Sovereign AI Infrastructure',
    categoryBadge: 'Zero-Egress Compute',
    tagline: 'Secure, locally-hosted LLMs using Nepal’s clean hydroelectric compute capacity.',
    description: 'Protect your proprietary enterprise intelligence from external surveillance and cross-border IP leakage. We deploy fine-tuned open weights (Llama 3, Mistral, DeepSeek) inside dedicated, air-gapped data centers in Nepal powered by 100% renewable hydro energy.',
    highlights: [
      'Zero Data Egress: All inference, vector storage, and weights execute within sovereign on-premise hardware',
      'Hydro-Powered Efficiency: Green computing clusters lowering inference carbon footprint to zero',
      'Bilingual Fluency: Custom fine-tuned tokenizers optimized for Nepali, Devanagari script, and formal legal English',
      'Hardware Optimization: vLLM and TensorRT-LLM runtimes yielding 140+ tokens/second on enterprise clusters'
    ],
    specs: [
      { label: 'Energy Source', value: '100% Nepal Hydroelectric' },
      { label: 'Egress Policy', value: 'Zero External Packets' },
      { label: 'Languages', value: 'Devanagari, Nepali, English' }
    ],
    targetPage: 'ai',
    ctaText: 'Audit Sovereign Blueprint'
  }
];

export default function CoreSolutions({ onSelectSolution }: CoreSolutionsProps) {
  const [activeSolutionId, setActiveSolutionId] = useState<string>('multi-agent');

  return (
    <section 
      id="core-solutions"
      aria-label="Core Applied AI Solutions"
      className="py-20 sm:py-28 bg-[#fbfbfa] border-b border-black/[0.06] relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cohere-coral/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-cohere-teal/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <header className="max-w-3xl mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-[11px] font-mono text-cohere-slate">
            <Cpu size={12} className="text-cohere-coral" />
            <span className="font-semibold text-cohere-ink uppercase tracking-wider">
              ENTERPRISE CAPABILITIES
            </span>
            <span className="text-black/30">•</span>
            <span>Applied AI for Nepal</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cohere-ink tracking-tight">
            Core Solutions: Engineering High-Impact National AI
          </h2>

          <p className="text-base sm:text-lg text-cohere-subtle font-normal leading-relaxed">
            From autonomous customs clearance to air-gapped sovereign inference powered by clean hydropower, our solutions deliver tangible operational sovereignty.
          </p>
        </header>

        {/* ── SOLUTIONS GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {SOLUTIONS.map((solution, idx) => {
            const isSelected = activeSolutionId === solution.id;
            
            return (
              <article 
                key={solution.id}
                onMouseEnter={() => setActiveSolutionId(solution.id)}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative border ${
                  isSelected 
                    ? 'bg-white border-cohere-ink shadow-xl ring-1 ring-black/5 -translate-y-1' 
                    : 'bg-[#f4f3ef]/80 hover:bg-white border-black/[0.08] shadow-sm'
                }`}
              >
                {/* Header of card */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full font-semibold ${
                      idx === 0 
                        ? 'bg-cohere-coral/10 text-cohere-coral border border-cohere-coral/20' 
                        : idx === 1 
                        ? 'bg-cohere-teal/10 text-cohere-teal border border-cohere-teal/20' 
                        : 'bg-cohere-ink text-white'
                    }`}>
                      {solution.categoryBadge}
                    </span>

                    <span className="text-xs font-mono text-cohere-slate">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-cohere-ink tracking-tight mb-2">
                    {solution.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] font-mono text-cohere-slate mb-4 font-medium">
                    {solution.tagline}
                  </p>

                  <p className="text-sm text-cohere-subtle leading-relaxed mb-6">
                    {solution.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-black/[0.06]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cohere-slate block mb-2">
                      Key Technical Deliverables:
                    </span>
                    {solution.highlights.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs text-cohere-ink/90">
                        <CheckCircle2 size={14} className="text-cohere-teal shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Specifications & CTA */}
                <div>
                  {/* Specs Box */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/[0.03] border border-black/[0.04] mb-5 text-[10px] font-mono">
                    {solution.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="text-center">
                        <div className="text-cohere-slate uppercase tracking-tighter truncate">{spec.label}</div>
                        <div className="font-bold text-cohere-ink truncate mt-0.5">{spec.value}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectSolution?.(solution.targetPage)}
                    className="w-full rounded-full py-3 px-4 text-xs font-semibold bg-cohere-ink hover:bg-black text-white transition-all flex items-center justify-center gap-2 group active:scale-95 shadow-sm"
                  >
                    <span>{solution.ctaText}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </article>
            );
          })}
        </div>

        {/* Bottom Banner for Architecture Inquiries */}
        <div className="mt-12 p-6 rounded-2xl bg-[#111116] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 shadow-lg">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-cohere-teal">
              <ShieldCheck size={14} />
              <span>Institutional On-Premise Audit</span>
            </div>
            <p className="font-display font-bold text-lg text-white">
              Need a confidential architecture assessment for your banking or telecom infrastructure?
            </p>
            <p className="text-xs text-white/60">
              Our principal systems architects conduct air-gapped threat modeling and DAG workflow proof-of-concepts.
            </p>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="rounded-full px-6 py-2.5 text-xs font-semibold bg-white text-cohere-ink hover:bg-[#e4e2dc] transition-all shrink-0 active:scale-95"
          >
            Request Systems Assessment
          </button>
        </div>

      </div>
    </section>
  );
}
