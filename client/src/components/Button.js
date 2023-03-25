import React from 'react'

function Button({
    title,
    variant = 'contained',
    color = 'primary',
    type = 'button',
    onClick,
    fullWidth = false,
    disabled
}) {
    let className = ''
    if(title === "Login" || title === "Register"){
        className = 'rounded2 '
    }else{
        className = fullWidth ? 'w-100 rounded ' : "pr-2 pl-2 rounded ";
        if (variant === 'contained' && !disabled) {
            className += 'bg-btn-' + color + ' text-white remove-border';
        }
        else if (variant === 'outlined'  && !disabled) {
            className += 'bg-border-' + color + ' text-blue';
        }
    
        if(disabled){
            className += 'disabled-btn';
        }
    }
    




    return (
        <button className={className}
            type={type} onClick={onClick}>
            {title}
        </button>
    )
}

export default Button