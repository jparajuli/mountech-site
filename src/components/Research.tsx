import React, { useState } from 'react';
import { 
  Landmark, GraduationCap, FileText, Share2, 
  ExternalLink, Sparkles, BookOpen, Microscope, ArrowUpRight
} from 'lucide-react';

export default function Research() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const operations = [
    { 
      icon: <FileText size={20} className="text-accent2" />, 
      title: "Academic Publications", 
      desc: "Authoring and contributing core technical breakthroughs to globally recognized journals and algorithmic review conventions." 
    },
    { 
      icon: <GraduationCap size={20} className="text-accent" />, 
      title: "University Networks", 
      desc: "Forging dynamic technology development partnerships with global and local academic institutions for applied innovation cycles." 
    },
    { 
      icon: <Landmark size={20} className="text-green" />, 
      title: "Grants & Resource Funding", 
      desc: "Securing capital channels for cutting-edge research paradigms, compute resource acquisitions, and regional engineering fellowships." 
    }
  ];

  const papers = [
    {
      title: "Sovereign Low-Bit Quantization on Heterogeneous Edge Hardware",
      focus: "Quantized 4-bit Llama/Mistral kernel optimization for offline edge environments.",
      status: "Published • IEEE / ArXiv",
      tags: ["PyTorch", "FlashAttention", "Quantization"]
    },
    {
      title: "Deterministic Semantic Guardrails in Multi-Agent Execution Graphs",
      focus: "Mitigating PII leakage and prompt injection risks in stateful agentic workflows.",
      status: "Peer-Review Underway",
      tags: ["Multi-Agent DAGs", "Zero-Trust", "NLP"]
    },
    {
      title: "Devanagari Subword Tokenization & Low-Resource Language Embeddings",
      focus: "Improving cosine recall and semantic representation for South Asian localized dialects.",
      status: "Collaborative MLDSN Paper",
      tags: ["NLP", "Embedding Spaces", "Devanagari"]
    }
  ];

  return (
    <section id="research" className="py-20 sm:py-28 border-t border-white/10 bg-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="font-mono text-xs text-accent2 uppercase tracking-wider">
            MOUNTECH LABS & INNOVATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Scientific Research & Node Innovation
          </h2>
          <p className="text-text-sub text-sm sm:text-base leading-relaxed">
            Advancing basic and applied technology frameworks through deep mathematical modeling, empirical computer science, and sovereign computing benchmarks.
          </p>
        </div>

        {/* 3 Core Operational Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {operations.map((op, idx) => (
            <div 
              key={idx} 
              className="bg-surface/80 border border-white/8 hover:border-accent2/40 rounded-2xl p-6 sm:p-7 space-y-4 transition-all shadow-md"
            >
              <div className="w-10 h-10 rounded-xl bg-card border border-white/5 flex items-center justify-center">
                {op.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-2">{op.title}</h3>
                <p className="text-text-sub text-xs leading-relaxed">{op.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Active Research Papers & Working Groups */}
        <div className="bg-surface/90 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <Microscope size={20} className="text-accent2" />
              <h3 className="text-lg font-bold text-white">Active Research Working Papers & Disclosures</h3>
            </div>
            <span className="text-xs font-mono text-text-muted">MTS Computational Lab</span>
          </div>

          <div className="space-y-4">
            {papers.map((paper, pIdx) => (
              <div 
                key={pIdx} 
                className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/5 hover:border-accent2/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent2/15 text-accent2 border border-accent2/30">
                      {paper.status}
                    </span>
                    <h4 className="text-sm font-bold text-white">{paper.title}</h4>
                  </div>
                  <p className="text-xs text-text-sub">{paper.focus}</p>
                  <div className="flex gap-1.5 pt-1">
                    {paper.tags.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface text-text-muted border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="self-end md:self-auto">
                  <a
                    href="#contact"
                    className="px-3.5 py-2 rounded-lg bg-surface hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <span>Request Manuscript</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
