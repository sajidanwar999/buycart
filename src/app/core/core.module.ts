import { NgModule } from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {HeaderComponent} from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import {PasswordMatchDirective} from './components/signup/password.match.directive';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    SignupComponent,
    ForgotPasswordComponent,
    PasswordMatchDirective
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SignupComponent
  ]
})
export class CoreModule { }
