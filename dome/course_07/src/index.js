
import Dome from './lib/dome.js'

import './scss/index.scss';

const Array1 = Array(10).fill(6);

const Array2 = ['a','b','v','d']

const newArray = [...Array1,...Array2];

async function initDemo () {
    let data = await Dome();
    console.log(data);
}

console.log("info:",newArray);

initDemo();