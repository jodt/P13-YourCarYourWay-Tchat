import { Routes } from '@angular/router';
import {ChatComponent} from "./components/chat/chat.component";
import {RegisterComponent} from "./components/register/register.component";

export const routes: Routes = [
  {path:'', component:RegisterComponent},
  {path:'chat', component:ChatComponent}
];
