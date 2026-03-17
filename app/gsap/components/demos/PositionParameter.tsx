import {useRef, useEffect} from 'react'
import gsap from "gsap";

export default function PositionParameterDemo() {
    const refs = [
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
    ];
  
    useEffect(() => {
      const tl = gsap.timeline({ repeat: -1 });
  
      // Box 1: starts at 0 (default)
      tl.to(refs[0].current, {
        y: 60,
        duration: 1,
        ease: "power2.inOut",
      })
        // Box 2: starts at 0 (same time)
        .to(refs[1].current, {
          y: 60,
          duration: 1,
          ease: "power2.inOut",
        }, 0)
        // Box 3: starts +=0.5 (0.5s after previous)
        .to(refs[2].current, {
          y: 60,
          duration: 1,
          ease: "power2.inOut",
        }, "+=0.5")
        // Box 4: starts "<" (when box3 starts)
        .to(refs[3].current, {
          y: 60,
          duration: 1,
          ease: "power2.inOut",
        }, "<")
        // Box 5: starts -=0.3 (0.3s before box4 ends)
        .to(refs[4].current, {
          y: 60,
          duration: 1,
          ease: "power2.inOut",
        }, "-=0.3");
  
      return () => {
        tl.kill();
      };
    }, []);
  
    return (
      <div className="flex gap-4 justify-center">
        <div className="w-16 h-16 bg-blue-300 rounded-lg flex items-center justify-center font-mono text-sm text-blue-600" ref={refs[0]}>1</div>
        <div className="w-16 h-16 bg-blue-300 rounded-lg flex items-center justify-center font-mono text-sm text-blue-600" ref={refs[1]}>2</div>
        <div className="w-16 h-16 bg-blue-300 rounded-lg flex items-center justify-center font-mono text-sm text-blue-600" ref={refs[2]}>3</div>
        <div className="w-16 h-16 bg-blue-300 rounded-lg flex items-center justify-center font-mono text-sm text-blue-600" ref={refs[3]}>4</div>
        <div className="w-16 h-16 bg-blue-300 rounded-lg flex items-center justify-center font-mono text-sm text-blue-600" ref={refs[4]}>5</div>
      </div>
    );
  }