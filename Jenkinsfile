pipeline {
    agent { docker 'node:13.2.0' }
    stages {
        stage('build') {
            #!/bin/bash -ilex
            steps {
                sh 'sudo npm config set registry https://registry.npm.taobao.org'
                sh 'sudo npm install -g cnpm --registry=https://registry.npm.taobao.org'
                sh 'sudo cnpm install'
                sh 'sudo npm start'
            }
        }
    }
}
