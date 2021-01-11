import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  data: [],
  fetching: true,
  nextQuery: '',
  details: {},
};

export const fetchPlanet = createAsyncThunk('planets/fetchOne', async (planetId) => {
  return api.getPlanet(planetId);
});

export const fetchPlanets = createAsyncThunk('planets/fetch', async (nextPageQuery) => {
  return api.getPlanets(nextPageQuery);
});

export const fetchFilms = createAsyncThunk('planets/fetchFilms', async ({ films }) => {
  return api.getResources(films);
});

export const fetchResidents = createAsyncThunk('planets/fetchResidents', async ({ residents }) => {
  return api.getResources(residents);
});

const handlePendingAction = (state) => {
  state.fetching = true;
};

const handleRejectedAction = (state) => {
  state.fetching = false;
};

const getPlanetIdFromUrl = (url) => url.match(/(?<=planets\/)\d+(?=\/$)/)[0];

export const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  extraReducers: {
    [fetchResidents.pending]: handlePendingAction,
    [fetchFilms.pending]: handlePendingAction,
    [fetchPlanet.pending]: handlePendingAction,
    [fetchPlanets.pending]: handlePendingAction,
    [fetchPlanets.fulfilled]: (state, { payload }) => {
      const { next, results } = payload;
      const planetsWithIds = results.map((planet) => ({
        ...planet,
        id: getPlanetIdFromUrl(planet.url),
      }));
      state.data.push(...planetsWithIds);
      planetsWithIds.forEach((planet) => (state.details[planet.id] = planet));

      state.nextQuery = typeof next === 'string' ? next.split('?')[1] : '';
      state.fetching = false;
    },
    [fetchFilms.fulfilled]: (state, { payload, meta: { arg } }) => {
      state.details[arg.id].filmsData = payload;
      state.fetching = false;
    },
    [fetchResidents.fulfilled]: (state, { payload, meta: { arg } }) => {
      state.details[arg.id].residentsData = payload;
      state.fetching = false;
    },
    [fetchPlanet.fulfilled]: (state, { payload, meta: { arg: id } }) => {
      state.details[id] = payload;
      state.fetching = false;
    },
    [fetchResidents.rejected]: handleRejectedAction,
    [fetchFilms.rejected]: handleRejectedAction,
    [fetchPlanet.rejected]: handleRejectedAction,
    [fetchPlanets.rejected]: handleRejectedAction,
  },
});

export default planetsSlice.reducer;
