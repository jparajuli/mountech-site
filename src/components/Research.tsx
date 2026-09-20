import React from 'react';
import { 
  Landmark, GraduationCap, FileText, 
  Microscope, ArrowUpRight
} from 'lucide-react';

export default function Research() {
  const operations = [
    { 
      icon: <FileText size={20} className="text-cohere-coral" />, 
      title: "Academic Publications", 
      desc: "Authoring and contributing core technical breakthroughs to globally recognized journals and algorithmic review conventions." 
    },
    { 
      icon: <GraduationCap size={20} className="text-cohere-ink" />, 
      title: "University Networks", 
      desc: "Forging dynamic technology development partnerships with global and local academic institutions for applied innovation cycles." 
    },
    { 
      icon: <Landmark size={20} className="text-cohere-teal" />, 
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
    <section id="research" className="py-20 sm:py-28 bg-cohere-canvas border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="font-mono text-xs text-cohere-slate uppercase tracking-widest">
            MOUNTECH LABS & INNOVATION
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-cohere-ink tracking-tight">
            Scientific Research & Node Innovation
          </h2>
          <p className="text-cohere-subtle text-sm sm:text-base leading-relaxed">
            Advancing basic and applied technology frameworks through deep mathematical modeling, empirical computer science, and sovereign computing benchmarks.
          </p>
        </div>

        {/* 3 Core Operational Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {operations.map((op, idx) => (
            <div 
              key={idx} 
              className="p-7 rounded-2xl bg-cohere-stone/60 border border-black/[0.08] hover:border-black/[0.2] transition-all space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center">
                {op.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-cohere-ink mb-1.5">{op.title}</h3>
                <p className="text-cohere-subtle text-xs leading-relaxed">{op.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Active Research Papers & Working Groups */}
        <div className="p-6 sm:p-10 rounded-2xl bg-white border border-black/[0.08] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
            <div className="flex items-center gap-2.5">
              <Microscope size={20} className="text-cohere-coral" />
              <h3 className="font-display text-lg font-bold text-cohere-ink">
                Active Research Working Papers & Disclosures
              </h3>
            </div>
            <span className="text-xs font-mono text-cohere-slate">MTS Computational Lab</span>
          </div>

          <div className="space-y-4">
            {papers.map((paper, pIdx) => (
              <div 
                key={pIdx} 
                className="p-5 rounded-xl bg-cohere-stone/50 border border-black/[0.06] hover:border-black/[0.18] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white border border-black/[0.08] text-cohere-ink font-semibold">
                      {paper.status}
                    </span>
                    <h4 className="text-sm font-bold text-cohere-ink">{paper.title}</h4>
                  </div>
                  <p className="text-xs text-cohere-subtle">{paper.focus}</p>
                  <div className="flex gap-1.5 pt-1">
                    {paper.tags.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-cohere-slate border border-black/[0.06]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="self-end md:self-auto">
                  <a
                    href="#contact"
                    className="rounded-full px-4 py-2 bg-white hover:bg-cohere-ink hover:text-white border border-black/[0.1] text-cohere-ink text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-sm"
                  >
                    <span>Request Manuscript</span>
                    <ArrowUpRight size={12} />
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
