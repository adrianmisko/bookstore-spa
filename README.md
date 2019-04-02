# bookstore-spa
Single page application that servers as a front-end for [bookstore-flask][1].
Made with [React][2] library and [antd][5] UI framework. [dva][3] is used as data flow solution and [umi.js][4] is used for routing and plugin handling. 

App is [deployed on Heroku][6].

[1]: https://github.com/adrianmisko/bookstore-flask
[2]: https://reactjs.org/
[3]: https://github.com/dvajs/dva
[4]: https://umijs.org/
[5]: https://ant.design/
[6]: https://bookstore-spa.herokuapp.com/


### Why does it take so long to load? (for the first time)
The app is deployed on heroku using the free plan, so it goes to sleep after 30 minutes of inactivity. At first, dyno that serves static files needs to load (about 10 seconds) then, the back-end (another 10 seconds)
### Why am I getting logged out on page refresh?
Unfortunately we can't keep it in the local storage due to XSS, neither can we store it in cookie (CRSF), because back-end server doesn't have any CRSF protection and is done in a stateless manner. So, we don't have sessions and the authentication token isn't stored anywhere, which leads to being logged out.
### Where are the tests?
There aren't any :( It's an academic project (DMBS) that was supposed to be DnD'd in oracle application express. I wanted to learn react and spa development, hence this. Still, there was little time and test on the front end are quite different (imo) than those back end. I'll lear Karma, Jasmine and other fronty test stuff when learining Angular.
