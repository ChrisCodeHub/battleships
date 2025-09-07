
// for now ship only lies on vertical or horizontal, no diagionals
type Direction = "north" | "south" | "east" | "west";


interface Point {
    x : number;
    y : number;
}

interface Sea{
    nameOfSea : string;
    width: number;
    height:number;
    mapOfSea : number[][]
}

interface boat{
    startPoint : Point;
    length : number;
    orientation : Direction;
}

class Player {

    name : string;
    point : Point = {x:1, y:3};
    opponentSea : Sea = {nameOfSea : "Hope", width : 10, height : 10, mapOfSea : []}
    constructor(name : string){
        this.point.x = 2;
        this.name = name
        for (let y = 0; y < this.opponentSea.height; y++){
            this.opponentSea.mapOfSea[y] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]            
        }
    }



    shout(what : string) : void {
        console.log(`${what}`);
    }

    // test if th ship will fit into the board
    // given start, length and direction it lies in
    doesShipFit( boaToFit : boat) : boolean {
        
        let startX : number = boaToFit.startPoint.x;
        let startY : number = boaToFit.startPoint.y;
        let shipLine : Direction = boaToFit.orientation;
        let shipLength : number = boaToFit.length;
        let endX : number = 0;
        let endY : number = 0;
        let boatFits :boolean = true;   // assume all good until proven otherwise
        
        switch(shipLine){
            case "north":
                endX = startX;
                endY = startY - shipLength;
                break
            case "south":
                endX = startX;
                endY = startY + shipLength;
                break
            case "east":
                endX = startX + shipLength;
                endY = startY;
                break
            case "west":
                endX = startX - shipLength;
                endY = startY;                 
                break
       }
       if ( (endX > this.opponentSea.width) || (endX < 0) || 
            (endY > this.opponentSea.height) || (endY < 0) ){
            boatFits = false
        }

        return boatFits
    }
    
}

export { Player }
