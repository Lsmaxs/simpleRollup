import delay from "./lib/delay";

async function dll(n: number) {
  while (--n) {
    await delay({
      interval: 10,
      num: greeter(n),
    });
  }
}

function greeter(person: any) {
  return person * 2;
}

export default dll(100);
