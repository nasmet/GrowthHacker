pipeline {
    agent { docker 'node:13.2.0' }
    stages {
        stage('build') {
            steps {
                sh 'npm config set registry https://registry.npm.taobao.org'
                sh 'npm install -g cnpm --registry=https://registry.npm.taobao.org'
                sh 'cnpm install'
                sh 'npm start'
            }
        }
    }
}
