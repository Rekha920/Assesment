const { default: consoleHijacker } = require('console-hijacker')

consoleHijacker({
    Log: (data) => {
        // function call when console.log() trigger
    },
    Warn: (data) => {
        // function call when console.warn() trigger
    },
    Info: (data) => {
        // function call when console.info() trigger
    },
    Error: (data) => {
        // function call when console.error() trigger
    },
});