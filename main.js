$(document).ready(function(){
  console.log('Connected to JS file');
  // submit contact info
  $("#submit").click(function(){
    var choices = $("input[type='text']").map(function(i, val) {
      return $(val).val();
    }).toArray();
    console.log(choices);
  });

  // send vcf to zack's email
  $("#send").click(function(){
    console.log("sending contact info");
  });
});
