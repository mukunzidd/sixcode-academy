'use client';

import { useEffect, useState } from 'react';

const completionKey = 'sixcode-completions';
const updateEvent = 'sixcode-progress-updated';

export function CompletionMarker({ id, label }: { id: string; label: string }) {
  const [complete, setComplete] = useState(false);
  const [mentor, setMentor] = useState(false);
  function read() {
    try { const saved = JSON.parse(localStorage.getItem(completionKey) || '{}'); setComplete(Boolean(saved[id])); const user = JSON.parse(localStorage.getItem('sixcode-user') || 'null'); setMentor(user?.role === 'mentor'); } catch { setComplete(false); setMentor(false); }
  }
  useEffect(() => { read(); window.addEventListener(updateEvent, read); return () => window.removeEventListener(updateEvent, read); }, [id]);
  function toggle() { if (!mentor) return; const saved = JSON.parse(localStorage.getItem(completionKey) || '{}'); const next = { ...saved, [id]: !complete }; localStorage.setItem(completionKey, JSON.stringify(next)); setComplete(!complete); window.dispatchEvent(new Event(updateEvent)); }
  return <div className="flex flex-wrap items-center gap-3"><span className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.08em] ${complete ? 'text-coral' : 'text-muted'}`}><span className={`grid h-5 w-5 place-items-center rounded-full border text-xs ${complete ? 'border-coral bg-coral text-white' : 'border-line dark:border-slate-600'}`}>{complete ? '✓' : '·'}</span>{complete ? 'Complete' : 'Awaiting mentor'}</span>{mentor && <button type="button" onClick={toggle} className="text-xs font-bold text-coral underline underline-offset-4">{complete ? `Reopen ${label}` : `Mark ${label} done`}</button>}</div>;
}
