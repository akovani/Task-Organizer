// function that appends log entry to file
const log = (level, message) => {
    console[level](message);
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp}: (${level.toUpperCase()}) ${message}`;

    const logsKey = process.env.REACT_APP_ENV === 'prod' ? 'prodLogs' : 'preprodLogs';
    const existingLogs = JSON.parse(localStorage.getItem(logsKey)) || [];
    const updatedLogs = [...existingLogs, logMessage];

    localStorage.setItem(logsKey, JSON.stringify(updatedLogs));
};

// exports logger that can be called with different levels
export const logger = {
    debug: (message) => log('log', message),
    info: (message) => log('info', message),
    warn: (message) => log('warn', message),
    error: (message) => log('error', message),
};

export default logger