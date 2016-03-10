
//-- Action when searching for user ---//
$("#search-input-global").on("input", function () {
    var searchedData = $(this).val().toLowerCase();
    var $searchContacts = $('#tab3 .search-contacts');
    if (searchedData !== "") {
        $searchContacts.find(".contact").remove();
        $searchContacts.show();
        searchContactsGlobal(searchedData, $searchContacts);
    } else {
        $searchContacts.find(".contact").remove();
    }
});

$("#search-input-local").on("input", function () {
    var searchedData = $(this).val().toLowerCase();
    var $currentContacs = $('#tab1 .contacts');
    var $searchContacts = $("#tab1 .search-contacts");
    if (searchedData !== "") {
        $currentContacs.hide();
        $searchContacts.find(".contact").remove();
        $searchContacts.show();
        searchContactsLocal(searchedData, $searchContacts);
    } else {
        $searchContacts.find(".contact").remove();
        $searchContacts.hide();
        $currentContacs.show();
    }
});

//--- Function that search global contacts ---//
function searchContactsGlobal(searchedData, $searchElement) {
    $.ajax({
        type: "GET",
        url: "api/users",
        headers: {
            "sessionId": localStorage.getItem("sessionId")
        },
        dataType: "xml",
        success: function (data) {
            var allContacts = [];
            var currentContact = user.contacts;
            $(data).find("username").each(function (index, element) {
                allContacts.push($(element).html());
            });
            allContacts.forEach(function (val) {
                val = val.toLowerCase();
                var inCurrentContactsIndex = $.inArray(val, currentContact);
                var isCurrentUser = (val === user.username);
                if (val.indexOf(searchedData) === 0 && inCurrentContactsIndex === -1
                        && !isCurrentUser) {
                    updateSearchPage(val, $searchElement);
                }
            });
        }
    });
}

//--- Function that search local contacts ---//
function searchContactsLocal(searchedData, $searchElement) {
    var localContacts = user.contacts;
    localContacts.forEach(function (val) {
        if (val.toLowerCase().indexOf(searchedData) === 0)
            updateSearchPage(val, $searchElement);
    });

}

//--- Function that update search page ---//
function updateSearchPage(foundUser, $searchElement) {
    var component = {
        searchElement: '<li class="contact">' +
                '<div class="contact-box">' +
                '<p></p>' +
                '</div>' +
                '</a>' +
                '</li>'
    }
    $searchElement.append(component.searchElement);
    $searchElement.find(".contact-box:last > p").html(foundUser);
}

//------ Adding user to contact when clicking on the search global contact -----//
$('#tab3').on('click', '.contact-box', function () {
    var contact = $(this).text();
    $.ajax({
        type: "PUT",
        url: "api/users/" + user.username + "/contacts/update",
        contentType: "application/xml",
        data: '<?xml version="1.0" encoding="UTF-8" ?>' +
                '<user>' +
                '<username>' + contact + '</username>' +
                '</user>'

    });
    $(this).parent().remove();
    user.addContact(contact);
});
