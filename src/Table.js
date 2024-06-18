import { deleteData } from "./api"

function Table(props) {
    return (
        <table className="table m-3">
            <thead>
                <tr>
                    <th>UserId</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Body</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.products.map(
                        (data) =>
                        (<tr key={data.id}>
                            <td>{data.userId}</td>
                            <td>{data.id}</td>
                            <td>{data.title}</td>
                            <td>{data.body}</td>
                            <td>
                                <button className="btn btn-primary m-1">
                                    Edit
                                </button>
                                <button className="btn btn-danger m-1"
                                onClick={() => {
                                    props.delete(data.id)
                                }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>)
                    )
                }
            </tbody>
        </table>
    )
}

export default Table