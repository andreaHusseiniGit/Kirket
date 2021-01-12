import React from 'react';
// import { LinkRenderer } from './renderers/LinkRenderer.js';
// import { Menu } from 'react-data-menu';
import Button from '@material-ui/core/Button';
import Menu, { SubMenu, MenuItem } from 'rc-menu';




const Options = (props) => {
    return (<>
        {/* <Button
        disabled = {props.disabled}
        // onClick = {props.onClick}
        >
        Hello
        </Button> */}
        <Menu>
            <MenuItem>1</MenuItem>
                <SubMenu title="2">
            <MenuItem>2-1</MenuItem>
                </SubMenu>
        </Menu>
           
            </>
        )
}

export default Options;