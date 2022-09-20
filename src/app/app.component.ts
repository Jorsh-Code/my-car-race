import { RecursiveAstVisitor } from '@angular/compiler';
import { Component } from '@angular/core';
import { Car } from './models/car.model';
import { Pilot } from './models/pilot.model';
import { Race } from './models/race.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-car-race';

  constructor(){
    const PILOTS : Pilot[] = this.createPilots();
    let cars : Car[] = this.createCars(PILOTS);
    cars = cars.filter((value) => {return value.pilot?.name != undefined});
    let race : Race = this.createRace(cars);

    this.startRace(race);
    while(race.status !== 'Finished'){
       this.showPositions(race);
    }
    console.log('-------------------');
    console.log('winner:');
    const {numCar,pilot} = race.competitors[0];
    console.log(pilot?.name+' '+pilot?.lastName+'--'+pilot?.nationality+'--'+numCar);
  }

  startRace(race : Race) : Race {
    if(race.status === 'New'){
        race.competitors.forEach(competitor => {
            competitor.startUp();
        });
        race.status = 'In process';
    }
    return race;
  }  

  updateRace(race : Race) : Race {
      if(race.status === 'In process'){
        race.status = 'Finished';
        race.competitors.forEach(competitor => {
          competitor.updateDistance(race.laps*race.distance);
          if(competitor.km < (race.laps*race.distance)) race.status = 'In process';; 
        });
        
       
      }
      return race;
  }

  showPositions(race : Race) : Race {
    this.updateRace(race);
    console.log(race.status);
    race.competitors.sort(function(a,b){return b.km - a.km});
    let positions : any[] = [];
    race.competitors.forEach((value,index) => {
      let competitor : any = {
        position: index+1,
        nationality: value.pilot?.nationality,
        name: value.pilot?.name+' '+value.pilot?.lastName,
        numCar: value.numCar
      }; 
      positions.push(competitor);
    });
    console.table(positions);
    return race;
  }

  createCars(pilots : Pilot[]) : Car[] {
    const CARS :  Car[] = [
      {
        numCar: 20,
        color: 'red',
        pilot: pilots[0],
        km: 0,
        status: 'stopped',
        startUp(){
          this.status = 'running';
        },
        updateDistance(totalKmRace : number){
          if(this.km < totalKmRace){
            this.km += Math.floor(Math.random() * (50 - 1 + 1) + 1);
          }else{
            this.km += 50;
          }
        },
        stop(){
          this.status = 'stopped';
        }
      },
      {
        numCar: 33,
        color: 'green',
        pilot: pilots[1],
        km: 0,
        status: 'stopped',
        startUp(){
          this.status = 'running';
        },
        updateDistance(totalKmRace : number){
          if(this.km < totalKmRace){
            this.km += Math.floor(Math.random() * (50 - 1 + 1) + 1);
          }else{
            this.km += 50;
          }
        },
        stop(){
          this.status = 'stopped';
        }
      },
      {
        numCar: 16,
        color: 'black',
        pilot: pilots[2],
        km: 0,
        status: 'stopped',
        startUp(){
          this.status = 'running';
        },
        updateDistance(totalKmRace : number){
          if(this.km < totalKmRace){
            this.km += Math.floor(Math.random() * (50 - 1 + 1) + 1);
          }else{
            this.km += 50;
          }
        },
        stop(){
          this.status = 'stopped';
        }
      },
      {
        numCar: 95,
        color: 'blue',
        pilot: pilots[3],
        km: 0,
        status: 'stopped',
        startUp(){
          this.status = 'running';
        },
        updateDistance(totalKmRace : number){
          if(this.km < totalKmRace){
            this.km += Math.floor(Math.random() * (50 - 1 + 1) + 1);
          }else{
            this.km += 50;
          }
        },
        stop(){
          this.status = 'stopped';
        }
      },
      {
        numCar: 58,
        color: 'white',
        km: 0,
        status: 'stopped',
        startUp(){
          this.status = 'running';
        },
        updateDistance(totalKmRace : number){
          if(this.km < totalKmRace){
            this.km += Math.floor(Math.random() * (50 - 1 + 1) + 1);
          }else{
            this.km += 50;
          }
        },
        stop(){
          this.status = 'stopped';
        }
      }
    ]
    return CARS; 
  }

  createPilots() : Pilot[] {
    const PILOTS : Pilot[] = [
      {
        id: 1,
        name: 'Juan',
        lastName: 'Perez',
        nationality: 'Mexican'
      },
      {
        id: 2,
        name: 'Scot',
        lastName: 'Junior',
        nationality: 'American'
      },
      {
        id: 3,
        name: 'Manuel',
        lastName: 'Robles',
        nationality: 'Mexican'
      },
      {
        id: 4,
        name: 'Roberto',
        lastName: 'Mendoza',
        nationality: 'Brazilian'
      }
    ];
    return PILOTS;
  }

  createRace(cars : Car[]) : Race {
    const RACE : Race = {
      competitors: cars,
      laps: 3,
      distance: 100,
      status: 'New'
    }
    return RACE;
  }

  getRandomArbitrary() : number {
    return Math.floor(Math.random() * (50 - 1 + 1) + 1);
  }
  
}
