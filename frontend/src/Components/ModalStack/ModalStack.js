import { useContext } from "react";
import Modal from '../Modal/Modal';
import { ModalContext } from '../../Context/ModalContext';

const ModalStack = () => {
    const { state: modals } = useContext(ModalContext);

    return (
        <div className="modalStack">
            {
                modals.map(modal =>  <Modal key={modal.id}></Modal>
                )
            }
        </div>
    );
}
  
export default ModalStack;
  