import {useNavigate} from 'react-router-dom';

export const appNavigator = (Component) => {
  return (props) => {
    const navigate = useNavigate();

    return (
      <Component
        navigate={navigate}
        {...props}
      />
    );
  };
};