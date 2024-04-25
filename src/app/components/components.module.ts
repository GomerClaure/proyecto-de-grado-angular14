import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
  ],
  exports:[
    NavComponent, 
    FooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
