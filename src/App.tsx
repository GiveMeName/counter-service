import React, { useState } from 'react';
import './App.css';
import { mockData, NumberDispenser, Queue, Log } from './lib/lib';
import './css/counter.css';
import './css/queues.css';
import CounterUI from './component/Counter';
import QueuesUI from './component/Queues';
import LogUI from './component/Log';
import './css/layout.css';

const initCounter = (count: number, setQueues: React.Dispatch<React.SetStateAction<number[]>>, setShowMessage: React.Dispatch<React.SetStateAction<boolean>>) => {

  if (count > 5) {
    return "櫃檯數不足"
  }

  const list = [];

  for (let i = 0; i < count; i++) {

    list.push(CounterUI(i, queue, setQueues, setShowMessage, log));
  }

  return list;
};

//開始營業

//初始化紀錄
const log = new Log();

//初始化待機
const queue = new Queue();

//初始化號碼機
const numberDispenser = new NumberDispenser();

function App() {

  const [number, setNumber] = useState(1);
  const [queues, setQueues] = useState<number[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  //設定啟用櫃台
  const CounterList = initCounter(5, setQueues, setShowMessage);

  numberDispenser.setNumber(number);

  //結束

  return (
    <div className="App">
      <div className='left'>
        <div className='counter'>
          {number} 號<br />
          <button type='button' onClick={() => {
            if (queue.list.length > 19) {
              setShowMessage(true);
              return;
            }
            setShowMessage(false);
            const currNumber = numberDispenser.getNumber();
            setQueues([...queues, currNumber]);
            setNumber(number + 1);
            numberDispenser.getNumber();
            //待研究
            queue.push(currNumber);
          }}>取號碼牌</button>
        </div>
        佇列面板: {showMessage === true ? <span style={{ color: 'red' }}>抱歉，因現在排隊人數過多無法取號!</span> : <span style={{ color: 'green' }}>可取號</span>}
        <QueuesUI data={queues}></QueuesUI>
        <div className="counterGroup">
          {CounterList}
        </div>
      </div>
      <div className='right'>
        <LogUI data={log.list} />
      </div>
    </div>
  );
}



export default App;
