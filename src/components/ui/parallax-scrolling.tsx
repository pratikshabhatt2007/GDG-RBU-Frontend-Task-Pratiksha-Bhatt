import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

/**
 * Scroll-depth effect only (no images): elements marked data-parallax-layer="N"
 * inside [data-parallax-layers] drift at different speeds while scrolling,
 * with Lenis smooth scrolling. Renders nothing itself.
 */
const LAYERS = [
  { layer: "2", yPercent: 30 },
  { layer: "4", yPercent: 8 },
];

export function ParallaxComponent() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const trigger = document.querySelector("[data-parallax-layers]");
    let tl: gsap.core.Timeline | undefined;

    if (trigger) {
      tl = gsap.timeline({
        scrollTrigger: { trigger, start: "top top", end: "bottom top", scrub: 0 },
      });
      LAYERS.forEach((l, idx) => {
        tl!.to(
          trigger.querySelectorAll(`[data-parallax-layer="${l.layer}"]`),
          { yPercent: l.yPercent, ease: "none" },
          idx === 0 ? undefined : "<"
        );
      });
    }

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      tl?.scrollTrigger?.kill();
      tl?.kill();
      lenis.destroy();
    };
  }, []);

  return null;
}