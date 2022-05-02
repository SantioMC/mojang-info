import { Button, Card, Grid, Input, Spacer, Loading } from '@nextui-org/react';
import { useState } from 'react';
import Result from '../Components/Result';
import Meta from '../Components/Meta';

export default function Home(props) {
	const predefined = null;
	var data = props.userInfo;
	const [username, setUsername] = useState(predefined ?? '');

	async function fetchData(e) {
		e.preventDefault();
		location.href = '/' + username;
	}

	return (
		<>
			{Object.keys(data).length === 0 ? <Meta /> : <Meta title={`${data.username} | Mojang Info`} ogTitle={data.username} description={`UUID: ${data.uuid}\n` + (data.created_at ? `Created at: ${data.created_at}` : '')} />}

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
							<Result data={data} />
						</Grid>
					</Grid.Container>
				</Grid.Container>
			</form>
		</>
	);
}

export async function getServerSideProps({ params }) {
	const names = params.names;
	const predefined = (names || [null])[0];

	console.log(predefined);
	if (!predefined) return { props: { userInfo: {} } };

	const request = await fetch(`https://api.ashcon.app/mojang/v2/user/${predefined}`);
	const data = await request.json();
	return {
		props: {
			userInfo: data
		}
	};
}
