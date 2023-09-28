import { numberKeyword, operatorKeyword, stringKeyword } from "./keyword";

/**
 * 변수 값 검증
 * @param value 
 * @returns string | number
 */
export const validateValues = (value: string) => {
    // 문자열인 경우
    if (value.includes(stringKeyword['stringStart'])) {
        const startIndex = value.indexOf(stringKeyword['stringStart']) + 7;
        const endIndex = value.indexOf(stringKeyword['stringEnd']);
        return value.substring(startIndex, endIndex);
    } 
    
    // 숫자인 경우
    if (value.includes(numberKeyword['numberStart'])) {
        const comma = value.split(numberKeyword['numberStart'])[1];
        return getCount(comma, ',');
    }
    
    throw new Error('타입이 일치하지 않습니다.');
}

/**
 * 문자 속 문자 개수 찾기
 * @param str(전체 문자열)
 * @param separator(카운트 하려는 문자(열))
 * @returns numbers(문자(열)의 개수)
 */
export const getCount = (str: string, separator: string) => {
    let numbers = 0;

    for (let s of str) {
        if (s === separator) {
            numbers++;
        }
    }

    return numbers;
}

/**
 * 연산자 및 더할 값 추출
 * @param str(코드)
 * @returns { 연산자, 더할 값 }
 */
export const getOperatorAndValue = (token: string) => {
    const str = token.split(operatorKeyword['operator']);
    return { operator: str[0].charAt(str[0].length - 1), value: str[1] };
}