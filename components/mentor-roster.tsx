'use client';

import { useEffect, useState } from 'react';

type Assignment = 'core' | 'full-stack-javascript' | 'mobile' | 'devops';
type Mentee = { id: string; name: string; track: string; progress: number; focus: string; review: string; assignment: Assignment };

const initialMentees: Mentee[] = [
  { id: 'amina', name: 'Amina N.', track: 'Full-Stack JavaScript + TypeScript', progress: 42, focus: 'React and TypeScript', review: 'Typed form submission', assignment: 'full-stack-javascript' },
  { id: 'brian', name: 'Brian K.', track: 'DevOps and Cloud Operations', progress: 31, focus: 'CI/CD and release safety', review: 'Pipeline rollback note', assignment: 'devops' },
  { id: 'claire', name: 'Claire U.', track: 'Mobile with React Native', progress: 58, focus: 'Forms, storage, and APIs', review: 'Offline sync evidence', assignment: 'mobile' },
  { id: 'david', name: 'David M.', track: 'Core', progress: 67, focus: 'Systems and data', review: 'Authentication concepts', assignment: 'core' },
  { id: 'esther', name: 'Esther A.', track: 'Core', progress: 24, focus: 'UI and UX foundations', review: 'Keyboard flow evidence', assignment: 'core' },
];

const labels: Record<Assignment, string> = { core: 'Core', 'full-stack-javascript': 'Full-Stack JavaScript + TypeScript', mobile: 'Mobile with React Native', devops: 'DevOps and Cloud Operations' };

export function MentorRoster() {
  const [mentees, setMentees] = useState(initialMentees);
  const [selectedId, setSelectedId] = useState(initialMentees[0].id);
  const [saved, setSaved] = useState(false);
  const selected = mentees.find((mentee) => mentee.id === selectedId) || mentees[0];
  useEffect(() => { try { const stored = JSON.parse(localStorage.getItem('sixcode-assignments') || 'null'); if (Array.isArray(stored)) setMentees(stored); } catch { /* Demo roster stays available. */ } }, []);
  function assign(assignment: Assignment) { const next = mentees.map((mentee) => mentee.id === selected.id ? { ...mentee, assignment, track: labels[assignment] } : mentee); setMentees(next); localStorage.setItem('sixcode-assignments', JSON.stringify(next)); setSaved(true); window.setTimeout(() => setSaved(false), 1800); }
  return <section className="mt-10 border border-line bg-panel p-6 dark:border-slate-700 dark:bg-slate-900"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-coral">Mentor roster</p><h2 className="mt-3 text-2xl font-black">Assigned learners</h2></div><span className="font-mono text-xs text-muted">1 mentor / 5 learners</span></div><div className="mt-6 grid gap-2 md:grid-cols-5">{mentees.map((mentee) => <button key={mentee.id} type="button" onClick={() => setSelectedId(mentee.id)} className={`border p-3 text-left text-sm ${selected.id === mentee.id ? 'border-coral bg-[#e9e2d4] dark:bg-slate-800' : 'border-line dark:border-slate-700'}`}><span className="block font-bold">{mentee.name}</span><span className="mt-1 block text-xs text-muted">{mentee.progress}% complete</span></button>)}</div><div className="mt-6 grid gap-6 border-t border-line pt-6 dark:border-slate-700 md:grid-cols-[1fr_1fr]"><div><p className="eyebrow text-coral">Selected learner</p><p className="mt-3 text-xl font-bold">{selected.name}</p><p className="mt-1 text-sm text-muted">{selected.track}</p><label className="mt-5 block text-sm font-bold">Place in<select value={selected.assignment} onChange={(event) => assign(event.target.value as Assignment)} className="mt-2 w-full border border-line bg-transparent p-3 text-sm font-normal dark:border-slate-700"><option value="core">Core</option><option value="full-stack-javascript">Full-Stack JavaScript + TypeScript</option><option value="mobile">Mobile with React Native</option><option value="devops">DevOps and Cloud Operations</option></select></label>{saved && <p className="mt-3 text-xs font-bold text-coral">Assignment saved.</p>}</div><div><p className="eyebrow text-coral">Next review</p><p className="mt-3 text-lg font-bold">{selected.review}</p><p className="mt-2 text-sm leading-6 text-muted">Current focus: {selected.focus}. Trainees can submit lesson work during the track. Review evidence as it arrives, then mark the lesson or step complete.</p></div></div></section>;
}
