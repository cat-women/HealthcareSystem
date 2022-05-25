import React, { useEffect, useRef, useState } from 'react'
import '../../App.css';
var listOfImages = [];
const delay = 2500;

export default function Slide() {
    const [index, setIndex] = useState(0);
    const timeutRef = useRef(null);
    function importAll(r) {
        return r.keys().map(r);
    }

    listOfImages = importAll(require.context('./slides/', false, /\.(png|jpeg|jpg|svg|jfif|webp)$/));

    function resetTimeout() {
        if (timeutRef.current) {
            clearTimeout(timeutRef);
        }
    }
    useEffect(() => {
        resetTimeout();
        timeutRef.current =
            setTimeout(
                () =>
                    setIndex((prevIndex) =>
                        prevIndex === listOfImages.length - 1 ? 0 : prevIndex + 1
                    ),
                delay
            );

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div className='slideshow' >
            <div className='slideshowSlider'
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {
                    listOfImages.map(
                        (image, index) => (
                            <img key={index}
                                src={image}
                                className="slides"
                                alt="info">
                            </img>

                        ))
                }
            </div>
            <div className="slideshowDots">
                {listOfImages.map((_, idx) => (
                    <div key={idx}
                        className={`slideshowDot${index === idx ? " active" : ""}`}
                        onClick={() => {
                            setIndex(idx);
                        }}></div>
                ))}
            </div>
        </div>
    )


}
