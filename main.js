$(document).ready(function(){
  console.log('Connected to JS file');
  // submit contact info
  $("#submit").click(function(){
    var choices = $("input[type='text']").map(function(i, val) {
      return $(val).val();
    }).toArray();
    console.log(choices);
    sendContact(choices);
  });

  // send vcf to zack's email
  $("#send").click(function(){
    console.log("sending contact info");
  });
});


function sendContact(choices) {
  $.ajax({
      method: 'POST',
      url: _config.api.invokeUrl + '/contact',
      headers: {},
      data: JSON.stringify({
          firstName: choices[0],
          lastName: choices[1],
          email: choices[2],
          phoneNumber: choices[3]
      }),
      contentType: 'application/json',
      success: completeRequest,
      error: function ajaxError(jqXHR, textStatus, errorThrown) {
          console.error('Error sending contact info: ', textStatus, ', Details: ', errorThrown);
          console.error('Response: ', jqXHR.responseText);
          alert('An error occured when sending your contact information:\n' + jqXHR.responseText);
      }
  });
}
