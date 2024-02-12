// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]



// find the sumVal of Luhn's Algorithm and return the sumVal
const findSumVal = intArr => {
    let decoyArr = [];
    decoyArr = decoyArr.concat(intArr);
    let i = decoyArr.length;
    
    while (i >= 0) {
        i -= 2;
        decoyArr[i] *= 2;
        if (decoyArr[i] > 9) {
            decoyArr[i] -= 9;
        }
    }

    let sumVal = decoyArr.reduce((x, y) => x + y);
    return sumVal;
}

// checks whether valid or invalid \\returns BOOLEAN//
const validateCred = toValidate=> {
    
    let sumVal = findSumVal(toValidate);
    if (sumVal % 10 == 0) {
        return true;
    } else {
        return false;
    }
}

// find invalid cards and \\returns a nested array of invalid cards//
const findInvalidCards = nestArr => {
    let invalidCards = [];
    for (let i=0; i<nestArr.length; i++) {
        if (!validateCred(nestArr[i])) {
            invalidCards.push(nestArr[i]);
        }
    }
    return invalidCards;
}

// find out which companies invalid cards issued from and \\return those companies//
const idInvalidCardCompanies = invCards => {
    let companies = [];
    for (let card of invCards) {
        switch(card[0]) {
            case 3:
                if (!companies.includes('Amex (American Express)')) {
                    companies.push('Amex (American Express)');
                } break;
            case 4:
                if (!companies.includes('Visa')) {
                    companies.push('Visa');
                } break;
            case 5:
                if (!companies.includes('Mastercard')) {
                    companies.push('Mastercard');
                } break;
            case 6:
                if (!companies.includes('Discover')) {
                    companies.push('Discover');
                } break;
            default:
                console.log('Company not found');
                break;
        }
    }
    return companies;
}

// convert the int strings into an array of integer and \\reutrn converted array of integers//
const strIntoIntArr = str => {
    let strArr = str.split('');
    let intArr = [];
    for (let str of strArr) {
        if (isNaN(parseInt(str))) {
            continue;
        } else {
            intArr.push(parseInt(str));
        }
    }
    return intArr;
}

// Convert invalid numbers into valid numbers and \\return valid nums//
const invNumIntoValid = invNums => {
    let valid = [];
    valid = valid.concat(invNums);
    let sumVal = findSumVal(valid);
    let mod10 = sumVal % 10;
    for (let i = valid.length-1; i > 0; i -= 2) {
        if (valid[i] - mod10 >= 0) {
            valid[i] -= mod10;
            break;
        }
        if (valid[i] + mod10 < 10) {
            valid[i] += mod10;
            break;
        }

        let randomNum = Math.ceil(mod10*Math.random());
        while ((valid[i] - randomNum) < 0 || (valid[i] + randomNum) > 9) {
            randomNum = Math.ceil(mod10*Math.random());
        }
        if (valid[i] > randomNum) {
            valid[i] -= randomNum;
            mod10 -= randomNum;
        }
        if (valid[i] < randomNum) {
            valid[i] += randomNum;
            mod10 -= randomNum;
        }
    }
    console.log(findSumVal(valid));
    return valid;
    
}


// CODE TESTS
/* 
console.log(validateCred(valid1));
console.log(validateCred(valid2));
console.log(validateCred(valid3));
console.log(validateCred(valid4));
console.log(validateCred(valid5));

console.log(validateCred(invalid1));
console.log(validateCred(invalid2));
console.log(validateCred(invalid3));
console.log(validateCred(invalid4));
console.log(validateCred(invalid5));

console.log(validateCred(mystery1));
console.log(validateCred(mystery2));
console.log(validateCred(mystery3));
console.log(validateCred(mystery4));
console.log(validateCred(mystery5));
/*
console.log(findInvalidCards(batch));
console.log(batch);

idInvalidCardCompanies(findInvalidCards([invalid1, invalid3, invalid5]));

console.log(strIntoIntArr('357628 443 52'));

console.log(invNumIntoValid(invalid1));
console.log(invNumIntoValid(invalid2));
console.log(invNumIntoValid(invalid3));
console.log(invNumIntoValid(invalid4));
console.log(invNumIntoValid(invalid5));
*/