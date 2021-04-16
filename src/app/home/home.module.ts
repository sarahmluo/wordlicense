import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children : [
      {
        path: 'play',
        children: [
          {
            path: '',
            loadChildren: () => import('../play/play.module').then(m => m.PlayPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
    //RouterModule.forChild(routes)
   // HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
