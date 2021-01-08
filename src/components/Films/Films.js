import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { fetchPlanet, fetchFilms } from '../../redux/modules/planets';
import Grid from '../Grid';
import Spinner from '../Spinner';

function Films() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const planet = useSelector((state) => state.planets.details[id]);
  const { fetching } = useSelector((state) => state.planets);
  const header = [
    { colName: 'title' },
    { colName: 'episode_id', type: 'number' },
    { colName: 'opening_crawl' },
    { colName: 'director' },
    { colName: 'producer' },
    { colName: 'release_date' },
  ];

  useEffect(() => {
    if (planet && planet.filmsData) return;

    if (planet) {
      dispatch(fetchFilms({ id, films: planet.films }));
    } else {
      dispatch(fetchPlanet(id));
    }
  }, [dispatch, planet, id]);

  return (
    <div className="App">
      {fetching ? <Spinner /> : <Grid data={{ header, values: planet.filmsData }} />}
    </div>
  );
}

export default Films;
