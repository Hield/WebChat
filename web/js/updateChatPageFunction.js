
//-- Action when searching for user ---//
$(".search-input").on("input", function () {
	var searchedData = $(this).val().toLowerCase();
	var $currentContacts = $(".contacts");
	var $searchContacts = $(".search-contacts");

	if (searchedData != "") {
		$currentContacts.hide();
		$searchContacts.find(".contact").remove();
		$searchContacts.show();
		searchContactsFunction(searchedData);
	}
	else if (searchedData == "") {
		$currentContacts.show();
		$searchContacts.hide();
	}
});


//--- Function that search for contacts ---//
function searchContactsFunction(searchedData) {
	$.ajax({
		type: "GET",
		url: "api/users",
		headers: {
			"sessionId": localStorage.getItem("sessionId")
		},
		dataType: "xml",
		success: function (data) {
			var contacts = [];
			
			$(data).find("username").each( function(index, element) {
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

//--- Function that update search page ---//
function updateSearchPage(foundUser) {
	var $searchContacts = $(".search-contacts");
	$searchContacts.append(component.searchElement);	//component is a global variable in function.js
	$searchContacts.find(".contact-box:last > p").html(foundUser);
}