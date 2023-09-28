import { getCount, getOperatorAndValue, validateValues } from "./app.util";
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
        if (token === '') continue;

        if (isNextLoop) {
            for (let j = 0; j < loopCount; j++) {
                if (token.includes(operatorKeyword['operator'])) {
                    const { operator, value } = getOperatorAndValue(token);
                    const number = validateValues(value);
                } else if (token.includes(consoleKeyword['print'])) {
                    const value = token.split('.')[1];
                    result.push(value);
                }
                i++;
                token = arr[i];
            }
            if (token === loopKeyword['loopEnd']) {
                isNextLoop = false;
            }
            continue;
        }

        // 변수인 경우
        if (token.includes(variableKeyword['variable'])) {
            const name = token.split('학생')[0];
            const value: string | number = validateValues(token.split('?')[1]);
            variableList.push([name, value]);
        }

        // 상수인 경우
        if (token.includes(variableKeyword['constVariable'])) {
            const name = token.split('학생')[0];
            const value: string | number = validateValues(token.split('??')[1]);
            constVariableList.push([name, value]);
        }

        // 반복문인지 확인하기
        // 반복문 안에 변수, 연산, 콘솔 확인
        if (token.includes(loopKeyword['loopStart'])) {
            loopCount = getCount(token, '~');
            isNextLoop = true;
        }

        // 연산문인지 확인
        // 변수가 있는지 확인
        if (token.includes(operatorKeyword['operator'])) {
            const { operator, value } = getOperatorAndValue(token);

            switch (operator) {
                case operatorKeyword['plus']:
                    break;
                case operatorKeyword['minus']:
                    break;
                case operatorKeyword['divide']:
                    break;
                case operatorKeyword['multiple']:
                    break;
                case operatorKeyword['remain']:
                    break;
                default:
                    throw new Error('올바른 연산자가 아닙니다.');
            }
        }

        // 콘솔문인지 확인하기
        // 변수, 문자열, 숫자인 경우 확인
        if (token.includes(consoleKeyword['print'])) {
            const value = token.split('.')[1];
            
            if (token.includes(stringKeyword['stringStart'])) {
                const startIndex = value.indexOf(stringKeyword['stringStart']) + 7;
                const endIndex = value.indexOf(stringKeyword['stringEnd']);
                result.push(value.substring(startIndex, endIndex));
            } else if (token.includes(numberKeyword['numberStart'])) {
                const comma = value.split(numberKeyword['numberStart'])[1];
                result.push(getCount(comma, ','));
            }
            
        }
    }

    return result;
}