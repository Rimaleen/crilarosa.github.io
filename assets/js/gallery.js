document.querySelectorAll('.masonry-item').forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-image');
        const lightbox = document.getElementById('photoLightbox');
        const lightboxImg = document.getElementById('lightbox-image');

        lightboxImg.src = imgSrc;
        lightbox.classList.add('show');
        lightbox.style.display = "block";
    });
});
document.querySelector('.close-lightbox').addEventListener('click', () => {
    document.getElementById('photoLightbox').style.display = "none";
});
