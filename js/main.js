// add click function for button on the chart
function buttonInit() {
    $('button').click(function () {
        var category = $(this).closest("div").attr("category").toString();
        var parentId = $(this).parent().parent().parent().attr("id").toString();
        if ($(this).hasClass("bar")) {
            switch (category) {
                case 'security':
                    changeBar(parentId, "security_chart");
                    break;
                case 'dev':
                    changeBar(parentId, "dev_chart");
                    break;
                case 'api':
                    changeBar(parentId, "api_chart");
                    break;
                case 'dlp':
                    changeBar(parentId, "dlp_chart");
                    break;
                case 'process':
                    changeBar(parentId, "process_chart");
                    break;
                case 'service':
                    changeBar(parentId, "service_chart");
                    break;
            }
        } else if ($(this).hasClass("line")) {
            switch (category) {
                case 'security':
                    changeLine(parentId, "security_chart");
                    break;
                case 'dev':
                    changeLine(parentId, "dev_chart");
                    break;
                case 'api':
                    changeLine(parentId, "api_chart");
                    break;
                case 'dlp':
                    changeLine(parentId, "dlp_chart");
                    break;
                case 'process':
                    changeLine(parentId, "process_chart");
                    break;
                case 'service':
                    changeLine(parentId, "service_chart");
                    break;
                default:
                    changeLine(parentId, "neither");
            }
        } else if ($(this).hasClass("pie")) {
            switch (category) {
                case 'security':
                    changePie(parentId, "security_chart");
                    break;
                case 'dev':
                    changePie(parentId, "dev_chart");
                    break;
                case 'api':
                    changePie(parentId, "api_chart");
                    break;
                case 'dlp':
                    changePie(parentId, "dlp_chart");
                    break;
                case 'process':
                    changePie(parentId, "process_chart");
                    break;
                case 'service':
                    changePie(parentId, "service_chart");
                    break;
                default:
                    changePie(parentId, "neither");
            }
        }

    });

    console.log("Complete button initialization!");
}
/*reload every chart*/
function chartInit() {
    var id;
    var count = 0;
    var existingCardList = $("div  .chart ");
    // check if chartCard has id, if not/wrongID then set the ID for the div
    existingCardList.each(function () {
        id = $(this).attr("id");
        if (typeof(id) !== "undefined" && id != "sampleCard") {
            changePie(id, $("#" + id + " canvas").attr("category"));
        }
    });
    console.log("Complete button initialization!");
}


function addCard(type) {

    console.log("this is addCard method. add type = " + type);
    var idForFilter;
    var idPrefix;
    var btnID;

    if (type == "cluster" || type == "application") {

        if (type == "cluster") {
            console.log("this is cluster loop ");
            idForFilter = "Clusters";
            idPrefix = "Cluster";
            btnID = "btnNewCluster";
        } else if (type == "application") {
            idForFilter = "Applications";
            idPrefix = "Application";
            btnID = "btnNewApplication";
        }


        var row = $("#" + idForFilter + " .row");
        var cardListParent = $("#" + idForFilter);
        var existingCardList = cardListParent.children();

        // # of existing Card
        var length = existingCardList.length - 1;
        console.log("length before add card:  " + length);

        //append sampleCard to cardList
        if (length < 0) {
            console.log("error length");
        } else if (length === 0) {
            $("#sampleCard").clone(true).attr("id", idPrefix + ++length).prependTo(cardListParent);
        } else {
            $("#" + btnID).before($("#sampleCard").clone(true).attr("id", idPrefix + ++length));
        }

        console.log("new chart id:  " + idPrefix + length);

        //update new chartCard
        changePie(idPrefix + length, $("#sampleCard canvas").attr("category"));

    } else {
        console.log("Wrong type card to add: "+ type);
    }

}


function changeBar(parentID, chartName) {
    console.log("[ChangeBar]parentID = " + parentID + ", chartType = ", chartName);
    var canvas = $("#" + parentID + " .overview_chart" + "[category='" + chartName + "']");
    var ctx = canvas.get(0).getContext("2d");
    var options = {
        scaleFontSize: 7,
        scaleOverride: false,
        scaleSteps: 2,
        //Number - The value jump in the hard coded scale
        scaleStepWidth: 4,
        //Number - The scale starting value
        scaleStartValue: 10
    }
    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    }
    new Chart(ctx).Bar(data, options);
    changeButtonOpacity(parentID, "bar");

}


//change the selected button's opacity
function changeButtonOpacity(parentID, btnType) {
    $("#" + parentID + " button").each(function () {
        if ($(this).hasClass(btnType)) {
            $(this).css("border-color", "#adadad");
            $(this).css("z-index", 2);
            $("img", this).css('opacity', 1);
        } else {
            $(this).css("border-color", "#ccc");
            $(this).css("z-index", 1);
            $("img", this).css("opacity", 0.2);
        }

    })

}


//Line Graph
function changeLine(parentID, chartName) {
    console.log("[ChangeLine]parentID = " + parentID + ", chartType = ", chartName);
    var canvas = $("#" + parentID + " .overview_chart" + "[category='" + chartName + "']");
    var ctx = canvas.get(0).getContext("2d");
    var options = {
        scaleFontSize: 5,
        pointDotRadius: 1
    }
    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                fillColor: "#dae8ef",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    }
    new Chart(ctx).Line(data, options);
    changeButtonOpacity(parentID, "line");
}


//Pie Graph
function changePie(parentID, chartName) {
    console.log("[ChangePie]parentID = " + parentID + ", chartType = ", chartName);
    var canvas = $("#" + parentID + " .overview_chart" + "[category='" + chartName + "']");
    var data = generateRandPieData();
    var ctx = canvas.get(0).getContext("2d");
    new Chart(ctx).Doughnut(data);
    changeButtonOpacity(parentID, "pie");
    changeRightNavTagColor(parentID, data);
}


function changeRightNavTagColor(parentID, data){

    var maxValue = -1;
    var majorColor = 'black';
    $(data).each(function(){
        if(this.value > maxValue){
            maxValue= this.value;
            majorColor=this.color;
        }
    });
    var circle = $('li#li_'+parentID +'>svg>circle');
    circle.attr('fill', majorColor);

}




