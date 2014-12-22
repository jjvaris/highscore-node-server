highscore-node-server
=====================

Node.js + MongoDB highscore server backend for your games. Stores top 10 daily, weekly and all time highscores. Server caches top highscores into a file (default: every 1 sec). This allows enormous number of concurrent users.

#API
* post highscore
* get highscores (JSON response)
* increase total play count
* get total play count

#Requirements
* Node.js
* MongoDB

#How to use
1. 'npm install'
2. edit config/secretKey.js to use your own hashkey. Check highscore.js exports.addHighscore how the hash is generated.
3. 'node app.js' or 'grunt'
