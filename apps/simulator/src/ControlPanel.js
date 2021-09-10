import { Grid, Card, CardActionArea } from "@material-ui/core"
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ActionButton from "./ActionButton.js";

const useStyles = makeStyles((theme) => ({
    grid: {
        width: '100%',
    },
    card: {
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


function Btn(props) {
    const classes = useStyles()
    return (<Card className={classes.card}>
        <CardActionArea>
            <ActionButton {...props} />
        </CardActionArea>
    </Card>)
}

function ControlRow(props) {
    const { cols, row } = props
    const btns = []

    for (let i = 0; i < cols; i++) {
        btns.push((
            <Grid key={i} item xs>
                <Btn num={row * cols + i + 1}></Btn>
            </Grid>
        ))
    }
    return (
        <Grid container
            item
            justifyContent="center"
            alignItems="center"
            spacing={4}>
            {btns}
        </Grid>
    )
}

function ControlPanel(props) {
    const rows = []
    for (let i = 0; i < props.rows; i++) {
        rows.push(<ControlRow key={i} row={i} cols={props.cols} />)
    }

    return (
        <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}>
            {rows}
        </Grid>
    )
}

export default ControlPanel