// auth.js — NASAQ Local MVP Auth
// حساب تجريبي: admin@nasaq.local / admin123

(function () {
  const AUTH_KEY = "naseq_auth_v1";

  function safeParse(raw) {
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  function isAuthed() {
    return !!localStorage.getItem(AUTH_KEY);
  }

  function currentUser() {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? safeParse(raw) : null;
  }

  function login(email, password) {
    const e = (email || "").trim().toLowerCase();
    const p = (password || "").trim();

    // MVP local account (ثابت)
    if (e === "admin@nasaq.local" && p === "admin123") {
      const user = {
        email: e,
        name: "Nasaq Admin",
        role: "admin",
        createdAt: new Date().toISOString()
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = "login.html";
  }

  function requireAuth() {
    // لا تعمل redirect داخل صفحة login نفسها
    const page = (location.pathname.split("/").pop() || "").toLowerCase();
    if (page === "login.html") return;

    if (!isAuthed()) {
      window.location.href = "login.html";
    }
  }

  // expose globally
  window.NASAQ_AUTH_KEY = AUTH_KEY;
  window.isAuthed = isAuthed;
  window.currentUser = currentUser;
  window.login = login;
  window.logout = logout;
  window.requireAuth = requireAuth;
})();
