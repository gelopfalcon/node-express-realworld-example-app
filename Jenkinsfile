pipeline {
    agent any
    stages {
        stage('Build and install') {
            steps {
                echo "Step 1: Installing dependencies"
                sh 'npm ci'
            }
        }

        stage('Running test') {
            steps {
                echo "Step 1: Test"
            }
        }

        stage('Push image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-registry', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh ' echo "$PASSWORD" | docker login --username=$USERNAME --password-stdin'
                    echo "Step 1: Build Docker image"
                    sh 'docker build -t glgelopfalcon/node-realworld:${BUILD_NUMBER} .'
                    sh 'docker push glgelopfalcon/node-realworld:${BUILD_NUMBER}'
            }
         }
        }
        stage('Prune Docker Images') {
            steps {
                echo 'Step 1: Prune images'
                sh 'docker image prune -a -f'
            }
        }

        stage('Deploy to DEV') {
            steps {
                sh 'sed -i -e "s/\\/node-realworld:.*/\\/node-realworld:${BUILD_NUMBER}/" realworldBE-deployment.yml'
                sh 'sudo kubectl apply -f  realworldBE-deployment.yml'
            }
        } 
    }
}