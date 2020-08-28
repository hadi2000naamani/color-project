import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
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
import styles from "./styles/NewPaletteFormStyles";



class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            colors: this.props.palettes[0].colors,
            newPaletteName: ""
        };

        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value =>
            this.state.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', value =>
            this.state.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        );

    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };
    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    addNewColor(newColor) {
        this.setState({ colors: [... this.state.colors, newColor], newColorName: "" });
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    clearColors() {
        this.setState({ colors: [] });
    }
    addRandomColor() {
        const allColors = this.props.palettes.map(p => p.colors).flat();
        var rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];
        this.setState({ colors: [...this.state.colors, randomColor] });
    }
    handleSubmit(newPalette) {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
        newPalette.colors = this.state.colors;
        this.props.savePalette(newPalette);
        this.props.history.push("/");
    }
    removeColor(colorName) {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        })
    }
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }));
    };
    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, colors } = this.state;
        const paletteIsFull = colors.length >= maxColors;

        return (
            <div className={classes.root}>
                <PaletteFormNav
                    handleDrawerOpen={this.handleDrawerOpen}
                    handleSubmit={this.handleSubmit}
                    open={open}
                    palettes={palettes}

                />
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className={classes.container}>
                        <Typography variant="h4" gutterBottom>
                            Design Your Palette
                    </Typography>
                        <div className={classes.buttons}>
                            <Button className={classes.button} variant="contained" color="secondary" onClick={this.clearColors}>
                                Clear Palette
                        </Button>
                            <Button className={classes.button} disabled={paletteIsFull} variant="contained" color="primary" onClick={this.addRandomColor}>
                                Random Color
                        </Button>
                        </div>

                        <ColorPickerForm
                            addNewColor={this.addNewColor}
                            paletteIsFull={paletteIsFull}
                            colors={colors}
                        />
                    </div>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />

                    <DraggableColorList
                        colors={colors}
                        removeColor={this.removeColor}
                        axis='xy'
                        onSortEnd={this.onSortEnd}
                    />

                </main>
            </div>
        );
    }
}
export default withStyles(styles, { withThem: true })(NewPaletteForm);