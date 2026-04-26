document.addEventListener("DOMContentLoaded", () => {
    initAdmin1();
});

let currentUser = null;
const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const userInfo = document.getElementById("user-info");
const userEmailSpan = document.getElementById("user-email");

window.showToast = function (message, type = "success") {
    const existing = document.getElementById("custom-toast");
    if (existing) existing.remove();
  
    const toast = document.createElement("div");
    toast.id = "custom-toast";
    toast.className =
      "fixed bottom-4 right-4 z-[100] px-6 py-3 rounded-lg shadow-xl font-medium text-white transition-all duration-300 transform translate-y-full opacity-0 flex items-center gap-2";
  
    let icon = "info";
    if (type === "success") {
      toast.classList.add("bg-green-600", "dark:bg-green-700");
      icon = "check_circle";
    } else if (type === "error") {
      toast.classList.add("bg-red-600", "dark:bg-red-700");
      icon = "error";
    } else {
      toast.classList.add("bg-gray-800", "dark:bg-gray-700");
    }
  
    toast.innerHTML = `<span class="material-symbols-outlined">${icon}</span> <span>${message}</span>`;
    document.body.appendChild(toast);
  
    setTimeout(() => toast.classList.remove("translate-y-full", "opacity-0"), 10);
    setTimeout(() => {
      toast.classList.add("translate-y-full", "opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
};

async function initAdmin1() {
    window.supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
            currentUser = session.user;
            showDashboard();
        } else {
            currentUser = null;
            showLogin();
        }
    });

    document.getElementById("login-form").addEventListener("submit", handleLogin);
    document.getElementById("logout-btn").addEventListener("click", handleLogout);
    document.getElementById("event-form").addEventListener("submit", handleSaveEvent);
}

function showLogin() {
    loginSection.classList.remove("hidden");
    dashboardSection.classList.add("hidden");
    userInfo.classList.add("hidden");
}

async function showDashboard() {
    loginSection.classList.add("hidden");
    dashboardSection.classList.remove("hidden");
    userInfo.classList.remove("hidden");
    userEmailSpan.textContent = currentUser.email;

    try {
        const settings = await window.settingsDb.getAll();
        if (settings.active_event) {
            document.getElementById("active-event").value = settings.active_event;
        }
    } catch (e) {
        console.error("Failed to load settings", e);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const { error } = await window.supabase.auth.signInWithPassword({ email, password });
    if (error) {
        const errDiv = document.getElementById("login-error");
        errDiv.textContent = error.message;
        errDiv.classList.remove("hidden");
    }
}

async function handleLogout() {
    await window.supabase.auth.signOut();
}

async function handleSaveEvent(e) {
    e.preventDefault();
    const btn = document.getElementById("save-btn");
    btn.disabled = true;
    try {
        const activeEvent = document.getElementById("active-event").value;
        await window.settingsDb.update("active_event", activeEvent);
        showToast("Event saved successfully!");
    } catch (err) {
        showToast("Failed to save event", "error");
        console.error(err);
    } finally {
        btn.disabled = false;
    }
}
