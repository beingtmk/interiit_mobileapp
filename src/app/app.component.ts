import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { GalleryPage } from '../pages/gallery/gallery';
import { SportsPage } from '../pages/sports/sports';
import { ResultPage } from '../pages/result/result';
import { SponsorshipPage } from '../pages/sponsorship/sponsorship';
import {LivePage}from'../pages/live/live';
//import { MapsPage } from '../pages/maps/maps';
import { ContactUsPage } from '../pages/contactus/contactus';
import { NotificationPage } from '../pages/notification/notification';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
declare var FCMPlugin;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  activePage: any;
  pages: Array<{title: string, component: any, icon:string}>;
  private resetBackButton: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public push: Push, public alertCtrl: AlertController) {
    this.initializeApp();
    // if(this.nav.length() == 1){
    //
    // }
    // this.platform.registerBackButtonAction(this.exit);
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage ,icon:'home'},
      // { title: 'List', component: ListPage ,icon:'home'},
      { title: 'Gallery', component: GalleryPage ,icon:'photos' },
      { title: 'Sports', component: SportsPage ,icon:'american-football' },
      // { title: 'Results', component: ResultPage ,icon:'home' },
      { title: 'Live', component:LivePage ,icon:'logo-youtube' },
      // { title: 'Maps', component: MapsPage ,icon:'home'},
      { title: 'Contact Us', component: ContactUsPage ,icon:'contacts'},
      { title: 'Notification', component: NotificationPage, icon:'md-notifications'}
    ];
    this.activePage=this.pages[0];

  }

  initializeApp() {
    var that = this;
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushsetup();
       if(typeof(FCMPlugin) !== "undefined"){
        FCMPlugin.getToken(function(t){
          console.log("Use this token for sending device specific messages\nToken: " + t);
          FCMPlugin.subscribeToTopic("msgall");
        }, function(e){
          console.log("Uh-Oh!\n"+e);
        });

        FCMPlugin.onNotification(function(d){
          console.log("notification",d);
          if(d.wasTapped){
            // Background recieval (Even if app is closed),
            //   bring up the message in UI
            console.log('notification tapped');
            if(that.nav.getActive().name !=='NotificationPage')
              that.nav.push(NotificationPage);
            else{
              that.nav.pop(NotificationPage);
              that.nav.push(NotificationPage);
            }
          } else {
            // Foreground recieval, update UI or what have you...
            console.log('notification tapped:else');
          }
        }, function(msg){
          // No problemo, registered callback
          console.log(msg);
        }, function(err){
          console.log("Arf, no good mate... " + err);
        });
      } else console.log("Notifications disabled, only provided in Android/iOS environment");
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
    // this.activePage=page;
  }
  checkActive(page){
    return page==this.activePage;
  }
  pushsetup() {
    const options: PushOptions = {
       android: {
<<<<<<< HEAD
         // senderID: '255556131441'
=======
           //senderID: '255556131441'
>>>>>>> bf6a05e9a9c8d61f0afe5d66ee2a51237efe7f7c
       },
       ios: {
           alert: 'true',
           badge: true,
           sound: 'false'
       },
       windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        let youralert = this.alertCtrl.create({
          title: 'Notification',
          message: notification.message,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Go to Notifications',
              handler: () => {
                console.log(this.nav.getActive().name);
                if(this.nav.getActive().name !=='NotificationPage')
                  this.nav.push(NotificationPage);
                else{
                  this.nav.pop(NotificationPage);
                  this.nav.push(NotificationPage);
                }
                console.log('Notification clicked');
              }
            }
          ]
        });
        youralert.present();
      }
    });

    pushObject.on('registration').subscribe((registration: any) => {
       //do whatever you want with the registration ID
    });

    pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }
  exitApp(){
    console.log(this.nav.length());
    let that = this;
    console.log("exit alert");
    let alert = this.alertCtrl.create({
          title: 'Exit',
          message: 'Do you want to exit?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Exit',
              handler: () => {
                console.log('Exit clicked');
                that.platform.exitApp();
              }
            }
          ]
        });
    alert.present();
  }
}

