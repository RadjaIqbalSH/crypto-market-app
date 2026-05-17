import Image from "next/image";
import { ReactNode } from "react";

interface IAuthTemplateProps {
	children: ReactNode;
	image: string;
}

export default function AuthTemplate(props: IAuthTemplateProps) {
	// props
	const { children, image } = props;
	return (
		<div className="w-full h-dvh bg-bg flex flex-row">
			<div
				className="relative w-1/2 bg-surface flex items-center justify-center"
				style={{
					backgroundImage: "url(/images/bg-decoration.webp)",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
				}}
			>
				<Image
					src={image}
					width={540}
					height={540}
					className="h-540 w-540 object-contain"
					alt="image-device"
				/>
			</div>
			<div className="w-1/2 px-120 flex items-center justify-center">
				{children}
			</div>
		</div>
	);
}
