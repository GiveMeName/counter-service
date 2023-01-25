import { useState } from "react";

function NumberDispenserUI(props: { finish: Function, disabled: boolean }) {
    const [number, setNumber] = useState(1);
    const { disabled, finish } = props;

    const handleClick = () => {
        setNumber(number + 1);
        finish(number);
    }

    return (
        <div className='counter'>
            {number} 號<br />
            <button type='button' disabled={disabled} onClick={handleClick}>取號碼牌</button>
        </div>
    );
}

export default NumberDispenserUI;