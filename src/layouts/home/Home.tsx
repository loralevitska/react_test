import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { useSelector } from 'react-redux';

import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box, CircularProgress, MenuItem } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Header from '../components/Header';
import { getFeeds } from '../../api';
import { Feed } from '../components/Feed';
import { FeedAdminCard } from '../feeds/FeedAdminCard';

const PAGE_SIZE = 3;
const PAGE_SIZES = [3, 5, 10];

type State = {
  user: {
    isLoading: boolean,
    error: string,
    user: {
      id: number,
    },
  }
};

type FeedType = {
  id: number,
  title: string,
  link: string,
  isoDate: string,
  pubDate: string,
};

function useDebounce<T>(
  initialValue: T,
  time: number,
): [T, T, React.Dispatch<T>] {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value);
    }, time);

    return () => {
      clearTimeout(debounce);
    };
  }, [value, time]);

  return [debouncedValue, value, setValue];
}

function Home() {
  const { user } = useSelector((state: State) => state.user);
  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedValue, search, setSearch] = useDebounce<string>('', 300);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    from: Number(searchParams.get('from')) || 0,
    to: Number(searchParams.get('to')) || PAGE_SIZE,
    search: searchParams.get('search') || '',
    pageSize: Number(searchParams.get('pageSize')) || PAGE_SIZE,
  });

  useEffect(() => {
    setIsLoading(true);
    getFeeds(
      { from: pagination.from, to: pagination.to, search: debouncedValue },
    ).then(({ data: response }) => {
      const { rows: itemsData, count } = response.data;

      setItems(itemsData);
      setPagination(currentState => ({ ...currentState, count }));
    })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pagination.from, pagination.to, pagination.pageSize, debouncedValue]);

  const handlePageChange = useCallback((event, page) => {
    const from = (page - 1) * pagination.pageSize;
    const to = (page - 1) * pagination.pageSize + pagination.pageSize;

    setPagination(currentState => ({ ...currentState, from, to }));
    setSearchParams(currentState => ({ ...currentState, from, to }));
  }, [pagination.pageSize]);

  const { current: handleSearchChange } = useRef((e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    setSearch(value);
    setPagination(currentState => ({ ...currentState, search: value }));
  });

  const { current: handleSelectChange } = useRef((e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +e.target.value;

    setPagination(currentState => ({
      ...currentState, from: 0, to: value, pageSize: value,
    }));
    setSearchParams(currentState => ({ ...currentState, pageSize: value }));
  });

  const paginationPage = useMemo(
    () => Math.ceil((pagination.to) / pagination.pageSize),
    [pagination.to, pagination.pageSize],
  );

  const paginationCount = useMemo(
    () => Math.ceil(pagination.count / pagination.pageSize),
    [pagination.count, pagination.pageSize],
  );

  return (
    <Container>
      <Header />

      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        style={{ margin: '20px 0px' }}
      >
        <TextField
          id="input-search"
          label="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={search}
          variant="outlined"
          onChange={handleSearchChange}
        />
        <TextField
          id="select-page-size"
          select
          label="Page size"
          defaultValue={pagination.pageSize}
          helperText="Please select page size"
          onChange={handleSelectChange}
        >
          {PAGE_SIZES.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ margin: '20px 0px' }}
      >
        <Pagination
          color="primary"
          page={paginationPage}
          count={paginationCount}
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
                    && items.map((feedItem: FeedType) => {
                      return user?.id ? (
                        <FeedAdminCard
                          key={feedItem.isoDate}
                          feed={feedItem}
                          setItems={setItems}
                        />
                      ) : (
                        (
                          <Feed
                            key={feedItem.isoDate}
                            feed={feedItem}
                          />
                        )
                      );
                    })}
        </Grid>
      )}
    </Container>
  );
}

export default Home;
