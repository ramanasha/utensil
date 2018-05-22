tmux \
    new -d -s utensil \; \
    send-keys -t utensil 'cd api && mvn package && java -jar target/utensil.jar server config.yml' Enter \; \
    split-window \; \
    send-keys -t utensil 'cd web && yarn install && yarn start' Enter \; \
    a

