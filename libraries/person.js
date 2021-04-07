import {Resource, ResourcesStored} from './resources.js';

class Person 
{
  gender;
  height;
  haircolor;
  religion;
  mother;
  father;
  siblings;
  children;
  actionqueue;
  inventory;
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
    let haircolorNum = Math.round(Math.random());
    if (genderNum===0) this.haircolor = father.haircolor;
    else this.haircolor = mother.haircolor;

    //religion
    this.religion = mother.religion;

    //parents
    this.mother = mother;
    this.father = father;

    //siblings
    this.siblings = mother.children; //NOT DESIGNED FOR DIVORCE, BASTARD CHILDREN OR UNFAITHFULNESS

    //children
    this.children = []; //people usually don't have children at birth

    //actionqueue
    this.actionqueue = [];

    //inventory
    this.inventory = [];

    //coordinates
    this.coordinates = mother.coordinates; //people usually get born with their mother
  }
  draw()
  {
    
  }
}

class personAction
{
  
}