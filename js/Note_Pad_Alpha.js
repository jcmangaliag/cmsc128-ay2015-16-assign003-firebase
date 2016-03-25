var dataRef = new Firebase('https://j4jrj6rz70r.firebaseio-demo.com/');

$(document).ready(function() {
	$('select').material_select();

	dataRef.on('child_added', function(snapshot) {
    	var task = snapshot.val();
    	appendTask(task.category, task.title, task.description);
  	});
});

function collectInfo(){

	var notetitle = $('#title').val();
	var notedescription = $("textarea[name='desc']").val();
	notedescription = notedescription.replace(new RegExp('\r?\n','g'), '<br />');
	var selected = $('#selectcategory option:selected').text();

	if (notetitle != "" && notedescription != ""){
		dataRef.push({category: selected, title: notetitle, description: notedescription});

		clearTasks();
		dataRef.on('child_added', function(snapshot) {
        	var task = snapshot.val();
        	appendTask(task.category, task.title, task.description);
      	});

      	Materialize.toast('Successfully Added a Task', 3000, 'rounded');
      	$('#form1').trigger("reset");
	} else {
		alert("Incomplete Fields!");
	}
}

function appendTask(category, title, description){

	switch(category){
		case "To Do":
			$('#todo').append('<li><div class="collapsible-header"><i class="material-icons">play_for_work</i>'+title+'</div><div class="collapsible-body"><p>'+description+'</p></div></li>');
			break;
		case "Doing":
			$('#doing').append('<li><div class="collapsible-header"><i class="material-icons">trending_down</i>'+title+'</div><div class="collapsible-body"><p>'+description+'</p></div></li>');
			break;
		case "Done":
			$('#done').append('<li><div class="collapsible-header"><i class="material-icons">done</i>'+title+'</div><div class="collapsible-body"><p>'+description+'</p></div></li>');
			break;
	}
}

function clearTasks(){
	$('#todo').empty();
	$('#doing').empty();
	$('#done').empty();
}

function removeData(){
	dataRef.remove();
	Materialize.toast('Firebase Data has been cleared!', 3000, 'rounded');
	clearTasks();
}