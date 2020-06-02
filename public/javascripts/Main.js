//hamburger menu
const selectElement = document.querySelector('div.slide1');

// selectElement('.mobile-menu').addEventListener('click',() =>{
//     selectElement('header').classList.toggle('active');
// });


let sliderImages = document.querySelectorAll('.slide'),
        arrowLeft = document.querySelector('#arrow-left'),
        arrowRight = document.querySelector('#arrow-right'),
        current = 0,
        burgerNav = document.querySelector('.burger-nav');
        //Clear all images
        function reset() {
            for (let i = 0;i < sliderImages.length; i++) {
                sliderImages[i].style.display = 'none';
            }
        }
        // Init slider
        function startSlide() {
            reset()
            sliderImages[0].style.display = 'block'
        }
        // Show prev
        function slideLeft() {
            reset();
            sliderImages[current - 1].style.display = 'block';
            current--;
        }
        //show next
        function slideRight() {
            // console.log('called again')
            reset();
            sliderImages[current + 1].style.display = 'block';
            current++;
        }
        // Left arrow click
        arrowLeft.addEventListener('click',function(){
            if(current === 0) {
                current = sliderImages.length;
            }
            slideLeft();
        })
        // Right arrow click
        arrowRight.addEventListener('click',function(){
            if(current === sliderImages.length - 1) {
                current = -1
            }
            slideRight();
        })

        
    