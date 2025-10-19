/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static appControllerGetHello(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static authControllerRegister(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static authControllerLogin(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static meControllerGetMe(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/me',
        });
    }
    /**
     * @param tenantId
     * @returns any
     * @throws ApiError
     */
    public static workOrderControllerFindAll(
        tenantId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/work-orders/{tenantId}',
            path: {
                'tenantId': tenantId,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static workOrderControllerCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/work-orders',
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static workOrderControllerUpdateStatus(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/work-orders/{id}/status',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param text
     * @returns any
     * @throws ApiError
     */
    public static barcodeControllerGetBarcode(
        text: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/barcodes/{text}',
            path: {
                'text': text,
            },
        });
    }
    /**
     * @param tenantId
     * @returns any
     * @throws ApiError
     */
    public static crmControllerGetAccounts(
        tenantId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/crm/accounts/{tenantId}',
            path: {
                'tenantId': tenantId,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static crmControllerCreateAccount(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/crm/accounts',
        });
    }
    /**
     * @param tenantId
     * @returns any
     * @throws ApiError
     */
    public static crmControllerGetContacts(
        tenantId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/crm/contacts/{tenantId}',
            path: {
                'tenantId': tenantId,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static crmControllerCreateContact(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/crm/contacts',
        });
    }
    /**
     * @param tenantId
     * @returns any
     * @throws ApiError
     */
    public static crmControllerGetLeads(
        tenantId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/crm/leads/{tenantId}',
            path: {
                'tenantId': tenantId,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static crmControllerCreateLead(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/crm/leads',
        });
    }
    /**
     * @param contactId
     * @returns any
     * @throws ApiError
     */
    public static crmControllerGetNotes(
        contactId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/crm/notes/{contactId}',
            path: {
                'contactId': contactId,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static crmControllerCreateNote(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/crm/notes',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static dispatchControllerCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dispatch',
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static dispatchControllerGetForTechnician(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dispatch/technician/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static dispatchControllerGetAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dispatch/all',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static forecastControllerRun(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/forecast',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static forecastControllerGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/forecast',
        });
    }
    /**
     * @param skuId
     * @returns any
     * @throws ApiError
     */
    public static labelControllerPrintLabel(
        skuId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/labels/{skuId}',
            path: {
                'skuId': skuId,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static chatControllerQuery(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/chat',
        });
    }
    /**
     * @param tenantId
     * @returns any
     * @throws ApiError
     */
    public static chatControllerGetLogs(
        tenantId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chat/logs/{tenantId}',
            path: {
                'tenantId': tenantId,
            },
        });
    }
}
