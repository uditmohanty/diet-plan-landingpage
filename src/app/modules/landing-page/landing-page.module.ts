import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { AboutComponent } from './about/about.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { PricingComponent } from './pricing/pricing.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    AboutComponent,
    TermsConditionsComponent,
    FaqComponent,
    ContactComponent,
    PricingComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule
  ]
})
export class LandingPageModule { }
