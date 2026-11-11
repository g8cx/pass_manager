const collectionsList = document.querySelector('.collections_list');
const navigation = document.querySelector('.collections_navigation');

export const updateScrollShadows = () => {
    const scrollTop = navigation.scrollTop;
    const maxScroll = navigation.scrollHeight - navigation.clientHeight;

    collectionsList.classList.toggle(
        'has-content-above',
        scrollTop > 1
    );

    collectionsList.classList.toggle(
        'has-content-below',
        maxScroll - scrollTop > 1
    );

    // console.log(navigation.scrollHeight, navigation.scrollTop, navigation.maxScroll)
}

navigation.addEventListener('scroll', updateScrollShadows);

updateScrollShadows();