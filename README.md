# firestarter (alpha)
Microservice runner


Firestarter provides low-level interfaces (file sockets) for functionalities shared among microservices. Right now this includes logging and stats. Firestarter does **NOT** define the actual protocol used to communicate with those interfaces. The goal is to provide a language agnostic interface and separate the concern about this common functionalities from the actual service and hand that over to a system level abstraction.

Firestarter also expects all services to provide a common usage interface to make them deployable with a common interface.

NOTE: works best when run while playing [Firestarter from Prodigy](https://www.youtube.com/watch?v=wmin5WkOuPw)

Service side tools to interface firestarter for node.js can be found [here](https://github.com/thegitm8/firestarter-tools)

# install
(not yet published on npm)
```shell
git clone git@github.com:thegitm8/firestarter.git
cd firestarter
npm install

# will create symlink in ~/bin assuming thats in your path
./setup.sh

```

# usage
```
fire start path/to/service
```
