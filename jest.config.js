module.exports = {
    testEnvironment: 'jsdom', // add this line to specify the jsdom test environment
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.css$": "jest-css-modules-transform",
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-stub",
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },  "transformIgnorePatterns": [
        "/node_modules/(?!jest-transform-file)",
        "/node_modules/(?!@testing-library)/",
        "/node_modules/(?!react-multi-carousel)/",
      ],    
    moduleDirectories: ['node_modules'],
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy',
      },
    forceExit: true
};

//"^.+\\.js$": "babel-jest"

  
