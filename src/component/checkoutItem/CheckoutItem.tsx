import { FC, memo } from "react";

import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";

import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart, clearItemFromCart, removeItemFromCart } from "../../store/cart/cart.action";

import { CartItem as TCartItem } from "../../store/cart/cart.types";

import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton } from "./checkoutItem.styles";

type CheckoutItemProps = {
	cartItem: TCartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = memo(({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;

	const dispatch = useAppDispatch();

	const cartItems = useSelector(selectCartItems);

	const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
	const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
	const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={name} />
			</ImageContainer>
			<BaseSpan>{name}</BaseSpan>
			<Quantity>
				<Arrow onClick={removeItemHandler}>&#10094;</Arrow>
				<Value>{quantity}</Value>
				<Arrow onClick={addItemHandler}>&#10095;</Arrow>
			</Quantity>
			<BaseSpan>${price}</BaseSpan>
			<RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	);
});

export default CheckoutItem;
