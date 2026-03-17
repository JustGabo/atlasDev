import {useRef} from 'react'
import gsap from "gsap";


export default function InvalidateDemo() {
    const boxRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);
  
    const handleAnimate = () => {
      if (boxRef.current) {
        // reset to start before animating again
        gsap.set(boxRef.current, { x: 0 });
        tweenRef.current = gsap.to(boxRef.current, {
          x: 80,
          duration: 2,
          ease: "sine.inOut",
        });
      }
    };
  
    const handleInvalidate = () => {
      if (boxRef.current && tweenRef.current) {
        gsap.set(boxRef.current, { x: 40 });
        tweenRef.current.invalidate().restart();
      }
    };
  
    return (
      <div className="space-y-4 w-full flex flex-col items-center">
        <div className="w-24 h-24 bg-blue-500 rounded-lg" ref={boxRef} />
        <div className="flex gap-2">
          <button
            onClick={handleAnimate}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
          >
            Animate
          </button>
          <button
            onClick={handleInvalidate}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition"
          >
            Reset & Invalidate
          </button>
        </div>
      </div>
    );
  }