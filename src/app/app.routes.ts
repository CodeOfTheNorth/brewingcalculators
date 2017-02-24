import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimerComponent } from './timer/timer.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const router: Routes = [
  { path: '2', component: TimerComponent },
  { path: '**', component: NotFoundComponent }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
