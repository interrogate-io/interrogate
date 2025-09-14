FROM plantuml/plantuml:1.2025.4 AS plantuml
FROM azul/zulu-openjdk-alpine:24.0.2-24.32-jre
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot \
    && sed -i -e 's/v3\.20/v3\.22/g' /etc/apk/repositories \
    && apk add --no-cache --upgrade apk-tools \
    && apk upgrade --available \
    && apk add --no-cache graphviz font-dejavu
COPY --from=plantuml /opt/plantuml.jar /app/plantuml.jar
WORKDIR /data
RUN chown -R nonroot:nonroot /data \
    && chown -R nonroot:nonroot /app
USER nonroot
ENTRYPOINT [ "java", "-Djava.awt.headless=true", "-jar", "/app/plantuml.jar" ]
CMD [ "--help" ]
