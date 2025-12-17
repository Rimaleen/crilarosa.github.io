//---------------------------------------------------
// MASONRY GALLERY + LIGHTBOX (STANDALONE)
//---------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTI LIGHTBOX
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-lightbox");
    const prevBtn = document.querySelector(".photo-lightbox .prev");
    const nextBtn = document.querySelector(".photo-lightbox .next");

    // MASONRY ITEMS
    const masonryItems = Array.from(document.querySelectorAll(".masonry-item"));

    if (!lightbox || !lightboxImg || masonryItems.length === 0) return;

    // ARRAY IMMAGINI
    const images = masonryItems.map(item => item.dataset.image);

    let currentIndex = 0;
    let isOpen = false;

    //---------------------------------------------------
    // APPLICA IMMAGINI COME BACKGROUND
    //---------------------------------------------------
    masonryItems.forEach(item => {
        const img = item.dataset.image;
        if (img) {
            item.style.backgroundImage = `url(${img})`;
        }
    });

    //---------------------------------------------------
    // OPEN LIGHTBOX
    //---------------------------------------------------
    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[currentIndex];
        lightbox.style.display = "flex";
        lightbox.classList.add("show");
        document.body.classList.add("noscroll");
        isOpen = true;
    }

    //---------------------------------------------------
    // CLOSE LIGHTBOX
    //---------------------------------------------------
    function closeLightbox() {
        lightbox.style.display = "none";
        lightbox.classList.remove("show");
        document.body.classList.remove("noscroll");
        isOpen = false;
    }

    //---------------------------------------------------
    // NAVIGATION
    //---------------------------------------------------
    function showPrev() {
        if (!isOpen) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
    }

    function showNext() {
        if (!isOpen) return;
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
    }

    //---------------------------------------------------
    // EVENTI CLICK MASONRY
    //---------------------------------------------------
    masonryItems.forEach((item, index) => {
        item.style.cursor = "pointer";
        item.addEventListener("click", () => openLightbox(index));
    });

    //---------------------------------------------------
    // EVENTI LIGHTBOX
    //---------------------------------------------------
    closeBtn?.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", e => {
        if (e.target === lightbox) closeLightbox();
    });

    prevBtn?.addEventListener("click", e => {
        e.stopPropagation();
        showPrev();
    });

    nextBtn?.addEventListener("click", e => {
        e.stopPropagation();
        showNext();
    });

    //---------------------------------------------------
    // TASTIERA
    //---------------------------------------------------
    document.addEventListener("keydown", e => {
        if (!isOpen) return;

        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
    });

});
