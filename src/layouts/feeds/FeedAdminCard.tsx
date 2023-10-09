import React from 'react';
import Grid from '@mui/material/Grid';
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
} from '@mui/material';
import Typography from '@mui/material/Typography';
/*eslint-disable*/
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import {deleteFeed, editFeedTitle} from '../../api';

type Props = {
  feed: {
    title: string,
    link: string,
    pubDate: string,
  };
};

export const FeedAdminCard: React.FC<Props> = ({ feed, setItems }) => {
  const { title, link, pubDate } = feed;

  const [open, setOpen] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [feedTitle, setFeedTitle] = React.useState(title);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmEdit = () => {
    editFeedTitle({ id: feed.id, title: feedTitle.trim() });
    handleClose();
    setItems((prevState: any[]) => prevState.map(item => {
      if (item.id === feed.id) {
        return {
          ...item,
          title: feedTitle.trim(),
        }
      }

      return item;
    }));
  };

  const handleConfirmDelete = () => {
    deleteFeed({ id: feed.id });
    handleCloseDeleteDialog();
    setItems((prevState: any[]) => {
      const newState = [...prevState];
      const feedIndex = newState.findIndex(item => item.id === feed.id);

      newState.splice(feedIndex, 1);

      return newState;
    });
  };

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea>
        <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {pubDate.slice(0, 16)}
            </Typography>
            <Typography variant="subtitle1" color="primary" component="a" target="_blank" href={link}>
              Continue reading...
            </Typography>
          </CardContent>
          <Box>
            <Box>
              <Button variant="outlined" onClick={handleClickOpen}>
                Edit feed title
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit dialog</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To edit title enter new values into field below
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="feedTitle"
                    label="Feed title"
                    fullWidth
                    variant="standard"
                    value={feedTitle}
                    onChange={(e) => {
                      setFeedTitle(e.target.value);
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleConfirmEdit}>Edit</Button>
                </DialogActions>
              </Dialog>
            </Box>
            <Box>
              <Tooltip title="Delete" onClick={handleClickOpenDeleteDialog}>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogActions>
                  <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                  <Button onClick={handleConfirmDelete}>Delete</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </Card>
      </CardActionArea>
    </Grid>
  );
};
