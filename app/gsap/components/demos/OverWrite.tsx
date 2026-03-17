import {useEffect, useRef} from 'react'
import gsap from "gsap";

export default function OverwriteDemo() {
    const boxRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      gsap.to(boxRef.current, {
        x: 200,
        duration: 3,
        ease: "none",
        repeat: -1,
      });
    }, []);
  
    const handleInterrupt = () => {
      if (boxRef.current) {
        gsap.to(boxRef.current, {
          x: -80,
          duration: 0.8,
          overwrite: "auto",
          ease: "power2.out",
        });
      }
    };
  
    return (
      <div className="space-y-4 w-full">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-sky-500 rounded-lg" ref={boxRef} />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleInterrupt}
            className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm hover:bg-sky-600 transition"
          >
            Overwrite
          </button>
        </div>
      </div>
    );
  }