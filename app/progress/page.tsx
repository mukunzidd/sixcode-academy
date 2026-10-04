'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { core, tracks } from '@/lib/data';
import { MentorRoster } from '@/components/mentor-roster';

type User = { role: 'learner' | 'mentor'; name: string };

export default function ProgressPage() {
  const items = [...core.flatMap((course) => course.modules.map((module) => `${course.title}: ${module}`)), ...tracks.map((track) => `${track.title}: personal capstone`), 'Team product: discovery', 'Team product: Figma and technical docs', 'Team product: build and review', 'Team product: demo and handoff'];
  const [done, setDone] = useState<boolean[]>([]);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [openNote, setOpenNote] = useState<number | null>(null);
  const [savedNote, setSavedNote] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    try {
      const savedProgress = JSON.parse(localStorage.getItem('sixcode-progress') || '[]');
      setDone(Array.isArray(savedProgress) ? savedProgress.map((item: unknown) => item === true || item === 'true') : []);
      setNotes(JSON.parse(localStorage.getItem('sixcode-self-review') || '{}'));
      setUser(JSON.parse(localStorage.getItem('sixcode-user') || 'null'));
    } catch { setDone([]); setNotes({}); }
  }, []);
  function toggle(index: number) { if (user?.role !== 'mentor') return; const next = [...items].map((_, i) => Boolean(done[i])); next[index] = !next[index]; setDone(next); localStorage.setItem('sixcode-progress', JSON.stringify(next)); window.dispatchEvent(new Event('sixcode-progress-updated')); }
  function saveNote(index: number) { localStorage.setItem('sixcode-self-review', JSON.stringify(notes)); setSavedNote(index); window.setTimeout(() => setSavedNote(null), 1800); }
  const count = done.filter(Boolean).length;
  return <div className="mx-auto w-[min(1000px,calc(100%-32px))] py-16"><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow text-coral">Progress board</p><h1 className="mt-4 text-6xl font-black leading-[.86] tracking-[-.08em] md:text-8xl">Move forward<br /><span className="text-coral">with evidence.</span></h1></div><div className="border border-line px-4 py-3 text-right text-xs dark:border-slate-700"><span className="font-mono uppercase text-coral">{user ? user.role : 'Demo mode'}</span><br />{user?.name || 'Log in to identify your role'}</div></div><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">Learners submit work and write self-reviews. Mentors inspect the evidence and mark lessons, steps, units, and projects complete.</p>{user?.role === 'mentor' && <MentorRoster />}{user?.role === 'mentor' ? <div className="mt-6 border-l-4 border-coral bg-[#e9e2d4] p-5 text-sm leading-6 dark:bg-slate-900">Mentor mode is active. Use the checkboxes to record completion for the learner you are reviewing.</div> : <div className="mt-6 border-l-4 border-line bg-panel p-5 text-sm leading-6 dark:border-slate-700 dark:bg-slate-900">Completion is mentor-approved. Your evidence and self-review stay visible while you wait for review.</div>}<div className="mt-10 border border-line bg-panel p-6 dark:border-slate-700 dark:bg-slate-900"><div className="flex items-baseline justify-between"><span className="font-mono text-xs text-coral">{count}/{items.length} complete</span><b className="text-3xl">{Math.round((count / items.length) * 100)}%</b></div><div className="mt-5 h-3 bg-slate-200 dark:bg-slate-700"><span className="block h-full bg-coral transition-all" style={{ width: `${(count / items.length) * 100}%` }} /></div></div><div className="mt-8 space-y-2">{items.map((item, index) => <div key={item} className="border-b border-line py-4 dark:border-slate-700"><label className="flex gap-4"><input type="checkbox" checked={Boolean(done[index])} disabled={user?.role !== 'mentor'} onChange={() => toggle(index)} className="mt-1 accent-coral" /><span className={`text-sm ${done[index] ? 'text-muted line-through' : ''}`}>{item}</span></label><div className="ml-8 mt-3 flex flex-wrap items-center gap-4"><button type="button" onClick={() => setOpenNote(openNote === index ? null : index)} className="font-mono text-[11px] uppercase tracking-[.08em] text-coral">{openNote === index ? 'Close self-review' : notes[index] ? 'Open self-review' : '+ Add self-review'}</button>{notes[index] && <span className="text-xs text-muted">Note saved</span>}{savedNote === index && <span className="text-xs font-bold text-coral">Saved</span>}</div>{openNote === index && <div className="ml-8 mt-4 max-w-2xl"><textarea value={notes[index] || ''} onChange={(event) => setNotes({ ...notes, [index]: event.target.value })} placeholder="What did you learn? What evidence do you have? What will you do next?" className="min-h-28 w-full border border-line bg-transparent p-4 text-sm dark:border-slate-700" /><button type="button" onClick={() => saveNote(index)} className="mt-3 border border-ink px-4 py-2 text-sm font-bold dark:border-slate-200">Submit self-review ↗</button></div>}</div>)}</div><div className="mt-10 flex flex-wrap gap-4"><Link href="/core/" className="border border-ink px-4 py-3 text-sm font-bold dark:border-slate-200">Open core</Link><Link href="/login/" className="text-sm font-bold text-coral">Switch demo account →</Link></div></div>;
}
