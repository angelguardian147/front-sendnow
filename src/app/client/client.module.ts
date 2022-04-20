import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { ClientService } from './client.service';

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule
  ],
  providers: [ClientService]
})
export class ClientModule { }
