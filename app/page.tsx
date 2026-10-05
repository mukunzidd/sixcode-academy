import Link from 'next/link';

export default function Home() {
  return <div className="mx-auto w-[min(1160px,calc(100%-32px))] py-20 md:py-28">
    <div className="grid gap-12 lg:grid-cols-[1.18fr_.82fr] lg:items-center">
      <section>
        <p className="font-mono text-xs uppercase tracking-[.14em] text-coral">Online / mentor-led / SixCode Africa</p>
        <h1 className="mt-5 max-w-4xl text-6xl font-black leading-[.86] tracking-[-.08em] md:text-8xl">Learn the tools.<br /><span className="text-coral">Ship the work.</span></h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">SixCode Academy takes you through 12 weeks of shared foundations, 8 weeks of track work, and a 4-week team product. You work in weekly sprints, meet with a mentor, and submit a receipt for each project.</p>
        <div className="mt-8 flex flex-wrap gap-4"><Link href="/core/" className="bg-ink px-5 py-4 font-bold text-paper shadow-offset dark:bg-slate-200 dark:text-ink">See the core</Link><Link href="/method/" className="border border-ink px-5 py-4 font-bold dark:border-slate-200">How the program works</Link></div>
      </section>
      <aside className="bg-ink p-7 text-paper shadow-[12px_12px_0_#a2d5c6] dark:bg-slate-950 dark:text-[#f4efe5]">
        <p className="font-mono text-xs uppercase tracking-[.12em] text-coral">Program at a glance</p>
        <div className="mt-10 grid grid-cols-2 gap-6"><div><b className="block text-4xl">30–50</b><span className="font-mono text-xs text-slate-300">learners</span></div><div><b className="block text-4xl">1:5</b><span className="font-mono text-xs text-slate-300">mentor ratio</span></div><div><b className="block text-4xl">12</b><span className="font-mono text-xs text-slate-300">core weeks</span></div><div><b className="block text-4xl">4</b><span className="font-mono text-xs text-slate-300">team weeks</span></div></div>
        <p className="mt-10 border-t border-slate-600 pt-5 text-2xl font-bold leading-tight">You choose the next task. Your mentor reviews the work and tells you what needs to change.</p>
      </aside>
    </div>
    <div className="mt-24 grid gap-px border border-line bg-line md:grid-cols-3 dark:border-slate-700 dark:bg-slate-700">
      <div className="bg-paper p-6 dark:bg-slate-900"><span className="font-mono text-coral">01</span><h2 className="mt-8 font-bold">Submit a receipt</h2><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Link the repository or gist, explain what changed, and show what you tested.</p></div>
      <div className="bg-paper p-6 dark:bg-slate-900"><span className="font-mono text-coral">02</span><h2 className="mt-8 font-bold">Keep the AI record</h2><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">If AI helped, attach the prompt, the output you kept, the edits you made, and the tests that passed.</p></div>
      <div className="bg-paper p-6 dark:bg-slate-900"><span className="font-mono text-coral">03</span><h2 className="mt-8 font-bold">Ship with a team</h2><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Five learners agree on scope, design the flow, review changes, and demo one small product.</p></div>
    </div>
  </div>;
}
