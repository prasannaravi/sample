#!groovy

properties(
    [
        [$class: 'BuildDiscarderProperty', strategy:
          [$class: 'LogRotator', artifactDaysToKeepStr: '14', artifactNumToKeepStr: '5', daysToKeepStr: '30', numToKeepStr: '60']],
        pipelineTriggers(
          [
              pollSCM('H/15 * * * *'),
              cron('@daily'),
          ]
        )
    ]
)
node {
    export CHROME_BIN=/usr/bin/chromium-browser
    stage('Checkout') {
        //disable to recycle workspace data to save time/bandwidth
        deleteDir()
        checkout scm

        //enable for commit id in build number
        //env.git_commit_id = sh returnStdout: true, script: 'git rev-parse HEAD'
        //env.git_commit_id_short = env.git_commit_id.take(7)
        //currentBuild.displayName = "#${currentBuild.number}-${env.git_commit_id_short}"
    }

    stage('NPM Install') {
        withEnv(["NPM_CONFIG_LOGLEVEL=warn"]) {
            bat 'npm install'
        }
    }
    stage('NPM Install d3') {
        
        withEnv(["NPM_CONFIG_LOGLEVEL=warn"]) {
            
                    bat 'npm install d3'
                    
                 }
    }
    stage('Test') {
        withEnv(["CHROME_BIN=/usr/bin/chromium-browser"]) {
          bat 'ng test --progress=false --watch false'
        }
        junit '**/test-results.xml'
    }

    stage('Lint') {
        bat 'ng lint'
    }

       stage('Build') {
         steps{
        milestone(20)
        bat 'ng build --prod'
         }
    }

    
    stage('Deploy') {
         steps{
        milestone(20)
        echo "Deploying..."
         }
    }
    
}
