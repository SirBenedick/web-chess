import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BackendService } from "../backend.service";
const pieces = require("./chess-pieces.json");
import { ChessBoard } from "./chess-board";
import { Observable } from "rxjs";

@Component({
  selector: "app-chess-board",
  templateUrl: "./chess-board.component.html",
  styleUrls: ["./chess-board.component.css"]
})
export class ChessBoardComponent implements OnInit {
  constructor(
    private backendService: BackendService,
    private http: HttpClient
  ) {}

  chessBoard: ChessBoard = new ChessBoard();
  updateMessage = "";
  lastClick;

  ngOnInit(): void {
    this.getAktuelleBelegung();
  }

  getAktuelleBelegung() {
    console.log("getAktuelleBelegung c-b.c");
    let obs: Observable<string> = this.backendService.getAktuelleBelegung();

    obs.subscribe(data => {
      console.log("observable fetched aktuelleBelegung");
      // console.log(data);
      let belegung: JSON = this.backendService.xmlToJsonObj(data);
      console.log(belegung);
      this.chessBoard.updateBoard(belegung);
    });
  }

  onSelect(tile: ChessBoard["tiles"]["a1"]) {
    console.log("onSelect");
    console.log(tile);

    // wenn schon makiert ziehe
    if (tile.class.highlight) {
      let obs: Observable<string> = this.backendService.ziehe(this.lastClick.value, tile.value);
      obs.subscribe(data => {
        console.log(data);
        this.getAktuelleBelegung();
        this.chessBoard.clearAllHighlights();
      });

    } else {
      this.lastClick = tile;
      let obs: Observable<string> = this.backendService.getErlaubteZuege(
        tile["value"]
      );

      obs.subscribe(data => {
        let zuege: JSON = this.backendService.xmlToJsonObj(data);

        if (zuege == undefined) {
          console.log("Ungültiger Zug");
          this.chessBoard.clearAllHighlights();
          this.updateMessage = "Ungültiger Zug";
        } else {
          this.chessBoard.highlightTiles(zuege);
        }
      });
    }
  }

  /*
to do

-code aufräumen
-kommentieren
-ausgabe:
  nicht am zug
-spiel gewonnen 

*/
}
