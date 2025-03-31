import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">House Number</th>
              <th className="border border-gray-300 px-4 py-2">
                Spot Check Date
              </th>
              <th className="border border-gray-300 px-4 py-2">Males</th>
              <th className="border border-gray-300 px-4 py-2">Females</th>
              <th className="border border-gray-300 px-4 py-2">4ps Member</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.houseNumber || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.spotCheckDate || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.maleCount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.femaleCount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.isMember4ps ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">House Number</th>
              <th className="border border-gray-300 px-4 py-2">
                Spot Check Date
              </th>
              <th className="border border-gray-300 px-4 py-2">Males</th>
              <th className="border border-gray-300 px-4 py-2">Females</th>
              <th className="border border-gray-300 px-4 py-2">4ps Member</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.houseNumber || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.spotCheckDate || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.maleCount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.femaleCount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.isMember4ps ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">House Number</th>
              <th className="border border-gray-300 px-4 py-2">
                Spot Check Date
              </th>
              <th className="border border-gray-300 px-4 py-2">Males</th>
              <th className="border border-gray-300 px-4 py-2">Females</th>
              <th className="border border-gray-300 px-4 py-2">4ps Member</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.houseNumber || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.spotCheckDate || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.maleCount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.femaleCount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.isMember4ps ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">House Number</th>
              <th className="border border-gray-300 px-4 py-2">
                Spot Check Date
              </th>
              <th className="border border-gray-300 px-4 py-2">Males</th>
              <th className="border border-gray-300 px-4 py-2">Females</th>
              <th className="border border-gray-300 px-4 py-2">4ps Member</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.houseNumber || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.spotCheckDate || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.maleCount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.femaleCount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.isMember4ps ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">House Number</th>
              <th className="border border-gray-300 px-4 py-2">
                Spot Check Date
              </th>
              <th className="border border-gray-300 px-4 py-2">Males</th>
              <th className="border border-gray-300 px-4 py-2">Females</th>
              <th className="border border-gray-300 px-4 py-2">4ps Member</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.houseNumber || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.spotCheckDate || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.maleCount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.femaleCount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.isMember4ps ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">House Number</th>
              <th className="border border-gray-300 px-4 py-2">
                Spot Check Date
              </th>
              <th className="border border-gray-300 px-4 py-2">Males</th>
              <th className="border border-gray-300 px-4 py-2">Females</th>
              <th className="border border-gray-300 px-4 py-2">4ps Member</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.houseNumber || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.spotCheckDate || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.maleCount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.femaleCount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.isMember4ps ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
