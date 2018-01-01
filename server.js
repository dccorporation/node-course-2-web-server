const express = require ('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))
app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if(err){
      console.log('Unable to Append server.log');
    }
  });
  next();
});

// app.use((request, response, next) => {
//   response.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page',
//     welcomeMessage:'Website Under Maintenance'
//   });
// });

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
})

app.get('/', (request, response) => {
response.render('home.hbs', {
pageTitle: 'Home Page',
welcomeMessage:'Welcome To My WebSite'

});

// sending html data
  // response.send('<h1>Hello Express!</h1>');


// sending Json Data
  // response.send({
  //   name: 'Deep',
  //   likes:[
  //     'biking',
  //     'cities'
  //   ]
  // });
});

app.get('/about', (request, response) => {
   response.render('about.hbs', {
     pageTitle: 'About Page'

   });

});

app.get('/projects', (request, response) => {
   response.render('projects.hbs', {
     pageTitle: 'Projects Page',
     welcomeMessage:'Welcome To My Projects'

   });

});
app.get('/json-data', (request, response) => {
   response.send({
     "name": "Deep",
      "likes":[
       "biking",
       "travel"
     ],
      "email": "deepchawla.1993@gmail.com",
      "email2": "deepchawla.1993@Outlook.com",

    }
);
   });



app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Unable to handle request'
  });

});

app.listen(port, () => {
  console.log(`server is up on port ${port}`)
});
