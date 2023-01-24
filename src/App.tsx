import React, { useState } from 'react';
import './App.css';
import { mockData, NumberDispenser, Queue } from './lib/lib';
import './css/counter.css';
import './css/queues.css';
import CounterUI from './component/Counter';
import QueuesUI from './component/Queues';

const initCounter = (count: number, setQueues: React.Dispatch<React.SetStateAction<number[]>>) => {

  if (count > 5) {
    return "櫃檯數不足"
  }

  const list = [];

  for (let i = 0; i < count; i++) {

    list.push(CounterUI(i, queue, setQueues));
  }

  return list;
};

//開始營業

//初始化待機面板
const queue = new Queue();

//初始化號碼機
const numberDispenser = new NumberDispenser();

/*
//模擬資料
const people = mockData(100);

let time = Math.floor(Math.random() * 5) + 1;
*/

function App() {

  const [number, setNumber] = useState(1);
  const [queues, setQueues] = useState<number[]>([]);

  //設定啟用櫃台
  const CounterList = initCounter(5, setQueues);

  numberDispenser.setNumber(number);

  //結束

  return (
    <div className="App">
      <div className='counter'>
        {number} 號<br />
        <button type='button' onClick={() => {
          if (queue.list.length > 19) {
            alert("抱歉，因現在排隊人數過多無法取號!")
            return;
          }
          const currNumber = numberDispenser.getNumber();
          queue.push(currNumber);
          setQueues([...queues, currNumber]);
          setNumber(number + 1);
          numberDispenser.getNumber();
        }}>取號碼牌</button>
      </div>
      佇列面板
      <QueuesUI data={queues}></QueuesUI>
      <div className="counterGroup">
        {CounterList}
      </div>
    </div>
  );
}



export default App;
