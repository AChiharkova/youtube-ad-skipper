// Идея: YouTube вешает на плеер класс "ad-showing", пока идёт реклама.
// Пока он есть — выключаем звук, ускоряем видео в 16 раз, перематываем в конец
// и жмём «Пропустить», если кнопка появилась. Когда реклама кончилась — возвращаем как было.

const SKIP_BUTTONS = [
  ".ytp-skip-ad-button",
  ".ytp-ad-skip-button",
  ".ytp-ad-skip-button-modern",
];

let saved = null; // звук и скорость пользователя до начала рекламы

function tick() {
  const player = document.querySelector(".html5-video-player");
  const video = player && player.querySelector("video");
  if (!video) return;

  const adPlaying = player.classList.contains("ad-showing");

  if (adPlaying) {
    // Запоминаем настройки один раз — в начале рекламы
    if (!saved) saved = { muted: video.muted, rate: video.playbackRate };

    video.muted = true;
    video.playbackRate = 16;
    // Перемотка в конец рекламного ролика
    if (isFinite(video.duration) && video.duration > 0) {
      video.currentTime = Math.max(video.duration - 0.1, 0);
    }
    for (const sel of SKIP_BUTTONS) {
      const btn = document.querySelector(sel);
      if (btn) btn.click();
    }
  } else if (saved) {
    // Реклама закончилась — возвращаем звук и скорость
    video.muted = saved.muted;
    video.playbackRate = saved.rate;
    saved = null;
  }
}

// Проверяем 4 раза в секунду: дёшево и надёжнее, чем ловить события YouTube
setInterval(tick, 250);
