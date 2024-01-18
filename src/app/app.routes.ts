import { Routes } from '@angular/router';
import {SalesComponent} from "./sales/sales.component";
import {ProductsComponent} from "./products/products.component";
import {ClientsComponent} from "./clients/clients.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {AuthGuard} from "./guards/auth.guard";


export const routes: Routes = [
  {path:"login", component: LoginComponent,canActivate: [AuthGuard],data:{ roles: ['admin']}},
  {path : "admin" , component : AdminComponent,
    children : [
      {path : "clients" , component : ClientsComponent},
      {path : "products" , component : ProductsComponent},
      {path : "sales" , component :  SalesComponent},

    ],canActivate: [AuthGuard],data:{ roles: ['admin']}
  },

  {path : "" , redirectTo : "/admin/clients" , pathMatch : "full"}
];
