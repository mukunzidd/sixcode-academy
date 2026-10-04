'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const accounts = { learner: { name: 'Amina N.', email: 'amina@sixcode.africa', password: 'learn-2026' }, mentor: { name: 'Daniel M.', email: 'daniel@sixcode.africa', password: 'mentor-2026' } };

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'learner' | 'mentor'>('learner');
  const [email, setEmail] = useState(accounts.learner.email);
  const [password, setPassword] = useState(accounts.learner.password);
  const [error, setError] = useState('');
  function choose(next: 'learner' | 'mentor') { setRole(next); setEmail(accounts[next].email); setPassword(accounts[next].password); setError(''); }
  function submit(event: React.FormEvent) { event.preventDefault(); const account = accounts[role]; if (email !== account.email || password !== account.password) { setError('Use the demo credentials shown below.'); return; } localStorage.setItem('sixcode-user', JSON.stringify({ role, name: account.name, email: account.email })); router.push(role === 'mentor' ? '/progress/?view=mentor' : '/progress/'); }
  return <div className="mx-auto grid w-[min(1000px,calc(100%-32px))] gap-12 py-16 lg:grid-cols-[1fr_360px]"><div><p className="eyebrow text-coral">SixCode account / demo</p><h1 className="mt-4 text-6xl font-black leading-[.88] tracking-[-.07em] md:text-8xl">Come to the<br /><span className="text-coral">workboard.</span></h1><p className="mt-8 max-w-xl text-lg leading-8 text-muted">Use a learner account to submit work and own your progress. Use a mentor account to review receipts and mark lessons complete.</p></div><form onSubmit={submit} className="border border-line bg-panel p-6 dark:border-slate-700 dark:bg-slate-900"><p className="eyebrow text-coral">Choose a demo account</p><div className="mt-5 grid grid-cols-2 gap-2"><button type="button" onClick={() => choose('learner')} className={`border p-3 text-sm font-bold ${role === 'learner' ? 'border-coral text-coral' : 'border-line dark:border-slate-700'}`}>Learner</button><button type="button" onClick={() => choose('mentor')} className={`border p-3 text-sm font-bold ${role === 'mentor' ? 'border-coral text-coral' : 'border-line dark:border-slate-700'}`}>Mentor</button></div><label className="mt-6 block text-sm font-bold">Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full border border-line bg-transparent p-3 font-normal dark:border-slate-700" /></label><label className="mt-5 block text-sm font-bold">Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full border border-line bg-transparent p-3 font-normal dark:border-slate-700" /></label><button type="submit" className="mt-6 w-full bg-coral px-5 py-3 text-sm font-bold text-white">Log in ↗</button>{error && <p className="mt-4 text-sm text-coral">{error}</p>}<div className="mt-6 border-t border-line pt-5 text-xs leading-6 text-muted dark:border-slate-700"><p><b>Learner</b> {accounts.learner.email} / {accounts.learner.password}</p><p><b>Mentor</b> {accounts.mentor.email} / {accounts.mentor.password}</p></div></form></div>;
}
