import React, { useEffect, useState } from "react";
import "./ProductList.styles.css";
import { Product } from "../../model/model";
import { ProductDetails } from "../ProductDetails/ProductDetails.component";

export const ProductList: React.FC<{ products: Product[] }> = ({
    products,
}) => {
    const [uniqueManufacturers, setUniqueManufacturers] = useState<string[]>(
        []
    );
    const [uniqueModels, setUniqueModels] = useState<string[]>([]);
    const [uniqueYears, setUniqueYears] = useState<number[]>([]);
    const [sorted, setSorted] = useState<Product[]>([]);
    const [filterProperty, setFilterProperty] = useState<"" | keyof Product>(
        ""
    );
    const [filtered, setFiltered] = useState<Product[]>([]);

    useEffect(() => {
        if (products) {
            const filteredAndSortedManufacturers = filterUniqueValues<string>(
                products,
                "manufacturer"
            ).sort((a, b) => a.localeCompare(b));

            setUniqueManufacturers(filteredAndSortedManufacturers);

            const filteredAndSortedModels = filterUniqueValues<string>(
                products,
                "model"
            ).sort((a, b) => a.localeCompare(b));

            setUniqueModels(filteredAndSortedModels);

            const filteredAndSortedYears = filterUniqueValues<number>(
                products,
                "year"
            );

            setUniqueYears(filteredAndSortedYears);
        }
    }, [products]);

    function filterUniqueValues<T>(
        products: Product[],
        productKey: keyof Product
    ): T[] {
        return [
            ...new Set(products.map((product) => product[productKey] as T)),
        ];
    }

    const handleSort = () => {
        const sortedProducts = products.toSorted((a, b) =>
            a.manufacturer.localeCompare(b.manufacturer)
        );
        setSorted(sortedProducts);
        setFiltered([]);
    };

    const handleFilter = (filterProperty: string | number) => {
        // Check if the value is present in the object
        if (filterProperty === "") {
            return;
        }
        if (
            products.some((item) =>
                Object.values(item).includes(filterProperty)
            )
        ) {
            const filteredProducts = products.filter((item) =>
                Object.values(item).includes(filterProperty)
            );
            setFiltered(filteredProducts);
            setSorted([]);
        }
    };

    const handleFilterPropertyChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setFilterProperty(event.target.value as keyof Product);
    };

    return (
        <>
            <h3>The Products:</h3>
            <div className="sor-and-filter-menu">
                {/* conditionally render the sorted  products by clicking button: */}
                <button onClick={handleSort}>sort products a - z</button>

                {/* conditionally render the filtered products by clicking button: */}
                <button onClick={() => handleFilter(filterProperty)}>
                    Filter by model:
                </button>
                <label>
                    <select
                        value={filterProperty}
                        onChange={handleFilterPropertyChange}
                    >
                        <option value="">-- Select Property --</option>
                        {uniqueModels.map((model) => (
                            <option key={model} value={model}>
                                {model}
                            </option>
                        ))}
                    </select>
                </label>

                <button onClick={() => handleFilter(filterProperty)}>
                    Filter by manufacturer
                </button>
                <label>
                    <select
                        value={filterProperty}
                        onChange={handleFilterPropertyChange}
                    >
                        <option value="">-- Select Property --</option>
                        {uniqueManufacturers.map((manufacturer) => (
                            <option key={manufacturer} value={manufacturer}>
                                {manufacturer}
                            </option>
                        ))}
                    </select>
                </label>

                {/* //double tilde to transform property into Number */}
                <button onClick={() => handleFilter(~~filterProperty)}>
                    Filter by Year of production
                </button>
                <label>
                    <select
                        value={filterProperty}
                        onChange={handleFilterPropertyChange}
                    >
                        <option value="">-- Select Property --</option>
                        {uniqueYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="products-container">
                {filtered.map((product) => {
                    return <ProductDetails product={product} />;
                })}

                {sorted.map((product) => {
                    return <ProductDetails product={product} />;
                })}
            </div>

            {/* Render all products form the data base on page load */}
            <div className="products-container">
                {sorted.length === 0 && filtered.length === 0 && (
                    <div>
                        {products.map((product) => {
                            return <ProductDetails product={product} />;
                        })}
                    </div>
                )}
            </div>
        </>
    );
};
