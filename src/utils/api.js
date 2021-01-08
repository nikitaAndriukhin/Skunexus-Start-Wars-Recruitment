import axios from 'axios';

const axiosAPIInstance = axios.create({
  timeout: 6000,
  timeoutErrorMessage: 'Please check your network',
});


class API {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async getPlanets(nextPageQuery = '') {
    const response = await this.axios.get(`https://swapi.dev/api/planets?${nextPageQuery}`);
    return response.data;
  }

  async getPlanet(planetId = 1) {
    const response = await this.axios.get(`https://swapi.dev/api/planets/${planetId}/`);
    return response.data;
  }

  async getResources(resourcesArray) {
    const results = await Promise.all(
      resourcesArray.map((resourceUrl) => {
        return this.axios
          .get(resourceUrl)
          .catch((error) => alert(`Cannot load resource ${resourceUrl} ${error.message}`));
      })
    );
    return results.filter((response) => response).map((response) => response.data);
  }
}

const api = new API(axiosAPIInstance);

export { API };
export default api;
