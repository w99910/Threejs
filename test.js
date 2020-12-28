//  // import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r123/three.module.min.js';
// import * as THREE from 'three';
// // const THREE=require('three');
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import {CSS3DObject} from "three/examples/jsm/renderers/CSS3DRenderer.js";
// import {CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer.js";
// import * as CANNON from 'cannon-es'
// import {threeToCannon} from "three-to-cannon";
// import cannonDebugger from "cannon-es-debugger";
//
// let scene,renderer,controls,camera,selected,CssScene,css_render,debugRender,time_step,world,cube1_body,cube1;
// let container=document.querySelector('#app');
// let cssContainer=document.createElement('div');
// const ambient_light=new THREE.AmbientLight(0x404040);
// const light2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
//
// camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.01,500);
// camera.position.set(40,40,-30);
//
// cssContainer.classList.add('absolute')
// cssContainer.classList.add('w-full');
// cssContainer.classList.add('h-full');
// cssContainer.classList.add('top-0');
// cssContainer.classList.add('left-0');
// cssContainer.classList.add('bg-transparent');
// // cssContainer.classList.add('z-10')
// container.appendChild(cssContainer);
// CssScene=new THREE.Scene();
// css_render=new CSS3DRenderer();
//
// css_render.setSize(cssContainer.getBoundingClientRect().width,cssContainer.getBoundingClientRect().height)
// cssContainer.appendChild(css_render.domElement)
//
//
//
//
// let css3d=document.createElement('div');
// css3d.classList.add('bg-black');
// css3d.classList.add('text-white');
// css3d.innerHTML="<h1 class='text-white'>HEllO sdfsdfsdfsdf ;lkjlkjxkcvjiurwoer</h1>";
// let css_obj=new CSS3DObject(css3d);
// css_obj.castShadow=true;
// css_obj.receiveShadow=true;
// css_obj.position.set(0,0,0);
// css_obj.scale.setScalar(.1)
// CssScene.add(css_obj)
// // CssScene.add(ambient_light);
// // CssScene.add( light2 );
// console.log(CssScene.children)
//
// /* ****************** */
// const webgl_container=document.createElement('div');
// webgl_container.classList.add('absolute')
// webgl_container.classList.add('w-full');
// webgl_container.classList.add('h-full');
// webgl_container.classList.add('top-0');
// webgl_container.classList.add('left-0');
// webgl_container.classList.add('bg-transparent');
// container.appendChild(webgl_container);
//
//
// renderer=new THREE.WebGL1Renderer({antialias:true,alpha:true});
// // renderer.setClearColor('#c1c8c1');
// renderer.setSize(webgl_container.getBoundingClientRect().width,webgl_container.getBoundingClientRect().height);
// webgl_container.appendChild(renderer.domElement);
// scene=new THREE.Scene();
// const geometry = new THREE.BoxGeometry(5,5);
// const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
// const material1 = new THREE.MeshBasicMaterial( { color: 0x000000 } );
// const cube = new THREE.Mesh( geometry, material );
// cube1 = new THREE.Mesh( geometry, material1 );
// cube.position.set(10,0,20)
// cube1.position.set(20,0,30)
// scene.add( cube );
// scene.add( cube1 );
// scene.add(ambient_light);
// scene.add( light2 );
//
// controls = new OrbitControls( camera, renderer.domElement );
// // this.controls.enableRotate = false;
// // this.controls.enableZoom = false;
// // this.controls.enablePan = false;
// controls.update();
// let Geo;
// let obj_loader=new OBJLoader();
// let gltf_loader=new GLTFLoader();
// let b;
// gltf_loader.load('/public/models/threeJs.glb',function (obj){
//     obj.scene.traverse((c)=>{
//         Geo=c.geometry;
//     })
//    obj.scene.scale.setScalar(.04);
//     const shape=threeToCannon(obj.scene,{type:threeToCannon.Type.MESH});
//     const body=new CANNON.Body({shape:shape,mass:2});
//    console.log('body:',body);
//
//    world.addBody(body);
//   // scene.add(obj.scene)
// })
// time_step=1.0/60.0;
// world=new CANNON.World();
// world.gravity.set(0,-10,0);
// world.broadphase=new CANNON.NaiveBroadphase();
// let plane1=new CANNON.Plane();
// let plane_body=new CANNON.Body({shape:plane1,mass:0});
// plane_body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2)
// world.addBody(plane_body);
// cannonDebugger(scene,world.bodies)
//
//
// function animate(){
//     requestAnimationFrame( animate );
//
//     renderer.render( scene , camera );
//     css_render.render(CssScene,camera);
//     controls.update();
//     if(world!==undefined) {
//         world.step(time_step);
//
//     }
// }
// animate();
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Raw from '@editorjs/raw';
import Quote from '@editorjs/quote';

const editor = new EditorJS({
     holderId:'editorjs',
      tools:{
          header: {class:Header,inlineToolbar:['link']},
          list:List,
          raw:Raw,
          quote:Quote,
      }
});

Vue.createApp({
    data(){
        return{
         hey:'hello',
    }
    },
    methods:{
        bold(){

            // let container=document.querySelector('.inline-box')



            let text=window.getSelection();
            let inline_container=document.querySelector('.box')

            let container=text.getRangeAt(0).commonAncestorContainer.parentElement;
            let c_text=container.innerText;
            // console.log(text.getRangeAt(0).commonAncestorContainer.parentNode);
            // console.log(container);
           if(window.getSelection().toString().length>0&&text.getRangeAt(0).commonAncestorContainer.parentNode===container) {
               // let container1=document.createElement('span');

               container.innerHTML = '<span>'+c_text.substring(0, text.getRangeAt(0).startOffset)+"</span>"+"<strong>" + text.toString() + "</strong>" +"<span>"+ c_text.substring(text.getRangeAt(0).endOffset, c_text.length) +"</span>";

                // container.innerHTML = "<p class='inline-box'>" + c_text.substring(0, text.getRangeAt(0).startOffset) + "<strong>" + text.toString() + "</strong>" + c_text.substring(text.getRangeAt(0).endOffset, c_text.length) + "</p>";
               // container.replaceWith(container1);
               console.log(container)
           }else{
               alert('Please selected within the div')
           }
            // console.log(
            //    (window.getSelection().toString().length>0)?text.getRangeAt(0).commonAncestorContainer.parentNode===container:'');
        },
        uppercase(){
            // let c_text=container.innerText;
            let text=window.getSelection();
            let inline_container=document.querySelector('.box')
            let container=text.getRangeAt(0).commonAncestorContainer.parentElement;
            console.log(window.getComputedStyle(container).getPropertyValue('font-size'))
            let c_text=container.innerText;
            if(window.getSelection().toString().length>0&&text.getRangeAt(0).commonAncestorContainer.parentNode===container) {

                // let container1=document.createElement('span');
                // container1.classList.add('box');
                container.innerHTML = '<span>'+c_text.substring(0, text.getRangeAt(0).startOffset)+"</span>"+"<span class='uppercase'>" + text.toString() + "</span>"+"<span>"+ c_text.substring(text.getRangeAt(0).endOffset, c_text.length)+"</span>";
               console.log(container)
                // console.log(container1)
                // container.replaceWith(container1);
                // console.log('after',inline_container)
            }else{
                alert('Please selected within the div')
            }
        }
    }
}).mount('#app')
