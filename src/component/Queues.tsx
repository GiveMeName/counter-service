import '../css/queues.css';

function QueuesUI(props: { data: number[] }) {

    const list = [];

    for (const item of props.data) {
        list.push(<div key={item}>{item}&nbsp;</div>)
    }

    return (
        <div className="queuesGroup">
            {list}
        </div>
    );
}

export default QueuesUI;