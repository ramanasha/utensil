tmux \
    new -d -s consamables \; \
    send-keys -t consamables 'cd api && mvn package && java -jar target/consamables.jar server config.yml' Enter \; \
    split-window \; \
    send-keys -t consamables 'cd web && yarn install && yarn start' Enter \; \
    a

