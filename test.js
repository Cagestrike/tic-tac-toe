const ARR = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let arr1 = [2, 0, 4, 6];

arr1 = arr1.sort((a, b) => a - b);

let strArr1 = JSON.stringify(arr1);
let strARR = JSON.stringify(ARR[7]);

strArr1 = strArr1.slice(1, strArr1.length - 1);
strARR = strARR.slice(1, strARR.length - 1);

// console.log(strArr1);
// console.log(strARR);

// console.log(strArr1.includes(strARR));


