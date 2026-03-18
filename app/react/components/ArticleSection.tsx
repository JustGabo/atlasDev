import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import CodeSnippet from "@/components/CodeSnippet";
import { useEffect, useState } from "react";

const customStyle = {
  // scrollbarWidth: "thin",
  lineHeight: "1.5",
  fontSize: "0.7rem",
  backgroundColor: "#1E1E1E",
  height: "92%",
  scrollbarColor: "#404040 #1E1E1E",
  scrollBehavior: "smooth",
  marginTop: 0,
};

export default function ArticleSection() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const badCode = `const Child = React.memo(({ config }) => {
  return <div>{config.title}</div>;
});

function Parent() {
  // This object is recreated on every render.
  // React.memo does a shallow comparison and sees
  // a new reference each time — so it re-renders anyway.
  return <Child config={{ title: 'Hello' }} />;
}`;

  const goodCodeUseMemo = `import { useMemo } from 'react';

function Parent() {
  const config = useMemo(() => ({ title: 'Hello' }), []);
  // Now the reference is stable — React.memo works as expected.
  return <Child config={config} />;
}`;

  const goodCodeOutside =
    `// If the value never changes, define it outside the component
// so it's never recreated.
const config = { title: 'Hello' };

function Parent() {
  return <Child config={config} />;
}`;

  const fnProblem = `const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click me</button>;
});

function Parent() {
  // A new function reference is created on every render.
  // React.memo can't help here.
  return <Child onClick={() => console.log('clicked')} />;
}`;

  const fnSolution = `import { useCallback } from 'react';

function Parent() {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);
  // Stable reference — React.memo prevents unnecessary re-renders.
  return <Child onClick={handleClick} />;
}`;

  const comparatorExample = `const Child = React.memo(
  ({ user }) => {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render).
    // Return false if props changed (allow re-render).
    return prevProps.user.id === nextProps.user.id;
  }
);`;

  const strictModeExample = `import { StrictMode } from 'react';

<StrictMode>
  <App />
</StrictMode>

useEffect(() => {
  // In Strict Mode (dev only), this runs twice:
  // mount → unmount → mount
  // This is intentional — React is checking your cleanup is correct.
  const sub = subscribe();
  return () => sub.unsubscribe();
}, []);
`;

  const strictModeEffect = `useEffect(() => {
  // In Strict Mode (dev only), this runs twice:
  // mount → unmount → mount
  // This is intentional — React is checking your cleanup is correct.
  const sub = subscribe();
  return () => sub.unsubscribe();
}, []);`;

  const useEffectExample = `useEffect(() => {
  // Runs after paint — the browser has already updated the screen.
  // Good for: data fetching, subscriptions, logging.
  document.title = 'Hello';
}, []);
`;

  const useLayoutEffectExample = `useLayoutEffect(() => {
  // Runs synchronously after DOM mutations, before paint.
  // Good for: reading layout, measuring DOM nodes, avoiding flicker.
  const rect = ref.current.getBoundingClientRect();
  setHeight(rect.height);
}, []);`;

  const batchingBad =
    `// Before React 18 — and still a pitfall with async/await:
async function handleClick() {
  setCount(c => c + 1);
  await fetch('/api/data'); // <-- await breaks batching here
  setData(result);          // This triggers a separate render
}`;

  const batchingGood = `async function handleClick() {
  // By resolving the promise before updating state,
  // we avoid splitting the updates across different microtasks.
  const result = await fetch('/api/data').then(res => res.json());

  // Both state updates now happen after the await
  // and within the same execution context.
  // React can batch them together into a single render.
  setCount(c => c + 1);
  setData(result);
}`;

  const derivedStateBad = `function UserCard({ userId }) {
  const [id, setId] = useState(userId);

  useEffect(() => {
    setId(userId); // Redundant — causes an extra render cycle.
  }, [userId]);

  return <div>{id}</div>;
}`;

  const derivedStateGood = `// Just use the prop directly — no state needed.
function UserCard({ userId }) {
  return <div>{userId}</div>;
}

// If you need to transform it, derive during render:
function UserCard({ userId }) {
  const displayId = userId.toUpperCase();
  return <div>{displayId}</div>;
}

// Only lift to state if the value truly diverges from the prop over time.`;

  const abortBad = `useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(data => setData(data)); // Component may have unmounted!
}, [id]);`;

  const abortGood = `useEffect(() => {
  const controller = new AbortController();

  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name === 'AbortError') return; // Ignore — intentional cancel
      throw err;
    });

  return () => controller.abort(); // Cleanup on unmount or re-run
}, [id]);`;

  const controlledBad = `// Uncontrolled — React doesn't own the value.
<input defaultValue={name} />`;

  const controlledGood = `// Controlled — React owns the value.
const [name, setName] = useState('');

<input
  value={name}
  onChange={e => setName(e.target.value)}
/>`;

  const controlledPitfall =
    `// Pitfall: switching between controlled and uncontrolled.
// If value is undefined, the input is uncontrolled.
// If value becomes a string, React warns about the switch.
const [name, setName] = useState(undefined); // BAD
const [name, setName] = useState('');         // GOOD — always a string`;

  const reducerBasic =
    `const [state, dispatch] = useReducer(reducer, initialState);

// The reducer receives the current state and an action.
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      return state;
  }
}`;

  const reducerLazy =
    `// Lazy initialization — the third argument is an init function.
// Useful when computing initial state is expensive.
const [state, dispatch] = useReducer(reducer, props.id, fetchInitialData);
// fetchInitialData(props.id) is called once on mount.`;

  const reducerDispatch =
    `// dispatch is stable — it never changes between renders.
// You can safely omit it from useEffect/useCallback dependency arrays.
useEffect(() => {
  dispatch({ type: 'reset' });
}, []); // No need to include dispatch`;

  const useMemoFacts = `// useMemo runs during render — not after.
// Do NOT use it for side effects.
const value = useMemo(() => expensiveComputation(a, b), [a, b]);

// useMemo with no deps runs once — same as defining outside the component,
// but useful when the value depends on props/context.
const schema = useMemo(() => buildSchema(), []);`;

  const useCallbackFacts =
    `// useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).
// It's just syntactic sugar for memoizing functions.

// Both of these are identical:
const fn1 = useCallback(() => doThing(a), [a]);
const fn2 = useMemo(() => () => doThing(a), [a]);

// Reminder: memoization has a cost. Don't add it everywhere —
// only when you have a measurable performance problem.`;

  const useTransitionExample = `import { useTransition, useState } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    setQuery(e.target.value); // Urgent — update input immediately
    startTransition(() => {
      setResults(search(e.target.value)); // Non-urgent — can be interrupted
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending ? <p>Loading...</p> : <Results data={results} />}
    </>
  );
}`;

  const suspenseLazy = `import { Suspense, lazy } from 'react';

// The component is loaded only when it's first rendered.
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<p>Loading chart...</p>}>
      <HeavyChart />
    </Suspense>
  );
}`;

  const suspenseData = `// Suspense also works with data fetching in React 18+,
// when used with a Suspense-compatible data source 
// (e.g. use(), SWR, React Query).
import { use } from 'react';

function UserProfile({ userPromise }) {
  const user = use(userPromise); // Suspends until the promise resolves
  return <p>{user.name}</p>;
}`;

  const useFormStateExample = `'use client';
import { useFormState } from 'react-dom';

async function submitAction(prevState, formData) {
  const name = formData.get('name');
  if (!name) return { error: 'Name is required' };
  await saveToDb(name);
  return { success: true };
}

function MyForm() {
  const [state, formAction] = useFormState(submitAction, {});

  return (
    <form action={formAction}>
      <input name='name' />
      {state.error && <p>{state.error}</p>}
      <button type='submit'>Save</button>
    </form>
  );
}`;

  const useOptimisticExample = `'use client';
import { useOptimistic } from 'react';

function MessageList({ messages, sendMessage }) {
  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (state, newMessage) => [...state, { text: newMessage, pending: true }]
  );

  async function handleSubmit(text) {
    addOptimistic(text);  // Immediately show the message
    await sendMessage(text); // Actual server call
  }

  return (
    <ul>
      {optimisticMessages.map((m, i) => (
        <li key={i} style={{ opacity: m.pending ? 0.5 : 1 }}>{m.text}</li>
      ))}
    </ul>
  );
}`;

  return (
    <>
      {show && (
        <article className="">
          <section id="memo-objects" className="">
            <article className="flex">
              <div className="w-[50%] pr-14 pb-8 pt-6">
                <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-3">
                  <code className="font-mono text-sm bg-muted text-neutral-500 px-1.5 py-0.5">
                    React.memo
                  </code>{" "}
                  and Object Props
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  <code className="font-mono tracking-wider text-xs bg-amber-100 rounded-sm text-amber-500 px-1.5 font-medium py-0.5 ">
                    React.memo
                  </code>{" "}
                  does a shallow comparison of props to decide whether to
                  re-render a component. This works fine for primitive values —
                  strings, numbers, booleans. But it breaks down silently when
                  you pass an <strong>object</strong> or a{" "}
                  <strong>function</strong> as a prop.
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                  Every time a component renders, any object literal written
                  inline is a <em>new reference</em>{" "}
                  in memory. Shallow comparison checks references, not deep
                  equality — so{" "}
                  <code className="font-mono tracking-wider text-xs bg-amber-100 rounded-sm text-amber-500 px-1.5 font-medium py-0.5 ">
                    React.memo
                  </code>{" "}
                  sees a "changed" prop and re-renders anyway, defeating its
                  purpose entirely.
                </p>
                {
                  /* <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
              The problem
            </p> */
                }
              </div>
              <CodeSnippet
                language="jsx"
                className="pt-0! pb-5"
                codeString={badCode}
              />
            </article>
          </section>

          {/* <div className="border-t border-border mb-14" /> */}

          <section id="memo-functions" className="">
            <article className="flex">
              <div className="w-[50%] pt-12 pr-14">
                <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-3">
                  <code className="font-mono text-sm bg-muted text-neutral-500 px-1.5 py-0.5 ">
                    React.memo
                  </code>{" "}
                  and Function Props
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  The same issue applies to functions. An arrow function written
                  inline creates a new reference on every render. Passing it as
                  a prop to a memoized child means that child will always
                  re-render.
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  If you pass that function as a prop to a child component
                  wrapped with{"  "}
                  <span className="font-mono tracking-wider text-xs bg-amber-100 rounded-sm text-amber-500 px-1.5 font-medium py-0.5 ">
                    React.memo
                  </span>{" "}
                  React will detect that the prop reference changed and will
                  re-render the child, even if the logic of the function is
                  exactly the same. This is why we often use{" "}
                  <code className="font-mono tracking-wider text-xs bg-purple-100 rounded-sm text-purple-500 px-1.5 font-medium py-0.5">
                    useCallback
                  </code>{" "}
                  to stabilize the function reference, ensuring the function
                  only changes when its dependencies change, allowing React.memo
                  to properly prevent unnecessary re-renders.
                </p>
              </div>
              <CodeSnippet
                language="jsx"
                className="pb-5"
                codeString={fnProblem}
              />
            </article>
          </section>

          {/* <div className="border-t border-border mb-14" /> */}

          <section id="memo-comparators" className="">
            <article className="flex">
              <div className="w-[50%] pt-12 pr-14">
                <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-3">
                  Custom Comparators in{" "}
                  <code className="font-mono text-sm bg-muted text-neutral-500 px-1.5 py-0.5 ">
                    React.memo
                  </code>
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  <code className="font-mono tracking-wider text-xs bg-amber-100 rounded-sm text-amber-500 px-1.5 font-medium py-0.5 ">
                    React.memo
                  </code>{" "}
                  accepts a second argument: a comparison function. It receives
                  the previous and next props, and lets you decide whether the
                  component should re-render. Return{" "}
                  <code className="font-mono text-xs bg-muted text-neutral-500 px-1 py-0.5 ">
                    true
                  </code>{" "}
                  to skip re-render (props are equal),{" "}
                  <code className="font-mono text-xs bg-muted text-neutral-500 px-1 py-0.5 ">
                    false
                  </code>{" "}
                  to allow it.
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  This is useful when you want to do a partial or semantic
                  comparison — for example, comparing only the{" "}
                  <code className="font-mono text-xs bg-muted text-neutral-500 px-1 py-0.5 ">
                    id
                  </code>{" "}
                  of a user object rather than the whole object.
                </p>
              </div>
              <CodeSnippet language="jsx" codeString={comparatorExample} />
              {/* <pre className="bg-muted text-neutral-500 text-xs font-mono p-4  border border-border overflow-x-auto"><code>{comparatorExample}</code></pre> */}
            </article>
          </section>

          {/* <div className="border-t border-border mb-14" /> */}

          <section id="strict-mode" className="mb-">
            <article className="flex">
              <div className="w-[50%] pt-12 pr-16">
                <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-3">
                  React Strict Mode
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-medium tracking-wider py-0.5 ">
                    StrictMode
                  </code>{" "}
                  is a development-only tool. It doesn't render any visible UI,
                  but it activates extra checks and warnings for its
                  descendants.
                </p>
                {/* <pre className="bg-muted text-neutral-500 text-xs font-mono p-4  border border-border overflow-x-auto mb-6"><code>{strictModeExample}</code></pre> */}
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  One behavior that catches people off guard: in Strict Mode,
                  React intentionally <em>mounts components twice</em>{" "}
                  in development. This means your{" "}
                  <code className="font-mono tracking-wider text-xs bg-emerald-100 rounded-sm text-emerald-600 px-1.5 font-semibold py-0.5 ">
                    useEffect
                  </code>{" "}
                  will run, its cleanup will run, then it will run again — all
                  on the initial mount.
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  This is intentional. React is verifying that your effects are
                  resilient and that your cleanup logic correctly undoes what
                  the effect sets up. If your app breaks with Strict Mode's
                  double-invocation, it means your cleanup is incomplete — not
                  that Strict Mode is wrong.
                </p>
              </div>
              <>
                <CodeSnippet language="jsx" codeString={strictModeExample} />
                {/* <CodeSnippet language="jsx" codeString={strictModeEffect} /> */}
              </>
              {/* <pre className="bg-muted text-neutral-500 text-xs font-mono p-4  border border-border overflow-x-auto"><code>{strictModeEffect}</code></pre> */}
            </article>
          </section>

          {/* <div className="border-t border-border mb-14" /> */}

          <section id="effect-vs-layout" className="mb-">
            <article className="flex">
              <div className="w-[50%] pr-14 pt-10">
                <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-2">
                  useEffect — Runs After Paint
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  Runs asynchronously after the browser has painted the screen.
                  The user sees the updated UI before the effect fires. Ideal
                  for data fetching, subscriptions, logging — anything that
                  doesn't need to block painting.
                </p>
              </div>
              <CodeSnippet language="jsx" codeString={useEffectExample} />
              {/* <pre className="bg-muted text-neutral-500 text-xs font-mono p-4  border border-border overflow-x-auto mb-6"><code>{useEffectExample}</code></pre> */}
            </article>
            <article className="flex">
              <div className="w-[50%] pr-14 pt-14">
                <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-2">
                  useLayoutEffect — Runs Before Paint
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  Runs synchronously after React has updated the DOM, but{" "}
                  <em>before</em>{" "}
                  the browser paints. Useful when you need to measure the DOM or
                  make adjustments that would cause a visible flicker if done
                  after paint.
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Prefer{" "}
                  <code className="font-mono tracking-wider text-xs bg-emerald-100 rounded-sm text-emerald-600 px-1.5 font-semibold py-0.5 ">
                    useEffect
                  </code>{" "}
                  by default. Reach for{" "}
                  <code className="font-mono tracking-wider text-xs bg-sky-100 rounded-sm text-sky-600 px-1.5 font-semibold py-0.5 ">
                    useLayoutEffect
                  </code>{" "}
                  only when you observe a flash or need DOM measurements before
                  the paint.
                </p>
              </div>
              <CodeSnippet
                language="jsx"
                className="py-10"
                codeString={useLayoutEffectExample}
              />
              {/* <pre className="bg-muted text-neutral-500 text-xs font-mono p-4  border border-border overflow-x-auto mb-4"><code>{useLayoutEffectExample}</code></pre> */}
            </article>
          </section>

          {/* <div className="border-t border-border mb-14" /> */}

          <section id="batching" className="mb-">
            <article className="flex">
              <div className="w-[50%] pr-14 pt-12">
                <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-3">
                  <code className="font-mono text-sm bg-muted text-neutral-500 px-1.5 py-0.5 ">
                    await
                  </code>{" "}
                  and State Update Batching
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  React batches multiple state updates into a single re-render
                  when they happen in the same synchronous event handler. React
                  18 extended this to async contexts too — but there's a catch:
                  {" "}
                  <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-semibold tracking-wider py-0.5">
                    await
                  </code>{" "}
                  can break batching.
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  Any state updates that occur <em>after</em> an{" "}
                  <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-semibold tracking-wider py-0.5">
                    await
                  </code>{" "}
                  expression are no longer in the same microtask and may not be
                  batched together, causing separate re-renders.
                </p>
              </div>
              <CodeSnippet
                language="jsx"
                className="py-10"
                codeString={batchingBad}
              />
            </article>

            <article className="flex">
              <div className="w-[50%] pr-14 pt-12">
                <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-2">
                  restructure or use flushSync
                </h2>

                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  A common way to fix this issue is by restructuring the
                  function so the{" "}
                  <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-semibold tracking-wider py-0.5">
                    await
                  </code>{"  "}
                  happens before the related state updates. When a setState call
                  happens before an{" "}
                  <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-semibold tracking-wider py-0.5">
                    await
                  </code>{"  "}
                  and another happens after it, React may treat them as separate
                  updates because the await pauses execution and resumes in a
                  new microtask.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  By moving the async operation to the beginning and then
                  performing the state updates together afterward, both updates
                  occur in the same execution context. This allows React to
                  batch them into a single render, avoiding unnecessary
                  re-renders and keeping the component more efficient.
                </p>
              </div>

              {/* <pre className="bg-muted text-neutral-500 text-xs font-mono p-4  border border-border overflow-x-auto"><code>{batchingGood}</code></pre> */}
              <CodeSnippet
                language="jsx"
                className="pb-12"
                codeString={batchingGood}
              />
            </article>
          </section>

          {/* <div className="border-t border-border mb-14" /> */}

          <section id="derived-state" className="mb-">
            <article className="flex">
              <div className="w-[50%] pr-24 pt-12">
                <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-2">
                  Derived State from Props
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  A common anti-pattern is copying a prop into state and then
                  syncing it with a{" "}
                  <code className="font-mono tracking-wider text-xs bg-emerald-100 rounded-sm text-emerald-600 px-1.5 font-semibold py-0.5">
                    useEffect
                  </code>. This creates an unnecessary extra render cycle and
                  can lead to subtle bugs where state lags behind the prop.
                </p>
                {
                  /* <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
              The anti-pattern
            </p> */
                }
              </div>
              <CodeSnippet
                language="jsx"
                className="pb-10"
                codeString={derivedStateBad}
              />
            </article>
            {
              /* <article className="flex">
              <div className="w-[50%] pr-14 pt-12">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                  The best solution
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  If the value is derived purely from props, compute it during
                  render. Only reach for state if the value genuinely diverges
                  from the prop over time due to user interaction.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  Keeping derived values in state can introduce unnecessary
                  complexity, such as syncing the state with props or triggering
                  extra renders.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  Instead, you can either use the prop directly or transform it
                  during render (for example, formatting or modifying it). State
                  should only be used when the value can diverge from the
                  original prop due to user interaction or internal component
                  logic, meaning it needs to evolve independently after the
                  initial render.
                </p>
              </div>
              <CodeSnippet
                language="jsx"
                className="pb-10"
                codeString={derivedStateGood}
              />
            </article> */
            }
          </section>

          {/* <div className="border-t border-border mb-14" /> */}

          <section id="abort-controllers" className="mb-">
            <article className="flex">
              <div className="w-[50%] pr-14 pt-12 pb-6">
                <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-2">
                  Abort Controllers and Race Conditions
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  When you fetch data inside a{" "}
                  <code className="font-mono tracking-wider text-xs bg-emerald-100 rounded-sm text-emerald-600 px-1.5 font-semibold py-0.5">
                    useEffect
                  </code>, the fetch continues even if the component unmounts
                  before it completes. Calling{" "}
                  <code className="font-mono tracking-wider text-xs bg-yellow-100 rounded-sm text-yellow-500 px-1.5 font-semibold py-0.5">
                    setState
                  </code>{" "}
                  on an unmounted component produces a warning:{" "}
                  <em>
                    Can't perform a React state update on an unmounted
                    component.
                  </em>
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  There's also a race condition: if the effect re-runs (e.g.
                  when{" "}
                  <code className="font-mono text-xs bg-muted text-neutral-500 px-1 py-0.5 ">
                    id
                  </code>{" "}
                  changes), a slow earlier fetch could resolve after a faster
                  later one, overwriting your state with stale data.
                </p>
              </div>
              <CodeSnippet
                language="jsx"
                codeString={abortBad}
              />
            </article>
            <article className="flex">
              <div className="w-[50%] pr-14 pt-14">
                <p className="text-sm font-medium text-muted-foreground  tracking-widest mb-2">
                  use an AbortController
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  Pass the controller's signal to{" "}
                  <code className="font-mono text-xs bg-muted text-neutral-500 px-1 py-0.5 ">
                    fetch
                  </code>{" "}
                  and abort it in the cleanup function. This cancels the
                  in-flight request and prevents stale state updates.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  When a fetch request is started inside a{" "}
                  <code className="font-mono tracking-wider text-xs bg-emerald-100 rounded-sm text-emerald-600 px-1.5 font-semibold py-0.5 ">
                    useEffect
                  </code>{" "}
                  , the request will continue running even if the component
                  unmounts or the effect runs again due to a dependency change.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  By creating an AbortController and passing its signal to
                  fetch, you gain the ability to cancel the request if the
                  component unmounts or before a new request starts. In the
                  cleanup function of{" "}
                  <code className="font-mono tracking-wider text-xs bg-emerald-100 rounded-sm text-emerald-600 px-1.5 font-semibold py-0.5 ">
                    useEffect
                  </code>{" "}
                  , you call controller.abort(), which stops the in-flight
                  request.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  This prevents outdated responses from updating the state and
                  avoids warnings like “Can't perform a React state update on an
                  unmounted component.”
                </p>
              </div>
              <CodeSnippet
                language="jsx"
                className="pl-5!"
                codeString={abortGood}
              />
            </article>
          </section>

          {/* <div className="border-t border-border mb-14" /> */}

          <section id="memo-callback-facts" className="mb-">
            <article className="flex">
              <div className="w-[50%] pr-14">
                <h2 className="text-sm mt-12 font-medium text-muted-foreground tracking-widest mb-2">
                  useMemo runs during render
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  Unlike{" "}
                  <code className="font-mono tracking-wider text-xs bg-cyan- bg-emerald-100 rounded-sm text-emerald-500 px-1.5 font-medium py-0.5 ">
                    useEffect
                  </code>,{" "}
                  <code className="font-mono tracking-wider text-xs bg-cyan- bg-indigo-100 rounded-sm text-indigo-500 px-1.5 font-medium py-0.5 ">
                    useMemo
                  </code>{" "}
                  runs synchronously during rendering. Do not use it for side
                  effects — use it only for pure computations.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  Because of this,{"  "}
                  <code className="font-mono tracking-wider text-xs bg-cyan- bg-indigo-100 rounded-sm text-indigo-500 px-1.5 font-medium py-0.5 ">
                    useMemo
                  </code>{"  "}
                  should only be used for pure computations that return a value
                  and have no side effects. Performing side effects such as
                  network requests, logging, or modifying external variables
                  inside it can lead to unpredictable behavior, since React
                  expects rendering to remain pure and deterministic.
                </p>
              </div>
              <CodeSnippet
                language="jsx"
                className="pl-8!"
                codeString={useMemoFacts}
              />
              {/* <pre className="bg-muted text-neutral-500 text-xs font-mono p-4  border border-border overflow-x-auto mb-6"><code>{useMemoFacts}</code></pre> */}
            </article>
            <article className="flex">
              <div className="w-[50%] pr-14 pt-12">
                <h2 className="text-sm font-medium text-muted-foreground tracking-widest mb-2">
                  useCallback is syntactic sugar
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  <code className="font-mono text-xs bg-muted text-neutral-500 px-1 py-0.5 ">
                    useCallback(fn, deps)
                  </code>{" "}
                  is exactly equivalent to{" "}
                  <code className="font-mono text-xs bg-muted text-neutral-500 px-1 py-0.5 ">
                    useMemo(() =&gt; fn, deps)
                  </code>. Understanding this helps clarify when each is
                  appropriate.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  The only difference is that{" "}
                  <code className="font-mono tracking-wider text-xs bg-cyan- bg-purple-100 rounded-sm text-purple-500 px-1.5 font-medium py-0.5">
                    useCallback
                  </code>{"  "}
                  is specifically designed for memoizing functions, while{"   "}
                  <code className="font-mono tracking-wider text-xs bg-cyan- bg-indigo-100 rounded-sm text-indigo-500 px-1.5 font-medium py-0.5 ">
                    useMemo
                  </code>{"   "}
                  memoizes the result of a computation. Understanding this
                  relationship helps clarify when to use each hook and
                  reinforces that both are mainly about preserving stable
                  references between renders.
                </p>
              </div>
              <CodeSnippet
                language="jsx"
                codeString={useCallbackFacts}
              />
              {/* <pre className="bg-muted text-neutral-500 text-xs font-mono p-4  border border-border overflow-x-auto"><code>{useCallbackFacts}</code></pre> */}
            </article>
          </section>

          {/* <div className="border-t border-border mb-14" /> */}

          <section id="use-transition" className="mb-">
            <article className="flex">
              <div className="w-[50%] pr-14 pt-10">
                <h2 className="font-mono text-sm bg-muted mt-4 text-neutral-500 px-1.5 py-0.5 mb-2">
                useTransition
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  Introduced in React 18,{" "}
                  <code className="font-mono text-xs bg-green-100 text-green-500 px-1.5 rounded-sm font-semibold tracking-wider py-0.5">
                    useTransition
                  </code>{" "}
                  lets you mark certain state updates as non-urgent. React will
                  prioritize urgent updates (like typing in an input) and defer
                  the non-urgent ones (like filtering a large list), keeping the
                  UI responsive.
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  The hook returns{" "}
                  <code className="font-mono text-xs bg-muted text-neutral-500 px-1 py-0.5 ">
                    isPending
                  </code>{" "}
                  — a boolean you can use to show a loading state while the
                  transition is in progress — and{" "}
                  <code className="font-mono text-xs bg-muted text-neutral-500 px-1 py-0.5 ">
                    startTransition
                  </code>, a function that wraps your non-urgent state update.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  As developers, this is useful when some updates are expensive
                  (like filtering a large list or rendering many components) but
                  shouldn't block the UI. With{" "}
                  <code className="font-mono text-xs bg-green-100 text-green-500 px-1.5 rounded-sm font-semibold tracking-wider py-0.5">
                    useTransition
                  </code>{" "}
                  , React can keep the interface responsive by prioritizing
                  urgent updates — like typing in an input — while scheduling
                  the heavier updates in the background.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  In the example, updating the input value (setQuery) is
                  considered urgent, so it happens immediately to keep typing
                  smooth. The search results update (setResults) is wrapped
                  inside startTransition, meaning React can delay or interrupt
                  that update if needed to keep the UI responsive. While the
                  transition is happening, isPending can be used to show a
                  loading indicator, helping users understand that the UI is
                  still processing the update.
                </p>
              </div>
              <CodeSnippet
                language="jsx"
                className="pl-5!"
                codeString={useTransitionExample}
              />
              {/* <pre className="bg-muted text-neutral-500 text-xs font-mono p-4  border border-border overflow-x-auto"><code>{useTransitionExample}</code></pre> */}
            </article>
          </section>

          {/* <div className="border-t border-border mb-14" /> */}

          <section id="suspense-lazy" className="mb-">
            <article className="flex">
              <div className="w-[50%] pr-14 pt-14">
                <p className="text-sm font-medium text-muted-foreground  tracking-wider mb-2">
                  Code splitting with lazy
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  <code className="font-mono text-xs bg-red-100 text-red-400 px-1.5 rounded-sm font-semibold tracking-wider py-0.5">
                    React.lazy
                  </code>{" "}
                  lets you code-split components — deferring their load until
                  they're actually needed. Paired with{" "}
                  <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-semibold tracking-wider py-0.5">
                    Suspense
                  </code>, you can show a fallback while the component's bundle
                  is being loaded.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  Is typically used together with{"  "}
                  <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-semibold tracking-wider py-0.5">
                    Suspense
                  </code>, which lets you display a fallback UI while the
                  component is being loaded. For example, while the browser
                  downloads the component’s bundle, React can temporarily show a
                  loading indicator or placeholder. Once the component finishes
                  loading, React replaces the fallback with the actual
                  component, creating a smoother and more efficient user
                  experience.
                </p>
              </div>
              <CodeSnippet
                language="jsx"
                className="pb-5"
                codeString={suspenseLazy}
              />
            </article>
            <article className="flex">
              <div className="w-[50%] pt-14 pr-14">
                <p className="text-sm font-medium text-muted-foreground tracking-widest mb-2">
                  Suspense with data
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  In React 18+, Suspense also works with data fetching when
                  using a Suspense-compatible data source. The{" "}
                  <code className="font-mono tracking-wider text-xs bg-fuchsia-100 rounded-sm text-fuchsia-400 px-1.5 font-medium py-0.5">
                    use
                  </code>{" "}
                  hook can suspend a component while a promise resolves.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  When using a Suspense-compatible data source, a component can
                  pause its rendering while waiting for asynchronous data to
                  resolve. This works through the idea of suspending the
                  component: if a promise is still pending, React temporarily
                  stops rendering that part of the UI and shows the nearest
                  Suspense fallback instead.
                </p>
              </div>
              <CodeSnippet
                language="jsx"
                className="pb-10!"
                codeString={suspenseData}
              />
            </article>
          </section>

          {/* <div className="border-t border-border mb-14" /> */}

          <section id="form-state-optimistic" className="mb-">
            <article className="flex">
              <div className="w-[50%] pr-14">
                <h2 className="font-mono text-sm bg-muted text-neutral-500 px-1.5 py-0.5 mb-2 mt-12">
                  useFormState
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  <code className="font-mono tracking-wider text-xs bg-orange-100 rounded-sm text-orange-400 px-1.5 font-medium py-0.5">
                    useFormState
                  </code>{" "}
                  (from{" "}
                  <code className="font-mono text-xs bg-muted text-neutral-500 px-1 py-0.5 ">
                    react-dom
                  </code>) connects a form action to component state. The action
                  receives the previous state and form data, and its return
                  value becomes the new state. Works with React Server Actions.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  Instead of manually handling onSubmit, preventing default
                  behavior, reading form values, and updating local state,{"  "}
                  <code className="font-mono tracking-wider text-xs bg-orange-100 rounded-sm text-orange-400 px-1.5 font-medium py-0.5">
                    useFormState
                  </code>{"  "}
                  lets you define an action function that receives the previous
                  state and the submitted FormData. Whatever that action returns
                  automatically becomes the new state of the form.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  When the user submits the form, React calls the action
                  (submitAction in this case), passes the current state and the
                  form data, and then updates the component with the returned
                  result. This makes it very natural to handle things like
                  validation errors, success messages, or server responses,
                  since the returned object becomes the new state.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  It’s particularly powerful in frameworks like Next.js with
                  Server Actions, where the action can run on the server,
                  interact with a database, and then seamlessly update the UI.
                </p>
              </div>
              <CodeSnippet
                language="jsx"
                // className="pl-5!"
                codeString={useFormStateExample}
              />
              {/* <pre className="bg-muted text-neutral-500 text-xs font-mono p-4  border border-border overflow-x-auto mb-8"><code>{useFormStateExample}</code></pre> */}
            </article>
            <article className="flex">
              <div className="w-[50%] pr-14 pt-12">
                <h2 className="font-mono text-sm bg-muted mt-4 text-neutral-500 px-1.5 py-0.5 mb-2">
                  useOptimistic
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  <code className="font-mono tracking-wider text-xs bg-cyan- bg-pink-100 rounded-sm text-pink-500 px-1.5 font-medium py-0.5">
                    useOptimistic
                  </code>{" "}
                  lets you show an optimistic (immediate) update in the UI while
                  an async operation is in progress. Once the operation
                  completes, the real state takes over. If it fails, the
                  optimistic state is rolled back automatically.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  As developers, we often want the UI to feel instant — for
                  example, when sending a message or liking a post. Instead of
                  waiting for the server response,{" "}
                  <code className="font-mono tracking-wider text-xs bg-cyan- bg-pink-100 rounded-sm text-pink-500 px-1.5 font-medium py-0.5">
                    useOptimistic
                  </code>{"  "}
                  lets us temporarily update the UI with an optimistic state
                  while the real request is still in progress.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  In the example,{" "}
                  <code className="font-mono tracking-wider text-xs bg-cyan- bg-pink-100 rounded-sm text-pink-500 px-1.5 font-medium py-0.5">
                    useOptimistic
                  </code>{"  "}
                  takes the current messages and a reducer-like function that
                  describes how to update the optimistic state when a new
                  message is added. When addOptimistic(text) is called, React
                  immediately updates the UI to include the new message with a
                  pending flag, giving instant feedback to the user. Meanwhile,
                  the real async operation (sendMessage) runs in the background.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  Once the server operation completes, the actual state from the
                  server replaces the optimistic one. If the request fails,
                  React automatically rolls back the optimistic update, ensuring
                  the UI stays consistent with the real data. This pattern is
                  especially useful for fast-feeling interactions like chats,
                  comments, or social actions where waiting for the server would
                  otherwise make the UI feel slow.
                </p>
              </div>
              <CodeSnippet
                language="jsx"
                // className="pl-5!"
                codeString={useOptimisticExample}
              />
              {/* <pre className="bg-muted text-neutral-500 text-xs font-mono p-4  border border-border overflow-x-auto"><code>{useOptimisticExample}</code></pre> */}
            </article>
          </section>
        </article>
      )}
    </>
  );
}
