export default function MethodPage() {
  return <div className="mx-auto w-[min(1060px,calc(100%-32px))] py-16">
    <p className="font-mono text-xs uppercase tracking-[.14em] text-coral">How the program works</p>
    <h1 className="mt-4 max-w-5xl text-6xl font-black leading-[.86] tracking-[-.08em] md:text-8xl">Show your work.<br /><span className="text-coral">Review it together.</span></h1>
    <div className="mt-14 grid gap-8 lg:grid-cols-2">
      <section className="border border-line bg-panel p-7 dark:border-slate-700 dark:bg-slate-900"><p className="font-mono text-xs text-coral">USING AI</p><h2 className="mt-10 text-3xl font-black">Keep a record of what the tool gave you and what you changed.</h2><ul className="mt-7 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300"><li>□ Write the problem before you ask for help.</li><li>□ Save the prompt and the useful output with your project notes.</li><li>□ Read and edit every line you keep.</li><li>□ Run the tests yourself and record the result.</li><li>□ Say where AI helped in your submission.</li><li>□ Be ready to explain the final code in a live review.</li></ul></section>
      <section className="border border-line bg-panel p-7 dark:border-slate-700 dark:bg-slate-900"><p className="font-mono text-xs text-coral">FOUR-WEEK TEAM PRODUCT</p><h2 className="mt-10 text-3xl font-black">Five learners ship one product in four weekly sprints.</h2><ol className="mt-7 space-y-4 text-sm"><li><b>01 / Choose</b><br />Agree on the problem, user, scope, and success checks.</li><li><b>02 / Design</b><br />Make the Figma flow, data model, architecture note, and delivery plan.</li><li><b>03 / Build</b><br />Implement a thin slice, review the changes, test it, and show the result.</li><li><b>04 / Release</b><br />Fix the rough edges, write the handoff notes, and present the product.</li></ol></section>
    </div>
  </div>;
}
