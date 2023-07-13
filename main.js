const findRefEl = (container, index) => {
    const targetIndex = +index;
    for (let i = container.children.length - 1; i >= 0; i--) {
        const currentIndex = +container.children[i].dataset.originalIndex;
        if (currentIndex < targetIndex) {
            return container.children[i];
        }
    }
    return null;
}

const handleMove = (event) => {
    const div = event.target, containerEl = div.closest('.container');
    if (div.dataset.moved === 'false') {
        containerEl.insertBefore(div, containerEl.firstElementChild);
        div.dataset.moved = 'true';
    } else {
        const ref = findRefEl(containerEl, div.dataset.originalIndex);
        containerEl.insertBefore(div, ref.nextElementSibling);
        div.dataset.moved = 'false';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const containerEl = document.querySelector('.container');
    for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.classList.add('div-element');
        div.innerText = `div${i + 1}`;
        div.dataset.originalIndex = i.toString();
        div.dataset.moved = false;
        div.addEventListener('click', handleMove);
        containerEl.appendChild(div);
    }
});