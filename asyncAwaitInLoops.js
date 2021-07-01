/* 
    For this article, let’s say you want to get the number of fruits from a fruit basket.
*/

const fruitBasket = {
	apple: 27,
	grape: 0,
	pear: 14,
};

/* 
    You want to get the number of each fruit from the fruitBasket. 
    To get the number of a fruit, you can use a getNumFruit function.
*/

const getNumFruit = fruit => {
	return fruitBasket[fruit];
};

const numApples = getNumFruit("apple");
//console.log(numApples); // prints "27"

/* 
    Now, let’s say fruitBasket lives on a remote server. 
    Accessing it takes one second. We can mock this one-second delay with a timeout. 
*/
const sleep = ms => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

const getNumFruitDelayed = fruit => {
	return sleep(1000).then(() => fruitBasket[fruit]);
};

//getNumFruitDelayed("apple").then(value => console.log(value)); // print "27" after one second

/* 
    Finally, let’s say you want to use "await" and "getNumFruit" to get the number of each fruit in asynchronous function.
*/

const control = async () => {
	console.log("Start");

	const apple = await getNumFruitDelayed("apple");
	console.log(apple);
	const grape = await getNumFruitDelayed("grape");
	console.log(grape);
	const pears = await getNumFruitDelayed("pear");
	console.log(pears);

	console.log("End");
};

//control(); // prints all the values in 3 seconds, because needs to wait for each promise

/* 
    We could also use Promise.all() to improve it a bit, in case the promises can be called without strict order
*/

const control2 = async () => {
	console.log("Start");

	// we create an array with the promises
	const promises = [
		getNumFruitDelayed("apple"),
		getNumFruitDelayed("grape"),
		getNumFruitDelayed("pear"), //we force the Failure and everything else Fails
	];
	const result = await Promise.all(promises);
	console.log(result);
	const status = await Promise.allSettled(result);
	console.log(status);
	console.log("End");
};

control2(); // prints all the values in 1 seconds, because promises are treated simultaneously

// Await in a for loop
/* 
    Let’s say we have an array of fruits we want to get from the fruit basket.
    In the for-loop, we will use "getNumFruitDelayed" to get the number of each fruit. 
    We’ll also log the number into the console.

    Since "getNumFruitDelayed" returns a promise, we can await the resolved value before logging it.

    When you use await, you expect JavaScript to pause execution until the awaited promise gets resolved. 
    This means awaits in a for-loop should get executed in series.
*/

const fruitsToGet = ["apple", "grape", "pear"];

const forLoop = async () => {
	console.log("Start");
	for (let i = 0; i < fruitsToGet.length; i++) {
		// Get the number of each fruit
		const fruit = fruitsToGet[i];
		const numbFruit = await getNumFruitDelayed(fruit);
		console.log(numbFruit);
	}
	console.log("End");
};

//forLoop(); // Automatically loops each promise and get all the results after 3 seconds, 1 for each promise

/* 
    This behaviour works with most loops (like while and for-of loops)…
    But it won’t work with loops that require a callback. 
    Examples of such loops that require a fallback include forEach, map, filter, and reduce. 
    We’ll look at how await affects forEach, map, and filter in the next few sections
*/

const forOfLoop = async () => {
	console.log("Start");
	for (fruit of fruitsToGet) {
		// Get the number of each fruit
		const numbFruit = await getNumFruitDelayed(fruit);
		console.log(numbFruit);
	}
	console.log("End");
};

//forOfLoop(); // Automatically loops each promise and get all the results after 3 seconds, 1 for each promise

const whileLoop = async () => {
	console.log("Start");
	let fruitPointer = 0;
	while (fruitPointer < fruitsToGet.length) {
		const numbFruit = await getNumFruitDelayed(fruitsToGet[fruitPointer]);
		console.log(numbFruit);
		fruitPointer++;
	}

	console.log("End");
};

//whileLoop(); // Automatically loops each promise and get all the results after 3 seconds, 1 for each promise

// Await in a forEach loop
/* 
    We’ll do the same thing as we did in the for-loop example. First, let’s loop through the array of fruits.
    Next, we’ll try to get the number of fruits with getNumFruitDelayed. (Notice the async keyword in the callback function. 
    We need this async keyword because await is in the callback function).
    You might expect the console to look like this:

    'Start'
    '27'
    '0'
    '14'
    'End'

    But looks like this:
    'Start'
    'End'
    '27'
    '0'
    '14'

    JavaScript proceeds to call console.log('End') before the promises in the forEach loop gets resolved.
    JavaScript does this because forEach is not promise-aware. 
    It cannot support async and await. You cannot use await in forEach.

*/
const forEachLoop = async () => {
	console.log("Start");
	fruitsToGet.forEach(async fruit => {
		const numFruit = await getNumFruitDelayed(fruit);
		console.log(numFruit);
	});
	console.log("End");
};

//forEachLoop(); //Doesn't work as expected

//Await with map
/* 
    If you use await in a map, map will always return an array of promises. 
    This is because asynchronous functions always return promises.

    Since map always return promises (if you use await), you have to wait for the array of promises to get resolved.
    You can do this with await Promise.all(arrayOfPromises).
*/

const mapLoop = async () => {
	console.log("Start");
	const promises = fruitsToGet.map(async fruit => {
		const numFruit = await getNumFruitDelayed(fruit);
		return numFruit + 100; // you can manipulate the results here ex: +100
	});
	const resolvedNumFruits = await Promise.all(promises);
	console.log(resolvedNumFruits);
	console.log("End");
};

//mapLoop(); //This works as long as you use Promise.all due numFruits is an array of promises
