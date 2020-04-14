### Debug

    node --inspect

### Ejecutar con docker-compose 

Para levantar las dos apps con nodemon:

Iniciar:
    docker-compose up -d
    
Reiniciar:    
    docker-compose down && docker-compose up -d

### Apimocks

#### Builder 

    docker build --network host -t directv/apimocks ./apimocks

#### Probar la app

    docker run --name apimocks --rm -d -p 3000:3000 directv/apimocks

    curl -X POST localhost:3000/api/users/1 

    
### FLow

#### Builder 

    docker build --network host -t directv/flow ./flow
    
#### Probar la app

    docker run --name flow --rm -d -p 3010:3010 directv/flow
    
    curl -X POST -H "Content-type: application/json" localhost:3010/flow -d '{ "customerId" : "12345" }'
