import React from 'react';
import { 
  Terminal, Shield, BrainCircuit, Layers, ArrowRight, 
  FolderOpen, ShieldAlert, Cpu, Database, Activity, Network, Sliders
} from 'lucide-react';

export default function AiSolutions({ summaryOnly, onViewFull }: { summaryOnly?: boolean; onViewFull?: () => void }) {
  
  // 🏛️ CORE SERVICE PILLARS (The Original Content Framework)
  const enterpriseServices = [
    {
      icon: <Network size={22} style={{ color: 'var(--accent2)' }} />,
      title: "Multi-Agent Pipelines & Engineering",
      desc: "Architecting stateful, decentralized execution graphs with human-in-the-loop validation gates to handle multi-layered transaction processing automatically."
    },
    {
      icon: <Cpu size={22} style={{ color: 'var(--accent)' }} />,
      title: "Custom Inference Layers",
      desc: "Configuring quantized, low-memory 4-bit open-weight models (Llama, Mistral) engineered explicitly for offline-first localized execution fabrics."
    },
    {
      icon: <Shield size={22} style={{ color: 'var(--green)' }} />,
      title: "Private Data Guardrails",
      desc: "Deploying rigid semantic firewalls and cryptographic token regex tokenizers that intercept data matrices to strip PII before storage indexing."
    },
    {
      icon: <Layers size={22} style={{ color: '#fff' }} />,
      title: "Small-Scale Systems Solutions",
      desc: "Deploying high-performance containerized automation modules and real-time telemetry analytics pipelines for secure local office centers."
    }
  ];

  // 🛠️ GRANULAR TECHNICAL FEATURES (The Operational Specs)
  const technicalSpecs = [
    {
      icon: <FolderOpen size={20} style={{ color: 'var(--accent)' }} />,
      title: "Folder Watcher Daemon",
      desc: "Monitors secure file directories in real time, auto-parsing raw text strings from newly appended paperwork with zero manual interactions."
    },
    {
      icon: <ShieldAlert size={20} style={{ color: 'var(--green)' }} />,
      title: "Deterministic Parsing Cells",
      desc: "Intercepts data arrays using a secure regex compliance proxy to mask passwords, IDs, and financial indicators instantly."
    },
    {
      icon: <Database size={20} style={{ color: 'var(--accent2)' }} />,
      title: "Embedded Chunk Topologies",
      desc: "Slices data strings into 512-character token blocks with a 10% structural overlap, mapping vectors directly into Qdrant index layouts."
    },
    {
      icon: <Sliders size={20} style={{ color: '#fff' }} />,
      title: "Zero-Hallucination Prompts",
      desc: "Enforces strict system prompt conditions bounding local models to processed context, aborting the workflow if files do not match query maps."
    }
  ];

  // ──── HOME PREVIEW WIDGET (SUMMARY PANEL) ────
  if (summaryOnly) {
    return (
      <section id="ai-summary" style={{ padding: '80px 24px', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: '1.2', minWidth: '320px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: 'var(--accent)' }}>COMPUTATIONAL CORE</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.03em', marginTop: '8px', marginBottom: '16px' }}>
              MounTech AI Solutions
            </h2>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Engineering decentralized algorithmic systems designed to bridge sovereign technological security limits with resilient enterprise lifecycle automation.
            </p>
            <button 
              onClick={onViewFull}
              style={{ background: 'var(--accent)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
            >
              Analyze Architecture Blueprints →
            </button>
          </div>
          
          <div style={{ flex: '1', display: 'grid', gridTemplateColumns: '1fr', gap: '16px', minWidth: '300px' }}>
            {enterpriseServices.slice(0, 2).map((service, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '24px', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  {service.icon} <strong style={{ fontSize: '1.05rem', color: '#fff' }}>{service.title}</strong>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ──── DEDICATED FULL LAB CANVAS VIEW (PRESERVES ALL OLD + NEW ITEMS) ────
  return (
    <div style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Dynamic Header Block */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <BrainCircuit size={36} style={{ color: 'var(--accent)', marginBottom: '12px' }} />
        <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em' }}>Sovereign AI Systems Framework</h1>
        <p style={{ color: 'var(--text-sub)', maxWidth: '600px', margin: '8px auto 0', fontSize: '0.95rem', lineHeight: 1.6 }}>
          Comprehensive capability matrix combining zero-trust cloud engineering partitions with localized operational execution nodes.
        </p>
      </div>

      {/* ── SECTION A: ENTERPRISE CORE SERVICE PILLARS (HISTORICAL DATA) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '64px' }}>
        {enterpriseServices.map((service, idx) => (
          <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '28px' }}>
            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '10px', borderRadius: '8px', width: 'fit-content', marginBottom: '16px' }}>
              {service.icon}
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '10px', color: '#fff' }}>{service.title}</h3>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.85rem', lineHeight: 1.6 }}>{service.desc}</p>
          </div>
        ))}
      </div>

      {/* ── SECTION B: NEW VISUAL PROJECT ALPINE BLUEPRINT MAP ── */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px',
        padding: '40px 24px', marginBottom: '64px', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '16px', right: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--green)' }}>
          <span style={{ width: '6px', height: '6px', background: 'var(--green)', borderRadius: '50%', display: 'inline-block' }}></span>
          OFFLINE PROTOCOL ACTIVE (ZERO CLOUD LEAKS)
        </div>
        
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={16} style={{ color: 'var(--accent)' }} /> Case Study Demo: Project Alpine Architecture
        </h3>

        <div className="flow-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          
          {/* Flow 1 */}
          <div className="flow-card" style={{ flex: '1', minWidth: '200px', background: 'var(--card)', border: '1px solid var(--border)', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ background: 'rgba(79,156,249,0.1)', padding: '10px', borderRadius: '50%', width: 'fit-content', margin: '0 auto 12px', border: '1px solid rgba(79,156,249,0.2)' }}>
              <FolderOpen size={20} style={{ color: 'var(--accent)' }} />
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px' }}>1. Local Ingestion</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Watchdog Directory Daemon</div>
          </div>

          <div className="flow-arrow" style={{ color: 'var(--text-muted)', display: 'flex', justifyContent: 'center' }}><ArrowRight size={20} /></div>

          {/* Flow 2 */}
          <div className="flow-card" style={{ flex: '1', minWidth: '200px', background: 'var(--card)', border: '1px solid var(--green)', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ background: 'rgba(52,211,153,0.1)', padding: '10px', borderRadius: '50%', width: 'fit-content', margin: '0 auto 12px', border: '1px solid rgba(52,211,153,0.2)' }}>
              <ShieldAlert size={20} style={{ color: 'var(--green)' }} />
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px', color: 'var(--green)' }}>2. Private Guardrail</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Regex / Token PII Masking</div>
          </div>

          <div className="flow-arrow" style={{ color: 'var(--text-muted)', display: 'flex', justifyContent: 'center' }}><ArrowRight size={20} /></div>

          {/* Flow 3 */}
          <div className="flow-card" style={{ flex: '1', minWidth: '200px', background: 'var(--card)', border: '1px solid var(--border)', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ background: 'rgba(167,139,250,0.1)', padding: '10px', borderRadius: '50%', width: 'fit-content', margin: '0 auto 12px', border: '1px solid rgba(167,139,250,0.2)' }}>
              <Database size={20} style={{ color: 'var(--accent2)' }} />
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px' }}>3. Embedded Matrix</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qdrant / Context Topologies</div>
          </div>

          <div className="flow-arrow" style={{ color: 'var(--text-muted)', display: 'flex', justifyContent: 'center' }}><ArrowRight size={20} /></div>

          {/* Flow 4 */}
          <div className="flow-card" style={{ flex: '1', minWidth: '200px', background: 'var(--card)', border: '1px solid var(--border)', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '50%', width: 'fit-content', margin: '0 auto 12px', border: '1px solid var(--border)' }}>
              <Terminal size={20} style={{ color: '#fff' }} />
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px' }}>4. Custom Inference</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Offline Quantized Llama/Mistral</div>
          </div>

        </div>
      </div>

      {/* ── SECTION C: OPERATIONAL CORE SPECIFICATIONS BREAKDOWN ── */}
      <div>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Granular Operational Tech Specs</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>Deep technical behaviors structuring the Project Alpine engine architecture loops.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {technicalSpecs.map((f, idx) => (
            <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px' }}>
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px', borderRadius: '8px', width: 'fit-content', marginBottom: '16px' }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '12px', color: '#fff' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-sub)', fontSize: '0.88rem', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .flow-container { flex-direction: column !important; align-items: stretch !important; }
          .flow-arrow { transform: rotate(90deg); margin: 8px 0; }
          .flow-card { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
