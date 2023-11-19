document.addEventListener('DOMContentLoaded', function() {

    const likeButtons = document.querySelectorAll('.like-icon');

    likeButtons.forEach(likeButton => {
        let isLiked = false;

        likeButton.addEventListener('click', function() {
            isLiked = !isLiked;
            const heartIcon = this.querySelector('.fa-heart');
            heartIcon.classList.toggle('filled', isLiked);
        });
    });

    const taxCheckbox = document.getElementById('switch');
    const amountElements = document.querySelectorAll('b.output-rate');

    function calculateTotalAmount(initialAmount, isChecked) {
        if (isChecked) {
            const taxAmount = initialAmount * 0.18;
            const totalAmount = initialAmount + taxAmount;
            return `₹${totalAmount.toFixed(2)}`;
        }
        return `₹${initialAmount.toFixed(2)}`;
    }

    if (amountElements.length > 0 && taxCheckbox) {
        amountElements.forEach(amountElement => {
            const initialAmount = parseFloat(amountElement.textContent.replace(/[^\d.]/g, ''));

            function updateAmount() {
                const isChecked = taxCheckbox.querySelector('input').checked;
                const newAmount = calculateTotalAmount(initialAmount, isChecked);
                amountElement.textContent = newAmount;
            }

            taxCheckbox.addEventListener('change', updateAmount);
            updateAmount();
        });
    } else {
        console.error("Elements with class 'output-rate' or 'switch' not found.");
    }

    const gridBoxes = document.querySelectorAll('.grid-container');

    gridBoxes.forEach(gridBox => {
        const prevButton = gridBox.querySelector('.prev-button');
        const nextButton = gridBox.querySelector('.next-button');
        const slides = gridBox.querySelector('.slides');
        const slideImages = gridBox.querySelectorAll('.slides img');

        let currentSlide = 0;

        prevButton.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlidePosition();
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentSlide < slideImages.length - 1) {
                currentSlide++;
                updateSlidePosition();
            }
        });

        function updateSlidePosition() {
            const offset = -currentSlide * slideImages[0].offsetWidth;
            slides.style.transform = `translateX(${offset}px)`;

            prevButton.style.display = currentSlide === 0 ? 'none' : 'block';
        }
    });

    
});
