import './WorkspaceHeader.css';
import SearchBar from '../SearchBar/SearchBar';
import { useNav } from '../../Hooks/useNav';
import { useAuthStatus } from '../../Hooks/useAuthStatus';

const WorkspaceHeader = () => {
	const { navState } = useNav();
    const { userState } = useAuthStatus();

	const searchableRoutes = ['/employee'];

	return (
		<header id="workspaceHeader">
			{ searchableRoutes.filter(route => route == navState.path).length != 0 && userState.user.role === 'admin' && <SearchBar /> }
		</header>
	);
}

export default WorkspaceHeader;
