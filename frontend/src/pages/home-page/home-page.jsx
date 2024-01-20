import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { IoSearchSharp } from 'react-icons/io5';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';

import { Button, CustomSelect, Input, Loader } from '../../components';
import { CardHotel } from './components';
import { PATH, DEVICE } from '../../constants';
import { categoryOptions, quantityOptions } from './constants/select-options';
import { BlockWrapper } from '../../containers';
import { transformHotel } from '../../transforms';
import { request } from '../../utils';
import { getSearchParams } from './utils/get-search-params';

const Wrapper = styled.div``;

const CardListWrapper = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2.2rem;

  @media (${DEVICE.SMALL}) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 330px));
  }
`;

const Buttons = styled.div`
  display: flex;
`;

const ErrorMessage = styled.p`
  color: red;
  font-style: italic;
  margin-top: 0;
`;

const SearchHotelForm = styled.form``;

export const HomePage = () => {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      city: 'Москва',
      quantity: '',
      category: '',
    },
  });

  const [hotels, setHotels] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [page, setPage] = useState(1);

  const LIMIT = 8;

  const onSubmit = (formData) => {
    setRequestError(null);
    setPage(1);
    reset();

    const searchParams = getSearchParams(formData);

    setSearchParams(searchParams);

    setLoading(true);

    request({ url: '/hotels', params: { ...searchParams, limit: LIMIT } }).then(
      ({ hotels, lastPage, count }) => {
        setTotal(count);
        setHotels(hotels);
        setLoading(false);
      },
    );
  };

  const onScroll = (page) => {
    request({
      url: '/hotels',
      params: { ...searchParams, page, limit: LIMIT },
    }).then((res) => {
      setHotels((state) => [...state, ...res.hotels]);
    });
  };

  return (
    <Wrapper>
      {loading && <Loader />}
      <BlockWrapper>
        <Buttons>
          <Button>
            <Link to={PATH.COUNTRIES}>Countries</Link>
          </Button>
          <Button margin="0 2rem">Posts</Button>
        </Buttons>
        <BlockWrapper>
          <SearchHotelForm onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="search"
              title={<IoSearchSharp size="20" />}
              margin="0 0 0 2rem"
              placeholder="city..."
              width="100%"
              {...register('city')}
              disabled
            />
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  options={quantityOptions}
                  margin="2rem 0"
                  placeholder="Количество человек..."
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  options={categoryOptions}
                  margin="2rem 0"
                  placeholder="Категория жилого помещения..."
                />
              )}
            />
            <Button
              padding="0.24rem"
              content="center"
              width="100%"
              type="submit"
            >
              Найти
            </Button>
          </SearchHotelForm>
        </BlockWrapper>
        {requestError && <ErrorMessage>{requestError}</ErrorMessage>}
        <InfiniteScroll
          dataLength={hotels.length}
          next={() => {
            setPage(page + 1);
            onScroll(page + 1);
          }}
          hasMore={total > hotels.length}
          loader={<h4>Loading...</h4>}
        >
          <CardListWrapper>
            {hotels.map((hotel) => (
              <CardHotel key={hotel.id} hotel={transformHotel(hotel)} />
            ))}
          </CardListWrapper>
        </InfiniteScroll>
      </BlockWrapper>
    </Wrapper>
  );
};
