(function () {
	'use strict';

	const Array1 = Array(10).fill(6);

	const Array2 = ['a','b','v','d'];

	const newArray = [...Array1,...Array2];

	const ArrayFlat = newArray.flat();


	console.log(`Array1:${Array1}`);
	console.log(`newArray:${newArray}`);
	console.log(`ArrayFlat:${ArrayFlat}`);

}());
