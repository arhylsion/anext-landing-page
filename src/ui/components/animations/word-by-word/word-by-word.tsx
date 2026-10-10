import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function WordByWord({ children }: { children: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const words = children.split(" ");

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const wordSpans = containerRef.current!.querySelectorAll(".word");

      gsap.from(wordSpans, {
        opacity: 0,
        y: 0,
        stagger: 0.2,
        duration: 0.85,
        filter: "blur(10px)",
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <span ref={containerRef}>
      {words.map((word, index) => (
        <span key={index}>
          <span
            className="word"
            style={{ display: "inline-block" }}
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
