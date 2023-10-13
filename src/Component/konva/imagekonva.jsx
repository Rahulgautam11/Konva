import { useEffect, useState } from "react";
import { Stage, Layer, Image } from 'react-konva';
import laptopimage from '../../Assets/image.jpg';
import styled from "styled-components";
import { TextElement } from "./TextElement";

const DragContainer = styled.div`
    display: flex;
    gap: 50px;
    align-items: flex-start;
`
const EditableFieldWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    input{
        border: 1px solid #000;
        height: 36px;
        outline: none;
        border-radius: 6px;
        padding: 0 10px;
    }
`

const ImageKonva = () => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('Text');
    const [fontSize, setFontSize] = useState(20);
    const [color, setColor] = useState('red')
    const [Xarea, setXarea] = useState(10)
    const [Yarea, setYarea] = useState(10)
    const [selectedShape, selectShape] = useState(null);
    const [textElements, setTextElements] = useState();


    useEffect(() => {
        const img = new window.Image();
        img.src = laptopimage;

        img.onload = () => {
            setImage(img);
        };
    }, []);

    const handleFontSizeChange = (e) => {
        setFontSize(e.target.value);
    };
    const handleTextChange = (e) => {
        setText(e.target.value);
    };
    const handleColorChange = (e) => {
        setColor(e.target.value)
    }
    const HandleLeft = () => {
        setXarea(Xarea - 1)
    }
    const HandleRight = () => {
        setXarea(Xarea + 1)
    }
    const HandleTop = () => {
        setYarea(Yarea - 1)
    }
    const HandleBottom = () => {
        setYarea(Yarea + 1)
    }

    console.log(Xarea, "Xarea")

    const handleArrowKeys = (e) => {
        switch (e.key) {
            case 'ArrowUp':
                HandleTop();
                break;
            case 'ArrowDown':
                HandleBottom();
                break;
            case 'ArrowLeft':
                HandleLeft();
                break;
            case 'ArrowRight':
                HandleRight();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleArrowKeys);
        return () => {
            window.removeEventListener('keydown', handleArrowKeys);
        };
    });

    let handleX = (e) => {
        setXarea(e)
    }
    let handleY = (e) => {
        setYarea(e)
    }
    return (
        <DragContainer>
            <Stage width={700} height={500}>
                <Layer>
                    <Image
                        image={image}
                        width={500}
                        height={400}
                    />

                    <TextElement
                        x={Xarea}
                        y={Yarea}
                        shapeProps={{
                            x: Xarea,
                            y: Yarea,
                            text: text,
                            fontSize: fontSize,
                            fill: color,
                            id: 'text1',
                        }}
                        isSelected={selectedShape}
                        onSelect={() => {
                            selectShape(!selectedShape);
                        }}
                        onChange={(newAttrs) => {
                            let texts = textElements;
                            texts = newAttrs;
                            setTextElements(texts);
                        }}
                        handleY={handleY}
                        handleX={handleX}
                    />
                </Layer>
            </Stage>
            <EditableFieldWrap>
                <label>Font Size</label>
                <input
                    type="number"
                    value={fontSize}
                    onChange={handleFontSizeChange}
                />
                <label>Text</label>
                <input
                    type="text"
                    value={text}
                    onChange={handleTextChange}
                />
                <label>Text Color</label>
                <input
                    type="text"
                    value={color}
                    onChange={handleColorChange}
                />
                <button onClick={() => HandleLeft()}>Left</button>
                <button onClick={() => HandleRight()}>Right</button>
                <button onClick={() => HandleTop()}>Top</button>
                <button onClick={() => HandleBottom()}>Bottom</button>
            </EditableFieldWrap>
        </DragContainer>

    );
}
export default ImageKonva;
