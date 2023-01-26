import { useState } from "react";

const member = [{
  id: "S01023",
  name: "王大明"
}, {
  id: "S01024",
  name: "梅東"
}, {
  id: "S01025",
  name: "比爾伯斯"
}, {
  id: "S01026",
  name: "李奧"
}, {
  id: "S01027",
  name: "麥蘇"
}, {
  id: "S01028",
  name: "張林"
}];

const types = ["定存/活存", "信用卡", "基金", "保險", "彩券兌獎", "外幣交易"];

function CounterUI(props: { counterNumber: number, queues: number[], start: Function, finish: Function }) {

  const { counterNumber, queues, start, finish } = props;
  const [count, setCount] = useState(0);
  const { id, name } = member[counterNumber];
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