(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);




// Navbar active state management
document.addEventListener('DOMContentLoaded', function() {
    // Function to set active link
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item');
        
        // Remove active and visited classes from all links
        navLinks.forEach(link => {
            link.classList.remove('active', 'visited');
        });
        
        // Set active class for current page
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
                
                // Add to visited links in localStorage
                if (linkHref !== 'index.html' && linkHref !== '#') {
                    addToVisitedLinks(linkHref);
                }
            }
        });
        
        // Apply visited class to previously visited links
        applyVisitedStyles();
    }
    
    // Function to add visited link to localStorage
    function addToVisitedLinks(page) {
        let visitedLinks = JSON.parse(localStorage.getItem('visitedLinks')) || [];
        if (!visitedLinks.includes(page)) {
            visitedLinks.push(page);
            localStorage.setItem('visitedLinks', JSON.stringify(visitedLinks));
        }
    }
    
    // Function to apply visited styles
    function applyVisitedStyles() {
        const visitedLinks = JSON.parse(localStorage.getItem('visitedLinks')) || [];
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (visitedLinks.includes(linkHref) && !link.classList.contains('active')) {
                link.classList.add('visited');
            }
        });
    }
    
    // Prevent default behavior for current page links
    function preventSelfRedirect() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const linkHref = this.getAttribute('href');
                if (linkHref === currentPage) {
                    e.preventDefault();
                    // Just update active state without redirecting
                    setActiveLink();
                }
            });
        });
    }
    
    // Initialize
    setActiveLink();
    preventSelfRedirect();
    
    // Update active state when navigating (for SPA-like behavior)
    window.addEventListener('popstate', setActiveLink);
});

// Alternative simpler version if you prefer
function handleNavClicks() {
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const currentPage = window.location.pathname.split('/').pop();
            
            // If clicking on current page link, prevent default
            if (href === currentPage) {
                e.preventDefault();
                
                // Update active states
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Add to visited
                if (href !== 'index.html') {
                    let visited = JSON.parse(localStorage.getItem('visitedNavLinks')) || [];
                    if (!visited.includes(href)) {
                        visited.push(href);
                        localStorage.setItem('visitedNavLinks', JSON.stringify(visited));
                    }
                }
                
                // Apply visited styles
                applyVisitedStyles();
            }
        });
    });
    
    // Apply visited styles on load
    function applyVisitedStyles() {
        const visited = JSON.parse(localStorage.getItem('visitedNavLinks')) || [];
        const currentPage = window.location.pathname.split('/').pop();
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (visited.includes(href) && href !== currentPage) {
                link.classList.add('visited');
            }
        });
    }
    
    applyVisitedStyles();
}

// Call the function
document.addEventListener('DOMContentLoaded', handleNavClicks);