FROM java:8-jre

RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY config.prod.yml /app/config.yml
COPY target/utensil.jar /app
COPY wait-for-db.sh /app

EXPOSE 8080

CMD ["java", "-jar", "utensil.jar", "server", "config.yml"]
