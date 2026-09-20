import React, { useState, useEffect } from 'react';
import { DatabaseService } from '../services/database';
import { EnrollmentRecord, ContactRecord, DatabaseStats } from '../types';
import { 
  Database, ShieldCheck, Download, Trash2, X, RefreshCw, 
  CheckCircle2, Clock, Terminal, Search, Lock, ExternalLink
} from 'lucide-react';

interface DatabaseLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'enrollments' | 'contacts' | 'system';
}

export default function DatabaseLedgerModal({ 
  isOpen, 
  onClose, 
  defaultTab = 'enrollments' 
}: DatabaseLedgerModalProps) {
  const [activeTab, setActiveTab] = useState<'enrollments' | 'contacts' | 'system'>(defaultTab);
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>([]);
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const [enr, con, st] = await Promise.all([
        DatabaseService.getEnrollments(),
        DatabaseService.getContacts(),
        DatabaseService.getStats()
      ]);
      setEnrollments(enr);
      setContacts(con);
      setStats(st);
    } catch (err) {
      console.error('Error loading database records:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExportJSON = async () => {
    const jsonStr = await DatabaseService.exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mountech_database_export_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = async () => {
    if (window.confirm('Are you sure you want to purge all records from the local sovereign database?')) {
      await DatabaseService.clearAll();
      await loadData();
    }
  };

  const filteredEnrollments = enrollments.filter(e => 
    e.studentName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    e.studentEmail.toLowerCase().includes(searchFilter.toLowerCase()) ||
    e.receiptId.toLowerCase().includes(searchFilter.toLowerCase()) ||
    e.courseTitle.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.transmissionId.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.topic.toLowerCase().includes(searchFilter.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-5xl bg-white border border-black/[0.12] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 bg-cohere-stone border-b border-black/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cohere-ink text-white flex items-center justify-center shadow-sm">
              <Database size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-base sm:text-lg font-bold text-cohere-ink">
                  Sovereign Database & Audit Ledger
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300">
                  ONLINE • ENCRYPTED
                </span>
              </div>
              <p className="text-xs text-cohere-subtle">
                Real-time persistent storage for Academy Enrollments & Transmission Relays
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={isRefreshing}
              className="p-2 rounded-xl border border-black/[0.08] bg-white text-cohere-slate hover:text-cohere-ink hover:bg-cohere-stone transition-all"
              title="Refresh Records"
            >
              <RefreshCw size={15} className={isRefreshing ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={handleExportJSON}
              className="px-3 py-2 rounded-xl border border-black/[0.08] bg-white text-cohere-ink hover:bg-black hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5"
              title="Export database as JSON"
            >
              <Download size={14} />
              <span>Export JSON</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-cohere-slate hover:text-cohere-ink hover:bg-black/[0.05] transition-all ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Sub-nav & Search */}
        <div className="px-6 py-3 bg-white border-b border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-cohere-stone/70 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('enrollments')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'enrollments'
                  ? 'bg-white text-cohere-ink shadow-sm'
                  : 'text-cohere-slate hover:text-cohere-ink'
              }`}
            >
              <ShieldCheck size={14} />
              <span>Verified Enrollments</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-cohere-ink/10 font-mono">
                {enrollments.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'contacts'
                  ? 'bg-white text-cohere-ink shadow-sm'
                  : 'text-cohere-slate hover:text-cohere-ink'
              }`}
            >
              <Lock size={14} />
              <span>Contact Transmissions</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-cohere-ink/10 font-mono">
                {contacts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('system')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'system'
                  ? 'bg-white text-cohere-ink shadow-sm'
                  : 'text-cohere-slate hover:text-cohere-ink'
              }`}
            >
              <Terminal size={14} />
              <span>Engine Status</span>
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cohere-slate" />
            <input
              type="text"
              placeholder="Search database..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-cohere-stone border border-black/[0.08] focus:outline-none focus:border-cohere-ink"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 font-sans text-xs">
          
          {/* TAB 1: ENROLLMENTS */}
          {activeTab === 'enrollments' && (
            <div>
              {filteredEnrollments.length === 0 ? (
                <div className="py-12 text-center text-cohere-slate space-y-2">
                  <Database size={32} className="mx-auto text-black/20" />
                  <p className="font-semibold text-cohere-ink">No enrollments recorded yet</p>
                  <p className="text-xs text-cohere-subtle max-w-sm mx-auto">
                    When you enroll in an academy masterclass, complete email confirmation, and clear payment verification, the immutable record will be stored here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredEnrollments.map((enr) => (
                    <div 
                      key={enr.id}
                      className="p-4 rounded-2xl bg-cohere-stone/40 border border-black/[0.08] hover:border-black/[0.2] transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/[0.06] pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-cohere-ink bg-white px-2.5 py-1 rounded-lg border border-black/[0.08]">
                            {enr.receiptId}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 size={11} />
                            {enr.paymentStatus}
                          </span>
                          <span className="font-mono text-[10px] text-cohere-slate uppercase">
                            Method: {enr.paymentMethod}
                          </span>
                        </div>
                        <div className="font-mono text-[10px] text-cohere-slate flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(enr.enrolledAt).toLocaleString()}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <div className="text-[10px] font-mono text-cohere-slate uppercase">Student Participant</div>
                          <div className="font-bold text-cohere-ink text-sm">{enr.studentName}</div>
                          <div className="text-xs text-cohere-subtle font-mono">{enr.studentEmail}</div>
                          <div className="text-[10px] text-cohere-slate font-mono">{enr.studentPhone}</div>
                        </div>

                        <div>
                          <div className="text-[10px] font-mono text-cohere-slate uppercase">Cohort Course</div>
                          <div className="font-semibold text-cohere-ink">{enr.courseTitle}</div>
                          <div className="text-[10px] text-cohere-slate font-mono mt-0.5">
                            Tuition: <span className="font-bold text-cohere-ink">{enr.tuitionPaid}</span>
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] font-mono text-cohere-slate uppercase">Gateway Transaction</div>
                          <div className="font-mono text-xs text-cohere-ink font-bold truncate">
                            {enr.transactionId}
                          </div>
                          <div className="text-[10px] font-mono text-cohere-slate truncate mt-1">
                            Hash: <span className="text-cohere-ink">{enr.verificationHash.substring(0, 16)}...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CONTACTS */}
          {activeTab === 'contacts' && (
            <div>
              {filteredContacts.length === 0 ? (
                <div className="py-12 text-center text-cohere-slate space-y-2">
                  <Lock size={32} className="mx-auto text-black/20" />
                  <p className="font-semibold text-cohere-ink">No transmission relays logged</p>
                  <p className="text-xs text-cohere-subtle max-w-sm mx-auto">
                    When you dispatch an inquiry via the communications form, the encrypted transmission record will be committed to this database.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredContacts.map((c) => (
                    <div 
                      key={c.id}
                      className="p-4 rounded-2xl bg-cohere-stone/40 border border-black/[0.08] hover:border-black/[0.2] transition-all space-y-2.5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/[0.06] pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-cohere-ink bg-white px-2.5 py-1 rounded-lg border border-black/[0.08]">
                            {c.transmissionId}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-100 text-blue-800 border border-blue-200">
                            {c.connectionMethod.toUpperCase()}
                          </span>
                          <span className="text-[10px] font-mono text-cohere-slate">
                            {c.encryptionAlgorithm}
                          </span>
                        </div>
                        <div className="font-mono text-[10px] text-cohere-slate">
                          {new Date(c.timestamp).toLocaleString()}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <div className="text-[10px] font-mono text-cohere-slate">SENDER / ORG</div>
                          <div className="font-bold text-cohere-ink">{c.name}</div>
                          <div className="text-xs text-cohere-subtle font-mono">{c.email}</div>
                          {c.organization && <div className="text-[10px] text-cohere-slate font-mono">{c.organization}</div>}
                        </div>

                        <div>
                          <div className="text-[10px] font-mono text-cohere-slate">TRANSMISSION TOPIC</div>
                          <div className="font-semibold text-cohere-ink">{c.topic}</div>
                          <div className="text-[10px] font-mono text-cohere-slate mt-1 truncate">
                            SHA-256: {c.checksum.substring(0, 14)}...
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] font-mono text-cohere-slate">QUERY PAYLOAD</div>
                          <p className="text-xs text-cohere-subtle line-clamp-2 bg-white/70 p-2 rounded-lg border border-black/[0.04]">
                            "{c.query}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SYSTEM ENGINE */}
          {activeTab === 'system' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-cohere-stone border border-black/[0.08] space-y-1">
                  <div className="text-[10px] font-mono text-cohere-slate uppercase">STORAGE ENGINE</div>
                  <div className="font-bold text-cohere-ink text-sm">Indexed Persistent Local Store</div>
                  <div className="text-[10px] text-emerald-700 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    ACID-Safe & Offline-First
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-cohere-stone border border-black/[0.08] space-y-1">
                  <div className="text-[10px] font-mono text-cohere-slate uppercase">COMMITTED BLOCKS</div>
                  <div className="font-bold text-cohere-ink text-sm">
                    {enrollments.length + contacts.length} Total Records
                  </div>
                  <div className="text-[10px] text-cohere-slate font-mono">
                    {enrollments.length} Enrollments • {contacts.length} Transmissions
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-cohere-stone border border-black/[0.08] space-y-1">
                  <div className="text-[10px] font-mono text-cohere-slate uppercase">CRYPTOGRAPHIC STANDARD</div>
                  <div className="font-bold text-cohere-ink text-sm">SubtleCrypto SHA-256</div>
                  <div className="text-[10px] text-cohere-slate font-mono">
                    Zero Cloud Leaks / Sovereign
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cohere-stone border border-black/[0.08] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-cohere-ink">Purge Local Sovereign Database</h4>
                  <p className="text-xs text-cohere-subtle">
                    Permanently delete all locally recorded student admissions and contact inquiries.
                  </p>
                </div>
                <button
                  onClick={handleClear}
                  className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-semibold text-xs flex items-center gap-1.5 transition-all"
                >
                  <Trash2 size={14} />
                  <span>Purge Database</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-cohere-stone border-t border-black/[0.08] flex items-center justify-between text-[11px] font-mono text-cohere-slate">
          <div>MOUNTECH DATA MATRIX v2.4 • KATHMANDU CLUSTER</div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cohere-ink text-white font-sans text-xs font-semibold hover:bg-black"
          >
            Close Ledger
          </button>
        </div>
      </div>
    </div>
  );
}
