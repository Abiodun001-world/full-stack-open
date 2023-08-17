# Part 0 Solution - README

This README provides an overview of the solutions and diagrams for exercises 0.4, 0.5, and 0.6 of Part 0 in the Full Stack Open course.

## Exercise 0.4: New Note

In this exercise, I created a sequence diagram depicting the process of a user creating a new note using the notes app. The diagram highlights the communication between the browser, the server, the API, and the database.

```
sequenceDiagram
    participant browser
    participant server
    participant database

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server->>database: Insert new note
    activate database
    database-->>server: Note added
    deactivate database
    server-->>browser: Success response
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: Updated notes list
    deactivate server

    Note right of browser: The browser executes the JavaScript function to update and render the new notes
```
## Exercise 0.5: Single Page App

For this exercise, I created a sequence diagram illustrating the process when a user interacts with the single-page app version of the notes app. The diagram showcases the communication between the browser, the server, the API, and the database.

```
sequenceDiagram
    participant browser
    participant server
    participant api
    participant database

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    Note right of browser: The browser loads the single-page app

    browser->>api: GET /api/notes
    activate api
    api->>server: Retrieve notes from database
    activate server
    server->>database: Query notes
    activate database
    database-->>server: Notes data
    deactivate database
    server-->>api: Notes data
    deactivate server
    api-->>browser: Notes data
    deactivate api

    Note right of browser: The app renders the notes

    browser->>browser: User creates a new note
    Note right of browser: Client-side JavaScript adds a new note
    browser->>api: POST /api/notes
    activate api
    api->>server: Add new note to database
    activate server
    server->>database: Insert new note
    activate database
    database-->>server: Note added
    deactivate database
    server-->>api: Success response
    deactivate server
    api-->>browser: Success response
    deactivate api

    Note right of browser: App updates with new note

    browser->>api: GET /api/notes
    activate api
    api->>server: Retrieve updated notes from database
    activate server
    server->>database: Query notes
    activate database
    database-->>server: Updated notes data
    deactivate database
    server-->>api: Updated notes data
    deactivate server
    api-->>browser: Updated notes data
    deactivate api

    Note right of browser: App displays updated notes

    browser->>api: GET /api/notes
    activate api
    api->>server: Retrieve notes from database
    activate server
    server->>database: Query notes
    activate database
    database-->>server: Notes data
    deactivate database
    server-->>api: Notes data
    deactivate server
    api-->>browser: Notes data
    deactivate api
```
## Exercise 0.6: New Note (SPA)

In this exercise, I created a diagram illustrating the process when a user creates a new note using the single-page version of the app.

```
sequenceDiagram
    participant browser
    participant server
    participant api
    participant database

    browser->>browser: User writes a new note
    Note right of browser: Client-side JavaScript captures the note content

    browser->>api: POST /api/notes
    activate api
    api->>server: Add new note to database
    activate server
    server->>database: Insert new note
    activate database
    database-->>server: Note added
    deactivate database
    server-->>api: Success response
    deactivate server
    api-->>browser: Success response
    deactivate api

    Note right of browser: App updates with new note

    browser->>api: GET /api/notes
    activate api
    api->>server: Retrieve updated notes from database
    activate server
    server->>database: Query notes
    activate database
    database-->>server: Updated notes data
    deactivate database
    server-->>api: Updated notes data
    deactivate server
    api-->>browser: Updated notes data
    deactivate api

    Note right of browser: App displays updated notes
```

These diagrams represent the solutions for exercises 0.4, 0.5, and 0.6 of Part 0 in the Full Stack Open course. Each diagram illustrates the flow of events and communication between different components involved in the user interactions. You can use the Mermaid syntax provided in this README to visualize the diagrams in a compatible Markdown renderer.

Feel free to modify and enhance this README as needed for your submission. If you have any questions or need further assistance, please let me know!

Please replace the Mermaid diagrams in the README with the actual Mermaid syntax provided in the previous responses, and adjust the content as needed for your submission. 

You can use this README as a starting point and customize it according to your preferences. If you have any more questions or need further assistance, feel free to ask!

