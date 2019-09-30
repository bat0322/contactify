$(document).ready(function(){
  $("button").click(function(){
    console.log('Connected to JS file');
    var choices = $("input[type='text']").map(function(i, val) {
      return $(val).val();
    }).toArray();
    console.log(choices);
  });
});
