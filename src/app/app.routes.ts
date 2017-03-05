import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimerComponent } from './timer/timer.component';
import { GravityComponent } from './gravity/gravity.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const router: Routes = [
  { path: '2', component: TimerComponent },
  { path: '3', component: GravityComponent },
  { path: '**', component: NotFoundComponent }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
