import Link from 'next/link';
import { core, practice } from '@/lib/data';

export default function CorePage() {
  return <div className="mx-auto w-[min(1160px,calc(100%-32px))] py-16">
    <p className="font-mono text-xs uppercase tracking-[.14em] text-coral">The core / 12 weeks</p>
    <h1 className="mt-4 max-w-5xl text-6xl font-black leading-[.86] tracking-[-.08em] md:text-8xl">Build the base<br /><span className="text-coral">before you specialize.</span></h1>
    <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">Every learner follows the same 12-week route. You work through a brief, practice the skill, check in with your mentor, and submit the result at the end of the week.</p>
    <div className="mt-14 space-y-4">{core.map((course) => <article key={course.slug} className="border border-line bg-panel p-6 dark:border-slate-700 dark:bg-slate-900"><div className="flex flex-wrap items-baseline justify-between gap-3"><span className="font-mono text-xs text-coral">COURSE {course.number} / {course.weeks}</span><span className="font-mono text-xs text-slate-500">PROJECT: {course.project}</span></div><h2 className="mt-4 text-3xl font-black tracking-tight">{course.title}</h2><p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">{course.summary}</p><div className="mt-6 grid gap-6 border-t border-line pt-5 dark:border-slate-700 md:grid-cols-[1fr_auto]"><ul className="grid gap-2 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-2">{course.modules.map((module) => <li key={module}>↳ {module}</li>)}</ul><Link href={`/core/${course.slug}/`} className="self-start border border-ink px-4 py-3 text-sm font-bold hover:bg-ink hover:text-paper dark:border-slate-200">View course</Link></div></article>)}</div>
    <div className="mt-16 grid gap-px border border-line bg-line md:grid-cols-2 dark:border-slate-700 dark:bg-slate-700"><section className="bg-paper p-7 dark:bg-slate-900"><p className="font-mono text-xs text-coral">SKILLS USED ACROSS THE PROGRAM</p><ul className="mt-6 space-y-3 text-sm">{practice.technical.map((item) => <li key={item}>□ {item}</li>)}</ul></section><section className="bg-paper p-7 dark:bg-slate-900"><p className="font-mono text-xs text-coral">WORK HABITS WE PRACTICE</p><ul className="mt-6 space-y-3 text-sm">{practice.professional.map((item) => <li key={item}>□ {item}</li>)}</ul></section></div>
  </div>;
}
