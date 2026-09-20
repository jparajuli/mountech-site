import React from 'react';
import { TrustPartner, StatMetric } from '../types';
import { ShieldCheck, TrendingUp, Users, Cpu, Activity, Zap } from 'lucide-react';

const PARTNERS: TrustPartner[] = [
  {
    id: 'nabil-sample',
    name: 'Nabil Bank',
    nepaliName: 'नबिल बैंक',
    category: 'Banking',
    tagline: 'Automated AML & Risk Graph Processing',
    sampleBadge: 'Tier-1 Commercial Bank'
  },
  {
    id: 'ntc-sample',
    name: 'Nepal Telecom (NTC)',
    nepaliName: 'नेपाल टेलिकम',
    category: 'Telecom',
    tagline: 'High-Throughput Cell Traffic Analytics',
    sampleBadge: 'National Infrastructure'
  },
  {
    id: 'ncell-sample',
    name: 'Ncell Axiata',
    nepaliName: 'एनसेल',
    category: 'Telecom',
    tagline: 'Customer Retention & Agentic Routing',
    sampleBadge: 'Enterprise Telecom'
  },
  {
    id: 'icimod-sample',
    name: 'ICIMOD Climate Lab',
    nepaliName: 'इसिमोड',
    category: 'NGO & Research',
    tagline: 'Glacial Melt & River Basin Monitoring',
    sampleBadge: 'Intergovernmental Hub'
  },
  {
    id: 'redcross-sample',
    name: 'Nepal Red Cross Society',
    nepaliName: 'नेपाल रेडक्रस',
    category: 'NGO & Research',
    tagline: 'Emergency Response & Aid Dispatch Agents',
    sampleBadge: 'Humanitarian NGO'
  },
  {
    id: 'prabhu-sample',
    name: 'Prabhu Bank',
    nepaliName: 'प्रभु बैंक',
    category: 'Banking',
    tagline: 'Digital Remittance Reconciliation',
    sampleBadge: 'Financial Services'
  }
];

const METRICS: StatMetric[] = [
  {
    id: 'students',
    label: 'Students & Engineers Trained',
    value: '2,500+',
    unit: 'Alumni',
    description: 'Trained through MLDSN non-profit bootcamps and MounTech Academy 40h masterclasses.',
    trend: '+45% YoY'
  },
  {
    id: 'agents',
    label: 'Enterprise Agents Deployed',
    value: '48+',
    unit: 'Active Enclaves',
    description: 'Autonomous DAG execution graphs running in production banking and supply-chain nodes.',
    trend: '99.98% SLA'
  },
  {
    id: 'compute',
    label: 'Sovereign Hydro Compute',
    value: '100%',
    unit: 'Green Energy',
    description: 'Data pipelines orchestrated with zero international cloud leaks powered by Nepal hydro.',
    trend: 'Net-Zero Emission'
  },
  {
    id: 'telemetry',
    label: 'Disaster Telemetry Data Points',
    value: '1.2M+',
    unit: 'Daily Records',
    description: 'Real-time hydrological, precipitation, and satellite indices ingested across river basins.',
    trend: '< 18ms Latency'
  }
];

export default function TrustSignals() {
  return (
    <section 
      id="trust-signals"
      aria-label="Trust Signals and Operational Metrics"
      className="border-b border-black/[0.06] bg-[#f7f6f3] py-14 sm:py-18 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header & Sample Indicator */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.08] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/[0.04] text-[11px] font-mono text-cohere-slate mb-2">
              <ShieldCheck size={12} className="text-cohere-teal" />
              <span>ECOSYSTEM VALIDATION</span>
              <span className="text-black/30">•</span>
              <span className="text-cohere-coral font-medium">Sample Partner Representative Archetypes</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-cohere-ink tracking-tight">
              Trusted by Nepal&apos;s Critical Sectors
            </h2>
          </div>
          <p className="text-xs text-cohere-subtle max-w-md font-mono">
            Architected for regulatory sovereignty: zero unmasked customer data leaves national borders. Built to institutional compliance standards.
          </p>
        </header>

        {/* ── PARTNER LOGO BANNER (Sample Archetypes) ── */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-cohere-slate mb-4 flex items-center justify-between">
            <span>Institutional Integrations & Pilot Archetypes</span>
            <span className="text-[10px] bg-black/[0.05] px-2 py-0.5 rounded text-cohere-ink/70">
              Sample Ecosystem Roster
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {PARTNERS.map((partner) => (
              <article 
                key={partner.id}
                className="group relative bg-white rounded-xl p-4 border border-black/[0.07] hover:border-cohere-ink/40 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                {/* Visual stylized logo emblem */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-cohere-slate uppercase px-1.5 py-0.5 bg-cohere-stone rounded">
                    {partner.category}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-cohere-teal/60 group-hover:bg-cohere-teal transition-colors" />
                </div>

                <div className="space-y-1 my-1">
                  <h3 className="font-display font-bold text-sm text-cohere-ink tracking-tight group-hover:text-cohere-coral transition-colors">
                    {partner.name}
                  </h3>
                  {partner.nepaliName && (
                    <p className="text-[11px] text-cohere-slate/80 font-serif">
                      {partner.nepaliName}
                    </p>
                  )}
                </div>

                <p className="text-[10px] text-cohere-subtle font-mono mt-2 pt-2 border-t border-black/[0.04] line-clamp-2">
                  {partner.tagline}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ── PERFORMANCE STATS ROW ── */}
        <div className="pt-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-cohere-slate mb-4">
            Verified Production Footprint
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {METRICS.map((metric) => (
              <div 
                key={metric.id}
                className="bg-white rounded-xl p-5 border border-black/[0.07] shadow-sm relative overflow-hidden group hover:border-black/20 transition-all"
              >
                {/* Subtle top indicator line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cohere-coral/40 via-cohere-teal/40 to-cohere-ink/20 opacity-40 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-between text-xs font-mono text-cohere-slate mb-2">
                  <span>{metric.unit}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cohere-teal bg-cohere-teal/10 px-2 py-0.5 rounded-full">
                    <TrendingUp size={11} />
                    {metric.trend}
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-cohere-ink tracking-tight my-2">
                  {metric.value}
                </div>

                <h3 className="text-sm font-semibold text-cohere-ink mb-1.5">
                  {metric.label}
                </h3>

                <p className="text-xs text-cohere-subtle leading-relaxed">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
