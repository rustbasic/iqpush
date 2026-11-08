(() => {
  const renderTimeoutMs = 10000;
  let appStarted = false;
  let firstFramePresented = false;
  let loadTimeout;
  let renderTimeout;
  let manualButtonTimeout;

  const switchToWebGl2 = () => {
    window.location.replace("../webgl2/");
  };

  const showManualSwitch = () => {
    if (document.getElementById("webgl2-fallback-button")) return;

    const button = document.createElement("button");
    button.id = "webgl2-fallback-button";
    button.type = "button";
    button.textContent = "Switch to WebGL2";
    button.setAttribute("aria-label", "Switch to WebGL2 graphics");
    Object.assign(button.style, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: "2147483647",
      padding: "8px 12px",
      border: "1px solid #888",
      borderRadius: "4px",
      background: "rgba(0, 0, 0, 0.75)",
      color: "white",
      font: "14px sans-serif",
    });
    button.addEventListener("click", switchToWebGl2);
    document.body.appendChild(button);
  };

  const scheduleManualSwitch = () => {
    if (manualButtonTimeout !== undefined) return;
    manualButtonTimeout = window.setTimeout(showManualSwitch, renderTimeoutMs);
  };

  // Start the render grace period only after Trunk has finished initializing the WASM module.
  window.addEventListener("TrunkApplicationStarted", () => {
    appStarted = true;
    window.clearTimeout(loadTimeout);
    if (firstFramePresented) {
      scheduleManualSwitch();
    } else {
      renderTimeout = window.setTimeout(switchToWebGl2, renderTimeoutMs);
    }
  }, { once: true });

  // Keep a longer safety timeout for a module download or initialization that never completes.
  loadTimeout = window.setTimeout(switchToWebGl2, 60000);

  window.addEventListener("iqpush-first-frame", () => {
    firstFramePresented = true;
    window.clearTimeout(renderTimeout);
    if (appStarted) scheduleManualSwitch();
  }, { once: true });
})();