---
title: Como usar pm2 para deploy de suas aplicações node
date: '2020-08-14T13:45:10.015Z'
lang: pt-br
tags: ['Seedling', 'javascript', 'node']
description: Um tutorial de como usar o pm2 facilmente para implantar seus aplicativos
---

`npm install --save-dev pm2 dotenv`

`npm install —global pm2`

`pm2 deploy production setup`

Configure the envs _for your server_ `.env`

`cd /home/username/www/example.com/source`

`cp .env.example .env`

`vi .env` or `node .env`

**.gitignore**

```
.env
```

**.env.example**

```shell
# envs for your local
DEPLOY_NAME=application.backend
DEPLOY_USER=username
DEPLOY_HOST=localhost
DEPLOY_PATH=/home/username/www/example.com

# envs for your server
DATABASE_URL=mysql://user:password@127.0.0.1:3306/database
```

**ecosystem.config.js**

```jsx
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: process.env.DEPLOY_NAME,
      script: './src/server.js',
      env: {
        COMMON_VARIABLE: 'true',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_HOST,
      ref: 'origin/master',
      repo: 'git@github.com:username/repo.git',
      path: process.env.DEPLOY_PATH,
      'post-deploy': [
        'npm install',
        // add here the commands that you application needs after install
        // 'npm run sequelize db:migrate',
        `pm2 reload ecosystem.config.js --env production --name ${process.env.DEPLOY_NAME}`,
      ].join(' && '),
    },
  },
};
```

`pm2 deploy production`
