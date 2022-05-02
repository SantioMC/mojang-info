import { Card, Container, Grid, Link, Spacer, Text } from '@nextui-org/react';

// Show link
function SLink(props) {
	return (
		<span className='inline'>
			<Text h4>{props.text}</Text>
			<Text h4 color='success'>
				<Link icon href={props.url}>
					{props.linkText ?? 'Click Here'}
				</Link>
			</Text>
		</span>
	);
}

export default function Result(props) {
	const data = props.data;

	if (Object.keys(data).length === 0) return <></>;
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
					<SLink text={'Skin: '} url={data.textures.skin.url} />
					<br />
					<span className='inline'>
						<Text h4>
							Previous Names{' '}
							<Text className='centered inline' color='warning'>
								({data.username_history.length})
							</Text>
							:
						</Text>
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
