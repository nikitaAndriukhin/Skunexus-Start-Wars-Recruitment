import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { fetchPlanet, fetchResidents } from '../../redux/modules/planets';
import Grid from '../Grid';
import Spinner from '../Spinner';

function Residents() {
  const { id } = useParams();
  const planet = useSelector((state) => state.planets.details[id]);
  const dispatch = useDispatch();
  const { fetching } = useSelector((state) => state.planets);

  const header = [
    { colName: 'name' },
    { colName: 'height', type: 'number' },
    { colName: 'mass', type: 'number' },
    { colName: 'hair_color' },
    { colName: 'skin_color' },
    { colName: 'eye_color' },
    { colName: 'birth_year' },
    { colName: 'gender' },
  ];

  useEffect(() => {
    if (planet && planet.residentsData) return;

    if (planet) {
      dispatch(fetchResidents({ id, residents: planet.residents }));
    } else {
      dispatch(fetchPlanet(id));
    }
  }, [dispatch, planet, id]);

  return (
    <div className="App">
      {fetching ? <Spinner /> : <Grid data={{ header, values: planet.residentsData }} />}
    </div>
  );
}

export default Residents;
