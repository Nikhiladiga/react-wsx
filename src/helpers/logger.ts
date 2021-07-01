export enum logType {
    MESSAGE,
    ERROR,
    SUCCESS,
    GENERIC
}

export const logger = (type: logType, message?: any) => {
    switch (type) {
        case logType.MESSAGE:
            console.log(`%c [REACT-WSX] Message received: ${message}`, 'background:#099FFF; color:white; font-size:16px;');
            break;

        case logType.ERROR:
            console.log(`%c [REACT-WSX] Error occurred! ${message || ""}`, 'background:red; color: white; font-size:16px');
            break;

        case logType.SUCCESS:
            console.log(`%c [REACT-WSX] ${message}`, 'background:#bada55; color:black; font-size:16px;');
            break;

        case logType.GENERIC:
            console.log(`%c [REACT-WSX] ${message}`, 'background:orange; color:#222; font-size:16px;');
            break;

        default: break;
    }
}
