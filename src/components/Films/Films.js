import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { loadPlanet, loadFilms } from '../../redux/modules/planets';
import Grid from '../Grid';
import Spinner from '../Spinner';

function Films() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const planet = useSelector((state) => state.planets.details[id]);
  const { loading } = useSelector((state) => state.planets);
  const header = [
    { columnName: 'title' },
    { columnName: 'episode_id', type: 'number' },
    { columnName: 'opening_crawl' },
    { columnName: 'director' },
    { columnName: 'producer' },
    { columnName: 'release_date' },
  ];

  useEffect(() => {
    if (planet && planet.filmsData) return;

    if (planet) {
      dispatch(loadFilms({ id, films: planet.films }));
    } else {
      dispatch(loadPlanet(id));
    }
  }, [dispatch, planet, id]);

  return (
    <div className="App">
      {loading ? <Spinner /> : <Grid data={{ header, values: planet.filmsData }} />}
    </div>
  );
}

export default Films;
