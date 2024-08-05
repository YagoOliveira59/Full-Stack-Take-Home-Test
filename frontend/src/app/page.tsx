import {UserProvider} from '@/contexts/UserContext';
import {Main} from './modules/common/Main';

export default function Home() {
    return (
        <UserProvider>
            <Main />
        </UserProvider>
    );
}

