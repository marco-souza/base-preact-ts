import { h, render, ComponentChild } from 'preact';
import App from './app';

/**
 * App Bootstrap
 *
 * @returns {void}
 */
function bootstrap() {

    const renderMainRoute = (mainRoute: ComponentChild) => {
        const element = document.getElementById("main")
        element && render(
            mainRoute,
            element
        );
    };

    renderMainRoute(<App />);
}


/****************************************************************
* Run Bootstrap
****************************************************************/
bootstrap();