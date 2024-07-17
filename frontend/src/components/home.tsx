import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleAccounts = () => {
    navigate('/accounts');
  };


    return (
        <>
        <p className="text-2xl font-bold text-center mb-10">Homepage</p>
        <div className="mx-auto text-center">
        <button className="bg-orange-400 px-4 py-1 rounded-sm font-bold mx-5" onClick={handleSignup}>Sign Up</button>
      <button className="bg-green-400 px-4 py-1 rounded-sm font-bold mx-5" onClick={handleLogin}>Login</button>
      <button className="bg-red-400 px-4 py-1 rounded-sm font-bold mx-5" onClick={handleAccounts}>Accounts</button>
      </div>
        </>
    )
}

export default Home