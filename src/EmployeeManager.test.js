import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmployeeManager from './EmployeeManager';

jest.mock('../../apiRequests/serverRequests', () => ({
    handlegetEmployees: jest.fn(() => Promise.resolve([])),
    handleDeleteEmployee: jest.fn(() => Promise.resolve(true)),
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('EmployeeManager Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders EmployeeManager in grid mode', async () => {
        render(<EmployeeManager />);

        const addButton = screen.getByText('ADD EMPLOYEE');
        expect(addButton).toBeInTheDocument();

        const gridModeButton = screen.getByRole('button', { name: 'Grid View' });
        expect(gridModeButton).toBeInTheDocument();

    });

    it('renders EmployeeManager in table mode', async () => {
        render(<EmployeeManager />);
        const tableModeButton = screen.getByRole('button', { name: 'Table View' });
        fireEvent.click(tableModeButton);

        const imageHeader = screen.getByText('Image');
        expect(imageHeader).toBeInTheDocument();

        const firstNameHeader = screen.getByText('First Name');
        expect(firstNameHeader).toBeInTheDocument();

    });

    it('clicks the "ADD EMPLOYEE" button and navigates', async () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);

        render(<EmployeeManager />);
        const addButton = screen.getByText('ADD EMPLOYEE');
        fireEvent.click(addButton);

        expect(navigate).toHaveBeenCalledWith('/employee/add');
    });

    it('clicks the "Grid View" button and switches to grid mode', async () => {
        render(<EmployeeManager />);
        const gridModeButton = screen.getByRole('button', { name: 'Grid View' });
        fireEvent.click(gridModeButton);


    });


});