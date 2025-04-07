import { useState, useRef } from "react";
import CaretLeft from "../assets/caret-left-solid.svg"
import CaretRight from "../assets/caret-right-solid.svg"

function BeforeAfter ({beforeImg, afterImg }) {

    const [sliderPosition, setSliderPosition] = useState(50)
    const containerRef = useRef(null)
    const isDragging = useRef(false)

    const handleMouseDown = () => {
        isDragging.current = true;
    }

    const handleMouseMove = (e) => {
        if (!isDragging.current || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect()
        let offsetX = e.clientX - rect.left;
        let width = rect.width;

        if (offsetX < 0) offsetX = 0;
        if (offsetX > width) offsetX = width;

        setSliderPosition((offsetX / width) * 100)
    }

    const handleMouseUp = () => {
        isDragging.current = false;
    }

    return (
        <>
        <div 
            className="container" 
            ref={containerRef} 
            onMouseMove={handleMouseMove} 
            onMouseUp={handleMouseUp} 
            onMouseLeave={handleMouseUp}
        >
        <div className="before-after">
                        <img className="before-img" alt="before-img" src={beforeImg} />
                        <div className="after-container" style={{width: `${sliderPosition}%`}}>
                            <img className="after-img" src={afterImg} alt="after-img" />
                        </div>
                        <div className="slider" style={{left:`${sliderPosition}%`}} onMouseDown={handleMouseDown}>
                            <div className="handle">
                                <span className="before-handle">Before</span>
                                <span className="arrow-handle"><img src={CaretLeft} /> <img src={CaretRight} /></span>
                                <span className="after-handle">After</span>
                            </div>
                        </div>
                    </div>
                    </div>
        </>
    )
}

export default BeforeAfter;