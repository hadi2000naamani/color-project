import React, { Component } from 'react'
import PaletteMetaForm from "./PaletteMetaForm";
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
import styles from "./styles/PaletteFormNavStyles";
import AddToPhotosIcons from "@material-ui/icons/AddToPhotos";


class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = { newPaletteName: "", formShowing: false };
        this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    showForm() {
        this.setState({ formShowing: true });
    }
    hideForm() {
        this.setState({ formShowing: false });
    }
    render() {
        const { classes, open, palettes, handleSubmit } = this.props;
        const { newPaletteName } = this.state;
        return (
            <div className={classes.root}>
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
                            <AddToPhotosIcons />
                        </IconButton>
                        <Typography variant="h6" color='inherit' noWrap>
                            Create A Palette
                        </Typography>

                    </Toolbar>
                    <div className={classes.navBtns}>

                        <Link to="/">
                            <Button variant='contained' color='secondary' className={classes.button}>Go Back</Button>
                        </Link>
                        <Button variant="contained" color="primary" onClick={this.showForm} className={classes.button}>
                            Save
                         </Button>
                    </div>
                </AppBar>

                {this.state.formShowing && (<PaletteMetaForm hideForm={this.hideForm} handleSubmit={handleSubmit} palettes={palettes} />
                )}
            </div>
        );
    }
}

export default withStyles(styles, { withThem: true })(PaletteFormNav);