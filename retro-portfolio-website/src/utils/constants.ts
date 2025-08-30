export const Sound = {
  muted: false,
  key: typeof window !== "undefined" ? new Audio("/sounds/key.mp3") : null,
  beep: typeof window !== "undefined" ? new Audio("/sounds/beep.mp3") : null,
  play(a: HTMLAudioElement | null) {
    if (!a || Sound.muted) return;
    try {
      a.currentTime = 0;
      a.play();
    } catch {}
  },
};
