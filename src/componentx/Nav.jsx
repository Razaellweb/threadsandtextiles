import React from 'react'

const Nav = () => {
    return (
        <div className='nav' data-aos="slide-left">
            <div onClick={() => {window.scrollTo(0, 0)}}>Home</div>
            <div onClick={() => {window.location = "/home"}}>Shop</div>
            <div onClick={() => {window.scrollTo(0, 1300)}}>Services</div>
            <div className='don' onClick={() => {window.scrollTo(0, 2250)}}>Portfolio</div>
            <div onClick={() => {window.scrollTo(0, 9000)}}>Contact</div>
        </div>
    )
}

export default Nav