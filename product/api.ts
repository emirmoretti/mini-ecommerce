import { Product } from "./types";
import axios from "axios";
import Papa from "papaparse";

export default {
    list: async (): Promise<Product[]> => {
        return axios
            .get(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQHO0leGRg7Ya6AYD6ZtDGMYuo9qaH-at7PmL6CW1vOJvqLtOQ_87TrXUAkmuKFipTqycNm_NyI3uLc/pub?output=csv`,
                {
                    responseType: "blob",
                }
            )
            .then((response) => new Promise<Product[]>((resolve, reject) => {
                Papa.parse(response.data, {
                    header: true,
                    complete: (results) => {
                        const products = results.data as Product[]
                        return resolve(products.map(product => ({
                            ...product,
                            price: Number(product.price)
                        })))
                    },
                    error: (error) => reject(error.message)
                })
            }))
    }
}