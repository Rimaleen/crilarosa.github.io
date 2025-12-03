//---------------------------------------------------
// UNIVERSAL GALLERY SCRIPT
//---------------------------------------------------

// ELEMENTI GLOBALI (se esistono)
const mainDisplay = document.getElementById("mainDisplay");
const lightbox = document.getElementById("lightbox") || document.getElementById("photoLightbox");
const lightboxImg = document.getElementById("lightbox-img") || document.getElementById("lightbox-image");
const closeBtn = document.querySelector(".close-lightbox") || document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
let galleryImages = [];

//---------------------------------------------------
// 1. RACCOLTA IMMAGINI (DRAWINGS MODE)
//---------------------------------------------------
const thumbnailImgs = document.querySelectorAll(".thumbnail");
if (thumbnailImgs.length > 0) {
    galleryImages = Array.from(thumbnailImgs).map(img => img.src);
}

//---------------------------------------------------
// 2. RACCOLTA IMMAGINI (MASONRY MODE)
//---------------------------------------------------
const masonryImgs = document.querySelectorAll(".masonry-item");

if (masonryImgs.length > 0) {
    galleryImages = Array.from(masonryImgs).map(item => item.dataset.image);

    // Masonry clickable
    masonryImgs.forEach((item, index) => {
        item.style.cursor = "pointer";
        item.addEventListener("click", () => openLightbox(index));
    });
}

//---------------------------------------------------
// FUNZIONE CAMBIO IMMAGINE (solo Drawings)
//---------------------------------------------------
function changeImage(img) {
    if (!mainDisplay) return;
    mainDisplay.src = img.src;

    // Ricava index dinamico
    currentIndex = galleryImages.indexOf(img.src);
}

//---------------------------------------------------
// MAIN DISPLAY CLICK (solo Drawings)
//---------------------------------------------------
if (mainDisplay) {
    mainDisplay.style.cursor = "pointer";
    mainDisplay.addEventListener("click", () => {
        currentIndex = galleryImages.indexOf(mainDisplay.src);
        openLightbox(currentIndex);
    });
}

//---------------------------------------------------
// LIGHTBOX OPEN
//---------------------------------------------------
function openLightbox(index) {
    if (!lightbox) return;

    currentIndex = index;
    lightbox.style.display = "flex";
    lightbox.classList.add("show");
    lightboxImg.src = galleryImages[currentIndex];

    document.body.classList.add("noscroll");
}

//---------------------------------------------------
// LIGHTBOX CLOSE
//---------------------------------------------------
function closeLightbox() {
    if (!lightbox) return;
    lightbox.style.display = "none";
    lightbox.classList.remove("show");
    document.body.classList.remove("noscroll");
}

if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

// Chiudi cliccando fuori
if (lightbox) {
    lightbox.addEventListener("click", e => {
        if (e.target === lightbox) closeLightbox();
    });
}

//---------------------------------------------------
// NAVIGAZIONE FRECCE (se ci sono)
//---------------------------------------------------
if (prevBtn) {
    prevBtn.addEventListener("click", e => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex];
    });
}

if (nextBtn) {
    nextBtn.addEventListener("click", e => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex];
    });
}
