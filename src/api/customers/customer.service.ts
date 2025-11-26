import * as repository from './customer.repository.js';

export const createCustomer = (data: any) => {
    return repository.create(data);
};

export const getCUstomers = () => {
    return repository.findAll();
};

export const getCustomerById = (id: string) => {
    return repository.findById(id);
};

export const updateCustomer = (id: string, data: any) => {
    return repository.update(id, data);
};

export const deleteCustomer = (id: string) => {
    return repository.remove(id);
};