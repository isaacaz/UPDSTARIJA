import { Component, OnInit, ViewChild } from '@angular/core';
import {  LoadingController ,IonSearchbar,NavParams} from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';
import {DatabaseService} from '../services/database.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  items: Array<any>= [];
  empty: boolean = false;
  mysearch:string='';
  loader: any;
  @ViewChild('mainSearchbar',{static:false}) searchBar: IonSearchbar;
  constructor(public db:DatabaseService,public loadingCtrl:LoadingController,private router:Router) { }

  ngOnInit() {
    setTimeout(()=>{
      this.searchBar.setFocus();
      //this.keyboard.show();
  }, 750);
  }

  searchItems(ev: any) {
    // let val = this.mysearch;
    // if(val){
    //   if (val.length && val.trim().length > 0) {
    //   this.presentLoading();
    //   this.items=[];
    //   this.db.getRealTimeDBQuery('upds/noticias', ref=>ref.limitToLast(100))
    //   .subscribe((res : Array<any>) => {
    //     this.items = res;
        
    //     this.items = this.items.filter((item) => {
    //       return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //     });
       
    //    this.items.sort((a , b) => {
    //       return (a.timestamp < b.timestamp)?1:0;
    //     })


    //     this.items.map(noticia => {
    //       if (noticia.images != null) {
    //         noticia.images.reverse().map(img => {
    //           noticia.image_main = img;
    //           return false;
    //         })
    //       } else {

    //       }
    //     })
    //     this.empty = this.items.length==0;
    //     this.loader.dismiss();
    //   })
    // }
    // }
  }

  async  presentLoading() {
    this.loader = await this.loadingCtrl.create({
      message: "Buscando Noticias..."
    });
    return this.loader.present();
  }
  showNoticia(key){

    this.router.navigate(['NoticiaDetallePage'],key)
  }
  ionViewDidEnter(){
  }
  ionViewDidLeave(){
    this.loader.dismiss();
  }
}
