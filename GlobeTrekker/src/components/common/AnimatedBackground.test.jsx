const { render, screen } = require('@testing-library/react');
const AnimatedBackground = require('./AnimatedBackground');

test('renders AnimatedBackground component', () => {
	render(<AnimatedBackground />);
	const element = screen.getByTestId('animated-background');
	expect(element).toBeInTheDocument();
});