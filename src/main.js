(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const flipper = $("#cardFlipper");
  const front = $(".card-front");
  const back = $(".card-back");
  const toast = $("#toast");
  const toastText = $("#toastText");
  const zoomModal = $("#zoomModal");
  const zoomImg = $("#zoomImg");
  const SITE = "https://aydope.github.io";
  const ID_NO = "AMN-2006-0001";

  /* ---------- Flip / drag ---------- */
  let rot = 0,
    startX = 0,
    startRot = 0,
    down = false,
    moved = false,
    tapOnPhoto = false;

  const render = () => flipper.style.setProperty("--ry", rot + "deg");
  const syncFaces = () => {
    const frontVisible = ((Math.round(rot / 180) % 2) + 2) % 2 === 0;
    front.inert = !frontVisible;
    back.inert = frontVisible;
    front.setAttribute("aria-hidden", String(!frontVisible));
    back.setAttribute("aria-hidden", String(frontVisible));
  };
  const flip = () => {
    rot = (Math.round(rot / 180) + 1) * 180;
    render();
    syncFaces();
  };

  flipper.addEventListener("pointerdown", (e) => {
    if (e.button > 0 || e.target.closest("a,.contact-item")) return;
    down = true;
    moved = false;
    startX = e.clientX;
    startRot = rot;
    tapOnPhoto = !!e.target.closest("#idPhoto");
    flipper.setPointerCapture(e.pointerId);
  });
  flipper.addEventListener("pointermove", (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 6) {
      moved = true;
      flipper.classList.add("dragging");
    }
    if (moved) {
      rot = startRot + dx * 0.5;
      render();
    }
  });
  const end = () => {
    if (!down) return;
    down = false;
    flipper.classList.remove("dragging");
    if (moved) {
      rot = Math.round(rot / 180) * 180;
      render();
      syncFaces();
    } else if (!tapOnPhoto) flip();
  };
  flipper.addEventListener("pointerup", end);
  flipper.addEventListener("pointercancel", () => {
    down = false;
    flipper.classList.remove("dragging");
    rot = Math.round(rot / 180) * 180;
    render();
  });
  flipper.addEventListener("keydown", (e) => {
    if (e.target !== flipper) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flip();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      flip();
    }
  });
  syncFaces();

  /* ---------- Copy to clipboard ---------- */
  let toastTimer;
  const showToast = (msg) => {
    toastText.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  };
  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const t = document.createElement("textarea");
      t.value = text;
      t.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(t);
      t.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {}
      t.remove();
      return ok;
    }
  };
  document.querySelectorAll(".contact-item").forEach((el) => {
    const act = async () =>
      showToast((await copyText(el.dataset.copy)) ? "Copied" : "Copy failed");
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      act();
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        act();
      }
    });
  });

  /* ---------- Photo zoom ---------- */
  const openZoom = () => {
    zoomImg.src = $("#idPhoto img").src;
    zoomModal.classList.add("open");
    $("#zoomClose").focus();
  };
  const closeZoom = () => {
    zoomModal.classList.remove("open");
    flipper.focus({ preventScroll: true });
  };
  $("#idPhoto").addEventListener("dblclick", openZoom);
  zoomModal.addEventListener("click", closeZoom);
  $("#zoomClose").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeZoom();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && zoomModal.classList.contains("open")) closeZoom();
  });

  /* ---------- QR code (regenerates on resize) ---------- */
  const buildQR = () => {
    const el = $("#qrcode");
    if (!el || typeof QRCode === "undefined") return;
    const size =
      Math.max(
        64,
        Math.round(
          el.parentElement.clientWidth * (window.devicePixelRatio || 1) * 1.5,
        ),
      ) || 160;
    el.innerHTML = "";
    new QRCode(el, {
      text: SITE,
      width: size,
      height: size,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M,
    });
  };

  /* ---------- Barcode (Code128) ---------- */
  const buildBarcode = () => {
    const svg = $("#barcodeSvg");
    if (!svg || typeof JsBarcode === "undefined") return;
    JsBarcode(svg, ID_NO, {
      format: "CODE128",
      displayValue: false,
      margin: 0,
      height: 60,
      width: 2,
      background: "transparent",
      lineColor: "#000",
    });
    const w = parseFloat(svg.getAttribute("width")),
      h = parseFloat(svg.getAttribute("height"));
    if (w && h) {
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.setAttribute("preserveAspectRatio", "none");
      svg.removeAttribute("width");
      svg.removeAttribute("height");
    }
  };

  const init = () => {
    buildQR();
    buildBarcode();
  };
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();

  let rt;
  let lastW = innerWidth;
  addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      if (innerWidth !== lastW) {
        lastW = innerWidth;
        buildQR();
      }
    }, 200);
  });
})();
