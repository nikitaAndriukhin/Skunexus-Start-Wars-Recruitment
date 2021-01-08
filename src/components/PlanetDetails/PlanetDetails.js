import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { fetchPlanet } from '../../redux/modules/planets';
import Grid from '../Grid';
import Spinner from '../Spinner';

function PlanetDetails() {
  const { id } = useParams();
  const planet = useSelector((state) => state.planets.details[id]);
  const dispatch = useDispatch();
  const { fetching } = useSelector((state) => state.planets);
  const header = [
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

  useEffect(() => {
    if (!planet) {
      dispatch(fetchPlanet(id));
    }
  }, [dispatch, planet, id]);

  return (
    <div className="App">
      {fetching ? <Spinner /> : <Grid data={{ header, values: [planet] }} />}
    </div>
  );
}

export default PlanetDetails;
