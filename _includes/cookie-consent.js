$(document).ready(function(){
    function createExpires(days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        return "; expires=" + date.toUTCString();
    }
    function createCookie(name,value,days) {
        const expires = days ? createExpires(days) : "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    function readCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    function eraseCookie(name) {
        createCookie(name,"",-1);
    }
    function isTrue(value) {
        return value == 'true'
    }
    const cookieNoticeDismissed = isTrue(readCookie('cookie-notice-dismissed'));
    if(!cookieNoticeDismissed) {
        $('#cookie-notice').show();
    }
    $('#cookie-notice-accept').click(function() {
        createCookie('cookie-notice-dismissed','true',31);
        $('#cookie-notice').hide();
    });
});
