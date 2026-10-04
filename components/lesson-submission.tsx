'use client';

import { FormEvent, useEffect, useState } from 'react';

type Submission = { repo: string; demo: string; note: string; ai: string; submittedAt: string };
type Review = { mentor: string; feedback: string; approved: boolean; reviewedAt: string };
const progressKey = 'sixcode-progress';
const courseOrder = ['web-and-workstation', 'ui-foundations', 'javascript-thinking', 'systems-and-data', 'working-with-others'];

export function LessonSubmission({ course, moduleIndex, acceptance }: { course: string; moduleIndex: number; acceptance: string[] }) {
  const storageKey = `sixcode-submission-${course}-${moduleIndex}`;
  const [form, setForm] = useState<Submission>({ repo: '', demo: '', note: '', ai: '', submittedAt: '' });
  const [review, setReview] = useState<Review>({ mentor: '', feedback: '', approved: false, reviewedAt: '' });
  const [saved, setSaved] = useState(false);
  const [reviewSaved, setReviewSaved] = useState(false);

  useEffect(() => {
    try {
      const previous = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (previous) { setForm(previous); setSaved(true); }
      const previousReview = JSON.parse(localStorage.getItem(`${storageKey}-review`) || 'null');
      if (previousReview) { setReview(previousReview); setReviewSaved(true); }
    } catch { /* An empty form is safe when saved data is malformed. */ }
  }, [storageKey]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = { ...form, submittedAt: new Date().toISOString() };
    localStorage.setItem(storageKey, JSON.stringify(next));
    setForm(next);
    setSaved(true);
  }

  function saveReview() {
    const next = { ...review, reviewedAt: new Date().toISOString() };
    localStorage.setItem(`${storageKey}-review`, JSON.stringify(next));
    const progress = JSON.parse(localStorage.getItem(progressKey) || '[]');
    const nextProgress = Array.isArray(progress) ? progress.map((item: unknown) => item === true || item === 'true') : [];
    while (nextProgress.length < 20) nextProgress.push(false);
    const offset = courseOrder.indexOf(course) * 4;
    nextProgress[offset + moduleIndex] = next.approved;
    localStorage.setItem(progressKey, JSON.stringify(nextProgress));
    setReview(next);
    setReviewSaved(true);
  }

  return <form onSubmit={submit} className="mt-6 space-y-6 border border-line bg-panel p-6 dark:border-slate-700 dark:bg-slate-900">
    <div><p className="eyebrow text-coral">Submission receipt</p><p className="mt-3 text-sm leading-6 text-muted">Paste the evidence a mentor should review. Save once the acceptance checks are true.</p></div>
    <div className="grid gap-5 md:grid-cols-2">
      <label className="text-sm font-bold">Repository or gist URL<input required type="url" value={form.repo} onChange={(event) => setForm({ ...form, repo: event.target.value })} placeholder="https://github.com/..." className="mt-2 w-full border border-line bg-transparent p-3 text-sm font-normal dark:border-slate-700" /></label>
      <label className="text-sm font-bold">Live demo URL <span className="font-normal text-muted">optional</span><input type="url" value={form.demo} onChange={(event) => setForm({ ...form, demo: event.target.value })} placeholder="https://..." className="mt-2 w-full border border-line bg-transparent p-3 text-sm font-normal dark:border-slate-700" /></label>
    </div>
    <label className="block text-sm font-bold">Review note<textarea required value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} placeholder="What changed? What did you test? What still needs attention?" className="mt-2 min-h-28 w-full border border-line bg-transparent p-3 text-sm font-normal dark:border-slate-700" /></label>
    <label className="block text-sm font-bold">AI-use record <span className="font-normal text-muted">write “None” when no AI was used</span><textarea required value={form.ai} onChange={(event) => setForm({ ...form, ai: event.target.value })} placeholder="Prompt, output kept, edits made, and test evidence..." className="mt-2 min-h-24 w-full border border-line bg-transparent p-3 text-sm font-normal dark:border-slate-700" /></label>
    <details><summary className="cursor-pointer text-sm font-bold">Acceptance checks</summary><ul className="mt-4 space-y-2 text-sm leading-6">{acceptance.map((item) => <li key={item}>□ {item}</li>)}</ul></details>
    <div className="flex flex-wrap items-center gap-4"><button type="submit" className="bg-coral px-5 py-3 text-sm font-bold text-white">{saved ? 'Update submission' : 'Submit for review'} ↗</button>{saved && <span className="text-sm text-muted">Evidence saved{form.submittedAt ? ` on ${new Date(form.submittedAt).toLocaleDateString()}` : ''}. Waiting for mentor review.</span>}</div>
    <div className="border-t border-line pt-6 dark:border-slate-700"><p className="eyebrow text-coral">Mentor review</p><p className="mt-3 text-sm leading-6 text-muted">The mentor records the decision here. Approval moves this lesson to complete on the learner’s progress board.</p><div className="mt-5 grid gap-5 md:grid-cols-2"><label className="text-sm font-bold">Reviewer name<input required value={review.mentor} onChange={(event) => setReview({ ...review, mentor: event.target.value })} placeholder="Name" className="mt-2 w-full border border-line bg-transparent p-3 text-sm font-normal dark:border-slate-700" /></label><label className="text-sm font-bold">Decision<select value={review.approved ? 'approved' : 'changes'} onChange={(event) => setReview({ ...review, approved: event.target.value === 'approved' })} className="mt-2 w-full border border-line bg-transparent p-3 text-sm font-normal dark:border-slate-700"><option value="changes">Changes requested</option><option value="approved">Mark lesson complete</option></select></label></div><label className="mt-5 block text-sm font-bold">Feedback<textarea required value={review.feedback} onChange={(event) => setReview({ ...review, feedback: event.target.value })} placeholder="What is clear? What must change before approval?" className="mt-2 min-h-24 w-full border border-line bg-transparent p-3 text-sm font-normal dark:border-slate-700" /></label><div className="mt-5 flex flex-wrap items-center gap-4"><button type="button" onClick={saveReview} className="border border-ink px-5 py-3 text-sm font-bold dark:border-slate-200">{review.approved ? 'Save approval' : 'Save review'} ↗</button>{reviewSaved && <span className={`text-sm font-bold ${review.approved ? 'text-coral' : 'text-muted'}`}>{review.approved ? 'Lesson marked complete.' : 'Review saved. Changes requested.'}</span>}</div></div>
  </form>;
}
