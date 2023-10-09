import React, { useCallback, useRef } from 'react';
import Grid from '@mui/material/Grid';
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
} from '@mui/material';
import Typography from '@mui/material/Typography';
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

import { deleteFeed, editFeedTitle } from '../../api';

type Props = {
  feed: {
    id: number,
    title: string,
    link: string,
    pubDate: string,
  };
  setItems: React.Dispatch<React.SetStateAction<any>>
};

export const FeedAdminCard: React.FC<Props> = ({ feed, setItems }) => {
  const { title, link, pubDate } = feed;

  const [open, setOpen] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [feedTitle, setFeedTitle] = React.useState(title);

  const { current: handleOpen } = useRef(() => setOpen(true));
  const { current: handleClose } = useRef(() => setOpen(false));
  const { current: handleClickOpenDeleteDialog } = useRef(() => setOpenDeleteDialog(true));
  const { current: handleCloseDeleteDialog } = useRef(() => setOpenDeleteDialog(false));

  const { current: handleChange } = useRef((e: React.ChangeEvent<HTMLInputElement>): void => {
    setFeedTitle(e.target.value);
  });

  const handleConfirmEdit = useCallback(() => {
    editFeedTitle({ id: feed.id, title: feedTitle.trim() });

    setItems((prevState: any[]) => prevState.map(item => {
      if (item.id === feed.id) {
        return {
          ...item,
          title: feedTitle.trim(),
        };
      }

      return item;
    }));

    handleClose();
  }, [feed.id, feedTitle]);

  const handleConfirmDelete = useCallback(
    () => {
      deleteFeed({ id: feed.id });
      handleCloseDeleteDialog();
      setItems((prevState: any[]) => {
        const newState = [...prevState];
        const feedIndex = newState.findIndex(item => item.id === feed.id);

        newState.splice(feedIndex, 1);

        return newState;
      });
    },
    [feed.id],
  );

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
              <Button variant="outlined" onClick={handleOpen}>
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
                    onChange={handleChange}
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
