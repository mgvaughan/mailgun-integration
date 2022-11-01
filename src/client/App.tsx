import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './views/Home';
import Create from './views/Create';
import AllChirps from './views/AllChirps';
import SingleChirp from './views/SingleChirp';
import EditChirp from './views/EditChirp';
import Contact from './views/Contact';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Donate from './components/Donate';

const stripe = loadStripe('pk_test_51Lz1tKGMohygrU9zze1I0wkzVpb4vR0yl03Sqy8Fuedh9wt7V0C6Kz4hp3Wggqp6hGPwcJE9YhvUQmEN7t05RA3M002m7O6FxA');

const App = () => {

	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/api/create" element={<Create />} />
				<Route path="/api/chirps" element={<AllChirps />} />
				<Route path="/api/chirps/:id" element={<SingleChirp />} />
				<Route path="/api/chirps/:id/edit" element={<EditChirp />} />
				<Route path="/api/donate" element={
					<Elements stripe={stripe}>
						<Donate />
					</Elements>} />
				<Route path="/api/contact" element={<Contact />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
