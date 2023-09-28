import { getCount, validateValues } from "./app.util";
import { consoleKeyword, loopKeyword, operatorKeyword, variableKeyword } from "./keyword";

export const service = (text: string) => {
    const arr: string[] = text.split('\n');
    const constVariableList = [];
    const variableList = [];
    const result = [];

    for (const token of arr) {
        if (token === '') continue;

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
        if (token.includes(loopKeyword['loopStart'])) {
            const loopCount = getCount(token, '~');
            for (let i = 0; i < loopCount; i++) {

            }
        }

        // 연산문인지 확인
        if (token.includes(operatorKeyword['operator'])) {
            const op = token.charAt(0);
            switch (op) {
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
        if (token.includes(consoleKeyword['print'])) {
            const value = token.split('.')[1];
            result.push(value);
        }
    }

    return result;
}