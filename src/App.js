import './App.css';
import {useEffect, useState} from "react"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

function App() {
    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:8484/activities")
            .then(response => response.json())
            .then(json => setActivities(json))
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (<div className="App">
            {loading ? (<div>Loading...</div>) : (<>
                    <h1>Activities</h1>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Activity</th>
                            <th scope="col">Type</th>
                            <th scope="col">Participants</th>
                            <th scope="col">Price</th>
                            <th scope="col">Link</th>
                            <th scope="col">Key</th>
                            <th scope="col">Accessibility</th>
                        </tr>
                        </thead>
                        <tbody>
                        {activities.map(activity => (<tr>
                                <th scope="row">{activity.activity}</th>
                                <td>{activity.type}</td>
                                <td>{activity.participants}</td>
                                <td>{activity.price}</td>
                                <td>{activity.link ? <a href={activity.link}>{activity.link}</a> : ''}</td>
                                <td>{activity.key}</td>
                                <td>{activity.accessibility}</td>
                            </tr>))}
                        </tbody>
                    </table>
                </>)}
        </div>);
}

export default App;
