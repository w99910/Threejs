export default class Controller{
    constructor(){
    this._Init();
    }
 _Init(){
this._keys={
    forward:false,
    backward:false,
    right:false,
    left:false,
    space:false,
    shift:false,
};
    // document.addEventListener('keydown',(e)=>this._KeyDown(e),false)
    // document.addEventListener('keyup',(e)=>this._KeyUp(e),false);
 }
 _KeyDown(input){
        switch (input.key){
            case 'w':this._keys.forward=true;break;
            case 's':this._keys.backward=true;break;
            case 'a':this._keys.left=true;break;
            case 'd':this._keys.right=true;break;
            case ' ':this._keys.space=true;break;
            case 'Shift':this._keys.shift=true;break;
        }

 }
 _KeyUp(input){
     switch (input.key){
         case 'w':this._keys.forward=false;break;
         case 's':this._keys.backward=false;break;
         case 'a':this._keys.left=false;break;
         case 'd':this._keys.right=false;break;
         case ' ':this._keys.space=false;break;
         case 'Shift':this._keys.shift=false;break;
     }
 }
}