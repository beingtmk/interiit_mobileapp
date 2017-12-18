import { Component, OnDestroy } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { MapsPage } from '../maps/maps';
import { MapsHomePage } from '../mapshome/mapshome';

@Component({
  selector: 'page-mapsroot',
  templateUrl: 'mapsroot.html'
})
export class MapsRoot implements OnDestroy{

  constructor(public navCtrl:NavController){

  }
  loadFreeRoam(){
    this.navCtrl.push(MapsPage);
  }
  loadDestination(){
    this.navCtrl.push(MapsHomePage);
  }
  ionViewWillEnter(){

  }

  ngOnDestroy(){}
}
