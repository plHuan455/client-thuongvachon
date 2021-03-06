import './App.css';
import 'assets/scss/components/gridLibrary.scss';
import 'assets/scss/components/base.scss';

import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Admin from 'features/admin/Admin';
import AdminLayout from 'layouts/AdminLayout';
import Auth from 'features/auth/Auth';
import Develop from 'features/develop/Develop';
import DocMain from 'features/doc/DocMain';
import Game from 'features/game/Game';
import GroupMain from 'features/group/GroupMain';
import HomePage from 'components/Home/HomePage';
import MainLayout from 'layouts/MainLayout';
import NotFound from 'components/NotFound';
import ToDoMain from 'features/ToDo/ToDoMain';
import { authFirstAccess } from 'features/auth/authSlice';
import { gameClientGet } from 'features/game/gameSlice';
import { groupGet } from 'features/group/groupSlice';

function App() {
  const dispatch = useDispatch();

  const isAuth = useSelector(state => state.auth.isAuth);
  useEffect(() => {
    const firstFetchData = async () => {
      if (!dispatch) return;
      try {
        // const response = await dispatch(gameClientGet());

        await Promise.all([
          // dispatch(groupGetDemo()),
          dispatch(authFirstAccess()),
          dispatch(gameClientGet()),
        ])
      } catch (err) {
        console.log(err);
      }
    }

    firstFetchData();
  }, [dispatch])

  useEffect(() => {
    const fetchGetGroup = async () => {
      try {
        await dispatch(groupGet());
      } catch (err) {
        console.log(err);

      }
    }

    fetchGetGroup();
  }, [isAuth, dispatch])

  // Render
  return (
    <div>
      <Suspense fallback={<div>Loading ... </div>}>
        <Router>
          <Switch>
            <Route path='/admin'>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </Route>
            <Route path='/'>
              <MainLayout>
                <Switch>
                  <Route path='/auth' component={Auth} />
                  <Route path='/docs' component={DocMain} />
                  <Route path='/todo' component={ToDoMain} />
                  <Route path='/playTogether' component={Game} />
                  <Route path='/home' component={HomePage} />
                  <Route path='/develop' component={Develop} />
                  <Route path='/groups' component={GroupMain} />
                  <Route exact path='/' component={HomePage} />
                  <Route component={NotFound} />
                </Switch>
              </MainLayout>
            </Route>

            <Route component={NotFound} />

          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
