# metro-mock


## Run from the web
The project is deployed on firebase, just type
https://recetas-redux.firebaseapp.com

## Setup and running 
To install the dependencies
```bash
npm install
``` 
To watch for changes and rebuild using webpack and babel, this starts a server in the port 3000
```bash
npm start
``` 
This watch for changes in the src directory and reloads the browser

## About the tecnology stack
Some of the tech used and the motivation to use it are listed here:

### React
- Its based on components (not to be confused with web components), this motivates you to write reusable components that are shared in various screens of your app. 
- It encourages unidirectional flow of data and stateless components. In this way there is only one source of truth in your app and all the relevant components react automatically when the central state changes. One challenge of this approach is that if one little component want to change the state of a parent component it must communicate its intention though event callbacks all the way up, to deal with this issue Facebook created a companion architecture called *Flux* that put a central bureaucrat called the *Store* in charge of modifying the state of the app, so all the components that want to update the state have to pass an *Action* to it and then the *Store* will update its self and notify its subscribers and those notify its subcomponents all the way down. 
- Uses a special superset of javascript called JSX that allows you to use your previously learned javascript tricks without having to learn a new template language.
- It can be used with a more functional programming style using features like stateless components and inmutable data. 

### Specific packages used
* __create-react-app__: for the rapid setup of a development environment with autoreloading
* __babel__: allows the use of features of ES2015-ES2017 not widely available in browsers.
* __react-sparklines__: simple svg components for creating bar and line charts, this was used for the stocks widget.
* __react-i18next__: this was the library used for internacionalization.
* __isomorphic-fetch__: allows the use of the function fetch both in client and server apps.
* __recharts__: has a lot more features that _react-sparklines_, includes other types of charts like the piechart that was needed for the webstats widget, it is based on the d3 library and is highly customizable and composable.

## Implementation details
### Internationalization

The library _react-i18next_ was used, this library allows for the loading of json files that contains the translated strings that are located in locales/en and locales/es for the two required languages. It loads this files via XHR and has varous strategies for determining the language of the user based on the browser, cookies, localStorage and others. For changing the language the app stores a special cookie that has more priority that the navigatior language, this allows the selected language to be persisted across visits.

### Form widget
The Messages Form was implemented using a React class component *NewMessageForm.js*, in the state it stores the values, the dirty and error state for each of the fields, for the contact picker it was used another class component *ContactsWidget.js* but it relies on its parent component for storing its state.  No special libraries were used for the form validation.   