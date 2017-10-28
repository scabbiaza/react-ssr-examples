# React App with Server Side Rendering

This repo is a research project with a goal to create a production-ready prototype of the
React App with the Server Side Rendering.

**Motivation**<br/>

Many SSR examples exist already. The problem is they are either too simple 
and show only the small part of the picture, or too complex to understand 
all the reasons behind the technical decisions were made. In this repo, 
I'm going to create a production-ready prototype and cover the most often 
web app requirements, like routing, state management, CRUD, SSR, performance. 
But do it gradually, solving one problem at the time and making a snapshot on each step.
If your goal is to understand deeply every concepts/pattern/hack under the app with SSR,
you may find this repo useful.

When a prototype is complete, I would love to create a video tutorial, where I recreate it one more time together with watchers, line by line.
Set the thumb up for [this issue](https://github.com/scabbiaza/ssr-react-examples/issues/2)
if you want to see such tutorial.

**How to run examples**

Move to the folder with an example, for example:
```
$ cd 01/
```

Install libraries:
```
$ npm i
```

Start server in console #1:
```
$ npm run start-server
```

Run webpack-watch in console #2:
```
$ npm run webpack-watch
```


## 01. Asynchronous Data Fetching

The first example has the basic (far away from the production-ready) React App with SSR.

Data fetching challenge should be solved on this step. There are two possible architectured 
solutions: fetching data on the endpoint level or on the component level.

Before the "FE app" era, the first approach was widely used. Developers thought
about a site as about a set of pages: endpoints fetch all the data first and
render it after. Nowadays, an app is rather a set of modules/components and 
co-locating the data fetching inside them, from my experience, is the way 
that shows itself as more effective.

If you prefer fetching the data on the endpoint level, neither from the two problems
described below should appear.

### Asynchronous data fetching on Backend: no data in the response

The flow:
* user requests a page
* server starts rendering a React application
* **components are rendered the first time without waiting for the promise that should return data**
* server doesn't wait for those promises either and returns a response without data

#### How it should work

ReactJS Team hasn't given an answer yet. [This issue](https://github.com/facebook/react/issues/1739)
was reported in 2014 and discussion is ongoing.

As per my opinion, component should have an ability to return a promise, 
which will be ignored in the rendering until resolving.

#### How it can work in Oct 2017

**Option # 1 – Skip the first render**

This works exactly how it sounds. In the example#01 I use 
[react-frontload](https://github.com/davnicwil/react-frontload)
that takes care of it.

*Do you know other options? Let me know!*


### Asynchronous data fetching on Frontend: data blinking

This problem is very similar to the previous, but just from the Frontend perspective.

The flow:
* user requests a page
* server returns an HTML (with all data)
* browser renders the page
* user sees the resulting page (screenshot #1)
* React is initiated and it renders components into DOM
* components start loading data
* **while data is loading user sees a blank page or loading wheel** (screenshot #2)
* components render loaded data
* page looks the same as before the initialization of React (screenshot #3)

This is how it can look like for a user:

| #1 | #2 | #3
|---|---|---|
| ![ssr-data-fetching-1](https://user-images.githubusercontent.com/2734464/32115513-c5b12d80-bb4f-11e7-8387-db381564586d.png) | ![ssr-data-fetching-2](https://user-images.githubusercontent.com/2734464/32115514-c5d4dbea-bb4f-11e7-9f29-cf319c191afb.png)  | ![ssr-data-fetching-3](https://user-images.githubusercontent.com/2734464/32115515-c5f8fdf4-bb4f-11e7-913b-6e18353ad0a2.png)
  |


#### How it should work

The same as for Backend: component should support the Promise protocol.

#### How it can work in Oct 2017

**Option # 1 – Leave it without solving the problem**

Pros:
* SEO friendly site without additional layer of code to solve the data blinking problem

Cons:
* despite a page with all data is available in the first response from the server, 
  user should wait until it's loaded the second time from the FE app
* performance is worth than in the architecture without SSR, because the code 
  to generate data is executed twice: the first time in SSR, 
  the second time in AJAX requests to prepare the same data
* user will see data blinking, as on the screenshots

It's possible to avoid data blinking by hiding the content until components render it one more time.
Nevertheless, the DRY rule is breaking up in a very harsh way here.

**Option #2 – Pass an initial state from the server**

SSR could pass data for the required endpoint in the HTML response,
for instance, in the `window` object.

Pros:
* no additional request for the initial data in FE app
* performance is not affected as in option #1
* blinking problem is solved: components have all data in the first render (technically re-render happens, 
  but because the initial HTML and result of the render are identical, a user won't see any changes on the screen)
  
Cons:
* a response from server has data duplication: already rendered and in some `window.store` object

*Do you know other options? Let me know!*

The last approach is used in the example#01.





