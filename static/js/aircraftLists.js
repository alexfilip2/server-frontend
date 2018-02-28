/*add all the database aircrafts to lists
  add listeners
 */
function onLoad(aircraftList) {
    if(aircraftList == undefined) return;
    AIRCRAFTLIST = aircraftList;
    if(document.getElementById("dropDownList" ) == undefined) return;

    addAircraftItems(aircraftList);
    addListenersToDropdownItems();
    AddListenerToMultiSelect();
	pullDashboardData();
}

/*fills the lists with the list of aircrafts already in the database on web page open*/
function addAircraftItems(data) {
    for (i = 0; i < data.length; i++) {
        addNewAircraftItems(data[i]);
    }
}

/* adds event listener on the dropdown of Insights panel so it handles dynamically added items*/
function addListenersToDropdownItems() {
    var dropmenu = document.getElementById('dropDownList');
    dropmenu.addEventListener("click", function (e) {
        if (e.target && e.target.matches("li.highlight-on-hover")) {
            event.preventDefault();
            clearCache();
            var argument = "?engine=" + e.target.innerHTML.split(' ')[1];
            getEngineFromBackEnd(displayInfoToUser, argument, "insightsUserMessage");
            document.getElementById('dropDownButton').innerHTML = "Selected: " +  e.target.innerHTML + "<span class=\"glyphicon glyphicon-menu-down\" style=\"margin-left: 20px \"></span>";
        }
    });
}

/*takes an aircraft id and adds it to the list and dropdown- after new testing data is uploaded and predictions computed */
function addNewAircraftItems(newAircraft) {
    document.getElementById('dropDownList').innerHTML += "<li class = \"highlight-on-hover\">" + newAircraft + "</li>";
}

/* Filter function for the dropdown menu, so that users can search though the list faster */
function filterFunction() {
    var input, filter, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("dropDownList");
    a = div.getElementsByTagName("li");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}