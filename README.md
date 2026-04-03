# ITX FRONT END APPLICATION

- [Objetivos del Examen - Español](./docs/Specs-ES.md)
- [Exam Objetives - English](./docs/Specs-EN.md)
- [Application Set Up](#application-set-up)
- [Grafana K6 Tests](#grafa-k6-tests)

## <a id="application-set-up"></a>Application Set Up

By default, when the WEB APP container is built and running, the `./application` content is binded to the container at `/var/www` directory.

Once the container is built and running, you can access to it by
```bash
$ make webapp-ssh
```

### SPA static application

- Built with React + Vite — client-side only

- Uses react-router-dom for client-side routing (/ → ProductListing, /product/:id → ProductDetail)

- No SSR, no MPA, no server-rendered pages

- The API calls go to an external backend — the React app itself is purely static

The NGINX server block is configured to serve the static application. Thus, container port 80 is listened by NGINX, and container port 8080 serves the static application on `./dist`.

Local machine port to serve the static application can be selected by you in the Platform Repository `.env` file. E.g.: http://127.0.0.1:7325
<br>

### Installation

Although the application is already built, these are the installed steps and packages
```bash
$ make webapp-ssh

/var/www $ npm create vite@latest . -- --template react
/var/www $ npm cache clean --force
/var/www $ npm install react-router-dom
/var/www $ npm install axios
/var/www $ npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom eslint @eslint/js eslint-plugin-react
/var/www $ npm install bootstrap
/var/www $ npm install @fortawesome/fontawesome-free
```

## Project Directory Structure

```bash
src/
├── api/
│   └── productApi.js          # all API calls (getProducts, getProduct, addToCart)
├── cache/
│   └── cacheService.js        # localStorage + 1h TTL logic
├── components/
│   ├── Header/
│   │   └── Header.jsx
│   ├── SearchBar/
│   │   └── SearchBar.jsx
│   ├── ProductItem/
│   │   └── ProductItem.jsx
│   ├── ProductImage/
│   │   └── ProductImage.jsx
│   ├── ProductDescription/
│   │   └── ProductDescription.jsx
│   └── ProductActions/
│       └── ProductActions.jsx
├── context/
│   └── CartContext.jsx                 # cart counter global state
├── pages/
│   └── Product/
│       ├── ProductDetail.jsx           # Product Detail Page
│       ├── ProductDetail.test.jsx
│       ├── ProductListing.jsx          # Product List Page
│       └── ProductListing.test.jsx
├── App.jsx                             # routes definition
└── main.jsx                            # entry point
```

## Run Development Mode

Copy `.env.example` to `.env`

To know each container information you can execute `$ make webapp-info` so, you can access docker internal IP to:
```sh
$ make webapp-info
ITX FRONTEND EXAM: NGINX - NODEJS 25
Container ID.: fb3e8a7f0735
Name.........: itx-front-pr-webapp-dev
Image........: itx-front-pr-webapp-dev:alpine3.23-nginx-nodejs25
CPUs.........: 2.00
RAM..........: 512M
SWAP.........: 1G
Host.........: 127.0.0.1:7325
Hostname.....: 192.168.1.41:7325
Docker.Host..: 172.20.0.2           # Docker internal IP
NetworkID....: cf3432dd2cbc985b473de0d165bbe3a9109e0c198a5688fa4cad50ce739b82e6
```

As there has been set a `VITE_PORT=3000` in the `.env`, you can browse the development mode at, E.g. with the above output: http://172.20.0.2:3000
```bash
$ make webapp-ssh

/var/www $ npm run dev
```

## Lint evaluation

Run it in your terminal
```bash
$ make webapp-ssh

/var/www $ npm run lint
```

## Tests

You can run the application tests by
```bash
$ make webapp-ssh

/var/www $ npm run test
```

## Build the Application

For deployment you need to build the application
```bash
$ make webapp-ssh

/var/www $ npm run build
```

This outputs to dist/ — that's the static SPA. But there's one important thing: since it is been using client-side routing, server must redirect all requests to index.html, otherwise a direct visit to `/product/123` will return a 404.

From the Platforms Repository, `./platforms/nginx-nodejs-25/docker/config/nginx/conf.d/default.conf`
```bash
server {
    listen 80;
    server_name yourdomain.com; # Change to your domain

    charset utf-8;

    # Tell Nginx exactly where your built files live
    root /var/www/dist;

    index index.html;

    # Serve files directly and handle Router
    location / {
        # This is the SPA fallback. It tries to find the file, then the directory,
        # and if neither exists, it sends the request to index.html
        try_files $uri $uri/ /index.html;
    }

    # 2. CACHING: Optimize loading speed for static assets (JS, CSS, Images)
    location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|otf|ttf|svg|mp4|webm)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public";
    }

    # Deny access to dotfiles for security
    location ~ /\. {
        deny all;
        log_not_found off;
    }

    # Let's Encrypt support
    location ^~ /.well-known/acme-challenge/ {
        default_type "text/plain";
        root /var/www/public;
    }

    # Custom error page for 50x errors
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /var/www/public;
    }
}
```

- root `/var/www/dist` — points to the Vite build output

- `try_files $uri $uri/` -> /index.html — the SPA fallback, handles direct URL access and page refreshes

- Static asset caching with immutable — safe because Vite adds content hashes to filenames
<br>


## License

This project is open-sourced under the [MIT license](LICENSE).

<!-- FOOTER -->
<br>

---

<br>