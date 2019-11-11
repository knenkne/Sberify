import React from "react";
import Lottie from "lottie-react-web";
import "../App.scss";

export default class Play extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isStopped: true,
      segments: [0, 8],
      playDirection: 1
    };

    this.lottie = React.createRef();
  }
  
  componentDidMount() {
    this.lottie.current.anim.playSegments(this.state.segments, true)
  }

  onIconClick = () => {
      this.setState({
        segments: this.state.segments.reverse()
      }, () => {
        this.lottie.current.anim.playSegments(this.state.segments, true)
      })
  };

  onIconLeave = () => {
    this.setState({ isStopped: true });
  };

  render() {
    return (
        <button className="song__play" onClick={this.onIconClick}>    
            <Lottie ref={this.lottie} options={{ animationData: this.props.data, loop: false, autoplay: false }} />
        </button>
    );
  }
}
