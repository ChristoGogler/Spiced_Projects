module.exports = function fn(argument) {
    const reverseString = string =>  string.split("").reverse().join("");     
    if(typeof argument === "string"){
        return reverseString(argument);
    }else if (Array.isArray(argument)){
        let array = [];
        argument.forEach(element => {
                console.log("ELEMENT",element);
                return array.push(fn(element));
        });
        return array;
    }
    else{return null}  
};


// function fn(argument) {

// const reverseString = string =>  string.split("").reverse().join("");     
// if(typeof argument === "string"){
//         return reverseString(argument);
//     }else if (Array.isArray(argument)){
//         let array = [];
//         argument.forEach(element => {
//                 console.log("ELEMENT",element);
//                 return array.push(fn(element));
//         });
//         return array;
//     }
//     else{return null}    
//  }