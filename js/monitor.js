/**
 * Created by Rong on 3/25/14.
 */


$(document).ready(function () {
    chartDataInit();//generate random data for chart
  //  rightNavbarInit();//add animation to nav bar
    rightNavbarConstruct();//Construct Nav Bar
    chartInit();// load the chart
    buttonInit();//add click function to buttons inside the chart
    chartFilter(); // filter chart to hide or display
});

// ADD ANIMATION TO NAVBAR
function rightNavbarInit() {
    $("#rightNavbar").accordion({
        accordion: false,
        speed: 500,
        closedSign: '',
        openedSign: ''
    });
}

//ADD CHARTID AS THE ITEM OF NAVBAR
function rightNavbarConstruct() {
    var chartID = ["Clusters", "Applications"];
    var itemID = ["clusterIterm", "appIterm"];
    for (var i = 0; i < chartID.length; i++) {
        var curID = chartID[i];
        var curCount = chartCount(curID);
        var list = $("#" + itemID[i]);
        //  console.log("CurrentID=" + curID + "; counter#=" + curCount);
        if (curCount > 0) {
            $("#" + curID + " .chart").each(function () {

                    var svg = $(document.createElementNS("http://www.w3.org/2000/svg", "svg")).attr('height',30).attr('width',30);
                    $(SVG('circle'))
                        .attr('cx', 15)
                        .attr('cy', 15)
                        .attr('r', 6)
                        .attr('fill', 'none')
                        .attr('stroke', 'lightgrey')
                        .attr('stroke-width', 1)
                        .appendTo(svg);

                    var li = $("<li id='li_" + this.id + "' />").append(svg).append($("<a/>").append(this.id));
                    list.append(li);

                }
            );
        }
    }

    function SVG(tag)
    {
        return document.createElementNS('http://www.w3.org/2000/svg', tag);
    }
}

//COUNT #CHART UNDER DIV WITH CHARTID
function chartCount(chartsID) {
    var chartCount = 0;
    var chart = $("#" + chartsID + " .chart");
    if ((typeof(chart) !== "undefined") && (chart.length > 0)) {
        chartCount = chart.length;
    }
    return chartCount;
}

//FILTER CHART TO DISPLAY
function chartFilter() {

    var allItem = $("#rightNavbar > li > a");
    var clusterChartID;
    allItem.click(function () {
        if($(this).attr("id")=="allClusters"){
            $("#Applications .chart").each(function (e) {
                $(this).hide();
            });
            $("#Clusters .chart").each(function (e) {
                $(this).show();
                    clusterChartID = $(this).attr("id");
                    $("#Applications .chart[cluster='"+ clusterChartID +"']").each(function (e) {
                        if ($(this).attr("cluster") == clusterChartID) {
                            $(this).show();
                        }
                    });
                }
            );
        }else if($(this).attr("id")=="allApps"){
            $("#Clusters .chart").each(function (e) {
                $(this).hide();
            });
            $("#Applications .chart").each(function (e) {
                    $(this).show();
                    clusterChartID = $(this).attr("cluster");
                    $("#"+clusterChartID).show();
                    });
        }
    });

    //console.log
    var item = $("#rightNavbar li ul li");
    var chartID;
    var appChartID, clusterChartID;
    item.click(function (e) {
            chartID = $(this).attr('id');
            chartID = chartID.substring(3,chartID.length);
            //       console.log("item click:" + chartID);
            var chart = $("div #" + chartID);

            // if choose to show App chart, show its corresponding clusters
            if (chart.parent().attr('id') == "Applications") {
                appChartID = chartID;
                clusterChartID = chart.attr("cluster");


                // hide irrelevant APP Charts & Show related APP Charts
                $("#Applications .chart").each(function (e) {
                        if ($(this).attr("id") == appChartID) {
                            //                     console.log("show:" + $(this).attr("id"));
                            $(this).show();
                        } else {
                            $(this).hide();
                            //                   console.log("hide:" + $(this).attr("id"));
                        }
                    }
                );

                // hide irrelevant CLUSTER Charts & Show related CLUSTER Charts
                $("#Clusters .chart").each(function (e) {
                        if ($(this).attr("id") == clusterChartID) {
                            //                console.log("show:" + $(this).attr("id"));
                            $(this).show();
                        } else {
                            $(this).hide();
                            //                console.log("hide:" + $(this).attr("id"));
                        }
                    }
                );

                // if choose to show Cluster chart, show its corresponding apps
            } else if (chart.parent().attr('id') == "Clusters") {

                clusterChartID = chartID;

                // hide irrelevant CLUSTER Charts & Show related CLUSTER Charts
                $("#Clusters .chart").each(function (e) {
                        if ($(this).attr("id") == clusterChartID) {
                            //  console.log("show:" + $(this).attr("id"));
                            $(this).show();
                        } else {
                            $(this).hide();
                            //  console.log("hide:" + $(this).attr("id"));
                        }
                    }
                );

                // hide irrelevant APP Charts & Show related APP Charts
                $("#Applications .chart").each(function (e) {

                    if ($(this).attr("cluster") == clusterChartID) {
                        $(this).show();
                        //            console.log("show:" + $(this).attr("id"));
                    } else {
                        $(this).hide();
                        //            console.log("hide:" + $(this).attr("id"));
                    }
                });
            }
        }
    );
}