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
                    sh 'docker build -t glgelopfalcon/realworldBE:${BUILD_NUMBER} .'
                    sh 'docker push glgelopfalcon/realworldBE:${BUILD_NUMBER}'
            }
         }
        }

        stage('Deploy to DEV') {
            steps {
                sh 'sudo kubectl config set-context $(kubectl config current-context) --namespace development'
                sh 'sed -i -e "s/\\/realworldBE:.*/\\/realworldBE:${BUILD_NUMBER}/" realworldBE-deployment.yml'
                sh 'sudo kubectl apply -f  realworldBE-deployment.yml'
            }
        } 
    }
}