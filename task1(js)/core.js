//Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
function isInteger(n) {
    const n1 = n ^ 0;
    return n1 === n;
}

//Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() {
    let arr = [];
    for (let i = 2; i <= 20; i++) {
        if (i % 2 === 0) {
            arr.push(i);
        }
    }
    return arr;
}

//Напишите функцию, считающую сумму чисел до заданного используя цикл
function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

//Напишите функцию, считающую сумму чисел до заданного используя рекурсию
function recSumTo(n) {
    if (n === 1) return 1;
    return n + recSumTo(n - 1);
}

//Напишите функцию, считающую факториал заданного числа
function factorial(n) {
    return n !== 1 ? n * factorial(n - 1) : 1;
}

//Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
function isBinary(n) {
    for (let i = 1; i <= n; i *= 2) {
        if (i === n) return true;
    }
    return false;
}

//Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) {
    let a = 1;
    let b = 1;
    for (let i = 3; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
    }
    return b;
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
let storedValue = undefined;
let storedOperation = undefined;
function getOperationFn(initialValue, operatorFn) {
    if (storedOperation === undefined || storedOperation !== operatorFn) {
        storedOperation = operatorFn;
        storedValue = initialValue;
    }
    if (storedValue !== undefined) {
        initialValue = storedValue;
    } else {
        storedValue = initialValue;
    }

    if (operatorFn == null) {
        return function (n) {
            return initialValue;
        };
    }
    return function (n) {
        storedValue = operatorFn(n, storedValue);
        return storedValue;
    };
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start, step) {
    let generatedValue = 0;
    if (step == null) {
        step = 1;
    }
    if (start == null) {
        start = 0;
    }
    generatedValue = start - step;

    return function () {
        return (generatedValue += step);
    };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp итп) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */

function deepEqual(firstObject, secondObject) {
    function isObject(object) {
        return object != null && typeof object === 'object';
    }

    if (
        !isObject(firstObject) &&
        !isObject(secondObject) &&
        isNaN(firstObject) &&
        isNaN(secondObject)
    ) {
        return true;
    }

    if (firstObject == null && secondObject == null) {
        return false;
    }
    if (!isObject(firstObject) && isObject(secondObject)) {
        return false;
    }
    if (isObject(firstObject) && !isObject(secondObject)) {
        return false;
    }
    if (
        !isObject(firstObject) &&
        !isObject(secondObject) &&
        firstObject !== secondObject
    ) {
        return false;
    }

    const objKeys1 = Object.keys(firstObject);
    const objKeys2 = Object.keys(secondObject);

    if (objKeys1.length !== objKeys2.length) return false;

    for (var key of objKeys1) {
        const value1 = firstObject[key];
        const value2 = secondObject[key];

        const isObjects = isObject(value1) && isObject(value2);

        if (
            (isObjects && !deepEqual(value1, value2)) ||
            (!isObjects && value1 !== value2)
        ) {
            return false;
        }
    }
    return true;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
