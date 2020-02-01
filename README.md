# Дипломный проект студента Яндекс.Практикума.

FRONTEND приложения располагается на домене:
**https://news-explorer.ga/**

Для запуска проекта необходимо выполнить npm install в корне проекта.

Сборка проекта реализована через Webpack.

API приложение располагается на домене:
**https://api.news-explorer.ga/**

##### GET /users/me
> Возвращает информацию о пользователе (email и имя)

##### GET /articles
> Возвращает все сохранённые статьи

##### POST /articles
> Создаёт статью с переданными в теле
> - keyword
> - title
> - text
> - date
> - source
> - link
> - image

##### DELETE /articles/articleId
> Удаляет статью по _id

##### POST /signup
>  создаёт пользователя с переданными в теле
> - email
> - password
> - name

##### POST /signin
> проверяет переданные в теле почту и пароль и возвращает JWT
