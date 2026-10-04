export type LessonDetail = { intro: string; outcomes: string[]; read: string[]; do: string[]; questions: string[]; project: string; acceptance: string[] };

const courseLens: Record<string, { intro: string; reads: string[]; practices: string[] }> = {
  'web-and-workstation': { intro: 'Work from evidence. Build a useful mental model of the machine, the web, and the tools around your code.', reads: ['The lesson brief and glossary', 'Official documentation for the command or protocol', 'One short technical note from your mentor'], practices: ['Inspect the system before changing it.', 'Make one small, observable change.', 'Record the command, result, and next check.'] },
  'ui-foundations': { intro: 'Start with a person and a task, then turn that understanding into a usable interface.', reads: ['The lesson brief and acceptance checks', 'A reference on semantic HTML and accessible design', 'A short note on responsive layout or user flows'], practices: ['Sketch the state before polishing it.', 'Test the flow with another person.', 'Record one change made after testing.'] },
  'javascript-thinking': { intro: 'Model a small problem with clear data, functions, and state. Let tests expose the edges of your thinking.', reads: ['The lesson brief and examples', 'Language or browser documentation for the feature', 'A testing reference for the behavior under study'], practices: ['Write examples before implementation.', 'Make the smallest working change.', 'Test the ordinary case and one edge case.'] },
  'systems-and-data': { intro: 'Make boundaries and contracts visible. A full-stack feature is a chain of decisions across client, server, and data.', reads: ['The lesson brief and request diagram', 'Official HTTP, database, or deployment documentation', 'A technical note on the failure path'], practices: ['Draw the request before coding.', 'Implement one narrow slice.', 'Test a success and a failure from the boundary.'] },
  'working-with-others': { intro: 'Treat software work as a shared record. Plan small, review carefully, and leave useful context behind.', reads: ['The lesson brief and definition of done', 'A reference on review, refactoring, or technical writing', 'The team channel notes for this sprint'], practices: ['Write the acceptance checks first.', 'Ask for review before the work feels perfect.', 'End with a handoff another learner can use.'] },
};

const subjects: Record<string, string[]> = {
  'web-and-workstation': ['Trace a web request', 'Work in the terminal', 'Make a Git record', 'Debug from evidence'],
  'ui-foundations': ['Define the user task', 'Map the flow', 'Build semantic HTML', 'Make the layout responsive'],
  'javascript-thinking': ['Write functions and tests', 'Connect the DOM', 'Handle async work', 'Check edge cases'],
  'systems-and-data': ['Separate client and server', 'Design an HTTP contract', 'Model and validate data', 'Deploy and recover'],
  'working-with-others': ['Plan a one-week sprint', 'Review a pull request', 'Refactor with evidence', 'Write the handoff'],
};

export function getLesson(course: string, index: number): LessonDetail {
  const lens = courseLens[course] || courseLens['web-and-workstation'];
  const subject = subjects[course]?.[index] || 'Work through the brief';
  const title = subject.toLowerCase();
  return {
    intro: `${lens.intro} This lesson focuses on ${title}.`,
    outcomes: [`Explain ${title} in your own words.`, 'Make a small working example that shows the idea.', 'Leave evidence a mentor can inspect without a meeting.'],
    read: lens.reads,
    do: lens.practices,
    questions: ['What did you observe before you changed anything?', 'What would fail at the edge of this example?', 'What question should go in your mentor review?'],
    project: `Lesson receipt: a small ${title} example, a README, and a short note about what you learned.`,
    acceptance: ['The example runs from the README', 'The repository or gist is linked', 'A test, screenshot, or command proves the result', 'The next question is specific'],
  };
}
