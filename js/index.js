function getQuote() {

  var quotetext = "";
  var author = "";
  var quote = "";
  var wikiauthor = "";
  var quotelength;

  if (location.protocol === 'https:') {
    $("#lobster").attr('src', 'https://jamespayne.net/img/sad-lobster.png');
    $("#quote").html('<p>Sorry! This app only works with a http address not https. Please open this same location with http at the beginning of the url not https!</p>');

  } else {
    $.getJSON('http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?')
      .done(function(json) {
        quote += json.quoteText.trim();
        author += json.quoteAuthor; 
        wikiauthor = author.replace(/ /, '+');
        console.log(quote);

        if (author.length === 0) {
          author = 'Unknown';
          quotetext = '"' + quote + '" - ' + author;
          $("#quote").html('<p id="quote-text">' + quotetext + '</p>');
        } else {
          quotetext = '"' + quote + '" - ' + author;
          $("#quote").html('<p id="quote-text">' + quotetext + '</p>');
        }

        // Set up and display the twitter button if the quote is short enough to tweet.

        quotelength = quotetext.length + author.length + '- '.length;

        if (quotelength <= 140) {
          var twitterurl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(quotetext);
          $('#twitter-share').attr("href", twitterurl);
          $('#social').show();
        }

        // Query wikipedia and see if there is an article about the author and provide a link if possible. This needs some error handling as there may not be a page or the author is unknown.

        $.getJSON('https://en.wikipedia.org//w/api.php?action=query&origin=*&format=json&prop=info&meta=&titles=' + wikiauthor + '&redirects=1&formatversion=latest&inprop=url', function(json) {
          
          // Check to see if there is an article and add an info icon to the end of the quote if there is.
          
          if (!json.query.pages[0].hasOwnProperty('missing')){
            $("#quote-text").append('  <span><a href="' + json.query.pages[0].fullurl + '" target="_blank">' + '<i class="fa fa-info-circle" aria-hidden="true"></i></a></span>');
          }

        });

      })
      .fail(function() {
        $("#lobster").attr('src', 'https://jamespayne.net/img/sad-lobster.png');
        $('#quote').html("Uh Ohhh... Something went wrong!");
      });
  }

}

$(document).ready(function() {
  
  $("#social").hide();
  $("#quote").html();
  
  $('[data-toggle="tooltip"]').tooltip();

  getQuote();

  // Click the lobster for another quote after the first quote has been loaded.

  $("#lobster").on("click", function() {
    getQuote();
  });

});