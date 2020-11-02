FYI I wanted to deploy this to gh-pages but I'm using react-router with the BrowserRouter and
using pushState which doesn't play nice with gh-page.

you can run the project locally by running

`npm start`

# React books assignment - post analysis

I started by choosing two of the enhancements that I would work on. I found these two interesting
as one is focused on route management and another is dealing with the state.

- Users can switch layouts (from grid view to list view). Linkable.
- On the page where you add new books, users can dynamically add new fields on-the-fly
  (i.e. custom fields).

I used Create React App to bootstrap the project

## Dependencies

- styled-components - css
- redux - state
- react-icons - icons
- uuid - generate unique id for books

## Dev Dependencies

- jest-styled-components
- redux-mock-store

## CSS

I opted for using `styled-components` as my CSS solution mostly because I know AppCues uses this library
and I didn't have a strong preference for another library. I chose not to use a css library.
So all of the CSS is my own (except for a CSS reset from post-css)

### Improvements

As I didn't write much CSS I didn't feel the need to extract it for better organization except in the case of the `AddBookModal`
As this was a larger component I extracted the CSS just to see how I might organize styles as the application grew in size. Ideally
I would do something like this for all styles.

I also occasionally used nested styles (see `src/components/Modal.js`) in styled-components. I noticed that the classnames are not
minified. It's fine for this project as I have no other CSS that might conflict with it but going forward and before releasing this
I would solve this or not use nested class names with styled-components.

### JS

I used react-router for the routing system that renders `src/App.js` and one of two pages `src/pages/Bookshelf.js` or `src/pages/Book.js`

I chose not to use a component library so all components are my own. Some are extremely simple `src/components/Header.js` But I felt
it better to start extracting any areas of the application that were being re-used to show how the application may grow.
Others are a bit more interesting `src/components/Button.js` accepts a prop to style itself differently. `src/components/Modal.js`
accepts props as function to call for cancel and confirm.

### Improvements

I connected the `src/components/AddBookModal.js` to the store because I don't have another use case for the modal so it wasn't necessary
to make it generic. But going forward we may want to add a book and do something else with it. In that case the component could be disconnected
from the store and instead call a function prop returning the book to the parent.

Form validation is very much lacking. I only rolled my own to force a book to have a name and any custom fields missing a key or value
will be disregarded. These should be changed to use a uniform approach and better explain to the user what's required.

## State management

I used redux for state management. As I knew from the start that I would only be storing the array of books I
chose to use that as the root of my state. I adapted a post from Dan Abramov for persisting the state to localstorage
https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
just to show that sorting and grid/list layout do depend on the url search params.

### Improvements

If I wanted to add to the store I would set the root state as an object with different store modules
eg: `{ books: [], userData, uiControls, ...etc }`
and use combineReducers to combine them.

For instance the sorting and grid/list layout could also be stored in a store module so that the preference is stored
on returning to the list.

Currently the entire store state is stored in localstorage. This would need to be changed to exclude
data we didn't want to persist.

## Testing

To conserve time I only tested a high level component, actions, reducer

`src/App.test.js` tests that it displays the correct route

`src/pages/Bookshelf.test.js` tests that the list of books is correctly rendered and the user can add/remove books

`src/store/books/actions.test.js` tests that actions can be created
`src/store/books/reducer.test.js` tests reducer for add / remove books

### Improvements

Ideally all files would have unit/integration tests.

## Done differently

Found a way to make the application more beautiful haha
but with the time constraint I thought it better to focus on the code implementation.

And I didn't want to use a component library / css library
so that my work and the work of the libraries is not confused

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
