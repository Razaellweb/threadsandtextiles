import { Alarm, LocationCity, LocationOn, Timeline, WhatsApp } from '@material-ui/icons'
import React from 'react'
import { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";

const Top = () => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <div className='top' data-aos="slide-right">
            <div>
                <h1 className='loggo'>T & T</h1>
            </div>
            <div className='header'>
                <div className='ide'>
                    <LocationOn style={{ color: "red" }} />
                    <h5>Plot 60 Ejio Rd arigbajo ewekoro L.G.A ogun state</h5>
                </div>
                <div className='idew'>
                    <WhatsApp style={{ color: "green" }} />
                    <h5>+2348035778560, +2348062464448</h5>
                </div>
                <div className='ide'>
                    <Alarm style={{ color: "red" }} />
                    <h5>Mon - Fri: 8:30am - 6:00pm</h5>
                </div>
            </div>
        </div>
    )
}

export default Top