import './App.css';

import Planets from '../Planets';
import Films from '../Films';
import Residents from '../Residents';
import PlanetDetails from '../PlanetDetails';
import { Route, Switch, Redirect } from 'react-router';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/planets/:id/films">
          <h1>Star Wars Planet Films</h1>
          <Films />
        </Route>
        <Route path="/planets/:id/residents">
          <h1>Star Wars Planet Residents</h1>
          <Residents />
        </Route>
        <Route path="/planets/:id">
          <h1>Star Wars Planet Details</h1>
          <PlanetDetails />
        </Route>
        <Route path="/planets">
          <h1>Star Wars Planets</h1>
          <Planets>
            {(header) => {
              return [
                ...header,
                {
                  columnName: 'films',
                  Cell: ({ row }) => {
                    return row?.films?.length || 0;
                  },
                  type: 'number',
                },
                {
                  columnName: 'residents',
                  Cell: ({ row }) => {
                    return row?.residents?.length || 0;
                  },
                  type: 'number',
                },
              ];
            }}
          </Planets>
        </Route>
        <Route path="/">
          <Redirect to="/planets" />
        </Route>
        <Route>
          <h1>Page not found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
