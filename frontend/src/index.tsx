import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import App from "./components/App/App";
import {Provider} from "react-redux";
import {store} from './redux/store';
import {getToken} from "./services/token";
import {checkTokenThunk} from "./redux/authSlice";


const start = async () => {
  const token = getToken();
  if (token) {
    await store.dispatch(checkTokenThunk(token));
  }

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </React.StrictMode>
  );
}

start();

