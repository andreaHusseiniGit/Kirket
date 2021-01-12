import React, {useState} from 'react';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Out from './Out';
import Extra from './Extra';
import Special from './Special';

const ButtonGrid = (props) => {

    const [open, setOpen] = useState(false)
    const [highlighted, setHighlighted] = useState('');
    const [extras, setExtras] = useState('');

     return (
        <Grid container
                alignItems='stretch'>
                    <Grid container
                        alignItems='stretch'
                        justify='flex-end'>
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={2}>
                            <Button className='button button-confirm'
                                color='inherit' 
                                variant='outlined' 
                                onClick={()=>{props.setScore(); props.fixOvers(); setHighlighted('')}}>
                                Confirm
                                </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs = {4}>
                        <Button
                        variant='outlined' 
                        className={`button button-grid ${highlighted==='dot'&&'active'}`}
                        color='inherit'
                        value={0}
                        disabled = {false}
                        onClick = {() => {props.saveScore(0)
                            props.disabling('dot');
                            setHighlighted('dot')
                            props.onClickCategory('runs')}}>
                            dot
                        </Button>
                    </Grid>

                    <Grid item xs = {4}>
                        <Button
                            variant='outlined' 
                            className={`button button-grid ${highlighted==='one'&&'active'}`}
                            color='inherit'
                            value={1}
                            disabled = {false}
                            onClick = {() => {props.saveScore(1)
                                props.disabling('one');
                                setHighlighted('one')
                                props.onClickCategory('runs')}}>
                                1
                        </Button>
                    </Grid>

                    <Grid item xs = {4}>
                        <Button
                            variant='outlined' 
                            className={`button button-grid ${highlighted==='two'&&'active'}`}
                            color='inherit'
                            value={2}
                            disabled = {false}
                            onClick = {() => {props.saveScore(2)
                                props.disabling('two');
                                setHighlighted('two')
                                props.onClickCategory('runs')}}>
                                2
                        </Button>
                    </Grid>

                    <Grid item xs = {4}>
                        <Button
                            variant='outlined' 
                            className={`button button-grid ${highlighted==='three'&&'active'}`}
                            color='inherit'
                            value={3}
                            disabled = {false}
                            onClick = {() => {props.saveScore(3)
                                props.disabling('three');
                                setHighlighted('three')
                                props.onClickCategory('runs')}}>
                                3
                        </Button>
                    </Grid>

                    <Grid item xs = {4}>
                        <Button
                            variant='outlined' 
                            className={`button button-grid ${highlighted==='four'&&'active'}`}
                            color='inherit'
                            value={4}
                            disabled = {false}
                            onClick = {() => {props.saveScore(4)
                                props.disabling('four');
                                setHighlighted('four')
                                props.onClickCategory('runs')}}>
                                4
                        </Button>
                    </Grid>

                    <Grid item xs = {4}>
                        <Button
                            variant='outlined' 
                            className={`button button-grid ${highlighted==='six'&&'active'}`}
                            color='inherit'
                            value={6}
                            disabled = {false}
                            onClick = {() => {props.saveScore(6)
                                props.disabling('six');
                                setHighlighted('six')
                                props.onClickCategory('runs')}}>
                                6
                        </Button>
                    </Grid>
                    <Grid item xs = {4}>
                        <Special
                        // className={`${highlighted==='special'&&'active'}`}
                        onClick = {() => {props.disabling('special');
                        setHighlighted('special')
                        props.onClickCategory('specials')}}
                        highlighted = {highlighted}
                        disabled = {false}
                        />
                    </Grid>
                    <Grid item xs = {4}>
                        <Extra 
                        // className={`${this.state.extra_highlighted&&'active'}`}
                        // disabled = {this.state.extra_disabled}
                        onClick = {() => {props.disabling('extra');
                        setHighlighted('extra')
                        props.onClickCategory('extras')
                        setOpen(true)}}
                        highlighted = {highlighted}
                        disabled={false}
                        open = {open}
                        close = {()=>{setOpen(false)}}
                        onChangeExtras={(type, runs)=>{props.onChangeExtras(type, runs)}}/>
                    </Grid>
                    <Grid item xs = {4}>
                        <Out
                        // className={`${this.state.out_highlighted&&'active'}`}
                        // disabled = {this.state.out_disabled}
                        onClick = {() => {props.disabling('out');
                        setHighlighted('out')
                        props.onClickCategory('out')}}
                        highlighted={highlighted}
                        disabled={false}
                        batsmen={props.teamA}
                        onChangeOut={(type, runs)=>{props.onChangeExtras(type, runs)}}
                        />
                    </Grid>
                    <Grid item xs={11}>
                    </Grid>
                    <Grid item xs={1}>
                        <Button className='button button-secondary button-clear'
                                onClick={()=>{setHighlighted('')}}>Clear</Button>
                    </Grid>
            </Grid>
     )
}


export default ButtonGrid;