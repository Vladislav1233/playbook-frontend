const uniquePlaygrounds = (arr) => {
    let result = [];

    nextInput:
        for (let i = 0; i < arr.length; i++) {
            let str = arr[i].id; // для каждого элемента
            for (let j = 0; j < result.length; j++) { // ищем, был ли он уже?
                if (result[j].id === str) continue nextInput; // если да, то следующий
            }
            result.push(arr[i]);
        }

    return result;
};

export default uniquePlaygrounds;