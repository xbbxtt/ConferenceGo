import React, {useEffect, useState} from 'react';



function LocationForm () {
    //handle state drop down manuel
    const [states, setStates] = useState([])

    //handle change event
    const [name, setName] = useState("")
    const [rooms, setRooms] = useState("")
    const [cities, setCities] = useState("")
    const [state, setState] = useState("")

    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }
    const handleRoomeChange = (event) => {
        const value = event.target.value
        setRooms(value)
    }
    const handleCitiesChange = (event) => {
        const value = event.target.value
        setCities(value)
    }
    const handleStateChange = (event) => {
        const value = event.target.value
        setState(value)
    }

    // submit function
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}

        //rooms is coming from const [rooms, setRooms] = useState([])
        data.room_count = rooms
        data.name = name
        data.city = cities
        data.state =state

        console.log(data)

        //POST code from new-location.js
        const locationUrl = 'http://localhost:8000/api/locations/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(locationUrl, fetchConfig)

        if (response.ok) {
            const newLocation = await response.json();
            console.log(newLocation);

            setName('');
            setRooms('');
            setCities('');
            setState('');

        }
    }

    //fetch data from states
    const fetchData = async () => {
        const url = 'http://localhost:8000/api/states/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setStates(data.states)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new location</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={name} />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleRoomeChange} placeholder="Room count" required type="number" name="room_count" id="room_count" className="form-control" value={rooms} />
                            <label htmlFor="room_count">Room count</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleCitiesChange} placeholder="City" required type="text" name="city" id="city" className="form-control" value={cities} />
                            <label htmlFor="city">City</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleStateChange} required id="state" name="state" className="form-select" value={state}>
                            <option value="">Choose a state</option>
                            {states.map(state => {
                                return (
                                    <option key={state.abbreviation} value={state.abbreviation}>
                                        {state.name}
                                    </option>
                                )
                            })}
                            </select>
                        </div>
                    <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LocationForm;
