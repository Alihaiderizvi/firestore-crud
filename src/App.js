import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";

function App() {
	const userCollectionRef = collection(db, "users");
	console.log(userCollectionRef);

	useEffect(() => {
		const getData = async () => {
			const data = await getDocs(userCollectionRef);
			console.log("data", data);
		};
		getData();
	}, []);
	return <div className='App'></div>;
}

export default App;
