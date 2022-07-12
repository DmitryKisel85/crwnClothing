import { useCallback } from "react";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import Button from "../button";
import CartItem from "../cartItem";

import { selectCartItems } from "../../store/cart/cart.selector";

import { CartDropdownContainer, CartItems, EmptyMessage } from "./cartDropdown.styles";

const CartDropdown = () => {
	const cartItems = useSelector(selectCartItems);
	const navigate = useNavigate();

	const goToCheckoutHandler = useCallback(() => {
		navigate("/checkout");
	}, []);

	return (
		<CartDropdownContainer>
			<CartItems>{cartItems.length ? cartItems.map((item) => <CartItem key={item.id} cartItem={item} />) : <EmptyMessage>Your cart is empty</EmptyMessage>}</CartItems>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
