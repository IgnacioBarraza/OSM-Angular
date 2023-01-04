import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { CrudviewComponent } from './crudview/crudview.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'view', component: CrudviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
