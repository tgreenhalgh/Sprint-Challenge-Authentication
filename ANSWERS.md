<!-- Answers to the Short Answer Essay Questions go here -->

1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.
    - Middleware is a function that returns a function, needs `next()`, gives the coder a chance to add extra functionality between the `req` and `res`.
    - A session is a place to store data that can be accessed cross multiple requests. There is a unique session per instance of 'browsing' device. Can be stored in memory, cookie, database, etc.
    - Bcrypt is purposefully slow hashing function used to hash passwords.
    - JWT, or JSON Web Tokens, are a way of persisting data between the server and client. They are generally signed and encrypted and often are used for authentication.
2.  What does bcrypt do in order to prevent attacks?
    - Bcrypt salts (adds characters to) and hashes (a one way function) passwords so that hackers who get access to the database can't recover the plaintext. It is purposefully slow to cause the making of "rainbow tables" horribly inefficient.
3.  What are the three parts of the JSON Web Token?
    - header: type of token and hashing algorithm used
    - payload: claims (user name, when expires, etc)
    - signature: take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and create the signature
