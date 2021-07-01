# react-wsx
## A simple react websocket component.

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

react-wsx is a simple react websocket component which makes communicating with a websocket server very easy.

### Installation
```
npm install react-wsx
```

### Props
##### url:*string* - *required*
Websocket server URL.

##### onMessage:*Function* - *required*
Function to handle messages received from socket.

##### onConnect:*Function* 
Function to perform additional tasks on socket connection.

##### onDisconnect:*Function* 
Function to perform additional tasks on socket disconnect.

##### onError:*Function* 
Function to handle socket error

##### debug:*Boolean*
Prop to enable/disable all data,events from socket printing in console. Default value is **true**.

##### reconnect:*Boolean*
Prop to enable/disable reconnect socket feature. Default value is **true**.

##### reconnectInterval:*number*
Prop to specify interval for trying to reconnect socket (in **milliseconds**).

##### reconnectAttempts:*number*
Prop to specify the number of times socket connection should be attempted.

# Usage
```
import React, { Component } from 'react'
import ReactWS from 'react-wsx'

export default class App extends Component {

    private socketRef = React.createRef<any>();

    handleMessage = (message: any) => {
        console.log(message);
    }

    handleConnect = () => {
        console.log("connected");
        this.socketRef.current.sendMessage("Hello from the other side!");
    }

    handleDisconnect = () => {
        console.log("disconnected");
    }

    handleError = () => {
        console.log("error occurred");
    }


    render() {
        return (
            <div>
                <ReactWS
                    url="ws://localhost:4000/ws"
                    debug
                    onConnect={this.handleConnect}
                    onDisconnect={this.handleDisconnect}
                    reconnectAttempts={3}
                    reconnectInterval={2000}
                    onError={this.handleError}
                    onMessage={this.handleMessage}
                    reconnect
                    ref={this.socketRef}
                />
            </div>
        )
    }
}
```

## License
MIT

