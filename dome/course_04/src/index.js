
import Dome from './lib/dome.js'

const Array1 = Array(10).fill(6);

const Array2 = ['a','b','v','d']

const newArray = [...Array1,...Array2];

async function initDemo () {
    let data = await Dome();
    console.log(data);
}

initDemo();