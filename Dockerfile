FROM openjdk

WORKDIR /app

COPY target/WedDigital-Prod.jar /app/weddigital-app.jar

ENTRYPOINT ["java", "-jar", "weddigital-app.jar"]