import { useEffect, useRef, useState } from "react";

export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1600,
}: {
  to: number;
  suffix?: string | undefined;
  prefix?: string | undefined;
  duration?: number | undefined;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setValue(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    /* Safety: if the observer never fires (e.g. element is already
       past viewport), ensure the final value is still displayed. */
    const safety = setTimeout(() => {
      setValue((v) => (v === 0 ? to : v));
    }, 4000);

    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, [to]);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.max(1, Math.round(to * eased)));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, to, duration]);

  return (
    <span 
      ref={ref} 
      aria-label={`${prefix}${to}${suffix}`}
      data-countup={to}
      data-prefix={prefix}
      data-suffix={suffix}
      className="vanilla-countup"
    >
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
