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
                    echo 'd3 install successfully'
                 }
    }

       stage('Build') {
         steps {
            bat 'rm -rf AMS' 
            bat 'mkdir AMS' // create a new folder
            bat 'echo "AMS" > build/sample.exe' // output
            
         }
      }
    
}
