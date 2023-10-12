import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditEmployeeForm from '../src/pages/EmployeeManager/Forms/EditEmployeeForm';

describe('EditEmployeeForm', () => {
    it('renders without errors', () => {
        render(<EditEmployeeForm />);
    });

    it('displays the form fields', () => {
        const { getByLabelText } = render(<EditEmployeeForm />);
        expect(getByLabelText('First Name')).toBeInTheDocument();
        expect(getByLabelText('Last Name')).toBeInTheDocument();
        expect(getByLabelText('Email')).toBeInTheDocument();
        expect(getByLabelText('Phone')).toBeInTheDocument();
        expect(getByLabelText('Gender')).toBeInTheDocument();
    });

    it('submits the form with valid data', async () => {
        const { getByLabelText, getByText } = render(<EditEmployeeForm />);

        fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
        fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
        fireEvent.change(getByLabelText('Email'), { target: { value: 'johndoe@example.com' } });
        fireEvent.change(getByLabelText('Phone'), { target: { value: '0712345678' } });
        fireEvent.change(getByLabelText('Gender'), { target: { value: 'M' } });

        fireEvent.click(getByText('EDIT'));

    });

    it('handles invalid data and displays error message', async () => {
        const { getByLabelText, getByText } = render(<EditEmployeeForm />);

        fireEvent.change(getByLabelText('First Name'), { target: { value: 'John123' } });
        fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe456' } });
        fireEvent.change(getByLabelText('Email'), { target: { value: 'invalid-email' } });
        fireEvent.change(getByLabelText('Phone'), { target: { value: '123' } });
        fireEvent.change(getByLabelText('Gender'), { target: { value: '' } });

        fireEvent.click(getByText('EDIT'));

    });
});