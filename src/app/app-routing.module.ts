import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

const routes: Routes = [
  {
    path: '',
    component: SearchFormComponent
  },
  {
    path: 'search-results',
    component: SearchResultsComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
