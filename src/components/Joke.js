import React, { useState, useEffect } from "react";
import axios from "axios";

function Joke(props) {
	const { category, jokeBtn } = props;
	const [joke, setJoke] = useState("");

	useEffect(() => {
		axios
			.get("https://api.chucknorris.io/jokes/random?category=" + category)
			.then((res) => {
				setJoke(res.data.value);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [category, jokeBtn]);

	return <>{joke}</>;
}

export default Joke;
