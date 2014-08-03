/* ==========================================================================
   Faisal Iqbal custom styles
   ========================================================================== */
//var site_url = "http://localhost/crm/";
var site_url = "http://localhost/mysign/";

$('#contactus-send-btn').click(function() {
	
	$('.alert-danger').hide();
	$('.alert-success').hide();
	
	$.ajax({
			type: "POST",
			url: site_url+"main/send_contact/",
			data: $("#contact-form").serialize(),
			success: function(data){
				var msg = JSON.parse(data);
				console.log(msg);
				if(msg.success==1){
					$("#txtname").val('');
					$("#txtemail").val('');
					$("#txtphone").val('');
					$("#txtmsg").val('');					
					$('.alert-danger').hide();
					$('.alert-success').show();
					$('.alert-success').html(msg.success_msg);
				}else{	
					$('.alert-danger').show();
					$('.alert-danger').html(msg.error_msg);
				}		
			}
	});
});

$('#register-send-btn').click(function() {
	
	$('.alert-danger').hide();
	$('.alert-success').hide();
	
	$.ajax({
			type: "POST",
			url: site_url+"main/register_/",
			data: $("#comapny-register-form").serialize(),
			success: function(data){
				var msg = JSON.parse(data);
				console.log(msg);
				if(msg.success==1){
					$("#txtcompany").val('');
					$("#txtrera").val('');
					$("#txtcontact").val('');
					$("#txtemail").val('');
					$("#txtphone").val('');
					$('.alert-danger').hide();
					$('.alert-success').show();
					$('.alert-success').html(msg.success_msg);
				}else{	
					$('.alert-danger').show();
					$('.alert-danger').html(msg.error_msg);
				}		
			}
	});
});

$('#newsletter-btn').click(function() {
	
	$('.newsletter-danger').hide();
	$('.newsletter-success').hide();

	$.ajax({
			type: "POST",
			url: site_url+"main/news_letter/",
			data: $("#newsletter-form").serialize(),
			success: function(data){
				var msg = JSON.parse(data);
				console.log(msg);
				if(msg.success==1){
					$("#txtnewsletter").val('');
					$('.newsletter-success').show();
					$('.newsletter-success').html(msg.success_msg);
				}else{	
					$('.newsletter-danger').show();
					$('.newsletter-danger').html(msg.error_msg);
				}		
			}
	});
});

function showPhoneNumber(){
	$('#hide_phone').hide();
	$('#phonenumber').show();
}

$('#account-activate-btn').click(function() {

	$('.alert-danger').hide();
	$('.alert-success').hide();
	
	$.ajax({
		type: "POST",
		url:site_url+"main/do_account_activate",
		data: $("#account-activate-form").serialize(),
		success: function(data){
			var msg = JSON.parse(data);
			console.log(msg);
			if(msg.success==1){
				$("#username").val('');
				$("#password").val('');
				$("#conf_password").val('');
				$('.alert-success').show();
				$('.alert-success').html(msg.success_msg);
			}else{	
				$('.alert-danger').show();
				$('.alert-danger').html(msg.error_msg);
			}
		}
	});	

});