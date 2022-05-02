import { Button, Card, Grid, Link, Container, Text, Textarea, Input, Spacer, Loading } from '@nextui-org/react';
import { useState } from 'react';

function Result({ data }) {
	if (Object.keys(data).length === 0) return <div></div>;
	else if (data.error)
		return (
			<Card shadow='false'>
				<Spacer y={3} />
				<Grid.Container justify='center' alignItems='center'>
					<Text h3 color='error'>
						{data.error}
					</Text>
				</Grid.Container>
				<Spacer y={3} />
			</Card>
		);
	else
		return (
			<Card shadow='false'>
				<Container>
					<span className='inline'>
						<Text h4>Username: </Text>
						<Text h4 color='success'>
							{data.username}
						</Text>
					</span>
					<br />
					<span className='inline'>
						<Text h4>UUID: </Text>
						<Text h4 color='success'>
							{data.uuid}
						</Text>
					</span>
					<br />
					<span className='inline'>
						<Text h4>Creation Date: </Text>
						{data.created_at == null ? (
							<Text h4 color='error' className='centered'>
								Could not find creation date
							</Text>
						) : (
							<Text h4 color='success' className='centered'>
								{data.created_at}
							</Text>
						)}
					</span>
					<br />
					<span className='inline'>
						<Text h4>Skin: </Text>
						<Text h4 color='success'>
							<Link icon href={data.textures.skin.url}>
								Click Here
							</Link>
						</Text>
					</span>
					<br />
					<span className='inline'>
						<Text h4>Previous Names: </Text>
					</span>
					<br />
					{data.username_history.map((name) => (
						<div key={name}>
							<span className='inline'>
								<Text h4 color='success' className='inline'>
									• {name.username}
									<Text color='warning' className='centered'>
										{name.changed_at ? '(' + new Date(name.changed_at).toDateString() + ')' : '(First Name)'}
									</Text>
								</Text>
							</span>
							<br />
						</div>
					))}
				</Container>
			</Card>
		);
}

export default function Home() {
	const [username, setUsername] = useState('');
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);

	async function fetchData(e) {
		e.preventDefault();
		setLoading(true);
		const request = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`);
		const data = await request.json();
		setData(data);
		setLoading(false);
	}

	return (
		<form>
			<Grid.Container justify='center'>
				<Grid.Container gap={5} xs={8} justify='center'>
					<Spacer y={3} />
					<Grid xs={6}>
						<h1 className={'title'}>
							Enter your <span className='colored blue'>minecraft name</span> to get started
						</h1>
					</Grid>
					<Grid.Container xs={6} gap={1}>
						<Grid xs={9}>
							<Input shadow='false' clearable width={'100%'} labelPlaceholder='Minecraft Username' onChange={(e) => setUsername(e.currentTarget.value)} />
						</Grid>
						<Grid xs={3}>
							<Button ghost type='submit' onClick={fetchData}>
								Search
							</Button>
						</Grid>
					</Grid.Container>
				</Grid.Container>
				<Grid.Container>
					<Spacer y={3} />
				</Grid.Container>
				<Grid.Container justify='center'>
					<Spacer y={6} />
					<Grid xs={6}>
						<Spacer y={3} />
						{loading ? (
							<Card shadow='false' className='centered'>
								<Spacer y={4} />
								<Grid.Container justify='center' alignItems='center'>
									<Loading type='points' />
								</Grid.Container>
								<Spacer y={4} />
							</Card>
						) : (
							<Result data={data} />
						)}
					</Grid>
				</Grid.Container>
			</Grid.Container>
		</form>
	);
}
