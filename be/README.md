Backend for siam-phishing using <a href="github.com/dnabil/siamauth" target="_blank">siamauth</a> as the auth/scraper.

to run the app:

1. `go get .` to get dependencies
2. `cp .env.example .env` create .env & modify as u like it
3. create the database with the same name as specified in .env file (MySQL 8.0.3)
4. `go run .` to run it
