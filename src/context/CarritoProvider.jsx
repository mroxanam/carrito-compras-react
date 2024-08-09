import React, { useReducer } from 'react';
import { CarritoContext } from './CarritoContext';

const initialState = [];

const comprasReducer = (state, action) => {
    switch (action.type) {
        case '[CARRITO] Agregar Compra':
            // Verifica si el producto ya está en el carrito
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                return state.map(item =>
                    item.id === action.payload.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
            return [...state, action.payload];
        case '[CARRITO] Aumentar Cantidad Compra': 
            return state.map(item =>
                item.id === action.payload
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            );
        case '[CARRITO] Disminuir Cantidad Compra': 
            return state.map(item =>
                item.id === action.payload && item.cantidad > 1
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
            );
        case '[CARRITO] Eliminar Compra':
            return state.filter(compra => compra.id !== action.payload);
        default:
            return state;
    }
};

export const CarritoProvider = ({ children }) => {
    const [listaCompras, dispatch] = useReducer(comprasReducer, initialState);

    const agregarCompra = (compra) => {
        compra.cantidad = 1;
        dispatch({ type: '[CARRITO] Agregar Compra', payload: compra });
    };

    const aumentarCantidad = (id) => {
        dispatch({ type: '[CARRITO] Aumentar Cantidad Compra', payload: id });
    };

    const disminuirCantidad = (id) => {
        dispatch({ type: '[CARRITO] Disminuir Cantidad Compra', payload: id });
    };

    const eliminarCompra = (id) => {
        dispatch({ type: '[CARRITO] Eliminar Compra', payload: id });
    };

    return (
        <CarritoContext.Provider value={{ listaCompras, agregarCompra, aumentarCantidad, disminuirCantidad, eliminarCompra }}>
            {children}
        </CarritoContext.Provider>
    );
};
