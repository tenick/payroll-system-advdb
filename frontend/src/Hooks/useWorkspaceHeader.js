import { useContext } from 'react';
import { WorkspaceHeaderContext } from '../Context/WorkspaceHeaderContext';

export const useWorkspaceHeader = () => {
    return useContext(WorkspaceHeaderContext);
}