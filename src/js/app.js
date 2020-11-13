$(function() {
    var scrolloffset = $(window).scrollTop();
    
    // Slider
    $(".slider-slick").slick({
        infinite: true,
        arrows: false,
		fade: false,
		slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: 'linear', 
        autoplay: true,
        autoplaySpeed: 1700,
    });

    // Sidebar
    $("#sidebar").on("click", function(event) {
        event.preventDefault();
    
        $(this).toggleClass("active");
        $("nav").toggleClass("active");
    
    });

    // Smooth scroll
	$("[data-scroll]").on("click", function(event) {
		event.preventDefault();

		var $this = $(this),
			blockID = $(this).data('scroll'),
			blockoffset = $(blockID).offset().top;

		$("#nav a").removeClass("active");
		$this.addClass("active"); 

		$("html, body").animate({
			scrollTop: blockoffset
		}, 500);
    });
    
    // Undo drag
    $('img').on('dragstart', function(event) { 
        event.preventDefault(); 
    });
});
