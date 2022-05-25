const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/user',
    createProxyMiddleware({
      target: 'http://localhost:8080/Api/user',
      changeOrigin: true,
    })
  );
  app.use(
    '/login',
    createProxyMiddleware({
      target: 'http://localhost:8080/Api/authuser',
      changeOrigin: true,
    })
  );
  app.use(
    '/doctor',
    createProxyMiddleware({
      target: 'http://localhost:8080/Api/doctor',
      changeOrigin: true,
    })
  );


  app.use(
    '/finddoctor',
    createProxyMiddleware({
      target: 'http://localhost:8080/Api/findDoctor',
      changeOrigin: true,
    })
  );

  app.use(
    '/finduser',
    createProxyMiddleware({
      target: 'http://localhost:8080/Api/findUser',
      changeOrigin: true,
    })
  );


  app.use(
    '/appointment',
    createProxyMiddleware({
      target: 'http://localhost:8080/Api/appointment',
      changeOrigin: true,
    })
  );

  app.use(
    '/updateAppointment',
    createProxyMiddleware({
      target: 'http://localhost:8080/Api/updateAppointment',
      changeOrigin: true,
    })
  );

  app.use(
    '/findPrevUser',
    createProxyMiddleware({
      target: 'http://localhost:8080/Api/getAppointment',
      changeOrigin: true,
    })
  );

  app.use(
    '/docApp',
    createProxyMiddleware({
      target: 'http://localhost:8080/Api/docApp',
      changeOrigin: true,
    })
  );



  app.use(
    '/authdoctor',
    createProxyMiddleware({
      target: 'http://localhost:8080/Api/authdoctor',
      changeOrigin: true,
    })
  );


  app.use(
    '/authpatient',
    createProxyMiddleware({
      target: 'http://localhost:8080/Api/authpatient',
      changeOrigin: true,
    })
  );


  app.use(
    `/updateLab/*`,
    createProxyMiddleware({
      target: `http://localhost:8080/Api/updateLab/`,
      changeOrigin: true,
    })
  );


  app.use(
    `/lab/*`,
    createProxyMiddleware({
      target: `http://localhost:8080/Api/lab/`,
      changeOrigin: true,
    })
  );


  app.use(
    `/updateReport/*`,
    createProxyMiddleware({
      target: `http://localhost:8080/Api/reportUpdate/`,
      changeOrigin: true,
    })
  );


  app.use(
    `/report/*`,
    createProxyMiddleware({
      target: `http://localhost:8080/Api/report/`,
      changeOrigin: true,
    })
  );


  app.use(
    `/eachAppointment/*`,
    createProxyMiddleware({
      target: `http://localhost:8080/Api/eachAppointment/`,
      changeOrigin: true,
    })
  );


  app.use(
    `/eachLab/*`,
    createProxyMiddleware({
      target: `http://localhost:8080/Api/eachLab/`,
      changeOrigin: true,
    })
  );


  app.use(
    `/eachReport/*`,
    createProxyMiddleware({
      target: `http://localhost:8080/Api/eachReport/`,
      changeOrigin: true,
    })
  );




  app.use(
    `/getRow/*`,
    createProxyMiddleware({
      target: `http://localhost:8080/Api/rowCount/`,
      changeOrigin: true,
    })
  );

  app.use(
    `/AllLab/*`,
    createProxyMiddleware({
      target: `http://localhost:8080/Api/AllLab/`,
      changeOrigin: true,
    })
  );




  app.use(
    `/AllReport`,
    createProxyMiddleware({
      target: `http://localhost:8080/Api/AllReport`,
      changeOrigin: true,
    })
  );




};