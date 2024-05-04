'use client';

import React, { useEffect, useMemo, useState } from 'react';
import cx from 'clsx';
import {
  Avatar,
  Badge,
  Checkbox,
  ComboboxItemGroup,
  Container,
  Group,
  Input,
  LoadingOverlay,
  MultiSelect,
  Pagination,
  rem,
  ScrollArea,
  Select,
  Stack,
  Table,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useStepperFormContext } from '@contexts/MyAnimeListStepContext';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Anime, AnimeType, Genre, GenresFilter, JikanResponse } from '@tutkli/jikan-ts';
import { JikanClient } from '@utils';

import styles from './styles.module.css';
import { IconSearch } from '@tabler/icons-react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { ITableFilter } from '@components/myanimelist/myanimelist';

dayjs.extend(isBetween);

export default function ChooseAnimeStep() {
  const stepForm = useStepperFormContext();
  const { colors } = useMantineTheme();

  const [filmSelected, setFilmSelected] = useState<string[]>([]);

  const [maxPage, setMaxPage] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableFilter, setTableFilter] = useState<ITableFilter>();

  const { data: animeGenres, isFetching: isGenresFetching } = useQuery<Array<ComboboxItemGroup>>({
    queryFn: async () => {
      const genresFilterList = Object.values(GenresFilter);
      const apiGenresList = genresFilterList.map((filterItem) =>
        JikanClient.jikan.genres.getAnimeGenres(filterItem)
      );
      const genresData = await Promise.all(apiGenresList);

      return genresFilterList.map((genresKey, index) => {
        return {
          group: genresKey.replaceAll('_', ' '),
          items: (genresData[index] ?? []).data.map((genre) => ({
            label: `${genre.name} (${genre.count})`,
            value: genre.name,
          })),
        };
      });
    },
    queryKey: ['jikan-anime-genres'],
  });

  const { data, isFetching } = useQuery<JikanResponse<Array<Anime>>>({
    queryFn: async () =>
      await JikanClient.top.getTopAnime({
        page: currentPage,
        type: tableFilter?.type,
      }),
    queryKey: ['jikan-list-anime', currentPage, tableFilter?.type],
    placeholderData: keepPreviousData,
  });

  const animeDataWithFilter = useMemo(() => {
    if (tableFilter === undefined) {
      return data;
    }
    return {
      ...data,
      data: data?.data.filter((anime) => {
        const filterFieldList = [];

        if (tableFilter.genres) {
          filterFieldList.push('genres');
        }

        if (tableFilter.title) {
          filterFieldList.push('title');
        }

        return filterFieldList.every((filterField) => {
          if (filterField !== 'genres') {
            const valueFilter = tableFilter?.[filterField as keyof ITableFilter]
              ?.toString()
              .toLowerCase()
              .trim();

            const valueAnimeFilter = anime?.[filterField as keyof Anime]
              ?.toString()
              .toLowerCase()
              .trim();

            if (valueFilter && valueAnimeFilter) {
              return valueAnimeFilter.includes(valueFilter);
            }

            return true;
          } else {
            if (filterField === 'genres') {
              if (tableFilter.genres && tableFilter.genres.length === 0) {
                return true;
              }

              return anime.genres.some((genre) => tableFilter.genres?.includes(genre.name));
            } else {
              return false;
            }
          }
        });
      }),
    };
  }, [tableFilter, data]);

  const isSelectedAllFilm = data?.data.every((anime) =>
    filmSelected.includes(anime.mal_id.toString())
  );
  const isSelectedPartOfFilm = () => {
    const filmSelectedOfCurrentFilmData =
      data?.data.filter((anime) => filmSelected.includes(anime.mal_id.toString())) ?? [];

    return (
      filmSelectedOfCurrentFilmData.length > 0 &&
      data?.data.length !== filmSelectedOfCurrentFilmData.length
    );
  };

  console.log(tableFilter?.genres);

  useEffect(() => {
    if (data && data?.pagination) {
      if (maxPage === -1 && data?.pagination.last_visible_page) {
        setMaxPage(data?.pagination.last_visible_page);
      }
    }
  }, [data]);

  useEffect(() => {
    if (data && data?.pagination) {
      if (data?.pagination.last_visible_page) {
        setMaxPage(data?.pagination.last_visible_page);
      }
    }
  }, [data, tableFilter?.type]);

  useEffect(() => {
    setCurrentPage(1);
  }, [tableFilter?.type]);

  const onToggleCheckAllAnime = () => {
    setFilmSelected((prevState) => {
      const selectedAllFilm = data?.data.every((item) =>
        prevState.includes(item.mal_id.toString())
      );

      const filmIdList = data?.data.map((item) => item.mal_id.toString()) ?? [];
      if (selectedAllFilm) {
        return prevState.filter((item) => !filmIdList.includes(item));
      }
      return [...prevState, ...filmIdList];
    });
  };

  const onToggleCheckAnime = (anime: Anime) => {
    setFilmSelected((prevState) =>
      prevState.includes(anime.mal_id.toString())
        ? prevState.filter((item) => item !== anime.mal_id.toString())
        : [...prevState, anime.mal_id.toString()]
    );
  };

  const onBadgeGenreClick = (genre: Genre) => {
    let _cloneGenresFilter = [...(tableFilter?.genres ?? [])];
    if (!tableFilter?.genres?.includes(genre.name)) {
      _cloneGenresFilter.push(genre.name);
    } else {
      _cloneGenresFilter = _cloneGenresFilter.filter((_genre) => _genre !== genre.name);
    }

    setTableFilter((prevState) => ({
      ...prevState,
      genres: _cloneGenresFilter,
    }));
  };

  return (
    <Container fluid py={10} px={0} className={styles.container}>
      <Pagination
        siblings={3}
        boundaries={1}
        total={maxPage}
        value={currentPage}
        onChange={setCurrentPage}
        className={styles.paginator}
      />

      {/*filter container*/}
      <Stack className={styles.filterContainer}>
        <Title order={4}>Filter By</Title>
        <Group>
          <Input
            placeholder="Anime name"
            leftSection={<IconSearch size={16} />}
            value={tableFilter?.title}
            onChange={(event) => {
              setTableFilter((prevState) => ({
                ...prevState,
                title: event.currentTarget.value,
              }));
            }}
          />

          <Select
            searchable
            value={tableFilter?.type}
            onChange={(value) => {
              setTableFilter((prevState) => ({
                ...prevState,
                type: value as AnimeType,
              }));
            }}
            placeholder="Pick anime type"
            nothingFoundMessage="Nothing found... 😭"
            data={Object.values(AnimeType)}
          />

          <MultiSelect
            clearable
            searchable
            data={animeGenres}
            value={tableFilter?.genres}
            comboboxProps={{ zIndex: 20 }}
            onChange={(value) => {
              setTableFilter((prevState) => ({
                ...prevState,
                genres: value,
              }));
            }}
            placeholder="Pick anime genre"
            classNames={{ groupLabel: styles.groupLabel }}
            nothingFoundMessage={isGenresFetching ? 'Fetching... 🛜' : 'Nothing found... 😭'}
          />
        </Group>
      </Stack>

      <ScrollArea className={styles.child} type={'scroll'}>
        <LoadingOverlay
          zIndex={10}
          visible={isFetching}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'blue', type: 'dots' }}
        />
        <Table stickyHeader striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Td>
                <Checkbox
                  checked={isSelectedAllFilm}
                  onChange={onToggleCheckAllAnime}
                  indeterminate={isSelectedPartOfFilm()}
                />
              </Table.Td>
              <Table.Td>
                <Title order={5}>Thumbnail</Title>
              </Table.Td>
              <Table.Td>
                <Title order={5}>Title</Title>
              </Table.Td>
              <Table.Td>
                <Title order={5}>Genres</Title>
              </Table.Td>
              <Table.Td>
                <Title order={5}>Aired</Title>
              </Table.Td>
              <Table.Td>
                <Title order={5}>Type</Title>
              </Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {animeDataWithFilter?.data?.map((anime) => {
              const selected = filmSelected.includes(anime.mal_id.toString());
              return (
                <Table.Tr
                  key={anime.mal_id}
                  onClick={() => onToggleCheckAnime(anime)}
                  className={cx({ [styles.rowSelected]: selected })}
                >
                  <Table.Td>
                    <Checkbox checked={selected} onChange={() => onToggleCheckAnime(anime)} />
                  </Table.Td>
                  <Table.Td>
                    <Avatar
                      radius={'xs'}
                      style={{
                        width: rem(52),
                        height: rem(75),
                      }}
                      src={anime.images.jpg.large_image_url}
                    />
                  </Table.Td>
                  <Table.Td>
                    <Text fw={'bold'} size={'sm'} mb={rem(5)}>
                      {anime.title}
                    </Text>
                    <Text lineClamp={2} size={'sm'} w={rem(window.innerWidth / 3)}>
                      {anime.synopsis}
                    </Text>
                  </Table.Td>
                  {/*<Table.Td>{anime.genres.map((genre) => genre.name).join(', ')}</Table.Td>*/}
                  <Table.Td>
                    {anime.genres.map((genre) => {
                      return (
                        <Badge
                          classNames={{ label: styles.badgeLabel, root: styles.badgeRoot }}
                          onClick={() => onBadgeGenreClick(genre)}
                        >
                          {genre.name}
                        </Badge>
                      );
                    })}
                  </Table.Td>
                  <Table.Td>{dayjs(anime.aired.from).format('DD-MM-YYYY')}</Table.Td>
                  <Table.Td>{anime.type}</Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
}
