import {useRef, useEffect} from 'react'
import gsap from "gsap";

export default function AnimateArraysDemo() {
    const counterRef = useRef({ value: 0 });
    const displayRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      gsap.to(counterRef.current, {
        value: 100,
        duration: 5,
        snap: { value: 1 },
        onUpdate: () => {
          if (displayRef.current) {
            displayRef.current.textContent = Math.round(counterRef.current.value)
              .toString();
          }
        },
        repeat: -1,
        yoyo: true,
      });
    }, []);
  
    return (
      <div className="flex items-center justify-center flex-col gap-4">
        <div className="text-6xl font-bold text-blue-500" ref={displayRef}>
          0
        </div>
        <p className="text-sm text-neutral-500">Counter animating 0 → 100</p>
      </div>
    );
  }