import {useRef, useEffect} from 'react'
import gsap from "gsap";

export default function StaggerDemo() {
    const refs = [
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
    ];
  
    useEffect(() => {
      const tl = gsap.timeline({ repeat: -1 });
  
      tl.to(refs.map((r) => r.current), {
        y: -40,
        opacity: 1,
        duration: 0.8,
        stagger: {
          amount: 1,
          from: "center",
        },
        ease: "back.out",
      }).to(refs.map((r) => r.current), {
        y: 0,
        opacity: 0.6,
        duration: 0.8,
        stagger: {
          amount: 0.8,
          from: "center",
        },
        ease: "power1.in",
      });
  
      return () => {
        tl.kill();
      };
    }, []);
  
    return (
      <div className="flex gap-3 h-full items-center justify-center">
        {refs.map((ref, i) => (
          <div
            key={i}
            ref={ref}
            className="w-12 h-12 rounded-lg opacity-60"
            style={{
              backgroundColor:
                ["#3B82F6", "#10B981", "#A855F7", "#EC4899", "#F97316"][i],
            }}
          />
        ))}
      </div>
    );
  }