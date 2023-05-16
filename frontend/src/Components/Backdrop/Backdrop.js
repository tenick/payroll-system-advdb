import './Backdrop.css';

const Backdrop = ({onClick, children, className}) => {
  
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}

export default Backdrop;
