import { For, lazy } from 'solid-js';
import { Navigate, Route, Routes } from '@solidjs/router';
import Navbar from '~/components/Navbar';
import AppRoutes from '~/constants/Routes';
import { currentTheme, daemonConfig } from '~/signals/persisted';

const Dashboard = lazy(async () => import('~/pages/Dashboard'));

const routes = [
	{
		path: AppRoutes.Dashboard,
		component: Dashboard,
	},
];

function App() {
	return (
		<div data-theme={currentTheme()} class="w-full h-screen">
			<Navbar />
			<div class="p-4">
				<Routes>
					<For each={routes}>
						{(route) => <Route path={route.path} component={route.component} />}
					</For>
					<Route path="/" element={<Navigate href={AppRoutes.Dashboard} />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
