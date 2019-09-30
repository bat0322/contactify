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
    var choices = $("input[type='text']").map(function(i, val) {
      return $(val).val();
    }).toArray();
    console.log(choices[4]);
    sendVCF(choices[4]);
  });
});

function sendVCF(email) {
  $.ajax({
      method: 'POST',
      url:  'https://nvhn5rzo52.execute-api.us-east-1.amazonaws.com/prod/vcf',
      headers: {},
      data: JSON.stringify({
          email: email
      }),
      contentType: 'application/json',
      success: function ajaxSuccess() {
        console.log('Successfully sent');
      },
      error: function ajaxError(jqXHR, textStatus, errorThrown) {
          console.error('Error sending vcf: ', textStatus, ', Details: ', errorThrown);
          console.error('Response: ', jqXHR.responseText);
          alert('An error occured when sending the vcf:\n' + jqXHR.responseText);
      }
  });
}


function sendContact(choices) {
  $.ajax({
      method: 'POST',
      url:  'https://nvhn5rzo52.execute-api.us-east-1.amazonaws.com/prod/contact',
      headers: {},
      data: JSON.stringify({
          firstName: choices[0],
          lastName: choices[1],
          email: choices[2],
          phoneNumber: choices[3]
      }),
      contentType: 'application/json',
      success: function ajaxSuccess() {
        console.log('Successfully sent');
      },
      error: function ajaxError(jqXHR, textStatus, errorThrown) {
          console.error('Error sending contact info: ', textStatus, ', Details: ', errorThrown);
          console.error('Response: ', jqXHR.responseText);
          alert('An error occured when sending your contact information:\n' + jqXHR.responseText);
      }
  });
}
