function mountReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
  );

  targets.forEach((el) => observer.observe(el));
}

function mountCopy() {
  document.querySelectorAll("[data-ca]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const ca = btn.getAttribute("data-ca");
      if (!ca) return;
      try {
        await navigator.clipboard.writeText(ca);
      } catch {
        const input = document.createElement("input");
        input.value = ca;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
      }
      btn.classList.add("is-copied");
      const label = btn.querySelector(".ca__label");
      const prev = label ? label.textContent : "";
      if (label) label.textContent = "COPIED";
      window.setTimeout(() => {
        btn.classList.remove("is-copied");
        if (label) label.textContent = prev || "CA";
      }, 1400);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mountReveal();
  mountCopy();
});
