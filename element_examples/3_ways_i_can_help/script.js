document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        if (item.classList.contains('active')) {
            item.classList.remove('active');
        } else {
            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        }
    });
});
