import Express from 'express';

const app = Express();

app.get('/', (req, res) => {
  res.send('Welcome to Recycle Austin!');
});

app.listen(3000);
console.log('App started on port 3000.');