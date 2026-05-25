// <!-- JavaScript for Presentation Logic -->
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const btnBack = document.getElementById('btn-back');
    const btnNext = document.getElementById('btn-next');
    let currentSlide = 0;

    function updateUI() {
        // Update slides visibility
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update indicators
        indicators.forEach((ind, index) => {
            if (index === currentSlide) {
                ind.classList.remove('bg-gray-300');
                ind.classList.add('bg-blue-600');
            } else {
                ind.classList.remove('bg-blue-600');
                ind.classList.add('bg-gray-300');
            }
        });

        // Update buttons
        btnBack.disabled = currentSlide === 0;

        if (currentSlide === slides.length - 1) {
            btnNext.innerHTML = "Finish";
            btnNext.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            btnNext.classList.add('bg-green-600', 'hover:bg-green-700');
        } else {
            btnNext.innerHTML = "Next Step &rarr;";
            btnNext.classList.add('bg-blue-600', 'hover:bg-blue-700');
            btnNext.classList.remove('bg-green-600', 'hover:bg-green-700');
        }

        // Trigger KaTeX to re-render math if any dynamic DOM changes happened
        if (typeof renderMathInElement === "function") {
            renderMathInElement(document.body, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false }
                ]
            });
        }
    }

    btnBack.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateUI();
        }
    });

    btnNext.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateUI();
        } else {
            updateUI();
        }
    });

    // Initialize UI
    updateUI();
});