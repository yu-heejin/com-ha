import { changeValue, countNumber, getCount, getOperator, getValue, validateValues } from "./app.util";
import { consoleKeyword, loopKeyword, numberKeyword, operatorKeyword, stringKeyword, variableKeyword } from "./keyword";

export const service = (text: string) => {
    const arr: string[] = text.split('\n');
    const constVariableList = [];
    const variableList: (string | number)[][] = [];
    const result: (string | number)[] = [];

    let isNextLoop = false;
    let loopCount = 0;

    for (let i = 0; i < arr.length; i++) {
        let token = arr[i];
        if (token === '') continue;

        if (isNextLoop) {
            for (let j = 0; j < loopCount; j++) {
                if (token.includes(operatorKeyword['operator'])) {
                    const opResult = getOperatorResult(token, variableList);
                    if (token.includes(consoleKeyword['print'])) {
                        result.push(opResult);
                    }
                } else if (token.includes(consoleKeyword['print'])) {
                    const value = token.split('.')[1];
                    result.push(value);
                }
            }
            if (token === loopKeyword['loopEnd']) {
                isNextLoop = false;
                loopCount = 0;
            }
            continue;
        }

        if (token.includes(variableKeyword['variable'])) {
            const name = token.split('학생')[0];
            const value: string | number = validateValues(token.split('?')[1]);
            variableList.push([name, value]);
        } else if (token.includes(variableKeyword['constVariable'])) {
            const name = token.split('학생')[0];
            const value: string | number = validateValues(token.split('??')[1]);
            constVariableList.push([name, value]);
        } else if (token.includes(loopKeyword['loopStart'])) {
            loopCount = getCount(token, '~');
            isNextLoop = true;
        } else if (token.includes(operatorKeyword['operator'])) {
            const opResult = getOperatorResult(token, variableList);

            if (token.includes(consoleKeyword['print'])) {
                result.push(opResult);
            }
        } else if (token.includes(consoleKeyword['print'])) {
            const value = token.split('.')[1];
            if (value.includes('학생')) {
                const name = value.split('학생')[0];
                result.push(getValue(name, variableList));
            } else if (value.includes(numberKeyword['numberStart'])){
                result.push(countNumber(value));
            }
        }
    }

    return result;
}

const getOperatorResult = (token: string, variableList: (string | number)[][]) => {
    const operator = getOperator(token);
    const firstToken = token.split(operatorKeyword['operator'])[0];
    const secondToken = token.split(operatorKeyword['operator'])[1];
    let first, second;
    let firstName;

    // get first
    if (firstToken.includes('학생?')) {
        const name = firstToken.split('학생?')[0];
        first = getValue(name, variableList);
        firstName = name;
    } else if (firstToken.includes(numberKeyword['numberStart'])){
        first = countNumber(firstToken);
    }

    // get second
    if (secondToken.includes('학생')) {
        const name = secondToken.split('학생')[0];
        second = getValue(name, variableList);
    } else if (token.includes(numberKeyword['numberStart'])){
        second = countNumber(secondToken);
    }

    if (first && second) {
        switch (operator) {
            case operatorKeyword['plus']:
                first += second;
                break;
            case operatorKeyword['minus']:
                first -= second;
                break;
            case operatorKeyword['divide']:
                first /= second;
                break;
            case operatorKeyword['multiple']:
                first *= second;
                break;
            case operatorKeyword['remain']:
                first %= second;
                break;
            default:
                throw new Error('올바른 연산자가 아닙니다.');
        }
    } else {
        throw new Error('값에 문제가 있거나 해당하는 변수를 찾을 수 없습니다.');
    }
    
    changeValue(firstName, variableList, first);
    return first;
}