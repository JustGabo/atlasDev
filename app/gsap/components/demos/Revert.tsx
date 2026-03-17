import {useRef} from 'react'
import gsap from "gsap";

export default function RevertDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const handleAnimate = () => {
    if (boxRef.current) {
      tweenRef.current = gsap.to(boxRef.current, {
        x: 80,
        opacity: 0.5,
        rotation: 360,
        duration: 1.5,
        ease: "power2.out",
      });
    }
  };

  const handleRevert = () => {
    if (tweenRef.current) {
      tweenRef.current.revert();
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
          onClick={handleRevert}
          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
        >
          Revert
        </button>
      </div>
    </div>
  );
}