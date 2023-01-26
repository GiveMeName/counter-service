import { useState } from "react";
import { types } from "../mock/mock";

function CounterUI(props: { memberData: { id: string, name: string }, counterNumber: number, queues: number[], start: Function, finish: Function }) {

  const { memberData, counterNumber, queues, start, finish } = props;
  const [count, setCount] = useState(0);
  const { id, name } = memberData;
  const [disabled, setDisabled] = useState(false);

  //開始下一個服務
  const exec = () => {

    return new Promise(function (resolve, reject) {

      const type = types[Math.floor(Math.random() * types.length)];

      let func = () => {
        finish("info", id, name, type, "", time);
        resolve(true);
      };
      const r = Math.floor(Math.random() * 101);
      let time = Math.floor(Math.random() * 5) * 1000 + 2000;

      //假設服務時間超過30分鐘的機率只有10%
      if (r > 90) {
        time = time + 6000;
        func = () => {
          finish("warn", id, name, type, "異常原因....", time);
          resolve(true);
        };
      }
      setTimeout(func, time);
    });

  }

  const handClick = () => {

    if (queues.length === 0) {

      return;

    }
    const lastNumber = queues[0];

    start();
    setCount(lastNumber);
    setDisabled(true);
    exec().then(() => {
      setDisabled(false);
    });
  }

  return (
    <div className='counter' key={counterNumber}>
      櫃台: {count} 號
      <button type='button' disabled={disabled} onClick={handClick}>{disabled === false ? "叫號" : "服務中"}</button>
    </div>
  );
}

export default CounterUI;