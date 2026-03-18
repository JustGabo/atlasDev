import {useEffect, useRef} from 'react'
import gsap from "gsap";

export default function LazyRenderingDemo() {
    const boxRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(boxRef.current, {
        x: 80,
        opacity: 0.5,
        duration: 1.5,
        ease: "sine.inOut",
      });
  
      return () => {
        tl.kill();
      };
    }, []);
  
    return <div className="w-16 h-16 bg-orange-200 rounded-lg" ref={boxRef} />;
  }