import { useState } from "react";
import { Counter, Log, Queue } from '../lib/lib';

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

function CounterUI(counterNumber: number, queue: Queue, setQueues: React.Dispatch<React.SetStateAction<number[]>>, setShowMessage: React.Dispatch<React.SetStateAction<boolean>>, log: Log) {

  const [count, setCount] = useState(0);
  const { id, name } = member[counterNumber];
  const counter = new Counter(id, name, log);

  const [disabled, setDisabled] = useState(false);

  const handClick = () => {

    const lastNumber = queue.getlastNumber();

    if (lastNumber === 0) {

      return;

    }
    setQueues(queue.list);
    setShowMessage(false);
    setCount(lastNumber);
    setDisabled(true);
    counter.exec().then(() => {
      setDisabled(false);
    });
  }

  return (
    <div className='counter' key={counterNumber}>
      櫃台: {count} 號
      <button type='button' disabled={disabled} onClick={() => { handClick() }}>{disabled === false ? "叫號" : "服務中"}</button>

    </div>
  );
}

export default CounterUI;