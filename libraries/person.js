import {Resource, ResourcesStored} from './resources.js';

class Person 
{
  gender;
  height;
  haircolor;
  religion;
  parents;
  siblings;
  actionqueue;
  resources;
  coordinates;

  constructor(father,mother)
  {
    //gender
    let genderNum = Math.round(Math.random());
    if (genderNum === 0) this.gender = 'f';
    else this.gender = 'm';


    //height
    this.height = ((parents[0].height+parents[1].height) + Math.random()*13)/2;
    if (gender === 'f') this.height -= 7;
    else this.height += 7

    //haircolor
    this.haircolor = 
  }
}

class personAction
{
  
}