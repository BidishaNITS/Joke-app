### A containerized full-stack joke generator with a React frontend and Python (FastAPI) backend

### Prerequisites
- **Install git:** https://git-scm.com/downloads
- **Install Docker:** https://docs.docker.com/engine/install/
- **Install Minikube:** https://minikube.sigs.k8s.io/docs/start/

### Steps to get started with the application

- Clone the repository using the command below
```
git clone --recursive https://krsumit449Public@dev.azure.com/krsumit449Public/Joke-app/_git/Joke-app
```
- Change the directory and go inside the project manifest using the command below
```
cd Joke-app/manifest
```
- Start minikube and check it's status using the commands below
```
minikube start --driver=docker
```
```
minikube status
```
- Apply the application manifest using the command below
```
kubectl apply -f joke-app.yaml
```
- Check the application status using the command below
```
kubectl get all -n joke-app
```
- Forward the services port in two different terminal using the command below
```
kubectl port-forward service/joke-backend 8000:80 -n joke-app
```
```
kubectl port-forward service/joke-frontend 3000:80 -n joke-app
```
- Access the application in your browser by using the below
    - Backend API: http://localhost:8000/api/joke
    - Frontend UI: http://localhost:3000/


