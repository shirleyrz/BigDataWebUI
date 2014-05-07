var color = ['#0064af', '#e98300', '#f2b600', '#e05205', '#cd003c'];


function generateRandPieData(){

    var data = [
        {
            value: 1000 * Math.random(),
            color: color[0]
        },
        {
            value: 1000 * Math.random(),
            color: color[1]
        },
        {
            value: 1000 * Math.random(),
            color: color[2]
        },
        {
            value: 100 * Math.random(),
            color: color[3]
        },
        {
            value: 1200 * Math.random(),
            color: color[4]
        }

    ];

    return data;
}


function generatefixedPieData(){

    var data = [
        {
            value: 30,
            color: color[0]
        },
        {
            value: 50,
            color: color[1]
        },
        {
            value: 100,
            color: color[2]
        },
        {
            value: 40,
            color: color[3]
        },
        {
            value: 120,
            color: color[4]
        }

    ]

    return data;
}

function chartDataInit() {

    var color = ['#0064af', '#e98300', '#f2b600', '#e05205', '#cd003c'];

    var chartType = ['security_chart', 'dev_chart', 'api_chart', 'dlp_chart' , 'process_chart', 'service_chart' ];

    var data = generatefixedPieData();

    var c;

    for (var i = 0; i < chartType.length; i++) {

        c = $("canvas[category='" + chartType[i] + "']");
        if (typeof ( c ) == "undefined" || c.length == 0) {
            console.log("Type is undefined: " + chartType[i]);
        } else {
            console.log("Type is defined: " + chartType[i]);
            c.each(function () {
                new Chart($(this).get(0).getContext("2d")).Doughnut(data);
            });
        }

    }


}


/*
 //Security Chart
 //Get context with jQuery - using jQuery's .get() method.
 var ctx = $("[category=security_chart]").get(0).getContext("2d");
 //This will get the first returned node in the jQuery collection.

 var doughnutData = [
 {
 value: 30,
 color: color[0]
 },
 {
 value : 50,
 color: color[1]
 },
 {
 value : 100,
 color: color[2]
 },
 {
 value : 40,
 color: color[3]
 },
 {
 value : 120,
 color: color[4]
 }

 ]
 new Chart(ctx).Doughnut(doughnutData);




 //Dev Operations Chart
 //Get context with jQuery - using jQuery's .get() method.
 var ctx = $("[category=dev_chart]").get(0).getContext("2d");
 //This will get the first returned node in the jQuery collection.

 var data = [
 {
 value: 10,
 color: color[0]
 },
 {
 value : 22,
 color: color[1]
 },
 {
 value : 70,
 color: color[2]
 },
 {
 value : 65,
 color: color[3]
 },
 {
 value : 39,
 color: color[4]
 }

 ]
 new Chart(ctx).Doughnut(data);


 //API CHart
 //Get context with jQuery - using jQuery's .get() method.
 var ctx = $("[category=api_chart]").get(0).getContext("2d");
 //This will get the first returned node in the jQuery collection.

 var data = [
 {
 value: 10,
 color: color[0]
 },
 {
 value : 22,
 color: color[1]
 },
 {
 value : 70,
 color: color[2]
 },
 {
 value : 65,
 color: color[3]
 },
 {
 value : 39,
 color: color[4]
 }

 ]
 new Chart(ctx).Doughnut(data);


 //DLP CHart
 //Get context with jQuery - using jQuery's .get() method.
 var ctx = $("[category=dlp_chart]").get(0).getContext("2d");
 //This will get the first returned node in the jQuery collection.

 var data = [
 {
 value: 300,
 color: color[0]
 },
 {
 value : 50,
 color: color[1]
 },
 {
 value : 25,
 color: color[2]
 },
 {
 value : 15,
 color: color[3]
 },
 {
 value : 2,
 color: color[4]
 }

 ]
 new Chart(ctx).Doughnut(data);

 //process Chart
 //Get context with jQuery - using jQuery's .get() method.
 var ctx = $("[category=process_chart]").get(0).getContext("2d");
 //This will get the first returned node in the jQuery collection.

 var data = [
 {
 value: 100,
 color: color[0]
 },
 {
 value : 220,
 color: color[1]
 },
 {
 value : 730,
 color: color[2]
 },
 {
 value : 45,
 color: color[3]
 },
 {
 value : 150,
 color: color[4]
 }

 ]
 new Chart(ctx).Doughnut(data);


 //service Chart
 //Get context with jQuery - using jQuery's .get() method.
 var ctx = $("[category=service_chart]").get(0).getContext("2d");
 //This will get the first returned node in the jQuery collection.

 var data = [
 {
 value: 90,
 color: color[0]
 },
 {
 value : 34,
 color: color[1]
 },
 {
 value : 70,
 color: color[2]
 },
 {
 value : 40,
 color: color[3]
 },
 {
 value : 5,
 color: color[4]
 }

 ]
 new Chart(ctx).Doughnut(data);

 */
