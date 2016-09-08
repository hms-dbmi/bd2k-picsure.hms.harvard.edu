$(document).ready(function () {
    $(document).on("scroll", onScroll);
    
    //smoothscroll
    $('a[href^="/rest.html#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).parent().removeClass('active');
        })
        $(this).parent().addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 51
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

    //Highlight the correct menu item
    var scrollPos = $(document).scrollTop();
    $('.scrollable a').each(function () {
        var currLink = $(this);
        var refId = currLink.attr("href").replace("/rest.html", "")
        var refElement = $(refId);
        if (refElement.position() != undefined || refElement.position() != null) {
        if (refElement.position().top - 51 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.nav-sidebar li').removeClass("active");
            currLink.parent().addClass("active");
            
            $('html, body').stop().animate({
                'scrollTop': refElement.offset().top - 51
                }, 0, 'swing', function () {
                    $(document).on("scroll", onScroll);
            });
        }
        else{
            currLink.parent().removeClass("active");
        }
        }
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();

    $('.scrollable a').each(function () {
        var currLink = $(this);
        var refId = currLink.attr("href").replace("/rest.html", "")
        var refElement = $(refId);
        if (refElement.position() != undefined || refElement.position() != null) {
        if (refElement.position().top - 50 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.nav-sidebar li').removeClass("active");
            currLink.parent().addClass("active");
        }
        else{
            //currLink.parent().removeClass("active");
        }
        }
    });
}