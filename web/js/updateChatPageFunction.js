
//-- Action when searching for user ---//

$("#search-input-global").on("input", function () {
    var searchedData = $(this).val().toLowerCase();
    var $searchContacts = $(this).parent().find(".search-contacts");
	
    //console.log($searchContacts);
		
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
    var $currentContacs= $(this).parent().find(".contacts");
    var $searchContacts = $(this).parent().find(".search-contacts");
	
    //console.log($searchContacts);
		
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
            var contactsAll = [];
            var contactsCurr = user.contacts;
            
            $(data).find("username").each( function (index, element) {
                contactsAll.push($(element).html());
            });
						
            contactsAll.forEach(function (val) {
                val = val.toLowerCase();
				var inCurrentContactsIndex = $.inArray(val, contactsCurr);
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
	
	console.log("In search contacts local");
	
	localContacts.forEach( function(val) {
		if (val.toLowerCase().indexOf(searchedData) === 0)
			updateSearchPage(val, $searchElement);
	});
}



//--- Function that update search page ---//
function updateSearchPage(foundUser, $searchElement) {
    $searchElement.append(components.searchElement);	//components is a global variable in component.js
    $searchElement.find(".contact-box:last > p").html(foundUser);
}