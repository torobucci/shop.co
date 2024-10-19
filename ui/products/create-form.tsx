'use client'
import {z} from 'zod'
import { useState, ChangeEvent } from "react";
import { useFormState } from 'react-dom';
import createProduct from "../../lib/actions";
import { Categories } from "../../lib/definitions";


function ProductForm({categories}:{categories:Categories[]|undefined}) {
    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createProduct, initialState);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);

        // Ensure exactly three files are selected
        if (files.length === 3) {
            setSelectedFiles(files);
        } else {
            alert('Please select exactly three files.');
            event.target.value = ''; // Reset file input
        }
    }

    return (
        <div className="flex w-full h-screen items-center justify-center">
            <form action={dispatch} className="flex flex-col gap-4 text-black">
                <div className="mb-1">
                    <label htmlFor="product" className="mb-2 block text-sm font-medium">
                        Choose a product
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="product"
                                name="product"
                                type="text"
                                placeholder="Enter product name"
                                className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="product-error"
                            />
                        </div>
                        <div id="product-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.product &&
                                state.errors.product.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="mb-1">
                    <label htmlFor="price" className="mb-2 block text-sm font-medium">
                        Add product price
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="price"
                                name="price"
                                type="text"
                                placeholder="Enter price"
                                className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="price-error"
                            />
                        </div>
                        <div id="price-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.price &&
                                state.errors.price.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <select
                        id="category"
                        name="category"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue=""
                        aria-describedby="category-error"
                    >
                        <option value="" disabled>
                            Select a product&apos;s category
                        </option>
                        {categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-1">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                        Add product description
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Enter description"
                                className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="description-error"
                            />
                        </div>
                        <div id="description-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.description &&
                                state.errors.description.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="mb-1">
                    <label htmlFor="stockQuantity" className="mb-2 block text-sm font-medium">
                        Add product stockQuantity
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="stockQuantity"
                                name="stockQuantity"
                                type="text"
                                placeholder="Enter stockQuantity"
                                className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="stockQuantity-error"
                            />
                        </div>
                        <div id="stockQuantity-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.stockQuantity &&
                                state.errors.stockQuantity.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="mb-1">
                    <label htmlFor="files" className="mb-2 block text-sm font-medium">
                        Add product files
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="files"
                                name="imageFiles"
                                type="file"
                                placeholder="Upload product image files"
                                className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="files-error"
                                onChange={handleFileChange}
                                multiple
                                accept=".png, .svg, .webp"

                            />
                        </div>
                        <div id="files-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.imageFiles &&
                                state.errors.imageFiles.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
                <button type="submit" className="bg-blue-600 p-3 rounded-md">Create Product</button>
            </form>
        </div>
    );
}

export default ProductForm;
