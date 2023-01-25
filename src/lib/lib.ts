import { ILog } from "../interface/interface";

const mockData = (count: number) => {

    //生成當日人數
    const people = Array.from(Array(count).keys());

    return people;

};

//日期
class DateMaker {

    fillZero(number: number) {
        return number < 10 ? '0' + number : number;
    }

    now() {

        const date = new Date();
        const fillZero = this.fillZero;

        return `${date.getFullYear().toString()}/${fillZero(date.getMonth() + 1)}/${fillZero(date.getDate())} ${fillZero(date.getHours())}:${fillZero(date.getMinutes())}:${fillZero(date.getSeconds())}`;

    }


}

//櫃檯
class Counter {

    private _enabled = false;
    private _name = "張某";
    private _id = "S00000";
    private _log;
    private _types = ["定存/活存", "信用卡", "基金", "保險", "彩券兌獎", "外幣交易"];

    constructor(id: string, name: string, log: Log) {

        this._id = id;
        this._name = name;
        this._log = log;

    }

    //開始下一個服務
    exec() {
        const _this = this;
        return new Promise(function (resolve, reject) {

            const type = _this._types[Math.floor(Math.random() * _this._types.length)];

            let func = () => {
                _this._log.info(_this._id, _this._name, type, "", time);
                resolve(true);
            };
            const r = Math.floor(Math.random() * 101);
            let time = Math.floor(Math.random() * 5) + 2000;

            //假設服務時間超過30分鐘的機率只有10%
            if (r > 90) {
                time = (time + Math.floor(Math.random() * 5) + 1) + 5000;
                func = () => {
                    _this._log.warn(_this._id, _this._name, type, "異常原因....", time);
                    resolve(true);
                };
            }
            setTimeout(func, time);
        });

    }

    //啟用服務
    setEnabled() {

        this._enabled = true;

    }

    //關閉服務
    setDisabled() {

        this._enabled = false;

    }

}

//佇列
class Queue {

    private _list: number[] = [];

    push(number: number) {
        this._list.push(number);
    }

    get list() {
        return this._list;
    }

    getlastNumber() {

        let result = 0;
        if (this._list.length > 0) {
            result = this._list[0];
            this._list = this._list.slice(1);
        }

        return result;
    }
}

//取號機
class NumberDispenser {

    private _nextNumber = 0;

    constructor() {
    }

    //
    setNumber(number: number) {
        this._nextNumber = number;
    }

    //取號
    getNumber() {
        const result = this._nextNumber;
        this._nextNumber = this._nextNumber + 1;
        return result;

    }

}

//紀錄
class Log {

    private _list: ILog[] = [];

    private _write(id: string, name: string, state: string, type: string, remark: string, processTime: number) {

        const dateMaker = new DateMaker();

        const date = dateMaker.now();

        this._list.push({
            id,
            name,
            state,
            type,
            remark,
            processTime,
            date
        });

    }

    info(id: string, name: string, type: string, remark: string, processTime: number) {

        this._write(id, name, "info", type, remark, processTime);

    }

    warn(id: string, name: string, type: string, remark: string, processTime: number) {


        this._write(id, name, "warn", type, remark, processTime);

    }

    get list() {

        return this._list;
    }

}

export { Counter, mockData, NumberDispenser, Queue, Log };