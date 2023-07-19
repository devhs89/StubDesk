import {useNavigate} from 'react-router-dom';

export const appNavigator = (Component) => {
  // route navigator with useNavigation hook (source: https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router)
  return (props) => {
    const navigate = useNavigate();

    return (<Component
        navigate={navigate}
        {...props}
      />);
  };
};