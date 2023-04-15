pipeline {
    agent any

    stages {
        stage('NPM install') {
            steps {
                bat 'npm install'
                bat 'npm install d3'
             }
            }
        stage('test') {
            steps {
                "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "test:ci": "ng test --browsers=ChromeHeadless --watch=false",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
               }
        }
        stage('Build') {
            steps {
               
                bat 'npm run build --prod'
            }
            
        }
        
        stage('Deploy') {
            steps {
                bat 'scp -r dist/* prasa@DESKTOP-3P42J0H:"C:/Users/Prasa/Downloads/nginx-1.24.0/nginx-1.24.0/html"'
            }
        }
    }
}
