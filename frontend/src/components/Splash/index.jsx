
import {Link } from 'react-router-dom';
import "./Splash.scss"

export default function Splash(){
    return (
        <>
        <section className="first-section">
            <picture className="main-image-container">
                <Link to="/products/street-fighter-plyr">
                    <img src="https://images.prismic.io/skullcandy/01eb1d9a-7e59-4db4-b1f7-6f2b258e62d1_1_desktop_StreetFighter.jpg?auto=compress,format" alt="splash" />
                </Link>
            </picture>
            <picture className="side-pictures">
                <picture>
                    <h2>SKULLCANDY</h2>
                    <img src="https://images.prismic.io/skullcandy/66314154-b6ff-4236-ac9c-f145226f2191_Image20221004103243.jpg?auto=compress,format" alt="splash" />
                </picture>
                <picture>
                <img src="https://images.prismic.io/skullcandy/1d509e25-4aec-41fe-9fbf-a5e9b144b4d9_3_indyevo_SF.jpg?auto=compress,format" alt="" />
                </picture>
            </picture>
        </section>
        <section className="second-section">
        </section>
        </>
    )
}
