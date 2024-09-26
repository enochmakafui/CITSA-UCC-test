"use strict";

const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const slideInElements = document.querySelectorAll(".slide__in");
const allSections = document.querySelectorAll(".section__visible");

// sticky navigation
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// implementing slide in on hero section
const revealTitle = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
};

const headerTitleObserver = new IntersectionObserver(revealTitle, {
  root: null,
  threshold: 0.1,
});

slideInElements.forEach((section) => {
  headerTitleObserver.observe(section);
});

// implementing reveal items on scroll

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section__hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
});
