const axios = require('axios');

const setupAxios = () => {
  axios.interceptors.request.use(
    (req) => {
      console.info('================== Request initiated ====================');
      console.info(req.url);
      console.info(req.headers);
      console.info(req.method);
      console.info(req.params);
      console.info(req.data);
      return req;
    },
    (error) => {
      console.error('================== Error in axios request ====================');
      console.error(error.config);
      console.error(error.request);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (res) => {
      console.info('================== Response received ====================');
      console.info(res.status.toString());
      console.info(res.statusText);
      console.info(res.config);
      console.info(res.data);
      return res;
    },
    (error) => {
      console.error('================== Error in axios response ====================');
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status.toString());
        console.error(error.response.statusText);
        console.error(error.response.headers);
      }
      return Promise.reject(error);
    }
  );
};

exports.setupAxios = setupAxios;
