'use strict';

let assert = require('assert');

let jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};
// class crewMember
class CrewMember {
  constructor(name, job, specialSkill) {
    this.name = name;
    this.job = job;
    this.specialSkill = specialSkill;
    this.ship = null;
  }


  enterShip=(ship)=>{
    if (ship.type == jobTypes[this.job] || this.job == 'programmer') {
      this.ship = ship.name;
      ship.crew.push(this.job);
    }
  }
}

// ship class

class Ship {
  constructor(name, type, ability) {
    this.name = name;
    this.type = type;
    this.ability = ability;
    this.crew = [];
  }

  missionStatement = () => {
    if(this.crew.includes('pilot')){
      console.log("Ascend into low orbit")
    } else if (this.crew.includes('commander')) {
      console.log("Interplanetary Space Travel")
    } else if (this.crew.includes('mechanic')) {
      console.log('Fixing the ship')
    } else {
    console.log("Can't perform a mission yet");
    }
  }
}

const crewMember1 = new CrewMember('Jasmine', 'pilot', 'eating jellybeans');
const mav = new Ship ('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');

const hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
const crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');

crewMember1.enterShip(mav);
ship1.missionStatement();
console.log(mav);
console.log(crewMember1);

crewMember2.enterShip(hermes);
console.log(hermes);
console.log(crewMember2);

//tests
if (typeof describe === 'function'){
  describe('CrewMember', function(){
    it('should have a name, a job, a specialSkill and ship upon instantiation', function(){
      var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.specialSkill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    it('can enter a ship', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });
  });

  describe('Ship', function(){
    it('should have a name, a type, an ability and an empty crew upon instantiation', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      assert.equal(mav.name, 'Mars Ascent Vehicle');
      assert.equal(mav.type, 'MAV');
      assert.equal(mav.ability, 'Ascend into low orbit');
      assert.equal(mav.crew.length, 0);
    });

    it('can return a mission statement correctly', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      let crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");

      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
    });
  });
}
