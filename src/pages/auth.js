
const authContainer = document.querySelector('.auth_container');
const formWrapper = document.querySelector('.form_wrapper');
const sliderPanel = document.querySelector('.slider_panel');
const sliderArrow = document.querySelector('.slider_arrow');

const loginForm = document.querySelector('.login_form');
const registerForm = document.querySelector('.register_form');

const loginCard = loginForm.querySelector('.login_container');
const registerCard = registerForm.querySelector('.register_container');

const THRESHOLD = 0.3;

let currentState = 0;
let currentProgress = 0;

let startX = 0;
let startProgress = 0;

let panelTravel = 0;

let isDragging = false;
let hasMoved = false;
let suppressClick = false;


// Рассчитываем геометрию
function measureGeometry() {
  const containerWidth = authContainer.clientWidth;

  // Ширина выглядывающей части соседней формы
  const peekValue = parseFloat(
    getComputedStyle(authContainer).getPropertyValue('--peek')
  );

  const peek = Number.isFinite(peekValue) ? peekValue : 120;

  // Получаем реальные размеры карточек
  const loginCardWidth = loginCard.getBoundingClientRect().width;
  const registerCardWidth = registerCard.getBoundingClientRect().width;

  // Свободное пространство по бокам карточек
  const loginSideSpace = (containerWidth - loginCardWidth) / 2;
  const registerSideSpace = (containerWidth - registerCardWidth) / 2;

  // Рассчитываем путь перемещения панели со стрелкой
  const panelWidth = sliderPanel.getBoundingClientRect().width;

  const panelRightValue = parseFloat(
    getComputedStyle(sliderPanel).right
  );

  const panelRight = Number.isFinite(panelRightValue)
    ? panelRightValue
    : 0;

  panelTravel = Math.max(
    0,
    containerWidth - panelWidth - panelRight * 2
  );

  return {
    containerWidth,
    peek,
    loginCardWidth,
    registerCardWidth,
    loginSideSpace,
    registerSideSpace
  };
}


// Управляем движением форм и панели
function setProgress(progress) {
  currentProgress = Math.max(0, Math.min(1, progress));

  const geometry = measureGeometry();

  const {
    containerWidth,
    peek,
    loginCardWidth,
    registerCardWidth,
    loginSideSpace,
    registerSideSpace
  } = geometry;

  // Двигаем всю обёртку
  const formOffset = -containerWidth * currentProgress;

  formWrapper.style.setProperty('--offset', `${formOffset}px`);

  // Двигаем карточку входа
  const loginOffset =
    (containerWidth + peek - loginSideSpace - loginCardWidth) *
    currentProgress;

  loginCard.style.setProperty('--card-offset', `${loginOffset}px`);

  // Двигаем карточку регистрации
  const registerOffset =
    -(registerSideSpace + peek) * (1 - currentProgress);

  registerCard.style.setProperty('--card-offset', `${registerOffset}px`);

  // Двигаем панель со стрелкой
  const panelOffset = -panelTravel * currentProgress;

  sliderPanel.style.setProperty('--panel-offset', `${panelOffset}px`);
}


// Переключение состояний
function setState(state) {
  currentState = state;

  formWrapper.classList.remove('is-dragging');
  sliderPanel.classList.remove('is-dragging');

  setProgress(state);

  loginForm.inert = state === 1;
  registerForm.inert = state === 0;

  loginForm.setAttribute('aria-hidden', String(state === 1));
  registerForm.setAttribute('aria-hidden', String(state === 0));

  // Отражаем SVG по горизонтали
  sliderArrow.classList.toggle('is_reversed', state === 1);

  sliderArrow.setAttribute(
    'aria-label',
    state === 1
      ? 'Переключить на вход'
      : 'Переключить на регистрацию'
  );

  sliderArrow.setAttribute('aria-pressed', String(state === 1));
}


// Начало перетаскивания
sliderArrow.addEventListener('pointerdown', (event) => {
  if (event.button !== 0 && event.pointerType === 'mouse') return;

  event.preventDefault();

  suppressClick = false;

  measureGeometry();
  setProgress(currentProgress);

  startX = event.clientX;
  startProgress = currentProgress;

  isDragging = true;
  hasMoved = false;

  formWrapper.classList.add('is-dragging');
  sliderPanel.classList.add('is-dragging');

  sliderArrow.setPointerCapture(event.pointerId);
});


// Перемещение
sliderArrow.addEventListener('pointermove', (event) => {
  if (!isDragging) return;

  const deltaX = event.clientX - startX;

  if (Math.abs(deltaX) > 4) {
    hasMoved = true;
  }

  const progress = startProgress - deltaX / panelTravel;

  setProgress(progress);
});


// Завершение перетаскивания
function finishDrag() {
  if (!isDragging) return;

  isDragging = false;

  if (!hasMoved) return;

  suppressClick = true;

  let nextState = currentState;

  if (currentState === 0) {
    if (currentProgress >= THRESHOLD) {
      nextState = 1;
    }
  } else {
    if (currentProgress <= 1 - THRESHOLD) {
      nextState = 0;
    }
  }

  setState(nextState);
}

sliderArrow.addEventListener('pointerup', finishDrag);


// Отмена перетаскивания
sliderArrow.addEventListener('pointercancel', () => {
  if (!isDragging) return;

  isDragging = false;
  suppressClick = true;

  setState(currentState);
});


// Обычный клик по кнопке
sliderArrow.addEventListener('click', (event) => {
  if (suppressClick && event.detail > 0) {
    suppressClick = false;
    return;
  }

  setState(currentState === 0 ? 1 : 0);
});


// Пересчёт размеров при изменении окна
window.addEventListener('resize', () => {
  if (isDragging) return;

  measureGeometry();
  setProgress(currentState);
});


// Первоначальная настройка
measureGeometry();
setState(0);
