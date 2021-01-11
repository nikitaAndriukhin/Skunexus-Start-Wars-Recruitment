import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { loadPlanet } from '../../redux/modules/planets';
import Grid from '../Grid';
import Spinner from '../Spinner';

const header = [
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

function PlanetDetails() {
  const { id } = useParams();
  const planet = useSelector((state) => state.planets.details[id]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.planets);

  useEffect(() => {
    if (!planet) {
      dispatch(loadPlanet(id));
    }
  }, [dispatch, planet, id]);

  return (
    <div className="App">
      {loading ? <Spinner /> : <Grid data={{ header, values: [planet] }} />}
    </div>
  );
}

export default PlanetDetails;
