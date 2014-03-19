//JQuery to handle the button clicks
$('#moveSingle').click(function(e){
    console.log($(this).html());
    var dir = ($(this).html().toString().indexOf("glyphicon-chevron-left") == -1)  ? "l2r" : "r2l";
    console.log("Direction: "+dir);
    //alert("Single Move Operation");
    var selectedValues = $('#inputAllJobs').val();
    //alert("selected val"+selectedValues);


    //moveItems(selectedOpts,"inputAllJobs","inputSelectJobs",e);

    if(dir=="l2r"){
        srcSelectItemId = "inputAllJobs";
        targetSelectItemId = "inputSelectJobs";
    }
    else{
        srcSelectItemId = "inputSelectJobs";
        targetSelectItemId = "inputAllJobs";
    }

    var selectedOpts = $('#'+srcSelectItemId+' option:selected');
    if(selectedOpts==null){
        alert("No Items selected");
    }
    else{
        moveItems(selectedOpts,srcSelectItemId,targetSelectItemId,e);
    }

    //The item is moved to the destination and hence the button should be maed hidden until any other item gets selected by the user
    $('#moveSingle').css("visibility", "hidden");
});

$('#moveAll').click(function(e){

    var dir = ($(this).html().toString().indexOf("glyphicon-chevron-left") == -1)  ? "l2r" : "r2l";
    console.log(dir);

    var selectedValues = $('#inputAllJobs option');
    if(dir=="l2r")
    {
        selectedValues = $('#inputAllJobs option');
        srcSelectItemId = "inputAllJobs";
        targetSelectItemId = "inputSelectJobs";
    }
    else
    {
        selectedValues = $('#inputSelectJobs option');
        srcSelectItemId =  "inputSelectJobs";
        targetSelectItemId = "inputAllJobs";
    }

    //moveToRight(selectedValues,"inputAllJobs","inputSelectJobs",e);
    moveItems(selectedValues,srcSelectItemId,targetSelectItemId,e);

    //Toggle the icon
    toggleMoveButton('inputAllJobs',dir);
});

//function to toggle the move all button to point to the required direction
function toggleMoveButton(buttonId,dir){
    if(dir == "l2r")
        $('.glyphicon-chevron-right').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
    else
        $('.glyphicon-chevron-left').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
}


//function to move the selected objects to the right box
function moveItems(selectedOpts,srcSelectItemId, targetSelectItemId,e){
    $('#'+targetSelectItemId).append($(selectedOpts).clone());
    $(selectedOpts).remove();
    e.preventDefault();
}

//Jquery to handle the symbol on the buttons and its visibility
$('select#inputAllJobs').change(function(){
    //The user select some option and hence the single arrow functionality should be enabled for the user to move the item
    $('#moveSingle').css("visibility", "visible");
    var dir = ($('#singleArrow').attr('class').toString().indexOf("glyphicon-chevron-left") == -1)  ? "l2r" : "r2l";
    console.log(dir);
    if(dir=="r2l")
        $('#singleArrow').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
});

$('select#inputSelectJobs').change(function(){
    $('#moveSingle').css("visibility", "visible");
    var dir = ($('#singleArrow').attr('class').toString().indexOf("glyphicon-chevron-left") == -1)  ? "l2r" : "r2l";
    console.log(dir);
    if(dir=="l2r")
        $('#singleArrow').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
});