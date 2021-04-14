import * as React from 'react';
import { render } from 'react-dom';

function MainView()
{
  return (
    <>
      <h1>Hello, World!</h1>
      We are using Node.js <span id="node-version" />
      , Chromium <span id="chrome-version" />
      , and Electron <span id="electron-version" />.
    </>
  );
}

render(<MainView />, document.getElementById('root'));