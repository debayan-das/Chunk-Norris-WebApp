import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Joke from "./Joke";

function Cards() {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		axios
			.get("https://api.chucknorris.io/jokes/categories")
			.then((res) => {
				setCategories(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	function BootstrapDialogTitle(props) {
		const { onClose, children } = props;

		return (
			<DialogTitle sx={{ m: 0, p: 2 }}>
				<span className="text-capitalize">{children}</span>
				{onClose ? (
					<IconButton
						aria-label="close"
						onClick={onClose}
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>
				) : null}
			</DialogTitle>
		);
	}

	function DisplayJokeDialog(props) {
		const { handleClose, open, category } = props;
		const [jokeBtn, setJokeBtn] = useState(false);
		const handleJokeBtn = () => {
			setJokeBtn(!jokeBtn);
		};

		return (
			<Dialog onClose={handleClose} open={open}>
				<BootstrapDialogTitle
					id="customized-dialog-title"
					onClose={handleClose}
				>
					{category}
				</BootstrapDialogTitle>
				<DialogContent dividers>
					<Typography>
						<Joke category={category} jokeBtn={jokeBtn}></Joke>
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleJokeBtn}>Next joke</Button>
				</DialogActions>
			</Dialog>
		);
	}

	function DisplayCards(props) {
		const category = props.category;
		const [open, setOpen] = React.useState(false);

		const handleClickOpen = () => {
			setOpen(true);
		};
		const handleClose = () => {
			setOpen(false);
		};

		return (
			<div className="col-3 col-md-6 col-lg-3">
				<div className="card" onClick={handleClickOpen}>
					<div className="card-body py-5">
						<h5 className="card-title text-capitalize">{category}</h5>
						<p className="card-text text-capitalize">
							Unlimited Jokes On {category}
						</p>
					</div>
				</div>
				<DisplayJokeDialog
					open={open}
					handleClose={handleClose}
					category={category}
				></DisplayJokeDialog>
			</div>
		);
	}

	const cardGroup = categories.map((category, index) => (
		<DisplayCards key={index} category={category}></DisplayCards>
	));

	return (
		<>
			<div className="container text-center">
				<div className="row gy-4 mt-2">{cardGroup}</div>
			</div>
		</>
	);
}

export default Cards;
