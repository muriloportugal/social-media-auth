import { environment } from "src/environments/environment";

export function facebookSdkLoader() {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : environment.fbApiId,
      cookie     : true,
      xfbml      : true,
      version    : 'v15.0'
    });

    FB.AppEvents.logPageView();

  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.setAttribute("src","https://connect.facebook.net/en_US/sdk.js");
    fjs.parentNode?.insertBefore(js, fjs)
   }(document, 'script', 'facebook-jssdk'));
}
