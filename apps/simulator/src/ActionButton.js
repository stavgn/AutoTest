import React from 'react'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { CardContent, Grid } from '@material-ui/core'
import getRequest from './requestBuilder'
import axios from 'axios'

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const getColor = {
    GET: 'green',
    POST: 'red',
    PUT: 'orange'
}

class ActionButton extends React.Component {
    state = {
        req: getRequest(),
        bgColor: 'inherit'
    }
    execAction = async () => {
        this.setState({ bgColor: '#EEEEEE' })
        const { method, endpoint, payload } = this.state.req
        axios({
            method,
            url: `/api${endpoint}`,
            data: payload
        }).then(async () => {
            this.setState({ bgColor: '#90EE90' })
            await sleep(200);
            this.setState({ bgColor: 'inherit' })
        })
            .catch(async (err) => {
                this.setState({ bgColor: '#FF7F7F' })
                await sleep(200);
                this.setState({ bgColor: 'inherit' })
            })
    }
    render() {
        const { method, payload = '(empty)', endpoint } = this.state.req
        return (
            <div onClick={this.execAction} style={{ transition: '0.5s', backgroundColor: this.state.bgColor }}>
                <CardContent>
                    <Typography style={{ fontWeight: 400 }} variant="h4">{this.props.num}</Typography>
                </CardContent>
                <Divider />
                <CardContent>
                    <Grid container
                        alignItems="center">
                        <Grid style={{ paddingRight: '40px', fontWeight: 'bolder', color: getColor[method] }} item>{method}</Grid>
                        <Grid item >{endpoint}</Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardContent>
                    <Grid container
                        alignItems="center">
                        <Grid style={{ paddingRight: '40px' }} item>
                            PAYLOAD:
                        </Grid>
                        <Grid item>
                            <code style={{ backgroundColor: '#EEEEEE', padding: '5px' }}>
                                {JSON.stringify(payload)}
                            </code></Grid>
                    </Grid>
                </CardContent>


            </div>
        );
    }
}


export default ActionButton