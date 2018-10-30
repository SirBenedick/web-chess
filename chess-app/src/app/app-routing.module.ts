import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChessBoardComponent }      from './chess-board/chess-board.component';

const routes: Routes = [
  { path: '', redirectTo: '/chessboard', pathMatch: 'full' },
  { path: 'chessboard', component: ChessBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
