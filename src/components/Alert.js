import React from "react";

function Alert(props) {
    // We write a separate function for capitalizing 'Success', as 'success' is a bootstrap keyword for a green alert box
    const capitalize =(word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        props.alert && (
        <div
            className={`alert alert-${props.alert.type} alert-dismissible fade show`}
            role="alert"
        >
            <strong>{capitalize (props.alert.type)}</strong>: {props.alert.msg}
        </div>
        )
    );    
}

export default Alert;
