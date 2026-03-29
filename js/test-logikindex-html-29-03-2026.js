<script>
  const TOTAL_QUESTIONS = 10;

  function getScrollOffset() {
    return window.innerWidth <= 700 ? 18 : 36;
  }

  function scrollToTestTop() {
    const testSection = document.getElementById("test");
    if (!testSection) return;

    const top = testSection.getBoundingClientRect().top + window.pageYOffset - getScrollOffset();
    window.scrollTo({
      top,
      behavior: "smooth"
    });
  }

  function scrollToHero() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function updateProgress(step) {
    const current = document.getElementById("progress-current");
    const percent = document.getElementById("progress-percent");
    const fill = document.getElementById("progress-fill");

    if (!current || !percent || !fill) return;

    const answered = step - 1;
    const pct = Math.round((answered / TOTAL_QUESTIONS) * 100);

    current.textContent = answered;
    percent.textContent = `${pct} %`;
    fill.style.width = `${pct}%`;
  }

  function nextStep(current) {
    const currentEl = document.querySelector(`.question[data-step="${current}"]`);
    const nextEl = document.querySelector(`.question[data-step="${current + 1}"]`);
    const error = currentEl ? currentEl.querySelector(".error-message") : null;

    if (!currentEl) return;

    if (!currentEl.querySelector('input[type="radio"]:checked')) {
      if (error) error.classList.add("show");
      return;
    }

    if (error) error.classList.remove("show");
    currentEl.classList.remove("active");

    if (nextEl) {
      nextEl.classList.add("active");
      nextEl.classList.add("entering");

      updateProgress(current + 1);

      setTimeout(() => {
        nextEl.classList.remove("entering");
      }, 350);

      setTimeout(() => {
        scrollToTestTop();
      }, 30);
    } else {
      updateProgress(TOTAL_QUESTIONS + 1);
      showResult();
    }
  }

  function prevStep(current) {
    const currentEl = document.querySelector(`.question[data-step="${current}"]`);
    const prevEl = document.querySelector(`.question[data-step="${current - 1}"]`);
    const result = document.getElementById("result");
    const progressWrap = document.querySelector(".progress-wrap");

    if (result) {
      result.style.display = "none";
    }

    if (progressWrap) {
      progressWrap.style.display = "block";
    }

    if (!currentEl || !prevEl) return;

    currentEl.classList.remove("active");
    currentEl.classList.remove("entering");

    prevEl.classList.add("active");
    updateProgress(current - 1);

    setTimeout(() => {
      scrollToTestTop();
    }, 30);
  }

  function showResult() {
    const activeQuestion = document.querySelector(".question.active");
    const result = document.getElementById("result");
    const progressWrap = document.querySelector(".progress-wrap");

    if (activeQuestion) {
      activeQuestion.classList.remove("active");
    }

    if (progressWrap) {
      progressWrap.style.display = "none";
    }

    if (result) {
      result.style.display = "block";
    }

    setTimeout(() => {
      scrollToTestTop();
    }, 30);
  }

  function initQuestionErrors() {
    document.querySelectorAll(".question").forEach(question => {
      const inputs = question.querySelectorAll('input[type="radio"]');
      const error = question.querySelector(".error-message");

      inputs.forEach(input => {
        input.addEventListener("change", () => {
          if (error) error.classList.remove("show");
        });
      });
    });
  }

  function initHeroButton() {
    const heroBtn = document.getElementById("hero-cta");
    if (!heroBtn) return;

    heroBtn.addEventListener("click", function(event) {
      event.preventDefault();
      scrollToTestTop();
    });
  }

  function initTest() {
    const result = document.getElementById("result");
    const progressWrap = document.querySelector(".progress-wrap");
    const firstQuestion = document.querySelector('.question[data-step="1"]');

    if (result) {
      result.style.display = "none";
    }

    if (progressWrap) {
      progressWrap.style.display = "block";
    }

    document.querySelectorAll(".question").forEach(question => {
      question.classList.remove("active", "entering");
    });

    if (firstQuestion) {
      firstQuestion.classList.add("active");
    }

    updateProgress(1);
    initQuestionErrors();
    initHeroButton();
  }

  document.addEventListener("DOMContentLoaded", initTest);
</script>
