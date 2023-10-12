import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddEmployeeForm from '../src/pages/EmployeeManager/Forms/AddEmployeeForm';

describe('AddEmployeeForm Component', () => {
    it('renders form fields correctly', () => {
        render(<AddEmployeeForm />);

        expect(screen.getByLabelText('First Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone')).toBeInTheDocument();
        expect(screen.getByLabelText('Gender')).toBeInTheDocument();
        expect(screen.getByText('ADD')).toBeInTheDocument();
    });

    it('validates and submits the form with valid data', () => {
        render(<AddEmployeeForm />);

        fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '0712345678' } });

        expect(screen.queryByText('First name should consist of 6-10 alphabets.')).not.toBeInTheDocument();
        expect(screen.queryByText('Last name should consist of 6-10 alphabets.')).not.toBeInTheDocument();
        expect(screen.queryByText('Invalid email address.')).not.toBeInTheDocument();
        expect(screen.queryByText('Invalid phone number.')).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('ADD'));

    });

    it('displays error messages for invalid data', () => {
        render(<AddEmployeeForm />);

        fireEvent.click(screen.getByText('ADD'));

        expect(screen.getByText('First name should consist of 6-10 alphabets.')).toBeInTheDocument();
        expect(screen.getByText('Last name should consist of 6-10 alphabets.')).toBeInTheDocument();
        expect(screen.getByText('Invalid email address.')).toBeInTheDocument();
        expect(screen.getByText('Invalid phone number.')).toBeInTheDocument();


    });
});