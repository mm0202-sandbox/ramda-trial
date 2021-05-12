#!groovy

pipeline {
  agent any
  tools { nodejs 'node12' }

  stages {
    stage('Install packages') {
      steps {
        withCredentials([string(credentialsId: 'NODE_AUTH_TOKEN', variable: 'NODE_AUTH_TOKEN')]) {
          sh 'sed -e "s/\\[NODE_AUTH_TOKEN\\]/${NODE_AUTH_TOKEN}/g" .npmrc.template > .npmrc'
        }
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run test:coverage'
      }
      post {
        always {
          cobertura coberturaReportFile: '**/cobertura-coverage.xml'
          junit '**/junit.xml'
        }
      }
    }

  }
}

