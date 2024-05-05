  import { Component, OnInit } from '@angular/core';
  import { ActionSheetController, NavController, ToastController } from '@ionic/angular';
  import { Storage } from '@ionic/storage-angular'; 
  import { collection, doc, getDocs, orderBy, query, where } from 'firebase/firestore';
  import { Firestore } from '@angular/fire/firestore';
  import { DataService } from '../data.service';
  import gsap from 'gsap';
  
  @Component({
    selector: 'app-prin',
    templateUrl: './prin.page.html',
    styleUrls: ['./prin.page.scss'],
  })
  export class PrinPage implements OnInit {
    usuarioID:string="";
    constructor(private service:DataService,private actionSheetCtrl: ActionSheetController, private router: NavController, private db:Firestore, private storage:Storage) { 
      
    }
    ngOnInit() {
      this.obtenerTareas();
      this.obtenerCarla();
      gsap.to(".button-enlace", {
        duration:1,
        ease: "power1.out",
        y: -500,
        opacity: 1
        });
    }  
    
    tareas:any[]=[];
      ruta:any;
      user:any;
      consulta:any;
      color: any;
      comando: any;
      fecha: any;
      logoCom: any;
      id: any;
      usuario: any;
      user1:any;
      nombre:any;
      code:any;
      async obtenerCarla(){
        this.user = await this.storage.get('User');
        this.ruta = collection(this.db, 'Carlas');
        const ref = query(this.ruta, where('usuario', '==', this.user));
        const consulta = await getDocs(ref);
        consulta.forEach(element => {
          const dato = element.data() as carla;
          if (dato.usuario === this.user) {
            this.user1 = dato.usuario;
            this.nombre = dato.nombre;
            this.code = dato.codigo;
          }
        });
      }
      async obtenerTareas(){
        this.user = await this.storage.get('User');
        this.ruta = collection(this.db, 'Tareas');
        const ref = query(this.ruta, where('usuario', '==', this.user),orderBy('fecha','asc'));
        const consulta = await getDocs(ref);
        
        this.tareas = [];
        const now = new Date();
          consulta.forEach(element => {
            const dato = element.data() as datauser;
            const color = dato.color;
            const comando = dato.comando;
            const fecha = dato.id.toString().substring(16,19);
            const logoCom = dato.logoCom;
            const id = dato.id;
            const usuario = dato.usuario;
            this.tareas.push({ color, comando, fecha, logoCom, id, usuario });
          });
          console.log(this.tareas[0]);
          this.service.setTareas(this.tareas[0]);
        }
      handleRefresh(event:any) {
        setTimeout(() => {
          this.obtenerTareas();
          this.obtenerCarla();
          event.target.complete();
        }, 2000);
      }

      tiempoRes(){
        
      }
  }
  interface carla {
    nombre: string;
    codigo: string;
    usuario: string;
  }
  interface datauser {
    color: string;
    comando: string;
    fecha: string;
    logoCom: number;
    id: number;
    usuario: number;
  }
