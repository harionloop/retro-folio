'use client'

export function GlobalStyles() {
  return (
    <style jsx global>{`
      html,
      body {
        background: #000;
      }
      .pixelated {
        image-rendering: pixelated;
        image-rendering: crisp-edges;
      }
      .nav-link {
        padding: 6px 10px;
        border-radius: 10px;
        border: 1px solid transparent;
      }
      .nav-link:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.12);
      }
      .blink {
        animation: blink 1s steps(2, start) infinite;
      }
      @keyframes blink {
        to {
          visibility: hidden;
        }
      }
      .icon-btn {
        display: inline-grid;
        place-items: center;
        height: 28px;
        width: 28px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
      }
      .icon-btn:hover {
        background: rgba(255, 255, 255, 0.12);
      }
      .kbd {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        padding: 0.15rem 0.4rem;
        border-radius: 0.4rem;
      }
    `}</style>
  );
}
