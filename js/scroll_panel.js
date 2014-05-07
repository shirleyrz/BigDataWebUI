/**
 * Created by Rong on 4/8/2014.
 */


var imported = document.createElement('script');
imported.src = '///code.jquery.com/ui/1.10.4/jquery-ui.js';
document.head.appendChild(imported);


$(function () {


    $.getJSON('data/7-8.json', function (data) {
        var count = data.length;
        var i = 0;
        while (i++ < count) {
            $(".scroll-content").append($("<div class='col-md-12 scroll-content-item'/>"));
            $(".scroll-small-content").append($("<div class='col-md-12 scroll-small-content-item'/>"));
        }

        constructScrollBar();

        i = 0;
        $(".scroll-content-item").each(function () {
            drawChart(i, data[i++]);
        });


        adjustPosition();

    });


});

function constructScrollBar() {
    //scrollpane parts
    var scroll_pane = $(".scroll-pane");
    var scroll_content = $(".scroll-content");
    var scroll_content_item = $(".scroll-content-item");
    var scroll_small_content_item = $(".scroll-small-content-item");


    //build slider
    var scrollbar = $(".scroll-bar").slider({
        slide: function (event, ui) {
            if (scroll_content.width() > scroll_pane.width()) {
                scroll_content.css("margin-left", Math.round(
                    ui.value / 100 * ( scroll_pane.width() - scroll_content.width() )
                ) + "px");
            } else {
                scroll_content.css("margin-left", 0);
            }
        }
    });

    //append icon to handle
    var handleHelper = scrollbar.find(".ui-slider-handle")
        .mousedown(function () {
            scrollbar.width(handleHelper.width());
        })
        .mouseup(function () {
            scrollbar.width("100%");
        }).append("<span class='scroll-bar-small'></span>")
        .wrap("<div class='ui-handle-helper-parent'></div>").parent();


    setChartSize();


    function setChartSize() {
        // set the chart size
        var numItem = scroll_content.children().length;
        var scroll_bar_width = $(".scroll-small-content").outerWidth();
        var panelTotalLength = (scroll_pane.width() / 4) * numItem; //assume each big chart: width = 318px, left/right margin = 10px; left/right border=1px
        var smallItemWidthIn = scroll_bar_width / numItem; // assume each small chart: left/right margin = 5px; include left/right border=1px
        scroll_content.css("width", panelTotalLength);
        scroll_content_item.css("width", scroll_pane.width() / 4 - 20);
        scroll_small_content_item.css("width", smallItemWidthIn);
        $(".scroll-bar-wrap").width(scroll_pane.width());
    }


//size scrollbar and handle proportionally to scroll distance
    function sizeScrollbar() {
        var scrollbar = $(".scroll-bar");
        var remainder = scroll_content.width() - scroll_pane.width();
        var proportion = remainder / scroll_content.width();
        var handleSize = scroll_pane.width() - ( proportion * scroll_pane.width() );
        scrollbar.find(".ui-slider-handle").css({
            width: handleSize,
            "margin-left": -handleSize / 2
        });
        handleHelper.width("").width(scrollbar.width() - handleSize);
    }


//reset slider value based on scroll content position
    function resetValue() {
        var remainder = scroll_pane.width() - scroll_content.width();
        var leftVal = scroll_content.css("margin-left") === "auto" ? 0 :
            parseInt(scroll_content.css("margin-left"));
        var percentage = Math.round(leftVal / remainder * 100);
        scrollbar.slider("value", percentage);
    }

//if the slider is 100% and window gets larger, reveal content
    function reflowContent() {
        var showing = scroll_content.width() + parseInt(scroll_content.css("margin-left"), 10);
        var gap = scroll_pane.width() - showing;
        if (gap > 0) {
            scroll_content.css("margin-left", parseInt(scroll_content.css("margin-left"), 10) + gap);
        }
    }


//change handle position on window resize
    $(window).resize(function () {
        // TODO: how to fix the scroll BAR while changing window??
        /* resetValue();
         sizeScrollbar();
         reflowContent();
         recontructSmallContent();*/

    });
    //init scrollbar size
    setTimeout(sizeScrollbar, 10);//safari wants a timeout

}


function drawChart(i, json) {

    var bg;
    var data = [
        {
            display_text: true,
            title: "",
            value: json.progress,
            color: ""
        }
    ];

    var sampleChart = $("<div/>").addClass("chartCard").append("<div class='text_list'/>").append("<div class='doughnutChart' style='float:right'/>");
    $(sampleChart).children(".text_list").append("<h4 class='chart-title'>" + json.title + "</h4>").append("<h5 class = 'chart-subtitle'>Status</h5>").
        append("<h5 class = 'chart-subtitle'>Duration </h5>").
        append("<h5 class = 'chart-subtitle'>Alerts</h5>");
    var title_list = $($(sampleChart).children(".text_list").children("h5"));
    $(title_list[0]).append("<h6 class='subtitle-status'>" + ((json.status.toLowerCase().indexOf("failed") >= 0)? "<p class='red-text'>"+json.status+"</p>: " +json.error : json.status) + "</h6>");
    $(title_list[1]).append("<h6 class='subtitle-duration'>" + json.duration + "</h6>");
    $(title_list[2]).append("<h6 class='subtitle-alert'>" + (json.Alerts.count > 0 ? "● "+json.Alerts.count + " " + json.Alerts.type +(json.Alerts.count > 1? "s":"") : "none") + "</h6>");

    var sampleSmallChart = $("<div/>").addClass("smallChartCard").append("<div class='doughnutChart' style='float:right'/>");

    var smallItem = $($(".scroll-small-content-item").get(i));

    var t = Math.min(smallItem.width(), smallItem.height());
    sampleSmallChart.children('.doughnutChart').height(t);
    sampleSmallChart.children('.doughnutChart').width(t);

    $($(".scroll-content-item").get(i)).append(sampleChart);
    $(smallItem).append(sampleSmallChart);

    /*TODO: dealing with the mapping of chart-type and color and background-pic*/
    if (json.status.toLowerCase().indexOf("failed") >= 0) {
        bg = "warning";
        data[0].color = "#cd003c";
    } else if (json.status.toLowerCase().indexOf("sucessful with warning") >= 0) {
        bg = "successful";
        data[0].color = "green";
    } else if (json.status.toLowerCase().indexOf("sucessful") >= 0) {
        bg = "";
        data[0].color = "green";
    } else if (json.status.toLowerCase().indexOf("in progress") >= 0) {
        bg = "loading";
        data[0].color = "#6666ff";
    } else if (json.status.toLowerCase().indexOf("loading") >= 0) {
        bg = "loading";
        data[0].color = "#e98300";
    } else {
        bg = "cap";
        data[0].color = "#f2b600";
    }


    // set background size

    $($($(".scroll-content-item").get(i)).children('.chartCard').children('.doughnutChart')).drawDoughnutChart(data);
    $(smallItem).children('.smallChartCard').children('.doughnutChart').css('padding', 0).drawDoughnutChart(data);

    var temp_small = 0.3 * (Math.min(sampleSmallChart.children('.doughnutChart').width(), sampleSmallChart.children('.doughnutChart').height()));
    var temp_big = 0.5 * (Math.min(sampleChart.children('.doughnutChart').width(), sampleChart.children('.doughnutChart').height()));

    sampleChart.children('.doughnutChart').addClass(bg).css('background-size', temp_big + "px");
    sampleSmallChart.children('.doughnutChart').addClass(bg).css('background-size', temp_small + "px");

}


// change the scroll-small-item position

function adjustPosition() {
    var chartCard = $('.col-md-12.scroll-small-content-item .smallChartCard');
    var outerHeight = chartCard.outerHeight();
    var outerWidth = chartCard.outerWidth();

    chartCard.children('.doughnutChart').css({
        position: 'absolute',
        left: (outerWidth - chartCard.children('.doughnutChart').width()) / 2,
        top: (outerHeight - chartCard.children('.doughnutChart').height()) / 2
    });
}


