/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSkuDto } from '../models/CreateSkuDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InventoryService {
    /**
     * @param q
     * @param pageSize
     * @param page
     * @returns any
     * @throws ApiError
     */
    public static inventoryControllerGetSkUs(
        q?: string,
        pageSize?: any,
        page?: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/inventory/skus',
            query: {
                'q': q,
                'pageSize': pageSize,
                'page': page,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static inventoryControllerCreateSku(
        requestBody: CreateSkuDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/inventory/skus',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static inventoryControllerGetWarehouses(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/inventory/warehouses',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static inventoryControllerCreateWarehouse(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/inventory/warehouses',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static inventoryControllerGetBins(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/inventory/bins',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static inventoryControllerCreateBin(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/inventory/bins',
        });
    }
}
