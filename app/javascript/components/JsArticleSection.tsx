"use client";
import CodeSnippet from "@/components/CodeSnippet";
import { useEffect, useState } from "react";

export default function JsArticleSection() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const hoistingCode = `var x = 10;

function test() {
  console.log(x); // undefined — declaration is hoisted but not the value
  var x = 20;
}

test();`;

  const tdzCode = `var x = 10;

function test() {
  // ReferenceError: cannot access 'x' before initialization
  console.log(x);
  let x = 20;
}

test();`;

  const spreadShallowCode = `const original = { a: 1, nested: { b: 2 } };
const copy = { ...original };

copy.nested.b = 99;
console.log(original.nested.b); // 99 — the nested object was shared
`;

  const assignShallowCode = `const obj = { nested: { num: 1 } };
const copy = Object.assign({}, obj);

copy.nested.num = 2;
console.log(obj.nested.num); // 2 — Object.assign only does a shallow copy
`;

  const functionsObjectCode = `function greet() {
  console.log('hello');
}

greet.custom = 'property';
console.log(greet.custom); // 'property' — functions are just objects

const arrow = () => {};
console.log(typeof arrow); // 'function'
console.log(arrow.prototype)//undefined (arrow functions don’t get a prototype)
`;

  const promiseThenCode = `console.log('start');

setTimeout(() => console.log('timeout'), 0);

Promise.resolve().then(() => console.log('promise then'));

console.log('end');

// Output:
// start
// end
// promise then
// timeout
`;

  return (
    <>
      {show && (
        <article className="">
          <section id="hoisting-shadowing" className="">
            <article className="flex">
              <div className="w-[50%] pr-14 pt-8 pb-8">
                <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-2">
                  Hoisting &amp; Shadowing
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  Declarations using{" "}
                  <code className="font-mono text-xs bg-emerald-100 text-emerald-500 px-1.5 rounded-sm font-semibold tracking-wider py-0.5">
                    var
                  </code>{" "}
                  are hoisted to the top of their scope. The variable exists
                  from the start of the function, but its initializer isn’t
                  applied until the execution reaches the line. In the example
                  below the local{"  "}<code className="font-mono">x</code>{" "}
                  shadows the outer one, so{"  "}
                  <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-medium tracking-wider py-0.5 ">
                    console.log
                  </code>{"   "}
                  prints{"  "}
                  <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-medium tracking-wider py-0.5 ">
                    undefined
                  </code>{"  "}
                  instead of{"  "}<code className="font-mono">10</code>.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  When a variable inside a function has the same name as one in
                  an outer scope, it shadows the outer variable. Due to
                  hoisting, the inner variable is considered to exist from the
                  beginning of the function, even though it hasn’t been assigned
                  yet. As a result, accessing it before its assignment returns
                  undefined instead of the value from the outer scope, which is
                  why these cases can be surprising if you're not aware of how
                  hoisting works.
                </p>
              </div>
              <CodeSnippet
                className="pt-0!"
                language="javascript"
                codeString={hoistingCode}
              />
            </article>
          </section>

          <section id="tdz" className="">
            <article className="flex">
              <div className="w-[50%] pr-14 pt-8 pb-8">
                <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-2">
                  Temporal Dead Zone
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  Unlike{" "}
                  <code className="font-mono text-xs bg-emerald-100 text-emerald-500 px-1.5 rounded-sm font-medium tracking-wider py-0.5 ">
                    var
                  </code>,{"  "}
                  <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-medium tracking-wider py-0.5 ">
                    let
                  </code>{" "}
                  and{"  "}
                  <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-medium tracking-wider py-0.5 ">
                    const
                  </code>{" "}
                  are not hoisted in the same way. The binding is created at the
                  start of the block but is uninitialized until the declaration
                  is evaluated. Accessing it before then triggers a{" "}
                  <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-medium tracking-wider py-0.5 ">
                    ReferenceError
                  </code>
                  {" "}
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  The period between the start of the block and the point where
                  the variable is declared is called the Temporal Dead Zone
                  (TDZ). During this time, the variable technically exists in
                  the scope but cannot be accessed yet because it hasn’t been
                  initialized. Attempting to read it before its declaration
                  results in a{" "}
                  <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-medium tracking-wider py-0.5 ">
                    ReferenceError
                  </code>. This behavior was introduced with let and const to
                  make variable usage more predictable and prevent some of the
                  confusing bugs that occurred with var hoisting.
                </p>
              </div>
              <CodeSnippet language="javascript" codeString={tdzCode} />
            </article>
          </section>

          <section id="spread-shallow" className="">
            <article className="flex">
              <div className="w-[50%] pr-14 pt-8 pb-8">
                <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-2">
                  Spread Copy Is Shallow
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  Using the spread operator to clone an object or array creates
                  a new top‑level container, but nested objects and arrays are
                  still shared by reference. Mutating them affects the original.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  If the original object contains nested objects or arrays,
                  those inner values are still shared by reference between the
                  original and the copy. Because of this, modifying a nested
                  property in the copied object will also affect the original,
                  which can lead to unexpected side effects if you assume the
                  copy is completely independent.
                </p>
              </div>
              <CodeSnippet
                language="javascript"
                codeString={spreadShallowCode}
              />
            </article>
          </section>

          <section id="object-assign-shallow" className="">
            <article className="flex">
              <div className="w-[50%] pr-14 pt-10 pb-8">
                <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-2">
                  <code className="font-mono">Object.assign</code>{" "}
                  Is Also Shallow
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  Similar to spread,{" "}
                  <code className="font-mono text-xs bg-purple-100 text-purple-500 px-1.5 rounded-sm font-medium tracking-wider py-0.5 ">
                    Object.assign()
                  </code>
                  only copies properties at the first level. Nested structures
                  remain shared.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  It copies only the enumerable properties from the source
                  object to the target object at the first level, but any nested
                  objects or arrays are still copied by reference. This means
                  that if you modify a nested value in the copied object, the
                  change will also appear in the original object because both
                  variables still point to the same inner structure.
                </p>
              </div>
              <CodeSnippet
                language="javascript"
                codeString={assignShallowCode}
              />
            </article>
          </section>

          <section id="functions-objects" className="">
            <article className="flex">
              <div className="w-[50%] pr-14 pt-10 pb-8">
                <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-2">
                  Functions Are Objects (and Prototypes)
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  In JavaScript every function is also an object. You can add
                  properties to it just like any other object. Regular functions
                  automatically get a{" "}
                  <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-medium tracking-wider py-0.5 ">
                    .prototype
                  </code>{" "}
                  property (used by{" "}
                  <code className="font-mono">new</code>), but arrow functions
                  do not.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  Regular functions also have a special .prototype property that
                  is used when creating objects with the new keyword, allowing
                  instances to inherit shared methods. However, arrow functions
                  do not have a{" "}
                  <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-medium tracking-wider py-0.5 ">
                    .prototype
                  </code>{" "}
                  property, because they are not designed to be used as
                  constructors. This distinction is important when working with
                  object-oriented patterns in JavaScript.
                </p>
              </div>
              <CodeSnippet
                language="javascript"
                className="pl-2!"
                codeString={functionsObjectCode}
              />
            </article>
          </section>

          <section id="promise-microtask" className="">
            <article className="flex">
              <div className="w-[50%] pr-14 pt-10 pb-8">
                <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-2">
                  <code className="font-mono">Promise.resolve().then()</code>
                  {" "}
                  Runs Before Timeouts
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  {/* <code className="font-mono">.then()</code>{" "} */}
                  <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-medium tracking-wider py-0.5 ">
                    .then
                  </code>{" "}
                  callbacks are scheduled as microtasks, which execute
                  immediately after the current script finishes but before the
                  next macrotask (e.g. a
                  <code className="font-mono">setTimeout</code> callback).
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  After the current synchronous code finishes executing, the
                  JavaScript event loop processes all pending microtasks before
                  moving on to the next macrotask. Because of this, a{"  "}
                  <code className="font-mono text-xs bg-blue-100 text-blue-500 px-1.5 rounded-sm font-medium tracking-wider py-0.5 ">
                    Promise.resolve().then()
                  </code>{" "}
                  callback will run before a setTimeout callback, even if the
                  timeout is set to 0.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  This behavior is part of how the event loop prioritizes tasks
                  and helps explain why promise callbacks often run sooner than
                  timer-based callbacks.
                </p>
              </div>
              <CodeSnippet language="javascript" codeString={promiseThenCode} />
            </article>
          </section>
        </article>
      )}
    </>
  );
}
