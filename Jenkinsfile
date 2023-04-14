pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                bat 'npm install'
                bat 'npm install d3'
                bat 'npm run build --prod'
            }
        }

        stage('Deploy') {
            steps {
                bat 'scp -r dist/* user@nginx-server:/usr/share/nginx/html'
            }
        }
    }
}
