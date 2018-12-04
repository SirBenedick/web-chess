import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

//import { parser } from "fast-xml-parser";
var parser = require("fast-xml-parser");

@Injectable({
  providedIn: "root"
})
export class BackendService {
  constructor(private http: HttpClient) {}
  xml: string;
  gameEngineering = "http://www.game-engineering.de:8080/rest/schach/spiel/";

  getAktuelleBelegung(): Observable<string> {
    console.log("getAktuelleBelegung b.s");
    return this.http.get(this.gameEngineering + "getAktuelleBelegung/7", {
      responseType: "text"
    });
  }

  getErlaubteZuege(position: string) {
    console.log("getErlaubteZuege");
    return this.http.get(
      this.gameEngineering + "getErlaubteZuege/7/" + position,
      {
        responseType: "text"
      }
    );
  }

  ziehe(von: string, nach: string) {
    console.log("ziehe");
    return this.http.get(this.gameEngineering + "ziehe/7/" + von + "/" + nach, {
      responseType: "text"
    });
  }

  getZugHistorie() {
    console.log("getZugHistorie");
    return this.http.get(this.gameEngineering + "getZugHistorie/7/", {
      responseType: "text"
    });
  }

  neuesSpiel() {
    console.log("neuesSpiel");
    return this.http.get(this.gameEngineering + "admin/neuesSpiel/7", {
      responseType: "text"
    });
  }

  ladenSpiel() {
    console.log("ladenSpiel");
    return this.http.get(this.gameEngineering + "admin/ladenSpiel/7", {
      responseType: "text"
    });
  }

  speichernSpiel() {
    console.log("speichernSpiel");
    return this.http.get(this.gameEngineering + "admin/speichernSpiel/7", {
      responseType: "text"
    });
  }

  xmlToJsonObj(data: string): JSON {
    if (parser.validate(data) === true) {
      var jsonObj: any = parser.parse(data);
      console.log(jsonObj);
      return jsonObj;
    }
  }
}
