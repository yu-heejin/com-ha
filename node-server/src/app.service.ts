import { countNumber, getCount, getOperatorAndValue, getValue, validateValues } from "./app.util";
import { consoleKeyword, loopKeyword, numberKeyword, operatorKeyword, stringKeyword, variableKeyword } from "./keyword";

export const service = (text: string) => {
    const arr: string[] = text.split('\n');
    const constVariableList = [];
    const variableList = [];
    const result: (string | number)[] = [];

    let isNextLoop = false;
    let loopCount = 0;

    for (let i = 0; i < arr.length; i++) {
        let token = arr[i];
        console.log(i, token, arr.length);
        if (token === '') continue;

        if (isNextLoop) {
            for (let j = 0; j < loopCount; j++) {
                if (token.includes(operatorKeyword['operator'])) {
                    const { operator, value } = getOperatorAndValue(token);
                } else if (token.includes(consoleKeyword['print'])) {
                    const value = token.split('.')[1];
                    result.push(value);
                }
                const nextToken = arr[i + 1];
                if (token !== nextToken && token !== loopKeyword['loopEnd']) {
                    i++;
                    token = arr[i];
                }
            }
            if (token === loopKeyword['loopEnd']) {
                isNextLoop = false;
                loopCount = 0;
            }
            continue;
        }

        // 변수인 경우
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
            const { operator, value } = getOperatorAndValue(token);
            const firstToken = token.split(operatorKeyword['operator'])[0];
            const secondToken = token.split(operatorKeyword['operator'])[1];
            let first, second;

            // get first
            if (firstToken.includes('학생?')) {
                const name = firstToken.split('학생?')[0];
                first = getValue(name, variableList);
            } else if (firstToken.includes(numberKeyword['numberStart'])){
                first = countNumber(firstToken);
            }

            // get second
            if (secondToken.includes('학생?')) {
                const name = secondToken.split('학생?')[0];
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

                if (token.includes(consoleKeyword['print'])) {
                    result.push(first);
                }
            } else {
                throw new Error('값에 문제가 있거나 해당하는 변수를 찾을 수 없습니다.');
            }
        } else if (token.includes(consoleKeyword['print'])) {
            const value = validateValues(token.split('.')[1]);
            result.push(value);
        } else {
            throw new Error('올바른 문법이 아닙니다.');
        }
    }

    return result;
}