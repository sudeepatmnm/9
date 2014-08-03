//var site_url = "http://localhost/crm/cp/";
var site_url = "http://crm.classonet.com/cp/";

function doLogin() {		// CP Login
	$.ajax({
		type: "POST",
		url:site_url+"cp_login/validate_credentials",
		data: $("#admin-login").serialize(),
		success: function(data){

			if(data == 1){
				window.open(site_url+"dashboard","_parent");		
			}else{	
				$('.alert').show();
				$('.alert').html(data);
			}			    
		}
	});
}

function changePassword() {
	$.ajax({
		type: "POST",
		url:site_url+"cp_login/doChangePassword",
		data: $("#admin-changepassword").serialize(),
		success: function(data){
			if(data==1) {
				$('.alert-danger').hide();
				$('#current_pasword').val('');
				$('#new_password').val('');
				$('#conf_password').val('');
				$('.alert-success').show();
			}
			else {
				$('.alert-danger').html(data);
				$('.alert-danger').show();	
			}    
		}
	});
}

function checkDropDown(catid, subcatid)
{
	$.ajax({
			type: "GET",
			url: site_url+"ajax_calls/check_drop_down/"+catid+"/"+subcatid,
			success: function(msg)
			{
				if( msg == 1 ) 
				{
					$("#step1AdDisabled").removeAttr("disabled");
					$("#step1AdDisabled").css('opacity','1');
				}
			}
		});		
}

function get_sub_category(catid)
{
	$("#subcatlist").hide();
	$("#subcatlist2").hide();
	
	$('#sub_cat_id').attr('value', '-1');
	$('#sub_cat_id2').attr('value', '-1');	
	
	$("#step1AdDisabled").attr('disabled','disabled');
	$("#step1AdDisabled").css('opacity','0.6');
		
	if(catid != '')
	{
		$.ajax({
			type: "GET",
			url: site_url+"ajax_calls/get_sub_category_list/"+catid,
			success: function(msg)
			{
				$("#subcatlist").show();
				$("#subcatlist").html(msg);
			}
		});
		
		checkDropDown(catid,0);				
	}
}

function get_sub_category2(subcatid)
{	
	$("#subcatlist2").hide();
	$('#sub_cat_id2').attr('value', '-1');
	
	$("#step1AdDisabled").attr('disabled','disabled');
	$("#step1AdDisabled").css('opacity','0.6');
		
	if(subcatid != '')
	{
		$.ajax({
			type: "GET",
			url: site_url+"ajax_calls/get_sub_category_list_2/"+subcatid,
			success: function(msg)
			{
				$("#subcatlist2").show();
				$("#subcatlist2").html(msg);
			}
		});		
		
		checkDropDown(0,subcatid);
	}			
}

function post_ad_step1()
{
	$('#error_msg').hide();
	$('#loading_step1').show();
	
	if($('#catid').val() != '-1')
	{
		$('#cat_id').attr('value', $('#catid').val());	
	}
	
	if($('#subcatid').val() != '-1')
	{
		$('#sub_cat_id').attr('value', $('#subcatid').val());	
	}
	
	if($('#subcatid2').val() != '-1')
	{
		$('#sub_cat_id2').attr('value', $('#subcatid2').val());	
	}
	
	$.ajax({
			type: "POST",
			url: site_url+"properties/step1_ad_validate/",
			data: $("#placeanadfrm").serialize(),
			success: function(msg)
			{
				if(msg == 1)
				{
					$("#placeanadfrm").submit();					
				}
				else
				{
					$('#cat_id').attr('value', '-1');	
					$('#sub_cat_id').attr('value', '-1');	
					$('#sub_cat_id2').attr('value', '-1');	
					
					$('.alert-danger').show();
					$('.alert-danger').html(msg);														
				}				
			}
	});
}

function getLocations(cityid)
{	
	$("#location_html").html("loading...");
	$("#sub_location_html").hide();

	$.ajax({
		type: "GET",
		url: site_url+"ajax_calls/get_locations/"+cityid,
		success: function(msg)
		{
			$("#location_html").html(msg);

		}
	});			
}

function getSubLocations(locationid)
{
	$("#sub_location_html").show();
	$("#sub_location_html").html("loading...");
	$.ajax({
		type: "GET",
		url: site_url+"ajax_calls/get_sublocations/"+locationid,
		success: function(msg)
		{
			$("#sub_location_html").html(msg);															
		}
	});
} 

function post_property()
{
	var image_string = '';
	var image_string1 = '';
	$('.img-label .hidden-radio').each(function (){
		image_string = jQuery.trim($(this).val());
		image_string1 = image_string1+image_string+'$#$';
	});
	$('#hidden_files').val(image_string1);
	$('.hidden-radio').each(function() {
		if($(this).is(':checked')) {
			var main_image = $(this).val();
			$('#main-pic').val(main_image);
		}
	});

	$.ajax({
			type: "POST",
			url: site_url+"properties/step2_validate/",
			data: $("#properties_form2").serialize(),
			success: function(msg)
			{
				if(msg == 1)
				{
					$('.alert-danger').hide();
					$('#properties_form2').submit();
				}
				else 
				{
					$('.alert-danger').show();
					$('.alert-danger').html(msg);					
				}				
			}
	});
}

function update_property() 
{	
	var image_string = '';
	var image_string1 = '';
	$('.img-label .hidden-radio').each(function (){
		image_string = jQuery.trim($(this).val());
		image_string1 = image_string1+image_string+'$#$';
	});
	$('#hidden_files').val(image_string1);
	$('.hidden-radio').each(function() {
		if($(this).is(':checked')) {
			var main_image = $(this).val();
			$('#main-pic').val(main_image);
		}
	});
		
	$.ajax({
			type: "POST",
			url: site_url+"properties/step2_validate/",
			data: $("#properties_form2").serialize(),
			success: function(msg)
			{
				if(msg == 1)
				{
					$('.alert-danger').hide();
					$('#properties_form2').submit();
				}
				else 
				{
					$('.alert-danger').show();
					$('.alert-danger').html(msg);
				}	
			}
	});	
}






function updateSettings(ajax_url)
{
	$.ajax({
			type: "POST",
			url: site_url+ajax_url,
			data: $("#properties_form2").serialize(),
			success: function(msg)
			{
				if(msg == 1)
				{
					$('.alert-danger').hide();
					$('.alert-success').show();
				}
				else
				{	
					$('.alert-danger').show();
          			$('.alert-danger').html(msg);					
				}
			}
	   });
}





/*
 *  Search from Sohail.
*/
/*
 * Method used for Quick and Advance search.
*/
function get_subcategories_for_srch(catid)
{
	if(catid == 0)
	{
		$('#advanced_srch').hide();
		$('#advanced_drc_opt').hide();
		$("#adv_src_box").html('<a href="javascript:void(0);" onclick="ShowAdvancedSearch(1)"><div class="well well-sm"><span class="glyphicon glyphicon-collapse-down"></span> Advanced Options</div></a>');
		
	}
	else
	{	
		$('#advanced_srch').show();
		$('#advanced_drc_opt').hide();
		$("#adv_src_box").html('<a href="javascript:void(0);" onclick="ShowAdvancedSearch(1)"><div class="well well-sm"><span class="glyphicon glyphicon-collapse-down"></span> Advanced Options</div></a>');
	}
	$("#subcatsrchlist2").hide();
	
	//var loader_img = '<img src="'+site_url+'images/load.gif" />';
	//$('#loader').html(loader_img);
	
	if(catid != '')
	{
		// Bedrooms.	
		if(catid == 267 || catid == 268 || catid == 271 || catid == 314)
			$('#bedrooms').show();
		else
			$('#bedrooms').hide();			
		$.ajax({
			type: "GET",
			url: site_url+"ajax_calls/get_subcategories_for_srch/"+catid,
			success: function(msg)
			{
				$("#subcatsrchlist").show();
				$("#subcatsrchlist").html(msg);
				//$('#loader').html('');
			}
		});
	}		
}

function get_subcategories2_for_srch(subcatid)
{	
	//var loader_img = '<img src="'+site_url+'images/load.gif" />';
	//$('#loader').html(loader_img);
	
	if(subcatid != '')
	{
		$.ajax({
			type: "GET",
			url: site_url+"ajax_calls/get_subcategories2_for_srch/"+subcatid,
			success: function(msg)
			{
				$("#subcatsrchlist2").show();
				$("#subcatsrchlist2").html(msg);
				//$('#loader').html('');
			}
		});
	}		
}


function QuickSearchProperties()
{
	
	jQuery("#quickload").show();
	var city_id = jQuery("#citysrch").val();
	jQuery("#hdncity").val(city_id);
	var location_id = jQuery("#location_src_id").val();
	jQuery("#hdnlocation").val(location_id);
	var sub_location_id = jQuery("#sub_location_src_id").val();
	jQuery("#hdnsublocation").val(sub_location_id);
	var company_id = jQuery("#srccomp").val();
	jQuery("#hdncomp").val(company_id);
	var category = jQuery("#srchcat").val();
	jQuery("#hdncat").val(category);
	if(category == 0)
	{
		var srchsubcat = 0;
		jQuery("#hdnsubcat").val(srchsubcat);
		var srchsubcat2 = 0;
		jQuery("#hdnsubcat2").val(srchsubcat2);
	}
	else
	{
		var srchsubcat = jQuery("#srchsubcat").val();
		jQuery("#hdnsubcat").val(srchsubcat);
		var srchsubcat2 = jQuery("#srchsubcat2").val();
		jQuery("#hdnsubcat2").val(srchsubcat2);
	}
	
	if(srchsubcat == 0)
	{
		var srchsubcat2 = 0;
		jQuery("#hdnsubcat2").val(srchsubcat2);
	}
	else
	{
		var srchsubcat2 = jQuery("#srchsubcat2").val();
		jQuery("#hdnsubcat2").val(srchsubcat2);
	}
	
	
	var srchpricefrom = jQuery("#srchpricefrom").val();
	jQuery("#hdnpricefrom").val(srchpricefrom);
	var srchpriceto = jQuery("#srchpriceto").val();
	jQuery("#hdnpriceto").val(srchpriceto);
	var bedrooms_min = jQuery("#bedrooms_min").val();
	jQuery("#hdnbedrooms_min").val(bedrooms_min);
	var bedrooms_max = jQuery("#bedrooms_max").val();
	jQuery("#hdnbedrooms_max").val(bedrooms_max);
	var quick_search_keywords =  jQuery("#quick_search_keywords").val();
	jQuery("#hdnquick_search_keywords").val(quick_search_keywords);
	jQuery("#adv_loadmore").hide();
	var params = {city_id:city_id,location_id:location_id,sub_location_id:sub_location_id,company_id:company_id,quick_search_keywords:quick_search_keywords,category:category,srchpricefrom:srchpricefrom,srchpriceto:srchpriceto,bedrooms_min:bedrooms_min,bedrooms_max:bedrooms_max,srchsubcat:srchsubcat,srchsubcat2:srchsubcat2};
	var datapost = jQuery.param(params);
	jQuery.ajax({
		type: "POST",
		url: site_url+"search/load_quick_search_properties",
		data: datapost,
		success: function(msg)
		{
			jQuery("#quickload").hide();
			var partsArray = msg.split('##');
			if(partsArray[2] == 0)
			{
				jQuery('#search_messages').show();
				jQuery('#search_danger').show();
				jQuery('#search_success').hide();
			}
			else
			{
				jQuery('#search_messages').show();
				jQuery('#search_danger').hide();
				jQuery('#prop_count').html(partsArray[2]);
				jQuery('#search_success').show();
			}
			
			if(partsArray[0] == 0)
			{
				jQuery('#loadmore').hide();
				jQuery('#hdncount').val(parseInt(partsArray[0]));
				jQuery('#list_view').html(partsArray[1]);
			}
			else
			{
				jQuery('#loadmore').show();
				jQuery('#list_view').html(partsArray[1]);
				jQuery('#hdncount').val(parseInt(partsArray[0]));
			}
		}
	});

}
function LoadMoreProp()
{
	
	jQuery("#quick_load_more").show();
	var city_id = jQuery("#hdncity").val();
	var location_id = jQuery("#hdnlocation").val();
	var sub_location_id = jQuery("#hdnsublocation").val();
	var company_id = jQuery("#hdncomp").val();
	
	var category = jQuery("#hdncat").val();
	var srchsubcat = jQuery("#hdnsubcat").val();
	var srchsubcat2 = jQuery("#hdnsubcat2").val();
	var srchpricefrom = jQuery("#hdnpricefrom").val();
	var srchpriceto = jQuery("#hdnpriceto").val();
	var bedrooms_min = jQuery("#hdnbedrooms_min").val();
	var bedrooms_max = jQuery("#hdnbedrooms_max").val();
	var hdncountsearch =  jQuery("#hdncount").val();
	jQuery("#adv_loadmore").hide();
	
	var quick_search_keywords =  jQuery("#hdnquick_search_keywords").val();
	var params = { city_id:city_id,location_id:location_id,sub_location_id:sub_location_id,company_id:company_id,quick_search_keywords:quick_search_keywords,category:category,srchpricefrom:srchpricefrom,srchpriceto:srchpriceto,bedrooms_min:bedrooms_min,bedrooms_max:bedrooms_max,hdncountsearch:hdncountsearch,srchsubcat:srchsubcat,srchsubcat2:srchsubcat2};
	var datapost = jQuery.param(params);
	jQuery.ajax({
		type: "POST",
		url: site_url+"search/load_search_pageproperties",
		data: datapost,
		success: function(msg)
		{
			var partsArray = msg.split('##');
			//alert(partsArray[0]);
			if(partsArray[0] == 0)
			{
				jQuery('#loadmore').hide();
				jQuery('#hdncount').val(parseInt(partsArray[0]));
				jQuery('#list_view').append(partsArray[1]);
			}
			else
			{
				jQuery('#loadmore').show();
				jQuery('#list_view').append(partsArray[1]);
				jQuery('#hdncount').val(parseInt(partsArray[0]));
			}
			jQuery("#quick_load_more").hide();
		}
	});
}

function ShowAdvancedSearch(divValue)
{
	if (typeof divValue == 'undefined')
		var divValue = 1;
	if(divValue == 1)
	{
		var category = jQuery("#srchcat").val();
		
		$('#advanced_drc_opt').show();
		$("#adv_src_box").html('<a href="javascript:void(0);" onclick="ShowAdvancedSearch(2)"><div class="well well-sm"><span class="glyphicon glyphicon-collapse-up"></span> Advanced Options</div></a>');
		if(category!=0)
		{
			//Apartments 267  Villas-268 Land-269 Retail-270 Short Term-271 Rooms-272 Other-273  Office-309 Buildings314
			//Apartments 267  Villas-268 Short Term-271 Rooms-272 Office-309 Buildings314
			if(category == 267 || category == 268 || category == 271 || category == 272 || category == 309  || category == 314 ) 
			{
				if(category != 309)
				{
					$("#furnished_container").show();		
				}
				
				if(category != 272)
				{
					$("#bathroom_container").show();
				}
			}
			else
			{
				$("#furnished_container").hide();	
				$("#bathroom_container").hide();	
			}
	
			if(category == 267 || category == 314 ||  category == 271 ||  category == 272 ||  category == 268)
			{
				$("#amenities_container").show();
			}
			else
			{
				$("#amenities_container").hide();
			}
		}
	}
	else if(divValue == 2)
	{
		$("#adv_src_box").html('<a href="javascript:void(0);" onclick="ShowAdvancedSearch(1)"><div class="well well-sm"><span class="glyphicon glyphicon-collapse-down"></span> Advanced Options</div></a>');
		$('#advanced_drc_opt').hide();
	}
}

function AdvancedSearchProperties()
{
	jQuery("#adv_quickload").show();
	function get_check_value() {
        var c_value = [];
        $('input[name="amenities"]:checked').each(function () {
            c_value.push(this.value);
        });
        return c_value.join(',');
    }
	
	var chk =  get_check_value();
	var city_id = jQuery("#citysrch").val();
	jQuery("#hdncity").val(city_id);
	var location_id = jQuery("#location_src_id").val();
	jQuery("#hdnlocation").val(location_id);
	var sub_location_id = jQuery("#sub_location_src_id").val();
	jQuery("#hdnsublocation").val(sub_location_id);
	var company_id = jQuery("#srccomp").val();
	jQuery("#hdncomp").val(company_id);
	var category = jQuery("#srchcat").val();
	jQuery("#hdncat").val(category);
	var srchsubcat = jQuery("#srchsubcat").val();
	jQuery("#hdnsubcat").val(srchsubcat);
	var srchsubcat2 = jQuery("#srchsubcat2").val();
	jQuery("#hdnsubcat2").val(srchsubcat2);
	var srchpricefrom = jQuery("#srchpricefrom").val();
	jQuery("#hdnpricefrom").val(srchpricefrom);
	var srchpriceto = jQuery("#srchpriceto").val();
	jQuery("#hdnpriceto").val(srchpriceto);
	var bedrooms_min = jQuery("#bedrooms_min").val();
	jQuery("#hdnbedrooms_min").val(bedrooms_min);
	var bedrooms_max = jQuery("#bedrooms_max").val();
	jQuery("#hdnbedrooms_max").val(bedrooms_max);
	var quick_search_keywords =  jQuery("#quick_search_keywords").val();
	
	
	var adsposted =  jQuery("#adsposted").val();
	jQuery("#hdnadsposted").val(adsposted);
	var furnished =  jQuery("#furnished").val();
	jQuery("#hdnfurnished").val(furnished);
	var size_from =  jQuery("#size_from").val();
	jQuery("#hdnsize_from").val(size_from);
	var size_to =  jQuery("#size_to").val();
	jQuery("#hdnsize_to").val(size_to);
	var bathrooms_min =  jQuery("#bathrooms_min").val();
	jQuery("#hdnbathrooms_min").val(bathrooms_min);
	var bathrooms_max =  jQuery("#bathrooms_max").val();
	jQuery("#hdnbathrooms_max").val(bathrooms_max);
	jQuery("#hdnamenities").val(chk);
	jQuery("#loadmore").hide();
	jQuery("#hdnquick_search_keywords").val(quick_search_keywords);
	
	var params = {city_id:city_id,location_id:location_id,sub_location_id:sub_location_id,company_id:company_id,quick_search_keywords:quick_search_keywords,category:category,srchpricefrom:srchpricefrom,srchpriceto:srchpriceto,bedrooms_min:bedrooms_min,bedrooms_max:bedrooms_max,srchsubcat:srchsubcat,srchsubcat2:srchsubcat2,adsposted:adsposted,furnished:furnished,size_from:size_from,size_to:size_to,bathrooms_min:bathrooms_min,bathrooms_max:bathrooms_max,amenities:chk};
	var datapost = jQuery.param(params);
	jQuery.ajax({
		type: "POST",
		url: site_url+"search/load_advanced_search_pageproperties",
		data: datapost,
		success: function(msg)
		{
			
			var partsArray = msg.split('##');
			if(partsArray[2] == 0)
			{
				jQuery('#search_messages').show();
				jQuery('#search_danger').show();
				jQuery('#search_success').hide();
				
			}
			else
			{
				jQuery('#search_messages').show();
				jQuery('#search_danger').hide();
				jQuery('#prop_count').html(partsArray[2]);
				jQuery('#search_success').show();
				
				
			}
			
			if(partsArray[0] ==0)
			{
				jQuery('#loadmore').hide();
				jQuery('#adv_loadmore').hide();
				jQuery('#hdncount').val(parseInt(partsArray[0]));
				jQuery('#list_view').html(partsArray[1]);
			}
			else
			{
				jQuery('#adv_loadmore').show();
				jQuery('#list_view').html(partsArray[1]);
				jQuery('#hdncount').val(parseInt(partsArray[0]));
			}
			jQuery("#adv_quickload").hide();
		}
	});

}

function LoadMoreAdvancedProp()
{
	jQuery("#adv_load_more").show();
	var city_id = jQuery("#hdncity").val();
	var location_id = jQuery("#hdnlocation").val();
	var sub_location_id = jQuery("#hdnsublocation").val();
	var company_id = jQuery("#hdncomp").val();
	
	var category = jQuery("#hdncat").val();
	var srchsubcat = jQuery("#hdnsubcat").val();
	var srchsubcat2 = jQuery("#hdnsubcat2").val();
	var srchpricefrom = jQuery("#hdnpricefrom").val();
	var srchpriceto = jQuery("#hdnpriceto").val();
	var bedrooms_min = jQuery("#hdnbedrooms_min").val();
	var bedrooms_max = jQuery("#hdnbedrooms_max").val();
	
	var adsposted =  jQuery("#hdnadsposted").val();
	var furnished =  jQuery("#hdnfurnished").val();
	var size_from =  jQuery("#hdnsize_from").val();
	var size_to =  jQuery("#hdnsize_to").val();
	var bathrooms_min =  jQuery("#hdnbathrooms_min").val();
	var bathrooms_max =  jQuery("#hdnbathrooms_max").val();
	var amenities =  jQuery("#hdnamenities").val();
	
	var hdncountsearch =  jQuery("#hdncount").val();
	jQuery("#loadmore").hide();
	
	var quick_search_keywords =  jQuery("#hdnquick_search_keywords").val();
	var params = { city_id:city_id,location_id:location_id,sub_location_id:sub_location_id,company_id:company_id,quick_search_keywords:quick_search_keywords,category:category,srchpricefrom:srchpricefrom,srchpriceto:srchpriceto,bedrooms_min:bedrooms_min,bedrooms_max:bedrooms_max,hdncountsearch:hdncountsearch,srchsubcat:srchsubcat,srchsubcat2:srchsubcat2,adsposted:adsposted,furnished:furnished,size_from:size_from,size_to:size_to,bathrooms_min:bathrooms_min,bathrooms_max:bathrooms_max,amenities:amenities};
	var datapost = jQuery.param(params);
	jQuery.ajax({
		type: "POST",
		url: site_url+"search/load_more_advanced_search_pageproperties",
		data: datapost,
		success: function(msg)
		{
			var partsArray = msg.split('##');
			//alert(partsArray[0]);
			if(partsArray[0] == 0)
			{
				jQuery("#adv_loadmore").hide();
				jQuery('#hdncount').val(parseInt(partsArray[0]));
				jQuery('#list_view').append(partsArray[1]);
			}
			else
			{
				jQuery('#adv_loadmore').show();
				jQuery('#list_view').append(partsArray[1]);
				jQuery('#hdncount').val(parseInt(partsArray[0]));
			}
			jQuery("#adv_load_more").hide();
		}
	});
}
$('.onlyAlphaNumeric').keypress(function (e) {
	var regex = new RegExp("^[a-zA-Z0-9 \b]+$");
	var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	if (regex.test(str)) {
	    return true;
	}

	e.preventDefault();
	return false;
});

function getSrcLocations(cityid)
{	
	$("#location_html").html("loading...");
	$("#sub_location_html").hide();

	$.ajax({
		type: "GET",
		url: site_url+"ajax_calls/get_src_locations/"+cityid,
		success: function(msg)
		{
			$("#location_html").html(msg);

		}
	});			
}

function getSrcSubLocations(locationid)
{
	$("#sub_location_html").show();
	$("#sub_location_html").html("loading...");
	$.ajax({
		type: "GET",
		url: site_url+"ajax_calls/get_src_sublocations/"+locationid,
		success: function(msg)
		{
			$("#sub_location_html").html(msg);															
		}
	});
}