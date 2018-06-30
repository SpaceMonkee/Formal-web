//Modal for Desktop

$(document).ready(function() {
    $('#arttile').lightGallery({
        thumbnail:true
    });
});

// removing "save image as" options
$('body').on('contextmenu', '.lg-image', function(e){
    e.preventDefault();
});

$("body").on("contextmenu", "img", function(e) {
  return false;
});
