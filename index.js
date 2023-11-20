// Let's use Live Server extension to make it easier. 

// using Object Literal Syntax, if we want to duplicate the object
// with no methods, it's not a big deal. 
// But if it has one or more methods (has behavior), it will be a 
// problem if the method has a bug - we have to replicate the fix

// Object Literal Syntax
const circle1 = {
    radius: 1,
    location: {
        x: 1,
        y: 1
    },
    draw: function() {
        console.log('draw OLS');
    }
};

circle1.draw();

// The solution it to use factory or constructor 

// Factory Function
function createCircle(radius) {
    return {
        radius,
        draw: function() {
            console.log('draw FF');
        }
    };
}

const circle2 = createCircle(1);
circle2.draw();

// Construction Function
function Circle(radius) {
    this.radius = radius;
    this.draw = function() {
        console.log('draw CF');
    }
}

const another = new Circle(1);
// another.draw();

// Every Object has a construction property
// and that refers to the function that was 
// used to create that object.
// circle2.constructor -> returns ƒ Object() { [native code] }
// another.constructor -> returns ƒ Circle(radius) {...

// creating new or literals
const a1 = new String(); // new
const a2 = "";          // literal

const b1 = new Boolean();
const b2 = true;

const c1 = new Number();
const c2 = 0;

// In JS Functions are Objects


// Declaring a Function internally
const Circle3 = new Function('radius',`
this.radius = radius;
this.draw = function() {
    console.log('draw FI');
}
`);

const circle3 = new Circle3(1);
console.log('circle3', circle3);

// Back to our function Circle(radius) (above)
// Circle.call({}, 1) // this will refer to the {}, and 1 is our parameter
// This expression 'Circle.call({}, 1)' 
// Is exactly like 'new Circle(1)'
// Because 'new' creates an empty object {} 
// and pass it as the 1st argument to the .call method
// If we forget the 'new' argument, the 'this' will point directly to 
// the Global object which is Window. 
// Similar to if we do this:  Circle.call(window, 1)

// apply
// Circle.apply({}, [1, 2, 3]);
// is the exactly same thing but the 2nd argument is an array
// so, it's useful if you already have an array as argument to pass


console.log('--- Primitive/Value types or Reference types');

// Primitives are copied by their value
// Objects are copied by their reference
let x = 10;
let y = x; 
// since it's primitive, y will receive a copy of x value
x = ++x;
console.log('x', x);
console.log('y', y);

let a = {value: 10};
let b = a; 
// since it's an object, b will reference to a address
// so, changing one, we change both
a.value = 20;
console.log('a', a);
console.log('b', b);

// when we store something in a variable (primitive)
// it is stored in the variable
// but when a variable is an object, 
// the content is stored in an address in memory
// and the variable receives (stores) this memory address

// Important:
let number = 10;

function increase(number) {
    number++;
}

increase(number);
console.log('number', number); // 10
// because inside the function, number 
// is a completely different variable
// which received a copy of the external 'number' variable
// by increasing it inside the function
// we do nothing with the external 'number' variable

let obj = {value: 10};

function increase(obj) {
    obj.value++;
}

increase(obj);
console.log('obj.value', obj); // 11
// the object was passed by reference 

// Primitives/Value Types: 
// Number, String, Boolean, Symbol, undefined, null
// References Types:
// Object, Function, Array

console.log('--- Adding and Removing properties');

// let's use our 
// function createCircle(radius) 
// const circle2 = createCircle(1);
// from below:
// these objects are dynamic, which means that after 
// creating them, we can add or remove properties

// Real Application: 
// an app which on client side generates an User object
// and send it to Server
// on Server side, we can add a property Token that we
// generate on the fly
// In C# or Java we can't do it. Every time we need something
// like this, we have to go back and change the class

// adding a new property to our circle2 is simple:
circle2.location = { x: 1 };
console.log('circle2 adding location property', circle2); 
// output -> {radius: 1, location: {…}, draw: ƒ}

// there is a bracket notation. 
// But the . notation simpler and less verbose
circle2['location2'] = { x: 1 }; // would be exactly the same
console.log('circle2 adding location2 property', circle2); 
// output ->  {radius: 1, location: {…}, location2: {…}, draw: ƒ}

// but could be useful if we have the property name somewhere in app
// and we heed to access it as an string
// if we deal with it dynamically, at the time of coding we would not know its name
const propertyName = 'location3';
circle2[propertyName] = { x: 1 };
// same for special characters or spaces which would not work
// on . notation e.g. 'center-location' or 'center location'
console.log('circle2 adding location3 property', circle2); 
// output ->  {radius: 1, location: {…}, location2: {…}, location3: {…}, draw: ƒ}

// Removing properties real case:
// we may use on Server side, properties such as password, credit card number
// that we don't want to send to client side. So we can remove them
delete circle2.location;
delete circle2.location2;
delete circle2['location3'];
console.log('circle2 removed location, location2 and location3', circle2); 
// output -> {radius: 1, draw: ƒ}


console.log('--- Enumerating properties');

for (let key in circle2) {
    // console.log('| circle2[key]:', circle2[key], ' | typeof circle2[key]:', typeof circle2[key], ' | key:', key);
    console.log('key:', key);
    console.log('circle2[key]:', circle2[key])
    console.log('typeof circle2[key]:', typeof circle2[key]);
}

const keys = Object.keys(circle2);
console.log('keys:', keys); 
// output ->  keys: (2) ['radius', 'draw']

// 'in' operator to check if an Object has a property
if ('radius' in circle2)
    console.log('circle2 has radius.'); 

console.log('--- Abstraction');

function CircleAb(radius) {
    this.radius = radius;

    // local variable & function, no access outside the function
    // the scope is limited to this function
    let defaultLocation = { x: 0, y: 0 };
    
    let computeOptimumLocation = function() {
        // ...
    }

    this.draw = function() {
        let x, y;
        // x, y, defaultLocation and computeOptimumLocation are accessible here
        // because they're part of the Closure of this draw function
        // but if we need to use member of the new object created, we need to use this e.g. this.radius
        computeOptimumLocation();
        console.log('draw Ab');
    }
}

const circleAb = new CircleAb(10);
// circleAb.draw and circleAb.radius are the properties available outside the function.

console.log('--- Getters & Setters');

function CircleGS(radius) {
    this.radius = radius;

    let defaultLocation = { x: 0, y: 0 };

    this.getDefaultLocation = function() {
        return defaultLocation;
    };

    this.draw = function() {
          computeOptimumLocation();
        console.log('draw Ab');
    }

    // let's define defaultLocation as a read only property get, and a set:
    Object.defineProperty(this, 'defaultLocation', {
        get: function() {
            return defaultLocation;
        },
        set: function(value) {
            // now let's validate the data - it's a benefit of a setter
            if (!value.x || !value.y)
                throw Error('Invalid location.');
            defaultLocation = value;
        }
    })
}

const circleGS = new CircleGS(10);
console.log('circleGS.defaultLocation', circleGS.defaultLocation); // output -> {x: 0, y: 0}
// circleGS.defaultLocation = 1; output -> Error: Invalid location.


console.log('--- Stopwatch()');

function Stopwatch() {
    let startTime, endTime, running, duration = 0;

    this.start = function() {
        if (running)
            throw Error('Stopwatch has already started.');

        running = true;
        startTime = new Date();
    };

    this.stop = function() {
        if (!running)
            throw Error('Stopwatch is not started.');

        running = false;
        endTime = new Date();
        // because it is in milliseconds we convert into seconds
        const seconds = (endTime.getTime() - startTime.getTime()) / 1000; 
        duration += seconds;
    };

    this.reset = function() {
        startTime = null;
        endTime = null;
        running = false;
        duration = 0;
    };

    Object.defineProperty(this, 'duration', {
        get: function() { 
            return duration; 
        }
    });
}

// test on console with:
// const sw = new Stopwatch()
// sw.start()
// sw.start()
// sw.stop()
// sw.duration
// sw.stop()
// sw.start()
// sw.stop()
// sw.reset()
// sw.start()
// sw.stop()
// sw.duration