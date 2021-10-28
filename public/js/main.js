window.addEventListener('load', function () {
    const menuItems = [
        {
            pathname: '/profile',
            menuItemElement: document.getElementById('profile'),
        },
        {
            pathname: '/profile/previouscourses',
            menuItemElement: document.getElementById('previouscourses'),
        },
        {
            pathname: '/profile/skills',
            menuItemElement: document.getElementById('skills'),
        },
        {
            pathname: '/profile/settings',
            menuItemElement: document.getElementById('settings'),
        },
    ];

    const currentPath = window.location.pathname;

    menuItems.forEach((menuItem) => {
        if (currentPath === menuItem.pathname) {
            menuItem.menuItemElement.classList.add('is-active');
        }
    })
})
