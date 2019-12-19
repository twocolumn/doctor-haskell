(function ($) {
    $.getScript = function(src, func) {
        var script = document.createElement('script');
        script.async = "async";
        script.src = src;
        if (func) {
           script.onload = func;
        }
        document.getElementsByTagName("head")[0].appendChild( script );
    }
}(Zepto));
