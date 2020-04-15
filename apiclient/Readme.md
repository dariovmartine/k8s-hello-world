El archivo de docker-compose es para desarrollo, permite levantar las dos apps tal cual se ejecutan en k8s pero usando nodemon para permitir cambios sin reiniciar.

### Debug

Se puede debugear usado visual studio code ejecutando la app a debugear con:

    node --inspect

### Ejecutar con docker-compose 

Para levantar las dos apps con nodemon:

Iniciar:
    
    docker-compose up -d
    
Reiniciar:    
    
    docker-compose down && docker-compose up -d

### Pasos para desplegar en K8s

#### Builder las imagenes

    docker build --network host -t directv/apimocks ./apimocks
    docker build --network host -t directv/flow ./flow

#### Probar las apps

    docker run --name run_apimocks --rm -d -p 3000:3000 directv/apimocks
    curl -X POST localhost:3000/api/users/1 

    docker run --name run_flow --rm -d -p 33010:3010 directv/flow
    curl -X POST -H "Content-type: application/json" localhost:33010/flow -d '{ "customerId" : "12345" }'
    
    TODO: Revisar q no se puede entrar con bash
#### Desplegar en micro.k8s

    microk8s.kubectl create -f pod-apiclient-hw.yml
