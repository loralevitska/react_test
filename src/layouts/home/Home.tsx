import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box, CircularProgress } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import { getFeeds } from '../../api';
import { Feed } from '../components/Feed';
/* eslint-disable */
const PAGE_SIZE = 3;

type State = {
  user: {
    isLoading: boolean,
    error: string,
    user: {},
  }
};

function Home() {
  const { user } = useSelector((state: State) => state.user);
  const [feed, setFeed] = useState({});
  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    count: 0,
    from: searchParams.get('from') || 0,
    to: searchParams.get('to') || PAGE_SIZE,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getFeeds({ from: pagination.from, to: pagination.to }).then(({ data: response }) => {
      const { feed: feedData, items: itemsData, count } = response.data;

      setFeed(feedData);
      setItems(itemsData);
      setPagination(currentState => ({ ...currentState, count }));
    })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pagination.from, pagination.to]);

  const handlePageChange = (event, page) => {
    const from = (page - 1) * PAGE_SIZE;
    const to = (page - 1) * PAGE_SIZE + PAGE_SIZE;

    setPagination(currentState => ({ ...currentState, from, to }));
    setSearchParams({ from, to });
  };

  return (
    <Container>
      <Header />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ margin: '20px 0px' }}
      >
        <Pagination
          color="primary"
          page={Math.ceil((pagination.to) / PAGE_SIZE)}
          count={Math.ceil(pagination.count / PAGE_SIZE)}
          onChange={handlePageChange}
        />
      </Box>
      {isLoading ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: '10%' }}
        >
          <CircularProgress color="primary" />
        </Grid>
      ) : (
        <Grid
          container
          spacing={1}
          justifyContent="center"
          sx={{ marginTop: '20px' }}
          columns={6}
        >
          {items.length
                    && items.map(feedItem => (
                      <Feed
                        key={feedItem.isoDate}
                        feed={feedItem}
                        feedTitle={feed.title}
                      />
                    ))}
        </Grid>
      )}
    </Container>
  );
}

export default Home;
