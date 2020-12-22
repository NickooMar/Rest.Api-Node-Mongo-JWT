import app from './app'
import './database'


app.listen(app.get('port'));
console.log(`servers on port ${app.get('port')}`);