//var site_url = "http://localhost/crm/admin/";
var site_url = "http://localhost/mysign/admin/";

function doLogin() {	// ADMIN Login
	$.ajax({
		type: "POST",
		url:site_url+"admin_login/validate_credentials",
		data: $("#admin-login").serialize(),
		success: function(data){

			if(data == 1)
			{
				window.open(site_url+"dashboard","_parent");		
			}
			else
			{	
				$('.alert').show();
				$('.alert').html(data);
			}			    
		}
	});
}

function doBlockUser(element,ajax_url) {  // Block user
 	$(element).nextAll('.spinner-loading').show();
 	$(element).hide();
 	$.ajax({
  		type: "GET",
  		url:site_url+ajax_url,
  		success: function(data){
   			if(data==1){
    			$(element).closest('tr').addClass('danger');
			    $(element).closest('td').prevAll('.block-msg').html('Blocked');
			    $(element).nextAll('.spinner-loading').hide();
   			}
  		}
 	});
}

function changePassword() {
	$.ajax({
		type: "POST",
		url:site_url+"admin_login/doChangePassword",
		data: $("#admin-changepassword").serialize(),
		success: function(data){
			if(data==1) {
				$('.form-box').hide();
				$('.alert-success').show();
				$('.alert-danger').hide();
				setTimeout(function(){
              		$('.alert-success').modal('hide');
              		location.href = site_url;
				},1600)
			}
			else {
				$('.alert-danger').html(data);
				$('.alert-danger').show();	
			}    
		}
	});
}

function updateCRMSettings(ajax_url)
{
	$.ajax({
			type: "POST",
			url: site_url+ajax_url,
			data: $("#crm_settings_form2").serialize(),
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