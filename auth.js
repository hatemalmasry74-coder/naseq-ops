// ===== NASAQ Simple Auth (Local MVP) =====
const AUTH_KEY = "nasaq_auth_user";

function login(email, password) {
  if (email === "admin@nasaq.local" && password === "admin123") {
    const user = {
      email,
      name: "Admin – NASAQ",
      role: "admin",
      loginAt: new Date().toISOString()
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

function getCurrentUser() {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
  }
}

function mountUserBadge() {
  const user = getCurrentUser();
  if (!user) return;

  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  const box = document.createElement("div");
  box.style.display = "flex";
  box.style.alignItems = "center";
  box.style.gap = "8px";

  box.innerHTML = `
    <span class="pill ok">${user.name}</span>
    <button class="btn secondary" onclick="logout()">خروج</button>
  `;

  topbar.appendChild(box);
}
