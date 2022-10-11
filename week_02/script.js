/* BLOCK COMMENT
This is a javascript example for 
week 2.
*/

//inline comment

let num = 100; //integer

function foo() {
    let num2 = 200;
    console.log(num2);
}; // semicolon is optional for functions

foo();

/* let anonFun = function() {
    console.log("hello");
}; */

let anonFun = () => console.log("hello");

anonFun();

let person = "Summer";

// (function people(peopleName) {
//     console.log("Hello" + peopleName)
// }) ();

// people(person);

let arr = ["foo", 123, ["zar", "bar"]];

console.log(arr[1]);

// set item in an array
arr[1] = "barbar";
console.log(arr[1]);

//add item to end of array
arr.push("car");

arr.splice(2,2)
console.log(arr);

//of gets the name/text of the thing
for (let item of arr) { 
    console.log(item);
};

//in gets the number of the thing (index)
for (let i in arr) { 
    console.log(i + " " + arr[i]);
}

// forEach() - loop through each item in an array and its index; combine in/of arr
arr.forEach((item, i)=> console.log(i + " " + item));


// OBJECTS

let obj1 = {
    name: "Jill",
    age: 85,
    job: "Cactus Hunter",
};

// access property/value
console.log(obj1.name);
    //or
console.log(obj1["name"]);

// set values
obj1.job = "Barista";

console.log(obj1.job);

// loop through objects
for (let key in obj1){
    let value = obj1[key];
    console.log(`${key}: ${value}`) //string literal notation
};

for (let i = 0; i < 10; i++) {
    console.log(i);
};

let x = 75;

if (x > 50) {
    console.log("Above average");
} else if (x > 5) {
    console.log("Below average");
} else {
    console.log("Really below average");
};

//ternary operator/ in line if else
let y = (x > 50) ? "Above Average" : "Below Average";


// TRAVERSE DOM

let example = document.getElementById("example");

example.innerHTML += "Hello world!";


