
import React from 'react';
import {Router, Route, Switch} from 'react-router-dom'
import createHistory from "history/createBrowserHistory";


import Header from "../components/pages/Header";
import Footer from "../components/pages/Footer";
import BooksForm from "../components/pages/BooksForm";
import Cart from "../components/pages/Cart";
import NotFound from "../components/pages/NotFound";
import BooksList from "../components/pages/BooksList";

const history = createHistory();
 const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={BooksList} />
        <Route  path="/admin" component={BooksForm} />
        <Route  path="/cart" component={Cart} />
        <Route  component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
