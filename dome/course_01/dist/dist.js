(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}(function () { 'use strict';

	var Array1 = Array(10).fill(6);

	var Array2 = ['a','b','v','d'];

	var newArray = Array1.concat( Array2);

	var ArrayFlat = newArray.flat();

	console.log(("Array1:" + Array1));
	console.log(("newArray:" + newArray));
	console.log(("ArrayFlat:" + ArrayFlat));

}));
