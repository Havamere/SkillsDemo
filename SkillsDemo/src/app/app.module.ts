import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { JokeScrollComponent } from './components/home/joke-scroll/joke-scroll.component';
import { MessageBoardComponent } from './components/message-board/message-board.component';
import { MessageCreateComponent } from './components/message-board/message-create/message-create.component';
import { MessageListComponent } from './components/message-board/message-list/message-list.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserService } from './user.service';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    JokeScrollComponent,
    MessageBoardComponent,
    MessageCreateComponent,
    MessageListComponent,
    ContactComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
