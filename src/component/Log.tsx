import { ILog } from "../interface/interface";
import '../css/log.css';

function LogUI(props: { data: ILog[] }) {

    const list = [];
    for (let i = 0; i < props.data.length; i++) {
        const { id, name, processTime, state, type, remark, date } = props.data[i];

        let color = "blue";
        if (state === "warn") {
            color = "orange";
        }

        list.push(
            <tr key={i}>
                <td >{id}</td>
                <td >{name}</td>
                <td style={{ color: color }}>{state}</td>
                <td >{type}</td>
                <td>{remark}</td>
                <td>{processTime}</td>
                <td>{date}</td>
            </tr>);
    }

    return (
        <div className="logScrollerDiv">
            <table className="logTable">
                <thead className="thead">
                    <tr>
                        <th colSpan={7}>服務紀錄表</th>
                    </tr>
                    <tr>
                        <th className="logTh"><span className="text">工號</span></th>
                        <th className="logTh"><span className="text">姓名</span></th>
                        <th className="logTh"><span className="text">狀態</span></th>
                        <th className="logTh"><span className="text">類別</span></th>
                        <th className="logTh"><span className="text">備註</span></th>
                        <th className="logTh"><span className="text">處理時間</span></th>
                        <th className="logTh"><span className="text">紀錄時間</span></th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        </div>
    );
}

export default LogUI;