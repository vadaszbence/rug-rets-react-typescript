import React, {useContext, FunctionComponent as FC} from "react";
import * as DS from '../styles/Design.styles';
import {Switcher} from "../components/Switcher";
import {DesignContext} from '../context/store';
import ColorBox from "../components/ColorBox";
import ButtonGroup from "../components/ButtonGroup";
import Canvas from "../components/Canvas";
import ShapePicker from "../components/ShapePicker";


const Design: FC = () => {

    const {designs} = useContext(DesignContext)

    console.log(designs)


    return (
        <DS.Wrapper>
            <DS.DesignTypesContainer>
                <Switcher type={'shape'}/>
            </DS.DesignTypesContainer>
            {/* {!isAlertNeeded ? <div className={classes.zoom}>
                <Zoom/>
            </div> : null} */}
            <DS.ShapePicker>
                <ShapePicker/>
            </DS.ShapePicker>
            <DS.CanvasContainer>
                <Canvas/>
            </DS.CanvasContainer>
            <DS.ColorBtnContainer>
                <Switcher type={'color'}/>
            </DS.ColorBtnContainer>
            <DS.ColorPickerContainer>
                <ColorBox/>
            </DS.ColorPickerContainer>
            <DS.ButtonContainer>
                <ButtonGroup/>
            </DS.ButtonContainer>
        </DS.Wrapper>
    );
}

export default Design;