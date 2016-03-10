
//------ Toggle when clicking the wrench ------//
$('.dropdown').on('click', 'span', function () {
    $('.dropdown-content').toggle();
});
//------ Toggle when clicking the dropdown content ----//
$('.dropdown-content').on('click', 'a', function (event) {
    if (!(event.target == document.getElementById("wrench"))) {
        $('.dropdown-content').toggle();
    }
});

//------ Toggle when clicking tab on sidebar ------//
$('#tabs').on('click', '.tab', function () {
    $('#tabs .tab').removeClass('current-tab');
    $(this).toggleClass('current-tab');
    $('.tabs-content > div').hide();
    var dataId = '#' + $(this).data('id');
    if (dataId == "#tab2") {
        $(".search-input").val("");
    }
    $(dataId).show();
});
