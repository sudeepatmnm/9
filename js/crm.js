var site_url = "http://localhost/mysign/";

function doRegister() {	
	$.ajax({
		type: "POST",
		url:site_url+"main/validate_register",
		data: $("#register").serialize(),
		success: function(data){

			if(data == 1)
			{
				window.open(site_url+"main/thankyou","_parent");		
			}
			else
			{	
				$('.alert').show();
				$('.alert').html(data);
			}			    
		}
	});
}

function doSavePassword() {	
	$.ajax({
		type: "POST",
		url:site_url+"main/validate_pass",
		data: $("#savepassword").serialize(),
		success: function(data){

			if(data == 1)
			{
				window.open(site_url+"cp","_parent");		
			}
			else
			{	
				$('.alert').show();
				$('.alert').html(data);
			}			    
		}
	});
}

