#!/bin/bash

echo "Deploying IPL Dashboard to Firebase..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null
then
    echo "Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Login to Firebase (if not already logged in)
firebase login

# Deploy to Firebase
firebase deploy

echo "Deployment complete! Your dashboard should be live now." 