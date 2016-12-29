$(document).ready(function() {
  
  getQuote();

  function getQuote() {

    var quotetext = "";
    var author = "";
    var quote = "";
    
    // Clear the quote div contents on load.

    $("#quote").html();
    
    $.getJSON('http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?', function(json) {
      quote += json.quoteText;
      author += json.quoteAuthor;

      if (author.length == 0) {
        quotetext = quote + '- ' + ' Unknown';
        $("#quote").html('<p>'+ quotetext +'</p>');
      } else {
        quotetext = quote + '- ' + author;
        $("#quote").html('<p>' + '"' + quote + '"' + '</i> - ' + '<b>' + author + '</p>');
      }
      
      // Set up the twitter button URL.
      
      var twitterurl = "https://twitter.com/intent/tweet?text="+encodeURIComponent(quotetext);
      $('#twitter-share').attr("href", twitterurl);

    });

  }
  
  // Click the lobster for another quote after the first quote has been loaded.

  $("#lobster").on("click", function() {
    getQuote();
  });
  
  $('[data-toggle="tooltip"]').tooltip();

});