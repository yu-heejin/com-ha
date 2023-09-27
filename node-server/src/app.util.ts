import { numberKeyword, stringKeyword } from "./keyword";

/**
 * 변수 값 검증
 * @param value 
 * @returns string | number
 */
export const validateValues = (value: string) => {
    if (value.includes(stringKeyword['stringStart'])) {
        const startIndex = value.indexOf(stringKeyword['stringStart']) + 7;
        const endIndex = value.indexOf(stringKeyword['stringEnd']);
        return value.substring(startIndex, endIndex);
    } 
    
    if (value.includes(numberKeyword['numberStart'])) {
        const comma = value.split(numberKeyword['numberStart'])[1];
        let numbers = 0;
        for (let x of comma) {
            if (x === ',') numbers++;
        }
        return numbers;
    }
    
    throw new Error('타입이 일치하지 않습니다.');
}