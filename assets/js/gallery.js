//---------------------------------------------------
// UNIVERSAL GALLERY SCRIPT MULTI-SEZIONE
//---------------------------------------------------

// ELEMENTI GLOBALI
const tabs = document.querySelectorAll(".gallery-tabs .tab");
const sections = document.querySelectorAll(".gallery-section");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close-lightbox");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentSection = null;
let galleryIndex = 0;   // indice della main image
let lightboxIndex = 0;  // indice SOLO per la lightbox
let galleryImages = [];
let galleryFullImages = [];
let galleryData = [];
let isLightboxOpen = false;

//---------------------------------------------------
// FUNZIONI PER SEZIONE
//---------------------------------------------------
function initSection(section) {
    if (!section) return;
    currentSection = section;
    currentIndex = 0;

    // Elementi della sezione
    const mainDisplay = section.querySelector(".main-image img");
    const sideInfo = section.querySelector(".side-info");
    const thumbnails = Array.from(section.querySelectorAll(".thumbnail"));

    // Aggiorna globali
    galleryImages = thumbnails.map(t => t.src);
    galleryFullImages = thumbnails.map(t => t.dataset.full || t.src);
    galleryData = thumbnails.map(t => ({
        title: t.alt || "",
        desc: t.dataset.desc || ""
    }));

    // Aggiorna main display e side-info
    if (mainDisplay) mainDisplay.src = galleryImages[0];
    updateSideInfo(section, currentIndex);

    // Imposta thumbnail click
    thumbnails.forEach((thumb, index) => {
        thumb.style.cursor = "pointer";
        thumb.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            changeImage(section, index);
        });
    });

    updateActiveThumbnail(section);

    // Main display click apre lightbox
    if (mainDisplay) {
        mainDisplay.style.cursor = "pointer";
        mainDisplay.addEventListener("click", () => openLightbox(section));
    }
}

//---------------------------------------------------
// UPDATE SIDE INFO
//---------------------------------------------------
function updateSideInfo(section, index) {
    const sideInfo = section.querySelector(".side-info");
    if (!sideInfo) return;
    sideInfo.querySelector("h3").textContent = galleryData[index].title;
    sideInfo.querySelector("p").textContent = galleryData[index].desc;
}

//---------------------------------------------------
// UPDATE THUMBNAIL ATTIVA
//---------------------------------------------------
function updateActiveThumbnail(section) {
    const thumbnails = section.querySelectorAll(".thumbnail");
    thumbnails.forEach(thumb => {
        thumb.classList.remove("active");
        thumb.style.pointerEvents = "auto";
    });
    if (thumbnails[currentIndex]) {
        thumbnails[currentIndex].classList.add("active");
        thumbnails[currentIndex].style.pointerEvents = "none";
    }
}

//---------------------------------------------------
// CAMBIO IMMAGINE
//---------------------------------------------------
function changeImage(section, index) {
    const mainDisplay = section.querySelector(".main-image img");
    if (!mainDisplay) return;

    galleryIndex = index;          // 👈 stato gallery
    currentIndex = index;          // (serve ancora per thumbnails)
    mainDisplay.src = galleryImages[galleryIndex];

    updateSideInfo(section, galleryIndex);
    updateActiveThumbnail(section);
}


//---------------------------------------------------
// LIGHTBOX
//---------------------------------------------------
function openLightbox(section) {
    currentSection = section;

    lightboxIndex = galleryIndex;   // 👈 copia lo stato
    lightboxImg.src = galleryFullImages[lightboxIndex];

    lightbox.style.display = "flex";
    lightbox.classList.add("show");
    document.body.classList.add("noscroll");
    isLightboxOpen = true;
}


function closeLightbox() {
    lightbox.style.display = "none";
    lightbox.classList.remove("show");
    document.body.classList.remove("noscroll");
    isLightboxOpen = false;

    lightboxIndex = galleryIndex; // 🔄 reset silenzioso
}


//---------------------------------------------------
// NAVIGAZIONE FRECCE LIGHTBOX (solo lightbox!)
//---------------------------------------------------
function prevImage() {
    if (!isLightboxOpen) return;
    lightboxIndex = (lightboxIndex - 1 + galleryFullImages.length) % galleryFullImages.length;
    lightboxImg.src = galleryFullImages[lightboxIndex];
}

function nextImage() {
    if (!isLightboxOpen) return;
    lightboxIndex = (lightboxIndex + 1) % galleryFullImages.length;
    lightboxImg.src = galleryFullImages[lightboxIndex];
}

//---------------------------------------------------
// INIZIALIZZAZIONE TABS
//---------------------------------------------------
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const targetId = tab.dataset.section;
        sections.forEach(sec => {
            if (sec.id === targetId) {
                sec.style.display = "block";
                initSection(sec);
            } else {
                sec.style.display = "none";
            }
        });
    });
});

//---------------------------------------------------
// INIZIALIZZAZIONE SEZIONE INIZIALE
//---------------------------------------------------
if (sections.length > 0) {
    sections.forEach((sec, i) => {
        if (i === 0) {
            sec.style.display = "block";
            initSection(sec);
        } else {
            sec.style.display = "none";
        }
    });
}

//---------------------------------------------------
// EVENTI LIGHTBOX
//---------------------------------------------------
if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
if (lightbox) {
    lightbox.addEventListener("click", e => {
        if (e.target === lightbox) closeLightbox();
    });
}
if (prevBtn) prevBtn.addEventListener("click", e => { e.stopPropagation(); prevImage(); });
if (nextBtn) nextBtn.addEventListener("click", e => { e.stopPropagation(); nextImage(); });

//---------------------------------------------------
// MASONRY GALLERY (NON MODIFICATA)
//---------------------------------------------------
const masonryImgs = document.querySelectorAll(".masonry-item");
if (masonryImgs.length > 0) {
    masonryImgs.forEach((item, index) => {
        item.style.cursor = "pointer";
        item.addEventListener("click", () => {
            openLightbox(item.closest(".gallery-section"), index);
        });
    });
}
