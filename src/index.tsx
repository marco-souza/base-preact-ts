import React from 'react';
import { render } from 'react-dom';

// Use global vars
declare var module: any;
declare var require: any;

/**
 * App Bootstrap
 *
 * @returns {void}
 */
function bootstrap() {
    const App = require('./app').default;
    const props = {
        names: [
            "Abel",
            "Bread",
            "Chinch",
            "Alice",
        ]
    }

    const renderMainRoute = (mainRoute) => {
        const element = document.getElementById("main");
        render(mainRoute, element);
    };

    renderMainRoute(<App {...props} />);
}

// Set up HMR re-rendering.
if (module.hot) {
    module.hot.accept();
    module.hot.accept('./app/', bootstrap);
}


/****************************************************************
* Run Bootstrap
****************************************************************/
bootstrap();