import { h, render, ComponentChild } from 'preact';

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

    const renderMainRoute = (mainRoute: ComponentChild) => {
        const element = document.getElementById("main")
        if (element) {
            element.innerHTML = ''; // Clean previous rendered elements
            render(mainRoute, element);
        }
    };

    renderMainRoute(<App name="djow" />);
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