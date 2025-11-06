const statusEl = document.getElementById("twitch-status");
const linkEl = document.getElementById("twitch-link");

async function checkLive() {
  try {
    const res = await fetch("/.netlify/functions/live");
    const { live } = await res.json();

    const statusEl = document.getElementById("twitch-status");
    const linkEl = document.getElementById("twitch-link");
    linkEl.href = "https://twitch.tv/rootbeer65";

    if (live) {
      linkEl.textContent = "🟣 LIVE NOW on Twitch!";
      statusEl.classList.add("live-now");
    } else {
      linkEl.textContent = "🔘 Offline";
      statusEl.classList.remove("live-now");
    }
  } catch (err) {
    console.error("Live check failed:", err);
  }
}

checkLive();
setInterval(checkLive, 60000);