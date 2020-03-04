---
---

/*
{% include zepto.getscript.js %}
{% include zepto.outer.js %}
jQuery = $;
*/

{% include cookie-consent.js %}

$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  return results && results[1] || 0;
}

$(document).ready(function(){
  $('a[href^="http://"]').not('a[href*="{{ site.baseurl }}"]').attr('target','_blank');
  $('a[href^="https://"]').not('a[href*="{{ site.baseurl }}"]').attr('target','_blank');
  $('a[href$=".pdf"]').attr('target', '_blank');

  if(!$.urlParam("speed")) {
    $(document).ready(function() {
      $.getScript("{{ site.baseurl }}/assets/js/jquery.disqusloader.js", function( data, textStatus, jqxhr ) {
         console.log( textStatus );
         $.disqusLoader( '.disqus', { scriptUrl: '//{{ site.disqus.shortname }}.disqus.com/embed.js' });
      });
    });
  };
});
