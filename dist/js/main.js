
$(document).ready(function(){
    // Reveal elements on scroll | Vendor: Wowjs (https://wowjs.uk)
    new WOW().init();

    // Carousel | Vendor: Owl-Carousel-2 (https://owlcarousel2.github.io/OwlCarousel2/)
    $('.carousel-multiple').owlCarousel({
        loop:true,
        margin:10,
        autoplay: true,
        autoplayHoverPause: false,
        responsiveClass:true,
        nav: false,
        responsive:{
            0: {
                items: 1
            },
            500: {
                items: 2
            },
            700: {
                items: 2
            },
            1000: {
                items: 3
            },
            1300: {
                items: 4
            }
        }
    });

    // Parallax image | Vendor: jQuery Parallax (https://github.com/IanLunn/jQuery-Parallax)
    if ($(window).width() > 577) {
        $('.parallax-section').parallax("90%", -0.5);
    }

    // Enable Bootstrap PopOver | Vendor: Popper (https://popper.js.org/)
    $(function () {
        $('[data-toggle="popover"]').popover()
    });

    // Sorteable Gallery | Vendor: Isotope (https://isotope.metafizzy.co)
    $('.sortable-gallery-items').isotope({
        itemSelector: '.item',
        layoutMode: 'fitRows'
    });

    $('.sortable-gallery-filters ul li').click(function(){
        $('.sortable-gallery-filters ul li').removeClass('active');
        $(this).addClass('active');

        selector = $(this).attr('data-filter');
        $('.sortable-gallery-items').isotope({
            filter: selector,
            percentPosition: true,
            layoutMode: 'masonry'
        });
        return false;
    });

    // Sorteable Pricing | Vendor: Isotope (https://isotope.metafizzy.co)
    $('.sortable-pricing-items').isotope({
        itemSelector: '.item',
        layoutMode: 'fitRows',
        filter: '.first'
    });
    
    $('.sortable-pricing-filters ul li').click(function(){
        $('.sortable-pricing-filters ul li').removeClass('active');
        $(this).addClass('active');

        selector = $(this).attr('data-filter');
        $('.sortable-pricing-items').isotope({
            filter: selector,
            percentPosition: true,
            layoutMode: 'masonry'
        });
        return false;
    });

    // Show full image | Vendor: Magnific-Popup (http://dimsemenov.com/plugins/magnific-popup/)
    $('.sortable-gallery-items').magnificPopup({
        delegate: 'a',
        type: 'image',
        mainClass: 'mfp-fade'
    });
});

// Show Navbar background on scroll
// Go to top of page smooth
$(document).ready(function($){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('navbar-solid');
        } else {
            $('.navbar').removeClass('navbar-solid');
        }
    });
});

// Go to top of page smooth
$(document).ready(function($){
    $('#go-to-top').hide();
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('#go-to-top').fadeIn('slow');
        } else {
            $('#go-to-top').fadeOut('slow');
        }
    });
    $('#go-to-top').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 500);
        return false;
    });
});

// Scroll Smoothing
$('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        // On-page links
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname)
        {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });


// Ajax Contact form sender
$('#form-thanks, #form-error').hide();
$(document).on('submit','#contact-form',function(e){
    e.preventDefault();

    const form = $(this);
    const successMessage = $('#form-thanks');
    const errorMessage = $('#form-error');
    const url = "/process.php";
    let data = form.serialize();

    $.ajax({
    	type: "POST",
    	url: url, 
        data: data,
        dataType: 'json',
    	beforeSend: function(){
    		$('#submit-btn').html('Sending...');
    	},
    	success: function(data) {
            console.log(data.response)
            if(data.response == 'success'){
                form.hide(300)
                successMessage.fadeIn(300);
            } else {
                form.hide(300)
                errorMessage.fadeIn(300);
            }
        },
        complete: function(){
            $('#submit-btn').html('Submit');
        },
    	error: function(data) {
            console.log(data);
            form.hide(300)
            errorMessage.fadeIn(300);
    	}
    });
});