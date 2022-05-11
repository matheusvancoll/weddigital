FROM openjdk

WORKDIR /app

COPY target/WedDigital-0.0.1-SNAPSHOT.jar /app/weddigital-app.jar

ENTRYPOINT ["java", "-jar", "weddigital-app.jar"]