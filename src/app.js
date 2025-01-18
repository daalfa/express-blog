const express = require('express');
const app = express();
const port = 8000;
const postRoutes = require('./routes/postRouter');
const commentRoutes = require('./routes/commentRouter');

app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/posts', commentRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});