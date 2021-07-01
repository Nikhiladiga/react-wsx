import React from 'react'
import { reactWsPropTypes } from './types/reactWsPropTypes';
import { reactWsStateTypes } from './types/reactWsStateTypes';
import { logger, logType } from './helpers/logger';

class ReactWS extends React.Component<reactWsPropTypes, reactWsStateTypes> {

    static defaultProps = {
        debug: true,
        reconnect: true
    }

    state = {
        websocketInstance: new window.WebSocket(this.props.url),
        reconnectInterval: this.props.reconnectInterval || 10000
    }

    reConnectIntervalKey: any = {};
    reconnectAttempts: number = 0;

    componentDidMount() {
        this.initWebSocketInstance();
    }

    componentDidUpdate(prevProps: reactWsPropTypes) {
        if (this.props !== prevProps) {
            if (this.props.url !== prevProps.url) {
                this.state.websocketInstance.close();
                this.setState({
                    websocketInstance: new window.WebSocket(this.props.url)
                });
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.reConnectIntervalKey);
        this.state.websocketInstance.close();
    }

    initWebSocketInstance = () => {
        let ws = this.state.websocketInstance;

        ws.onopen = () => {
            this.props.debug && logger(logType.SUCCESS, "Websocket connection successful");
            typeof this.props.onConnect === "function" && this.props.onConnect();
            clearTimeout(this.reConnectIntervalKey);
            this.reconnectAttempts = 0;
        }

        ws.onmessage = (e) => {
            this.props.debug && logger(logType.MESSAGE, e.data);
            typeof this.props.onMessage === "function" && this.props.onMessage(e.data);
        }

        ws.onerror = (e) => {
            this.props.debug && logger(logType.ERROR);
            typeof this.props.onError === "function" && this.props.onError(e);
        }

        ws.onclose = () => {
            typeof this.props.onDisconnect === "function" && this.props.onDisconnect();
            setTimeout(() => {
                if (this.props.reconnect) {
                    if (this.reconnectAttempts >= (this.props.reconnectAttempts ? this.props.reconnectAttempts : Number.MAX_SAFE_INTEGER)) {
                        clearTimeout(this.reConnectIntervalKey);
                        this.props.debug && logger(logType.ERROR, "Number of reconnect attempts reached!");
                    } else {
                        this.reConnectIntervalKey = setTimeout(() => {
                            this.reconnectAttempts++;
                            this.props.debug && logger(logType.GENERIC, "Attempting to reconnect...");
                            this.setState({
                                websocketInstance: new WebSocket(this.props.url)
                            }, () => {
                                this.initWebSocketInstance();
                            });
                        }, this.state.reconnectInterval);
                    }
                }
            }, 1000);
        }
    }

    sendMessage = (message: any) => {
        this.state.websocketInstance.send(message);
    }

    render() {
        return <></>
    }
}


export default ReactWS;