export async function handler() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  const channel = "rootbeer65";

  try {
    const tokenRes = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
      { method: "POST" }
    );
    if (!tokenRes.ok) {
      const t = await tokenRes.text();
      return { statusCode: 502, body: `token request failed: ${t}` };
    }
    const { access_token } = await tokenRes.json();

    const r = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${encodeURIComponent(channel)}`,
      { headers: { "Client-ID": clientId, "Authorization": `Bearer ${access_token}` } }
    );
    if (!r.ok) {
      const t = await r.text();
      return { statusCode: 502, body: `streams request failed: ${t}` };
    }
    const data = await r.json();
    const live = Array.isArray(data.data) && data.data.length > 0;

    return {
      statusCode: 200,
      body: JSON.stringify({ live, data: live ? data.data[0] : null })
    };
  } catch (e) {
    return { statusCode: 500, body: `server error: ${e.message}` };
  }
}