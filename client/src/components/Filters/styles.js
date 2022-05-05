import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        width: '100%',
        padding: '15px 30px'
    },
    priceSlider:{
        marginTop: '35px'
    },
    formBox:{
        margin: '10px 0'
    },
    inputBox: {
        margin: '10px 0'
    },
    balance:{
        display: 'flex',
        justifyContent: 'space-between'
    },
    input: {
        width: '49%'
    }
})