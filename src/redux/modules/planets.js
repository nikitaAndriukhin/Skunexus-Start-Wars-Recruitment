import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  data: [],
  loading: true,
  nextQuery: '',
  details: {},
};

export const loadPlanet = createAsyncThunk('planets/fetchOne', async (planetId) => {
  return api.fetchPlanet(planetId);
});

export const loadPlanets = createAsyncThunk('planets/fetch', async (nextPageQuery) => {
  return api.fetchPlanets(nextPageQuery);
});

export const loadFilms = createAsyncThunk('planets/loadFilms', async ({ films }) => {
  return api.fetchResources(films);
});

export const loadResidents = createAsyncThunk('planets/loadResidents', async ({ residents }) => {
  return api.fetchResources(residents);
});

const handlePendingAction = (state) => {
  state.loading = true;
};

const handleRejectedAction = (state) => {
  state.loading = false;
};

const fetchPlanetIdFromUrl = (url) => url.match(/(?<=planets\/)\d+(?=\/$)/)[0];

export const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  extraReducers: {
    [loadResidents.pending]: handlePendingAction,
    [loadFilms.pending]: handlePendingAction,
    [loadPlanet.pending]: handlePendingAction,
    [loadPlanets.pending]: handlePendingAction,
    [loadPlanets.fulfilled]: (state, { payload }) => {
      const { next, results } = payload;
      const planetsWithIds = results.map((planet) => ({
        ...planet,
        id: fetchPlanetIdFromUrl(planet.url),
      }));
      state.data.push(...planetsWithIds);
      planetsWithIds.forEach((planet) => (state.details[planet.id] = planet));

      state.nextQuery = typeof next === 'string' ? next.split('?')[1] : '';
      state.loading = false;
    },
    [loadFilms.fulfilled]: (state, { payload, meta: { arg } }) => {
      state.details[arg.id].filmsData = payload;
      state.loading = false;
    },
    [loadResidents.fulfilled]: (state, { payload, meta: { arg } }) => {
      state.details[arg.id].residentsData = payload;
      state.loading = false;
    },
    [loadPlanet.fulfilled]: (state, { payload, meta: { arg: id } }) => {
      state.details[id] = payload;
      state.loading = false;
    },
    [loadResidents.rejected]: handleRejectedAction,
    [loadFilms.rejected]: handleRejectedAction,
    [loadPlanet.rejected]: handleRejectedAction,
    [loadPlanets.rejected]: handleRejectedAction,
  },
});

export default planetsSlice.reducer;
