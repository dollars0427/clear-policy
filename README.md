# Policy-Cleaner
A script for clear AWS IAM policy quicky.

Installation
---

Note: This requires Node.js v0.10 to run. If you had not install it , you can download it at http://nodejs.org/download/ . \

1.Download the policy-cleaner source or clone the git repository:
```bash
$ git clone git@github.com:dollars0427/policy-cleaner.git
```

2.Switch to the project root directory:
```bash
$ cd policy-cleaner
```
3.Install the dependencies: 
```bash
$ npm install
```

Configuration
---
1.Copy the configuration file and edit it: 

```bash
$ cp config.example.json config.json 
$ vi config.json

```json
    "token": {
        "access_key":"your aws access key",
        "access_secret":"your aws access key secret"
    }
```

Usage
---

1.Run app.js with this command: 

```bash
$ node app.js
```


BUG
---
If there are any bug, please feel feel to open a issues.
