import React, { useEffect, useMemo, useCallback, useState } from "react";
import OddEvenResult from './OddEvenResult';
import Box from './Box';

const hardCalculate = (number) => {
    console.log("어려운 계산");
    for (let i = 0; i < 999999999; i++) {}
    return number + 10000;
}

const easyCalculate = (number) => {
    console.log("쉬운 계산");
    return number + 1;
}

const Counter = ({ initialValue }) => {
    const [count, setCount] = useState(initialValue);
    const [hardNumber, setHardNumber] = useState(1);
    const [easyNumber, setEasyNumber] = useState(1);
    const [isKorea, setIsKorea] = useState(true);
    const [toggle, setToggle] = useState(true);
    const [size, setSizes] = useState(100);

    const createBoxStyle = useCallback(() => {    
        return {
            backgroundColor: 'pink',
            width: `${size}px`,
            height: `${size}px`
        }
    }, [size])
    
    // Primitive Type
    // const location = isKorea ? '한국' : '외국';
    
    // Object Type
    // 아무리 객체가 눈으로 보기에는 같은 값을 담고 있어 보여도 함수가 다시 랜더링되면 메모리 값이 바뀐 다른 오브젝트가 할당이 된다
    // location 변수 안에는 들어있는 주소 값이 바뀐다 (location이 참조하고 있는 주소가 바뀌므로)
    // const location = {
    //     country: isKorea ? '한국' : '외국'
    // }
    const location = useMemo(() => {
        return {
            country: isKorea ? '한국' : '외국'
        };
    }, [isKorea]);

    // 똑같이 생신 Object처럼 보여도 location이 담고 있는 주소값은 함수가 호출될때마다 변하기 때문에 
    // 함수가 랜더링되면 useEffect가 작동한다
    useEffect(() => {
        console.log("useEffect 호출")
        // 뭔가 오래걸리는 작업..
    }, [location])

    // hardNumber의 값이 변하지 않으면 메모리에 저장되어 있는 hardSum의 값을 재활용해서 다시 사용한다
    // haedNumber의 값이 바뀌지 않으면 hardNumber를 sum하는 작업도 하지 않을거다
    const hardSum = useMemo(() => {
       return hardCalculate(hardNumber) 
    }, [hardNumber]);

    // 이렇게 useMemo가 안되어 있으면 함수의 컴포넌트가 재랜더링이 될때마다
    // easyNumber의 값이 바뀌건 안바뀌건 sum하는 작업을 실행한다.. 상태가 변할때마다 "쉬운 계산" 출력
    const easySum = easyCalculate(easyNumber);

    const onIncrease = () => {
        setCount(count + 1)
    }
    const onDecrease = () => {
        setCount(count - 1)
    }

    // const someFunction = () => {
    //     console.log(`someFunc: number: ${hardNumber}`)
    //     return;
    // };

    // [] => 함수를 Counter component가 최초 렌더링될때만 생성하고 이후에는 재사용.!
    // 메모이제이션했을때 당시 hardNumber의 기본값인 1이 담긴 함수를 재사용하기 때문에
    // hardNumber의 값을 바꾸고 someFunction을 다시 호출해도 찍히는건 1이다

    // [hardNumber] => hardNumber값이 바뀔때마다 함수가 갱신된다
    // -> someFunction안에는 새로운 함수의 주소가 들어있게된다
    const someFunction = useCallback( () => {
        console.log(`someFunc: number: ${hardNumber}`)
        return;
    },[hardNumber])

    useEffect(() => {
        console.log("someFunction이 변경되었습니다.");
    }, [someFunction]);

    return (
        <div>
            <h2>{count}</h2>
            <button onClick={onIncrease}>+</button>
            <button onClick={onDecrease}>-</button>
            <OddEvenResult count={count} />
            <h3>어려운 계산기</h3>
            <input 
                type="number"
                value={hardNumber}
                onChange={(e) => setHardNumber(parseInt(e.target.value))}
            />
            <span> + 10000 = {hardSum}</span>
            <button onClick={() => setToggle(!toggle)}>{toggle.toString()}</button>
            <br />
            <button onClick={someFunction}>Call someFunc</button>
            <h3>쉬운 계산기</h3>
            <input 
                type="number"
                value={easyNumber}
                onChange={(e) => setEasyNumber(parseInt(e.target.value))}
            />
            <span> + 1 = {easySum}</span>
            <hr />
            <h3>어느 나라에 있어요?</h3>
            <p>나라: {location.country}</p>
            <button onClick={() => setIsKorea(!isKorea)}>비행기 타자</button>
            <input 
                type="number"
                value={size}
                onChange={(e) => setSizes(e.target.value)}
            />
            <Box createBoxStyle={createBoxStyle}></Box>
        </div>
    );
};

Counter.defaultProps = {
    initialValue: 0
}

export default Counter;