(function () {
  const qrTarget = "https://aydope.github.io";
  function qrSize() {
    const w = window.innerWidth;
    if (w <= 340) return 140;
    if (w <= 400) return 150;
    if (w <= 460) return 160;
    return 180;
  }

  function initQR() {
    const qrEl = document.getElementById("qrcode");
    if (!qrEl || typeof QRCode === "undefined") {
      setTimeout(initQR, 150);
      return;
    }
    qrEl.innerHTML = "";
    const size = qrSize();
    new QRCode(qrEl, {
      text: qrTarget,
      width: size,
      height: size,
      colorDark: "#0a0a0d",
      colorLight: "#f5f5f1",
      correctLevel: QRCode.CorrectLevel.H,
    });
  }
  initQR();

  function initBarcode() {
    const svg = document.getElementById("barcodeSvg");
    if (!svg || typeof JsBarcode === "undefined") {
      setTimeout(initBarcode, 200);
      return;
    }
    try {
      JsBarcode(svg, "AMN20060001IRN", {
        format: "CODE128",
        width: 1.6,
        height: 50,
        displayValue: false,
        margin: 0,
        background: "transparent",
        lineColor: "#0a0a0d",
      });
    } catch (e) {
      console.warn("Barcode error:", e);
    }
  }
  initBarcode();

  const flipper = document.getElementById("cardFlipper");
  let rotationY = 0;
  let baseRotation = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartRotation = 0;
  let dragMoved = false;

  function applyRotation() {
    flipper.style.transform = `rotateY(${rotationY}deg)`;
  }

  function snapToBase() {
    const target = Math.round(rotationY / 180) * 180;
    rotationY = target;
    baseRotation = ((rotationY % 360) + 360) % 360;
    flipper.style.transition = "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)";
    applyRotation();
    setTimeout(() => {
      flipper.style.transition = "";
    }, 900);
  }

  function toggleFlip() {
    if (isDragging) return;
    baseRotation = baseRotation === 0 ? 180 : 0;
    rotationY = baseRotation;
    flipper.style.transition = "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)";
    applyRotation();
    setTimeout(() => {
      flipper.style.transition = "";
    }, 900);
  }

  flipper.addEventListener("pointerdown", (e) => {
    if (
      e.target.closest(".social-item") ||
      e.target.closest(".contact-item") ||
      e.target.closest(".id-photo")
    )
      return;
    isDragging = true;
    dragMoved = false;
    dragStartX = e.clientX;
    dragStartRotation = rotationY;
    flipper.classList.add("dragging");
    try {
      flipper.setPointerCapture(e.pointerId);
    } catch (_) {}
  });

  flipper.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX;
    if (Math.abs(dx) > 4) dragMoved = true;
    rotationY = dragStartRotation + dx * 0.6;
    applyRotation();
  });

  flipper.addEventListener("pointerup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    flipper.classList.remove("dragging");
    try {
      flipper.releasePointerCapture(e.pointerId);
    } catch (_) {}

    if (dragMoved) snapToBase();
    else toggleFlip();
  });

  flipper.addEventListener("pointercancel", () => {
    if (!isDragging) return;
    isDragging = false;
    flipper.classList.remove("dragging");
    snapToBase();
  });

  const idPhoto = document.getElementById("idPhoto");
  const zoomModal = document.getElementById("zoomModal");
  const zoomImg = document.getElementById("zoomImg");
  const zoomClose = document.getElementById("zoomClose");
  const photoSrc = idPhoto.querySelector("img").src;

  function openZoom() {
    zoomImg.src = photoSrc;
    zoomModal.classList.add("open");
  }
  function closeZoom() {
    zoomModal.classList.remove("open");
  }

  idPhoto.addEventListener("dblclick", (e) => {
    e.stopPropagation();
    openZoom();
  });

  zoomModal.addEventListener("click", (e) => {
    if (
      e.target === zoomModal ||
      e.target === zoomClose ||
      e.target.closest(".zoom-close")
    ) {
      closeZoom();
    }
  });

  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toastText");
  let toastTimer;

  function showToast(msg) {
    toastText.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  }

  document.querySelectorAll(".contact-item").forEach((item) => {
    item.addEventListener("click", async (e) => {
      e.stopPropagation();
      const value = item.getAttribute("data-copy");
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
      } catch (_) {
        const ta = document.createElement("textarea");
        ta.value = value;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
        } catch (e2) {}
        document.body.removeChild(ta);
      }
      item.classList.add("copied");
      setTimeout(() => item.classList.remove("copied"), 900);
      showToast("Copied: " + value);
    });
  });

  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });

  let lastBucket = qrSize();
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newBucket = qrSize();
      if (Math.abs(newBucket - lastBucket) >= 20) {
        lastBucket = newBucket;
        initQR();
      }
    }, 300);
  });
})();
