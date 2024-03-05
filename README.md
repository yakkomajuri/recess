# recess

a social media for blogs and personal websites, or something

vision:
- a content aggregator
- a discovery tool
- a unified platform for discussions on siloed content

(code is currently a mess btw)

![recess](./recess.png)

# to run

the backend will run on localhost:8000 and the frontend will be accessible on localhost:3000.

## backend

from the root directory, run:

```shell
# recommended to use pyenv or virtualenv
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## frontend

from the root directory, run:

```shell
cd frontend
yarn install
yarn start
```

# to use

- create an account
- import a feed. here's a suggestion: `https://memoirsandrambles.substack.com/feed` :)
- play around

