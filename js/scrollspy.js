/*
Last Updated: April 22, 2014
Developer: Sree
This is the javascript file to support the content loading in the scrollspy and handling the interaction between the tabs.
*/


/*Jobs Tab */

//global variables - needed in many function throughout
var jobdata;
//Code to parse the JSON file
$.getJSON( "data/jobs-alerts-scrollspy.json", function( json ) {
	jobdata = json;
	console.log(jobdata[0]);
	populateJobInfo(jobdata[0]);
	populateJobAlert(jobdata[0].alerts);
 });

//function populates the job info container
function populateJobInfo(infodata){
	$(".job-info-jobtitle-content").html(infodata.job_title);
	$(".job-info-status-content").html(infodata.comp_status);
	$(".job-info-jobduration-content").html(infodata.job_duration);
	$(".job-info-cpu-content").html(infodata.avg_cpu_usage);
}

//function to populate alert container
function populateJobAlert(alertdata){
	var alert_item="";
	var type= 2; //"jalert";
	console.log("alertdata"+alertdata);
	for (var itr=0;itr<alertdata.length;itr++){
		//console.log("Alert Name"+alertdata[itr].alert_name);
		if(itr==0) {
			alert_item += "<a href='#' class='list-group-item active jalert' onclick='itemHandler("+itr+", "+type+" )'>"+alertdata[itr].alert_name+"</a>";
			alertDescription(alertdata[itr]);
		}
		else{
			alert_item += "<a href='#' class='list-group-item jalert' onclick='itemHandler("+itr+", "+type+" )'>"+alertdata[itr].alert_name+"</a>";
		}
		
	}
	console.log("Job alerts:"+alert_item);
	$(".job-alerts-content").html(alert_item);
}

function alertDescription(alertdesc){
	$(".alert-description-title").html("Alert: "+alertdesc.alert_name);
	$(".alert-date").html(alertdesc.alert_date);
	$(".alert-time").html(alertdesc.alert_time);
	$(".alert-impact").html(alertdesc.job_impact);
	$(".alert-severity").html(alertdesc.severity);
	$(".alert-description-content-body").html("<p>"+alertdesc.desc+"</p>");
}


//Security Tab

//global variables - needed in many function throughout
var secdata, vio, item;
//Code to parse the JSON file
$.getJSON( "data/security-users.json", function( json ) {
	secdata = json;
	createAccessRequest(secdata);
 });

//This function populates the Access Request Container
function createAccessRequest (secdata){
	var type = 0;//'ar'
	for (var i=0;i<secdata.length;i++){
		console.log(secdata[i].user_name);
		if (i==0) {
			item = "<a href='#' class='list-group-item active ar' onclick='itemHandler("+i+", "+type+" )'>";
			createViolations(secdata[i]);
			displayDetails(secdata[i], type);
		}
		else{
			item = "<a href='#' class='list-group-item ar' onclick='itemHandler("+i+", "+type+" )'>";
		} 
		item += "<span class='ar-name'>"+secdata[i].user_name+"</span><br/>";
        item += "<span class='sec-role'>"+secdata[i].role+"</span>";
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


//This function called through onclick events to handle the interactions and dynamic content loading
/*
type= 0; //"security ar";
type= 1; //"security vio";
type= 2; //"job-alerts";
*/
function itemHandler(index, type){
	switch (type){
		case 0: //ar
			//Remove the active class on all the item of ar
			$('a.ar').removeClass("active");
			//Add the active class for the selected item
			$('a.ar:eq('+index+')').addClass("active");
			//Create violations
			createViolations(secdata[index]);
			//Update the Details
			displayDetails(secdata[index], type);
			break;
		case 1: //vio
			//Remove the active class on all the item of vio
			$('a.vio').removeClass("active");
			//Add the active class for the selected item
			$('a.vio:eq('+index+')').addClass("active");
			//Update the Details
			displayDetails(secdata[index], type);
			break;
		case 2: //job-alerts
		 	//Remove the active class on all the item of job alerts
		 	$('a.jalert').removeClass("active");
		// 	//Add the active class for the selected item
		 	$('a.jalert:eq('+index+')').addClass("active");
		 	//Update the Details
			alertDescription(jobdata[0].alerts[index]);
			break;
	}
}