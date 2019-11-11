import React from "react";
import Lottie from "lottie-react-web";

export default class Play extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      segments: [0, 8]
    };

    this.lottie = React.createRef();
  }

  componentDidMount() {
    this.lottie.current.anim.goToAndStop(7, true);
  }

  componentDidUpdate() {
    this.setState({
      segments: this.state.segments.reverse()
    })
  }

  shouldComponentUpdate() {
    if (this.props.timeline < this.props.duration) {
      return false;
    }

    return true;
  }

  onIconClick = () => {
    this.setState(
      {
        segments: this.state.segments.reverse()
      },
      () => {
        this.props.onClickHandler();
        this.lottie.current.anim.playSegments(this.state.segments, true);
      }
    );
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
