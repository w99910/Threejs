// import { Scene} from 'three/src/scenes/Scene';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// import {HemisphereLight, HemisphereLightHelper, PerspectiveCamera} from "three";
// import {WebGL1Renderer} from "three";
// import {AmbientLight} from "three";
// import {PointLight} from "three";
// import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r123/three.module.min.js';
// import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/loaders/FBXLoader.js";
// import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/loaders/GLTFLoader.js";
// // import * as THREE from 'three';
// import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/controls/OrbitControls.js";
// // import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
// // import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
//
// var mixer,w=false,a=false,s=false,d=false,shift=false,enable_keydown=true,animationData=[],keydown,walk,idle,current;
// class Animation {
//     constructor(name,action) {
// this._action=action;
// this._name=name;
//     }
//
// }
// const scene=new THREE.Scene();
// console.log(scene);
// const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.01,1000);
// const renderer=new THREE.WebGL1Renderer({antialias:true});
// renderer.setClearColor('#f2f5fa');
// console.log(window.innerWidth*2/window.innerHeight)
// renderer.setSize(window.innerWidth,window.innerHeight);
// document.body.appendChild(renderer.domElement);
// window.addEventListener('resize',function(){
//     renderer.setSize(window.innerWidth,window.innerHeight);
//     camera.aspect=window.innerWidth/window.innerHeight;
//     camera.updateProjectionMatrix();
// });
//
// camera.position.set(0,25,-30);
//
// camera.lookAt(new THREE.Vector3(0,15,10))
// const clock=new THREE.Clock();
// console.log(camera.position)
//
// const light = new THREE.AmbientLight( 0x404040 ); // soft white light
// scene.add( light );
// const pointLight = new THREE.PointLight( 0x404040, 1, 100 );
// pointLight.position.set( 10, 10, 10 );
// scene.add( pointLight );
//
// const light2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
//
// scene.add( light2 );
//
//
// var controls = new OrbitControls( camera, renderer.domElement );
// controls.update();
// const mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0xF2F5FA, depthWrite: false } ) );
// mesh.rotation.x = - Math.PI / 2;
// mesh.receiveShadow = true;
// scene.add( mesh );
// let target;
// const loader=new GLTFLoader();
// loader.load('public/models/mix1.glb',(gltf)=>{
// console.log(gltf.animations)
// target=gltf.scene;
// gltf.scene.traverse(c=>{
//     c.castShadow=true;
//     c.receiveShadow=true;
// })
//     mixer=new THREE.AnimationMixer(target);
//    console.log(scene)
//     animationData=gltf.animations;
//     console.log(animationData);
//   let clip=animationData[1];
//
//     let ani=mixer.clipAction(clip);
//     console.log(ani)
//   idle=clip;
//   current=idle;
//   walk=animationData[5];
//     ani.play();
//     target.scale.setScalar(10)
// scene.add(target)
//     console.log(animationData)
// })
//
//
//
//
// document.addEventListener('keydown',function(e){
//     keydown=true;
//     // console.log(e.key)
//     if(target!==undefined&&enable_keydown){
//         switch (e.key){
//             case 'w':w=true;break;
//             case 'a':a=true;break;
//             case 'd':d=true;break;
//             case 's':s=true;break;
//             case 'Shift':shift=true;break;
//             case ' ':PlayKick();break;
//             case 'f':PlayDance();break;
//             case 'r':PlayPunch();break;
//         }
//
//     }
// })
// function PlayPunch(){
//     let clip=animationData[4];
//     if(mixer){
//         enable_keydown=false;
//         let prevAction=mixer.clipAction(idle);
//         let gym_ani=mixer.clipAction(clip);
//         gym_ani.reset();
//         gym_ani.setLoop(THREE.LoopOnce, 3);
//         gym_ani.clampWhenFinished = true;
//         gym_ani.crossFadeFrom(prevAction, 0.3, true);
//         gym_ani.play();
//         gym_ani.getMixer().addEventListener('finished',function(){
//             enable_keydown=true;
//             prevAction.reset();
//             prevAction.crossFadeFrom(gym_ani,0.3,true);
//             prevAction.play();
//         })
//     }
// }
//
// function PlayDance(){
//     let clip=animationData[0];
//     if(mixer){
//         enable_keydown=false;
//         let prevAction=mixer.clipAction(idle);
//         let gym_ani=mixer.clipAction(clip);
//         gym_ani.reset();
//         gym_ani.setLoop(THREE.LoopOnce, 3);
//         gym_ani.clampWhenFinished = true;
//         gym_ani.crossFadeFrom(prevAction, 0.3, true);
//         gym_ani.play();
//         gym_ani.getMixer().addEventListener('finished',function(){
//             enable_keydown=true;
//             prevAction.reset();
//             prevAction.crossFadeFrom(gym_ani,0.3,true);
//             prevAction.play();
//         })
//     }
// }
// function PlayKick(){
//
//     let clip=animationData[3];
//    if(mixer){
//        console.log(current.name==='running');
//        w=false;s=false;
//       // if(current.name==='running'){
//       //     mixer.clipAction(current).stop();
//       // }
//        enable_keydown=false;
//        let prevAction=mixer.clipAction(current);
//        let idle_action=mixer.clipAction(idle);
//        let gym_ani=mixer.clipAction(clip);
//        gym_ani.reset();
//        gym_ani.setLoop(THREE.LoopOnce, 3);
//        gym_ani.clampWhenFinished = true;
//        gym_ani.crossFadeFrom(prevAction, 0.3, true);
//        gym_ani.play();
//        gym_ani.getMixer().addEventListener('finished',function(){
//            enable_keydown=true;
//            idle_action.reset();
//            idle_action.crossFadeFrom(gym_ani,0.3,true);
//            idle_action.play();
//        })
//    }
// }
// document.addEventListener('keyup',function(e){
//
//     if(target!==undefined){
//
//         switch (e.key){
//             case 'w':w=false;break;
//             case 'a':a=false;break;
//             case 'd':d=false;break;
//             case 's':s=false;break;
//             case 'Shift':shift=false;break;
//         }
//
//     }
//     keydown=false;
// })
// var acceleration=new THREE.Vector3(1, 0.25, 100.0);
// var velocity=new THREE.Vector3(0, 0, 0);
// var deceleration=new THREE.Vector3(-0.0005, -0.0001, -5.0);
// function move_forward(time){
//
//       const frame_deceleration = new THREE.Vector3(
//           velocity.x * deceleration.x,
//           velocity.y * deceleration.y,
//           velocity.z * deceleration.z
//       );
//       frame_deceleration.multiplyScalar(time);
//       frame_deceleration.z = Math.sign(frame_deceleration.z) * Math.min(
//           Math.abs(frame_deceleration.z), Math.abs(velocity.z));
//       //get Math.Sign and get the minimum value of frame_deceleration's absolute z and velocity's absolute z
//       velocity.add(frame_deceleration);
//       const controlObject = target;
//       const _Q = new THREE.Quaternion();
//       const _A = new THREE.Vector3();
//       const _R = controlObject.quaternion.clone();
//       const acc = acceleration.clone();
//     let walk_action=mixer.clipAction(walk)
//     let idle_action=mixer.clipAction(idle)
//
//     if (w) {
//
//         if(current===idle){
//
//             walk_action.reset();
//         // idle_action.reset();
//         //   idle_action.play();
//           walk_action.enabled=true;
//
//             walk_action.crossFadeFrom(idle_action,0.16,true)
//           // console.log(idle_action.crossFadeTo(walk_action,0.1,true));
//
//             walk_action.play();
//
//               if (shift) {
//                   // console.log('shift work')
//                   acc.z += 50;
//               }
//
//         current=walk;
//             }
//         velocity.z += 1+acc.z * time;
//
//     }
//      else if (s) {
//           console.log(current===idle)
//           if(current===idle) {
//           idle_action.fadeOut(.5);
//          walk_action.enabled=true;
//           console.log(walk_action.crossFadeFrom(idle_action,0.2,true))
//           }
//
//           walk_action.play();
//           velocity.z -= acc.z * time;
//           current=walk;
//       }
//     else {
//         if(current.name===walk.name){
// setTimeout(function (){},1000);
//             idle_action.time=0.0;
// idle_action.enabled=true;
// idle_action.setEffectiveWeight(1.0);
// idle_action.setEffectiveTimeScale(1);
// idle_action.crossFadeFrom(walk_action,0.18,true);
// idle_action.play();
//
//         }
//         else{
//             idle_action.play();
//         }
//         current=idle;
//     }
//       if (a) {
//           _A.set(0, 1, 0);
//           _Q.setFromAxisAngle(_A, 4.0 * Math.PI * time * acceleration.y);
//           _R.multiply(_Q);
//       }
//       if (d) {
//           _A.set(0, 1, 0);
//           _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * time * acceleration.y);
//           _R.multiply(_Q);
//           console.log(_Q);
//           // target.rotation.y +=0.1;
//           // console.log(THREE.Math.radToDeg(target.rotation.y)%360)
//       }
//       controlObject.quaternion.copy(_R);
//
//       const oldPosition = new THREE.Vector3();
//       oldPosition.copy(controlObject.position);
//       const forward = new THREE.Vector3(0, 0, 1);//z-direction
//
//       forward.applyQuaternion(controlObject.quaternion);
//       forward.normalize();
//
//       const sideways = new THREE.Vector3(1, 0, 0);//x-direction
//       sideways.applyQuaternion(controlObject.quaternion);
//       sideways.normalize();
//       sideways.multiplyScalar(velocity.x * time);
//       forward.multiplyScalar(velocity.z * time);
//       controlObject.position.add(forward);
//       controlObject.position.add(sideways);
//
//       oldPosition.copy(controlObject.position);
//
// }
//
// function animate() {
//
//       let dt=clock.getDelta();
//     if(mixer!==undefined){mixer.update(dt)}
//     requestAnimationFrame( animate );
//
//     // required if controls.enableDamping or controls.autoRotate are set to true
//     controls.update();
//
//
//
//
//   if(animationData[1]!==undefined){move_forward(dt);}
//     renderer.render( scene, camera );
//
// }
// animate();

import * as THREE from 'https://unpkg.com/three/build/three.module.js'
import { CSS3DRenderer, CSS3DObject } from 'https://unpkg.com/three/examples/jsm/renderers/CSS3DRenderer.js';
import { TrackballControls } from 'https://unpkg.com/three/examples/jsm/controls/TrackballControls.js';

var camera, webglscene, webglrenderer;
var cssscene, cssrenderer;
var controls;
var geometry, material, mesh;

init();
animate();

function createYoutubeVideo ( id, x, y, z, ry ) {

    var div = document.createElement( 'div' );
    div.style.width = '480px';
    div.style.height = '360px';
    div.style.backgroundColor = '#fff';

    var iframe = document.createElement( 'iframe' );
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0px';
    iframe.src = [ 'https://www.youtube.com/embed/', id, '?rel=0' ].join( '' );
    div.appendChild( iframe );

    var cssobject = new CSS3DObject( div );
    cssobject.position.set( x, y, z );
    cssobject.rotation.y = ry;
    cssobject.scale.set(0.01, 0.01, 0.01);

    cssscene.add(cssobject);

    var material = new THREE.MeshPhongMaterial({
        opacity	: 0.0,
        color	: new THREE.Color('black'),
        blending: THREE.NoBlending,
        side	: THREE.DoubleSide,
    });

    var geometry = new THREE.PlaneGeometry( 480, 360 );
    var webglrepresentation = new THREE.Mesh( geometry, material );
    webglrepresentation.position.copy( cssobject.position );
    webglrepresentation.rotation.copy( cssobject.rotation );
    webglrepresentation.scale.copy( cssobject.scale );
    webglscene.add( webglrepresentation );
}

function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );
    camera.position.z = 10;

    webglscene = new THREE.Scene();

    webglrenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    webglrenderer.setClearColor( 0x000000, 0 );
    webglrenderer.setSize( window.innerWidth, window.innerHeight );
    document.querySelector('#webgl').appendChild( webglrenderer.domElement );

    cssscene = new THREE.Scene();
    cssrenderer = new CSS3DRenderer();
    cssrenderer.setSize( window.innerWidth, window.innerHeight );
    document.querySelector('#css').appendChild( cssrenderer.domElement );



    geometry = new THREE.BoxGeometry( 1, 1, 1 );
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh( geometry, material );
    webglscene.add( mesh );

    createYoutubeVideo( 'byO-xihstdw', 0, 0, -2, 0 );

    var backPlaneGeometry = new THREE.PlaneGeometry(20, 10)

    var backPlane = new THREE.Mesh(backPlaneGeometry, material);
    backPlane.position.set(0,0,-5);
    webglscene.add(backPlane);

    controls = new TrackballControls( camera, webglrenderer.domElement );
    controls.rotateSpeed = 4;

    window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    controls.update();
    webglrenderer.render( webglscene, camera );
    cssrenderer.render( cssscene, camera );

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    webglrenderer.setSize( window.innerWidth, window.innerHeight );
    cssrenderer.setSize( window.innerWidth, window.innerHeight );
}