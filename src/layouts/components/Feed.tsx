import React from 'react';
import Grid from '@mui/material/Grid';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@mui/material';
import Typography from '@mui/material/Typography';

type Props = {
  feed: {
    title: string,
    link: string,
    pubDate: string,
  };
  feedTitle: string,
};

export const Feed: React.FC<Props> = ({ feed, feedTitle }) => {
  const { title, link, pubDate } = feed;

  // eslint-disable-next-line no-console
  console.log('feed', feed);

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" target="_blank" href={link}>
        <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {pubDate.slice(0, 16)}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Etiam porta sem malesuada magna mollis euismod.
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardContent>
            <CardMedia
              component="img"
              sx={{ width: 60, display: { xs: 'none', sm: 'block' } }}
              style={{ objectFit: 'contain' }}
              image="https://miro.medium.com/v2/resize:fill:48:48/1*ty4NvNrGg4ReETxqU2N3Og.png"
              alt={feedTitle}
            />
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};
