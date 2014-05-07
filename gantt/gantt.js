/**
 * Created by Rong on 5/1/2014.
 */

var demo_tasks = {
    data:[
        {"id":1, "text":"1","start_date":"01-04-2013 3:00:00", "end_date":"01-04-2013 5:00:00" , "order":"10", progress: 0.4, priority:1  },
        {"id":2, "text":"2", "start_date":"01-04-2013 9:00:00", "end_date":"01-04-2013 13:00:00",  "order":"20",progress:0.5, priority:1, parentTask:1 },
        {"id":3, "text":"3", "start_date":"02-04-2013 0:00:00", "end_date":"03-04-2013 10:00:00",  "order":"20", progress: 0.6,  priority:1 },
        {"id":4, "text":"4", "start_date":"03-04-2013 15:00:00", "end_date":"04-04-2013 8:30:00",  "order":"20",  progress: 0.5, priority:1 , parentTask:3},
        {"id":5, "text":"1.1", "start_date":"03-04-2013 15:00:00", "end_date":"03-04-2013 18:30:00",  "order":"10",  progress: 0.5, priority:1 }
    ],
    links:[
        {id:"1",source:"1",target:"2",type:"0"},
        {id:"2",source:"2",target:"3",type:"0"},
        {id:"3",source:"3",target:"4",type:"0"},
        {id:"4",source:"4",target:"5",type:"0"}

    ]
};

/*
$.getJSON('data/gantt.json', function (data) {
    demo_tasks = data;
});
*/

function modSampleHeight(){
    var headHeight = 122;
    var sch = document.getElementById("gantt_here");
    sch.style.height = (parseInt(document.body.offsetHeight)-headHeight)+"px";
    gantt.setSizes();
}

gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    if (gantt_filter)
        if (task.priority != gantt_filter)
            return false;

    return true;
});

gantt.templates.scale_cell_class = function(date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend";
    }
};
gantt.templates.task_cell_class = function(item,date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend" ;
    }
};

var gantt_filter = 0;
function filter_tasks(node){
    gantt_filter = node.value;
    gantt.refreshData();
}


function show_scale_options(mode){
    var hourConf = document.getElementById("filter_hours"),
        dayConf = document.getElementById("filter_days");
    if(mode == 'day'){
        hourConf.style.display = "none";
        dayConf.style.display = "";
        dayConf.getElementsByTagName("input")[0].checked = true;
    }else if(mode == "hour"){
        hourConf.style.display = "";
        dayConf.style.display = "none";
        hourConf.getElementsByTagName("input")[0].checked = true;
    }else{
        hourConf.style.display = "none";
        dayConf.style.display = "none";
    }
}
function set_scale_units(mode){
    if(mode && mode.getAttribute){
        mode = mode.getAttribute("value");
    }

    switch (mode){
        case "work_hours":
            gantt.config.subscales = [
                {unit:"hour", step:1, date:"%H"}
            ];
            gantt.ignore_time = function(date){
                if(date.getHours() < 9 || date.getHours() > 16){
                    return true;
                }else{
                    return false;
                }
            };

            break;
        case "full_day":
            gantt.config.subscales = [
                {unit:"hour", step:3, date:"%H"}
            ];
            gantt.ignore_time = null;
            break;
        case "work_week":
            gantt.ignore_time = function(date){
                if(date.getDay() == 0 || date.getDay() == 6){
                    return true;
                }else{
                    return false;
                }
            };

            break;
        default:
            gantt.ignore_time = null;
            break;
    }
    gantt.render();
}


function zoom_tasks(node){
    switch(node.value){
        case "week":
            gantt.config.scale_unit = "day";
            gantt.config.date_scale = "%d %M";

            gantt.config.scale_height = 60;
            gantt.config.min_column_width = 30;
            gantt.config.subscales = [
                {unit:"hour", step:1, date:"%H"}
            ];
            show_scale_options("hour");
            break;
        case "trplweek":
            gantt.config.min_column_width = 70;
            gantt.config.scale_unit = "day";
            gantt.config.date_scale = "%d %M";
            gantt.config.subscales = [ ];
            gantt.config.scale_height = 35;
            show_scale_options("day");
            break;
        case "month":
            gantt.config.min_column_width = 70;
            gantt.config.scale_unit = "week";
            gantt.config.date_scale = "Week #%W";
            gantt.config.subscales = [
                {unit:"day", step:1, date:"%D"}
            ];
            show_scale_options();
            gantt.config.scale_height = 60;
            break;
        case "year":
            gantt.config.min_column_width = 70;
            gantt.config.scale_unit = "month";
            gantt.config.date_scale = "%M";
            gantt.config.scale_height = 60;
            show_scale_options();
            gantt.config.subscales = [
                {unit:"week", step:1, date:"#%W"}
            ];
            break;
    }
    set_scale_units();
    gantt.render();
}

show_scale_options("day");
gantt.config.details_on_create = true;

gantt.templates.task_class = function(start, end, obj){
    return obj.project ? "project" : "";
}

gantt.config.columns = [
    {name:"text",       label:"Task name",  width:"*", tree:true },
    {name:"progress",   label:"Status",  template:function(obj){
        return Math.round(obj.progress*100)+"%";
    }, align: "center", width:60 },
    {name:"priority",   label:"Priority",  template:function(obj){
        return gantt.getLabel("priority", obj.priority);
    }, align: "center", width:60 },
    {name:"add",        label:"",           width:44 }
];
gantt.config.grid_width = 390;

gantt.attachEvent("onTaskCreated", function(obj){
    obj.duration = 4;
    obj.progress = 0.25;
})

gantt.locale.labels["section_priority"] = "Priority";
gantt.config.lightbox.sections = [
    {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
    {name: "priority", height: 22, map_to: "priority", type: "select", options: [
        {key:"1", label: "Low"},
        {key:"0", label: "Normal"},
        {key:"2", label: "High"} ]},
    {name: "time", height: 72, type: "duration", map_to: "auto", time_format:["%d","%m","%Y","%H:%i"]}
];

gantt.init("gantt_here");
modSampleHeight();
gantt.parse(demo_tasks);