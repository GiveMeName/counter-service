import { useState } from 'react';
import './App.css';
import { DateMaker } from './lib/lib';
import './css/counter.css';
import './css/queues.css';
import './css/layout.css';
import CounterUI from './component/Counter';
import QueuesUI from './component/Queues';
import LogUI from './component/Log';
import NumberDispenserUI from './component/NumberDispenser';
import { ILog } from './interface/interface';

const tmpLogList: ILog[] = [];

//開始營業
function App() {

  const [queues, setQueues] = useState<number[]>([]);
  const [logList, setLogList] = useState<ILog[]>([]);

  //取號完畢
  const getNumberFinish = (number: number) => {
    setQueues([...queues, number]);
  }

  //叫號
  const callNumberStart = () => {

    setQueues(queues.slice(1));

  }

  //叫號完畢
  const callNumberFinish = (state: "info" | "warn", id: string, name: string, type: string, remark: string, processTime: number) => {

    const dateMaker = new DateMaker();

    const date = dateMaker.now();

    setLogList([...tmpLogList, { id, name, state, type, remark, processTime, date }]);

    tmpLogList.push({ id, name, state, type, remark, processTime, date });
  }


  //結束
  return (
    <div className="App">
      <div className='left'>
        <NumberDispenserUI disabled={queues.length > 19} finish={getNumberFinish}></NumberDispenserUI>
        <QueuesUI data={queues}></QueuesUI>
        <div className="counterGroup">
          <CounterUI counterNumber={0} queues={queues} start={callNumberStart} finish={callNumberFinish}></CounterUI>
          <CounterUI counterNumber={1} queues={queues} start={callNumberStart} finish={callNumberFinish}></CounterUI>
          <CounterUI counterNumber={2} queues={queues} start={callNumberStart} finish={callNumberFinish}></CounterUI>
          <CounterUI counterNumber={3} queues={queues} start={callNumberStart} finish={callNumberFinish}></CounterUI>
          <CounterUI counterNumber={4} queues={queues} start={callNumberStart} finish={callNumberFinish}></CounterUI>
        </div>
      </div>
      <div className='right'>
        <LogUI data={logList} />
      </div>
    </div>
  );
}

export default App;
