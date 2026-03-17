"use client";

import CodeSnippet from "@/components/CodeSnippet";
import { useEffect, useRef, useState } from "react";
import LazyRenderingDemo from "./demos/LazyRendering";
import PositionParameterDemo from "./demos/PositionParameter";
import AutoalphaDemo from "./demos/AutoAlpha";
import OverwriteDemo from "./demos/OverWrite";
import InvalidateDemo from "./demos/Invalidate";
import AnimateArraysDemo from "./demos/AnimateArrays";
import RevertDemo from "./demos/Revert";
import StaggerDemo from "./demos/Stagger";

export default function GsapArticleSection() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const lazyRenderingCode =
    `// GSAP uses lazy rendering — animations only calculate
// what's needed, skipping unnecessary reflows
gsap.to(".box", {
  duration: 1,
  x: 100,
  opacity: 0.5,
  // Only animate the properties that change
  // GSAP doesn't touch untouched properties
});

// This is much more performant than setting
// multiple CSS properties manually
`;

  const quicksetterCode =
    `// Quicksetter — instantly set values without animation
import { gsap } from "gsap";

const quickSet = gsap.quickSetter("#target", "x", "px");

// Instantly set x to 100px (no animation)
quickSet(100);
quickSet(200);
quickSet(300);

// Perfect for frequent updates (like scroll or drag)
// without the overhead of creating new timelines
`;

  const positionParameterCode =
    `// Position parameter controls when each animation starts
// useful for fine-grained timing control
gsap.timeline()
  .to(".box1", { y: 100, duration: 1 })
  // starts at 0 (same time)
  .to(".box2", { y: 100, duration: 1 }, 0)
   // starts 0.5s after previous  
  .to(".box3", { y: 100, duration: 1 }, "+=0.5")
  // starts when previous starts
  .to(".box4", { y: 100, duration: 1 }, "<") 
   // starts 0.3s before previous ends
  .to(".box5", { y: 100, duration: 1 }, "-=0.3");
`;

  const autoalphaCode = `// autoalpha — animates opacity AND visibility
// When opacity reaches 0, visibility is hidden (pointer-events work too)
gsap.to(".target", {
  autoAlpha: 0,  // opacity: 0 + visibility: hidden
  duration: 0.5,
});

gsap.to(".target", {
  autoAlpha: 1,  // opacity: 1 + visibility: visible
  duration: 0.5,
});

// Better than just opacity alone
`;

  const overwriteCode = `// Initial animation: box moves right infinitely
gsap.to(".box", {
  x: 200,
  duration: 3,
  ease: "none",
  repeat: -1, // plays forever
});

// When button is clicked "Overwrite" fires:
// New animation tries to move same element
gsap.to(".box", {
  x: -80,
  duration: 0.8,
  overwrite: "auto", // KILLS the first animation
  ease: "power2.out",
});

// Result: first animation stops, second takes over
`;

  const invalidateCode = `// Step 1: Click "Animate" to start the animation
const tween = gsap.to(".box", {
  x: 80,
  duration: 2,
  ease: "sine.inOut",
});

// Step 2: Click "Reset & Invalidate"
// Manually change position (interrupts animation)
gsap.set(".box", { x: 40 });

// WITHOUT invalidate():
// tween.restart() animates from 0 → 80
// (GSAP still has cached start value: 0)

// WITH invalidate():
tween.invalidate(); // clears the cache
tween.restart();    // NOW animates from 40 → 80

// Result: respects current position instead of cached value
`;

  const animateArraysCode = `// GSAP can animate arrays of numbers
gsap.to({
  value: 0
}, {
  value: 100,
  duration: 2,
  onUpdate: function() {
    // 'value' is being animated from 0 to 100
    console.log(this.targets()[0].value);
  }
});

// Perfect for counters, progress bars, or custom calculations
`;

  const revertCode = `// revert() kills animation AND restores the DOM
const tween = gsap.to(".box", {
  x: 100,
  opacity: 0.5,
  duration: 1,
});

// Later...
tween.revert();

// The animation is killed AND all CSS is removed
// The element returns to its original state
`;

  const matchMediaCode = `// matchMedia() for responsive animations
gsap.registerPlugin(ScrollTrigger);

gsap.matchMedia().add("(max-width: 768px)", () => {
  // Mobile animation
  gsap.to(".box", { x: 50, duration: 1 });
});

gsap.matchMedia().add("(min-width: 769px)", () => {
  // Desktop animation
  gsap.to(".box", { x: 200, duration: 1 });
});

// Automatically cleans up when media query changes
`;

  const staggerPositionCode =
    `// stagger with position parameter distributes animations
gsap.to(".item", {
  duration: 0.6,
  y: 20,
  opacity: 1,
  stagger: {
    amount: 1,         // total time to distribute over all elements
    from: "center",    // start from center
    axis: "y",         // or "x", or "random"
  }
});

// Other 'from' options: "start", "center", "end", "edges", "random"
// Custom calculation also possible
`;

  return (
    <>
      {show && (
        <article className="">
          <section id="lazy-rendering" className="">
            <article className="flex">
              <div className="w-[50%] flex flex-col justify-between pr-14 pt-10 pb-6">
                <div>
                  <h2 className="text-base font-semibold mb-3">
                    GSAP Uses Lazy Rendering for Performance
                  </h2>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                    GSAP intelligently optimizes performance by only rendering
                    and recalculating the properties you explicitly animate. It
                    doesn't touch untouched CSS, avoiding unnecessary reflows
                    and repaints that would tank performance.
                  </p>
                </div>
                <div className="bg-[#F9FAFE] w-full h-[25vh] rounded-xl border-3 border-neutral-100/70 flex items-center justify-center">
                  <LazyRenderingDemo />
                </div>
              </div>
              <CodeSnippet
                className="pt-0!"
                language="javascript"
                codeString={lazyRenderingCode}
              />
            </article>
          </section>

          <section id="quicksetter" className="">
            <article className="flex">
              <div className="w-[50%] pr-14 pt-10">
                <h2 className="text-base font-semibold mb-3">
                  GSAP Quicksetter
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  {/* <code className="font-mono">quickSetter</code>{" "} */}
                  <code className="font-mono tracking-wider text-xs bg-emerald-100 rounded-sm text-emerald-600 px-1.5 font-semibold py-0.5 ">
                    quickSetter
                  </code>{" "}
                  is a lightweight function that instantly sets CSS values
                  without creating animations. Perfect for frequent, immediate
                  updates like scroll listeners or drag interactions without the
                  overhead of tweens.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  Instead of generating a new tween every time a value changes,
                  {"  "}
                  <code className="font-mono tracking-wider text-xs bg-emerald-100 rounded-sm text-emerald-600 px-1.5 font-semibold py-0.5 ">
                    quickSetter
                  </code>{"  "}
                  returns a small optimized function that directly updates a
                  property, making it ideal for situations where values change
                  very frequently, such as scroll listeners, mouse movement, or
                  drag interactions.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  Because it avoids the overhead of creating timelines or
                  tweens, it’s significantly faster for continuous updates and
                  helps keep interactions smooth and responsive while still
                  using GSAP’s internal optimizations
                </p>
              </div>
              <CodeSnippet language="javascript" codeString={quicksetterCode} />
            </article>
          </section>

          <section id="position-parameter" className="">
            <article className="flex">
              <div className="w-[50%] flex flex-col justify-between pr-14 pt-12 pb-6">
                <div>
                  <h2 className="text-base font-semibold mb-3">
                    Position Parameter Controls Animation Timing
                  </h2>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                    The position parameter in timelines gives you granular
                    control over when each animation starts. Use absolute
                    numbers, relative offsets (<code className="font-mono">
                      +=
                    </code>), and labels to choreograph complex sequences
                    precisely.
                  </p>
                </div>
                <div className="bg-[#F9FAFE] w-full h-[30vh] rounded-xl border-3 border-neutral-100/70 flex items-center justify-center">
                  <PositionParameterDemo />
                </div>
              </div>
              <CodeSnippet
                language="javascript"
                codeString={positionParameterCode}
              />
            </article>
          </section>

          <section id="autoalpha" className="">
            <article className="flex">
              <div className="w-[50%] flex flex-col justify-between pr-14 pt-14 pb-6">
                <div>
                  <h2 className="text-base font-semibold mb-3">
                    GSAP Autoalpha
                  </h2>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                    <code className="font-mono tracking-wider text-xs bg-fuchsia-100 rounded-sm text-fuchsia-600 px-1.5 font-semibold py-0.5 ">
                      autoAlpha
                    </code>{" "}
                    {/* <code className="font-mono">autoAlpha</code>{" "} */}
                    combines opacity and visibility into one property. When
                    opacity reaches 0, visibility is automatically hidden,
                    making it superior to animating opacity alone.
                  </p>
                </div>
                <div className="bg-[#F9FAFE] w-full h-[25vh] rounded-xl border-3 border-neutral-100/70 flex items-center justify-center">
                  <AutoalphaDemo />
                </div>
              </div>
              <CodeSnippet language="javascript" codeString={autoalphaCode} />
            </article>
          </section>

          <section id="overwrite" className="">
            <article className="flex">
              <div className="w-[50%] flex flex-col justify-between pr-14 pt-14 pb-6">
                <div>
                  <h2 className="text-base font-semibold mb-3">
                    GSAP Overwrite
                  </h2>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                    The <code className="font-mono">overwrite</code>{" "}
                    property controls how GSAP handles conflicting animations on
                    the same element.
                    <code className="font-mono">"auto"</code>{" "}
                    kills conflicting tweens, preventing animation race
                    conditions.
                  </p>
                </div>
                <div className="bg-[#F9FAFE] w-full h-[40vh] rounded-xl border-3 border-neutral-100/70 flex items-center justify-center">
                  <OverwriteDemo />
                </div>
              </div>
              <CodeSnippet language="javascript" codeString={overwriteCode} />
            </article>
          </section>

          <section id="invalidate" className="">
            <article className="flex">
              <div className="w-[50%] flex flex-col justify-between pr-14 pt-14 pb-6">
                <div>
                  <h2 className="text-base font-semibold mb-3">
                    <code className="font-mono">invalidate()</code>{" "}
                    Forces Recalculation
                  </h2>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                    By default, GSAP caches the starting values of an animation.
                    <code className="font-mono">invalidate()</code>{" "}
                    forces it to recalculate from the current position, useful
                    when the DOM has been manually modified between animations.
                  </p>
                </div>
                <div className="bg-[#F9FAFE] w-full h-[40vh] rounded-xl border-3 border-neutral-100/70 flex items-center justify-center">
                  <InvalidateDemo />
                </div>
              </div>
              <CodeSnippet language="javascript" codeString={invalidateCode} />
            </article>
          </section>

          <section id="animate-arrays" className="">
            <article className="flex">
              <div className="w-[50%] flex flex-col justify-between pr-14 pt-14 pb-6">
                <div>
                  <h2 className="text-base font-semibold mb-3">
                    GSAP Can Animate Arrays
                  </h2>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                    GSAP isn't limited to CSS properties — it can animate any
                    numeric value, including custom object properties. Perfect
                    for counters, progress bars, or any value that needs smooth
                    interpolation.
                  </p>
                </div>
                <div className="bg-[#F9FAFE] w-full h-[40vh] rounded-xl border-3 border-neutral-100/70 flex items-center justify-center">
                  <AnimateArraysDemo />
                </div>
              </div>
              <CodeSnippet
                language="javascript"
                codeString={animateArraysCode}
              />
            </article>
          </section>

          <section id="revert" className="">
            <article className="flex">
              <div className="w-[50%] flex flex-col justify-between pr-14 pt-12 pb-6">
                <div>
                  <h2 className="text-base font-semibold mb-3">
                    <code className="font-mono">revert()</code>{" "}
                    Kills and Restores
                  </h2>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                    <code className="font-mono">revert()</code>{" "}
                    does more than just kill the animation — it completely
                    restores the DOM element to its original state, removing all
                    applied CSS. A total cleanup in one call.
                  </p>
                </div>
                <div className="bg-[#F9FAFE] w-full h-[40vh] rounded-xl border-3 border-neutral-100/70 flex items-center justify-center">
                  <RevertDemo />
                </div>
              </div>
              <CodeSnippet language="javascript" codeString={revertCode} />
            </article>
          </section>

          <section id="match-media" className="">
            <article className="flex">
              <div className="w-[50%] pr-14 pt-14 pb-8">
                <h2 className="text-base font-semibold mb-3">
                  <code className="font-mono">matchMedia()</code>{" "}
                  for Responsive Animations
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  <code className="font-mono">matchMedia()</code>{" "}
                  wraps media queries around your animations, making them
                  responsive. When the screen size changes, old animations are
                  automatically cleaned up and new ones are applied.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  This makes it easy to define different animation behaviors for
                  mobile, tablet, or desktop screens without manually managing
                  breakpoints. When the viewport size changes and a media query
                  no longer matches, GSAP automatically reverts and cleans up
                  the animations created in that context, preventing duplicate
                  timelines or conflicting effects.
                </p>

                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  This approach keeps responsive animation logic organized and
                  ensures that the correct animations are always applied for the
                  current screen size.
                </p>
              </div>
              <CodeSnippet language="javascript" codeString={matchMediaCode} />
            </article>
          </section>

          <section id="stagger-position" className="">
            <article className="flex">
              <div className="w-[50%] flex flex-col justify-between pr-14 pt-14 pb-14">
                <div>
                  <h2 className="text-base font-semibold mb-3">
                    Stagger With Position Distribution
                  </h2>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                    The stagger object accepts a{" "}
                    <code className="font-mono">from</code>
                    parameter that controls where the stagger animation starts.
                    Use <code className="font-mono">"center"</code>,{" "}
                    <code className="font-mono">"edges"</code>, or{" "}
                    <code className="font-mono">"random"</code>{" "}
                    to create unique choreography patterns.
                  </p>
                </div>
                <div className="bg-[#F9FAFE] w-full h-[30vh] rounded-xl border-3 border-neutral-100/70 flex items-center justify-center">
                  <StaggerDemo />
                </div>
              </div>
              <CodeSnippet
                language="javascript"
                codeString={staggerPositionCode}
              />
            </article>
          </section>
        </article>
      )}
    </>
  );
}
