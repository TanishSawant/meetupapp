from typing import Optional
from fastapi import FastAPI
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from pydantic import BaseModel
import random
import string
from typing import List
import datetime
from six import u
# import uvicorn
from fastapi.middleware.cors import CORSMiddleware



# cred={
#   'apiKey': "AIzaSyDZiQxLHFbamQ7VRSW67fmzXoV7xUqhsac",
#   'authDomain': "meetup-8405b.firebaseapp.com",
#   'projectId': "meetup-8405b",
#   'storageBucket': "meetup-8405b.appspot.com",
#   'messagingSenderId': "435894963109",
#   'appId': "1:435894963109:web:5516acf58b6334011ef64c",
#   'measurementId': "G-W0DVPH0NKT"
# }

cred = credentials.Certificate("./service.json")
firebase_admin.initialize_app(cred)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

db = firestore.client()

# db.collection(u'Groups').add({'title': 'London Devs', 'Creator': 'John Lennon', 'members':['Aaron', 'Pablo']})
#  ref = db.collection(u'Announcements').document("a" + randomString())

#                     ref.set({
#                         u'title' : a,
#                         u'link' : link
#                     })
class Group(BaseModel):
    Creator: str
    title: str
    members: List[str] = []
    topic: str
    id: str


class Event(BaseModel):
    host: str
    title: str
    people_going: List[str] = []
    topic: str
    id: str
    link: str
    date: datetime.date
    time: datetime.time
    online: bool

def randomString(stringLength=5):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))

def isPresent(x, array):
    for a in array:
        if a == x:
            return True
    return False    

@app.get('/')
def greet():
    return "Hello world!"

#get all groups
@app.get('/groups')
def groups():
    grps = []
    data = db.collection(u'Groups').stream()
    for d in data:
        print(d.to_dict())
        grps.append(d.to_dict())
    return grps

#add groups
@app.post('/groups')
def add_group(request: Group):
    ref = db.collection(u'Groups').document(request.id)
    try:
        ref.set({
            u'title': request.title.upper(),
            u'Creator': request.Creator,
            u'members': request.members,
            u'topic': request.topic.upper(),
            u'id': request.id.upper(),
        })
        return "Done"
    except:
        return "Error"


#get groups by id
@app.get('/groups/{id}')
def get_group_by_id(id:str):
    grps = groups()
    print("-----------------------")
    print(grps)
    for g in grps:
        if g["id"] == id:
            return g
    return f"No group found with id={id}"


#get group by the person
@app.get('/groups/of/{name}')
def get_group_by_user(name:str):
    grps = groups()
    # grps = groups()
    print("-----------------------")
    print(grps)
    for g in grps:
        if isPresent(name, g["members"]):
            return g
    return f"No group found with name={name}"

#get group by topic name
@app.get('/groups/with-topic/{topic}')
def get_group_by_topic_name(topic:str):
    grps = groups()
    # grps = groups()
    print("-----------------------")
    print(grps)
    for g in grps:
        if g["topic"]==topic:
            return g
    return f"No group found with name={topic}"
    
@app.post("/events")
def add_event(request: Event):
    ref = db.collection(u'Events').document(request.title)
    try:
        ref.set({
            u'title': request.title.upper(),
            u'host': request.host,
            u'people_going': request.people_going,
            u'topic': request.topic.upper(),
            u'id': request.id.upper(),
            u'online': request.online
        })
        return "Done"
    except:
        return "Error"

@app.get('/events')
def get_all_events():
    events = []
    data = db.collection(u'Events').stream()
    for d in data:
        print(d.to_dict())
        events.append(d.to_dict())
    return events

# if __name__ == "__main__":
#     uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)