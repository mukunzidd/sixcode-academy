'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { core } from '@/lib/data';

const progressKey = 'sixcode-progress';
const completionKey = 'sixcode-completions';
const updateEvent = 'sixcode-progress-updated';

export function CoreSidebar({ activeCourse, activeModule }: { activeCourse?: string; activeModule?: number }) {
  const [done, setDone] = useState<boolean[]>([]);
  const [completions, setCompletions] = useState<Record<string, boolean>>({});
  function readProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(progressKey) || '[]');
      setDone(Array.isArray(saved) ? saved.map((item: unknown) => item === true || item === 'true') : []);
      setCompletions(JSON.parse(localStorage.getItem(completionKey) || '{}'));
    } catch { setDone([]); setCompletions({}); }
  }
  useEffect(() => { readProgress(); window.addEventListener(updateEvent, readProgress); return () => window.removeEventListener(updateEvent, readProgress); }, []);
  const total = core.reduce((sum, course) => sum + course.modules.length, 0);
  const complete = core.reduce((sum, course) => sum + course.modules.filter((_, index) => completions[`lesson:${course.slug}:${index}`]).length, 0);
  const percent = Math.round((complete / total) * 100);
  return <aside className="core-sidebar lg:sticky lg:top-6 lg:h-[calc(100vh-48px)] lg:overflow-y-auto">
    <div className="mb-6 flex items-end justify-between border-b border-line pb-4 dark:border-slate-700"><div><p className="eyebrow text-coral">Core / 12 weeks</p><p className="mt-2 text-sm font-bold">Your route</p></div><span className="font-mono text-xs text-muted">{percent}%</span></div>
    <div className="mb-6 h-1 bg-line dark:bg-slate-700"><div className="h-1 bg-coral transition-all" style={{ width: `${percent}%` }} /></div>
    <nav aria-label="Core curriculum">{core.map((course) => <div key={course.slug} className="mb-5"><p className="mb-2 font-mono text-[10px] uppercase tracking-[.12em] text-muted">{course.number} / {course.title}</p><ol className="space-y-1">{course.modules.map((module, index) => { const current = course.slug === activeCourse && index === activeModule; const isDone = Boolean(completions[`lesson:${course.slug}:${index}`]); return <li key={module}><Link href={`/core/${course.slug}/brief-${index + 1}/`} className={`flex items-start gap-2 px-2 py-2 text-sm transition ${current ? 'bg-ink text-paper dark:bg-paper dark:text-ink' : 'hover:bg-paper dark:hover:bg-slate-800'}`}><span className={`mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border text-[10px] ${isDone ? 'border-coral bg-coral text-white' : 'border-muted'}`}>{isDone ? '✓' : ''}</span><span>{module}</span></Link></li>; })}</ol></div>)}</nav>
    <Link href="/progress/" className="mt-3 block border border-ink px-3 py-3 text-center text-sm font-bold dark:border-slate-200">Open progress board ↗</Link>
  </aside>;
}
