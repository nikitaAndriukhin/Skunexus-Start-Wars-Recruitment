import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import './Planets.css';
import { fetchPlanets } from '../../redux/modules/planets';
import Grid from '../Grid';
import Spinner from '../Spinner';
import Modal from '../Modal';
import PlanetForm from '../PlanetForm';

function Planets({ children }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { fetching, data, nextQuery } = useSelector((state) => state.planets);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const defaultHeader = [
    { colName: 'name' },
    { colName: 'rotation_period', type: 'number' },
    { colName: 'orbital_period', type: 'number' },
    { colName: 'diameter', type: 'number' },
    { colName: 'climate' },
    { colName: 'gravity' },
    { colName: 'terrain' },
    { colName: 'surface_water', type: 'number' },
    { colName: 'population' },
  ];

  const header = typeof children === 'function' ? children(defaultHeader) : defaultHeader;

  const actions = [
    {
      label: 'Go to Films',
      action: (row) => {
        history.push(`/planets/${row.id}/films`);
      },
      isShown: (row) => row.films.length,
    },
    {
      label: 'Go to Residents',
      action: (row) => {
        history.push(`/planets/${row.id}/residents`);
      },
      isShown: (row) => row.residents.length,
    },
    {
      label: 'Go to Details',
      action: (row) => {
        history.push(`/planets/${row.id}`);
      },
    },
    {
      label: 'Edit planet',
      action: (row) => {
        setSelectedPlanet(row);
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchPlanets());
  }, [dispatch]);

  const isFirstLoad = fetching && !data.length;
  const isLoadingMore = fetching && !!data.length;
  const canLoadMore = !fetching && nextQuery;

  return (
    <div className="App">
      {isFirstLoad ? <Spinner /> : <Grid data={{ header, actions, values: data }} />}
      {isLoadingMore && <Spinner />}
      {canLoadMore && <button onClick={() => dispatch(fetchPlanets(nextQuery))}><p>Load more</p></button>}
      <Modal isOpen={!!selectedPlanet} onRequestClose={() => setSelectedPlanet(null)}>
        <PlanetForm planet={selectedPlanet} />
      </Modal>
    </div>
  );
}

Planets.propTypes = {
  children: PropTypes.func,
};

export default Planets;
