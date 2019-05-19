import React, {Component} from 'react';
import './App.css';
import axios from './axios-orders';
import Surveys from './Surveys/Surveys';

class App extends Component {
    state = {
        surveys: [],
        error: false
    };

    componentDidMount() {
        axios.get('/polls')
            .then(response => {
                this.setState({
                    surveys: response.data.body
                });
            })
            .catch(error => {
                this.setState({ error: true })
            });
    }

    render() {
        return (
            <div className="App">
                <Surveys surveys={this.state.surveys} />
            </div>
        );
    }
}

export default App;
