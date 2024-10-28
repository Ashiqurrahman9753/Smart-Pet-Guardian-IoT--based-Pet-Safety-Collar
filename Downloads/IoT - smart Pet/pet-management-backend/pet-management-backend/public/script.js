document.addEventListener("DOMContentLoaded", function() {
  // NAV BAR
  const toggleMenuOpen = () => document.body.classList.toggle("open");

  const nav = document.querySelector("#nav");

  console.log(nav);
  const onScroll = (event) => {
    const scrollPosition = event.target.scrollingElement.scrollTop;
    // console.log(scrollPosition);
    if (scrollPosition > 10) {
      if (!nav.classList.contains("scrolled-down"))
        nav.classList.add("scrolled-down");
      //   progressBar.classList.add("progress-bar-heightd");
    } else {
      if (nav.classList.contains("scrolled-down"))
        nav.classList.remove("scrolled-down");
      //   progressBar.classList.remove("progress-bar-heightd");
    }
  };

  document.addEventListener("scroll", onScroll);
  window.addEventListener("scroll", onScroll);

  // Progress Bar
  const bodyEl = document.body;
  const barEl = document.querySelector(".bar");
  const updateBar = () => {
    let scrollPos =
      (window.scrollY / (bodyEl.scrollHeight - window.innerHeight)) * 100;
    barEl.style.width = `${scrollPos}%`;
    requestAnimationFrame(updateBar);
  };
  updateBar();

  //SERVICES

  // FAQ
  const faq = document.querySelector(".faq");
  faq.addEventListener("click", (event) => {
    const question = event.target.closest(".faq__question");
    if (!question) return;
    const answer = question.nextElementSibling;
    // hide previously opened answer and show the clicked answer
    const currentAnswer = faq.querySelector('.faq__answer[aria-hidden="false"]');
    if (currentAnswer === answer) {
      // close the already open answer
      answer.setAttribute("aria-hidden", "true");
      answer.parentNode.classList.remove("faq__item--expanded");
      question.setAttribute("aria-expanded", "false");
    } else {
      // hide previously open answer and show the clicked answer
      if (currentAnswer) {
        currentAnswer.setAttribute("aria-hidden", "true");
        currentAnswer.parentNode.classList.remove("faq__item--expanded");
        currentAnswer.previousElementSibling.setAttribute(
          "aria-expanded",
          "false"
        );
      }
      answer.setAttribute("aria-hidden", "false");
      answer.parentNode.classList.add("faq__item--expanded");
      question.setAttribute("aria-expanded", "true");
    }
  });

  // Live Location Container
  const container = document.getElementById("liveLocationCard");
  container.addEventListener("click", function() {
      // Redirect to the map page
      window.location.href = "map.html";
  });
});
