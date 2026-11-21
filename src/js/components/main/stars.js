const canvas = document.getElementById("stars_canvas");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 150; // Количество звезд

// Подстраиваем размер холста под размер окна
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Создаем массив звезд со случайными параметрами
for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.8 + 0.5, // Размер от 0.5 до 2.3 px
    alpha: Math.random(),              // Начальная прозрачность
    blinkSpeed: (Math.random() - 0.5) * 0.02, // Скорость мерцания
    moveSpeed: Math.random() * 0.25 + 0.05    // Скорость движения вверх
  });
}

// Цикл отрисовки каждого кадра (60 FPS)
function animateStars() {
  // Очищаем прошлый кадр (градиент фона виден сквозь прозрачный canvas)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    // 1. Обновляем мерцание
    star.alpha += star.blinkSpeed;
    if (star.alpha <= 0.1 || star.alpha >= 1) {
      star.blinkSpeed = -star.blinkSpeed;
    }

    // 2. Плавно двигаем звезду вверх
    star.y -= star.moveSpeed;
    if (star.y < 0) {
      star.y = canvas.height;
      star.x = Math.random() * canvas.width;
    }

    // 3. Рисуем звезду
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}

animateStars();
