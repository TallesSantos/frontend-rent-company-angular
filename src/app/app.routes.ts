import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { CatalogPage } from './pages/catalog-page/catalog-page';
import { AboutPage } from './pages/about-page/about-page';
import { User } from './pages/user/user';
import { ManageMovies } from './pages/user/admin/manage-movies/manage-movies';
import { UserProfile } from './pages/user/user-profile/user-profile';
import { ManageUsers } from './pages/user/admin/manage-users/manage-users';
import { NotFound } from './pages/not-found/not-found';
import { MovieDescriptionComponent } from './components/movie-description-component/movie-description-component';
import { RentHistory } from './pages/user/rent-history/rent-history';

export const routes: Routes = [
    {
        path: '',
        component: AboutPage,
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'catalog',
        component: CatalogPage,
    },
    {
        path: 'catalog/:id/movie-description',
        component: MovieDescriptionComponent,
    },
    {
        path: 'user',
        component: User,
        children: [
            //Client rotes
            { path: 'user-profile', component: UserProfile },
            { path: 'all-movies', component: CatalogPage },
            { path: 'rented-history', component: RentHistory },
            { path: 'all-movies/:id/movie-description', component: MovieDescriptionComponent },

            //Admin rotes
            { path: 'manage-movies', component: ManageMovies },
            { path: 'manage-users', component: ManageUsers },
        ],
    },
    { path: '**', component: NotFound },
];
