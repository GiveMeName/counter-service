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
import { members } from './mock/mock';

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

    setLogList([{ id, name, state, type, remark, processTime, date }, ...tmpLogList]);

    tmpLogList.unshift({ id, name, state, type, remark, processTime, date });
  }

  //生成櫃台
  const generateCounterUIList = () => {

    const list = [];

    for (let i = 0; i < 5; i++) {

      const memberData = members[i];

      list.push(<CounterUI memberData={memberData} counterNumber={i} queues={queues} start={callNumberStart} finish={callNumberFinish}></CounterUI>);
    }

    return list;
  };

  const counterUIList = generateCounterUIList();

  //結束
  return (
    <div className="App">
      <div className='left'>
        <NumberDispenserUI disabled={queues.length > 19} finish={getNumberFinish}></NumberDispenserUI>
        <QueuesUI data={queues}></QueuesUI>
        <div className="counterGroup">
          {counterUIList}
        </div>
      </div>
      <div className='right'>
        <LogUI data={logList} />
      </div>
    </div >
  );
}

export default App;
