import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MessageListComponent } from "./message-list/message-list.component";
import { MessageCreateComponent } from "./message-create/message-create.component";

const messageRoutes: Routes = [
	{path: '/message-board', component: MessageListComponent, outlet: "message-router" },
	{path: '/message-board/create', component: MessageCreateComponent, outlet: "message-router" },
	{path: '/message-board/edit/:messageId', component: MessageCreateComponent, outlet: "message-router" }
]

@NgModule({
	imports: [RouterModule.forRoot(messageRoutes)],
	exports: [RouterModule]
})

export class MessageRoutingModule {}