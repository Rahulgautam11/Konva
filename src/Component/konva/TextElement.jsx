import React, { useRef } from 'react';
import { Text, Transformer } from 'react-konva';


export const TextElement = ({ shapeProps, isSelected, onSelect, onChange, handleX, handleY }) => {
    const shapeRef = useRef();
    const trRef = useRef();

    React.useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <Text
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: handleX(e.target.x()),
                        y: handleY(e.target.y()),
                    });
                }}
            />


            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    );
};