FROM denoland/deno:alpine-1.24.3

EXPOSE 8000
WORKDIR /app

COPY . .

RUN deno cache main.ts --import-map=import_map.json
CMD ["run", "--allow-all", "main.ts"]
