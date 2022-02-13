import { db } from "./firebase-config";
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

function App() {
	const [user, setUser] = useState([]);
	const [newName, setNewName] = useState([]);
	const [newAge, setNewAge] = useState([]);
	const [counter, setCounter] = useState(0);
	const userCollectionRef = collection(db, "users");
	console.log(userCollectionRef);

	// CRUD

	// 1. CREATE
	const createUser = async () => {
		await addDoc(userCollectionRef, { name: newName, age: Number(newAge) });
	};

	// 2. READ
	useEffect(() => {
		const getData = async () => {
			const data = await getDocs(userCollectionRef);
			setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getData();
	}, []);

	// 3. UPDATE

	const updateUser = async (id, age) => {
		const userDoc = doc(db, "users", id);
		const newFields = { age: age + 1 };
		console.log(userDoc);
		console.log(newFields);
		await updateDoc(userDoc, newFields);
	};
	// 4. DELETE
	return (
		<div className='App'>
			<input
				type='text'
				name='username'
				onChange={(e) => setNewName(e.target.value)}
			/>
			<input
				type='number'
				name='age'
				onChange={(e) => setNewAge(e.target.value)}
			/>
			<button onClick={createUser}>Create User</button>
			{user?.map((data, index) => (
				<div key={index}>
					<h1>{data.name}</h1>
					<h2>{data.age}</h2>
					<button onClick={() => updateUser(data?.id, data?.age)}>
						Update Age
					</button>
				</div>
			))}
		</div>
	);
}

export default App;
