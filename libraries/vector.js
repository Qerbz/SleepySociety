export class Vector
{

	x;
	y;

	constructor ( x, y )
	{
		this.x = x;
		this.y = y;
	}

	toString ()
	{
		return "["+this.x+", "+this.y+"]";
	}

	get length ()
	{
		return Math.sqrt(this.x**2+this.y**2);
	}

	add ( vector )
	{
		if (vector instanceof Vector)
		{
			this.x += vector.x;
			this.y += vector.y;
		}
		else		return new Error(vector + " is not an instance of Vector");
	}

	subtract ( vector )
	{
		if (vector instanceof Vector)
		{
			this.x -= vector.x;
			this.y -= vector.y;
		}
		else		return new Error(vector + " is not an instance of Vector");
	}

	scale ( t )
	{
		if (typeof t == "number")
		{
			this.x *= t;
			this.y *= t;
		}

		else		return new Error(t + " is not a Number")
		
	}

	static scalarproduct ( vectora, vectorb ) 
	{
		if (vectora instanceof Vector && vectorb instanceof Vector){
			return vectora.x*vectorb.x + vectora.y*vectorb.y;
		}
		else		return new Error(vector + " is not an istance of Vector")
	}

	normalize ()
	{
		this.scale(1/this.length);
	}

	get normalized ()
	{
		return this.scale(1/this.length);
	}
	
	static clone ( vector ) 
	{
		return new Vector(vector.x,vector.y);
	}

	angle ( vector )
	{

		return Math.acos(Vector.scalarproduct(this,vector)/(this.length * vector.length))

	}

	rotate ( angle )
	{
		let r = this.length;
		let zerov = new Vector(1,0);
		let theta = this.angle(zerov);
		let alpha = theta + angle;
		
		this.x = Vector.round(Math.cos(alpha)*r,10);
		this.y = Vector.round(Math.sin(alpha)*r,10);
	}

	static round (number, decimal)
	{
		let f = 10**decimal;
		return Math.round((number + Number.EPSILON) * f) / f;
	}
}


let v = new Vector(1,0);
let w = new Vector(1,7);
let p = new Vector ( 1, 2 );
let q = new Vector ( 3, 1 );