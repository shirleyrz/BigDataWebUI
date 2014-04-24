/*
Last Updated: April 22, 2014
Developer: Sree
This is the javascript file to support the content loading in the scrollspy and handling the interaction between the tabs.
*/

//global variables - needed in many function throughout
var mydata, vio, item;

//Code to parse the JSON file
$.getJSON( "data/security-users.json", function( json ) {
	mydata = json;
	createAccessRequest(mydata);
 });

//This function called through onclick events to handle the interactions and dynamic content loading
function itemHandler(index, type){
	switch (type){
		case 0: //ar
			//Remove the active class on all the item of ar
			$('a.ar').removeClass("active");
			//Add the active class for the selected item
			$('a.ar:eq('+index+')').addClass("active");
			//Create violations
			createViolations(mydata[index]);
			//Update the Details
			displayDetails(mydata[index], type);
			break;
		case 1: //vio
			//Remove the active class on all the item of vio
			$('a.vio').removeClass("active");
			//Add the active class for the selected item
			$('a.vio:eq('+index+')').addClass("active");
			//Update the Details
			displayDetails(mydata[index], type);
	}
}

//This function populates the Access Request Container
function createAccessRequest (mydata){
	var type = 0;//'ar'
	for (i=0;i<mydata.length;i++){
		console.log(mydata[i].user_name);
		if (i==0) {
			item = "<a href='#' class='list-group-item active ar' onclick='itemHandler("+i+", "+type+" )'>";
			createViolations(mydata[i]);
			displayDetails(mydata[i], type);
		}
		else{
			item = "<a href='#' class='list-group-item ar' onclick='itemHandler("+i+", "+type+" )'>";
		} 
		item += "<span class='ar-name'>"+mydata[i].user_name+"</span><br/>";
        item += "<span class='sec-role'>"+mydata[i].role+"</span>";
        item += "</a>";
		$("div.sec-ar-content").append(item);
	}
}

//This function populates the Violation Container
function createViolations(viodata){
	var vio = viodata.violations;
	var vio_item = "";
	var type = 1;//'vio'
	for(v=0;v<vio.length;v++){
		
		vio_item += "<span class='sec-vio-title'>";
		vio_item += vio[v].vio_title;
		vio_item += "</span><br/>";
		vio_item += "<a href='#' class='list-group-item vio' onclick='itemHandler("+v+", "+type+")'>";
		vio_item += "<span class='sec-vio-content'>";
		vio_item += "<p>"+vio[v].vio_details+"</p>";
		vio_item += "</span><br/>";
		vio_item += "</a>";
	}
	$("div.security-violation").html(vio_item);
}

//This function displays the details Container
function displayDetails(detdata, type){
	var det = detdata.details;
	det_item = "";
	//console.log("inside displayDetails");
	
	switch (type){
		case 0: //"ar":
			for(d=0;d<det.length;d++){
				det_item += "<span class='sec-details-name'>"+detdata.user_name+"</span><br/>";
				det_item += "<span class='sec-details-role'>"+detdata.role+"</span><br/><br/>";
				det_item += "<span class='sec-details-desc-title'>Description</span>";
				det_item += "<span class='sec-details-desc-content'><p>"+det[d].desc+"</p></span><br/>";
				det_item += "<span class='sec-details-ap-title'>Assigned Projects</span>";
				det_item += "<span class='sec-details-ap-content'>";
		        det_item += "<ul>";
		            for (var j = 0; j < det[d].assigned_projects.length; j++) {
		                	det_item += "<li>" + det[d].assigned_projects[j] + "</li>";
		                }   
		        det_item += "</ul>";
		        det_item += "</span>";
		        det_item += "<br/><span class='sec-details-vio'></span>";
		        console.log(det_item);
				$("div.security-details").html(det_item);
			}
			break;
		case 1: //vio":
			var vio = detdata.violations;
			det_item += "<br/><span class='sec-details-desc-title'>Violation Info</span><br/>";
			det_item += "<span class='sec-details-desc-content'><p>"+vio[d].vio_details+"</p></span><br/>";
			$(".sec-details-vio").html(det_item);
			break;
	}
}