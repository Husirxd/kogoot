# KOGOOT
## a Web-based application supporting a creating and resolving tests process management
![Alt text](readme/kogoot.gif)
## Project Description
Kahoot styled app create with NextJS & NestJS stack. The application allows you to create and solve simple quizzes based on a point system. Each question can have an unlimited number of answers. In the current version we propose to create only entertainment quizzes.

## Installation

The entire application is based on docker containers. 
Simply run the command 

``` docker compose up --build ```.

The application consists of 4 containers:
- Backend - contains a container with NestJS (node 18)
- Frontend - contains a container with NextJs (node 18)
- Postres - contains a container with Postres
- Pgadmin4 - contains a container with PGAdmin.

In addition, the database was created using TypeOrm ensuring a faster start-up of the custom instance. 

For the development of applications or the creation of your own Frontend on port 3000, there is API (Swagger) documentation in /api


### Creating and Managing Quizzes
![Alt text](<readme/kogoot create.JPG>)
To add a quiz go to /create. Please note that access to this page is for logged in users only. Then fill in the basic details for your quiz. You can add an unlimited number of questions and answers. 

Editing of quizzes is currently under implementation.

### Solving Quizzes
![Alt text](<readme/archive kogoot.JPG>)
A selection of quizzes available via the website can be found on the /quizzes page. The site includes the ability to search and filter by category. Once you have selected a quiz, you will be taken to a question form. You will be given a score at the end of the approach.


### FAQ (Frequently Asked Questions)
#### Can I use this for commercial purposes?
No. If you wish to make money from this project, you will need to contact to obtain individual permission.



### Support and Contact    
email: skrajnyprofesjonalizm@gmail.com

### Changelog
Version: 0.3
-added ability to delete and edit quizzes
-added basic user profile
-added ability to uplaod images to quizzes and questions
-added the possibility to upload an avatar

Version: 0.2
-added frontend app to docker


### Roadmap

- editing quizzes --done
- adding photos to questions --done
- user profile --done

- rooms to solve tests real-time with other people