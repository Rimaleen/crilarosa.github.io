document.addEventListener("DOMContentLoaded", function() {
    // Apri PDF
    document.querySelectorAll('.pdf-item').forEach(item => {
    item.addEventListener('click', function(e){
        e.preventDefault();
        const pdfUrl = this.getAttribute('href');
        document.getElementById('pdf-frame').src = pdfUrl;
        document.getElementById('pdf-lightbox').style.display = 'flex';
    });
    });
    // Chiudi PDF
    document.querySelector('#pdf-lightbox .close').addEventListener('click', function(){
        document.getElementById('pdf-frame').src = "";
        document.getElementById('pdf-lightbox').style.display = 'none';
    });
    // Chiudi cliccando fuori dall'iframe
    document.getElementById('pdf-lightbox').addEventListener('click', function(e){
        if(e.target === this){
            document.getElementById('pdf-frame').src = "";
            this.style.display = 'none';
        }
    });
});
