/**
 * Author: Juan Carlo M. Mangaliag
 * Section: CMSC 128 AB-2L
 * Assign 003: Using Firebase
 * Program Description: This is a simple notepad web application that allows adding and viewing tasks through the use of Firebase technology.
 * Date: March 25, 2016
 */

var dataRef = new Firebase('https://shining-fire-5288.firebaseio.com/');	// reference to firebase

$(document).ready(function() {
	$('select').material_select();	// enables select option for materialize css

	dataRef.on('child_added', function(snapshot) {	// getting user data from the firebase
    	var task = snapshot.val();
    	displayTask(task.category, task.title, task.description);	// displays the data to tasks list
  	});
});

function collectInfo(){	// collects the title, description, task category that the user entered in the form

	var notetitle = $('#title').val();
	var notedescription = $("textarea[name='desc']").val();
	notedescription = notedescription.replace(new RegExp('\r?\n','g'), '<br />');	// replaces \n with <br/>
	var selected = $('#selectcategory option:selected').text();

	if (notetitle != "" && notedescription != ""){	// if fields are not empty, data will be pushed to firebase
		dataRef.push({category: selected, title: notetitle, description: notedescription});

		clearTasks();	// cleans the task list
		dataRef.on('child_added', function(snapshot) {	// getting user data from the firebase 
        	var task = snapshot.val();
        	displayTask(task.category, task.title, task.description);	// displays the data to tasks list
      	});

      	Materialize.toast('Successfully Added a Task', 3000, 'rounded');	// toast that shows added successful
      	$('#form1').trigger("reset");	// resets the add task form
	} else {
		alert("Please complete the input fields!");
	}
}

function displayTask(category, title, description){	// updates the view tasks tab with user data from firebase
	switch(category){	// determines in what category will the note title and description be put
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

function clearTasks(){	// clears the view tasks list
	$('#todo').empty();
	$('#doing').empty();
	$('#done').empty();
}

function removeData(){	// clears the user data from the firebase
	dataRef.remove();
	Materialize.toast('Firebase Data has been cleared!', 3000, 'rounded');	// toast that shows firebase data has been cleared
	clearTasks();
}