import { Component, OnInit, Input } from '@angular/core';

export enum BallTypes{
  red = 'assets/data/bolanatal1.png',
  green = 'assets/data/bolanatal2.png',
  yellow = 'assets/data/bolanatal3.png',
  grey = 'assets/data/bolanatal4.png',
}

@Component({
  selector: 'app-bola',
  templateUrl: './bola.component.html',
  styleUrls: ['./bola.component.css']
})
export class BolaComponent implements OnInit {
  @Input() set positionX(x:number){
    this._positionX = x;
  }
  @Input() set positionY(y:number){
    this._positionY = y;
  }
  @Input() set typeBall(type:BallTypes){
    this._sourceBall = type;
  }
  @Input() set Width(w:number){
    this._width = w;
  }
  @Input() set Height(h:number){
    this._height = h;
  }
  @Input() set userPhoto(pic:string){
    this._userPhoto = pic;
  }
  @Input() set userName(name:string){
    this._userName = name;
  }

  private _positionX: number = 0;
  private _positionY: number = 0;
  private _sourceBall: BallTypes = BallTypes.red;//Qual o desenho da bolinha que vai ser utilizado
  private _width: number = 0;
  private _height: number = 0;
  private _userPhoto = '';
  private _userName = '';

  constructor() { }

  ngOnInit(): void {
  }

  get positionX(): number {
    return this._positionX;
  }

  get positionY(): number {
    return this._positionY;
  }

  get typeBall(): BallTypes {
    return this._sourceBall;
  }

  get   width(): number{
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get userPhoto():string{
    return this._userPhoto;
  }

  get userName():string{
    return this._userName;
  }

}
