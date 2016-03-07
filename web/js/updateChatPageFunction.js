
//-- Action when searching for user ---//

$("#search-input-global").on("input", function () {
    var searchedData = $(this).val().toLowerCase();
    var $currentContacts = $(".contacts");
    var $searchContacts = $(".search-contacts");

    if (searchedData !== "") {
        $currentContacts.hide();
        $searchContacts.find(".contact").remove();
        $searchContacts.show();
        searchContactsGlobal(searchedData);
    } else {
        $currentContacts.show();
        $searchContacts.find(".contact").remove();
        $searchContacts.hide();
    }
});


$("#search-input-local").on("input", function () {
    var searchedData = $(this).val().toLowerCase();
    var $currentContacts = $(".contacts");
    var $searchContacts = $(".search-contacts");

    if (searchedData !== "") {
        $currentContacts.hide();
        $searchContacts.find(".contact").remove();
        $searchContacts.show();
        searchContactsLocal(searchedData);
    } else {
        $currentContacts.show();
        $searchContacts.find(".contact").remove();
        $searchContacts.hide();
    }
});

$('.search-contacts').on('click', '.contact-box', function () {
    alert("Hello");
});
//--- Function that search global contacts ---//
function searchContactsGlobal(searchedData) {
    $.ajax({
        type: "GET",
        url: "api/users",
        headers: {
            "sessionId": localStorage.getItem("sessionId")
        },
        dataType: "xml",
        success: function (data) {
            var contacts = [];

            $(data).find("username").each(function (index, element) {
                contacts.push($(element).html());
            });

            contacts.forEach(function (val) {
                if (val.toLowerCase().indexOf(searchedData) === 0) {
                    console.log(searchedData);
                    console.log(val);
                    updateSearchPage(val);
                }
            });
        }
    });
}

//--- Function that search local contacts ---//
function searchContactsLocal(searchedData) {
    var $currentContacts = $(".contacts");
    var $searchContacts = $(".search-contacts");
    var localContacts = [];

    console.log("In search contacts local");

    $currentContacts.find("p").each(function (index, element) {
        localContacts.push($(element).html());
    });

    localContacts.forEach(function (val) {
        if (val.toLowerCase().indexOf(searchedData) === 0)
            updateSearchPage(val);
    });
}



//--- Function that update search page ---//
function updateSearchPage(foundUser) {
    var $searchContacts = $(".search-contacts");
    $searchContacts.append(component.searchElement);	//component is a global variable in function.js
    $searchContacts.find(".contact-box:last > p").html(foundUser);
}

function addContacts(contact) {
    alert("Hello");
}