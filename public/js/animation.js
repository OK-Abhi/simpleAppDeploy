const heading = document.querySelectorAll(".heading");
const split = new SplitText(heading, {
  type: "chars",
  autoSplit: true,
  mask: "chars",
});
gsap.from(split.chars, {
  duration: 1,
  delay: 0.5,
  opacity: 0,
  y: 100,
  stagger: 0.05, // Adds a staggered effect to each character
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: heading,
    start: "top 60%",
    end: "top 30%",
    scrub: true,
  },
});
