import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimerComponent } from './timer/timer.component';

export const router: Routes = [
  { path: '2', component: TimerComponent }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
