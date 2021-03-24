# WeMeet

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

Open Opportunity to hear from the experts.


## Getting Started <a name = "getting_started"></a>

Clone the repository:

```
git clone https://github.com/TanishSawant/meetupapp.git
```


### Prerequisites

You must have nodejs and python installed on your machine.



```
python --version
```
```
node --version
```

```
npm --version
```

run these commands to check if you have node and python running or not.



### Installing

A step by step series of examples that tell you how to get a development env running.

- Install the dependancies(Make sure you are inside the project folder):

```
yarn add
```

or

```
npm install
```

- create a virtual environment for python.
  For this, execute following command

```
python3 -m venv env
```

- Acticate the environment
```
source {PATH_TO_ENV}/Scripts/activate.bat
```

- Install python modules:

```
pip install fastapi firebase-admin typing
```
## Usage <a name = "usage"></a>

Once installed start backend

```
uvicorn main:app --reload
```

Start fronend

```
npm run start
```

