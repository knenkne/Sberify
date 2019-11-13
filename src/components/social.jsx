import React from "react";
import Lottie from "lottie-react-web";
import "../App.scss";

export default class Social extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isStopped: true,
    };
  }

  onIconEnter = () => {
    this.setState({ isStopped: false });
  };

  onIconLeave = () => {
    this.setState({ isStopped: true });
  };

  render() {
    return (
      <li
        className="artist__social"
        onMouseEnter={this.onIconEnter}
        onMouseLeave={this.onIconLeave}
      >
        <a href={this.props.link}>
          <Lottie
            ref={this.lottie}
            options={{
              animationData: this.props.data,
              loop: this.props.isLooped,
              autoplay: false
            }}
            isStopped={this.state.isStopped}
          />
        </a>
      </li>
    );
  }
}
