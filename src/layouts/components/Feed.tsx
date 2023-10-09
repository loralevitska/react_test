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
};

export const Feed: React.FC<Props> = ({ feed }) => {
  const { title, link, pubDate } = feed;

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
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardContent>
            <CardMedia
              component="img"
              sx={{ width: 60, display: { xs: 'none', sm: 'block' } }}
              style={{ objectFit: 'contain' }}
              image="https://thenounproject.com/api/private/icons/1171202/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0"
              alt="media icon"
            />
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};
