import { render, screen } from '@testing-library/react';
import App from './index';

test('Expect all months in document', () => {
    render(<App/>);
    Object.keys([...new Array(12)]).map(x=>new Date(1,x,1).toLocaleString('en', {month: "long"})).forEach(month=>{
        expect(screen.getByText(month)).toBeInTheDocument();
    })

});
