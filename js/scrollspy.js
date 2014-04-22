
var mydata, vio, item;

$.getJSON( "data/security-users.json", function( json ) {
	mydata = json;
	createAccessRequest(mydata);
	// for (i=0;i<mydata.length;i++){
		// console.log(mydata[i].user_name);
		// if (i==0) {
		// 	item = "<a href='#' class='list-group-item active'>";
		// }
		// else{
		// 	item = "<a href='#' class='list-group-item'>";
		// }  
		// item += "<span class='ar-name'>"+mydata[i].user_name+"</span><br/>";
  //       item += "<span class='sec-role'>"+mydata[i].role+"</span>";
  //       item += "</a>";

		// $("div.sec-ar-content").append(item);
		// vio = mydata[i].violations;
		// 	for(v=0;v<vio.length;v++){
		// 		if(1==1){
		// 			console.log("<p>"+vio[v].vio_details+"</p>");
		// 			$("p#vio").append("<p><b>"+vio[v].vio_title+" ("+vio[v].vio_details+")"+"</b></p>");
		// 		}
		// 	}
		// det = mydata[i].details;
		// 	for(d=0;d<det.length;d++){
		// 		if(1==1){
		// 			console.log("<p>"+det[d].desc+"</p>");
		// 			$("p#det").append("<p><i>"+det[d].desc+" ("+det[d].assigned_projects+")"+"</i></p>");
		// 		}
		// 	}
	// }
	
 });

// $("a.ar").click(
// 		function (){console.log(this);alert("Captured Click event");}
// 	);

function handleAr(index){
	//Remove the active class on all the item of ar
	$('a.ar').removeClass("active");
	//Add the active class for the selected item
	$('a.ar:eq('+index+')').addClass("active");
	
	//Create violations
	createViolations(mydata[index]);

	//Update the Details
	displayDetails(mydata[index]);
}

function createAccessRequest (mydata){
	for (i=0;i<mydata.length;i++){
		console.log(mydata[i].user_name);
		if (i==0) {
			item = "<a href='#' class='list-group-item active ar' onclick='handleAr("+i+")'>";
			createViolations(mydata[i]);
			displayDetails(mydata[i]);
		}
		else{
			item = "<a href='#' class='list-group-item ar' onclick='handleAr("+i+")'>";
		} 
		item += "<span class='ar-name'>"+mydata[i].user_name+"</span><br/>";
        item += "<span class='sec-role'>"+mydata[i].role+"</span>";
        item += "</a>";
		$("div.sec-ar-content").append(item);
	}
}

function createViolations(viodata){
	var vio = viodata.violations;
	var vio_item = "";
	for(v=0;v<vio.length;v++){
		vio_item += "<span class='sec-vio-title'>";
		vio_item += vio[v].vio_title;
		vio_item += "</span><br/>";
		vio_item += "<span class='sec-vio-content'>";
		vio_item += "<p>"+vio[v].vio_details+"</p>";
		vio_item += "</span><br/>";
	}
	$("div.security-violation").html(vio_item);
}

function displayDetails(detdata){
	var det = detdata.details;
	det_item = "";
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
                };    
        det_item += "</ul>";
        det_item += "</span>";
                    
	}
	console.log(det_item);
	$("div.security-details").html(det_item);
}