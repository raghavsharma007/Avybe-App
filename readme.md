clone the repo
### Three ways to run the app:
1. bash script (need node and python to be installed)
2. docker compose (needs only docker environment)
3. Basic way

## Bash Script
```
$ bash run.sh
```
open app at http://localhost:8000

## Docker compose
```
$ docker-compose build
$ docker-compose up -d
```
open app at http://localhost:3000

test username and password for login
```
username = avybe
password = admin@123
```
## Basic way (without build)
```
$ cd backend
$ pip install -r requirements.txt
$ python manage.py runserver
$ cd ../frontend
$ npm install
$ npm start
```
app: http://locahost:3000

## Basic way (with build)
```
$ cd backend
$ pip install -r requirements.txt
$ python manage.py runserver
$ cd ../frontend
$ npm install
$ npm run build
```
app: http://locahost:8000


