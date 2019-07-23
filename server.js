const express = require('express');
const app = express();

app.use(express.static('build', {
    setHeaders: res => res.req.path.split("/")[1] === "static" && res.setHeader('Cache-Control', 'max-age=31536000')
}));

app.use('/api', require('./src/server'));

app.get("/*", (req, res) => {
    return res.sendFile(__dirname+'/build/index.html');
});

app.listen(process.env.PORT || 5000, () => console.log(`Server is listening on port ${process.env.PORT || 5000}`));
