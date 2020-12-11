// import { Scene} from 'three/src/scenes/Scene';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// import {HemisphereLight, HemisphereLightHelper, PerspectiveCamera} from "three";
// import {WebGL1Renderer} from "three";
// import {AmbientLight} from "three";
// import {PointLight} from "three";
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r123/three.module.min.js';
import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/loaders/GLTFLoader.js";
// import * as THREE from 'three';
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/controls/OrbitControls.js";
// import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

var mixer,w=false,a=false,s=false,d=false,shift=false,animationData=[],keydown,walk,idle,current;
class Animation {
    constructor(name,action) {
this._action=action;
this._name=name;
    }

}
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.01,1000);
const renderer=new THREE.WebGL1Renderer({antialias:true});
renderer.setClearColor('#e5e5e5');
console.log(window.innerWidth*2/window.innerHeight)
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize',function(){
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
});

camera.position.set(0,25,-30);

camera.lookAt(new THREE.Vector3(0,15,10))
const clock=new THREE.Clock();
console.log(camera.position)

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
const pointLight = new THREE.PointLight( 0x404040, 1, 100 );
pointLight.position.set( 10, 10, 10 );
scene.add( pointLight );

const light2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );

scene.add( light2 );


var controls = new OrbitControls( camera, renderer.domElement );
controls.update();
const mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add( mesh );
let target;
const loader=new GLTFLoader();
loader.load('public/models/mix.glb',(gltf)=>{
console.log(gltf.animations)
target=gltf.scene;
gltf.scene.traverse(c=>{
    c.castShadow=true;
    c.receiveShadow=true;
})
    mixer=new THREE.AnimationMixer(target);
   // for(let i=0;i <gltf.animations.length;i++){
   //     animationData.push(new Animation(gltf.animations[i].name,mixer.clipAction(gltf.animations[i])));
   // }
    animationData=gltf.animations;
  let clip=animationData[1];

    let ani=mixer.clipAction(clip);
  idle=clip;
  current=idle;
  walk=animationData[2];
    ani.play();
    target.scale.setScalar(10)
scene.add(target)
    console.log(animationData)
})




document.addEventListener('keydown',function(e){
    keydown=true;
    console.log(e.key)
    if(target!==undefined){
        switch (e.key){
            case 'w':w=true;break;
            case 'a':a=true;break;
            case 'd':d=true;break;
            case 's':s=true;break;
            case 'Shift':shift=true;break;
        }

    }
})
document.addEventListener('keyup',function(e){

    if(target!==undefined){

        switch (e.key){
            case 'w':w=false;break;
            case 'a':a=false;break;
            case 'd':d=false;break;
            case 's':s=false;break;
            case 'Shift':shift=false;break;
        }

    }
    keydown=false;
})
var acceleration=new THREE.Vector3(1, 0.25, 100.0);
var velocity=new THREE.Vector3(0, 0, 0);
var deceleration=new THREE.Vector3(-0.0005, -0.0001, -5.0);
function move_forward(time){

      const frame_deceleration = new THREE.Vector3(
          velocity.x * deceleration.x,
          velocity.y * deceleration.y,
          velocity.z * deceleration.z
      );
      frame_deceleration.multiplyScalar(time);
      frame_deceleration.z = Math.sign(frame_deceleration.z) * Math.min(
          Math.abs(frame_deceleration.z), Math.abs(velocity.z));
      velocity.add(frame_deceleration);
      const controlObject = target;
      const _Q = new THREE.Quaternion();
      const _A = new THREE.Vector3();
      const _R = controlObject.quaternion.clone();
      const acc = acceleration.clone();
    let walk_action=mixer.clipAction(walk)
    let idle_action=mixer.clipAction(idle)
      if (w) {

              let prev = idle_action;

              current = walk;



           // idle_action.enabled=false;
               idle_action.fadeOut(1);
          walk_action.enabled=true;
          walk_action.setEffectiveWeight(1);
          walk_action.setEffectiveTimeScale(.5);
              walk_action.crossFadeFrom(idle_action,time*0.5,true)


          walk_action.play();

              if (shift) {
                  // console.log('shift work')
                  acc.z += 50;
              }
              velocity.z += acc.z * time;


      }else {
          if(current.name===walk.name){
              console.log('current=walk?',current.name===walk.name);
              current=idle;
              // walk_action.enabled=false;
              walk_action.fadeOut(0.1);
              idle_action.reset();
              idle_action.setEffectiveWeight(1);
              idle_action.setEffectiveTimeScale(1);
              idle_action.crossFadeFrom(walk_action,1.5*time,true);
              idle_action.play();
          }
      }
      if (s) {
          velocity.z -= acc.z * time;
      }
      if (a) {
          _A.set(0, 1, 0);
          _Q.setFromAxisAngle(_A, 4.0 * Math.PI * time * acceleration.y);
          _R.multiply(_Q);
      }
      if (d) {
          _A.set(0, 1, 0);
          _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * time * acceleration.y);
          _R.multiply(_Q);
      }
      controlObject.quaternion.copy(_R);

      const oldPosition = new THREE.Vector3();
      oldPosition.copy(controlObject.position);
      const forward = new THREE.Vector3(0, 0, 1);//z-direction

      forward.applyQuaternion(controlObject.quaternion);
      forward.normalize();

      const sideways = new THREE.Vector3(1, 0, 0);//x-direction
      sideways.applyQuaternion(controlObject.quaternion);
      sideways.normalize();
      sideways.multiplyScalar(velocity.x * time);
      forward.multiplyScalar(velocity.z * time);
      controlObject.position.add(forward);
      controlObject.position.add(sideways);

      oldPosition.copy(controlObject.position);

}
function animate() {

      let dt=clock.getDelta();
    requestAnimationFrame( animate );

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();



    if(mixer!==undefined){mixer.update(dt)}
  if(animationData[1]!==undefined){move_forward(dt);}
    renderer.render( scene, camera );

}
animate();

