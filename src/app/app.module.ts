import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './lib/homepage/homepage.component';
import { WorkListComponent } from './lib/work-list/work-list.component';
import { StoreModule } from '@ngrx/store';
import { stateReducer } from './lib/state/store.reducer';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment
import { EffectsModule } from '@ngrx/effects';
import { WorkListEffects } from './lib/state/state.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './lib/work-list/item/item/item.component';

@NgModule({
	declarations: [ AppComponent, HomepageComponent, WorkListComponent, ItemComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		StoreModule.forRoot({ state: stateReducer }),
		StoreDevtoolsModule.instrument({
			maxAge: 25, // Retains last 25 states
			logOnly: environment.production, // Restrict extension to log-only mode
			autoPause: true // Pauses recording actions and state changes when the extension window is not open
		}),
		EffectsModule.forRoot([ WorkListEffects ]),
		NgbModule,
		FormsModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
