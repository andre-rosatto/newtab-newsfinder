import { useEffect, useRef, useState } from 'react';
import '../css/Carousel.css';

const Carousel = ({ items, itemWidth, gap, previousButton, nextButton, pip }) => {
	const [position, setPosition] = useState(0);
	const [isSwipping, setIsSwipping] = useState(false);
	const [lastX, setLastX] = useState(0);
	const [pipsCount, setPipsCount] = useState(0);
	const el = useRef();

	useEffect(() => {
		const handleResize = () => {
			setPipsCount(Math.ceil((items.length * (itemWidth + gap) - gap) / el.current.offsetWidth));
		}
		setPipsCount(Math.ceil((items.length * (itemWidth + gap) - gap) / el.current.offsetWidth));
		setPosition(0);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [itemWidth, gap, items]);

	const slide = (offset) => {
		const totalWidth = items.length * (itemWidth + gap) - gap;
		const newPosition = Math.max(Math.min(0, position + offset), -totalWidth + el?.current?.offsetWidth);
		setPosition(newPosition);
	};

	const startSwipe = (e) => {
		setIsSwipping(true);
		setLastX(e.touches[0].clientX);
	}

	const stopSwipe = () => {
		setIsSwipping(false);
	}

	const swipe = (e) => {
		if (!isSwipping) return;
		const delta = e.touches[0].clientX - lastX;
		slide(delta);
		setLastX(e.touches[0].clientX);
	}

	const getCurrentPage = () => {
		if (el && el.current && position !== 0) {
			return Math.ceil(-position / el.current.offsetWidth);
		}
		return 0;
	}

	const handlePipClick = (idx) => {
		const totalWidth = items.length * (itemWidth + gap) - gap;
		let pos = -idx * Math.floor(el.current.offsetWidth / (itemWidth + gap)) * (itemWidth + gap);
		pos = Math.max(Math.min(0, pos), -totalWidth + el?.current?.offsetWidth);
		setPosition(pos);
	}

	const style = {
		gap: `${gap}px`,
		left: `${position}px`,
		transition: `${isSwipping ? 'none' : 'left 1s'}`
	};

	return (
		<div className="Carousel" ref={el}>
			<div className="Carousel__wrapper">
				<ul
					className="Carousel__items-wrapper"
					style={style}
					onTouchStart={startSwipe}
					onTouchEnd={stopSwipe}
					onTouchMove={swipe}
				>
					{items.map((item, idx) => <li key={idx} className="Carousel__item">{item}</li>)}
				</ul>
			</div>

			{pip && <div className="Carousel__pips-wrapper">
				{Array(pipsCount).fill(0).map((_, idx) =>
					<span
						onClick={() => handlePipClick(idx)}
						className={getCurrentPage() === idx ? 'Carousel__current-pip' : ''} key={idx}
					>
						{pip}
					</span>
				)}
			</div>}

			{previousButton && <span
				className={position >= 0 ? 'Carousel__button-disabled' : ''}
				onClick={() => slide(itemWidth + gap)}
			>
				{previousButton}
			</span>}
			{
				nextButton && <span
					className={position <= -(items.length * (itemWidth + gap) - gap) + el?.current?.offsetWidth ? 'Carousel__button-disabled' : ''}
					onClick={() => slide(-(itemWidth + gap))}
				>
					{nextButton}
				</span>
			}

		</div >
	);
}

export default Carousel;