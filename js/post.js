{
	const container = document.querySelector('.container')
	let url = `https://gorest.co.in/public-api/posts/`;
	let urlComment = `https://gorest.co.in/public-api/comments?post_id`;
	let searchParams = new URLSearchParams(window.location.search);
	let id = searchParams.get('id');

	const getDataPost = async () => {
		const response = await fetch(`${url}${id}`);
		const data = await response.json();
		return data;
	}

	const comment = async () => {
		const response = await fetch(`${urlComment}=${id}`);
		const data = await response.json();
		const dataComment = data.data;

		return dataComment;
	}

	const cardItem = () => {
		const card = document.createElement('div');
		const cardBody = document.createElement('div');
		const title = document.createElement('h5');
		const text = document.createElement('p');

		card.classList.add('card');
		cardBody.classList.add('card-body');
		title.classList.add('card-title');
		text.classList.add('card-text');
		card.style.width = '100%';
		card.append(cardBody);
		cardBody.append(title, text);
		container.append(card);
		return {
			card,
			cardBody,
			title,
			text
		}
	}

	const postComment = () => {
		const card = document.createElement('div');
		const cardBody = document.createElement('div');
		const title = document.createElement('h5');
		const email = document.createElement('p');
		const text = document.createElement('p');

		card.classList.add('card', 'comments');
		cardBody.classList.add('card-body');
		title.classList.add('card-title');
		email.classList.add('card-text');
		text.classList.add('card-text');

		card.append(cardBody);
		cardBody.append(title, email, text);
		container.append(card);
		return {
			card,
			cardBody,
			title,
			email,
			text
		}
	}

	const layoutComment = async () => {
		const comments = await comment();
		const aarComments = comments.map(item => {
			const elements = postComment();
			const title = elements.title;
			const mail = elements.email;
			const text = elements.text;
			title.textContent = item.name;
			mail.textContent = item.email;
			text.textContent = item.body;
			console.log(item);
			return item;
		})
	}

	layoutComment()

	const layoutPost = async () => {
		const data = await getDataPost();
		const post = data.data;
		const card = cardItem();
		const cardTitle = card.title;
		const cardText = card.text;
		cardTitle.textContent = post.title;
		cardText.textContent = post.body;
		console.log(cardTitle, cardText)
	}
	layoutPost();

}
