

import { useEffect, useState } from "react";

interface UserAccounts {
    id: number;
    username: string;
    email: string;
    password: string
}


const CreatedAccounts = () => {
        const [accounts, setAccounts] = useState<UserAccounts[]>([])

        const onDelete = async (id:number) => {
            try {
                const options = {
                  method: "DELETE",
                };
                //const response = await fetch(`http://127.0.0.1:5000/delete_user/${id}`, options);
                const response = await fetch(`https://signup-api-f02o.onrender.com/delete_user/${id}`, options);
                if (response.status === 200) {
                  console.log("User deleted successfully");
                  await fetchAPI();
                } else {
                  console.error("Failed to delete");
                }
              } catch (error) {
                alert(error);
              }
        }

    useEffect(() => {
        fetchAPI()
      }, []);
    
    
      const fetchAPI = async() => {
        try {
        //const response = await fetch('http://localhost:5000/accounts');
        const response = await fetch ('https://signup-api-f02o.onrender.com/accounts');

        if (!response.ok) {
          throw new Error(`Failed to fetch accounts: ${response.statusText}`);
        }
        const data = await response.json();
        setAccounts(data.accounts as UserAccounts[]);
      }
      catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }

    return (
        <>
        <p className="font-bold text-2xl text-center my-10">Created Accounts</p>
        <table className="text-center mx-auto border-black border-2 w-[88%]">
            <thead>
                <tr className="border-2 border-black">
                    <th className="w-1/4">Username</th>
                    <th className="w-2/4">Email</th>
                    <th className="w-1/4">Actions</th>
                </tr>
            </thead>
            <tbody>
          {accounts && accounts.length > 0 ? (
            accounts.map((account) => (
              <tr key={account.id}>
                <td>{account.username}</td>
                <td>{account.email}</td>
                <td>
                  <button
                  className="bg-red-400 px-4 py-1 rounded-sm hover:font-bold"
                  onClick={() => onDelete(account.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-green-400">
                <td></td>
              <td className="text-center italic">No accounts....</td>
              <td></td>
            </tr>
          )}
        </tbody>
        </table>
        </>
    )
}

export default CreatedAccounts