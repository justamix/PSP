function flatten(arr) {
    let flatArray = [];
    arr.forEach(item => {
        if (Array.isArray(item)) {
            flatArray = flatArray.concat(flatten(item));
        } else {
            flatArray.push(item);
        }
    });
    return flatArray;
}

let nestedArray = [1, 2, 3, [4, 5, 6, [10, 20, 30]]];
let flattenedArray = flatten(nestedArray);
console.log(flattenedArray); 
