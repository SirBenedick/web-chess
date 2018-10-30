const pieces = require("./chess-pieces.json");

export class ChessBoard {
  constructor() {}
  highlightedTiles = [];

  tiles = {
    //weiß links
    a1: {
      value: "a1",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    b1: {
      value: "b1",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    c1: {
      value: "c1",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    d1: {
      value: "d1",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    e1: {
      value: "e1",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    f1: {
      value: "f1",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    g1: {
      value: "g1",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    h1: {
      value: "h1",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    //schwarz links
    a2: {
      value: "a2",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    b2: {
      value: "b2",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    c2: {
      value: "c2",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    d2: {
      value: "d2",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    e2: {
      value: "e2",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    f2: {
      value: "f2",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    g2: {
      value: "g2",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    h2: {
      value: "h2",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    //weiß links
    a3: {
      value: "a3",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    b3: {
      value: "b3",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    c3: {
      value: "c3",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    d3: {
      value: "d3",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    e3: {
      value: "e3",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    f3: {
      value: "f3",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    g3: {
      value: "g3",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    h3: {
      value: "h3",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    //schwarz links
    a4: {
      value: "a4",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    b4: {
      value: "b4",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    c4: {
      value: "c4",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    d4: {
      value: "d4",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    e4: {
      value: "e4",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    f4: {
      value: "f4",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    g4: {
      value: "g4",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    h4: {
      value: "h4",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    //weiß links
    a5: {
      value: "a5",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    b5: {
      value: "b5",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    c5: {
      value: "c5",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    d5: {
      value: "d5",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    e5: {
      value: "e5",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    f5: {
      value: "f5",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    g5: {
      value: "g5",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    h5: {
      value: "h5",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    //schwarz links
    a6: {
      value: "a6",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    b6: {
      value: "b6",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    c6: {
      value: "c6",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    d6: {
      value: "d6",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    e6: {
      value: "e6",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    f6: {
      value: "f6",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    g6: {
      value: "g6",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    h6: {
      value: "h6",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    //weiß links
    a7: {
      value: "a7",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    b7: {
      value: "b7",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    c7: {
      value: "c7",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    d7: {
      value: "d7",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    e7: {
      value: "e7",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    f7: {
      value: "f7",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    g7: {
      value: "g7",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    h7: {
      value: "h7",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    //schwarz links
    a8: {
      value: "a8",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    b8: {
      value: "b8",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    c8: {
      value: "c8",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    d8: {
      value: "d8",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    e8: {
      value: "e8",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    f8: {
      value: "f8",
      piece: "",
      class: { white: false, black: true, highlight: false }
    },
    g8: {
      value: "g8",
      piece: "",
      class: { white: true, black: false, highlight: false }
    },
    h8: {
      value: "h8",
      piece: "",
      class: { white: false, black: true, highlight: false }
    }
  };

  //main methodes
  updateBoard(propertiesArray: JSON) {
    console.log("updateBoard");
    var array: any = propertiesArray["propertiesarray"]["properties"];
    this.clearBoard();
    for (var _i = 1; _i < Object.keys(array).length; _i++) {
      let entry = array[_i]["entry"];

      if(entry[0] != ""){
        this.tiles[entry[0]].piece = this.mapPiece(entry[1], entry[2]);
      }
    }
  }

  highlightTiles(json: JSON): void {
    console.log("highlightTiles");
    //behandle Fall 1 möglichen Zug oder mehrere (schneidet 'propertiesarray' ab)

    this.clearAllHighlights();

    json = this.handlePropertiesArray(json);
    let properties = json["properties"];

    if (properties[0] == undefined) {
      let tile = properties["entry"][1];
      this.tiles[tile].class.highlight = true;
      this.highlightedTiles.push(tile);
    } else {
      var count = Object.keys(properties).length;
      for (let index = 0; index < count; index++) {
        const element = properties[index]["entry"];

        let tile = element[1];
        this.tiles[tile].class.highlight = true;
        this.highlightedTiles.push(tile);
      }
    }
  }

  //helper methodes
  clearBoard(): void {
    console.log("clearBoard");
    Object.keys(this.tiles).forEach(key => {
      let tile = this.tiles[key];
      //console.log(tile);
      tile.piece = null;
    });
  }

  clearAllHighlights(): any {
    console.log("clearAllHighlights");
    this.highlightedTiles.forEach(tile => {
      this.tiles[tile].class.highlight = false;
    });
    this.highlightedTiles = [];
  }

  handlePropertiesArray(json: JSON): JSON {
    if (json.hasOwnProperty("propertiesarray")) {
      console.log("has array");
      return json["propertiesarray"];
    }
    return json;
  }

  mapPiece(piece: String, isWhite: boolean): string {
    switch (piece) {
      case "Koenig": {
        if (isWhite) {
          return pieces.Koenig[0];
        }
        return pieces.Koenig[1];
      }
      case "Dame": {
        if (isWhite) {
          return pieces.Dame[0];
        }
        return pieces.Dame[1];
      }
      case "Turm": {
        if (isWhite) {
          return pieces.Turm[0];
        }
        return pieces.Turm[1];
      }
      case "Laeufer": {
        if (isWhite) {
          return pieces.Laeufer[0];
        }
        return pieces.Laeufer[1];
      }
      case "Springer": {
        if (isWhite) {
          return pieces.Springer[0];
        }
        return pieces.Springer[1];
      }
      case "Bauer": {
        if (isWhite) {
          return pieces.Bauer[0];
        }
        return pieces.Bauer[1];
      }
    }
  }
}
