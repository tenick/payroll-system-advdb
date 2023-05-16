import './Modal.css';
import { useContext } from "react";
import { ModalContext } from '../../Context/ModalContext';
import Backdrop from "../Backdrop/Backdrop";

function Modal() {
    const { dispatch } = useContext(ModalContext);
    const backdropClick = (e) => {
        //alert(e.target);
        //console.log(e.target);
        dispatch({type: "POP"})
        e.stopPropagation();
    }
    const modalClick = e => {
        alert('clicked modal!');
        e.stopPropagation();
    }
    const addMoreModal = e => {
        dispatch({type: "PUSH", payload: {}});
        e.stopPropagation();
    }

    return (
        <div className='modalContainer'>
            <Backdrop className='backdrop' onClick={backdropClick}>
                <div className="modal" onClick={modalClick}>
                    <button onClick={backdropClick}>
                        bro srsly
                    </button>
                    <button onClick={addMoreModal}>
                        add more modals
                    </button>
                </div>
            </Backdrop>
        </div>
    );
}
  
export default Modal;
  