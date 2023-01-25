import '../css/queues.css';

function QueuesUI(props: { data: number[] }) {

    const message = {
        color: "green",
        text: "可取號"
    };

    if (props.data.length > 19) {
        message.color = "red";
        message.text = "抱歉，因現在排隊人數過多無法取號!";
    }

    const list = [];
    for (const item of props.data) {
        list.push(<div key={item}>{item}&nbsp;</div>)
    }

    return (
        <div>
            佇列面板: <span style={{ color: message.color }}>{message.text}</span>
            <div className="queuesGroup">
                {list}
            </div>
        </div>
    );
}

export default QueuesUI;