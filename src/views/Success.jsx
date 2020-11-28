import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import {closeDialog} from '../redux/actions/closeDialog';
import {useHistory} from 'react-router-dom'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const _Success=(props)=> {
  const [open, setOpen] = React.useState(false);
  const history = useHistory()

  const handleClose = () => {
    props.closeDialog();
    history.push("/index")
  };
  console.log(props)
  return (
    <div>
      <Dialog onClose={props.dismiss} aria-labelledby="customized-dialog-title" open={true}>
        <DialogTitle id="customized-dialog-title" onClose={props.dismiss}>
          {props.headerText}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {props.bodyText}
           </Typography>
        </DialogContent>
        <DialogActions>
            {props.successButton.map((i)=>{
                return (<Button variant="outlined" autoFocus onClick={i.handleClose} color="primary">
                {i.buttonText}
              </Button>)
            })}
        </DialogActions>
      </Dialog>
    </div>
  );
}
function mapStateToProps(state) {
    return {result: state.add.success}
  }
const Success = connect(mapStateToProps,{closeDialog})(_Success);
export default Success