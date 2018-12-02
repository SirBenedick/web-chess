import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

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
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  playingAsWhite: boolean = true;
  lastClick;
  whitesTurn: boolean = true;

  //Objekte die an die View (chess-board.component.html) gebunden sind
  chessBoard: ChessBoard = new ChessBoard();
  updateMessage = "";
  zugHistorie = [];

  ngOnInit(): void {
    this.neuesSpiel();
    this.getAktuelleBelegung();

    this.route.params.subscribe(params => {
      if (+params["isWhite"] == 1) {
        this.playingAsWhite = true;
      } else {
        this.playingAsWhite = false;
      }
    });
  }

  getAktuelleBelegung() {
    console.log("getAktuelleBelegung c-b.c");
    let obs: Observable<string> = this.backendService.getAktuelleBelegung();

    obs.subscribe(data => {
      console.log("observable fetched aktuelleBelegung");
      let belegung: JSON = this.backendService.xmlToJsonObj(data);
      // console.log(belegung);
      this.chessBoard.updateBoard(belegung);
      this.chessBoard.clearAllHighlights();
    });

    this.getZugHistorie();
  }

  getZugHistorie() {
    //zugHistorieMsg laden und welcher spieler ist dran
    let obsHistorie: Observable<string> = this.backendService.getZugHistorie();

    obsHistorie.subscribe(data => {
      console.log("observable fetched obsHistorie");

      let historie: JSON = this.backendService.xmlToJsonObj(data);
      historie = this.chessBoard.handlePropertiesArray(historie);

      //bei Spielbeginn ist historie == null
      if (historie != null) {
        this.zugHistorie = [];
        console.log(historie);
        //nach dem ersten Zug ist das XML anders
        if (historie["properties"][1] == undefined) {
          this.zugHistorie.push({
            zug: String(historie["properties"]["entry"][0])
          });
        } else {
          historie["properties"].forEach(element => {
            this.zugHistorie.push({ zug: String(element["entry"][0]) });
          });
        }
      }
      //wer ist dran
      if (this.zugHistorie.length % 2 == 0) {
        this.whitesTurn = true;
      } else {
        this.whitesTurn = false;
      }
    });
  }

  //Methode reagiert auf auswählen der chess-board.component.html
  onSelect(tile: ChessBoard["tiles"]["a1"]) {
    console.log("onSelect");
    console.log(tile);

    //check whos turn
    /*
     *
     *TO-DO
    use
    this.whitesTurn and ... or just count the turns
     *
     *
     */

    // wenn schon makiert -> ziehe, sonst makiere
    if (tile.class.highlight) {
      let obs: Observable<string> = this.backendService.ziehe(
        this.lastClick.value,
        tile.value
      );
      obs.subscribe(data => {
        console.log(data);
        let jsonObj: JSON = this.backendService.xmlToJsonObj(data);
        let meldung = jsonObj["properties"]["entry"][0];

        if (meldung == "ziehe: Sie sind nicht am Zug!") {
          this.updateMessage = "Sie sind nicht am Zug!";
          this.chessBoard.clearAllHighlights();
        } else {
          this.getAktuelleBelegung();
          this.chessBoard.clearAllHighlights();
        }
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

  spieleBisZug(bisZug) {
    console.log("spiele bis: " + bisZug);
    let oldZugHistorie = this.zugHistorie;
    // wenn Zug aus der Zughistorie ausgewählt wird muss bis dahin gespielt werden

    //sobald ein neues Spiel erstellt wurde soll rekursiv die "oldZugHistorie" abgearbeitet werden
    console.log("neuesSpielspeileBisZug");
    let obs: Observable<string> = this.backendService.neuesSpiel();

    obs.subscribe(data => {
      console.log("observable fetched neuesSpiel");
      this.chessBoard.clearAllHighlights();

      let bisFrom = bisZug.slice(1, 3);
      let bisTo = bisZug.slice(4, 6);
      console.log("Aufruf spiele obs " + bisFrom + bisTo);
      this.spieleBisObs(bisFrom, bisTo, oldZugHistorie, 0);
    });
  }

  spieleBisObs(bisFrom: string, bisTo: string, oldZugHistorie, index) {
    console.log("spieleBisObs: " + index);
    //die herangehensweise ist nicht sehr schön dcoch was besseres viel spontan nicht ein
    let from = oldZugHistorie[index].zug.slice(1, 3);
    let to = oldZugHistorie[index].zug.slice(4, 6);

    // console.log("Aufruf spiele obs " + from + to);
    // wir lassen ziehen und bei erhalt von einer Antwort ziehen wir nochmal, es sei denn wir haben den letzten Zug gezogen
    let obs: Observable<string> = this.backendService.ziehe(from, to);

    obs.subscribe(data => {
      console.log("index: " + index);

      if (bisFrom == from && bisTo == to) {
        console.log("Letzer Zug erledigt");
        this.getAktuelleBelegung();
      } else {
        console.log("Zieht weiter");
        this.spieleBisObs(bisFrom, bisTo, oldZugHistorie, (index += 1));
      }
    });
  }

  //Backend Admin Mehtoden
  neuesSpiel() {
    console.log("neuesSpiel");
    let obs: Observable<string> = this.backendService.neuesSpiel();

    obs.subscribe(data => {
      console.log("observable fetched neuesSpiel");
      // console.log(data);
      this.getAktuelleBelegung();
      this.chessBoard.clearAllHighlights();
    });
    this.zugHistorie = [];
  }

  ladenSpiel() {
    console.log("ladenSpiel");
    let obs: Observable<string> = this.backendService.ladenSpiel();

    obs.subscribe(data => {
      console.log("observable fetched ladenSpiel");
      // console.log(data);

      //richtig eklige Lösung für sein komisches Backend
      let obsSpeichern: Observable<
        string
      > = this.backendService.speichernSpiel();

      obsSpeichern.subscribe(data => {
        console.log("observable fetched speichernSpiel");
        let obsLaden: Observable<string> = this.backendService.ladenSpiel();

        obsLaden.subscribe(data => {
          console.log("observable fetched ladenSpiel");
          this.chessBoard.clearBoard();
          this.getAktuelleBelegung();
        });
      });
    });
  }

  speichernSpiel() {
    console.log("speichernSpiel");
    let obs: Observable<string> = this.backendService.speichernSpiel();

    obs.subscribe(data => {
      console.log("observable fetched speichernSpiel");
      // console.log(data);
    });
  }

  /*
TO-DO
-play as black or white or both
-ausgabe:
  "nicht am zug"
-polling

beim Laden eines Spieles 
-Spiel gewonnen 

Its a features not a bug:

-alle Figuren sind nach Spiel laden weiss
-->XMLtoJSON muss angepasst werden

*/
}
