from typing import Dict, Optional
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
    description: str


class Event(BaseModel):
    host: str
    title: str
    people_going: List[str] = []
    topic: str
    id: str
    link: str
    date: str
    time: str
    online: bool
    description: str
    image: str
    details: str
    prereqs: str
    group: str

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
        # print(d.to_dict())
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
            u'id': request.id,
            u'description': request.description,
        })
        return "Done"
    except:
        return "Error"


#get groups by id
@app.get('/groups/{id}')
def get_group_by_id(id:str):
    grps = groups()
    print("-----------------------")
    # print(grps)
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
    # print(grps)
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
    # print(grps)
    for g in grps:
        if g["topic"]==topic:
            return g
    return f"No group found with name={topic}"
    
@app.post("/events")
def add_event(request: Event):
    ref = db.collection(u'Events').document(request.id)
    try:
        ref.set({
            u'title': request.title.upper(),
            u'host': request.host,
            u'people_going': request.people_going,
            u'topic': request.topic.upper(),
            u'id': request.id,
            u'online': request.online,
            u'link': request.link,
            u'time': request.time,
            u'date': request.date,
            u'description': request.description,
            u'image': request.image,
            u'prereqs': request.prereqs,
            u'details': request.details,
            u'group': request.group,
        })
        print(request)
        return "Event created!!"
    except Exception as e:
        print(e)
        return e

@app.get('/events')
def get_all_events():
    events = []
    data = db.collection(u'Events').stream()
    for d in data:
        # print(d.to_dict())
        events.append(d.to_dict())
    i = 0
    for event in events:
        print(event["date"])
        _date = datetime.datetime.strptime(event["date"], '%Y-%m-%d').date()
        if _date < datetime.datetime.now().date():
            events.remove(event)
        i+=1
    return events


@app.post('/groups/{id}/{member}')
def joinGroupById(id:str, member: str):
    group: Dict = get_group_by_id(id)
    print('********************************')
    # print(group)
    group["members"].append(member)
    ref = db.collection(u'Groups').document(id)
    ref.update(group)
    return "Done!!"

@app.get('/groups/groupbyhost/{Creator}')
def groupbyhost(Creator: str):
    grps = groups()
    a = []
    for group in grps:
        if group["Creator"] == Creator:
            a.append(group)
    return a            


@app.post('/events/{id}/{member}')
def joinEventById(id:str, member: str):
    event: Dict = getEventById(id)
    print('********************************')
    # print(group)
    event["people_going"].append(member)
    ref = db.collection(u'Events').document(id)
    ref.update(event)
    return "Done!!"

@app.get('/events/{id}')
def getEventById(id:str):
    events = get_all_events()
    for event in events:
        if event["id"] == id:
            return event
    return "Event not found"


@app.get('/groups/gettopics/topics/512')
def getTopicsForGroups():
    topics = set()
    grps = groups()
    for group in grps:
        topics.add(group["topic"])
    return topics


@app.get('/events/gettopics/topics/512')
def getTopicsForGroups():
    topics = set()
    events = get_all_events()
    for event in events:
        topics.add(event["topic"])
    return topics

@app.get('/group/events-of-group/{id}')
def get_events_of_group(id: str):
    events = get_all_events()
    res = []
    for event in events:
        if event["group"] == id:
            res.append(event)
    return res


# if __name__ == "__main__":
#     uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)