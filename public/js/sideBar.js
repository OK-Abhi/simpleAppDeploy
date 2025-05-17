const closed = document.querySelector(".closed");
const menuBar = document.querySelector("#sidebar");
const menu = document.querySelector(".menu");

menu.addEventListener("click", () => {
  gsap.to(menuBar, {
    x: -600,
    duration: 0,
    ease: "back.in",
  });
});

closed.addEventListener("click", () => {
  gsap.to(menuBar, {
    x: 550, //380
    duration: 2,
    ease: "back.out",
  });
});
