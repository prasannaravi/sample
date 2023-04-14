pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                bat 'npm install'
                bat 'npm run build --prod'
            }
        }

        stage('Deploy') {
            steps {
                bat 'scp -r dist/* user@nginx-server:/var/www/html/'
            }
        }
    }
}
