import { Backdrop, CircularProgress } from "@mui/material"

interface LoaderProps {
	open: boolean
}

const Loader: React.FC<LoaderProps> = ({ open }) => {

	return (
		<Backdrop open={open} sx={{
			zIndex: '10000'
		}}>
			<CircularProgress color="info" size='5em' />
		</Backdrop>
	)
}

export default Loader