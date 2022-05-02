import Result from '../Components/Result';
import { Grid, Spacer } from '@nextui-org/react';
import Meta from '../Components/Meta';

export default function UserPage({ userInfo }) {
	return (
		<>
			<Meta ogTitle={`${userInfo.username} on Mojang`} title={userInfo.username} description={`Click to view information about ${userInfo.username}`} />

			<Grid.Container justify='center'>
				<Grid.Container gap={5} xs={8} justify='center'>
					<Spacer y={3} />
					<Grid xs={6} className='centered'>
						<h1 className={'title'}>
							Results for <span className='colored blue'>{userInfo.username}</span>
						</h1>
					</Grid>
				</Grid.Container>
				<Grid.Container>
					<Spacer y={3} />
				</Grid.Container>
			</Grid.Container>
			<Grid.Container justify='center'>
				<Spacer y={6} />
				<Grid xs={6}>
					<Spacer y={3} />
					<Result data={userInfo} />
				</Grid>
			</Grid.Container>
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
