# ASP.NET Core / NodeServices/ Puppeteer

Sample app to generate a pdf from HTML using headless Chrome in ASP.NET Core.

## To run

```
docker-compose build
```

Then run the image as a container using

```
docker run -d -p 8000:80 puppeteer
```