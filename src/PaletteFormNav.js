import React, { Component } from 'react'
import { Link } from 'react-router-dom';
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

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = { newPaletteName: "" };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { classes, open } = this.props;
        const { newPaletteName } = this.state;
        return (
            <div>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color='default'
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.props.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color='inherit' noWrap>
                            Persistent drawer
                        </Typography>
                        <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)} >
                            <TextValidator validators={['required', 'isPaletteNameUnique']} errorMessages={["Enter Palette name", 'Name already used']} name='newPaletteName' label="Palette Name" onChange={this.handleChange} value={this.state.newPaletteName} />
                            <Button type='submit' variant='contained' color='primary'>
                                Save Palette
                            </Button>
                            <Link to="/">
                                <Button variant='contained' color='secondary'>Go Back</Button>
                            </Link>
                        </ValidatorForm>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default PaletteFormNav;