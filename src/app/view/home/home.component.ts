import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BallTypes } from 'src/app/components/bola/bola.component';
import { AuthService } from 'src/app/services/auth.service';

interface Position{
  x:number;
  y:number;
}

interface User{
  name: string;
  photo: string;
  position:Position;
  balltype: BallTypes;
  index:number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private _users: User[] = [];
  positions: Position[] = [];
  //tamanho das bolas em pixel
  sizeWpx = 100;
  sizeHpx = 110;

  constructor(
    private authService:AuthService,
    private changeDetectRef: ChangeDetectorRef
  ) {
    document.body.className = 'bgNatal';

  }


  ngOnInit(): void {
    //Adiciona X usuários aleatóriamente na tela
    let usrs: User[] = [];
    for (let i = 0; i < 20; i++) {
      usrs.push({
        name: `User ${i}`,
        photo: this.choosePhoto(),
        position: this.newPostion(usrs),
        balltype: this.chooseBallType(),
        index: i,
      });

    }
    this.users = usrs;
    this.authService.userData$.subscribe(userData=>{
      if(userData){
        const userTemp = this.users;
        userTemp.push({
          name: userData.name,
          photo: userData.picture.data.url,
          balltype: this.chooseBallType(),
          position: this.newPostion(this.users),
          index: this.users.length+1,
        });
        this._users = userTemp;
        this.changeDetectRef.detectChanges();
      }
    })
  }

  get users( ): User[] {
    return this._users;
  }

  set users(users: User[]){
    this._users = users;
  }

  /**
   * Adiciona uma nova posição para o usuário, recebe por parâmetro o array de usuários para comparar se não vai adicionar o novo
   * usuário por "cima" de algum que já existe.
   * @param users
   * @returns
   */
  newPostion(users:User[]): Position{
    let posX = Number(Number((Math.random()*window.innerWidth)).toFixed());
    let posY = Number(Number((Math.random()*window.innerHeight)).toFixed()); //Deixa adicioanar mais posições na vertical, mesmo que ultrapasse a tela.
    //Em telas muito pequenas (celular) pode demorar muito para encontrar uma posição de X e Y para que uma bolinha não fique sobre a outra
    //então utilizamos o contador em baixo que irá pular de 10px em 10px no eixo Y(vertical), posicionando assim elas mais para baixo
    let countHeight = 1;

    //Define uma posição horizontal aleatória e não deixa ultrapassar o tamanho máximo da tela.
    do{
      posX = Number(Number((Math.random()*window.innerWidth)).toFixed());
    }while(posX >= (window.innerWidth-this.sizeWpx));

    while(this.dontRepeatPosition(posX,posY,users)){
      //Define uma posição horizontal aleatória e não deixa ultrapassar o tamanho máximo da tela.
      do{
        posX = Number(Number((Math.random()*window.innerWidth)).toFixed());
      }while(posX >= (window.innerWidth-this.sizeWpx));
      posY = (Number(Number((Math.random()*window.innerHeight)).toFixed())+(countHeight*10));
      countHeight++;
    }
    countHeight = 1;
    const position: Position = {
      x: posX,
      y: posY,
    };

    //Não deixa colocar duas bolas uma em cima da otura
    // if(this.dontRepeatPosition(position, users)){
    //   return this.newPostion(users);
    // }
    return position;
  }

  dontRepeatPosition(x:number, y:number, users:User[]){
    return users.some(user=>{
      if(
        (user.position.x-(this.sizeWpx) <= x && user.position.x+(this.sizeWpx) >= x) &&
        (user.position.y-(this.sizeHpx) <= y && user.position.y+(this.sizeHpx) >= y)
      ){
        return true;
      }
      return false;
    })
  }

  chooseBallType(){
    //Altera a cor de cada bola randomicamente, apesar de termos somente 4 tipos de bolas, deixamos ir até 8 para que tenha mais vermelhas que as demais
    const type = Number(Number(Math.random()*8).toFixed());
    switch (type) {
      case 0:
        return BallTypes.red;
      case 1:
        return BallTypes.green;
      case 2:
        return BallTypes.yellow;
      case 3:
        return BallTypes.grey;
      default:
        return BallTypes.red;
    }
  }

  choosePhoto(){
    const type = Number(Number(Math.random()*3).toFixed());
    switch (type) {
      case 0:
        return 'assets/data/user1.png';
      case 1:
        return 'assets/data/user2.png';
      case 2:
        return 'assets/data/user3.png';
      case 3:
        return 'assets/data/user4.png'
      default:
        return 'assets/data/user1.png';
    }
  }

  identifyChangeUser(index:number,user:User){
    return user ? user.index : undefined;
  }
}
