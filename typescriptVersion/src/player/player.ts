
// for now ship only lies on vertical or horizontal, no diagionals
type Direction = "north" | "south" | "east" | "west";
type locationType = "sea" | "ship";
type shipsAvailable = "tug" | "minesweeper" | "frigate" | "battleship"

interface mapPoint{
    type : locationType;
    shipId?: number;
    sectionId?: number;
}

interface Point {
    x : number;
    y : number;
}

interface Sea{
    nameOfSea : string;
    width: number;
    height:number;
    mapOfSea : mapPoint[][] 
}

interface boat{
    Id : number;               // number of ship
    startPoint : Point;        // where the boat starts
    boatType?: shipsAvailable; // types of ship - user defines this when placing 
    length?: number;           // overall length - code infers from type
    orientation : Direction;   // direction it lies in
}

interface boatSpec {
    boatType : shipsAvailable;
    length : number
}

class Player {

    name : string;
    fleetLeftToPlace : string[];
    placedBoats : boat[];
    opponentSea : Sea = {nameOfSea : "notMine", width : 20, height : 20, mapOfSea : []};
    mySea : Sea = {nameOfSea : "tranquility", width : 20, height : 20, mapOfSea : []};
    fleetSpec : Map<string, number> = new Map;

    constructor(name : string){
        this.name = name;
        for (let y = 0; y < this.mySea.height; y++){
            this.mySea.mapOfSea[y].fill({type: "sea"}, 0, this.mySea.width );
            this.opponentSea.mapOfSea[y].fill({type: "sea"}, 0, this.opponentSea.width );

        }
        this.fleetLeftToPlace =  ["tug", "minesweeper", "frigate", "frigate", "battleship"];
        this.fleetSpec.set["tug"] = 1;
        this.fleetSpec.set["minesweeper"] = 2;
        this.fleetSpec.set["frigate"] = 3;
        this.fleetSpec.set["battleship"] = 6;
    }

    // check if this type of ship is supported and any are left to be placed
    isShipAvailable(ship: string): ship is shipsAvailable {
        return this.fleetLeftToPlace.includes(ship);
    }
 
    // function to allow a player to place a ship
    // player species ship ID, type, start point
    // returns true if ship placed, false if a different start point needs to be picked
    playerShipPlacement(shipType: string,
                        startX: number, startY: number,
                        orientation : Direction ){
 
        if (this.isShipAvailable(shipType)){
            let potentialBoat : boat = { orientation: orientation, 
                                         Id:1,
                                         startPoint : {x: startX, y: startY}, 
                                         length : this.fleetSpec.get[shipType] }
            if (this.fitShip(potentialBoat)){
                // remove this type from the availavle list
                const shipIndex = this.fleetLeftToPlace.findIndex(listItem => listItem === shipType);
                if (shipIndex !== -1) {
                    this.fleetLeftToPlace.splice(shipIndex, 1);
                }

                // add to the fleet now that its placed onto the map
                this.placedBoats.push(potentialBoat);
            } 
            else {
                console.warn(` ship could not be fitted `)
                return false; 
            } 
        }
        else {
            console.warn(`invalid shipType attempted ${shipType} `)
            return false; 
        }

    }

    // test if the ship will fit into the board
    // given start, length and direction it lies in
    // if it does fit - place on "sea" and return true
    // if it does not fit, return false

    fitShip( boatToFit : boat) : boolean {
        
        let startX : number = boatToFit.startPoint.x;
        let startY : number = boatToFit.startPoint.y;
        let shipLine : Direction = boatToFit.orientation;
        let shipLength = boatToFit.length;
        let endX : number = 0;
        let endY : number = 0;
        let deltaX = 0;
        let deltaY = 0;
        let boatFits :boolean = true;   // assume all good until proven otherwise
        
        switch(shipLine){
            case "north":
                endX = startX;
                endY = startY - shipLength;
                deltaX = 0;
                deltaY = -1;
                break
            case "south":
                endX = startX;
                endY = startY + shipLength;
                deltaX = 0;
                deltaY = 1;
                break
            case "east":
                endX = startX + shipLength;
                endY = startY;
                deltaX = 1;
                deltaY = 0;
                break
            case "west":
                endX = startX - shipLength;
                endY = startY;
                deltaX = -1;
                deltaY = 0;                 
                break
       }

       // given the desired start point and direction, will the ship fit on the board without
       // going over the edges
       if ( (endX > this.mySea.width) || (endX < 0) || 
            (endY > this.mySea.height) || (endY < 0) ){
            boatFits = false
        }

        // know that the boat will fit on the map, next check if the ship will collide
        if (boatFits){
            let spotToTestX = startX;
            let spotToTestY = startY;
            for (let points = 0; points < shipLength; points++){
                if (this.mySea.mapOfSea[spotToTestY][spotToTestX].type = "ship" ){
                    boatFits = false;
                    break;
                }
            }
        }

        // know that the boat will fit as tested every spot... so iterate back over and
        // mark the spot as being part of the ship
        if (boatFits){
            let spotToTestX = startX;
            let spotToTestY = startY;
            for (let location = 0; location < shipLength; location++){
                this.mySea.mapOfSea[spotToTestY][spotToTestX].sectionId = location;
                this.mySea.mapOfSea[spotToTestY][spotToTestX].shipId = boatToFit.Id;
                this.mySea.mapOfSea[spotToTestY][spotToTestX].type = "ship";
            }
        }

        return boatFits
    }

    // function to allow a player to fire at the opponent and try to find a ship
    // player species target point
    // returns true if an enemy ship hit, false if no ship hit
    // map of enemy get set to "sea" if miss, "ship" if hit
    playerShoot( targetPoint : Point){
        seaX = targetPoint.x;
        seaY = targetPoint.y;

    }
 
    
}

export { Player }
