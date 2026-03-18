"use client";
import { useEffect, useState } from "react";
import CodeSnippet from "@/components/CodeSnippet";
import LayoutIdDemo from "./demos/LayoutId";
import TransformDemo from "./demos/Transform";
import AnimatePresenceDemo from "./demos/AnimatePresence";
import MotionValuesDemo from "./demos/MotionValue";
import WhileHoverDemo from "./demos/WhileHover";
import DynamicVariantsDemo from "./demos/DynamicVariants";
import LayoutPositionDemo from "./demos/LayoutPosition";
import MotionValueEventDemo from "./demos/MotionValueEvent";
import UseTimeDemo from "./demos/UseTime";
import UseCycleDemo from "./demos/UseCycle";

export default function FramerMotionArticleSection() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    const layoutIdCode = `<LayoutGroup>
  <main className="flex flex-col gap-5 relative items-center justify-center">
    {/* Initial card view */}
    {state === "initial" && (
      <motion.div
        layoutId="card" // all card states share the same identity
      >
          {/* profile + actions */}
      </motion.div>
    )}

    {/* Info view */}
    {state === "info" && (
      <motion.div
        layoutId="card" // Same layoutId, Framer Motion morphs from the previous
        onClick={() => setState("initial")}
      >
          Lorem ipsum...
      </motion.div>
    )}

    {/* Social links view */}
    {state === "social" && (
      <motion.div
        layoutId="card" // Still the same shared element
      > {/* Social icons appear after the layout transition */}
      </motion.div>
    )}
  </main>
</LayoutGroup>
`;

    const transformPerformanceCode =
        `// Demo toggles between transform-based and layout-based animation
const [useTransform, setUseTransform] = useState(true);

<motion.div
  animate={
    useTransform
      ? { x: 100, scale: 1.2 } // transform (GPU friendly)
      : { left: 100, width: 175 } // layout (reflow)
  }
  transition={{ duration: 0.5 }}
  className="w-14 h-16"
/>

<button onClick={() => setUseTransform(!useTransform)}>
  Toggle
</button>
`;

    const animatePresenceCode =
        `// Click add/remove to trigger presence animation
const [items, setItems] = useState([{id:1,text:'Item 1'}]);

<AnimatePresence>
  {items.map(item => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {item.text}
    </motion.div>
  ))}
</AnimatePresence>
`;

    const motionValuesCode =
        `// Drag box horizontally but keep it inside its container
import { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

const x = useMotionValue(0);
const constraintsRef = useRef(null);

<div ref={constraintsRef} className="w-full h-full overflow-hidden relative">
  <motion.div
    drag="x"
    dragConstraints={constraintsRef}
    style={{ x }}
    className="w-20 h-20 bg-green-400 rounded"
  />
</div>
`;

    const whileHoverCode = `<motion.div>
  <motion.div
    // When hovered → lift the card and rotate slightly
    whileHover={{ top: "-35px", rotate: 10 }}
    transition={{
      type: "spring",
      stiffness: 200,
      damping: 20,
      duration: 0.1,
    }}
    style={{ top: "25px", zIndex: 50, padding: "0px 10px" }}
    className="bg-purple-400"
  >
    {/* Card content */}
  </motion.div>

  <motion.div
    // On hover this card lifts even higher
    whileHover={{ y: "-70px", rotate: 10 }}
    style={{ y: "-5px", padding: "0px 10px" }}
    className="bg-blue-500"
  >
    {/* Card content */}
  </motion.div>

  <div>
    {/* Balance UI */}
  </div>
</motion.div>
`;

    const dynamicVariantsCode = `// Slider changes custom value to shift box
// the range input has a Tailwind background color class
const variants = {
  open: (c: number) => ({ x: c * 50, transition: { duration: 0.5 } }),
  closed: { x: 0 }
};

<motion.div variants={variants} animate="open" custom={2} 
 className="w-16 h-16 bg-purple-400" />
<input type="range" min="-5" max="5" className="bg-yellow-500" />
`;

    const layoutPositionCode =
        `// Click to toggle position and height (state required)
const [expanded, setExpanded] = useState(false);

<motion.div
  layout="position"
  animate={{ x: expanded ? 100 : 0 }}
  transition={{ duration: 0.5 }}
  className={'w-20 ' + (expanded ? 'h-40' : 'h-20') + ' bg-yellow-400'}
  onClick={() => setExpanded(!expanded)}
/>

// layout="position" keeps size from animating
`;

    const useMotionValueEventCode =
        `// Drag the box and watch console for updates
const x = useMotionValue(0);
useMotionValueEvent(x, "change", latest => {
  console.log("x changed to", latest);
});

<motion.div drag="x" style={{ x }} className="w-20 h-20" />
`;

    const useTimeCode = `export default function UseTimeExample() {
  // useTime returns a MotionValue<number> that continuously increases
  // representing the elapsed time (in milliseconds) since mount
  const time = useTime();

  // Create a repeating 4-second cycle using modulo
  // This prevents time from growing infinitely for our animation logic
  const cycle = useTransform(time, (t) => t % 1300);

  // Map a portion of that time cycle into a position value
  // Here the element moves from 0px → 300px between 500ms and 1700ms
  const x = useTransform(cycle, [175, 1300], [0, 300]);

  return (
    <div className="w-full h-full flex items-center">
      {/* 
        The motion.div reads directly from the motion value "x".
        Because "x" is derived from "time", the movement updates
        every frame automatically without using state or timers.
      */}
      <motion.div
        style={{ x }}
      />
    </div>
  );
}
`;

    const useCycleCode = `const variants = {
  closed: { scale: 1 },                // Default state
  open: { scale: 1.5, rotate: 180 }    // Enlarged and rotated state
};

// useCycle lets us toggle between predefined values
// Here it switches between false and true each time it's called
const [isOpen, cycle] = useCycle(false, true);

<motion.div
  // Attach the variant definitions
  variants={variants} 
  // Choose which variant to animate to
  animate={isOpen ? "open" : "closed"}
   // Toggle the state on click  
  onClick={cycle}                      
>
  Click
</motion.div>
`;

    return (
        <>
            {show && (
                <article className="">
                    <section id="layout-id" className="">
                        <article className="flex">
                            <div className="w-[50%] flex flex-col justify-between pr-14 pt-10 pb-6">
                                <div>
                                    <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-3">
                                        <code className="font-mono">
                                            layoutId
                                        </code>{" "}
                                        for Shared Element Transitions
                                    </h2>
                                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                                        In Framer Motion, the{" "}
                                        <code className="font-mono tracking-wide text-xs bg-indigo-100 rounded-sm text-indigo-500 px-1.5 font-medium py-0.5 ">
                                            layoutId
                                        </code>{"  "}
                                        prop allows you to create shared element
                                        transitions between components that
                                        represent the same logical element
                                        across different parts of the UI. When
                                        two motion elements share the same{" "}
                                        <code className="font-mono tracking-wide text-xs bg-indigo-100 rounded-sm text-indigo-500 px-1.5 font-medium py-0.5 ">
                                            layoutId
                                        </code>{" "}
                                        , Framer Motion understands that they
                                        are actually the same element moving
                                        between layouts, so it animates the
                                        transition smoothly instead of instantly
                                        replacing one element with another.
                                    </p>

                                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                                        This technique enables smooth shared
                                        layout transitions where the same
                                        element morphs between different UI
                                        states while preserving visual
                                        continuity. In this demo, a single card
                                        transitions between three views: the
                                        initial profile header, an info panel,
                                        and a social links bar.
                                    </p>

                                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                                        Because each version of the card shares
                                        the same{"  "}
                                        <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-medium tracking-wider py-0.5">
                                            layoutId="card"
                                        </code>{" "}
                                        , Framer Motion understands they
                                        represent the same logical element, so
                                        it animates the layout changes instead
                                        of replacing the component instantly. As
                                        a result, the card smoothly resizes and
                                        moves between states while the inner
                                        content fades in, creating a transition
                                        that feels fluid and cohesive rather
                                        than abrupt.
                                    </p>
                                </div>
                                <div className="bg-[#F9FAFE] relative w-full h-[40vh] rounded-xl border-3 border-neutral-100/70 flex items-center justify-center">
                                    <LayoutIdDemo />
                                </div>
                            </div>
                            <CodeSnippet
                                className="pt-0! pl-0!"
                                language="jsx"
                                codeString={layoutIdCode}
                            />
                        </article>
                    </section>

                    <section id="transform-performance" className="">
                        <article className="flex">
                            <div className="w-[50%] flex flex-col justify-between pr-14 pt-16 pb-6">
                                <div>
                                    <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-3">
                                        Animating Transform Is More Performant
                                    </h2>
                                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                                        The demo below toggles between two
                                        animation strategies to illustrate a
                                        performance difference in Framer Motion.
                                        One strategy uses{" "}
                                        <code className="font-mono tracking-wider text-xs bg-yellow-100 rounded-sm text-yellow-500 px-1.5 font-medium py-0.5">
                                            useTransform
                                        </code>{"  "}
                                        to map a motion value into CSS transform
                                        properties; the other mutates layout
                                        values like{" "}
                                        <code className="font-mono">left</code>
                                        {" "}
                                        and{" "}
                                        <code className="font-mono">
                                            width
                                        </code>. When you animate transform
                                        properties such as
                                        <code className="font-mono">x</code>,
                                        <code className="font-mono">y</code>,
                                        <code className="font-mono">
                                            scale
                                        </code>, or{" "}
                                        <code className="font-mono">
                                            rotate
                                        </code>, Framer Motion can leverage GPU
                                        acceleration. In contrast, animating
                                        layout props triggers browser reflows,
                                        which are much more expensive and can
                                        hurt performance. The toggle demo makes
                                        this contrast immediately obvious.
                                    </p>
                                </div>
                                <div className="bg-[#F9FAFE] w-full h-[30vh] rounded-xl border-3 border-neutral-100/70 flex items-center justify-center">
                                    <TransformDemo />
                                </div>
                            </div>
                            <CodeSnippet
                                language="jsx"
                                codeString={transformPerformanceCode}
                            />
                        </article>
                    </section>

                    <section id="animate-presence" className="">
                        <article className="flex">
                            <div className="w-[50%] flex flex-col justify-between pr-14 pt-16 pb-10">
                                <div>
                                    <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-3">
                                        <code className="font-mono">
                                            AnimatePresence
                                        </code>{" "}
                                        Detects Unmount
                                    </h2>
                                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                                        {" "}
                                        <code className="font-mono tracking-wider text-xs bg-fuchsia-100 rounded-sm text-fuchsia-500 px-1.5 font-medium py-0.5">
                                            AnimatePresence
                                        </code>{"  "}
                                        automatically detects when components
                                        are added or removed from the React
                                        tree, allowing you to animate enter and
                                        exit states seamlessly.
                                    </p>
                                </div>
                                <div className="bg-[#F9FAFE] w-full h-[40vh] rounded-xl border-3 border-neutral-100/70 flex items-center justify-center">
                                    <AnimatePresenceDemo />
                                </div>
                            </div>
                            <CodeSnippet
                                language="jsx"
                                codeString={animatePresenceCode}
                            />
                        </article>
                    </section>

                    <section id="motion-values" className="">
                        <article className="flex">
                            <div className="w-[50%] flex flex-col justify-between pr-14 pt-16 pb-10">
                                <div>
                                    <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-3">
                                        Motion Values Avoid Re-renders
                                    </h2>
                                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                                        <code className="font-mono tracking-wider text-xs bg-emerald-100 rounded-sm text-emerald-500 px-1.5 font-medium py-0.5">
                                            useMotionValues
                                        </code>{" "}
                                        are reactive but don't trigger component
                                        re-renders when updated. They only cause
                                        re-renders when their values are read
                                        during render, making them efficient for
                                        frequent updates. This demo also shows
                                        how to constrain a dragged motion value
                                        to its parent using{" "}
                                        <code className="font-mono">
                                            dragConstraints
                                        </code>, preventing the green box from
                                        leaving its container.
                                    </p>
                                </div>
                                <div className="bg-[#F9FAFE] w-full h-[40vh] relative rounded-xl border-3 border-neutral-100/70 flex flex-col items-center justify-center">
                                    <p className="font-mono absolute top-10 text-sm">
                                        Drag the shape
                                    </p>
                                    <MotionValuesDemo />
                                </div>
                            </div>
                            <CodeSnippet
                                className="pl-4!"
                                language="jsx"
                                codeString={motionValuesCode}
                            />
                        </article>
                    </section>

                    <section id="while-hover" className="">
                        <article className="flex">
                            <div className="w-[50%] flex flex-col justify-between pr-14 pt-16 pb-6">
                                <div>
                                    <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-3">
                                        <code className="font-mono">
                                            whileHover
                                        </code>{" "}
                                        Uses Optimized Listeners
                                    </h2>
                                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                                        Unlike standard event listeners,{" "}
                                        <code className="font-mono tracking-wider text-xs bg-sky-100 rounded-sm text-sky-500 px-1.5 font-medium py-0.5">
                                            whileHover
                                        </code>{" "}
                                        and similar props use optimized pointer
                                        events that are more performant and
                                        handle touch devices better.
                                    </p>

                                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                                        Instead of manually handling mouseenter
                                        and mouseleave events, you simply
                                        declare the styles or transforms you
                                        want applied during the hover state, and
                                        Framer Motion automatically animates
                                        between the default state and the hover
                                        state.
                                    </p>

                                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                                        This makes it very convenient for
                                        creating interactive micro-interactions,
                                        such as scaling buttons, lifting cards,
                                        rotating elements, or changing colors.
                                    </p>

                                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                                        Because it works with Framer Motion’s
                                        animation system, the hover transition
                                        can also be customized with transition
                                        properties like springs, easing, or
                                        duration, giving the interaction a
                                        smooth and natural feel.
                                    </p>
                                </div>
                                <div className="bg-[#F9FAFE] w-full h-[40vh] rounded-xl border-3 border-neutral-100/70 flex items-center justify-center">
                                    <WhileHoverDemo />
                                </div>
                            </div>
                            <CodeSnippet
                                language="jsx"
                                codeString={whileHoverCode}
                            />
                        </article>
                    </section>

                    <section id="dynamic-variants" className="">
                        <article className="flex">
                            <div className="w-[50%] flex flex-col justify-between pr-14 pt-16 pb-10">
                                <div>
                                    <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-3">
                                        <code className="font-mono">
                                            animate
                                        </code>{" "}
                                        Can Receive Dynamic Variants
                                    </h2>
                                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                                        Variant functions can accept a{" "}
                                        <code className="font-mono">
                                            custom
                                        </code>{" "}
                                        parameter passed via the{" "}
                                        <code className="font-mono">
                                            custom
                                        </code>{" "}
                                        prop, allowing dynamic animation values
                                        based on component state.
                                    </p>
                                </div>
                                <div className="bg-[#F9FAFE] w-full h-[25vh] rounded-xl border-3 border-neutral-100/70 flex items-center justify-center">
                                    <DynamicVariantsDemo />
                                </div>
                            </div>
                            <CodeSnippet
                                language="jsx"
                                codeString={dynamicVariantsCode}
                            />
                        </article>
                    </section>

                    <section id="layout-position" className="">
                        <article className="flex">
                            <div className="w-[50%] flex flex-col justify-between pr-14 pt-16 pb-10">
                                <div>
                                    <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-3">
                                        <code className="font-mono">
                                            layout="position"
                                        </code>{" "}
                                        Avoids Size Animation
                                    </h2>
                                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                                        By default,{" "}
                                        <code className="font-mono">
                                            layout
                                        </code>{" "}
                                        animates both position and size. Setting
                                        {" "}
                                        <code className="font-mono">
                                            layout="position"
                                        </code>
                                        only animates position changes,
                                        preventing unwanted size animations.
                                    </p>
                                </div>
                                <div className="bg-[#F9FAFE] overflow-hidden w-full h-[30vh] rounded-xl border-3 border-neutral-100/70 flex items-center justify-center">
                                    <LayoutPositionDemo />
                                </div>
                            </div>
                            <CodeSnippet
                                language="jsx"
                                codeString={layoutPositionCode}
                            />
                        </article>
                    </section>

                    <section id="motion-value-event" className="">
                        <article className="flex">
                            <div className="w-[50%] flex flex-col justify-between pr-14 pt-16 pb-10">
                                <div>
                                    <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-3">
                                        <code className="font-mono">
                                            useMotionValueEvent
                                        </code>{" "}
                                        Listens Without Re-render
                                    </h2>
                                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                                        <code className="font-mono tracking-wider text-xs bg-pink-100 rounded-sm text-pink-500 px-1.5 font-medium py-0.5">
                                            useMotionValueEvent
                                        </code>{" "}
                                        hook allows you to listen to motion
                                        value changes without triggering a
                                        component re-render, perfect for side
                                        effects like logging or external API
                                        calls.
                                    </p>
                                </div>
                                <div className="bg-[#F9FAFE] w-full h-[25vh] rounded-xl border-3 relative border-neutral-100/70 flex items-center justify-center">
                                    <p className="font-mono absolute top-4 text-sm">
                                        Drag the shape
                                    </p>
                                    <MotionValueEventDemo />
                                </div>
                            </div>
                            <CodeSnippet
                                language="jsx"
                                codeString={useMotionValueEventCode}
                            />
                        </article>
                    </section>

                    <section id="use-time" className="">
                        <article className="flex">
                            <div className="w-[50%] flex flex-col justify-between pr-14 pt-14 pb-10">
                                <div>
                                    <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-3">
                                        <code className="font-mono">
                                            useTime
                                        </code>{" "}
                                        Creates Time-Based Motion Values
                                    </h2>
                                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                                        <code className="font-mono tracking-wider text-xs bg-blue-100 rounded-sm text-blue-600 px-1.5 font-medium py-0.5 ">
                                            useTime
                                        </code>{"  "}
                                        is a hook from Framer Motion that
                                        exposes a continuously updating motion
                                        value representing the elapsed time
                                        since the component mounted. Instead of
                                        manually managing timers with{"  "}
                                        <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-medium tracking-wider py-0.5 ">
                                            setInterval
                                        </code>
                                        ,{" "}
                                        <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-medium tracking-wider py-0.5 ">
                                            requestAnimationFrame
                                        </code>
                                        , or state updates,{" "}
                                        <code className="font-mono tracking-wider text-xs bg-blue-100 rounded-sm text-blue-600 px-1.5 font-medium py-0.5 ">
                                            useTime
                                        </code>{"  "}
                                        provides a reactive time source that can
                                        directly drive animations. Because it
                                        returns a MotionValue, it can be
                                        combined with other hooks like
                                        useTransform to derive positions,
                                        rotations, scales, or any other animated
                                        property based purely on time.
                                    </p>

                                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                                        <code className="font-mono tracking-wider text-xs bg-blue-100 rounded-sm text-blue-600 px-1.5 font-medium py-0.5 ">
                                            useTime
                                        </code>{"  "}
                                        is useful when you want deterministic,
                                        time-based animations that stay
                                        perfectly synchronized. Multiple
                                        elements can read from the same time
                                        value, ensuring that their motion is
                                        coordinated without relying on separate
                                        timers that might drift out of sync. By
                                        mapping the time value to animation
                                        ranges (for example using modulo to
                                        create loops), you can build repeating
                                        cycles, continuous motion, or
                                        synchronized UI effects while keeping
                                        the animation logic declarative and
                                        predictable.
                                    </p>
                                </div>
                                <div className="bg-[#F9FAFE] w-full h-[30vh] rounded-xl border-3 border-neutral-100/70 flex items-center justify-center">
                                    <UseTimeDemo />
                                </div>
                            </div>
                            <CodeSnippet
                                language="jsx"
                                codeString={useTimeCode}
                            />
                        </article>
                    </section>

                    <section id="use-cycle" className="">
                        <article className="flex">
                            <div className="w-[50%] flex flex-col justify-between pr-14 pt-16 pb-10">
                                <div>
                                    <h2 className="text-sm font-medium text-muted-foreground  tracking-widest mb-3">
                                        <code className="font-mono">
                                            useCycle
                                        </code>{" "}
                                        Toggles Animation States
                                    </h2>
                                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                                        Is a hook that lets you easily cycle
                                        through a set of predefined values,
                                        which is very useful for toggling
                                        animation states. Instead of manually
                                        managing state with{" "}
                                        <code className="font-mono text-xs bg-neutral-200 text-neutral-500 px-1.5 rounded-sm font-semibold tracking-wider py-0.5 ">
                                            useState
                                        </code>{"  "}
                                        and writing logic to switch between
                                        values,{" "}
                                        <code className="font-mono tracking-wider text-xs bg-emerald-100 rounded-sm text-emerald-600 px-1.5 font-semibold py-0.5 ">
                                            useCycle
                                        </code>{" "}
                                        provides a simple function that
                                        automatically moves to the next value in
                                        the sequence each time it’s called.
                                    </p>
                                </div>
                                <div className="bg-[#F9FAFE] w-full h-[40vh] rounded-xl border-3 border-neutral-100/70 flex items-center justify-center">
                                    <UseCycleDemo />
                                </div>
                            </div>
                            <CodeSnippet
                                language="jsx"
                                codeString={useCycleCode}
                            />
                        </article>
                    </section>
                </article>
            )}
        </>
    );
}

// const useTimeCode = `const time = useTime();

// // useTransform maps one motion value to another.
// // Here we transform the "time" value into a rotation value.
// // [0, 4000]  → input range (0ms to 4000ms)
// // [0, 360]   → output range (0° to 360°)

// const rotate = useTransform(time, [0, 4000], [0, 360], {
//   // clamp: false allows the value to keep increasing beyond the range.
//   // Without this, rotation would stop at 360°.
//   clamp: false
// });

// // Since "rotate" is constantly changing over time,
// // the box keeps rotating continuously.
// <motion.div style={{ rotate }} className="w-20 h-20 bg-blue-500" />
// `;
