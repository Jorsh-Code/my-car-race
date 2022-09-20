import { Pilot } from "./pilot.model";

export interface Car {
    numCar : number,
    color : string,
    pilot? : Pilot,
    km : number,
    status : string,
    startUp() : void,
    updateDistance(totalKmRace : number) : void,
    stop() : void
}