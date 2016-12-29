function getQuote() {

    var quotetext = "";
    var author = "";
    var quote = "";
    var wikiauthor = "";

    // Clear the quote div contents on load.

    $("#quote").html();

    $.getJSON('http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?', function(json) {

      quote += json.quoteText;
      author += json.quoteAuthor;
      wikiauthor = author.replace(/ /, '+');

      if (author.length === 0) {
        quotetext = quote + ' - ' + ' Unknown';
        $("#quote").html('<p>' + quotetext + '</p>');
      } else {
        quotetext = quote;
        $("#quote").html('<p>' + '"' + quote + '" ' + "- " + '<a href="" id="author">' + author + '</a></p>');
      }

      // Set up the twitter button URL.

      var twitterurl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(quotetext + '-' + author);
      $('#twitter-share').attr("href", twitterurl);

      // Query wikipedia and see if there is an article about the author and provide a link if possible. This needs some error handling as there may not be a page or the author is unknown.

      $.getJSON('https://en.wikipedia.org//w/api.php?action=query&origin=*&format=json&prop=info&meta=&titles=' + wikiauthor + '&redirects=1&formatversion=latest&inprop=url', function(json) {

        $("#author").attr('href', json.query.pages[0].fullurl)

      });

    });

}

$(document).ready(function() {

  $('[data-toggle="tooltip"]').tooltip();

  getQuote();

  // Click the lobster for another quote after the first quote has been loaded.

  $("#lobster").on("click", function() {
    getQuote();
  });

});
