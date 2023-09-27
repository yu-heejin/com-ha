import { validateValues } from "./app.util";
import { consoleKeyword, loopKeyword, variableKeyword } from "./keyword";

export const service = (text: string) => {
    const arr = text.split('\n');
    const constVariableList = [];
    const variableList = [];
    const result = [];

    for (const a of arr) {
        const token = a as string;
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
            let loopCount = 0;
            for (let x of token) {
                if (x === '~') loopCount++;
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