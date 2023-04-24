module.exports = {
    testEnvironment: 'jsdom', // add this line to specify the jsdom test environment
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.css$": "jest-css-modules-transform",
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-stub",
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },  "transformIgnorePatterns": [
        "/node_modules/(?!jest-transform-file)"
    ]
};
