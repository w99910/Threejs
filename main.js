import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r123/three.module.min.js';
// import * as THREE from 'three';
// const THREE=require('three');
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/controls/OrbitControls.js";
import ThirdPersonCamera from "./public/ThirdPersonCamera.js";
import {CSS3DObject} from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/renderers/CSS3DRenderer.js";
import {CSS3DRenderer} from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/renderers/CSS3DRenderer.js";
// import Vue from 'vue';
// const Vue=require('vue');
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
let scene,mixer,thirdCamera,camera,selected,CssScene,css_render;
Vue.createApp({
    data(){
return{
      // scene:null,
    camera:null,
    renderer:null,
    container:null,
    manager:null,
    character:null,
    animations:[],
    controls:null,
    clock:new THREE.Clock(),
    x:0,
    y:2,
    z:-4,
    _keys:{
        forward:false,
        backward:false,
        right:false,
        left:false,
        space:false,
        shift:false,
        r:false,
        f:false
    },
    current:null,
    idle:null,
    walk:null,
    kick:null,
    punch:null,
    dance:null,
    run:null,
    jump:null,
    selected:null,

}
    },
    watch:{
        x(){
          this.camera.position.x=this.x;
      },
        y(){
            this.camera.position.y=this.y;
        },
        z(){
            this.camera.position.z=this.z;
        },

    },
    computed:{
      _forward:{
          get(){
              return this._keys.forward;
          },
          set(value){
              this._keys.forward=value;
          }
      },
    _backward:{
          get(){
              return this._keys.backward;
          },
          set(value){
              this._keys.backward=value;
          }
      },
    _right:{
          get(){
              return this._keys.right;
          },
          set(value){
              this._keys.right=value;
          }
      },
         _left:{
          get(){
              return this._keys.left;
          },
          set(value){
              this._keys.left=value;
          }
      },
        _space:{
          get(){
              return this._keys.space;
          },
          set(value){
              this._keys.space=value;
          }
      },
        _shift:{
          get(){
              return this._keys.shift;
          },
          set(value){
              this._keys.shift=value;
          }
      },
        _r:{
            get(){
                return this._keys.r;
            },
            set(value){
                this._keys.r=value;
            }
        },
        _f:{
            get(){
                return this._keys.f;
            },
            set(value){
                this._keys.f=value;
            }
        },


    },
    methods:{
        move(time){
            /*First:Acceleration to compute the speed
            Second:Frame Deceleration to stop the motion --> velocity*deceleration
            Third:
              */
            const acceleration=new THREE.Vector3(1, 0.25, 200.0);
            const velocity=new THREE.Vector3(0, 0, 0);
            const deceleration=new THREE.Vector3(-0.0005, -0.0001, -5.0);
            const frame_deceleration = new THREE.Vector3(
                velocity.x * deceleration.x,
                velocity.y * deceleration.y,
                velocity.z *deceleration.z
            );
            frame_deceleration.multiplyScalar(time);
            //assign to frame_deceleration's z to Math.Sign and get the minimum value of frame_deceleration's absolute z and velocity's absolute z
            frame_deceleration.z=Math.sign(Math.min(Math.abs(frame_deceleration.z),Math.abs(velocity.z)))
            velocity.add(frame_deceleration);
            const Q=new THREE.Quaternion();
            const A=new THREE.Vector3();
            const R=this.character.quaternion.clone();
            const acc=acceleration.clone();
            const target=this.character;
            const run=mixer.clipAction(this.run);
            const idle=mixer.clipAction(this.idle);
            const jump=mixer.clipAction(this.jump);
            const kick=mixer.clipAction(this.kick);
            const dance=mixer.clipAction(this.dance);
            const punch=mixer.clipAction(this.punch);
      if(this._forward){
          if(this.current!==this.run){

              run.enabled=true;
              run.crossFadeFrom(mixer.clipAction(this.current),0.16,true);
          }

          run.play();
          velocity.z += 2+acc.z * time;
          this.current=this.run;
      }else if(this._backward){
          if(this.current!==this.run){
              run.enabled=true;
              run.crossFadeFrom(mixer.clipAction(this.current),0.16,true);
          }
          run.play();
          velocity.z -= 2+acc.z * time;
          this.current=this.run;
      }
      else {
                if(this.current===this.run){
                    idle.time=0;
                    idle.enabled=true;
                    idle.setEffectiveWeight(1);
                    idle.setEffectiveTimeScale(1);
                    idle.crossFadeFrom(mixer.clipAction(this.current),0.18,true);
                    idle.play();
                }
                this.current=this.idle;
      }
      if(this._right){
          A.set(0,1,0);
          Q.setFromAxisAngle(A,4.0*-Math.PI*time*acceleration.y);
          R.multiply(Q)
      }
      if(this._left){

          A.set(0,1,0);
          Q.setFromAxisAngle(A,4.0*Math.PI*time*acceleration.y);
          R.multiply(Q);
      }
      if(this._space){
          this._forward=false;
          this._backward=false;
          this._right=false;
          this._left=false;
          jump.reset();
          jump.setLoop(THREE.LoopOnce,1);
          jump.clampWhenFinished=true;
          jump.crossFadeFrom(mixer.clipAction(this.current),0.2,true);
          jump.play();
          jump.getMixer().addEventListener('finished',function(){
              idle.reset();
              idle.crossFadeFrom(jump,0.3,true);
              idle.play();
          })
      }
            if(this._r){
                let current_action=mixer.clipAction(this.current);
                current_action.stop();
                velocity.z=0;
                punch.reset();
                punch.setLoop(THREE.LoopOnce,1);
                punch.clampWhenFinished=true;
                punch.crossFadeFrom(mixer.clipAction(this.current),0.2,true);
                punch.play();
               let me=this;
                punch.getMixer().addEventListener('finished',function(){
                    console.log('finish')
                    if(me.current!==me.idle)
                    {   current_action.enabled=true;
                         current_action.setEffectiveWeight(1);
                         current_action.setEffectiveTimeScale(1);
                        current_action.crossFadeFrom(punch,0.2,true);
                        current_action.play();
                        // me.current=me.idle;
                    }else {
                        idle.reset();
                        idle.crossFadeFrom(punch, 0.3, true);
                        idle.play();
                        me.current=me.idle;
                    }
                    })
            }
            if(this._f){
                this._forward=false;
                this._backward=false;
                this._right=false;
                this._left=false;
                kick.reset();
                kick.setLoop(THREE.LoopOnce,1);
                kick.clampWhenFinished=true;
                kick.crossFadeFrom(mixer.clipAction(this.current),0.2,true);
                kick.play();
                kick.getMixer().addEventListener('finished',function(){
                    idle.reset();
                    idle.crossFadeFrom(kick,0.3,true);
                    idle.play();
                })
            }

      target.quaternion.copy(R);
      const oldPosition=new THREE.Vector3();
      oldPosition.copy(target.position);
      const forward=new THREE.Vector3(0,0,1);
      forward.applyQuaternion(target.quaternion);
      forward.normalize();
      forward.multiplyScalar(velocity.z*time)
            target.position.add(forward);
      oldPosition.copy(target.position);
      },
        incrementX(){
          this.x +=1;
        },
        incrementY(){
          this.y +=1;
        },incrementZ(){
          this.z +=1;
        },decrementX(){
          this.x -=1;
        },
        decrementY(){
          this.y -=1;
        },decrementZ(){
          this.z -=1;
        },
        animate(){
            requestAnimationFrame( this.animate );
            this.renderer.render( scene , camera );
            css_render.render(CssScene,camera);
            // this.controls.update();

            let dt=this.clock.getDelta();
            if(this.character!==null){ this.move(dt)}
            if(mixer!==undefined){mixer.update(dt)}
            // if(thirdCamera!==undefined){thirdCamera.Update(dt)}
            // if(selected!==undefined){selected.rotation.x+=0.05; console.log(selected)}
            },
        ReSize(){
            //updateRenderer
            this.renderer.setSize(this.container.getBoundingClientRect().width,this.container.getBoundingClientRect().height)
            //SetCamera
            camera.aspect=this.container.getBoundingClientRect().width/this.container.getBoundingClientRect().height;
            //UpdateCamera
            camera.updateProjectionMatrix();
        },
        KeyDown(input,parent){
            switch (input.key){
                case 'w':parent._forward=true;break;
                case 's':parent._backward=true;break;
                case 'a':parent._left=true;break;
                case 'd':parent._right=true;break;
                case ' ':parent._space=true;break;
                case 'Shift':parent._shift=true;break;
                case 'r':parent._r=true;break;
                case 'f':parent._f=true;break;
            }

        },
        KeyUp(input,parent){
            switch (input.key){
                case 'w':parent._forward=false;break;
                case 's':parent._backward=false;break;
                case 'a':parent._left=false;break;
                case 'd':parent._right=false;break;
                case ' ':parent._space=false;break;
                case 'Shift':parent._shift=false;break;
                case 'r':parent._r=false;break;
                case 'f':parent._f=false;break;
            }

        },
    },
    created(){
        this.container=document.querySelector('#app');
        console.log('mounted');
        /*THREE js : 1st Step: createScene */
        scene=new THREE.Scene();


        const loader1 = new THREE.CubeTextureLoader();
        const texture = loader1.load([
            './public/models/Textures/px.png',
            './public/models/Textures/nx.png',
            './public/models/Textures/py.png',
            './public/models/Textures/ny.png',
            './public/models/Textures/pz.png',
            './public/models/Textures/nz.png',
        ]);
        texture.encoding = THREE.sRGBEncoding;
        scene.background = texture;
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 50, 10, 10),
            new THREE.MeshStandardMaterial({
                color: 0x808080,
            }));
        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        // scene.add(plane);
        const geometry = new THREE.BoxGeometry(5,5);
        const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        const cube = new THREE.Mesh( geometry, material );
        cube.position.set(10,0,20)
        scene.add( cube );
        const geometry1 = new THREE.BoxGeometry(8,8);
        const material1 = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        const cube1 = new THREE.Mesh( geometry1, material1 );
        cube1.position.set(20,0,-10)
        scene.add( cube1 );
        const geometry2 = new THREE.BoxGeometry(10,10);
        const material2 = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        const cube2 = new THREE.Mesh( geometry2, material2 );
        cube2.position.set(-30,0,-20)
        scene.add( cube2 );
        //2nd Step: createCamera;
        camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,100);
        camera.position.set(this.x,this.y,this.z);
        //3d Step:createRenderer;
        this.renderer=new THREE.WebGL1Renderer({antialias:true});
        this.renderer.setClearColor('#c1c8c1');
        this.renderer.setSize(this.container.getBoundingClientRect().width,this.container.getBoundingClientRect().height);
        this.container.appendChild(this.renderer.domElement);

        //4thStep:createLight;
        const ambient_light=new THREE.AmbientLight(0x404040);
        scene.add(ambient_light);
        const light2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );

        scene.add( light2 );
        //5thStep:Finally Animate the renderer;

        this.controls = new OrbitControls( camera, this.renderer.domElement );
        // this.controls.enableRotate = false;
        // this.controls.enableZoom = false;
        // this.controls.enablePan = false;
        this.controls.update();
        const loader= new GLTFLoader();
        let vm=this;
        loader.load('./public/models/mix1.glb',function( gltf ){
            let obj=gltf.scene;
            obj.traverse((c)=>{
                c.castShadow=true;
                c.receiveShadow=true;
            })
            vm.character=obj;
            obj.position.y=0
            vm.animations=gltf.animations;
            mixer=new THREE.AnimationMixer(gltf.scene);
            let clip=vm.animations[1];
         obj.scale.setScalar(2)
           let action=mixer.clipAction(clip);
           vm.current=clip;
           vm.idle=clip;
           vm.dance=vm.animations[0];
           vm.run=vm.animations[5];
           vm.punch=vm.animations[4];
           vm.kick=vm.animations[3];
           vm.jump=vm.animations[2];
            console.log(vm.animations)
            action.setEffectiveTimeScale(1);
            action.setEffectiveWeight(1);
            action.play();
            scene.add(gltf.scene);
            thirdCamera=new ThirdPersonCamera(camera,obj);
        },( xhr ) => {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },)
       let cssContainer=document.createElement('div');
        cssContainer.classList.add('absolute')
        cssContainer.classList.add('w-full');
        cssContainer.classList.add('h-full');
        cssContainer.classList.add('top-0');
        cssContainer.classList.add('left-0');
        cssContainer.classList.add('bg-transparent');
        cssContainer.classList.add('z-10')
        this.container.appendChild(cssContainer);
        CssScene=new THREE.Scene();
        css_render=new CSS3DRenderer();
        css_render.setSize(cssContainer.getBoundingClientRect().width,cssContainer.getBoundingClientRect().height)
        cssContainer.appendChild(css_render.domElement)
        let css3d=document.createElement('div');
        css3d.classList.add('bg-white');
        css3d.classList.add('w-64');
        css3d.classList.add('h-64');
        css3d.innerHTML="<h1>HEllO sdfsdfsdfsdf ;lkjlkjxkcvjiurwoer</h1>";
        let css_obj=new CSS3DObject(css3d);
        css_obj.castShadow=true;
        css_obj.receiveShadow=true;
        css_obj.position.set(0,0,0);
        css_obj.scale.setScalar(100)

        CssScene.add(css_obj)
        console.log(CssScene.children)
      console.log('created')
    },
    mounted(){
        let me= this;
        let ray = new THREE.Raycaster();
        let mouse={};
         this.container.addEventListener('click',function(e){
             mouse.x=(e.clientX/me.container.getBoundingClientRect().width)*2-1;
             mouse.y=(e.clientY/me.container.getBoundingClientRect().height)*-2+1;
             ray.setFromCamera(mouse,camera);
             let items=ray.intersectObjects(scene.children);
             items.forEach((i)=>{
                 selected=selected===i.object?undefined:i.object;
                 console.log(mouse)
                 console.log(i.object)
             })
             // if(me.character!==null){console.log(me.character)}
         })
         document.addEventListener('keydown',function (e){me.KeyDown(e,me)})
         document.addEventListener('keyup',function (e){me.KeyUp(e,me)})

        this.animate();

        // this.manager=new THREE.LoadingManager();
        // this.manager.onProgress=function(url,itemsLoaded,itemsTotal){
        //     console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        // }





        //UpdateTheSceneWheneverWindowResize;
        window.addEventListener('resize',()=>this.ReSize());
    }
}).mount('#app')