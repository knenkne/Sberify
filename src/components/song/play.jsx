import React from "react";
import Lottie from "lottie-react-web";

export default class Play extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      segments: this.props.isPlaying ? [8.75, 0] : [0, 8.75]
    };

    this.lottie = React.createRef();
  }

  componentDidMount() {
    this.lottie.current.anim.goToAndStop(7.99, true);
  }

  shouldComponentUpdate() {
    if (this.props.time < this.props.duration) {
      return false;
    }

    return true;
  }

  onIconClick = () => {
    this.props.onClickHandler();
    console.log(this.props.isPlaying)
    this.lottie.current.anim.playSegments(this.props.isPlaying ? [0, 8.75] : [8.75, 0], true);
  };

  render() {
    return (
      <button className="song__play" onClick={this.onIconClick}>
        <Lottie
          ref={this.lottie}
          options={{
            animationData: this.props.data,
            loop: false,
            autoplay: false
          }}
        />
      </button>
    );
  }
}
