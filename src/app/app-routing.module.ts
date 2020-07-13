import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { AppComponent } from './app.component';


const routes: Routes = [

  { path: '', component: AppComponent,  children: [
    { path: '', redirectTo: '/progess', pathMatch: 'full' },
  ] },
  { path: 'progess', component: ProgressbarComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
