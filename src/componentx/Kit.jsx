import React from 'react'

const Kit = () => {
    return (
        <div className='kit'>
            <center>
                <h1 className='kith1'>LET'S KIT YOU</h1>
            </center>
            <div className='flexserv'>
                <img className='imghjf' data-aos="slide-right" src={"https://i.pinimg.com/564x/2b/41/c0/2b41c0e79a1f40a2a7639b93a571572b.jpg"} />
                <div className='fleds' data-aos="slide-left">
                    <h3>Our production line include</h3>
                    <ul>
                        <li>Sport-wears and PE wears: all colours, varying designs</li>
                        <li>Tops: t-shirts (round-neck and polo)</li>
                        <li>Skirts: pleated, skorts</li>
                        <li>Shorts: All colours</li>
                        <li>Trousers: full length, knee length.</li>
                        <li>Full Tracksuits Collections</li>
                        <li>Branded sweaters, socks, ties, caps</li>
                        <li>Patches</li>
                        <li>Kampala</li>
                        <li>School Uniforms</li>
                    </ul>
                    <center>
                        <button className='btn'>View Portfolio</button>
                    </center>
                </div>
            </div>
        </div>
    )
}

export default Kit