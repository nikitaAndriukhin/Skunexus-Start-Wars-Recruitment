import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import './Planets.css';
import { loadPlanets } from '../../redux/modules/planets';
import Grid from '../Grid';
import Spinner from '../Spinner';
import Modal from '../Modal';
import PlanetForm from '../PlanetForm';

const headerDef = [
  { columnName: 'name' },
  { columnName: 'rotation_period', type: 'number' },
  { columnName: 'orbital_period', type: 'number' },
  { columnName: 'diameter', type: 'number' },
  { columnName: 'climate' },
  { columnName: 'gravity' },
  { columnName: 'terrain' },
  { columnName: 'surface_water', type: 'number' },
  { columnName: 'population' },
];

function Planets({ children }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading , data, nextQuery } = useSelector((state) => state.planets);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const header = typeof children === 'function' ? children(headerDef) : headerDef;

  const actions = [
    {
      label: 'Go to Films',
      action: (row) => {
        history.push(`/planets/${row.id}/films`);
      },
      isOpen: (row) => row.films.length,
    },
    {
      label: 'Go to Residents',
      action: (row) => {
        history.push(`/planets/${row.id}/residents`);
      },
      isOpen: (row) => row.residents.length,
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
    dispatch(loadPlanets());
  }, [dispatch]);

  const isFirstPage = loading && !data.length;
  const isLoadingNext = loading && !!data.length;
  const canLoadMore = !loading && nextQuery;
  const closeModal = () => setSelectedPlanet(null)
  
  return (
    <div className="App">
      {isFirstPage ? <Spinner /> : <Grid data={{ header, actions, values: data }} />}
      {isLoadingNext && <Spinner />}
      {canLoadMore && <button onClick={() => dispatch(loadPlanets(nextQuery))}><p>Load more</p></button>}
      <Modal isOpen={!!selectedPlanet} onClose={() => closeModal()}>
        <PlanetForm planet={selectedPlanet} closeModal={closeModal} />
      </Modal>
    </div>
  );
}

Planets.propTypes = {
  children: PropTypes.func,
};

export default Planets;
