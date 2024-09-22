"use strict";

function initializeSlides() {
  return Array.from(document.querySelectorAll('section[id^="slide"]'))
    .map((slideElement) => {
      const [, xCoordinate, yCoordinate] =
        slideElement.id.match(/X(\d+)Y(\d+)/) || [];
      return xCoordinate && yCoordinate
        ? [parseInt(xCoordinate), parseInt(yCoordinate)]
        : null;
    })
    .filter(Boolean)
    .sort((slideA, slideB) => slideA[0] - slideB[0] || slideA[1] - slideB[1]);
}

function calculateTotalHorizontalSlides(slides) {
  return slides.filter((slide) => slide[1] === 0).length;
}

function updateActiveSlide(slides, currentSlideIndex) {
  document.querySelector(".slideActive")?.classList.remove("slideActive");
  document
    .getElementById(`slideX${slides[currentSlideIndex].join("Y")}`)
    .classList.add("slideActive");
}

function updateSlideNavigation(
  slides,
  currentSlideIndex,
  totalHorizontalSlides
) {
  checkSlideExistence(slides, currentSlideIndex);
  updateProgressBar(slides, currentSlideIndex, totalHorizontalSlides);
}

function moveSlide(slides, currentSlideIndex, direction, conditionFn) {
  if (window[`slideExistence${direction}`]) {
    do {
      currentSlideIndex +=
        direction === "Left" || direction === "Down" ? -1 : 1;
    } while (conditionFn(slides[currentSlideIndex]));
    updateActiveSlide(slides, currentSlideIndex);
    updateSlideNavigation(
      slides,
      currentSlideIndex,
      calculateTotalHorizontalSlides(slides)
    );
  }
  return currentSlideIndex;
}

function initializePresentation() {
  const slides = initializeSlides();
  const totalHorizontalSlides = calculateTotalHorizontalSlides(slides);
  let currentSlideIndex = 0;

  updateActiveSlide(slides, currentSlideIndex);
  updateSlideNavigation(slides, currentSlideIndex, totalHorizontalSlides);

  const navigationHandlers = {
    Right: () =>
      (currentSlideIndex = moveSlide(
        slides,
        currentSlideIndex,
        "Right",
        (slide) => slide[1] !== 0
      )),
    Left: () =>
      (currentSlideIndex = moveSlide(
        slides,
        currentSlideIndex,
        "Left",
        (slide) => slide[1] !== 0
      )),
    Up: () => {
      const currentVerticalPosition = slides[currentSlideIndex][1];
      currentSlideIndex = moveSlide(
        slides,
        currentSlideIndex,
        "Up",
        (slide) => currentVerticalPosition >= slide[1]
      );
    },
    Down: () => {
      const currentVerticalPosition = slides[currentSlideIndex][1];
      currentSlideIndex = moveSlide(
        slides,
        currentSlideIndex,
        "Down",
        (slide) => slide[1] >= currentVerticalPosition
      );
    },
  };

  Object.entries(navigationHandlers).forEach(([direction, handler]) => {
    window[`buttonClick${direction}`] = handler;
  });

  const keyCodeToDirection = { 38: "Up", 40: "Down", 39: "Right", 37: "Left" };
  window.onkeyup = (event) => {
    const direction = keyCodeToDirection[event.keyCode];
    if (direction) navigationHandlers[direction]();
  };
}

function checkSlideExistence(slides, currentSlideIndex) {
  const directions = ["Right", "Left", "Up", "Down"];
  const directionChecks = {
    Right: (index) => slides[currentSlideIndex][0] < slides[index][0],
    Left: (index) => slides[currentSlideIndex][0] > slides[index][0],
    Up: (index) =>
      slides[currentSlideIndex][0] === slides[index][0] &&
      slides[currentSlideIndex][1] < slides[index][1],
    Down: (index) =>
      slides[currentSlideIndex][0] === slides[index][0] &&
      slides[currentSlideIndex][1] > slides[index][1],
  };

  directions.forEach((direction) => {
    const isHorizontalMovement = direction === "Right" || direction === "Left";
    const searchRange =
      direction === "Right" || direction === "Up"
        ? [currentSlideIndex, slides.length]
        : [currentSlideIndex, -1];
    const searchStep = searchRange[0] < searchRange[1] ? 1 : -1;

    let slideExists = false;
    for (
      let slideIndex = searchRange[0];
      slideIndex !== searchRange[1];
      slideIndex += searchStep
    ) {
      if (isHorizontalMovement && slides[currentSlideIndex][1] !== 0) {
        slideExists = false;
        break;
      }
      if (directionChecks[direction](slideIndex)) {
        slideExists = true;
        break;
      }
    }

    window[`slideExistence${direction}`] = slideExists;
    document
      .getElementById(`navControls${direction}`)
      .classList.toggle("buttonPassive", !slideExists);
  });
}

function updateProgressBar(slides, currentSlideIndex, totalHorizontalSlides) {
  const progressBar = document.getElementById("progressBar");
  if (slides[currentSlideIndex][1] === 0) {
    progressBar.style.display = "block";
    const currentHorizontalSlideIndex = slides.filter(
      (slide, index) => slide[1] === 0 && index <= currentSlideIndex
    ).length;
    progressBar.style.width = `${
      (100 / totalHorizontalSlides) * currentHorizontalSlideIndex
    }%`;
  } else {
    progressBar.style.display = "none";
  }
}

// Initialize the presentation
initializePresentation();
