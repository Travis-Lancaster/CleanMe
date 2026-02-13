import { ClearOutlined } from "@ant-design/icons";

import { memo, useCallback, useEffect, useRef, useState } from "react";

interface SignaturePadProps {
	value?: string
	onChange: (signature: string) => void
	label?: string
	width?: number
	height?: number
	error?: boolean
}

function SignaturePadComponent({ value, onChange, label, width = 220, height = 50, error = false }: SignaturePadProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const hasLoadedRef = useRef(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas)
			return;

		const ctx = canvas.getContext("2d");
		if (!ctx)
			return;

		// Load existing signature if provided (only once or when value changes from empty to filled)
		if (value && !hasLoadedRef.current) {
			const img = new Image();
			img.onload = () => {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0);
				hasLoadedRef.current = true;
			};
			img.src = value;
		}
		else if (!value && hasLoadedRef.current) {
			// Reset when value is cleared externally
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			hasLoadedRef.current = false;
		}
	}, [value, width, height]);

	const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
		setIsDrawing(true);
		hasLoadedRef.current = true; // Mark as modified
		const canvas = canvasRef.current;
		if (!canvas)
			return;

		const ctx = canvas.getContext("2d");
		if (!ctx)
			return;

		const rect = canvas.getBoundingClientRect();
		const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
		const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

		ctx.beginPath();
		ctx.moveTo(x, y);
	}, []);

	const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
		if (!isDrawing)
			return;

		const canvas = canvasRef.current;
		if (!canvas)
			return;

		const ctx = canvas.getContext("2d");
		if (!ctx)
			return;

		const rect = canvas.getBoundingClientRect();
		const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
		const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

		ctx.lineTo(x, y);
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 2;
		ctx.lineCap = "round";
		ctx.stroke();
	}, [isDrawing]);

	const stopDrawing = useCallback(() => {
		if (!isDrawing)
			return;
		setIsDrawing(false);

		const canvas = canvasRef.current;
		if (!canvas)
			return;

		// Convert canvas to base64 and call onChange ONLY when drawing stops
		const dataUrl = canvas.toDataURL("image/png");
		onChange(dataUrl);
	}, [isDrawing, onChange]);

	const clearSignature = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas)
			return;

		const ctx = canvas.getContext("2d");
		if (!ctx)
			return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		hasLoadedRef.current = false;
		onChange("");
	}, [onChange]);

	return (
		<div className="space-y-2 print-hide">
			{label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
			<div className={`border-2 rounded-lg overflow-hidden ${error ? "border-red-500" : "border-gray-300"}`} style={{ width: `${width}px`, height: `${height}px`, position: "relative" }}>
				<canvas
					ref={canvasRef}
					width={width}
					height={height}
					className="bg-white cursor-crosshair"
					style={{ width: `${width}px`, height: `${height}px`, display: "block" }}
					onMouseDown={startDrawing}
					onMouseMove={draw}
					onMouseUp={stopDrawing}
					onMouseLeave={stopDrawing}
					onTouchStart={startDrawing}
					onTouchMove={draw}
					onTouchEnd={stopDrawing}
				/>
				<button
					type="button"
					onClick={clearSignature}
					className="text-red-600 hover:text-red-800 hover:bg-red-50"
					style={{
						position: "absolute",
						top: "4px",
						right: "4px",
						padding: "4px 6px",
						border: "none",
						background: "rgba(255, 255, 255, 0.9)",
						borderRadius: "4px",
						cursor: "pointer",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "14px",
						lineHeight: 1,
						transition: "all 0.2s",
					}}
					title="Clear Signature"
				>
					<ClearOutlined />
				</button>
			</div>
		</div>
	);
}

// Export memoized version to prevent unnecessary rerenders
export default memo(SignaturePadComponent);
