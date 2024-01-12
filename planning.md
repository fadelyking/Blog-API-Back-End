# Scope
- Are you building both a backend and frontend? 
Yes
- Do you need to account for user authentication? 
Yes 

# Database Modeling
- What database will you be using?
MongoDB

- What database models will you need?
1- Users
2- Posts
3- Comments

- If you're using a relational database, what relationships do you need between models?
Users will have Posts and Comments
Posts will have Users and Comments
Comments will have Users

# API Endpoint Planning
- Do you need full CRUD endpoints for every model?
Create and Read -> Users
Create, Read, Update, Delete -> Posts & Comments

# Backend Build
- Are you using Rails, Express, Django, or something else?
Express

# Backend Testing
No tests
