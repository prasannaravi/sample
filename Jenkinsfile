pipeline {
    agent any

    stages {
        stage('test') {
            steps {
                bat 'npm run test'
               }
        }
        stage('Build') {
            steps {
                bat 'npm install'
                bat 'npm install d3'
                bat 'npm run build --prod'
            }
        }      
        stage('Deploy') {
            steps {
                bat 'scp -r dist/* prasa@DESKTOP-3P42J0H:"C:\Users\Prasa\.jenkins\workspace\Angular_pipeline@2\dist\ams"'
            }
        }
    }
}
