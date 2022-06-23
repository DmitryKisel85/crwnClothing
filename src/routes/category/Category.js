import { useContext, useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import ProductCard from "../../component/productCard";

import { CategoriesContext } from "../../context/categories.context";

import "./category.scss";

import React from "react";

const Category = () => {
	const { category } = useParams();
	const { categoriesMap } = useContext(CategoriesContext);

	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return <div className='category-container'>{products && products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
};

export default Category;