'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type User = { role: 'learner' | 'mentor'; name: string; email: string };

export function AccountMenu() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => { try { setUser(JSON.parse(localStorage.getItem('sixcode-user') || 'null')); } catch { setUser(null); } }, []);
  if (!user) return <Link href="/login/" className="hidden border border-coral px-4 py-3 text-sm font-bold text-coral md:block">Log in</Link>;
  return <button onClick={() => { localStorage.removeItem('sixcode-user'); setUser(null); }} className="hidden border border-line px-4 py-3 text-left text-xs dark:border-slate-700 md:block"><span className="font-bold">{user.name}</span><br /><span className="font-mono uppercase text-coral">{user.role} / log out</span></button>;
}
