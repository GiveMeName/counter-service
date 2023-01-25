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
                <td>{id}</td>
                <td>{name}</td>
                <td style={{ color: color }}>{state}</td>
                <td>{type}</td>
                <td>{remark}</td>
                <td>{processTime}</td>
                <td>{date}</td>
            </tr>);
    }

    return (
        <table>
            <thead>
                <tr>
                    <th colSpan={7}>服務紀錄表</th>
                </tr>
                <tr>
                    <th>工號</th>
                    <th>姓名</th>
                    <th>狀態</th>
                    <th>類別</th>
                    <th>備註</th>
                    <th>處理時間</th>
                    <th>紀錄時間</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={7}>
                        <div style={{ overflowY: "scroll", height: "500px" }}>
                            <table>
                                {list}
                            </table>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default LogUI;