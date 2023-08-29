import { Lexend } from 'next/font/google';
import { useRouter } from 'next/router';
const lexend = Lexend({ subsets: ['latin'] });

const headerStyle = {
  color: 'var(--background-color-body)',
  'marginBlock': '0px',

};

const Header = () => {
  const router = useRouter();
  const logout = async () => {
    await fetch('/api/logout', {});
    localStorage.removeItem('carbeeToken');
    router.push('/login');
  };
  return (
    <div className="header">
      <h1 className={lexend.className} style={headerStyle}>Dashboard</h1>
      <button className="button strong" onClick={() => logout()}>Log Out</button>
    </div>
  );
};

export default Header;
