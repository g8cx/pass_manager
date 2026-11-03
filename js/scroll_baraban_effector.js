const navigator = document.querySelector('.collections_navigation');

function updateWheelEffect() {
    const containerRect = navigator.getBoundingClientRect();
    const centerY = containerRect.top + containerRect.height / 2;

    const items = navigator.querySelectorAll('li');

    const maxScroll = navigator.scrollHeight - navigator.clientHeight;

    const isAtTop = navigator.scrollTop <= 1;
    const isAtBottom = maxScroll - navigator.scrollTop <= 1;

    items.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;

        const distance = Math.abs(centerY - itemCenter);

        const normalizedDistance = Math.min(
            distance / (containerRect.height / 2),
            1
        );

        const isFirst = [...items].slice(0, 3).includes(item);
        const isLast = [...items].slice(-3).includes(item);

        let scale;
        let opacity;

        if (isAtTop && isFirst) {
            scale = 1.08;
            opacity = 1;
        } else if (isAtBottom && isLast) {
            scale = 1.08;
            opacity = 1;
        } else {
            scale = 1.08 - normalizedDistance * 0.18;
            opacity = 1 - normalizedDistance * 0.35;
        }

        item.style.setProperty('--item-scale', scale);
        item.style.setProperty('--item-opacity', opacity);

        item.classList.toggle('is-centered', distance < itemRect.height / 2);
    });
}

navigator.addEventListener('scroll', updateWheelEffect);

updateWheelEffect();