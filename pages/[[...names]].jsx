import { Button, Card, Grid, Input, Spacer, Loading } from '@nextui-org/react';
import { useState } from 'react';
import Result from '../Components/Result';
import Meta from '../Components/Meta';
import { useRouter } from 'next/router';

export default function Home() {
	const router = useRouter();
	const { names } = router.query;

	const predefined = (names || [null])[0];
	const [username, setUsername] = useState(predefined ?? '');
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);

	if (predefined && !loading && Object.keys(data).length === 0) fetchData(null);

	async function fetchData(e) {
		if (e) e.preventDefault();
		setLoading(true);
		const request = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`);
		const data = await request.json();
		setData(data);
		setLoading(false);
	}

	return (
		<>
			{Object.keys(data).length === 0 ? <Meta /> : <Meta title={`${data.username} | Mojang Info`} ogTitle={data.username} description={`Username: ${data.username}\n` + `UUID: ${data.uuid}\n` + (data.created_at ? `Created at: ${data.created_at}` : '')} />}

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
		</>
	);
}

export async function getServerSideProps({ params }) {
	const request = await fetch(`https://api.ashcon.app/mojang/v2/user/${params.username}`);
	const data = await request.json();
	return {
		props: {
			userInfo: data
		}
	};
}
