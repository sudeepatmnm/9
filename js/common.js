
initialiseSectionSelect();
selectAllInit();
function loadAjaxPopup(ajax_url) {
	
	$.ajax({
		type: "GET",
		url:site_url+ajax_url,
		success: function(data){
			$('#ajax_popup').html(data); 	
			$('#myConfirm').modal('show');
			$('#map-canvas').show();   
		}
	});
}

function addEditNewRecord(section,ajax_segment){
	
	if($('.ckedit-box').length>0){
	  for (instance in CKEDITOR.instances) {
				 CKEDITOR.instances[instance].updateElement();
		 }
	 }
	$.ajax({
		type: "POST",
		url:site_url+section+"/"+ajax_segment,
		data: $("#add-new-record-form").serialize(),
		success: function(data){
			
			var msg = JSON.parse(data);
				console.log(msg);
			if(msg.success==1)
			{
				$("#add-new-record-form").hide();
				$('.alert-danger').hide();
				$('.alert-success').show();

				$('.modal-footer').hide();
				$('.modal-header').hide();
				$('.modal-body').hide();
				$('.alert-success').html('<span class="success glyphicon glyphicon-ok"></span>'+msg.success_msg);
				$('.alert-success').delay(200).fadeIn().delay(2000).fadeOut();
				setTimeout(function(){
              		$('#myConfirm').modal('hide');
              		
              		window.open(site_url+section,"_parent");
				},2500)
			}
			else
			{	
				$('.alert-danger').show();
				$('.alert-danger').html(msg.error_msg);
			}
		}
	});
}

function addRecordAjaxUpdate(section,ajax_segment){
	
	if($('.ckedit-box').length>0){
	  for (instance in CKEDITOR.instances) {
				 CKEDITOR.instances[instance].updateElement();
		 }
	 }
	$.ajax({
		type: "POST",
		url:site_url+section+"/"+ajax_segment,
		data: $("#add-new-record-form").serialize(),
		success: function(data){
			
			var msg = JSON.parse(data);
				console.log(msg);
			if(msg.success==1)
			{
				$("#add-new-record-form").hide();
				$('.alert-danger').hide();
				$('.alert-success').show();

				$('#pop_foot').hide();
				$('.modal-header').hide();
				$('.modal-body').hide();
				$('.alert-success').html('<span class="success glyphicon glyphicon-ok"></span>'+msg.success_msg);
				$('.alert-success').delay(200).fadeIn().delay(2000).fadeOut();
				setTimeout(function(){
              		$('#myConfirm').modal('hide');
				},2500)
				$('#dynamic-client-select').html(msg.html_data);
			}
			else
			{	
				$('.alert-danger').show();
				$('.alert-danger').html(msg.error_msg);
			}
		}
	});
}

function activate_company(ajax_url) {
	$.ajax({
		type: "GET",
		url:site_url+ajax_url,
		success: function(data){
			location.reload();
		}
	});
}

function addLogo(ajax_url) {
	
	var logo_file = $("#logo").val();
	if(logo_file =='')
	{
		$('.alert-danger').show();
	}
	else
	{
		$('#add-new-record-form').submit();
		//location.reload(); 
	}
	
}

function perform_delete(section,segments){
	window.open(site_url+section+'/'+segments,"_parent");	
}

function perform_delete_block_action(section,segments){
	$('#ajax_popup').hide();
	$('#block_for_listing').show();
	
	$.ajax({
		type: "GET",
		url:site_url+section+'/'+segments,
		success: function(data){
			$('#block_for_listing').hide();   
			location.reload();	
		}
	});	

	//window.open(site_url+section+'/'+segments,"_parent");	
}



function applyFilter(controler_name){
  	var search_url = "";
  	var search_text = $("#search_text").val();
  	if(search_text == '')
  		search_text = 'keywords';
  	search_url = site_url+controler_name+"/search/"+search_text+"/";
  	window.open(search_url,"_parent");
}

function applyFilterForUsers(controler_name){
  	var search_url = "";
  	var search_text = $("#search_text").val();
  	var filterid = $('#filterid').val();
  	if(filterid==0) {
  		alert('Please section one option to search');
  		return false;
  	}
  	if(search_text == '')
  		search_text = 'keywords';
  	search_url = site_url+controler_name+"/search/"+search_text+"/"+filterid+"/";
  	window.open(search_url,"_parent");
}

function applyFilter1(controler_name){
  	var search_url = "";
  	var search_text = $("#search_text").val();
  	if(search_text == '')
  		search_text = 'keywords';
  	var cat_id = $("#select-ad-category").val();
  	search_url = site_url+controler_name+"/search/"+search_text+"/"+cat_id+"/";
  	window.open(search_url,"_parent");
}



function applyFilter2(controler_name){
  	var search_url = "";
  	var search_text = $("#search_text").val();
  	if(search_text == '')
  		search_text = 'keywords';
  	var category_id = $("#select-ad-category").val();
  	if(category_id == '')
  		category_id = 0;
  	var sub_cat = $("#select-ad-sub-category").val();
  	if(sub_cat == '')
  		sub_cat = 0;
  	
  	search_url = site_url+controler_name+"/search/"+search_text+"/"+category_id+"/"+sub_cat+"/";
  	window.open(search_url,"_parent");
}

function applyFilter3(controler_name){
  	var search_url = "";
  	var search_text = $("#search_text").val();
  	if(search_text == '')
  		search_text = 'keywords';
  	var category_id = $("#select-ad-category").val();
  	if(category_id == '')
  		category_id = 0;	
  	var subcat_id = $("#select-ad-sub-category").val();
  	if(subcat_id == '')
  		subcat_id = 0;
  	var subcat_id2 = $("#select-ad-subcategory2").val();
  	if(subcat_id2 == '')
  		subcat_id2 = 0;
  	search_url = site_url+controler_name+"/search/"+search_text+"/"+category_id+"/"+subcat_id+"/"+subcat_id2+"/";
  	window.open(search_url,"_parent");
}

function goSubmit(val){
  $('#baction').val(val);
  document.form.submit();
}

function select_all(){
  for (var i=0;i<document.form.elements.length;i++) {
    var e =document. form.elements[i];
    if ((e.name != 'check_all') && (e.type=='checkbox')) {
       e.checked = document.form.check_all.checked;
    }
  }
}

function doAjaxUpdate(action_url) {

	$.ajax({
		type: "GET",
		url:site_url+action_url,
		success: function(data){
			location.reload(); 
		}
	});	
}

function doAjaxView(element,action_url) {
	$(element).closest('tr').removeClass('warning');
	$.ajax({
		type: "GET",
		url:site_url+action_url,
		success: function(data){
			$('#ajax_popup').html(data); 	
			$('#myConfirm').modal('show');
		}
	});	
}

$(".onlyNumbers").keydown(function(event) {
    // Allow: backspace, delete, tab, escape, and enter
    if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
         // Allow: Ctrl+A
        (event.keyCode == 65 && event.ctrlKey === true) || 
         // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
             // let it happen, don't do anything
             return;
    }
    else {
        // Ensure that it is a number and stop the keypress
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
            event.preventDefault(); 
        }   
    }
});
	
$('.onlyAlphaNumeric').keypress(function (e) {
	var regex = new RegExp("^[a-zA-Z0-9 \b]+$");
	var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	if (regex.test(str)) {
	    return true;
	}

	e.preventDefault();
	return false;
});


function initializeSectionSelect(){

	$('#sectionid').change(function() {

		if (typeof document.addform.subcatid != 'undefined') {
			$('#subcatid').html('<option value="">Select one category</option>');
		}	

		var section_id = $(this).val();
		$.ajax({
			type: "POST",
			url:site_url+"admin_ajax/getSectionCategory",
			data: {section_id:section_id},
			success: function(data){
				$('#categoryid').html(data);
			}
		});
	});

	$('#categoryid').change(function() {
		var section_id = $('#sectionid').val();
		var cat_id = $(this).val();
		$.ajax({
			type: "POST",
			url:site_url+"admin_ajax/getSubCategories",
			data: {section_id:section_id,cat_id:cat_id},
			success: function(data){
				$('#subcatid').html(data);
			}
		});
	});
}

function applyFilterForBPage(controler_name){
  	var search_url = "";
  	var search_text = $("#search_text").val();
  	var filterid = $('#filterid').val();
  	if(search_text == '')
  		search_text = 'keywords';
  	search_url = site_url+controler_name+"/search/"+search_text+"/"+filterid+"/";
  	window.open(search_url,"_parent");
}

function initialiseSectionSelect() {  // Select on change AJAX in MAnage Ads
	/*$('#select-ad-section').change(function() {

		if (typeof document.getElementById("select-ad-sub-category") != 'undefined') {
			$('#select-ad-sub-category').html('<option value="">Select one category</option>');
		}	

		var section_id = $(this).val();
		$.ajax({
			type: "POST",
			url:site_url+"admin_ajax/getSectionCategory",
			data: {section_id:section_id},
			success: function(data){
				$('#select-ad-category').html(data);
			}
		});
	});*/
	
	$('#select-ad-category').change(function() {
		var cat_id = $(this).val();
		$.ajax({
			type: "GET",
			url:site_url+"ajax_calls/get_sub_category_list_for_srch/"+cat_id,
			success: function(data){
				$('#select-ad-sub-category').html(data);
			}
		});
	});

	$('#select-ad-sub-category').change(function() {
		var subcat_id = $(this).val();
		$.ajax({
			type: "GET",
			url:site_url+"ajax_calls/get_sub_category_list_2_for_srch/"+subcat_id,
			success: function(data){
				$('#select-ad-subcategory2').html(data);
			}
		});
	});
}

function selectAllInit() {  // Select All Checkboxes
	$('#select-all-checkbox').click(function() {
		if($('#select-all-checkbox input').is(':checked')){
			$('.table-checkbox').each(function(){
				$(this).find('input').prop('checked',true);
			});
		}
		else {
			$('.table-checkbox').each(function(){
				$(this).find('input').prop('checked',false);
			});
		}
	})
}



function generateXml(element,url) {
	$(element).next('.spinner-loading').show();
	$(element).hide();
	$.ajax({
		type: "POST",
		url:site_url+url,
		success: function(data){
			if(data==1) {
				$(element).next('.spinner-loading').hide();
				$(element).show();
				$(element).closest('tr').addClass('success');
				setTimeout(function(){
					$(element).closest('tr').removeClass('success')}, 3000);
			}	
			else {
				$(element).next('.spinner-loading').html('Aborted');
				$(element).closest('tr').addClass('danger');
			}    
		}
	});
}

function getTodaysAdsCount() {
		$.ajax({
		type: "POST",
		url:site_url+"statistics/todaysAds",
		success: function(data){
			$('#graph-container').html(data);
			initilizeChart();		    
		}
	});
}

function bPageShow(element,pageid) {
	$.ajax({
		type: "POST",
		url:site_url+"businesspages/makeShow/"+pageid,
		success: function(data){
			$(element).nextAll('.b-cross').show();
			$(element).hide();
			
		}
	});


}

function bPageHide(element,pageid) {
	$.ajax({
		type: "POST",
		url:site_url+"businesspages/makeHide/"+pageid,
		success: function(data){
			$(element).hide();
			$(element).prev('.b-ok').show();
		}
	});
}

function replyEmail(section,ajax_segment){
	for (instance in CKEDITOR.instances) {
            CKEDITOR.instances[instance].updateElement();
    }
	$.ajax({
		type: "POST",
		url:site_url+section+"/"+ajax_segment,
		data: $("#add-new-record-form").serialize(),
		success: function(data){
			var msg = JSON.parse(data);
				console.log(msg);
			if(msg.success==1)
			{	

				$("#add-new-record-form").hide();
				$('.alert-danger').hide();
				$('.alert-success').show();

				$('.modal-footer').hide();
				$('.modal-header').hide();
				$('.modal-body').hide();
				$('.alert-success').html('<span class="success glyphicon glyphicon-ok"></span>'+msg.success_msg);
				$('.alert-success').delay(200).fadeIn().delay(2000).fadeOut();
				setTimeout(function(){
              		$('#myConfirm').modal('hide');
              		
              		window.open(site_url+section,"_parent");
				},2500)
				
						
			}
			else
			{	
				$('.alert-danger').show();
				$('.alert-danger').html(msg.error_msg);
			}
		}
	});
}

function applyFilterCity(controler_name){
	var search_url = "";
	var search_text = $("#search_text").val();
	if(search_text == '')
		search_text = 'keywords';
	var city_id = $("#city").val();
	search_url = site_url+controler_name+"/search/"+search_text+"/"+city_id+"/";
	window.open(search_url,"_parent");
}

function applyFilterCityLocation(controler_name){
	var search_url = "";
	var search_text = $("#search_text").val();
	if(search_text == '')
		search_text = 'keywords';
	var city_id = $("#cities_select").val();
	var location_id = $("#locations_select").val();
	search_url = site_url+controler_name+"/search/"+search_text+"/"+city_id+"/"+location_id+"/";
	window.open(search_url,"_parent");
}

/*$("#price").keypress(function(e)
{
    var price_key_val = String.fromCharCode(e.which);
    var price = $("#price").val();
    price = parseInt(price)+price_key_val;

	var commission = $("#commission").val();
	commission = parseInt(commission);
	if(commission != ''){
		commission_val = commission/100;
		commission_val = commission_val*price;
		alert(price);
		alert(commission_val);
	}    
});*/

$("#price").keyup(function()
{
    var price = $(this).val();
    price = parseInt(price);
    var commission = $("#commission").val();
	commission = parseInt(commission);

	if(!isNaN(commission) && !isNaN(price)){
		commission_val = (commission/100)*price;
		commission_val = 'AED '+commission_val;
		$("#commission_calculation").html(commission_val);
	}
});

$("#commission").keyup(function()
{
    var commission = $(this).val();
    commission = parseInt(commission);
    var price = $("#price").val();
	price = parseInt(price);

	if(!isNaN(commission) && !isNaN(price)){
		commission_val = (commission/100)*price;
		commission_val = 'AED '+commission_val;
		$("#commission_calculation").html(commission_val);
	}
});