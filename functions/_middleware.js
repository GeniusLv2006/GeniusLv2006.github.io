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
        body { margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; /* 垂直居中 */ min-height: 100vh; /* 确保占满视口高度 */ }
        .icon-box { margin-bottom: 25px; /* 增加图标与文字的间距 */ }
        .icon-box svg { width: 80px; height: 80px; fill: #E0E0E0; }
        h2 { font-size: 22px; color: #333; margin-bottom: 15px; font-weight: 600; } /* 增加标题和段落间距 */
        p { font-size: 15px; color: #666; text-align: center; line-height: 1.6; padding: 0 40px; margin-bottom: 0; /* 移除段落底部默认间距 */ }
        .instruction-arrow { position: absolute; top: 20px; right: 20px; font-size: 30px; color: #666; font-weight: bold; animation: pulse 1.5s infinite; /* 添加跳动动画 */ }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      </style>
    </head>
    <body>
      <div class="instruction-arrow">→</div>

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
