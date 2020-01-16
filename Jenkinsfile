pipeline {
    agent { docker 'node:13.2.0' }
    stages {
        stage('build') {
            steps {
                sh 'npm install'
                sh 'npm start'
            }
        }
    }
}
