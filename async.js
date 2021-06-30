// We have two ways to write Asynchronous functions in JS

async function doSomething() {
	//Do something asynchronous
}

const doSomething2 = async () => {
	//Do something asynchronous
};

console.log(doSomething()); // prints Promise { undefined }
console.log(doSomething2()); // prints Promise { undefined }

// It doesn’t matter what you return. The returned value will always be a promise.
const getOne = async () => {
	return 1;
};

console.log(getOne()); // prints Promise { 1 }

// When you call a promise, you handle the next step in a then call
getOne().then(value => console.log(value)); // prints 1

/* 
	The await keyword lets you wait for the promise to resolve.
	Once the promise is resolved, it returns the parameter passed into the "then" call.
*/
const test = async () => {
	const one = await getOne();
	console.log(one);
};

test(); // prints 1

/* 
	Return await
	There’s no need to await before returning a promise. You can return the promise directly.
	(If you return await something, you resolve the original promise first.
	Then, you create a new promise from the resolved value. return await effectively does nothing. No need for the extra step).
*/

// Don't need to do this
const test2 = async () => {
	return await getOne();
};

test2().then(value => {
	console.log(value); // prints 1
});

// Do this instead
const test3 = async () => {
	return getOne();
};

test3().then(value => {
	console.log(value); // prints 1
});

/* 
	Note: If you don’t need await, you don’t need to use an async function.
	The example above can be rewritten as follows: 
*/
const test4 = () => {
	return getOne();
};

test4().then(value => console.log(value)); // prints 1
