import React, {useEffect, useState} from 'react';


function ConferenceForm () {
    //handle location drop down manuel
    const [locations, setLocations] = useState([])


    //handle change event
    const [name, setName] = useState("")
    const [starts, setStarts] = useState("")
    const [ends, setEnds] = useState("")
    const [description, setDescription] = useState("")
    const [maxPresentations, setMaxPresentations] = useState("")
    const [maxAttendees, setMaxAttendees] = useState("")
    const [location, setLocation] = useState("")

    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }
    const handleStartsChange = (event) => {
        const value = event.target.value
        setStarts(value)
    }
    const handleEndsChange = (event) => {
        const value = event.target.value
        setEnds(value)
    }
    const handleDescriptionChange = (event) => {
        const value = event.target.value
        setDescription(value)
    }
    const handleMaxPresentationsChange = (event) => {
        const value = event.target.value
        setMaxPresentations(value)
    }
    const handleMaxAttendeesChange = (event) => {
        const value = event.target.value
        setMaxAttendees(value)
    }
    const handleLocationChange = (event) => {
        const value = event.target.value
        setLocation(value)
    }


// submit function
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}

        //rooms is coming from const [rooms, setRooms] = useState([])
        data.name = name
        data.description = description
        data.starts = starts
        data.ends = ends
        data.max_presentations = maxPresentations
        data.max_attendees = maxAttendees
        data.location = location

        console.log(data)

        //POST code from new-conference.js
        const locationUrl = 'http://localhost:8000/api/conferences/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(locationUrl, fetchConfig)

        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);

            setName('');
            setStarts('');
            setEnds('');
            setDescription('');
            setMaxPresentations('');
            setMaxAttendees('');
            setLocation('');

        }
    }




    //fetch data from states
    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleStartsChange} placeholder="starts" required type="date" name="starts" id="starts" className="form-control" />
                <label htmlFor="starts">starts</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleEndsChange} placeholder="ends" required type="date" name="ends" id="ends" className="form-control" />
                <label htmlFor="ends">ends</label>
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea onChange={handleDescriptionChange} required type="text" name="description" id="description" className="form-control"></textarea>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleMaxPresentationsChange} placeholder="Maximum presentations" required type="number" name="max_presentations" id="Maximum presentations" className="form-control" />
                <label htmlFor="Maximum presentations">Maximum presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleMaxAttendeesChange} placeholder="Maximum attendees" required type="number" name="max_attendees" id="Maximum attendees" className="form-control" />
                <label htmlFor="Maximum attendees">Maximum attendees</label>
              </div>
              <div className="mb-3">
                <select onChange={handleLocationChange} required id="location" name="location" className="form-select">
                  <option value="">Choose a location</option>
                {locations.map(location => {
                                return (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
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
    )
}

export default ConferenceForm
