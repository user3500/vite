import React, { Component } from 'react';
import Navigation from './components/Navigation';
import ImageLinkForm from './components/ImageLinkForm';
import './App.css';
import 'tachyons';

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
        }
    }
    onInputChange = (event) => {
        console.log(event.target.value)
    }

    onSubmit = (imgURL) => {
        const raw = JSON.stringify({
            "user_app_id": {"user_id": "clarifai", "app_id": "main"},
            "inputs": [{
                "data": {
                    "image": {
                        "url": {imgURL}}
                    }
                }]
        });
        
        const requestOptions = {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Authorization': 'Key ' + '331ead96098c4ff887f4e149ef0b4606'},
            body: raw
        };

        fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    render() {
        return (
            <div className="App">
            <Navigation/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default App;
