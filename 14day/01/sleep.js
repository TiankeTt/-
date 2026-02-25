const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

await sleep(2000);

console.log(1111)