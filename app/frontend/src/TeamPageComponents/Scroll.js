import React from 'react';
import { Container} from '@material-ui/core';

const Scroll = (props) => {
    return (
        <Container maxWidth='false' className='scroll br3'>
            {props.children}
        </Container>
    )
}

export default Scroll;