 var filenames = new Array();
 var image_up_count;
  function handleFileSelect(evt) {
    $('.upload-errors').html('');
      $('.load-img-msg').show();
      $('#list').show();
      var files = evt.target.files; // FileList object
      var any_image=0;
      image_up_count = files.length;

      /*if(image_up_count>10) {
        alert('Maximum 10 images');
        $('.browse-btn').removeAttr('disabled','disabled');
        $('#publish').removeAttr('disabled','disabled');
        return false;
      }

      var ck_count = parseInt($('#photo-count').val());
      if(ck_count+image_up_count>10) {
         alert('Maximum 10 images');
         $('.browse-btn').removeAttr('disabled','disabled');
         $('#publish').removeAttr('disabled','disabled');
         return false;
      }*/

      // Loop through the FileList and render image files as thumbnails.
      var image_error=0;
      $('.browse-btn').attr('disabled','disabled');
      $('#publish').attr('disabled','disabled');
     
      for (var i = 0, f; f = files[i]; i++) {
      $('.browse-btn').attr('disabled','disabled');
      $('#publish').attr('disabled','disabled');
        var file = files[i];  

        // Only process image files.
        if (!f.type.match((f.type.match('image/jpeg') || f.type.match('image/png')))) {
          $('.upload-errors').append('<li class="img-error">'+(file.name).substring(0,8)+' is of invalid format.</li>');
          image_error=1;
          image_up_count = image_up_count-1;
          alert((file.name).substring(0,8)+' is of invalid file type');
          $('.browse-btn').removeAttr('disabled','disabled');
          $('#publish').removeAttr('disabled','disabled');

          continue;
        }

        // 1 MB allowed.
        /*if(f.size >= 1048576) {  
          $('.upload-errors').append('<li class="img-error">'+(file.name).substring(0,8)+' exceeds 1 MB limit</li>');
          image_error=1;
          image_up_count = image_up_count-1;
          alert((file.name).substring(0,8)+' too big');
          $('.browse-btn').removeAttr('disabled','disabled');
          $('#publish').removeAttr('disabled','disabled');
           continue;
        }*/

        if($.inArray(jQuery.trim(file.name), filenames)!=-1) {
          image_up_count = image_up_count-1;
          $('.browse-btn').removeAttr('disabled','disabled');
          $('#publish').removeAttr('disabled','disabled');
          continue;
        }
        else {
          var count = parseInt($('#photo-count').val());
          if(count<20){
            count=count+1;
            $('#photo-count').val(count);
          }
          else {
            $('#progress').hide();
            continue;
          }
        }

        var reader = new FileReader();
        var unique_id = $('#unique_id').val();
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
          return function(e) {
            // Render thumbnail.
            $('#progress').html('');
            var o = document.getElementById("progress");
           var progress = o.appendChild(document.createElement("p"));
          
            var unique_id = $('#unique_id').val();
            var formData = new FormData();
            formData.append('photos[]', theFile, unique_id+jQuery.trim(theFile.name));
           
            var span = document.createElement('li');
            var xhr = new XMLHttpRequest();
           
            xhr.onreadystatechange = function(e) {
            if (xhr.readyState == 4) {
              progress.className = (xhr.status == 200 ? "success" : "failure");
            }
          };
            var unique_id = $('#unique_id').val();
            xhr.open('POST', site_url+'ajax_calls/upload_photos_');
            xhr.send(formData);

            $('#progress').show();
            $('#progress p').html("Uploading "+image_up_count+' files');
            xhr.onload = function () {
              $('#progress').show();
              
              if (xhr.status === 200) {

                uploaded_file_name = xhr.responseText;
                uploaded_file_name = uploaded_file_name.replace("Uploaded#", "");
                filenames.push(jQuery.trim(uploaded_file_name)); // Push to Array for Duplicate File check

                // File(s) uploaded.

                // $('.img-label .hidden-radio').each(function() {
                //   var current_val = $(this).attr('id');
                //   $(this).val(unique_id+current_val);

                // });

               span.innerHTML = ['<label class="img-label" for="'+jQuery.trim(uploaded_file_name)+'"><img title="Set as Default" class="thumb" src="', e.target.result,
                              '" title="', jQuery.trim(uploaded_file_name), '"/><span class="remove" unique_name="" file_name="'+jQuery.trim(uploaded_file_name)+'">x</span><input class="hidden-radio" id="'+jQuery.trim(uploaded_file_name)+'" type="radio" value="'+jQuery.trim(uploaded_file_name)+'" name="main-pic-radio" class="main-pic-radio" style="visibility:hidden;"><span class="make-me-cover-txt no-show">Set as Default</span></label>'].join('');


                /*span.innerHTML = ['<label class="img-label" for="'+jQuery.trim(theFile.name)+'"><img title="Set as Default" class="thumb" src="', e.target.result,
                              '" title="', jQuery.trim(theFile.name), '"/><span class="remove" unique_name="" file_name="'+jQuery.trim(theFile.name)+'">x</span><input class="hidden-radio" id="'+jQuery.trim(theFile.name)+'" type="radio" value="'+unique_id+jQuery.trim(theFile.name)+'" name="main-pic-radio" class="main-pic-radio" style="visibility:hidden;"><span class="make-me-cover-txt no-show">Set as Default</span></label>'].join(''); */             

                document.getElementById('list').insertBefore(span, null);
                image_up_count=image_up_count-1;
                if(image_up_count==0){
                    $('#progress').hide();
                    $('.browse-btn').removeAttr('disabled','disabled');
                    $('#publish').removeAttr('disabled','disabled');
                }

               $('#progress p').html('Uploading '+image_up_count+' files');
              

                $('.img-label .remove').each(function() {

                  var present_val = $(this).attr('file_name');
                  $(this).attr('unique_name',present_val);

                })

                $('#list').show();

            } else {
              alert('An error occurred! Please try again.');
              //setTimeout("location.reload(true);", 100);
            }
          };
           
            

            /*count=count+1;*/
          };
        })(f);

        // Read in the image file as a data URL.

        reader.readAsDataURL(f);
      }

      /*$('#progress').hide();*/
        
  }


  document.getElementById('files').addEventListener('change', handleFileSelect, false);

  $(document).ready(function(){
    $('.content').delegate('.remove','click',function(){
      $('#deleting').show();
      $('.browse-btn').attr('disabled','disabled');
      $('#publish').attr('disabled','disabled');
      $('.remove').hide();
      var filename = $(this).attr('unique_name');
      var delete_image = $(this).attr('file_name');
      var file_index = $.inArray(delete_image, filenames);
      var count  = $('#photo-count').val();
      count= count-1;
      $('#photo-count').val(count);
      if(file_index!=-1) { // Remove File Name For File Duplication Check
       filenames.splice(file_index,1);
      }
      if($(this).prev('.thumb').hasClass('is-main')) {
        $('#main-pic').val('');
      }

      $(this).closest('li').fadeOut();
      $(this).closest('li').remove();

      $.ajax({       
          url: site_url+"ajax_calls/delete_photos_",
          type: 'POST',
          data: {filename:filename},
          success: function(data) {
            $('#deleting').hide();
            $('.browse-btn').removeAttr('disabled','disabled');
            $('#publish').removeAttr('disabled','disabled');
            $('.remove').show();
          } 
      });
    });

    $('.content').delegate('.thumb','click',function(){
      $('.thumb').each(function() {
        $(this).removeClass('is-main');
      })
      $(this).addClass('is-main');
    })

    $('.content').delegate('.thumb','mouseenter',function(){
      $(this).nextAll('.make-me-cover-txt').show();
    })

    $('.content').delegate('.thumb','mouseleave',function(){
      $(this).nextAll('.make-me-cover-txt').hide();
    })

  });

function deleteAdPhoto(photo_id,element)
{
  $('#deleting').show();
  $('.browse-btn').attr('disabled','disabled');
    $('#publish').attr('disabled','disabled');
  
  if($(element).prev().hasClass('is-main')) {
    $('#main-pic').val('');
  }
  
  $(element).closest('li').fadeOut();
  $(element).closest('li').remove();

  $.ajax({       
      url: site_url+"ajax_calls/delete_ad_photos_",
      type: 'POST',
      data: {photo_id:photo_id},
      success: function(msg) {
        if(msg == 1){
      var photo_count = parseInt($('#photo-count').val());
      photo_count = photo_count - 1;
      $('#photo-count').val(photo_count);
      $('.browse-btn').removeAttr('disabled','disabled');
          $('#publish').removeAttr('disabled','disabled');
          $('#deleting').hide();
        }
      } 
  });
}