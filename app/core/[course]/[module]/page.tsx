import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CoreSidebar } from '@/components/core-sidebar';
import { CompletionMarker } from '@/components/completion-marker';
import { LessonSubmission } from '@/components/lesson-submission';
import { core } from '@/lib/data';
import { getLesson } from '@/lib/lesson-details';

export function generateStaticParams() {
  return core.flatMap((course) => course.modules.map((_, index) => ({ course: course.slug, module: `brief-${index + 1}` })));
}

export default function ModulePage({ params }: { params: { course: string; module: string } }) {
  const course = core.find((item) => item.slug === params.course);
  const index = Number(params.module.replace('brief-', '')) - 1;
  const module = course?.modules[index];
  if (!course || !module) notFound();
  const lesson = getLesson(course.slug, index);
  const next = course.modules[index + 1];
  return <div className="mx-auto grid w-[min(1240px,calc(100%-32px))] gap-10 py-10 lg:grid-cols-[248px_1fr]">
    <CoreSidebar activeCourse={course.slug} activeModule={index} />
    <article className="min-w-0">
      <Link href={`/core/${course.slug}/`} className="font-mono text-xs text-coral">← {course.title}</Link>
      <p className="eyebrow mt-10 text-coral">Module {String(index + 1).padStart(2, '0')} / one-week sprint</p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-5"><h1 className="max-w-4xl text-5xl font-black leading-[.9] tracking-[-.07em] md:text-7xl">{module}</h1><CompletionMarker id={`lesson:${course.slug}:${index}`} label="lesson" /></div>
      <p className="mt-8 max-w-3xl text-xl leading-8 text-muted">{lesson.intro}</p>
      <div className="mt-12 grid gap-10 xl:grid-cols-[1fr_300px]">
        <div className="space-y-12">
          <section><h2 className="eyebrow text-coral">Lesson overview</h2><div className="mt-5 grid gap-3 sm:grid-cols-3">{lesson.outcomes.map((item, i) => <div key={item} className="border border-line p-4 dark:border-slate-700"><span className="font-mono text-xs text-coral">0{i + 1}</span><p className="mt-5 text-sm leading-6">{item}</p></div>)}</div></section>
          <section><h2 className="eyebrow text-coral">Read and understand</h2><ol className="mt-5 space-y-0 border-t border-line dark:border-slate-700">{lesson.read.map((item, i) => <li key={item} className="flex gap-4 border-b border-line py-4 dark:border-slate-700"><span className="font-mono text-xs text-coral">{String(i + 1).padStart(2, '0')}</span><span className="text-sm leading-6">{item}</span></li>)}</ol></section>
          <section><h2 className="eyebrow text-coral">Do the work</h2><ol className="mt-5 space-y-0 border-t border-line dark:border-slate-700">{lesson.do.map((item, i) => <li key={item} className="flex gap-4 border-b border-line py-4 dark:border-slate-700"><span className="font-mono text-xs text-coral">{String(i + 1).padStart(2, '0')}</span><span className="text-sm leading-6">{item}</span></li>)}</ol></section>
          <section className="border-l-4 border-coral bg-[#e9e2d4] p-6 dark:bg-slate-900"><p className="eyebrow text-coral">Project checkpoint</p><p className="mt-4 text-lg leading-8">{lesson.project}</p></section>
          <section><h2 className="eyebrow text-coral">Questions before review</h2><ul className="mt-5 space-y-3 text-sm leading-6">{lesson.questions.map((item) => <li key={item}>□ {item}</li>)}</ul></section>
          <section><h2 className="eyebrow text-coral">Turn in</h2><LessonSubmission course={course.slug} moduleIndex={index} acceptance={lesson.acceptance} /></section>
        </div>
        <aside className="space-y-5">
          <div className="border border-line bg-panel p-6 dark:border-slate-700 dark:bg-slate-900"><p className="eyebrow text-coral">This week</p><ul className="mt-5 space-y-3 text-sm"><li><b>MON</b> read and plan</li><li><b>TUE</b> build the thin slice</li><li><b>WED</b> test and debug</li><li><b>THU</b> mentor check-in</li><li><b>FRI</b> submit the receipt</li></ul></div>
          <div className="border border-line p-6 dark:border-slate-700"><p className="eyebrow text-coral">Working rule</p><p className="mt-4 text-sm leading-6">If AI helped, keep the prompt, output, edits, and test evidence. You must be able to explain the final code live.</p></div>
          <Link href="/progress/" className="block border border-ink px-4 py-3 text-center text-sm font-bold dark:border-slate-200">Update progress ↗</Link>
        </aside>
      </div>
      <div className="mt-16 flex items-center justify-between border-t border-line pt-6 dark:border-slate-700"><span className="font-mono text-xs text-muted">{course.title}</span>{next ? <Link href={`/core/${course.slug}/brief-${index + 2}/`} className="text-sm font-bold text-coral">Next lesson: {next} →</Link> : <Link href={`/core/${course.slug}/`} className="text-sm font-bold text-coral">Back to course →</Link>}</div>
    </article>
  </div>;
}
