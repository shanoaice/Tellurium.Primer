import { For, lazy } from 'solid-js';
import { Navigate, Route, Routes } from '@solidjs/router';
import Navbar from '~/components/Navbar';
import { AppRoutes } from '~/constants/Routes';
import { currentTheme } from './signals/theme';

import './App.css';

const Dashboard = lazy(async () => import('./components/Dashboard'));

const routes = [
	{
		path: AppRoutes.Dashboard,
		component: Dashboard,
	},
];

function App() {
	return (
		<div data-theme={currentTheme()}>
			<Navbar />
			<Routes>
				<For each={routes}>
					{(route) => (
						<Route path={route.path} component={route.component} />
					)}
				</For>
				<Route
					path="/"
					element={<Navigate href={AppRoutes.Dashboard} />}
				/>
			</Routes>
		</div>
	);
}

export default App;
