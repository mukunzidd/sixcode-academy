'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { slugify, Track } from '@/lib/data';

const completionKey = 'sixcode-completions';
const updateEvent = 'sixcode-progress-updated';

export function TrackSidebar({ track, activeUnit, activeLesson }: { track: Track; activeUnit: string; activeLesson: string }) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  function read() { try { setCompleted(JSON.parse(localStorage.getItem(completionKey) || '{}')); } catch { setCompleted({}); } }
  useEffect(() => { read(); window.addEventListener(updateEvent, read); return () => window.removeEventListener(updateEvent, read); }, []);
  const total = track.units.reduce((sum, unit) => sum + unit.lessons.length, 0);
  const finished = track.units.reduce((sum, unit) => sum + unit.lessons.filter((lesson) => completed[`track:${track.slug}:${unit.slug}:${slugify(lesson)}`]).length, 0);
  const percent = Math.round((finished / total) * 100);
  return <aside className="core-sidebar lg:sticky lg:top-6 lg:h-[calc(100vh-48px)] lg:overflow-y-auto"><div className="mb-6 flex items-end justify-between border-b border-line pb-4 dark:border-slate-700"><div><p className="eyebrow text-coral">Track / {track.units.length} units</p><p className="mt-2 text-sm font-bold">{track.title}</p></div><span className="font-mono text-xs text-muted">{percent}%</span></div><div className="mb-6 h-1 bg-line dark:bg-slate-700"><div className="h-1 bg-coral transition-all" style={{ width: `${percent}%` }} /></div><nav aria-label={track.title + ' lessons'}>{track.units.map((unit, unitIndex) => <div key={unit.slug} className="mb-5"><p className="mb-2 font-mono text-[10px] uppercase tracking-[.12em] text-muted">UNIT {String(unitIndex + 1).padStart(2, '0')} / {unit.title}</p><ol className="space-y-1">{unit.lessons.map((lesson, lessonIndex) => { const href = '/tracks/' + track.slug + '/' + unit.slug + '/' + slugify(lesson) + '/'; const current = unit.slug === activeUnit && slugify(lesson) === activeLesson; const done = Boolean(completed[`track:${track.slug}:${unit.slug}:${slugify(lesson)}`]); return <li key={lesson}><Link href={href} aria-current={current ? 'page' : undefined} className={`flex items-start gap-2 px-2 py-2 text-sm transition ${current ? 'bg-ink text-paper dark:bg-paper dark:text-ink' : 'hover:bg-paper dark:hover:bg-slate-800'}`}><span className={`mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border text-[10px] ${done ? 'border-coral bg-coral text-white' : 'border-muted'}`}>{done ? '✓' : ''}</span><span>{String(lessonIndex + 1).padStart(2, '0')} {lesson}</span></Link></li>; })}</ol></div>)}</nav><Link href="/progress/" className="mt-3 block border border-ink px-3 py-3 text-center text-sm font-bold dark:border-slate-200">Open progress board ↗</Link></aside>;
}
