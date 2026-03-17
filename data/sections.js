export const sections = [
  {
    id: 'memo-objects',
    title: 'React.memo and Object Props',
    content: [
      {
        type: 'p',
        text: '<code>React.memo</code> does a shallow comparison of props to decide whether to re-render a component. This works fine for primitive values — strings, numbers, booleans. But it breaks down silently when you pass an <strong>object</strong> or a <strong>function</strong> as a prop.'
      },
      {
        type: 'p',
        text: 'Every time a component renders, any object literal written inline is a <em>new reference</em> in memory. Shallow comparison checks references, not deep equality — so <code>React.memo</code> sees a "changed" prop and re-renders anyway, defeating its purpose entirely.'
      },
      { type: 'label', text: 'The problem' },
      {
        type: 'code',
        code: `const Child = React.memo(({ config }) => {\n  return <div>{config.title}</div>;\n});\n\nfunction Parent() {\n  // This object is recreated on every render.\n  // React.memo does a shallow comparison and sees\n  // a new reference each time — so it re-renders anyway.\n  return <Child config={{ title: 'Hello' }} />;\n}`
      },
      { type: 'label', text: 'Fix 1 — stabilize with useMemo' },
      {
        type: 'p',
        text: 'Wrap the object in <code>useMemo</code> so its reference only changes when its dependencies change.'
      },
      {
        type: 'code',
        code: `import { useMemo } from 'react';\n\nfunction Parent() {\n  const config = useMemo(() => ({ title: 'Hello' }), []);\n  // Now the reference is stable — React.memo works as expected.\n  return <Child config={config} />;\n}`
      },
      { type: 'label', text: 'Fix 2 — define the value outside the component' },
      {
        type: 'p',
        text: 'If the value is static and never changes, move it outside the component entirely. No hook needed.'
      },
      {
        type: 'code',
        code: `// If the value never changes, define it outside the component\n// so it's never recreated.\nconst config = { title: 'Hello' };\n\nfunction Parent() {\n  return <Child config={config} />;\n}`
      }
    ]
  },
  {
    id: 'memo-functions',
    title: 'React.memo and Function Props',
    content: [
      {
        type: 'p',
        text: 'The same issue applies to functions. An arrow function written inline creates a new reference on every render. Passing it as a prop to a memoized child means that child will always re-render.'
      },
      { type: 'label', text: 'The problem' },
      {
        type: 'code',
        code: `const Child = React.memo(({ onClick }) => {\n  return <button onClick={onClick}>Click me</button>;\n});\n\nfunction Parent() {\n  // A new function reference is created on every render.\n  // React.memo can't help here.\n  return <Child onClick={() => console.log('clicked')} />;\n}`
      },
      { type: 'label', text: 'Fix — stabilize with useCallback' },
      {
        type: 'p',
        text: '<code>useCallback</code> memoizes the function itself, returning the same reference between renders as long as its dependencies haven\'t changed.'
      },
      {
        type: 'code',
        code: `import { useCallback } from 'react';\n\nfunction Parent() {\n  const handleClick = useCallback(() => {\n    console.log('clicked');\n  }, []);\n  // Stable reference — React.memo prevents unnecessary re-renders.\n  return <Child onClick={handleClick} />;\n}`
      }
    ]
  },
  {
    id: 'memo-comparators',
    title: 'Custom Comparators in React.memo',
    content: [
      {
        type: 'p',
        text: '<code>React.memo</code> accepts a second argument: a comparison function. It receives the previous and next props, and lets you decide whether the component should re-render. Return <code>true</code> to skip re-render (props are equal), <code>false</code> to allow it.'
      },
      {
        type: 'p',
        text: 'This is useful when you want to do a partial or semantic comparison — for example, comparing only the <code>id</code> of a user object rather than the whole object.'
      },
      {
        type: 'code',
        code: `const Child = React.memo(\n  ({ user }) => {\n    return <div>{user.name}</div>;\n  },\n  (prevProps, nextProps) => {\n    // Return true if props are equal (skip re-render).\n    // Return false if props changed (allow re-render).\n    return prevProps.user.id === nextProps.user.id;\n  }\n);`
      }
    ]
  },
  {
    id: 'mental-model',
    title: 'The mental model',
    content: [
      {
        type: 'p',
        text: '<code>React.memo</code> is only as good as the stability of the props you pass. Before reaching for memoization, ask: <em>are my props stable references?</em>'
      },
      {
        type: 'list',
        items: [
          'Primitive values (string, number, boolean) — stable by value. <code>React.memo</code> works as expected.',
          'Objects passed inline — new reference every render. Use <code>useMemo</code> or lift them outside.',
          'Functions passed inline — new reference every render. Use <code>useCallback</code>.',
          'Complex comparison logic — use the second argument to <code>React.memo</code>.'
        ]
      }
    ]
  },
  {
    id: 'strict-mode',
    title: 'React Strict Mode',
    content: [
      {
        type: 'p',
        text: '<code>StrictMode</code> is a development-only tool. It doesn\'t render any visible UI, but it activates extra checks and warnings for its descendants.'
      },
      {
        type: 'code',
        code: `import { StrictMode } from 'react';\n\n<StrictMode>\n  <App />\n</StrictMode>`
      },
      {
        type: 'p',
        text: 'One behavior that catches people off guard: in Strict Mode, React intentionally <em>mounts components twice</em> in development. This means your <code>useEffect</code> will run, its cleanup will run, then it will run again — all on the initial mount.'
      },
      {
        type: 'p',
        text: 'This is intentional. React is verifying that your effects are resilient and that your cleanup logic correctly undoes what the effect sets up. If your app breaks with Strict Mode\'s double-invocation, it means your cleanup is incomplete — not that Strict Mode is wrong.'
      },
      {
        type: 'code',
        code: `useEffect(() => {\n  // In Strict Mode (dev only), this runs twice:\n  // mount → unmount → mount\n  // This is intentional — React is checking your cleanup is correct.\n  const sub = subscribe();\n  return () => sub.unsubscribe();\n}, []);`
      }
    ]
  },
  {
    id: 'effect-vs-layout',
    title: 'useEffect vs useLayoutEffect',
    content: [
      {
        type: 'p',
        text: 'Both hooks run after render, but at different times. The difference is subtle but matters for visual consistency.'
      },
      { type: 'label', text: 'useEffect — after paint' },
      {
        type: 'p',
        text: 'Runs asynchronously after the browser has painted the screen. The user sees the updated UI before the effect fires. Ideal for data fetching, subscriptions, logging — anything that doesn\'t need to block painting.'
      },
      {
        type: 'code',
        code: `useEffect(() => {\n  // Runs after paint — the browser has already updated the screen.\n  // Good for: data fetching, subscriptions, logging.\n  document.title = 'Hello';\n}, []);`
      },
      { type: 'label', text: 'useLayoutEffect — before paint' },
      {
        type: 'p',
        text: 'Runs synchronously after React has updated the DOM, but <em>before</em> the browser paints. Useful when you need to measure the DOM or make adjustments that would cause a visible flicker if done after paint.'
      },
      {
        type: 'code',
        code: `useLayoutEffect(() => {\n  // Runs synchronously after DOM mutations, before paint.\n  // Good for: reading layout, measuring DOM nodes, avoiding flicker.\n  const rect = ref.current.getBoundingClientRect();\n  setHeight(rect.height);\n}, []);`
      },
      {
        type: 'p',
        text: 'Prefer <code>useEffect</code> by default. Reach for <code>useLayoutEffect</code> only when you observe a flash or need DOM measurements before the paint.'
      }
    ]
  },
  {
    id: 'batching',
    title: 'await and State Update Batching',
    content: [
      {
        type: 'p',
        text: 'React batches multiple state updates into a single re-render when they happen in the same synchronous event handler. React 18 extended this to async contexts too — but there\'s a catch: <code>await</code> can break batching.'
      },
      {
        type: 'p',
        text: 'Any state updates that occur <em>after</em> an <code>await</code> expression are no longer in the same microtask and may not be batched together, causing separate re-renders.'
      },
      { type: 'label', text: 'The problem' },
      {
        type: 'code',
        code: `// Before React 18 — and still a pitfall with async/await:\nasync function handleClick() {\n  setCount(c => c + 1);\n  await fetch('/api/data'); // <-- await breaks batching here\n  setData(result);          // This triggers a separate render\n}`
      },
      { type: 'label', text: 'Fix — restructure or use flushSync' },
      {
        type: 'code',
        code: `import { flushSync } from 'react-dom';\n\n// Option 1: restructure to avoid the await between state updates.\n// Option 2: use flushSync if you need synchronous flushing explicitly.\nflushSync(() => {\n  setCount(c => c + 1);\n});\n// Or restructure so related state updates happen in the same tick.`
      }
    ]
  },
  {
    id: 'derived-state',
    title: 'Derived State from Props',
    content: [
      {
        type: 'p',
        text: 'A common anti-pattern is copying a prop into state and then syncing it with a <code>useEffect</code>. This creates an unnecessary extra render cycle and can lead to subtle bugs where state lags behind the prop.'
      },
      { type: 'label', text: 'The anti-pattern' },
      {
        type: 'code',
        code: `function UserCard({ userId }) {\n  const [id, setId] = useState(userId);\n\n  useEffect(() => {\n    setId(userId); // Redundant — causes an extra render cycle.\n  }, [userId]);\n\n  return <div>{id}</div>;\n}`
      },
      { type: 'label', text: 'The best solution' },
      {
        type: 'p',
        text: 'If the value is derived purely from props, compute it during render. Only reach for state if the value genuinely diverges from the prop over time due to user interaction.'
      },
      {
        type: 'code',
        code: `// Just use the prop directly — no state needed.\nfunction UserCard({ userId }) {\n  return <div>{userId}</div>;\n}\n\n// If you need to transform it, derive during render:\nfunction UserCard({ userId }) {\n  const displayId = userId.toUpperCase();\n  return <div>{displayId}</div>;\n}\n\n// Only lift to state if the value truly diverges from the prop over time.`
      }
    ]
  },
  {
    id: 'abort-controllers',
    title: 'Abort Controllers and Race Conditions',
    content: [
      {
        type: 'p',
        text: 'When you fetch data inside a <code>useEffect</code>, the fetch continues even if the component unmounts before it completes. Calling <code>setState</code> on an unmounted component produces a warning: <em>Can\'t perform a React state update on an unmounted component.</em>'
      },
      {
        type: 'p',
        text: 'There\'s also a race condition: if the effect re-runs (e.g. when <code>id</code> changes), a slow earlier fetch could resolve after a faster later one, overwriting your state with stale data.'
      },
      { type: 'label', text: 'The problem' },
      {
        type: 'code',
        code: `useEffect(() => {\n  fetch('/api/data')\n    .then(res => res.json())\n    .then(data => setData(data)); // Component may have unmounted!\n}, [id]);`
      },
      { type: 'label', text: 'Fix — use an AbortController' },
      {
        type: 'p',
        text: 'Pass the controller\'s signal to <code>fetch</code> and abort it in the cleanup function. This cancels the in-flight request and prevents stale state updates.'
      },
      {
        type: 'code',
        code: `useEffect(() => {\n  const controller = new AbortController();\n\n  fetch('/api/data', { signal: controller.signal })\n    .then(res => res.json())\n    .then(data => setData(data))\n    .catch(err => {\n      if (err.name === 'AbortError') return; // Ignore — intentional cancel\n      throw err;\n    });\n\n  return () => controller.abort(); // Cleanup on unmount or re-run\n}, [id]);`
      }
    ]
  },
  {
    id: 'controlled-components',
    title: 'Controlled Components',
    content: [
      {
        type: 'p',
        text: 'A controlled component is one where React owns the form element\'s value. The input\'s value is driven by state, and every keystroke updates that state via an <code>onChange</code> handler. This gives you a single source of truth.'
      },
      { type: 'label', text: 'Uncontrolled vs controlled' },
      {
        type: 'code',
        code: `// Uncontrolled — React doesn't own the value.\n<input defaultValue={name} />`
      },
      {
        type: 'code',
        code: `// Controlled — React owns the value.\nconst [name, setName] = useState('');\n\n<input\n  value={name}\n  onChange={e => setName(e.target.value)}\n/>`
      },
      { type: 'label', text: 'Common pitfall' },
      {
        type: 'p',
        text: 'Initializing state with <code>undefined</code> makes the input uncontrolled. When state later becomes a string, React warns about switching from uncontrolled to controlled. Always initialize with an empty string.'
      },
      {
        type: 'code',
        code: `// Pitfall: switching between controlled and uncontrolled.\n// If value is undefined, the input is uncontrolled.\n// If value becomes a string, React warns about the switch.\nconst [name, setName] = useState(undefined); // BAD\nconst [name, setName] = useState('');         // GOOD — always a string`
      }
    ]
  },
  {
    id: 'use-reducer',
    title: 'Lesser-known facts about useReducer',
    content: [
      {
        type: 'p',
        text: 'Most people know <code>useReducer</code> as a more structured alternative to <code>useState</code> for complex state. A few less obvious behaviors:'
      },
      { type: 'label', text: 'Basic pattern' },
      {
        type: 'code',
        code: `const [state, dispatch] = useReducer(reducer, initialState);\n\n// The reducer receives the current state and an action.\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'increment':\n      return { count: state.count + 1 };\n    default:\n      return state;\n  }\n}`
      },
      { type: 'label', text: 'Lazy initialization' },
      {
        type: 'p',
        text: 'The third argument to <code>useReducer</code> is an initializer function. It receives the second argument as input and is called once — useful for expensive initial computations or deriving initial state from props without running that logic on every render.'
      },
      {
        type: 'code',
        code: `// Lazy initialization — the third argument is an init function.\n// Useful when computing initial state is expensive.\nconst [state, dispatch] = useReducer(reducer, props.id, fetchInitialData);\n// fetchInitialData(props.id) is called once on mount.`
      },
      { type: 'label', text: 'dispatch is stable' },
      {
        type: 'p',
        text: 'Unlike state values, <code>dispatch</code> has a stable identity across renders. You don\'t need to include it in dependency arrays.'
      },
      {
        type: 'code',
        code: `// dispatch is stable — it never changes between renders.\n// You can safely omit it from useEffect/useCallback dependency arrays.\nuseEffect(() => {\n  dispatch({ type: 'reset' });\n}, []); // No need to include dispatch`
      }
    ]
  },
  {
    id: 'memo-callback-facts',
    title: 'Lesser-known facts about useMemo and useCallback',
    content: [
      {
        type: 'p',
        text: 'These two hooks are often misunderstood or overused. Some things worth knowing:'
      },
      { type: 'label', text: 'useMemo runs during render' },
      {
        type: 'p',
        text: 'Unlike <code>useEffect</code>, <code>useMemo</code> runs synchronously during rendering. Do not use it for side effects — use it only for pure computations.'
      },
      {
        type: 'code',
        code: `// useMemo runs during render — not after.\n// Do NOT use it for side effects.\nconst value = useMemo(() => expensiveComputation(a, b), [a, b]);\n\n// useMemo with no deps runs once — same as defining outside the component,\n// but useful when the value depends on props/context.\nconst schema = useMemo(() => buildSchema(), []);`
      },
      { type: 'label', text: 'useCallback is syntactic sugar' },
      {
        type: 'p',
        text: '<code>useCallback(fn, deps)</code> is exactly equivalent to <code>useMemo(() =&gt; fn, deps)</code>. Understanding this helps clarify when each is appropriate.'
      },
      {
        type: 'code',
        code: `// useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).\n// It's just syntactic sugar for memoizing functions.\n\n// Both of these are identical:\nconst fn1 = useCallback(() => doThing(a), [a]);\nconst fn2 = useMemo(() => () => doThing(a), [a]);\n\n// Reminder: memoization has a cost. Don't add it everywhere —\n// only when you have a measurable performance problem.`
      }
    ]
  },
  {
    id: 'use-transition',
    title: 'useTransition',
    content: [
      {
        type: 'p',
        text: 'Introduced in React 18, <code>useTransition</code> lets you mark certain state updates as non-urgent. React will prioritize urgent updates (like typing in an input) and defer the non-urgent ones (like filtering a large list), keeping the UI responsive.'
      },
      {
        type: 'p',
        text: 'The hook returns <code>isPending</code> — a boolean you can use to show a loading state while the transition is in progress — and <code>startTransition</code>, a function that wraps your non-urgent state update.'
      },
      {
        type: 'code',
        code: `import { useTransition, useState } from 'react';\n\nfunction SearchPage() {\n  const [query, setQuery] = useState('');\n  const [results, setResults] = useState([]);\n  const [isPending, startTransition] = useTransition();\n\n  function handleChange(e) {\n    setQuery(e.target.value); // Urgent — update input immediately\n    startTransition(() => {\n      setResults(search(e.target.value)); // Non-urgent — can be interrupted\n    });\n  }\n\n  return (\n    <>\n      <input value={query} onChange={handleChange} />\n      {isPending ? <p>Loading...</p> : <Results data={results} />}\n    </>\n  );\n}`
      }
    ]
  },
  {
    id: 'suspense-lazy',
    title: 'Suspense and lazy',
    content: [
      {
        type: 'p',
        text: '<code>React.lazy</code> lets you code-split components — deferring their load until they\'re actually needed. Paired with <code>Suspense</code>, you can show a fallback while the component\'s bundle is being loaded.'
      },
      { type: 'label', text: 'Code splitting with lazy' },
      {
        type: 'code',
        code: `import { Suspense, lazy } from 'react';\n\n// The component is loaded only when it's first rendered.\nconst HeavyChart = lazy(() => import('./HeavyChart'));\n\nfunction Dashboard() {\n  return (\n    <Suspense fallback={<p>Loading chart...</p>}>\n      <HeavyChart />\n    </Suspense>\n  );\n}`
      },
      { type: 'label', text: 'Suspense with data' },
      {
        type: 'p',
        text: 'In React 18+, Suspense also works with data fetching when using a Suspense-compatible data source. The <code>use</code> hook can suspend a component while a promise resolves.'
      },
      {
        type: 'code',
        code: `// Suspense also works with data fetching in React 18+,\n// when used with a Suspense-compatible data source (e.g. use(), SWR, React Query).\nimport { use } from 'react';\n\nfunction UserProfile({ userPromise }) {\n  const user = use(userPromise); // Suspends until the promise resolves\n  return <p>{user.name}</p>;\n}`
      }
    ]
  },
  {
    id: 'form-state-optimistic',
    title: 'useFormState and useOptimistic',
    content: [
      {
        type: 'p',
        text: 'Two newer hooks aimed at server-integrated forms and optimistic UI patterns.'
      },
      { type: 'label', text: 'useFormState' },
      {
        type: 'p',
        text: '<code>useFormState</code> (from <code>react-dom</code>) connects a form action to component state. The action receives the previous state and form data, and its return value becomes the new state. Works with React Server Actions.'
      },
      {
        type: 'code',
        code: `'use client';\nimport { useFormState } from 'react-dom';\n\nasync function submitAction(prevState, formData) {\n  const name = formData.get('name');\n  if (!name) return { error: 'Name is required' };\n  await saveToDb(name);\n  return { success: true };\n}\n\nfunction MyForm() {\n  const [state, formAction] = useFormState(submitAction, {});\n\n  return (\n    <form action={formAction}>\n      <input name='name' />\n      {state.error && <p>{state.error}</p>}\n      <button type='submit'>Save</button>\n    </form>\n  );\n}`
      },
      { type: 'label', text: 'useOptimistic' },
      {
        type: 'p',
        text: '<code>useOptimistic</code> lets you show an optimistic (immediate) update in the UI while an async operation is in progress. Once the operation completes, the real state takes over. If it fails, the optimistic state is rolled back automatically.'
      },
      {
        type: 'code',
        code: `'use client';\nimport { useOptimistic } from 'react';\n\nfunction MessageList({ messages, sendMessage }) {\n  const [optimisticMessages, addOptimistic] = useOptimistic(\n    messages,\n    (state, newMessage) => [...state, { text: newMessage, pending: true }]\n  );\n\n  async function handleSubmit(text) {\n    addOptimistic(text);  // Immediately show the message\n    await sendMessage(text); // Actual server call\n  }\n\n  return (\n    <ul>\n      {optimisticMessages.map((m, i) => (\n        <li key={i} style={{ opacity: m.pending ? 0.5 : 1 }}>{m.text}</li>\n      ))}\n    </ul>\n  );\n}`
      }
    ]
  }
];
