import { Link } from 'react-router-dom';
import '../../src/index.css';

const NotFound = () => {
  return (
    <div className="h-screen ">
      <div className="fixed top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
        <p
          style={{
            fontWeight: '999',
            fontSize: '200px',
            textAlign: 'center',
            color: 'indigo',
          }}
        >
          404
        </p>
        <h1 className="text-center">Page not found </h1>
        <Link to="/home">
          <div className="text-center hover:text-indigo-600">
            Click here to move back to home page
          </div>
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
