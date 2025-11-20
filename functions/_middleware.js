export async function onRequest(context) {
  const request = context.request;
  const userAgent = request.headers.get("User-Agent") || "";

  // Detect WeChat (MicroMessenger)
  if (userAgent.includes("MicroMessenger")) {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Open in Browser</title>
      <style>
        body { margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; flex-direction: column; align-items: center; height: 100vh; }
        .icon-box { margin-top: 80px; margin-bottom: 20px; }
        .icon-box svg { width: 80px; height: 80px; fill: #E0E0E0; }
        h2 { font-size: 22px; color: #333; margin-bottom: 10px; font-weight: 600; }
        p { font-size: 15px; color: #666; text-align: center; line-height: 1.6; padding: 0 40px; }
        .arrow { position: absolute; top: 10px; right: 20px; animation: bounce 1.5s infinite; }
        @keyframes bounce { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(5px, -5px); } }
      </style>
    </head>
    <body>
      <div class="arrow">
        <svg viewBox="0 0 1024 1024" width="40" height="40">
          <path d="M685.2 158.5c2.3 0 4.6 0.5 6.9 1.3 6.9 2.7 11.7 9.4 11.7 17.1v167.8c0 7.7-4.8 14.5-11.8 17.2-2.2 0.9-4.6 1.3-6.9 1.3-5 0-9.9-2-13.4-5.6l-43.7-43.7c-54.2 64.2-135.6 105.5-226.2 105.5-163.8 0-296.6-132.8-296.6-296.6 0-163.8 132.8-296.6 296.6-296.6 62.6 0 121 19.4 170.1 52.6 7.1 4.8 16.6 3.9 22.7-2.2l37.7-37.7c5.7-5.7 6.4-14.6 1.5-21.1C771 131.6 691 104.1 605.2 104.1c-221.1 0-400.4 179.3-400.4 400.4S384.1 904.9 605.2 904.9c124.2 0 234.8-56.7 306.5-145.7 5-6.1 4.3-15.1-1.5-20.8l-38.3-37.7c-6-5.9-15.6-6.7-22.5-1.9-55.9 39.1-123.8 62.2-197.2 62.2-192.3 0-348.5-156.2-348.5-348.5 0-192.3 156.2-348.5 348.5-348.5 83 0 159.4 29.2 219.8 77.8l-45.6 45.6c-3.6 3.6-5.6 8.4-5.6 13.4 0.1 0 0.1 0 0 0z" fill="#aaa"></path>
          <path d="M861 65.6L659.8 266.8c-5.7 5.7-5.7 14.8 0 20.5 5.7 5.7 14.8 5.7 20.5 0L881.5 86.1 861 65.6z" fill="#aaa"></path>
        </svg>
      </div>

      <div class="icon-box">
         <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
      </div>
      <h2>Open in System Browser</h2>
      <p>This page cannot be opened directly in WeChat.<br><br>Please tap the menu <strong>...</strong> at the top right corner<br>and select <strong>Open in Browser</strong>.</p>
    </body>
    </html>
    `;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  }

  // Not WeChat? Continue normally.
  return context.next();
}
