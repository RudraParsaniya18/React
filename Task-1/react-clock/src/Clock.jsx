import { Component } from "react";

class Clock extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTime: new Date()
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
        this.setState({ currentTime: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <h1>My Digital Clock</h1>

        <h2>{this.state.currentTime.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

export default Clock;