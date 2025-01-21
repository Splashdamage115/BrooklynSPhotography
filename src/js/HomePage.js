
let slideIndex = 0;
showSlides();

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("Slides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex >= slides.length) {slideIndex = 0}

    slides[slideIndex].style.display = "block";  

    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// Add scroll event listener to make .navIcons li fly in
window.addEventListener('scroll', function() {
    let navIcons = document.querySelectorAll('.navIcons li');
    let windowHeight = window.innerHeight;

    navIcons.forEach(function(icon) {
        let position = icon.getBoundingClientRect().top;

        if (position < windowHeight - 100) {
            icon.classList.add('visible');
        }
    });
});

// Testimonials
let testimonialIndex = 0;
let changed = false;
showTestimonials();

function plusTestimonials(n) {
    showTestimonials(testimonialIndex += n);
}

function currentTestimonial(n) {
    changed = true;
    testimonialIndex = n - 1;
    displayTestemonials();
}

function displayTestemonials()
{
    let dots = document.getElementsByClassName("testimonial-dot");
    let testimonials = document.getElementsByClassName("testimonial");
    for (i = 0; i < dots.length; i++)
    {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    for (i = 0; i < testimonials.length; i++)
    {
        testimonials[i].style.display = "none";  
    }
    testimonials[testimonialIndex].style.display = "block";  
    dots[testimonialIndex].className += " active";
}

function showTestimonials() {
    if(changed)
    {
        changed = false;
        setTimeout(showTestimonials, 5000);
    }
    let i;
    let testimonials = document.getElementsByClassName("testimonial");
    testimonialIndex++;
    if (testimonialIndex >= testimonials.length) 
    {
        testimonialIndex = 0
    }    
    displayTestemonials(testimonialIndex)
    setTimeout(showTestimonials, 5000); // Change testimonial every 5 seconds
}
