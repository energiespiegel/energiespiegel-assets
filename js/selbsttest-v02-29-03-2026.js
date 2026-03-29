/* <![CDATA[ */

/*
 * WICHTIG – jsDelivr-Cache nach jeder Änderung manuell löschen!
 * Geh auf: https://www.jsdelivr.com/tools/purge
 * und trag die URL ein:
 * https://cdn.jsdelivr.net/gh/energiespiegel/energiespiegel-assets@main/js/selbsttest-v02-29-03-2026.js
 */
(function () {
const allowedHosts = [
  "dein-energiespiegel.de",
  "www.dein-energiespiegel.de",
  "dein-energiespiegelde.netlify.app",
  "dein-energiespiegel.de.netlify.app",
  "localhost",
  "127.0.0.1"
];

  if (!allowedHosts.includes(window.location.hostname)) {
    return;
  }

function gpIsTestPage(path) {
  if (!path) return false;

  return (
    path === "/" ||
    path.indexOf("/selbsttest/") === 0 ||
    path === "/testscript" ||
    path.indexOf("/testscript/") === 0
  );
}
// const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
// if (!gpIsTestPage(currentPath)) {
//   return;
// }

  const GP_FORM_VER = "2026-03-29-1";
  const TOTAL_QUESTIONS = 10;

  console.log("SELBSTTEST AKTIV", GP_FORM_VER);

  var gpTestCompleted = false;
  var gpAbandonSent = false;
  var gpTestStartedAt = Date.now();

  const TRACKING_URL = "https://script.google.com/macros/s/AKfycbxUdClD2csFRGCuPWi9WqX_5kLm5G2K-2nyZpTrZirnHtGtEHuNPWCVnunwtWRi9S6k7Q/exec";

  const GP_FORM_GRUEN = "https://401e9539.sibforms.com/serve/MUIFAB7xEJimOTWDIuRru-zsKDUuFXdIorgj7u8slBnxZl654eKfRdvXPl0lZMPi2cXZWbKy4PkmCJ0pXReKo3A1RFAAP1wdVqjCZZnWCwHyz9EJ7X13EVywq06tSJv3yxcKtthv81PdPFNHR7kn04qD3o2PU8gnvzp3EjkYqt7v6iczUWcFrUoIlSZgDT9VtF0sqWSSa_YOgsRsSg==";
  const GP_FORM_GELB = "https://401e9539.sibforms.com/serve/MUIFABhoIJM37VBTosoxmFVElHBfSLSiE_53ub9w84L-VQsQfMffdqDozvVZPbnnDKprgEOIqSMaXg3OEHwCVcOxz8mcq9wtStO1vgFdpc-9BHrS7fOWFQgWugMYRdv2904s_hbnM-XGza1bZBAJZrDVRte1Wf2gRDdogRcD1L5_EFssxqzbdohDog8UldlJVyCPUAqiWBs7wnJVnQ==";
  const GP_FORM_ROT = "https://401e9539.sibforms.com/serve/MUIFAIXB78-mVd4nt0f0Brwpkd1Gcq-1p8FvVfmVtMWx9iK1uIDEaR_ah0xHQCFTKy08utalxpCnzTLuNcDNSkQlh2HZw_UZMBkrlq5PWODV2XXp1z3pxjwr843Cqhn8WaDq--rVKAItUcesWfmP7czOSMcnmnIh5xkJBRbUOLQtzXH7fQpKe_O7Qg3S8_72R9V5YyBSRxspWxfeSw==";

  function gpFormUrl(status) {
    let base =
      status === "gruen" ? GP_FORM_GRUEN :
      status === "gelb"  ? GP_FORM_GELB :
      status === "rot"   ? GP_FORM_ROT  :
      GP_FORM_GRUEN;

    return base + (base.includes("?") ? "&" : "?") + "v=" + encodeURIComponent(GP_FORM_VER);
  }

  function gpGetSource(utm) {
    try {
      var storedSource = sessionStorage.getItem("gp_attr_source") || "";
      if (storedSource) return storedSource;

      var utmSource = (utm && utm.utm_source ? String(utm.utm_source).toLowerCase() : "");
      var utmMedium = (utm && utm.utm_medium ? String(utm.utm_medium).toLowerCase() : "");

      if (utmSource || utmMedium) {
        if (utmSource === "google" && utmMedium === "cpc") return "Google Ads";
        if ((utmSource === "facebook" || utmSource === "instagram") && utmMedium === "cpc") return "Meta Ads";
        if (utmMedium === "organic") return "Organic Search";
        if (utmMedium === "email") return "Email";
        if (utmMedium === "social") return "Social";
        if (utmSource) return utmSource;
        if (utmMedium) return utmMedium;
      }

      var ref = document.referrer || "";
      if (!ref) return "Direct";

      var host = new URL(ref).hostname.toLowerCase();

      if (host.includes("google.") || host.includes("bing.") || host.includes("duckduckgo.") || host.includes("yahoo.") || host.includes("ecosia.")) {
        return "Organic Search";
      }

      if (host.includes("facebook.") || host.includes("fb.com") || host.includes("instagram.") || host.includes("youtube.")) {
        return "Social";
      }

      if (host.includes("gesundheitspraxis-geistert.de")) {
        return "Internal";
      }

      return host;
    } catch (e) {
      return "Direct";
    }
  }

  function gpGetUTM() {
    try {
      const url = new URL(window.location.href);

      return {
        utm_source: url.searchParams.get("utm_source") || sessionStorage.getItem("gp_attr_utm_source") || "",
        utm_medium: url.searchParams.get("utm_medium") || sessionStorage.getItem("gp_attr_utm_medium") || "",
        utm_campaign: url.searchParams.get("utm_campaign") || sessionStorage.getItem("gp_attr_utm_campaign") || "",
        utm_content: url.searchParams.get("utm_content") || sessionStorage.getItem("gp_attr_utm_content") || "",
        utm_term: url.searchParams.get("utm_term") || sessionStorage.getItem("gp_attr_utm_term") || ""
      };
    } catch (e) {
      return {
        utm_source: sessionStorage.getItem("gp_attr_utm_source") || "",
        utm_medium: sessionStorage.getItem("gp_attr_utm_medium") || "",
        utm_campaign: sessionStorage.getItem("gp_attr_utm_campaign") || "",
        utm_content: sessionStorage.getItem("gp_attr_utm_content") || "",
        utm_term: sessionStorage.getItem("gp_attr_utm_term") || ""
      };
    }
  }

  function gpGetVisitorId() {
    try {
      let visitorId = sessionStorage.getItem("gp_visitor_id");
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        sessionStorage.setItem("gp_visitor_id", visitorId);
      }
      return visitorId;
    } catch (e) {
      return "";
    }
  }

  function gpGetOrCreateTestId() {
    try {
      const path = window.location.pathname.replace(/\/+$/, "") || "/";
      const key = "gp_test_id:" + path;
      let testId = sessionStorage.getItem(key);

      if (!testId) {
        testId = crypto.randomUUID();
        sessionStorage.setItem(key, testId);
      }

      return testId;
    } catch (e) {
      return "";
    }
  }

  function gpGetOrCreateSessionId() {
    try {
      const key = "gp_session_id";
      let sessionId = sessionStorage.getItem(key);

      if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem(key, sessionId);
      }

      return sessionId;
    } catch (e) {
      return "";
    }
  }

  function gpGetDeviceType() {
    try {
      var ua = navigator.userAgent || "";

      if (/ipad|tablet/i.test(ua)) return "tablet";
      if (/mobi|android|iphone|ipod/i.test(ua)) return "mobile";
      return "desktop";
    } catch (e) {
      return "";
    }
  }

  function gpSendTestEvent(result, score) {
    console.log("SEND TEST EVENT", result, score);

    try {
      const utm = gpGetUTM();

      var normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";
      var startedKey = "test_started_at:" + normalizedPath;
      var startedAtRaw = sessionStorage.getItem(startedKey) || "";
      var startedAt = startedAtRaw ? parseInt(startedAtRaw, 10) : gpTestStartedAt;
      var endedAt = Date.now();

      var duration = "";
      var timestampStart = "";
      var timestampEnd = new Date(endedAt).toLocaleString("sv-SE");

      if (startedAt) {
        duration = Math.max(1, Math.round((endedAt - startedAt) / 1000));
        timestampStart = new Date(startedAt).toLocaleString("sv-SE");
      }

      var answeredCount = document.querySelectorAll('.question input[type="radio"]:checked').length;

      const payload = {
        test_id: gpGetOrCreateTestId(),
        visitor_id: gpGetVisitorId(),
        session_id: gpGetOrCreateSessionId(),
        device: gpGetDeviceType(),
        event_type: "test_completed",
        timestamp_start: timestampStart,
        timestamp_end: timestampEnd,
        test_duration_seconds: duration,
        test_page: normalizedPath,
        entry_page: sessionStorage.getItem("journey_entry_page") || "",
        last_page_before_conversion: sessionStorage.getItem("journey_last_non_test_page") || "",
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        utm_content: utm.utm_content,
        utm_term: utm.utm_term,
        source: gpGetSource(utm),
        question_count_answered: answeredCount,
        result: result,
        score: score
      };

      fetch(TRACKING_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      }).catch(function(err) {
        console.error("Tracking Fehler:", err);
      });

    } catch (e) {
      console.error("gpSendTestEvent Fehler:", e);
    }
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function runLoader(callback) {
    var loader = document.getElementById("es-test-loader");
    var bar = document.querySelector(".es-loader-progress");

    if (!loader || !bar) {
      callback();
      return;
    }

    loader.style.display = "block";
    bar.style.width = "0%";

    var y = loader.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: y, behavior: "smooth" });

    var p = 0;

    var timer = setInterval(function() {
      p += Math.random() * 8;

      if (p >= 95) {
        clearInterval(timer);
        bar.style.width = "100%";

        setTimeout(function() {
          loader.style.display = "none";
          bar.style.width = "0%";
          callback();
        }, 400);
      } else {
        bar.style.width = p + "%";
      }
    }, 80);
  }

  function gpFollowupBlock(status) {
    return `
      <div class="es-followup">
        <div class="es-formclip">
          <iframe
            class="es-brevo"
            src="${gpFormUrl(status)}"
            title="Ausführliche Auswertung per E-Mail erhalten"
            frameborder="0"
            scrolling="no"><\/iframe>
        <\/div>
      <\/div>
    `;
  }

  ready(function() {
    var root = document.getElementById("test");
    if (!root) return;

    var currentTestPage = window.location.pathname.replace(/\/+$/, "") || "/";
    var startedKey = "test_started_at:" + currentTestPage;

    gpTestStartedAt = Date.now();
    sessionStorage.setItem(startedKey, gpTestStartedAt.toString());

    sessionStorage.setItem("gp_last_test_page", currentTestPage);
    gpGetOrCreateTestId();
    gpGetOrCreateSessionId();
    gpGetVisitorId();

    var result = document.getElementById("esResult");
    var resTitle = document.getElementById("esResultTitle");
    var resBody = document.getElementById("esResultBody");
    var dot = document.getElementById("esDot");
    var resetBtn = document.getElementById("esResetBtn");
    var progressWrap = document.querySelector(".progress-wrap");
    var firstQuestion = document.querySelector('.question[data-step="1"]');

    if (!result || !resTitle || !resBody || !dot || !resetBtn) {
      return;
    }

    function getScrollOffset() {
      return window.innerWidth <= 700 ? 18 : 36;
    }

    function scrollToTestTop() {
      var testSection = document.getElementById("test");
      if (!testSection) return;

      var top = testSection.getBoundingClientRect().top + window.pageYOffset - getScrollOffset();
      window.scrollTo({
        top: top,
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
      var current = document.getElementById("progress-current");
      var percent = document.getElementById("progress-percent");
      var fill = document.getElementById("progress-fill");

      if (!current || !percent || !fill) return;

      var answered = Math.max(0, step - 1);
      var currentQuestion = Math.min(step, TOTAL_QUESTIONS);
      var pct = Math.round((answered / TOTAL_QUESTIONS) * 100);

      current.textContent = currentQuestion;
      percent.textContent = pct + " %";
      fill.style.width = pct + "%";
    }

    function calculateAndShowResult() {
      var questions = document.querySelectorAll(".question");
      if (!questions.length) return;

      var total = 0;
      var maxTotal = 0;

      questions.forEach(function(question) {
        var w = parseFloat(question.getAttribute("data-w") || "1");
        var checked = question.querySelector('input[type="radio"]:checked');
        var val = checked ? parseInt(checked.value, 10) : 0;

        total += (val * w);
        maxTotal += (4 * w);
      });

      var pct = maxTotal ? Math.round((total / maxTotal) * 100) : 0;

      var status, color, title, body;

      if (pct <= 25) {
        status = "gruen";
        color = "#6f9f85";
        title = "GRÜN – Stabil";
        body = `
<p><strong>Ihr Ergebnis zeigt eine stabile, gut regulierte Basis</strong> – Einordnung aus langjähriger Erfahrung in der Gesundheitspraxis.</p>
<p>Wie Sie diese Basis gezielt erhalten, zeigen wir Ihnen in Ihrer Auswertung per E-Mail.</p>
<ul class="es-result-checklist">
  <li>Was Ihre Vitalität langfristig nährt</li>
  <li>Wie Sie Ihr biologisches Alter positiv beeinflussen</li>
  <li>Impulse für stabile Gesundheit</li>
</ul>
<div class="es-email-hint">
  Wohin dürfen wir Ihre persönliche Auswertung senden?
</div>
${gpFollowupBlock("gruen")}
`;
      } else if (pct <= 55) {
        status = "gelb";
        color = "#c8a64a";
        title = "GELB – Aufbauen";
        body = `
<p><strong>Ihr Ergebnis zeigt erste Anzeichen von Ungleichgewicht</strong> – Einordnung aus langjähriger Erfahrung in der Gesundheitspraxis.</p>
<p>Was das konkret für Sie bedeutet, zeigen wir Ihnen in Ihrer Auswertung per E-Mail.</p>
<ul class="es-result-checklist">
  <li>Wo Ihre größten Krafträuber liegen</li>
  <li>Was jetzt am wichtigsten ist</li>
  <li>Nächste konkrete Schritte</li>
</ul>
<div class="es-email-hint">
  Wohin dürfen wir Ihre persönliche Auswertung senden?
</div>
${gpFollowupBlock("gelb")}
`;
      } else {
        status = "rot";
        color = "#b55353";
        title = "ROT – Entlasten";
        body = `
<p><strong>Ihr Ergebnis zeigt aktuell eine spürbare Belastung</strong> – Einordnung aus langjähriger Erfahrung in der Gesundheitspraxis.</p>
<p>Was jetzt wirklich entlastet, zeigen wir Ihnen in Ihrer Auswertung per E-Mail.</p>
<ul class="es-result-checklist">
  <li>Wie Sie Ihre Krafträuber erkennen</li>
  <li>Was wieder Stabilität bringt</li>
  <li>Erste Schritte zur Entlastung</li>
</ul>
<div class="es-email-hint">
  Wohin dürfen wir Ihre persönliche Auswertung senden?
</div>
${gpFollowupBlock("rot")}
`;
      }

      var activeQuestion = document.querySelector(".question.active");
      if (activeQuestion) {
        activeQuestion.classList.remove("active");
      }

      if (progressWrap) {
        progressWrap.style.display = "none";
      }

      runLoader(function() {
        dot.style.background = color;
        dot.style.boxShadow = "0 0 0 6px rgba(0,0,0,.06)";
        resTitle.textContent = title;
        result.setAttribute("data-status", status);
        resBody.innerHTML = body;
        result.style.display = "block";

        gpTestCompleted = true;
        gpSendTestEvent(status, pct);

        if (typeof gtag === "function") {
          gtag("event", "longevity_test_result", {
            event_category: "longevity",
            event_label: status
          });
        }

        setTimeout(function() {
          scrollToTestTop();
        }, 30);
      });
    }

    function nextStep(current) {
      var currentEl = document.querySelector('.question[data-step="' + current + '"]');
      var nextEl = document.querySelector('.question[data-step="' + (current + 1) + '"]');
      var error = currentEl ? currentEl.querySelector(".error-message") : null;

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

        setTimeout(function() {
          nextEl.classList.remove("entering");
        }, 350);

        setTimeout(function() {
          scrollToTestTop();
        }, 30);
      } else {
        updateProgress(TOTAL_QUESTIONS + 1);
        calculateAndShowResult();
      }
    }

    function prevStep(current) {
      var currentEl = document.querySelector('.question[data-step="' + current + '"]');
      var prevEl = document.querySelector('.question[data-step="' + (current - 1) + '"]');

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

      setTimeout(function() {
        scrollToTestTop();
      }, 30);
    }

    function initQuestionErrors() {
      document.querySelectorAll(".question").forEach(function(question) {
        var inputs = question.querySelectorAll('input[type="radio"]');
        var error = question.querySelector(".error-message");

        inputs.forEach(function(input) {
          input.addEventListener("change", function() {
            if (error) error.classList.remove("show");
          });
        });
      });
    }

    function initHeroButton() {
      var heroBtn = document.getElementById("hero-cta");
      if (!heroBtn) return;

      heroBtn.addEventListener("click", function(event) {
        event.preventDefault();
        scrollToTestTop();
      });
    }

    function initTest() {
      if (result) {
        result.style.display = "none";
      }

      if (progressWrap) {
        progressWrap.style.display = "block";
      }

      document.querySelectorAll(".question").forEach(function(question) {
        question.classList.remove("active", "entering");
      });

      if (firstQuestion) {
        firstQuestion.classList.add("active");
      }

      updateProgress(1);
      initQuestionErrors();
      initHeroButton();
    }

    resetBtn.addEventListener("click", function() {
      document.querySelectorAll('.question input[type="radio"]').forEach(function(input) {
        input.checked = false;
      });

      document.querySelectorAll(".question").forEach(function(question) {
        question.classList.remove("active", "entering");
        var error = question.querySelector(".error-message");
        if (error) error.classList.remove("show");
      });

      result.style.display = "none";
      resBody.innerHTML = "";
      dot.style.background = "#999";

      if (progressWrap) {
        progressWrap.style.display = "block";
      }

      if (firstQuestion) {
        firstQuestion.classList.add("active");
      }

      updateProgress(1);
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    window.nextStep = nextStep;
    window.prevStep = prevStep;
    window.scrollToHero = scrollToHero;

    initTest();
  });

  function gpSendAbandonEvent(trigger) {
    try {
      if (gpTestCompleted) return;
      if (gpAbandonSent) return;

      var answered = document.querySelectorAll('.question input[type="radio"]:checked').length;

      gpAbandonSent = true;

      var normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";
      var startedKey = "test_started_at:" + normalizedPath;
      var startedAtRaw = sessionStorage.getItem(startedKey) || "";
      var startedAt = startedAtRaw ? parseInt(startedAtRaw, 10) : gpTestStartedAt;
      var endedAt = Date.now();

      var duration = "";
      var timestampStart = "";
      var timestampEnd = new Date(endedAt).toLocaleString("sv-SE");

      if (startedAt) {
        duration = Math.max(1, Math.round((endedAt - startedAt) / 1000));
        timestampStart = new Date(startedAt).toLocaleString("sv-SE");
      }

      var utm = gpGetUTM();
      var eventType = answered > 0 ? "test_abandoned" : "test_open_no_start";

      var payload = {
        test_id: gpGetOrCreateTestId(),
        visitor_id: gpGetVisitorId(),
        session_id: gpGetOrCreateSessionId(),
        device: gpGetDeviceType(),
        event_type: eventType,
        question_last_seen: answered,
        question_count_abandoned: answered,
        question_count_answered: answered,
        trigger: trigger || "",
        timestamp_start: timestampStart,
        timestamp_end: timestampEnd,
        test_duration_seconds: duration,
        test_page: normalizedPath,
        entry_page: sessionStorage.getItem("journey_entry_page") || "",
        last_page_before_conversion: sessionStorage.getItem("journey_last_non_test_page") || "",
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        utm_content: utm.utm_content,
        utm_term: utm.utm_term,
        source: gpGetSource(utm)
      };

      try {
        var blob = new Blob(
          [JSON.stringify(payload)],
          { type: "text/plain;charset=utf-8" }
        );
        navigator.sendBeacon(TRACKING_URL, blob);
      } catch (e) {}
    } catch (e) {
      console.error("gpSendAbandonEvent Fehler:", e);
    }
  }

  window.addEventListener("pagehide", function() {
    var normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";
    if (gpIsTestPage(normalizedPath)) {
      gpSendAbandonEvent("pagehide");
    }
  });

})();

/* ]]> */
