/* RiceLab – user experience scripts: font size, high contrast, gallery filter, character counter */
(function () {
  "use strict";
  var root = document.documentElement;
  var size = 100;
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage not available */ } }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function applySize() { root.style.fontSize = size + "%"; }
  var storedSize = parseInt(load("ricelab-size"), 10);
  if (storedSize >= 80 && storedSize <= 160) { size = storedSize; applySize(); }
  if (load("ricelab-hc") === "1") { root.classList.add("hc"); }
  var down = document.getElementById("font-down");
  var up = document.getElementById("font-up");
  var hc = document.getElementById("contrast-toggle");
  if (hc) { hc.setAttribute("aria-pressed", root.classList.contains("hc") ? "true" : "false"); }
  if (down) { down.addEventListener("click", function () { if (size > 80) { size -= 10; applySize(); save("ricelab-size", size); } }); }
  if (up) { up.addEventListener("click", function () { if (size < 160) { size += 10; applySize(); save("ricelab-size", size); } }); }
  if (hc) {
    hc.addEventListener("click", function () {
      var on = root.classList.toggle("hc");
      hc.setAttribute("aria-pressed", on ? "true" : "false");
      save("ricelab-hc", on ? "1" : "0");
    });
  }
  var filters = document.querySelectorAll(".filters button");
  var cards = document.querySelectorAll(".card");
  var status = document.getElementById("filter-status");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      var shown = 0;
      filters.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      cards.forEach(function (c) {
        var cats = (c.getAttribute("data-category") || "").split(" ");
        var ok = f === "all" || cats.indexOf(f) !== -1;
        c.hidden = !ok;
        if (ok) { shown += 1; }
      });
      if (status) { status.textContent = "Showing " + shown + " of " + cards.length + " setups."; }
    });
  });
  var area = document.getElementById("setup");
  var count = document.getElementById("count");
  if (area && count) {
    area.addEventListener("input", function () { count.textContent = area.value.length; });
    var form = area.form;
    if (form) { form.addEventListener("reset", function () { count.textContent = "0"; }); }
  }
})();
