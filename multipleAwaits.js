// Multiple awaits
/* 
    Await blocks JavaScript from executing the next line of code until a promise resolves.
    This may have the unintended consequence of slowing down code execution.

    To show this in action, we need to create a delay before resolving the promise. 
    We can create a delay with a sleep function.
*/

const sleep = ms => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

/* 
    ms is the number of milliseconds to wait before resolving.
    If you pass in 1000 into sleep, JavaScript will wait for one second before resolving the promise.
*/

// Using sleep
//console.log("Now");
//sleep(1000).then(() => console.log("After one second"));

/* 
    Let’s say getOne takes one second to resolve. To create this delay, we pass 1000 (one second) into sleep. 
    After one second has passed and the sleep promise resolves, we return the value 1.
*/

const getOne = () => {
	return sleep(1000).then(() => 1);
};

// If you await getOne(), you’ll see that it takes one second before getOne resolves.
const test = async () => {
	console.log("Now");

	const one = await getOne();
	console.log(one);
};

//test(); // Prints "Now" and after a second prints "1"

// Now let’s say you need to wait for three promises. Each promise has a one-second delay.
const getTwo = () => {
	return sleep(1000).then(() => 2);
};
const getThree = () => {
	return sleep(1000).then(() => 3);
};
const getFour = () => {
	return sleep(1000).then(() => 4);
};

/* 
    If you await these three promises in a row, you’ll have to wait for three seconds before all three promises get resolved. 
    This is not good because we forced JavaScript to wait two extra seconds before doing what we need to do.
*/
const testThreePromises = async () => {
	console.time("Time");
	const two = await getTwo();
	console.log(two);
	const three = await getThree();
	console.log(three);
	const four = await getFour();
	console.log(four);
	console.timeEnd("Time");
};

//testThreePromises(); // takes 3 seconds to finish because has to wait for each promise

/* 
    If getTwo , getThree and getFour can be fetched simultaneously, you’ll save two seconds. 
    You can fetch these three promises at the same time with Promise.all.
    
    There are three steps:

    1.- Create the three promises
    2.- Add all three promises into an array
    3.- await the array of promises with Promise.all
*/

const testThreePromisesAll = async () => {
	console.time("Time");
	const promises = [getTwo(), getThree(), getFour()];
	console.log("Now");
	const [two, three, four] = await Promise.all(promises);
	console.log(two, three, four);
	console.log("Done");
	console.timeEnd("Time");
};

testThreePromisesAll(); // takes 1 second to end because the promises are handled simultaneously
