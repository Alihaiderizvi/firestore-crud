import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

function App() {
	const [user, setUser] = useState([]);
	const userCollectionRef = collection(db, "users");
	console.log(userCollectionRef);

	// CRUD

	// 1. CREATE
	// 2. READ
	useEffect(() => {
		const getData = async () => {
			const data = await getDocs(userCollectionRef);
			setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getData();
	}, []);

	// 3. UPDATE
	// 4. DELETE
	return (
		<div className='App'>
			{user?.map((data) => (
				<div>
					<h1>{data.name}</h1>
					<h2>{data.age}</h2>
				</div>
			))}
		</div>
	);
}

export default App;
