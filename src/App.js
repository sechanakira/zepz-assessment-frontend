import './App.css';
import {useEffect, useState} from "react"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import {FETCH_ALL_URL, SEARCH_URL} from "./constants";

function App() {
    const [activities, setActivities] = useState([])
    const [selectedType, setSelectedType] = useState('');
    const [loading, setLoading] = useState(false)

    const handleChange = event => {
        setSelectedType(event.target.value);
    }

    const handleClick = () => {
        let fetchUrl = FETCH_ALL_URL;
        if (selectedType) {
            fetchUrl = SEARCH_URL + selectedType;
        }
        setSelectedType(undefined)
        setLoading(true)
        fetch(fetchUrl)
            .then(response => response.json())
            .then(json => setActivities(json))
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        setLoading(true)
        fetch(FETCH_ALL_URL)
            .then(response => response.json())
            .then(json => setActivities(json))
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (<div className="App">
        {loading ? (<div>Loading...</div>) : (<div>
            <h1>Activities</h1>

            <div className="input-group mb-3 row">
                <div className="input-group-prepend col-sm-2">
                    <button onClick={handleClick} className="btn btn-outline-secondary" type="button">Search By Type</button>
                </div>
                <div className="col-sm-3">
                    <input onChange={handleChange} type="text" className="form-control" placeholder="Enter activity type" aria-label="" aria-describedby="basic-addon1"/>
                </div>
            </div>

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
        </div>)}
    </div>);
}

export default App;
