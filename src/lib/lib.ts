import { write } from "fs";

const mockData = (count: number) => {

    //生成當日人數
    const people = Array.from(Array(count).keys());

    return people;

};

//櫃檯
class Counter {

    private _enabled = false;
    private _list: { id: string, name: string, time: number, remark: string }[] = [];
    private _name = "張某";
    private _id = "S00000";

    constructor(id: string, name: string) {

        this._id = id;
        this._name = name;

    }

    //寫入log
    private _writeLog(id: string, name: string, time: number, remark: string) {

        this._list.push({
            id,
            name,
            time,
            remark
        });

    }

    //開始下一個服務
    exec() {
        const _this = this;
        return new Promise(function (resolve, reject) {
            let func = () => {
                resolve(true);
            };
            const r = Math.floor(Math.random() * 101);
            let time = Math.floor(Math.random() * 5) + 2000;

            //假設服務時間超過30分鐘的機率只有10%
            if (r > 90) {
                time = (time + Math.floor(Math.random() * 5) + 1) + 5000;
                func = () => {
                    _this._writeLog(_this._id, _this._name, time, "異常原因....");
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

    get list(){
        return this._list;
    }

    getlastNumber() {

        let result = 0;
        if (this._list.length > 0) {
            result = this._list[0];
            this._list = this._list.slice(1);
            console.log(this._list);
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


export { Counter, mockData, NumberDispenser, Queue };