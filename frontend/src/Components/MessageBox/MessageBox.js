import { useState } from 'react';
import './MessageBox.css';

const MessageBox = ({text, setText, isError}) => {

    const handleX = e => {
        e.stopPropagation();
        setText('');
    };

    return (
        <>
            {text !== '' && 
                <div className={"messageBox " + (isError ? 'messageBoxError' : "") }>
                    <span>{text}</span>
        
                    <i className="fa-solid fa-xmark" onClick={handleX}></i>
                </div>
            }
        </>
    );
}

export default MessageBox;
