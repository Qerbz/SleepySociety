import { origo } from '../constants/index.js';
import { Point2D } from './point2d.js';
import {Resource, ResourcesStored} from './resources.js';
import { Vector } from "./vector.js";

export class Person 
{
  //attributes
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
  destination;

  //Attributes
  strength;
  charisma;
  dexterity;
  wisdom;
  intelligence;
  constitution;

  //Skills
  trade;
  leadership;
  persuasion;
  engineer;
  medicine;
  inventoryManagement;
  tracking;

  //Needs
  thirst;
  temperature;
  prestige;
  social;
  health;
  energy;
  fun;
  happiness;

  //actions
  currentAction;
  futureActions;
  pastActions;


  constructor(father,mother)
  {
    //Attributes
    this.strength = 1;
    this.charisma = 1;
    this.dexterity = 1;
    this.wisdom = 1;
    this.intelligence = 1;
    this.constitution = 1;

    //gender
    let genderNum = Math.round(Math.random());
    if (genderNum === 0) this.gender = 'f';
    else this.gender = 'm';

    if (father == false){
      //height
      this.height = (320 + Math.random()*13)/2;
      if (this.gender === 'f') this.height -= 7;
      else this.height += 7
      

      this.haircolor = Math.round(Math.random()*10);

      this.religion = Math.round(Math.random()*10);

      this.mother = null;
      this.father = null;
      this.siblings = [];
      this.coordinates = new Vector(900, 400);
    }

    else{
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
      //coordinates
      this.coordinates = new Vector(mother.coordinates.x,mother.coordinates.y); //people usually get born with their mother
    }



    //children
    this.children = []; //people usually don't have children at birth

    //actionqueue
    this.actionqueue = [];

    //inventory
    this.inventory = [];
  }
  draw(ctx)
  {
    ctx.fillRect(this.coordinates.x-5 + origo.x,this.coordinates.y-5 + origo.y,10,10)
  }
  move()
  {

    // console.log(this.destination)
    if (Math.floor(this.coordinates.x) !== this.destination.x && Math.floor(this.coordinates.y) !== this.destination.y) {
      let clonedVector = Vector.clone(this.destination);
      clonedVector.subtract(this.coordinates);
      
      clonedVector.normalize();
      clonedVector.scale( (this.dexterity+5)/5 )
      this.coordinates.add( clonedVector );
    }
  }
  newDestination(v)
  {
    this.destination = Vector.clone(v);
  }
}

class personAction
{
  
}