import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface FbUserPicture{
  data: {
    height: number;
    width: number;
    is_silhouette: boolean;
    url: string;
  }
}
export interface FbUserDataResponse{
  id:string;
  name: string;
  picture: FbUserPicture;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$: BehaviorSubject<FbUserDataResponse|null>;

  constructor(
    private router: Router,
    private ngZone: NgZone,
  ) {
    this.userData$ = new BehaviorSubject<FbUserDataResponse|null>(null);
  }

  //Função chamada no app.module antes de iniciar o projeto e carregar o FB SDK
  loadFbSDK(authService:AuthService){
    new Promise((resolve)=>{
      window.fbAsyncInit = function() {
        FB.init({
          appId      : environment.fbApiId,
          cookie     : true,
          xfbml      : true,
          version    : 'v15.0'
        });

        FB.AppEvents.logPageView();
        //Verifica se o usuário já esta logado, assim pula a tela de login
        FB.getLoginStatus(response =>{
          //Se o usuário já estiver logado busca as informações do mesmo
          if(response.authResponse && response.status === 'connected'){
            authService.getUserData(response.authResponse.userID,response.authResponse.accessToken);
            return resolve(true);
          }else{
            return resolve(false);
          }
        });

      };

      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.setAttribute("src","https://connect.facebook.net/en_US/sdk.js");
        fjs.parentNode?.insertBefore(js, fjs)
       }(document, 'script', 'facebook-jssdk'));
    })
  }

  loginFacebook(){
    FB.login(response=>{
      if(response.authResponse && response.status === 'connected'){
        //Usuário logou corretamente busca as informações do usuário, id, nome e foto
        this.getUserData(response.authResponse.userID,response.authResponse.accessToken);
      }else{
        //Usuário não logou ou não deu permissão aos dados de nome de usuário e foto
      }
    });
  }

  getUserData(fbUserId:string, fbToken:string){
    //Utiliza o SDK do facebook para buscar as informações id, nome e foto do usuário.
    FB.api<FbUserDataResponse>(`${fbUserId}?fields=id,name,picture.type(normal)&acces_token=${fbToken}`, (userDataResponse)=>{
      this.userData$.next(userDataResponse);
      this.ngZone.run(()=>this.router.navigate(['/home']));
      // document.location.href='\home';
    });
  }
}
