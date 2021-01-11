import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { loadPlanet, loadResidents } from '../../redux/modules/planets';
import Grid from '../Grid';
import Spinner from '../Spinner';

function Residents() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const planet = useSelector((state) => state.planets.details[id]);
  const { loading } = useSelector((state) => state.planets);
  

  const header = [
    { columnName: 'name' },
    { columnName: 'height', type: 'number' },
    { columnName: 'mass', type: 'number' },
    { columnName: 'hair_color' },
    { columnName: 'skin_color' },
    { columnName: 'eye_color' },
    { columnName: 'birth_year' },
    { columnName: 'gender' },
  ];

  useEffect(() => {
    if (planet && planet.residentsData) return;

    if (planet) {
      dispatch(loadResidents({ id, residents: planet.residents }));
    } else {
      dispatch(loadPlanet(id));
    }
  }, [dispatch, planet, id]);

  return (
    <div className="App">
      {loading ? <Spinner /> : <Grid data={{ header, values: planet.residentsData }} />}
    </div>
  );
}

export default Residents;
