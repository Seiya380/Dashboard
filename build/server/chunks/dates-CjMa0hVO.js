function now() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
function dayOfYear(date = /* @__PURE__ */ new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 864e5);
}
function formatDate(iso, opts) {
  return new Date(iso).toLocaleDateString(void 0, opts ?? { month: "short", day: "numeric" });
}
function formatTime(iso) {
  return new Date(iso).toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
}
function isToday(iso) {
  const d = new Date(iso);
  const t = /* @__PURE__ */ new Date();
  return d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth() && d.getDate() === t.getDate();
}
function isTomorrow(iso) {
  const d = new Date(iso);
  const t = /* @__PURE__ */ new Date();
  t.setDate(t.getDate() + 1);
  return d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth() && d.getDate() === t.getDate();
}

export { formatDate as a, isTomorrow as b, dayOfYear as d, formatTime as f, isToday as i, now as n };
//# sourceMappingURL=dates-CjMa0hVO.js.map
