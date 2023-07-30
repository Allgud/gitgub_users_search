import ReactDOM from 'react-dom/client';
import App from './components/App';
import SearchProvider  from './HOC/SearchProvider';
import './styles.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <SearchProvider>
    <App />
  </SearchProvider>
);

