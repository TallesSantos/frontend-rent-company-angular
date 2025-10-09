import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { CatalogPage } from './pages/catalog-page/catalog-page';
import { AboutPage } from './pages/about-page/about-page';
import { User } from './pages/user/user';
import { ManageMovies } from './pages/user/admin/manage-movies/manage-movies';
import { UserProfile } from './pages/user/user-profile/user-profile';
import { ManageUsers } from './pages/user/admin/manage-users/manage-users';


export const routes: Routes = [
    {
        path: '',
        component: CatalogPage,
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'about',
        component: AboutPage,
    },
    {
        path: 'user',
        component: User,
        children: [
            {path: "user-profile", component: UserProfile},
            {path: "all-movies", component: CatalogPage},


            { path: 'manage-movies', component: ManageMovies },
            { path: 'manage-users', component: ManageUsers },
        ],
    },
];
