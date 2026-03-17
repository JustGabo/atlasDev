import {useEffect, useRef} from 'react'
import gsap from "gsap";

export default function AutoalphaDemo() {
    const boxRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(boxRef.current, { autoAlpha: 0, duration: 1 })
        .to(boxRef.current, { autoAlpha: 1, duration: 1 });
  
      return () => {
        tl.kill();
      };
    }, []);
  
    return <div className="w-16 h-16 bg-fuchsia-300 rounded-lg" ref={boxRef} />;
  }