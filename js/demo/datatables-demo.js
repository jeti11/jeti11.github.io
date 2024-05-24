// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable( {
	
	// "ordering": false // false to disable sorting (or any other option)
	// "order": [[ 3, "desc" ]] // 0,1,2,3 번째
	  "aaSorting": [],
	  columnDefs: [{
	  orderable: false,
	  targets: 3
	  }]
	  
	});
	
	$('.dataTables_length').addClass('bs-select');
});
