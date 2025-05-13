$(function () {
    'use strict'

    // MENU
    $('.navbar .nav-link').on('click',function(){
        $(".navbar-collapse").collapse('hide');
    });

    $(window).on('scroll', function() {     
                                
        /*----------------------------------------------------*/
        /*  Navigtion Menu Scroll
        /*----------------------------------------------------*/    
        
        var b = $(window).scrollTop();
        
        if( b > 72 ){       
            $(".navbar").addClass("scroll");
        } else {
            $(".navbar").removeClass("scroll");
        }               
    });

    // TESTIMONIALS CAROUSEL
    $('#testimonials-carousel').owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            900:{
                items:2,
            },
            1200:{
                items:3,
                loop:false
            }
        }
    })

    // SMOOTHSCROLL
    $(function() {
      $('.navbar .nav-link').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 1000);
        event.preventDefault();
      });
    });   
     
  });

/* filepath: c:\Users\Yoga11e\Desktop\Personal Projects - Copy\Portfolio-Projects\francisco_resume\js\custom.js */
// Initialize Owl Carousel for Google Reviews
$(document).ready(function () {
    $("#google-reviews-carousel").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        dots: true,
        nav: false,
    });
});

// Sliding Text Effect
document.addEventListener("DOMContentLoaded", function () {
    const slidingText = document.getElementById("sliding-text");
    const texts = ["Web Developer", "Networking", "CCTV Installation"];
    let index = 0;

    function updateText() {
        slidingText.textContent = texts[index];
        index = (index + 1) % texts.length;
    }

    setInterval(updateText, 2000); // Change text every 2 seconds
    updateText(); // Initialize the first text
});


/* filepath: js/custom.js */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const subject = document.getElementById("contact-subject").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        if (!name || !email || !subject || !message) {
            alert("Please fill out all fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        alert("Thank you for your message! I will get back to you soon.");
        form.reset();
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});


// Add hover effect for cards for my services
document.querySelectorAll('#services .grid div').forEach((card) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    });
});