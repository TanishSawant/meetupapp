from fastapi import FastAPI
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# cred={
#   'apiKey': "AIzaSyDZiQxLHFbamQ7VRSW67fmzXoV7xUqhsac",
#   'authDomain': "meetup-8405b.firebaseapp.com",
#   'projectId': "meetup-8405b",
#   'storageBucket': "meetup-8405b.appspot.com",
#   'messagingSenderId': "435894963109",
#   'appId': "1:435894963109:web:5516acf58b6334011ef64c",
#   'measurementId': "G-W0DVPH0NKT"
# }

cred = credentials.Certificate("service.json")
firebase_admin.initialize_app()

app = FastAPI()

db = firestore.client()

db.collection(u'songs').add({'song': 'Imagine', 'artist': 'John Lennon'})

@app.get('/')
def greet():
    return "Hello world!"