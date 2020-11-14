import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        textAlign: 'center'
    },
    field1: {
        marginTop: '100px'
    },
    field2: {
        marginTop: '20px'
    }
  }));

export default function Join() {
    const classes = useStyles();

    const [ name, setName ]= useState('');
    const [ room, setRoom ]= useState('');

    return (
        <div className="Join">
        <Container maxWidth="sm" className={classes.root}>
            <h1 className={classes.field1} >JOIN</h1>
            <TextField 
                fullWidth 
                className={classes.field2} 
                id="outlined-basic" 
                label="Name" 
                variant="outlined" 
                onChange={(e) => setName(e.target.value)}
            />
            <TextField 
                fullWidth 
                className={classes.field2} 
                id="outlined-basic" 
                label="Room" 
                variant="outlined" 
                onChange={(e) => setRoom(e.target.value)}
            />
            <Link 
                onClick={e => (!name || !room) ? e.preventDefault() : null} 
                to={`/chat?name=${name}&room=${room}`}
            >
                <Button 
                    fullWidth 
                    className={classes.field2} 
                    variant="contained" 
                    color="primary"
                    >
                    JOIN
                </Button>
            </Link>
        </Container>
        </div>
    )
}
