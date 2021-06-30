// If a promise results in an error, you handle it with a catch call, like this:
const getOne = async (success = true) => {
	if (success) return 1;
	throw new Error("Failure");
};

// With no errors
getOne()
	.then(value => console.log(value)) // Prints 1
	.catch(err => console.log(err));

// With errors
getOne(false)
	.then(value => console.log(value))
	.catch(err => console.log(err)); // Prints error

// If you want to handle an error in an asynchronous function, you need to use a try/catch call.
const test = async () => {
	try {
		const one = await getOne(false);
	} catch (error) {
		console.log(error);
	}
};

test(); // 1 Failure error

// If you have multiple await keywords, error handling can become ugly…
const test2 = async () => {
	try {
		const one = await getOne(false);
	} catch (error) {
		console.log(error); // Failure
	}

	try {
		const two = await getOne(false);
	} catch (error) {
		console.log(error); // Failure
	}

	try {
		const three = await getOne(false);
	} catch (error) {
		console.log(error); // Failure
	}
};
test2(); // 3 Faiure errors

/* 
	There’s a better way.
	We know that asynchronous functions always return a promise.
	When we call a promise, we can handle errors in a catch call.
	This means we can handle any errors from our asynchronous function by adding .catch
	Note: The Promise catch method lets you catch one error only. 
*/
const test3 = async () => {
	const one = await getOne(false);
	const two = await getOne(false);
	const three = await getOne(false);
};

test3().catch(err => console.log(err)); // 1 Failure Error
