import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r123/three.module.min.js';

export default class ThirdPersonCamera {
    constructor(camera,target) {
 this._camera=camera;
 this._target=target;
 this._currentPosition=new THREE.Vector3();
 this._currentLookAt=new THREE.Vector3();

    }
    get Rotation(){
        if(!this._target){
            return new THREE.Quaternion();
        }
        return this._target.quaternion
    }
    _CalculateOffset(){
      const offset= new THREE.Vector3(0,6,-10);

      offset.applyQuaternion(this.Rotation);
      offset.add(this._target.position);
      return offset;
    }
    _CalculateLookAt(){
      const offset= new THREE.Vector3(0,4,30);
      offset.applyQuaternion(this.Rotation);
      offset.add(this._target.position);
      return offset;
    }
    Update(time){

const idealOffset=this._CalculateOffset();
const idealLookAt=this._CalculateLookAt();

        const t = 1.0 - Math.pow(0.001, time);

        this._currentPosition.lerp(idealOffset, t);
        this._currentLookAt.lerp(idealLookAt, t);
this._camera.position.copy(this._currentPosition);
this._camera.lookAt(this._currentLookAt);
    }
}