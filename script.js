const channel = "rootbeer65"; // Twitch username
const clientId = "da56qo4qhzub3uwlyz5olshoopoa1u";
const token = "ezfgnew1184zql8uyu707msy769ujj";

const statusEl = document.getElementById("twitch-status");
const linkEl = document.getElementById("twitch-link");

async function checkLive() {
  try {
    const res = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=rootbeer65`,
      {
        headers: {
          "Client-ID": clientId,
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    // always make sure the link points to the current channel
    linkEl.href = `https://twitch.tv/${channel}`;

    if (Array.isArray(data.data) && data.data.length > 0) {
      linkEl.textContent = "🟣 LIVE NOW on Twitch!";
      statusEl.classList.add("live-now");
    } else {
      linkEl.textContent = "🔘 Offline";
      statusEl.classList.remove("live-now");
    }
  } catch (e) {
    console.error("Twitch API error:", e);
  }
}

checkLive();
setInterval(checkLive, 60000);