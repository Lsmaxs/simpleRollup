import { Person } from "../interface/Delay";
const delay = (maka: Person) => {
    return new Promise((resolve, reject) => setTimeout(() => {
        console.log(maka.num, maka.arr);
        resolve();
    }, maka.interval));
};
export default delay;
