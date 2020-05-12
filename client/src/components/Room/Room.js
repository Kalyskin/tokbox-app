import React from "react";
import { OTPublisher, OTSubscriber, createSession } from "opentok-react";

export class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = { streams: [], publishVideo: true };
  }

  componentWillMount() {
    const { apiKey, sessionId, token } = this.props.credentials;
    this.sessionHelper = createSession({
      apiKey,
      sessionId,
      token,
      onStreamsUpdated: (streams) => {
        this.setState({ streams });
      },
    });
    this.handlePublishVideo = this.handlePublishVideo.bind(this);
  }

  componentWillUnmount() {
    this.sessionHelper.disconnect();
  }

  handlePublishVideo() {
    this.setState(({ publishVideo }) => {
      return { publishVideo: !publishVideo };
    });
  }

  render() {
    return (
      <div className="room-wrapper">
        <button className="video-button" onClick={this.handlePublishVideo}>
          {this.state.publishVideo ? "Disable video" : "Enable video"}
        </button>
        <div className="room">
          <div className="publisher">
            <OTPublisher
              properties={{
                publishVideo: this.state.publishVideo,
                audioBitrate: 20000,
                resolution: "320x240",
                width: 200,
                height: 120,
              }}
              session={this.sessionHelper.session}
            />
          </div>
          <div className="subscribers">
            {this.state.streams.map((stream) => {
              return (
                <div className="subscriber" key={stream.id}>
                  <OTSubscriber
                    properties={{
                      audioVolume: 0,
                      preferredResolution: { width: 320, height: 240 },
                      width: 200,
                      height: 120,
                    }}
                    key={stream.id}
                    session={this.sessionHelper.session}
                    stream={stream}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
