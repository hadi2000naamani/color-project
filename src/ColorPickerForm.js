import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PaletteFormNav from "./PaletteFormNav";
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import DraggableColorList from "./DraggableColorList";
import classNames from "classnames";
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ChromePicker } from "react-color";
import { Button, colors } from '@material-ui/core';
import { hex } from 'chroma-js';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import { arrayMove } from 'react-sortable-hoc';

const styles ={
    picker:{
        width:'100% !important',
        marginTop:'2rem'
    },
    addColor:{
        width:'100%',
        padding: '1rem',
        marginTop:'1rem',
        fontSize: '2rem'
    },
    colorNameInput:{
        width:'100%',
        height:'70px'
    }
}

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = { currentColor: "teal", newColorName:"" };
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex });
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(){
        const newColor ={
            color: this.state.currentColor,
            name: this.state.newColorName
        };
        this.props.addNewColor(newColor);
        this.setState({newColorName: ""})
    }
    render() {
        const { paletteIsFull, classes } = this.props;
        const {currentColor, newColorName} = this.state;
        return (
            <div>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit} ref='form'>
                    <TextValidator
                        placeholder="Color Name"
                        name="newColorName"
                        variant='filled'
                        margin='normal'
                        value={newColorName}
                        className={classes.colorNameInput}
                        onChange={this.handleChange}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used']}

                    />
                    <Button
                        disabled={paletteIsFull}
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.addColor}
                        style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
                    >
                        {paletteIsFull ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}
export default withStyles(styles)(ColorPickerForm);